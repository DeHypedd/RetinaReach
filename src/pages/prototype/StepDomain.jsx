import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Note from '../../components/ui/Note.jsx';

export default function StepDomain({ domainCheck, next, back }) {
  if (!domainCheck) return null;
  return (
    <div className="proto-step">
      <p className="eyebrow">Safety gate</p>
      <h2 className="proto-step__title">Retinal fundus field accepted</h2>
      <p className="proto-step__lede">This image passed the local fundus-field heuristic. Ordinary photographs, documents, and failed checks are blocked at upload and cannot proceed.</p>
      <div className="domain-panel">
        <Badge tone="success"><CheckCircle2 size={14} /> Retinal field check passed</Badge>
        <ul className="quality-checklist quality-checklist--static">
          {domainCheck.checks.map((check) => <li key={check.name} className="is-shown"><CheckCircle2 size={16} className="quality-checklist__pass" /><span>{check.name}</span></li>)}
        </ul>
      </div>
      <Note>This is a transparent prototype heuristic, not a clinically validated domain classifier. Production use requires a validated retinal-image model and clinical governance.</Note>
      <div className="proto-step__footer"><Button variant="secondary" onClick={back} icon={RotateCcw} iconPosition="left">Choose another image</Button><Button onClick={next} icon={ArrowRight}>Run image quality gate</Button></div>
    </div>
  );
}
