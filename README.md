# Mathesis — IGCSE & IB Maths Self-Study

A self-study website for **Cambridge IGCSE Mathematics (0580)** and **IB Diploma Mathematics** —
both *Analysis & Approaches* (AA) and *Applications & Interpretation* (AI), at Standard and Higher Level.

## Features

- **Course explorer** — topic lessons for each syllabus, each with a **key-formula panel** and
  **collapsible worked examples**.
- **Interactive practice** — Easy / Medium / Hard questions with reveal-able answers and full
  step-by-step worked solutions, filterable by course and difficulty.
- **Formula reference** — every formula across all courses in one place, searchable and
  filterable by exam board.
- **AI maths tutor** — ask questions by **text** or **live voice**. This is the only feature that
  needs a key: it runs on your own [Google Gemini API key](https://aistudio.google.com/apikey).
  **All other content works with no key and no sign-up.**
- Shared **Markdown + LaTeX (KaTeX)** renderer and a **top-nav site shell with client-side
  hash routing**.

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + bundle to dist/
npm run preview  # preview the production build
```

## Adding content

All curriculum content lives in [`data/curriculum.ts`](data/curriculum.ts). To extend the site,
add a `Course` (or push topics/lessons into an existing one) — no component code needs to change.
Lesson bodies, problems and solutions are Markdown + LaTeX: use `$...$` for inline maths and
`$$...$$` for display maths.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | Entry HTML; the `<script type="module" src="/index.tsx">` lets Vite bundle the app. |
| `index.tsx` / `App.tsx` | React root and site shell + view routing. |
| `data/curriculum.ts` | All courses, topics, lessons, formulas, examples and questions. |
| `lib/` | Markdown+KaTeX renderer, hash router, API-key storage, Gemini text + Live-voice clients. |
| `components/` | Views (Home, Courses, Course explorer, Practice, Formula reference, Tutor) and shared UI. |

The Gemini key is stored only in the browser's `localStorage` and is sent directly to Google's
API by the `@google/genai` SDK.

> The previous single-screen prototype is preserved as `legacy-quiz.html`.
