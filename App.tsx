import { lazy, Suspense, useState } from 'react';
import { useHashRoute } from './lib/router';
import { TopNav } from './components/TopNav';
import { SettingsModal } from './components/SettingsModal';
import { HomeView } from './components/HomeView';
import { CoursesView } from './components/CoursesView';
import { CourseView } from './components/CourseView';
import { PracticeView } from './components/PracticeView';
import { FormulaReference } from './components/FormulaReference';

// Code-split the AI tutor so the Gemini SDK is only downloaded when it's opened —
// the lessons/practice/formulas all load without it.
const TutorView = lazy(() => import('./components/TutorView').then((m) => ({ default: m.TutorView })));

export default function App() {
  const route = useHashRoute();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const openSettings = () => setSettingsOpen(true);

  const [section, a, b] = route.segments;

  let view;
  switch (section) {
    case undefined:
    case '':
      view = <HomeView />;
      break;
    case 'courses':
      view = <CoursesView />;
      break;
    case 'course':
      view = <CourseView courseId={a} lessonId={b} />;
      break;
    case 'practice':
      view = <PracticeView courseId={a} />;
      break;
    case 'formulas':
      view = <FormulaReference />;
      break;
    case 'tutor':
      view = (
        <Suspense fallback={<div className="page"><div className="container"><p className="count-line">Loading tutor…</p></div></div>}>
          <TutorView onOpenSettings={openSettings} />
        </Suspense>
      );
      break;
    default:
      view = <HomeView />;
  }

  return (
    <>
      <TopNav onOpenSettings={openSettings} />
      {view}
      <footer className="footer">
        <div className="container">
          <span>Mathesis — self-study for Cambridge IGCSE 0580 &amp; IB Mathematics (AA / AI).</span>
          <span>Content is for study practice. AI tutor is optional and uses your own Gemini key.</span>
        </div>
      </footer>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
