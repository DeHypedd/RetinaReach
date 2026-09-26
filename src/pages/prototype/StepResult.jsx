import { ArrowRight, RotateCcw } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Note from '../../components/ui/Note.jsx';
import { ICDR_GRADES, REVIEW_PATHWAYS } from '../../data/demoData.js';

const UNCERTAINTY_TONE = { LOW: 'success', MODERATE: 'warning', HIGH: 'danger' };

export default function StepResult({ result, quality, next, back }) {
  if (!result) return null;
  const gradeInfo = ICDR_GRADES[result.grade];

  return (
    <div className="proto-step">
      <p className="eyebrow">Simulated inference profile</p>
      <h2 className="proto-step__title">Illustrative result for reviewer consideration</h2>

      <div className="result-panel">
        <div className="result-panel__grade">
          <span className="result-panel__grade-number">{result.grade}</span>
          <div>
            <p className="result-panel__grade-label">{gradeInfo.label}</p>
            <Badge tone={gradeInfo.color}>ICDR {result.grade} · {gradeInfo.short}</Badge>
          </div>
        </div>
        <p className="result-panel__desc">{gradeInfo.description}</p>

        <div className="result-panel__metrics">
          <div>
            <p className="result-panel__metric-label">Demo confidence</p>
            <p className="result-panel__metric-value">{Math.round(result.confidence * 100)}%</p>
            <p className="result-panel__metric-note">Deterministically varied from this image’s non-clinical visual signature; not a clinical probability</p>
          </div>
          <div>
            <p className="result-panel__metric-label">Uncertainty</p>
            <Badge tone={UNCERTAINTY_TONE[result.uncertainty]}>{result.uncertainty}</Badge>
            <p className="result-panel__metric-note">
              {result.uncertainty === 'LOW' ? 'Consistent across repeated inference passes.' : 'Recommend closer review before acting on this result.'}
            </p>
          </div>
          <div>
            <p className="result-panel__metric-label">Image quality</p>
            <Badge tone="success">{quality?.status || 'GOOD'}</Badge>
            <p className="result-panel__metric-note">Quality gate result</p>
          </div>
        </div>

        <div className="result-panel__pathway">
          <p className="result-panel__metric-label">Clinical follow-up / referral</p>
          <p>{REVIEW_PATHWAYS[result.grade]} It is determined after specialist review.</p>
        </div>
      </div>

      <Note>This prototype does not run a trained diagnostic model. The displayed scenario varies by image signature to avoid patient-prewired outcomes; it is not a diagnosis. A reviewing ophthalmologist confirms every result in step 7.</Note>

      <div className="proto-step__footer">
        <Button variant="secondary" onClick={back} icon={RotateCcw} iconPosition="left">Back</Button>
        <Button onClick={next} icon={ArrowRight}>See the explainability view</Button>
      </div>
    </div>
  );
}
