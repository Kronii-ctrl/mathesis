import { useMemo, useState } from 'react';
import { allFormulas, boards, boardShort } from '../data/curriculum';
import type { BoardId } from '../types';
import { Latex, Markdown } from './Markdown';
import { SearchIcon } from './icons';

const boardColor: Record<string, string> = {
  igcse: 'var(--igcse)',
  aa: 'var(--aa)',
  ai: 'var(--ai)',
};

export function FormulaReference() {
  const [query, setQuery] = useState('');
  const [board, setBoard] = useState<BoardId | 'all'>('all');
  const formulas = useMemo(() => allFormulas(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return formulas.filter((f) => {
      if (board !== 'all' && f.board !== board) return false;
      if (!q) return true;
      const hay = [
        f.name, f.latex, f.note ?? '', (f.tags ?? []).join(' '),
        f.courseTitle, f.topicTitle, f.lessonTitle,
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [formulas, query, board]);

  return (
    <div className="page">
      <div className="container">
        <div className="section-head" style={{ marginTop: 12 }}>
          <h2>Formula reference</h2>
          <p>Every formula across all courses, in one searchable place.</p>
        </div>

        <div className="search-bar">
          <span className="search-ico"><SearchIcon width={20} height={20} /></span>
          <input
            type="search"
            placeholder="Search formulas — try “quadratic”, “sine rule”, “derivative”…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search formulas"
          />
        </div>

        <div className="filter-row">
          <span className="filter-label">Board</span>
          <button className={`chip ${board === 'all' ? 'active' : ''}`} onClick={() => setBoard('all')}>All</button>
          {boards.map((b) => (
            <button
              key={b.id}
              className={`chip ${board === b.id ? 'active' : ''}`}
              onClick={() => setBoard(b.id)}
            >
              {b.name}
            </button>
          ))}
        </div>

        <p className="count-line">{results.length} formula{results.length === 1 ? '' : 's'}</p>

        <div className="formula-ref-grid">
          {results.map((f) => (
            <div className="fref-card" key={`${f.courseId}-${f.id}`}>
              <div className="fref-top">
                <span className="board-badge" style={{ background: boardColor[f.board] }}>
                  {boardShort(f.board)}
                </span>
                <span className="fref-name">{f.name}</span>
              </div>
              <div className="fref-render"><Latex tex={f.latex} /></div>
              {f.note && <div className="fref-note"><Markdown block={false}>{f.note}</Markdown></div>}
              <div className="fref-src">
                <a href={`#/course/${f.courseId}/${f.lessonId}`}>
                  {f.courseLevel} · {f.lessonTitle}
                </a>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="gate"><p>No formulas match “{query}”. Try a different search or board.</p></div>
        )}
      </div>
    </div>
  );
}
