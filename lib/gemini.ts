import { GoogleGenAI } from '@google/genai';

/**
 * Gemini integration for the AI maths tutor. Everything here is optional — the
 * rest of the site never imports the SDK at module-eval time in a way that
 * requires a key. A key is supplied at call time from the user's localStorage.
 */

export const TEXT_MODEL = 'gemini-2.5-flash';
// Native-audio Live model used for the live-voice tutor. Swap here if Google
// renames the preview model.
export const LIVE_MODEL = 'gemini-2.5-flash-native-audio-preview-09-2025';

export const TUTOR_SYSTEM_INSTRUCTION = `You are "Mathesis", a friendly, encouraging mathematics tutor for students taking Cambridge IGCSE Mathematics (0580) and IB Diploma Mathematics — both Analysis & Approaches (AA) and Applications & Interpretation (AI), at Standard Level (SL) and Higher Level (HL).

Your goals:
- Help students *understand* maths, not just get answers. Explain the reasoning and the method.
- Teach step by step. For multi-step problems, lay out the working clearly.
- When a student is clearly asking you to do their graded coursework or an exam question verbatim, guide them with hints and method rather than just handing over the final answer.
- Keep replies focused and reasonably concise; use short paragraphs, bullet points and numbered steps.

Formatting rules (very important):
- Write ALL mathematics in LaTeX. Use $...$ for inline maths and $$...$$ for display equations. Never write maths in plain ASCII like "x^2" — always "$x^2$".
- Use Markdown for structure (headings, bold, lists).

Scope:
- Stay on mathematics and closely-related study skills. If asked about an unrelated topic, gently steer back to maths.

Be warm and motivating. Celebrate progress.`;

let cached: { key: string; client: GoogleGenAI } | null = null;

export function getClient(apiKey: string): GoogleGenAI {
  if (cached && cached.key === apiKey) return cached.client;
  const client = new GoogleGenAI({ apiKey });
  cached = { key: apiKey, client };
  return client;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

/**
 * Stream a tutor reply. Calls onDelta with each text chunk and resolves with
 * the full reply text. Throws on API/auth errors so the UI can surface them.
 */
export async function streamTutorReply(
  apiKey: string,
  history: ChatMessage[],
  onDelta: (delta: string) => void,
): Promise<string> {
  const ai = getClient(apiKey);
  const contents = history.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

  const stream = await ai.models.generateContentStream({
    model: TEXT_MODEL,
    contents,
    config: {
      systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
      temperature: 0.4,
    },
  });

  let full = '';
  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) {
      full += text;
      onDelta(text);
    }
  }
  return full;
}

/** Turn an unknown thrown value into a readable message for the UI. */
export function describeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/api[_ ]?key|API key not valid|401|403|PERMISSION/i.test(msg)) {
    return 'That API key was rejected. Double-check it in Settings (it should be a Google AI Studio Gemini key).';
  }
  if (/quota|429|RESOURCE_EXHAUSTED/i.test(msg)) {
    return 'The Gemini API rate limit or quota was hit. Wait a moment and try again.';
  }
  if (/network|fetch|Failed to fetch/i.test(msg)) {
    return 'Network error reaching the Gemini API. Check your connection and try again.';
  }
  return msg || 'Something went wrong talking to the Gemini API.';
}
