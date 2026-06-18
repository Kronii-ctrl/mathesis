import type { Formula, WorkedExample } from '../types';
import { Markdown, Latex } from './Markdown';
import { SigmaIcon, ChevronRight } from './icons';

/** "Key formulas" panel shown in a lesson. */
export function FormulaPanel({ formulas }: { formulas: Formula[] }) {
  if (!formulas.length) return null;
  return (
    <section className="panel" aria-label="Key formulas">
      <h3 className="panel-title">
        <span className="ico"><SigmaIcon width={18} height={18} /></span>
        Key formulas
      </h3>
      {formulas.map((f) => (
        <div className="formula-row" key={f.id}>
          <div className="meta">
            <div className="fname">{f.name}</div>
            {f.note && <div className="fnote"><Markdown block={false}>{f.note}</Markdown></div>}
          </div>
          <div className="formula-render"><Latex tex={f.latex} /></div>
        </div>
      ))}
    </section>
  );
}

/** Collapsible worked examples. */
export function WorkedExamples({ examples }: { examples: WorkedExample[] }) {
  if (!examples.length) return null;
  return (
    <section className="examples" aria-label="Worked examples">
      <h3 className="panel-title" style={{ marginBottom: 14 }}>
        <span className="ico"><SigmaIcon width={18} height={18} /></span>
        Worked examples
      </h3>
      {examples.map((ex, i) => (
        <details className="example" key={i}>
          <summary>
            <span className="ex-tag">Example {i + 1}</span>
            {ex.title}
            <span className="chev"><ChevronRight width={18} height={18} /></span>
          </summary>
          <div className="example-body">
            <div className="label">Problem</div>
            <Markdown>{ex.problem}</Markdown>
            <div className="label">Solution</div>
            <Markdown>{ex.solution}</Markdown>
          </div>
        </details>
      ))}
    </section>
  );
}
