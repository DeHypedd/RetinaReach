import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';

const STAGES = ['Image preprocessing', 'Fundus field verification', 'Demo scenario selection', 'Explainability overlay', 'Uncertainty display'];

export default function StepAnalysis({ next }) {
  const [complete, setComplete] = useState(0);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const step = reduceMotion ? 0 : 420;
    const timers = [];

    STAGES.forEach((_, i) => {
      timers.push(setTimeout(() => setComplete(i + 1), step * (i + 1)));
    });
    timers.push(setTimeout(() => setFinished(true), step * STAGES.length + 300));

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!finished) return;
    const t = setTimeout(() => next(), 500);
    return () => clearTimeout(t);
  }, [finished, next]);

  return (
    <div className="proto-step proto-step--center">
      <h2 className="proto-step__title">Preparing the demo inference profile</h2>
      <p className="proto-step__lede">Illustrative demo animation — a trained diagnostic model is not running in this prototype.</p>

      <ul className="analysis-stages">
        {STAGES.map((stage, i) => {
          const done = i < complete;
          const active = i === complete;
          return (
            <li key={stage} className={done ? 'is-done' : active ? 'is-active' : ''}>
              {done ? <CheckCircle2 size={18} /> : active ? <Loader2 size={18} className="analysis-stages__spin" /> : <span className="analysis-stages__dot" />}
              <span>{stage}</span>
            </li>
          );
        })}
      </ul>

      {finished && (
        <Button onClick={next} icon={ArrowRight}>View result</Button>
      )}
    </div>
  );
}
