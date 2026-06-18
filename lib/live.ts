import { useCallback, useRef, useState } from 'react';
import { Modality, type LiveServerMessage, type Session } from '@google/genai';
import { getClient, LIVE_MODEL, TUTOR_SYSTEM_INSTRUCTION, describeError } from './gemini';
import {
  createBlob,
  decodePcmToAudioBuffer,
  INPUT_SAMPLE_RATE,
  OUTPUT_SAMPLE_RATE,
} from './audio';

export type LiveStatus = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';

export interface TranscriptLine {
  id: number;
  role: 'user' | 'model';
  text: string;
  interim: boolean;
}

interface AudioGraph {
  inputCtx: AudioContext;
  outputCtx: AudioContext;
  stream: MediaStream;
  source: MediaStreamAudioSourceNode;
  processor: ScriptProcessorNode;
  mute: GainNode;
}

/**
 * Drives a live, spoken conversation with the Gemini Live API:
 * captures the microphone as 16 kHz PCM, streams it up, and plays back the
 * model's 24 kHz PCM audio while surfacing input/output transcripts.
 */
export function useLiveTutor(apiKey: string) {
  const [status, setStatus] = useState<LiveStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);

  const sessionRef = useRef<Session | null>(null);
  const graphRef = useRef<AudioGraph | null>(null);
  const nextStartRef = useRef(0);
  const playingRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const lineIdRef = useRef(0);
  const curInputRef = useRef('');
  const curOutputRef = useRef('');

  const upsert = useCallback((role: 'user' | 'model', text: string) => {
    if (!text) return;
    setTranscript((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.interim && last.role === role) {
        const copy = prev.slice(0, -1);
        return [...copy, { ...last, text }];
      }
      return [...prev, { id: ++lineIdRef.current, role, text, interim: true }];
    });
  }, []);

  const finalizeTurn = useCallback(() => {
    curInputRef.current = '';
    curOutputRef.current = '';
    setTranscript((prev) => prev.map((l) => (l.interim ? { ...l, interim: false } : l)));
  }, []);

  const stopPlayback = useCallback(() => {
    playingRef.current.forEach((s) => {
      try { s.stop(); } catch { /* already stopped */ }
    });
    playingRef.current.clear();
    nextStartRef.current = 0;
  }, []);

  const teardown = useCallback(() => {
    stopPlayback();
    const g = graphRef.current;
    if (g) {
      try { g.processor.disconnect(); } catch { /* noop */ }
      try { g.source.disconnect(); } catch { /* noop */ }
      try { g.mute.disconnect(); } catch { /* noop */ }
      g.stream.getTracks().forEach((t) => t.stop());
      void g.inputCtx.close().catch(() => undefined);
      void g.outputCtx.close().catch(() => undefined);
    }
    graphRef.current = null;
    try { sessionRef.current?.close(); } catch { /* noop */ }
    sessionRef.current = null;
  }, [stopPlayback]);

  const handleMessage = useCallback(
    (message: LiveServerMessage) => {
      const sc = message.serverContent;

      if (sc?.inputTranscription?.text) {
        curInputRef.current += sc.inputTranscription.text;
        upsert('user', curInputRef.current);
      }
      if (sc?.outputTranscription?.text) {
        curOutputRef.current += sc.outputTranscription.text;
        upsert('model', curOutputRef.current);
      }

      // Audio playback: scheduled back-to-back so chunks don't overlap.
      const audioData =
        message.data ??
        sc?.modelTurn?.parts?.find((p) => p.inlineData?.data)?.inlineData?.data;
      if (audioData) {
        const g = graphRef.current;
        if (g) {
          setStatus('speaking');
          const buffer = decodePcmToAudioBuffer(audioData, g.outputCtx, OUTPUT_SAMPLE_RATE);
          const src = g.outputCtx.createBufferSource();
          src.buffer = buffer;
          src.connect(g.outputCtx.destination);
          const now = g.outputCtx.currentTime;
          const start = Math.max(nextStartRef.current, now);
          src.start(start);
          nextStartRef.current = start + buffer.duration;
          playingRef.current.add(src);
          src.onended = () => {
            playingRef.current.delete(src);
            if (playingRef.current.size === 0) setStatus('listening');
          };
        }
      }

      if (sc?.interrupted) stopPlayback();
      if (sc?.turnComplete) finalizeTurn();
    },
    [upsert, finalizeTurn, stopPlayback],
  );

  const start = useCallback(async () => {
    if (!apiKey) {
      setError('Add a Gemini API key in Settings to use the live voice tutor.');
      setStatus('error');
      return;
    }
    setError(null);
    setStatus('connecting');
    setTranscript([]);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AC: typeof AudioContext =
        window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const inputCtx = new AC({ sampleRate: INPUT_SAMPLE_RATE });
      const outputCtx = new AC({ sampleRate: OUTPUT_SAMPLE_RATE });
      await inputCtx.resume();
      await outputCtx.resume();

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      const mute = inputCtx.createGain();
      mute.gain.value = 0; // route through a muted node so onaudioprocess fires without echo
      source.connect(processor);
      processor.connect(mute);
      mute.connect(inputCtx.destination);

      graphRef.current = { inputCtx, outputCtx, stream, source, processor, mute };

      const ai = getClient(apiKey);
      const session = await ai.live.connect({
        model: LIVE_MODEL,
        callbacks: {
          onopen: () => setStatus('listening'),
          onmessage: handleMessage,
          onerror: (e: ErrorEvent) => {
            setError(describeError(e.message || e));
            setStatus('error');
            teardown();
          },
          onclose: () => {
            if (graphRef.current) teardown();
            setStatus((s) => (s === 'error' ? s : 'idle'));
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
      });
      sessionRef.current = session;

      processor.onaudioprocess = (ev) => {
        const input = ev.inputBuffer.getChannelData(0);
        try {
          session.sendRealtimeInput({ media: createBlob(input) });
        } catch {
          /* session closing — ignore late frames */
        }
      };
    } catch (err) {
      setError(describeError(err));
      setStatus('error');
      teardown();
    }
  }, [apiKey, handleMessage, teardown]);

  const stop = useCallback(() => {
    teardown();
    setStatus('idle');
  }, [teardown]);

  return { status, error, transcript, start, stop };
}
