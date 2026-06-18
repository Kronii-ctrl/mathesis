import { useState } from 'react';
import type { PracticeQuestion } from '../types';
import { Markdown } from './Markdown';
import { CheckIcon, BookIcon } from './icons';

interface Props {
  question: PracticeQuestion;
  /** Optional "Topic · Lesson" source label shown on the right. */
  source?: string;
}

export function PracticeQuestionCard({ question, source }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <article className="pq-card">
      <div className="pq-head">
        <span className={`difficulty-pill diff-${question.difficulty}`}>{question.difficulty}</span>
        {source && <span className="pq-source">{source}</span>}
      </div>

      <div className="pq-prompt"><Markdown>{question.prompt}</Markdown></div>

      <div className="pq-actions">
        <button
          className="btn btn-ghost"
          aria-expanded={showAnswer}
          onClick={() => setShowAnswer((v) => !v)}
        >
          <CheckIcon width={17} height={17} />
          {showAnswer ? 'Hide answer' : 'Reveal answer'}
        </button>
        <button
          className="btn btn-ghost"
          aria-expanded={showSolution}
          onClick={() => setShowSolution((v) => !v)}
        >
          <BookIcon width={17} height={17} />
          {showSolution ? 'Hide worked solution' : 'Worked solution'}
        </button>
      </div>

      {showAnswer && (
        <div className="reveal-box answer">
          <p className="rl">Answer</p>
          <Markdown>{question.answer}</Markdown>
        </div>
      )}
      {showSolution && (
        <div className="reveal-box solution">
          <p className="rl">Worked solution</p>
          <Markdown>{question.solution}</Markdown>
        </div>
      )}
    </article>
  );
}
