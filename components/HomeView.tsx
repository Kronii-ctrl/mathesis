import { courses } from '../data/curriculum';
import { useNavigate } from '../lib/router';
import { CourseCard } from './CourseCard';
import { BookIcon, PencilIcon, SigmaIcon, SparkIcon, ArrowRight } from './icons';

const features = [
  { icon: <BookIcon />, title: 'Topic lessons', body: 'Clear explanations with key-formula panels and collapsible worked examples for every topic.' },
  { icon: <PencilIcon />, title: 'Graded practice', body: 'Easy, Medium and Hard questions with reveal-able answers and full step-by-step solutions.' },
  { icon: <SigmaIcon />, title: 'Formula reference', body: 'Every formula across all courses, searchable and filterable by exam board.' },
  { icon: <SparkIcon />, title: 'AI maths tutor', body: 'Ask questions by text or live voice — optional, and powered by your own Gemini key.' },
];

export function HomeView() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <span className="eyebrow">IGCSE · IB Analysis & Approaches · Applications & Interpretation</span>
          <h1 className="hero-title">
            Master <span className="grad">IGCSE &amp; IB Mathematics</span><br />at your own pace
          </h1>
          <p className="hero-sub">
            Lessons, key formulas, worked examples and graded practice for Cambridge IGCSE (0580)
            and IB Maths AA &amp; AI — plus an optional AI tutor. Everything works with no sign-up
            and no API key.
          </p>
          <div className="cta-row">
            <button className="btn btn-primary" onClick={() => navigate('/courses')}>
              Browse courses <ArrowRight width={18} height={18} />
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/practice')}>Jump into practice</button>
            <button className="btn btn-ghost" onClick={() => navigate('/formulas')}>Formula reference</button>
          </div>
        </section>

        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="ico">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="section-head">
          <h2>Choose your course</h2>
          <p>{courses.length} courses · {courses.reduce((n, c) => n + c.topics.reduce((m, t) => m + t.lessons.length, 0), 0)} lessons</p>
        </div>
        <div className="course-grid">
          {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
    </div>
  );
}
