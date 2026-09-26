import { RotateCcw as Restart } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Note from '../../components/ui/Note.jsx';
import { ICDR_GRADES, REVIEW_PATHWAYS } from '../../data/demoData.js';

export default function StepHistory({ patient, result, review, restart }) {
  if (!patient || !result) return null;

  const finalGrade = review.status === 'overridden' ? review.overriddenGrade : result.grade;
  const timeline = [...patient.history, { year: 2026, grade: finalGrade, current: true }]
    .filter((entry, i, arr) => i === arr.length - 1 || entry.year !== arr[arr.length - 1].year);

  return (
    <div className="proto-step">
      <h2 className="proto-step__title">Screening history for {patient.name}</h2>
      <p className="proto-step__lede">Prototype visualisation of longitudinal screening records — demo data only.</p>

      <ol className="history-timeline">
        {timeline.map((entry) => {
          const info = ICDR_GRADES[entry.grade];
          return (
            <li key={entry.year} className={entry.current ? 'is-current' : ''}>
              <span className="history-timeline__year">{entry.year}{entry.current ? ' (this visit)' : ''}</span>
              <Badge tone={info.color}>ICDR {entry.grade} — {info.short}</Badge>
            </li>
          );
        })}
      </ol>

      <div className="history-followup">
        <p className="review-panel__field-label">Follow-up / referral status</p>
        <p>{REVIEW_PATHWAYS[finalGrade]}</p>
        <Note>The reviewed result can be used to determine the appropriate clinical follow-up pathway. Final follow-up decisions remain with the responsible clinician.</Note>
      </div>

      <div className="proto-step__footer">
        <span />
        <Button onClick={restart} icon={Restart} iconPosition="left">Start a new screening</Button>
      </div>
    </div>
  );
}
