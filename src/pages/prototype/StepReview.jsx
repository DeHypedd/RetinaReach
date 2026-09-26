import { useState } from 'react';
import { ArrowRight, RotateCcw, CheckCircle2, PenLine } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { ICDR_GRADES } from '../../data/demoData.js';

export default function StepReview({ patient, imageUrl, result, review, setReview, next, back }) {
  const [mode, setMode] = useState('confirm'); // 'confirm' | 'override'
  const [note, setNote] = useState(review.note || '');
  const [overrideGrade, setOverrideGrade] = useState(result?.grade ?? 0);

  if (!result) return null;
  const submitted = review.status !== 'pending';

  function submit() {
    setReview({
      status: mode === 'confirm' ? 'confirmed' : 'overridden',
      overriddenGrade: mode === 'override' ? overrideGrade : null,
      note,
    });
  }

  const finalGrade = review.status === 'overridden' ? review.overriddenGrade : result.grade;

  return (
    <div className="proto-step">
      <h2 className="proto-step__title">Ophthalmologist review</h2>
      <p className="proto-step__lede">
        The workflow ends its AI-assisted portion here. Nothing becomes a final record until a
        clinician confirms or overrides it.
      </p>

      <div className="review-panel">
        <div className="review-panel__summary">
          {imageUrl && <img src={imageUrl} alt="Case under review" className="review-panel__thumb" />}
          <div>
            <p className="review-panel__patient">{patient?.name} · {patient?.id}</p>
            <p className="review-panel__ai">AI-assisted suggestion: <strong>ICDR {result.grade} — {ICDR_GRADES[result.grade].short}</strong></p>
            <p className="review-panel__ai-meta">
              Confidence {Math.round(result.confidence * 100)}% · Uncertainty {result.uncertainty}
            </p>
          </div>
        </div>

        {!submitted ? (
          <>
            <div className="review-panel__mode" role="radiogroup" aria-label="Review decision">
              <button className={`review-panel__mode-btn ${mode === 'confirm' ? 'is-active' : ''}`} onClick={() => setMode('confirm')}>
                Confirm AI-assisted result
              </button>
              <button className={`review-panel__mode-btn ${mode === 'override' ? 'is-active' : ''}`} onClick={() => setMode('override')}>
                Override result
              </button>
            </div>

            {mode === 'override' && (
              <label className="review-panel__field">
                <span>Corrected ICDR grade</span>
                <select value={overrideGrade} onChange={(e) => setOverrideGrade(Number(e.target.value))}>
                  {ICDR_GRADES.map((g) => (
                    <option key={g.grade} value={g.grade}>{g.grade} — {g.label}</option>
                  ))}
                </select>
              </label>
            )}

            <label className="review-panel__field">
              <span><PenLine size={13} aria-hidden="true" /> Review note (optional)</span>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Image quality adequate; agree with lesion evidence around superior arcade."
              />
            </label>

            <Button onClick={submit}>Submit review</Button>
          </>
        ) : (
          <div className="review-panel__done">
            <Badge tone="success"><CheckCircle2 size={12} aria-hidden="true" /> Reviewed</Badge>
            <p>
              {review.status === 'confirmed'
                ? 'AI-assisted result confirmed by reviewing clinician.'
                : `Result overridden — final grade recorded as ICDR ${finalGrade} (${ICDR_GRADES[finalGrade].label}).`}
            </p>
            {note && <p className="review-panel__note-echo">&ldquo;{note}&rdquo;</p>}
          </div>
        )}
      </div>

      <div className="proto-step__footer">
        <Button variant="secondary" onClick={back} icon={RotateCcw} iconPosition="left">Back</Button>
        <Button onClick={next} disabled={!submitted} icon={ArrowRight}>View patient history</Button>
      </div>
    </div>
  );
}
