import { marked } from 'marked';
import katex from 'katex';
import DOMPurify from 'dompurify';

/**
 * Shared Markdown + LaTeX renderer used by every view.
 *
 * Strategy:
 *  1. Pull math segments ($...$, $$...$$, \(...\), \[...\]) out into private-use
 *     placeholder characters so Markdown can't mangle them. Escaped \$ is treated
 *     as a literal dollar (so we can write currency like \$84 in content).
 *  2. Render the remaining text as GitHub-flavoured Markdown.
 *  3. Sanitise the Markdown-produced HTML with DOMPurify (important: the AI tutor
 *     produces untrusted Markdown).
 *  4. Re-insert KaTeX-rendered math. KaTeX runs with trust:false / throwOnError:false,
 *     so its output is safe HTML even for untrusted LaTeX.
 */

marked.setOptions({ gfm: true, breaks: false });

interface MathToken {
  placeholder: string;
  latex: string;
  display: boolean;
}

// Private-use Unicode characters: ignored by Markdown and preserved by DOMPurify.
const OPEN = String.fromCharCode(0xe000);
const CLOSE = String.fromCharCode(0xe001);

function tokenizeMath(src: string): { text: string; tokens: MathToken[] } {
  const tokens: MathToken[] = [];
  let out = '';
  let i = 0;
  const n = src.length;

  const push = (latex: string, display: boolean) => {
    const placeholder = `${OPEN}${tokens.length}${CLOSE}`;
    tokens.push({ placeholder, latex: latex.trim(), display });
    out += placeholder;
  };

  while (i < n) {
    const ch = src[i];

    if (ch === '\\') {
      const next = src[i + 1];
      if (next === '$') { out += '$'; i += 2; continue; }      // literal dollar
      if (next === '(') {                                       // \( inline \)
        const end = src.indexOf('\\)', i + 2);
        if (end !== -1) { push(src.slice(i + 2, end), false); i = end + 2; continue; }
      }
      if (next === '[') {                                       // \[ display \]
        const end = src.indexOf('\\]', i + 2);
        if (end !== -1) { push(src.slice(i + 2, end), true); i = end + 2; continue; }
      }
      out += ch + (next ?? '');                                 // keep other escapes
      i += 2;
      continue;
    }

    if (ch === '$') {
      if (src[i + 1] === '$') {                                 // $$ display $$
        const end = src.indexOf('$$', i + 2);
        if (end !== -1) { push(src.slice(i + 2, end), true); i = end + 2; continue; }
      }
      // inline $...$ — scan for the next unescaped dollar
      let j = i + 1;
      let buf = '';
      let closed = false;
      while (j < n) {
        if (src[j] === '\\' && src[j + 1] === '$') { buf += '$'; j += 2; continue; }
        if (src[j] === '\\') { buf += src[j] + (src[j + 1] ?? ''); j += 2; continue; }
        if (src[j] === '$') { closed = true; break; }
        buf += src[j];
        j++;
      }
      if (closed) { push(buf, false); i = j + 1; continue; }
      out += ch;
      i++;
      continue;
    }

    out += ch;
    i++;
  }

  return { text: out, tokens };
}

function renderMath(latex: string, display: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      trust: false,
    });
  } catch {
    return `<code class="math-error">${latex}</code>`;
  }
}

export function renderMarkdown(src: string): string {
  if (!src) return '';
  const { text, tokens } = tokenizeMath(src);

  let html = marked.parse(text) as string;
  html = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  for (const token of tokens) {
    const mathHtml = renderMath(token.latex, token.display);
    if (token.display) {
      // Unwrap a paragraph that contains only this display-math placeholder.
      const soloParagraph = new RegExp(`<p>\\s*${token.placeholder}\\s*</p>`, 'g');
      html = html.replace(soloParagraph, mathHtml);
    }
    html = html.split(token.placeholder).join(mathHtml);
  }

  return html;
}

/** Render just a snippet of LaTeX (no markdown), e.g. a single formula. */
export function renderFormula(latex: string, display = true): string {
  return renderMath(latex, display);
}
