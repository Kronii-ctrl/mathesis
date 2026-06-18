import type { Course } from '../types';
import { boardShort } from '../data/curriculum';
import { useNavigate } from '../lib/router';
import { ArrowRight } from './icons';

const boardColor: Record<string, string> = {
  igcse: 'var(--igcse)',
  aa: 'var(--aa)',
  ai: 'var(--ai)',
};

export function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();
  const topicCount = course.topics.length;
  const lessonCount = course.topics.reduce((n, t) => n + t.lessons.length, 0);

  return (
    <button
      className="course-card"
      style={{ ['--card-accent' as string]: course.accent }}
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <div className="card-badges">
        <span className="board-badge" style={{ background: boardColor[course.board] }}>
          {boardShort(course.board)}
        </span>
        <span className="level-tag">{course.level}</span>
      </div>
      <h3>{course.title}</h3>
      <p className="sub">{course.subtitle}</p>
      <p>{course.description}</p>
      <div className="course-meta">
        <span>{topicCount} topics</span>
        <span>{lessonCount} lessons</span>
        <span style={{ marginLeft: 'auto', color: course.accent, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Explore <ArrowRight width={15} height={15} />
        </span>
      </div>
    </button>
  );
}
