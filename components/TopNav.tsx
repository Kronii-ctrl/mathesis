import { useApiKey } from '../lib/storage';
import { useHashRoute } from '../lib/router';
import { KeyIcon } from './icons';

const LINKS = [
  { label: 'Home', path: '#/', match: '' },
  { label: 'Courses', path: '#/courses', match: 'courses' },
  { label: 'Practice', path: '#/practice', match: 'practice' },
  { label: 'Formulas', path: '#/formulas', match: 'formulas' },
  { label: 'Tutor', path: '#/tutor', match: 'tutor' },
];

export function TopNav({ onOpenSettings }: { onOpenSettings: () => void }) {
  const route = useHashRoute();
  const [apiKey] = useApiKey();
  const current = route.segments[0] ?? '';
  // "course" routes belong to the Courses tab.
  const activeMatch = current === 'course' ? 'courses' : current;

  return (
    <header className="topnav">
      <div className="nav-inner">
        <a className="brand" href="#/">
          <span className="brand-mark">∑</span>
          Mathesis
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.path} href={l.path} className={`nav-link ${activeMatch === l.match ? 'active' : ''}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={onOpenSettings} title="Gemini API key settings">
            <span className={`key-dot ${apiKey ? 'on' : ''}`} />
            <KeyIcon width={16} height={16} />
            <span className="hide-sm">API key</span>
          </button>
        </div>
      </div>
    </header>
  );
}
