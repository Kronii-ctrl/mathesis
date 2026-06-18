import { useEffect, useState } from 'react';
import { useApiKey } from '../lib/storage';
import { KeyIcon } from './icons';

export function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [savedKey, setKey] = useApiKey();
  const [draft, setDraft] = useState(savedKey);

  useEffect(() => { if (open) setDraft(savedKey); }, [open, savedKey]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const save = () => { setKey(draft); onClose(); };
  const clear = () => { setKey(''); setDraft(''); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Gemini API key settings">
        <h2><KeyIcon width={20} height={20} style={{ verticalAlign: '-3px', marginRight: 8 }} />Gemini API key</h2>
        <p>
          The AI tutor (text &amp; live voice) is optional and runs on your own Google Gemini key.
          Everything else on the site works without one. Your key is stored only in this browser and
          is sent directly to Google — never to us.
        </p>

        <label className="field-label" htmlFor="api-key">API key</label>
        <input
          id="api-key"
          className="text-input"
          type="password"
          placeholder="AIza…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <p className="hint" style={{ marginTop: 10 }}>
          Get a free key from{' '}
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
            Google AI Studio
          </a>.
        </p>

        {savedKey
          ? <p className="status-line ok">✓ A key is currently saved.</p>
          : <p className="status-line warn">No key saved — tutor disabled.</p>}

        <div className="modal-actions">
          {savedKey && <button className="btn btn-ghost" onClick={clear}>Remove key</button>}
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
