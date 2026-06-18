import { useState } from 'react';
import { boards, courses } from '../data/curriculum';
import type { BoardId } from '../types';
import { CourseCard } from './CourseCard';

export function CoursesView() {
  const [board, setBoard] = useState<BoardId | 'all'>('all');
  const filtered = board === 'all' ? courses : courses.filter((c) => c.board === board);

  return (
    <div className="page">
      <div className="container">
        <div className="section-head" style={{ marginTop: 12 }}>
          <h2>All courses</h2>
          <p>Pick a syllabus to start exploring topics and lessons.</p>
        </div>

        <div className="filter-row">
          <span className="filter-label">Exam board</span>
          <button className={`chip ${board === 'all' ? 'active' : ''}`} onClick={() => setBoard('all')}>
            All
          </button>
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

        <div className="course-grid">
          {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
    </div>
  );
}
