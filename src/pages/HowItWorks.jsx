import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import './HowItWorks.css';

const STAGES = [
  {
    key: 'capture',
    label: 'Capture',
    purpose: 'Get a retinal image from the patient at the point of care.',
    input: 'Patient presents at a PHC; a health worker operates a portable fundus camera.',
    output: 'A raw retinal image, linked to a patient record.',
    human: 'Health worker positions the patient and captures the image — no clinical judgement required at this stage.',
  },
  {
    key: 'quality',
    label: 'Quality check',
    purpose: 'Catch unusable images before they reach a classifier.',
    input: 'The raw captured image.',
    output: 'A GOOD / BORDERLINE / UNGRADABLE status across focus, illumination, field of view and artifacts.',
    human: 'None required for a GOOD image; a health worker recaptures on an UNGRADABLE result.',
  },
  {
    key: 'enhancement',
    label: 'Enhancement',
    purpose: 'Recover usable signal from a borderline image rather than discarding it.',
    input: 'A BORDERLINE image and its quality report.',
    output: 'A contrast/illumination-adjusted image, clearly marked as enhanced.',
    human: 'Health worker chooses whether to apply enhancement or recapture.',
  },
  {
    key: 'classification',
    label: 'Classification',
    purpose: 'Produce an illustrative ICDR severity grade (0–4) as a starting point for review.',
    input: 'A quality-passed (or enhanced) retinal image.',
    output: 'A grade, a confidence value, and an uncertainty signal.',
    human: 'None — this stage is automated, and explicitly labelled as AI-assisted, not final.',
  },
  {
    key: 'lesions',
    label: 'Lesion evidence',
    purpose: 'Show which specific findings — microaneurysms, haemorrhages, IRMA — informed the grade.',
    input: 'The classified image.',
    output: 'Illustrative lesion markers positioned on the image.',
    human: 'A clinician reads this alongside the grade rather than taking the grade at face value.',
  },
  {
    key: 'explainability',
    label: 'Explainability',
    purpose: 'Make the model\u2019s attention visible as a Grad-CAM++ style heatmap.',
    input: 'The classified image and its internal activations.',
    output: 'A heatmap overlay, toggleable against the original image.',
    human: 'Reviewer checks whether the highlighted regions make clinical sense.',
  },
  {
    key: 'uncertainty',
    label: 'Uncertainty',
    purpose: 'Separate "how confident" from "how reliable" — flag cases the model is unsure about.',
    input: 'Model confidence plus a variance estimate across repeated inference passes.',
    output: 'A LOW / MODERATE / HIGH uncertainty label and a review recommendation.',
    human: 'HIGH or MODERATE uncertainty routes the case for closer review, not automatic acceptance.',
  },
  {
    key: 'review',
    label: 'Human review',
    purpose: 'Turn an AI-assisted suggestion into a reviewed clinical record.',
    input: 'Image, grade, evidence, explainability and uncertainty, together in one view.',
    output: 'A confirmed or overridden grade, with an optional clinician note.',
    human: 'An ophthalmologist makes the call — the workflow does not finalise a result on its own.',
  },
  {
    key: 'followup',
    label: 'Follow-up',
    purpose: 'Close the loop so a screening result leads to an action, not a dead end.',
    input: 'The reviewed result and the patient\u2019s screening history.',
    output: 'A reviewed record with follow-up / referral status attached.',
    human: 'The responsible clinician determines the appropriate follow-up or referral pathway; the record travels with the patient.',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(STAGES[0].key);
  const current = STAGES.find((s) => s.key === active);

  return (
    <div className="section container hiw">
      <p className="eyebrow">How it works</p>
      <h1 className="hiw__title">Nine technical stages, from capture to a reviewed record</h1>
      <p className="hiw__lede">
        Select a stage to see its purpose, what goes in, what comes out, and where a person is
        involved. This technical pipeline is distinct from the eight-screen user-facing prototype;
        AI-assisted analysis is followed by human review before the workflow is considered complete.
      </p>

      <div className="hiw__diagram" role="tablist" aria-label="Workflow stages">
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={active === s.key}
            className={`hiw__node ${active === s.key ? 'is-active' : ''}`}
            onClick={() => setActive(s.key)}
          >
            <span className="hiw__node-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="hiw__node-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="hiw__detail" role="tabpanel">
        <h2>{current.label}</h2>
        <dl className="hiw__detail-grid">
          <div>
            <dt>Purpose</dt>
            <dd>{current.purpose}</dd>
          </div>
          <div>
            <dt>Input</dt>
            <dd>{current.input}</dd>
          </div>
          <div>
            <dt>Output</dt>
            <dd>{current.output}</dd>
          </div>
          <div>
            <dt>Human role</dt>
            <dd>{current.human}</dd>
          </div>
        </dl>
      </div>

      <div className="hiw__cta">
        <Button as={Link} to="/prototype" size="lg" icon={ArrowRight}>Walk through it as a live prototype</Button>
      </div>
    </div>
  );
}
