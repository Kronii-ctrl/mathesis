// Core domain types for the curriculum. Designed so new boards/courses/topics
// can be added to data/curriculum.ts without touching component code.

export type BoardId = 'igcse' | 'aa' | 'ai';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

/** A single formula shown in a lesson's "key formulas" panel and aggregated
 *  into the global, searchable formula reference. */
export interface Formula {
  id: string;
  /** Human name, e.g. "Quadratic formula". */
  name: string;
  /** KaTeX source (no surrounding $). Rendered in display mode. */
  latex: string;
  /** Optional markdown note about when/how to use it. */
  note?: string;
  /** Extra search keywords beyond the name. */
  tags?: string[];
}

/** A collapsible worked example: a problem and its full step-by-step solution. */
export interface WorkedExample {
  title: string;
  /** Markdown + LaTeX problem statement. */
  problem: string;
  /** Markdown + LaTeX worked solution. */
  solution: string;
}

/** A practice question with a reveal-able short answer and full solution. */
export interface PracticeQuestion {
  id: string;
  difficulty: Difficulty;
  /** Markdown + LaTeX prompt. */
  prompt: string;
  /** Short reveal-able answer (markdown + LaTeX). */
  answer: string;
  /** Full worked solution (markdown + LaTeX). */
  solution: string;
}

export interface Lesson {
  id: string;
  title: string;
  /** One-line summary used in lists and cards. */
  summary: string;
  /** Markdown + LaTeX lesson body. */
  content: string;
  formulas?: Formula[];
  examples?: WorkedExample[];
  questions?: PracticeQuestion[];
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  board: BoardId;
  /** Short tag shown on cards, e.g. "0580", "SL", "HL". */
  level: string;
  title: string;
  subtitle: string;
  description: string;
  /** Accent colour (CSS colour) used across the course UI. */
  accent: string;
  topics: Topic[];
}

export interface Board {
  id: BoardId;
  name: string;
  short: string;
}

/** A formula flattened for the global reference, carrying its source course. */
export interface IndexedFormula extends Formula {
  courseId: string;
  courseTitle: string;
  courseLevel: string;
  board: BoardId;
  topicTitle: string;
  lessonId: string;
  lessonTitle: string;
}
