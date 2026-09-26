import { Users, HeartHandshake, Stethoscope, Building2, LineChart, FlaskConical } from 'lucide-react';
import './Impact.css';

const AUDIENCES = [
  {
    icon: Users,
    title: 'Patients',
    focus: 'Access',
    body: 'A screening that happens at the PHC they already visit, without a separate trip to a specialist just to find out whether one is needed.',
  },
  {
    icon: HeartHandshake,
    title: 'Rural healthcare workers',
    focus: 'Workflow',
    body: 'A quality gate that catches a bad capture immediately, instead of a rejected image discovered days later — and a tool that doesn\u2019t require clinical training to operate.',
  },
  {
    icon: Stethoscope,
    title: 'Ophthalmologists',
    focus: 'Trust & explainability',
    body: 'Evidence, not just a verdict: a heatmap, lesion markers and an uncertainty flag to review alongside the grade, and the final say on every case.',
  },
  {
    icon: Building2,
    title: 'Primary health centres',
    focus: 'Resource planning',
    body: 'A record of screening volume and referral load that a PHC can use to plan camera time, staffing and follow-up scheduling.',
  },
  {
    icon: LineChart,
    title: 'Healthcare administrators',
    focus: 'Scalability',
    body: 'A workflow designed to be reasoned about at district scale — where capacity is tight and specialist time is the binding constraint.',
  },
  {
    icon: FlaskConical,
    title: 'Researchers',
    focus: 'Open direction',
    body: 'An explainability- and uncertainty-first design that stays legible as it\u2019s extended — toward federated learning, multi-disease screening, or longitudinal risk modelling.',
  },
];

export default function Impact() {
  return (
    <div className="section container impact">
      <p className="eyebrow">Impact</p>
      <h1 className="impact__title">Who this workflow is designed to change things for</h1>
      <p className="impact__lede">
        These are the intended effects the design is aimed at — not measured outcomes. RetinaReach
        is a hackathon prototype and has not been deployed or clinically validated.
      </p>

      <div className="impact__grid">
        {AUDIENCES.map((a) => (
          <div className="impact__card" key={a.title}>
            <a.icon size={22} strokeWidth={1.8} className="impact__icon" aria-hidden="true" />
            <p className="impact__focus">{a.focus}</p>
            <h2>{a.title}</h2>
            <p>{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
