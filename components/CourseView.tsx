import { getCourse, boardName } from '../data/curriculum';
import { useNavigate } from '../lib/router';
import { Markdown } from './Markdown';
import { FormulaPanel, WorkedExamples } from './LessonParts';
import { PracticeQuestionCard } from './PracticeQuestionCard';
import { ArrowRight, PencilIcon } from './icons';

interface Props {
  courseId: string;
  lessonId?: string;
}

export function CourseView({ courseId, lessonId }: Props) {
  const navigate = useNavigate();
  const course = getCourse(courseId);

  if (!course) {
    return (
      <div className="page"><div className="container">
        <div className="gate">
          <h2>Course not found</h2>
          <p>We couldn’t find that course.</p>
          <button className="btn btn-primary" onClick={() => navigate('/courses')}>All courses</button>
        </div>
      </div></div>
    );
  }

  const allLessons = course.topics.flatMap((t) => t.lessons.map((l) => ({ topic: t, lesson: l })));
  const active = allLessons.find((x) => x.lesson.id === lessonId) ?? allLessons[0];
  const { topic, lesson } = active;

  return (
    <div className="page">
      <div className="container">
        <div className="course-layout">
          <aside className="lesson-sidebar">
            <h2 className="sidebar-course-title" style={{ color: course.accent }}>{course.title}</h2>
            <p className="sidebar-course-sub">{course.subtitle}</p>
            {course.topics.map((t) => (
              <div className="topic-group" key={t.id}>
                <p className="topic-name">{t.title}</p>
                {t.lessons.map((l) => (
                  <button
                    key={l.id}
                    className={`lesson-link ${l.id === lesson.id ? 'active' : ''}`}
                    onClick={() => navigate(`/course/${course.id}/${l.id}`)}
                  >
                    {l.title}
                  </button>
                ))}
              </div>
            ))}
          </aside>

          <main>
            <nav className="breadcrumb">
              <a href="#/courses">Courses</a>
              <span className="sep">/</span>
              <span>{boardName(course.board)}</span>
              <span className="sep">/</span>
              <span>{topic.title}</span>
            </nav>

            <header className="lesson-header">
              <h1>{lesson.title}</h1>
              <p className="summary">{lesson.summary}</p>
            </header>

            <Markdown>{lesson.content}</Markdown>

            {lesson.formulas?.length ? <FormulaPanel formulas={lesson.formulas} /> : null}
            {lesson.examples?.length ? <WorkedExamples examples={lesson.examples} /> : null}

            {lesson.questions?.length ? (
              <section style={{ marginTop: 30 }}>
                <h3 className="panel-title" style={{ marginBottom: 16 }}>
                  <span className="ico"><PencilIcon width={18} height={18} /></span>
                  Practice
                </h3>
                {lesson.questions.map((q) => (
                  <PracticeQuestionCard key={q.id} question={q} />
                ))}
                <button
                  className="btn btn-ghost"
                  style={{ marginTop: 8 }}
                  onClick={() => navigate(`/practice/${course.id}`)}
                >
                  More practice for this course <ArrowRight width={16} height={16} />
                </button>
              </section>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
