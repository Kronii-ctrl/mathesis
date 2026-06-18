/**
 * PCM audio helpers for the Gemini Live API.
 *  - Microphone input is captured as Float32, converted to 16-bit PCM at 16 kHz
 *    and base64-encoded for sendRealtimeInput.
 *  - Model output arrives as base64 16-bit PCM at 24 kHz and is decoded into an
 *    AudioBuffer for playback.
 */

export const INPUT_SAMPLE_RATE = 16000;
export const OUTPUT_SAMPLE_RATE = 24000;

export interface PcmBlob {
  data: string;
  mimeType: string;
}

/** Float32 [-1,1] samples → base64 16-bit little-endian PCM blob for input. */
export function createBlob(input: Float32Array): PcmBlob {
  const int16 = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return {
    data: encodeBytes(new Uint8Array(int16.buffer)),
    mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`,
  };
}

export function encodeBytes(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function decodeBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Decode base64 16-bit PCM (mono) into an AudioBuffer for playback. */
export function decodePcmToAudioBuffer(
  base64: string,
  ctx: AudioContext,
  sampleRate = OUTPUT_SAMPLE_RATE,
): AudioBuffer {
  const bytes = decodeBytes(base64);
  const int16 = new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;
  const buffer = ctx.createBuffer(1, float32.length, sampleRate);
  buffer.copyToChannel(float32, 0);
  return buffer;
}
