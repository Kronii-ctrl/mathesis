import { useMemo } from 'react';
import { renderMarkdown, renderFormula } from '../lib/render';

interface MarkdownProps {
  children: string;
  className?: string;
  block?: boolean;
}

/** Render Markdown + LaTeX content as sanitised HTML. */
export function Markdown({ children, className, block = true }: MarkdownProps) {
  const html = useMemo(() => renderMarkdown(children), [children]);
  const Tag = block ? 'div' : 'span';
  return <Tag className={`prose ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Render a single formula (no surrounding markdown). */
export function Latex({ tex, display = true }: { tex: string; display?: boolean }) {
  const html = useMemo(() => renderFormula(tex, display), [tex, display]);
  return <span className="latex" dangerouslySetInnerHTML={{ __html: html }} />;
}
