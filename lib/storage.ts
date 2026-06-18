import { useCallback, useEffect, useState } from 'react';

/**
 * The Gemini API key is optional. It is stored only in the browser's
 * localStorage and is never sent anywhere except directly to Google's API by
 * the @google/genai SDK. All site content works with no key set.
 */
const KEY = 'mathesis.geminiApiKey';

export function getApiKey(): string {
  try {
    return localStorage.getItem(KEY) ?? '';
  } catch {
    return '';
  }
}

export function setApiKey(value: string): void {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable (e.g. private mode) — tutor simply stays disabled */
  }
  window.dispatchEvent(new Event('mathesis-apikey'));
}

/** React hook giving the current key and a setter that updates all listeners. */
export function useApiKey(): [string, (v: string) => void] {
  const [key, setKey] = useState<string>(getApiKey);

  useEffect(() => {
    const sync = () => setKey(getApiKey());
    window.addEventListener('mathesis-apikey', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('mathesis-apikey', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const update = useCallback((v: string) => setApiKey(v.trim()), []);
  return [key, update];
}
