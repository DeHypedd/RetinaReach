import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import ProgressSteps from '../components/ui/ProgressSteps.jsx';
import StepPatient from './prototype/StepPatient.jsx';
import StepCapture from './prototype/StepCapture.jsx';
import StepDomain from './prototype/StepDomain.jsx';
import StepQuality from './prototype/StepQuality.jsx';
import StepAnalysis from './prototype/StepAnalysis.jsx';
import StepResult from './prototype/StepResult.jsx';
import StepExplain from './prototype/StepExplain.jsx';
import StepReview from './prototype/StepReview.jsx';
import StepHistory from './prototype/StepHistory.jsx';
import { appendScreening, createPatient, deletePatient, loadPatients } from '../data/patientStore.js';
import { deriveDemoResult, qualityFromImage } from '../utils/imageValidation.js';
import { BRAND } from '../config/brand.js';
import './prototype/Prototype.css';

const STEPS = [
  { key: 'patient', label: 'Patient' },
  { key: 'capture', label: 'Capture' },
  { key: 'domain', label: 'Retinal check' },
  { key: 'quality', label: 'Quality' },
  { key: 'analysis', label: 'Analysis' },
  { key: 'result', label: 'Result' },
  { key: 'explain', label: 'Explain' },
  { key: 'review', label: 'Review' },
  { key: 'history', label: 'History' },
];

export default function Prototype() {
  const [stepIndex, setStepIndex] = useState(0);
  const [patient, setPatient] = useState(null);
  const [patients, setPatients] = useState(() => loadPatients());
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [qualityStatus, setQualityStatus] = useState(null);
  const [quality, setQuality] = useState(null);
  const [domainCheck, setDomainCheck] = useState(null);
  const [result, setResult] = useState(null);
  const [review, setReview] = useState({ status: 'pending', overriddenGrade: null, note: '' });

  useEffect(() => () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  function goTo(i) { setStepIndex(Math.max(0, Math.min(STEPS.length - 1, i))); }
  function next() { goTo(stepIndex + 1); }
  function back() { goTo(stepIndex - 1); }

  function selectPatient(p) {
    setPatient(p);
    setQualityStatus(null);
    setQuality(null);
    setResult(null);
    setReview({ status: 'pending', overriddenGrade: null, note: '' });
  }

  function registerNewPatient(values) {
    const p = createPatient(values);
    setPatients(loadPatients());
    selectPatient(p);
  }

  function removePatient(record) {
    const nextPatients = deletePatient(record.id);
    setPatients(nextPatients);
    if (patient?.id === record.id) setPatient(null);
  }

  function setUploadedFile(file, nextDomainCheck = null) {
    setImageUrl(file ? URL.createObjectURL(file) : null);
    setImageFile(file);
    setDomainCheck(nextDomainCheck);
    const imageQuality = nextDomainCheck ? qualityFromImage(nextDomainCheck) : null;
    setQuality(imageQuality);
    setQualityStatus(imageQuality?.status || null);
    setResult(nextDomainCheck ? deriveDemoResult(nextDomainCheck) : null);
  }

  function finishScreening() {
    if (patient && result && quality) {
      const finalGrade = review.status === 'overridden' ? review.overriddenGrade : result.grade;
      const updated = appendScreening(patient.id, { id: `SCREEN-${Date.now()}`, year: new Date().getFullYear(), grade: finalGrade, quality: quality.status, confidence: result.confidence, uncertainty: result.uncertainty, reviewStatus: review.status });
      setPatient(updated);
      setPatients(loadPatients());
    }
    next();
  }

  function restart() {
    setStepIndex(0);
    setPatient(null);
    setImageFile(null);
    setImageUrl(null);
    setQualityStatus(null);
    setResult(null);
    setReview({ status: 'pending', overriddenGrade: null, note: '' });
  }

  const stepProps = { patient, imageFile, imageUrl, quality, qualityStatus, setQualityStatus, result, review, setReview, next, back, restart };
  const currentStep = STEPS[stepIndex];
  const stageNumber = stepIndex + 1;

  return (
    <div className="screening-shell">
      <aside className="screening-rail" aria-label="Screening workflow">
        <div className="screening-rail__brand"><span className="screening-rail__mark"><Activity size={18} /></span><span>{BRAND.name}</span></div>
        <div className="screening-rail__label">Screening workflow</div>
        <ProgressSteps steps={STEPS} currentIndex={stepIndex} onStepClick={patient ? goTo : undefined} />
        <div className="screening-rail__foot"><ShieldCheck size={17} /><span>Human review<br />remains required</span></div>
      </aside>

      <div className="screening-main">
        <header className="screening-topbar">
          <div><p className="eyebrow">Screening workspace · PS 26038</p><p className="screening-topbar__status"><span /> Local prototype session</p></div>
          <div className="screening-topbar__meta"><span>Stage {stageNumber} of {STEPS.length}</span><strong>{currentStep.label}</strong></div>
        </header>

        <section className="screening-hero">
          <div>
            <div className="screening-hero__kicker"><Sparkles size={15} /> Guided screening workspace</div>
            <h1>Make every screening step<br /><em>visible and defensible.</em></h1>
            <p>A transparent walkthrough that verifies the image input, shows quality evidence, and preserves specialist review as the final decision.</p>
          </div>
          <div className="screening-hero__orb" aria-hidden="true"><div /><span>0{stepIndex + 1}</span><small>{currentStep.label}</small></div>
        </section>

        <div className="screening-content" aria-label={`Stage ${stageNumber}: ${currentStep.label}`}>
          <div className="screening-content__context">
            <div><span>Current stage</span><strong>{currentStep.label}</strong></div>
            <p>Complete this stage to continue <ArrowUpRight size={15} /></p>
          </div>
          <div className="screening-content__card">
            {stepIndex === 0 && (
              <StepPatient
                patients={patients}
                selected={patient}
                onSelect={selectPatient}
                onRegisterNew={registerNewPatient}
                onDelete={removePatient}
                onNext={next}
              />
            )}
            {stepIndex === 1 && <StepCapture {...stepProps} onFile={setUploadedFile} />}
            {stepIndex === 2 && <StepDomain {...stepProps} domainCheck={domainCheck} />}
            {stepIndex === 3 && <StepQuality {...stepProps} />}
            {stepIndex === 4 && <StepAnalysis {...stepProps} />}
            {stepIndex === 5 && <StepResult {...stepProps} />}
            {stepIndex === 6 && <StepExplain {...stepProps} />}
            {stepIndex === 7 && <StepReview {...stepProps} next={finishScreening} />}
            {stepIndex === 8 && <StepHistory {...stepProps} />}
          </div>
        </div>
      </div>
    </div>
  );
}
