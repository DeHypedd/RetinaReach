import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Circle, RotateCcw, ArrowRight, Wand2 } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Note from '../../components/ui/Note.jsx';

const STATUS_COPY = {
  GOOD: { tone: 'success', title: 'Good', body: 'Image passed every quality check and is ready for AI-assisted analysis.' },
  BORDERLINE: { tone: 'warning', title: 'Borderline', body: 'One check did not clearly pass. Enhancement may recover a usable image.' },
  UNGRADABLE: { tone: 'danger', title: 'Ungradable', body: 'Too many checks failed to proceed reliably. A recapture is recommended.' },
};

export default function StepQuality({ quality, setQualityStatus, next, back }) {
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const step = reduceMotion ? 0 : 260;
    const count = quality?.checks.length ?? 0;
    const timers = [];

    for (let i = 1; i <= count; i += 1) {
      timers.push(setTimeout(() => setRevealed(i), step * i));
    }
    timers.push(setTimeout(() => setDone(true), step * count + 200));

    return () => timers.forEach(clearTimeout);
  }, [quality]);

  if (!quality) return null;

  const status = STATUS_COPY[quality.status];
  const canContinue = done && (quality.status === 'GOOD' || (quality.status === 'BORDERLINE' && enhanced));

  return (
    <div className="proto-step">
      <h2 className="proto-step__title">Running the image quality gate</h2>
      <p className="proto-step__lede">
        Every capture is screened before it reaches the classifier, so a bad photo produces a
        request for a better one instead of an unreliable result.
      </p>

      <ul className="quality-checklist">
        {quality.checks.map((check, i) => {
          const shown = i < revealed;
          const icon = !shown ? <Circle size={16} className="quality-checklist__pending" /> :
            check.pass ? <CheckCircle2 size={16} className="quality-checklist__pass" /> :
            <XCircle size={16} className="quality-checklist__fail" />;
          return (
            <li key={check.name} className={shown ? 'is-shown' : ''}>
              {icon}
              <span>{check.name}</span>
            </li>
          );
        })}
      </ul>

      {done && (
        <div className={`quality-result quality-result--${status.tone}`}>
          <Badge tone={status.tone}>{status.title}</Badge>
          <p>{status.body}</p>

          {quality.status === 'BORDERLINE' && !enhanced && (
            <Button variant="secondary" size="sm" icon={Wand2} onClick={() => setEnhanced(true)}>
              Apply enhancement (prototype demonstration)
            </Button>
          )}
          {quality.status === 'BORDERLINE' && enhanced && (
            <Note tone="primary">Enhancement applied — contrast and illumination adjusted for this prototype demonstration. Not a guaranteed clinical image recovery.</Note>
          )}

          {quality.status === 'UNGRADABLE' && (
            <div className="quality-result__actions">
              <Button variant="secondary" size="sm" icon={RotateCcw} onClick={back}>Retake image</Button>
              <Button variant="ghost" size="sm" onClick={() => setQualityStatus('BORDERLINE')}>
                Simulate improved recapture (demo shortcut)
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="proto-step__footer">
        <Button variant="secondary" onClick={back} icon={RotateCcw} iconPosition="left">Back</Button>
        <Button onClick={next} disabled={!canContinue} icon={ArrowRight}>Proceed to AI analysis</Button>
      </div>
    </div>
  );
}
