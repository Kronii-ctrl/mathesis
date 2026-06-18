import { useState } from 'react';
import { courses, getCourse, courseQuestions, boardShort } from '../data/curriculum';
import type { Difficulty } from '../types';
import { useNavigate } from '../lib/router';
import { PracticeQuestionCard } from './PracticeQuestionCard';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export function PracticeView({ courseId }: { courseId?: string }) {
  const navigate = useNavigate();
  const selectedId = (courseId && getCourse(courseId)) ? courseId : courses[0].id;
  const course = getCourse(selectedId)!;
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');

  const questions = courseQuestions(selectedId).filter(
    (q) => difficulty === 'All' || q.difficulty === difficulty,
  );

  return (
    <div className="page">
      <div className="container">
        <div className="section-head" style={{ marginTop: 12 }}>
          <h2>Practice</h2>
          <p>Reveal answers and full worked solutions when you’re ready.</p>
        </div>

        <div className="filter-row">
          <span className="filter-label">Course</span>
          {courses.map((c) => (
            <button
              key={c.id}
              className={`chip ${c.id === selectedId ? 'active' : ''}`}
              onClick={() => navigate(`/practice/${c.id}`)}
            >
              {boardShort(c.board)} {c.level}
            </button>
          ))}
        </div>

        <div className="filter-row" style={{ marginTop: -8 }}>
          <span className="filter-label">Difficulty</span>
          <button className={`chip ${difficulty === 'All' ? 'active' : ''}`} onClick={() => setDifficulty('All')}>All</button>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              className={`chip ${difficulty === d ? 'active' : ''}`}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <p className="count-line">
          {questions.length} question{questions.length === 1 ? '' : 's'} · {course.title}
        </p>

        {questions.map((q) => (
          <PracticeQuestionCard
            key={q.id}
            question={q}
            source={`${q.topicTitle} · ${q.lessonTitle}`}
          />
        ))}

        {questions.length === 0 && (
          <div className="gate"><p>No questions match this filter yet.</p></div>
        )}
      </div>
    </div>
  );
}
