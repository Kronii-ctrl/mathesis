import { useEffect, useRef, useState } from 'react';
import { useApiKey } from '../lib/storage';
import { streamTutorReply, describeError, type ChatMessage } from '../lib/gemini';
import { useLiveTutor } from '../lib/live';
import { Markdown } from './Markdown';
import { SparkIcon, SendIcon, MicIcon, StopIcon, LockIcon, KeyIcon } from './icons';

const SUGGESTIONS = [
  'Explain the discriminant of a quadratic',
  'How do I use the sine rule?',
  'Walk me through differentiating $x^2 e^x$',
  'What is compound interest, with an example?',
];

export function TutorView({ onOpenSettings }: { onOpenSettings: () => void }) {
  const [apiKey] = useApiKey();
  const [mode, setMode] = useState<'text' | 'voice'>('text');

  if (!apiKey) {
    return (
      <div className="page"><div className="container">
        <TutorHeader mode={mode} setMode={setMode} disabled />
        <div className="gate">
          <div className="lock"><LockIcon /></div>
          <h2>Add a Gemini key to unlock the tutor</h2>
          <p>
            The AI maths tutor — text and live voice — needs your own free Google Gemini API key.
            All lessons, practice and formulas work perfectly without it.
          </p>
          <button className="btn btn-primary" onClick={onOpenSettings}>
            <KeyIcon width={18} height={18} /> Add API key
          </button>
        </div>
      </div></div>
    );
  }

  return (
    <div className="page"><div className="container">
      <TutorHeader mode={mode} setMode={setMode} />
      {mode === 'text' ? <TextTutor apiKey={apiKey} /> : <VoiceTutor apiKey={apiKey} />}
    </div></div>
  );
}

function TutorHeader({
  mode, setMode, disabled,
}: { mode: 'text' | 'voice'; setMode: (m: 'text' | 'voice') => void; disabled?: boolean }) {
  return (
    <div className="section-head" style={{ marginTop: 12, alignItems: 'center' }}>
      <div>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SparkIcon width={22} height={22} /> Maths tutor
        </h2>
        <p>Ask anything about IGCSE or IB maths — by text or live voice.</p>
      </div>
      {!disabled && (
        <div className="mode-toggle" role="tablist">
          <button className={mode === 'text' ? 'active' : ''} onClick={() => setMode('text')}>Text</button>
          <button className={mode === 'voice' ? 'active' : ''} onClick={() => setMode('voice')}>Live voice</button>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Text tutor ----------------------------- */
function TextTutor({ apiKey }: { apiKey: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    windowRef.current?.scrollTo({ top: windowRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    setError(null);
    setInput('');
    const history: ChatMessage[] = [...messages, { role: 'user', text: content }];
    setMessages([...history, { role: 'model', text: '' }]);
    setBusy(true);
    try {
      await streamTutorReply(apiKey, history, (delta) => {
        setMessages((prev) => {
          const copy = prev.slice();
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, text: last.text + delta };
          return copy;
        });
      });
    } catch (err) {
      setError(describeError(err));
      setMessages((prev) => prev.slice(0, -1)); // drop empty model bubble
    } finally {
      setBusy(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  return (
    <div className="tutor-grid">
      {messages.length === 0 && (
        <div className="suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="suggestion" onClick={() => void send(s)}>{s}</button>
          ))}
        </div>
      )}

      <div className="chat-window" ref={windowRef}>
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="big">✦</div>
            <p>Ask a question to get started. I’ll explain step by step, with proper maths notation.</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.role === 'model' && !m.text && busy
                ? <span className="typing"><i /><i /><i /></span>
                : <Markdown>{m.text}</Markdown>}
            </div>
          ))
        )}
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="composer">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask a maths question…  (Enter to send, Shift+Enter for a new line)"
          rows={1}
        />
        <button className="btn btn-primary" disabled={busy || !input.trim()} onClick={() => void send(input)}>
          <SendIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------- Voice tutor ----------------------------- */
function VoiceTutor({ apiKey }: { apiKey: string }) {
  const { status, error, transcript, start, stop } = useLiveTutor(apiKey);
  const active = status !== 'idle' && status !== 'error';
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' });
  }, [transcript]);

  useEffect(() => () => stop(), [stop]); // stop session on unmount

  const label: Record<string, string> = {
    idle: 'Tap to start talking',
    connecting: 'Connecting…',
    listening: 'Listening — go ahead',
    speaking: 'Tutor is speaking…',
    error: 'Something went wrong',
  };

  return (
    <div className="voice-panel">
      <div className={`voice-orb ${status}`}>
        <MicIcon width={46} height={46} />
      </div>
      <div className="voice-status">{label[status]}</div>
      <p className="voice-hint">
        Have a spoken conversation with the tutor. Speak naturally — ask it to explain a concept or
        check your reasoning out loud.
      </p>

      {!active
        ? <button className="btn btn-primary" onClick={() => void start()}><MicIcon width={18} height={18} /> Start voice session</button>
        : <button className="btn btn-ghost" onClick={stop}><StopIcon width={18} height={18} /> End session</button>}

      {error && <div className="alert" style={{ maxWidth: 520, margin: '16px auto 0' }}>{error}</div>}

      {transcript.length > 0 && (
        <div className="transcript" ref={transcriptRef}>
          {transcript.map((l) => (
            <div key={l.id} className={`tline ${l.role} ${l.interim ? 'interim' : ''}`}>
              <div className="who">{l.role === 'user' ? 'You' : 'Tutor'}</div>
              <div>{l.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
