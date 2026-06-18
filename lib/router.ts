import { useEffect, useState, useCallback } from 'react';

/**
 * Tiny dependency-free hash router. Routes look like:
 *   #/                         → home
 *   #/courses                  → course list
 *   #/course/aa-sl            → a course explorer (optionally /lessonId)
 *   #/practice                 → practice hub (optionally /courseId)
 *   #/formulas                 → formula reference
 *   #/tutor                    → AI tutor
 */

export interface Route {
  segments: string[];
  hash: string;
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const segments = raw.split('/').filter(Boolean).map(decodeURIComponent);
  return { segments, hash: window.location.hash };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(path: string): void {
  const clean = path.startsWith('#') ? path : `#${path.startsWith('/') ? '' : '/'}${path}`;
  if (window.location.hash === clean) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = clean;
  }
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}

/** Convenience hook returning a stable navigate callback. */
export function useNavigate() {
  return useCallback((path: string) => navigate(path), []);
}
