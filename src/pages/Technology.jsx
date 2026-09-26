import { useMemo, useState } from 'react';
import {
  Camera, Smartphone, ShieldCheck, Sparkles, Server, Cpu,
  Monitor, UserCheck, Building2, ArrowRight,
} from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import './Technology.css';

const PIPELINE = [
  { icon: Camera, label: 'Portable fundus camera', note: 'Field capture hardware' },
  { icon: Smartphone, label: 'Flutter Android app', note: 'Local-first capture with deferred synchronization', status: 'Planned' },
  { icon: ShieldCheck, label: 'Image quality gate', note: 'Focus / illumination / field of view / artifacts' },
  { icon: Sparkles, label: 'Preprocessing', note: 'Normalisation, optional enhancement' },
  { icon: Server, label: 'FastAPI backend', note: 'Orchestrates inference and storage' },
];

const AI_MODELS = [
  { name: 'EfficientNet-B0', role: 'Severity classification (ICDR 0–4)', status: 'Planned' },
  { name: 'U-Net / U-Net++', role: 'Lesion and vessel segmentation', status: 'Planned' },
  { name: 'Grad-CAM++', role: 'Explainability visualization', status: 'Simulated' },
  { name: 'Monte-Carlo Dropout', role: 'Uncertainty estimation', status: 'Planned' },
];

const AFTER = [
  { icon: Monitor, label: 'Doctor dashboard', note: 'Evidence, history and review tools in one view', status: 'Planned' },
  { icon: UserCheck, label: 'Human review', note: 'Confirm, override, annotate', status: 'Prototype' },
];

export default function Technology() {
  return (
    <div className="tech">
      <div className="container section tech__intro">
        <p className="eyebrow">Technology</p>
        <h1 className="tech__title">How a screening request moves through the system</h1>
        <p className="tech__lede">
          A working prototype's architecture, from a captured photo to a reviewed result. The
          federated learning and district-simulation sections below describe research directions
          rather than components running in this prototype.
        </p>
      </div>

      {/* Architecture */}
      <div className="container tech__arch">
        <ol className="tech__pipeline">
          {PIPELINE.map((step, i) => (
            <li key={step.label} className="tech__pipeline-step">
              <div className="tech__pipeline-icon"><step.icon size={20} strokeWidth={1.8} aria-hidden="true" /></div>
              <div>
                <p className="tech__pipeline-label">{step.label}</p>
                <p className="tech__pipeline-note">{step.note}</p>
                {step.status && <StatusBadge status={step.status} />}
              </div>
              {i < PIPELINE.length - 1 && <div className="tech__pipeline-connector" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div className="tech__models">
          <p className="tech__models-heading">AI models involved</p>
          <div className="tech__models-grid">
            {AI_MODELS.map((m) => (
              <div className="tech__model-card" key={m.name}>
                <Cpu size={16} strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <p className="tech__model-name">{m.name}</p>
                  <p className="tech__model-role">{m.role}</p>
                  <StatusBadge status={m.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ol className="tech__pipeline tech__pipeline--after">
          {AFTER.map((step, i) => (
            <li key={step.label} className="tech__pipeline-step">
              <div className="tech__pipeline-icon"><step.icon size={20} strokeWidth={1.8} aria-hidden="true" /></div>
              <div>
                <p className="tech__pipeline-label">{step.label}</p>
                <p className="tech__pipeline-note">{step.note}</p>
              </div>
              {i < AFTER.length - 1 && <div className="tech__pipeline-connector" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>

      {/* Federated learning */}
      <div className="section tech__federated">
        <div className="container tech__federated-inner">
          <div>
            <p className="eyebrow">Research direction</p>
            <h2 className="tech__section-title">Federated learning across PHCs</h2>
            <p className="tech__section-lede">
              Rather than centralising raw retinal images from every PHC, each site could train
              on its own local data and share only model updates for aggregation — improving the
              shared model without images leaving the facility.
            </p>
            <StatusBadge status="Research direction" />
          </div>
          <FederatedDiagram />
        </div>
      </div>

      {/* Simulation */}
      <div className="section container tech__sim-wrap">
        <p className="eyebrow">Research direction</p>
        <h2 className="tech__section-title">District-scale workflow simulation</h2>
        <p className="tech__section-lede">
          A conceptual planning tool — adjust the figures below to see how patient load,
          capacity and specialist availability interact. Values are illustrative, not derived
          from real deployment data.
        </p>
        <SimulationPanel />
      </div>
    </div>
  );
}

function FederatedDiagram() {
  return (
    <svg viewBox="0 0 420 280" className="tech__fed-svg" role="img" aria-label="Federated learning diagram: three PHCs send local model updates to a central aggregator, which returns an updated model">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 140}, 20)`}>
          <rect width="110" height="60" rx="8" fill="var(--surface-card)" stroke="var(--border-strong)" strokeWidth="1.4" />
          <text x="55" y="27" textAnchor="middle" className="tech__fed-label">PHC {i + 1}</text>
          <text x="55" y="44" textAnchor="middle" className="tech__fed-sublabel">local data</text>
          <line x1="55" y1="60" x2={190 - i * 140} y2="130" stroke="var(--border-strong)" strokeWidth="1.4" />
        </g>
      ))}
      <rect x="145" y="130" width="130" height="55" rx="8" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="1.4" />
      <text x="210" y="153" textAnchor="middle" className="tech__fed-label">Central</text>
      <text x="210" y="170" textAnchor="middle" className="tech__fed-sublabel">aggregation</text>
      <line x1="210" y1="185" x2="210" y2="225" stroke="var(--primary)" strokeWidth="1.6" markerEnd="url(#arrow)" />
      <rect x="145" y="225" width="130" height="45" rx="8" fill="var(--surface-inverse)" />
      <text x="210" y="253" textAnchor="middle" className="tech__fed-label" fill="#fff">Updated model</text>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--primary)" />
        </marker>
      </defs>
    </svg>
  );
}

function SimulationPanel() {
  const [patientsPerDay, setPatientsPerDay] = useState(60);
  const [phcCapacity, setPhcCapacity] = useState(80);
  const [cameraThroughput, setCameraThroughput] = useState(45);
  const [specialistCapacity, setSpecialistCapacity] = useState(12);
  const [connectivity, setConnectivity] = useState('INTERMITTENT');

  const stats = useMemo(() => {
    const screened = Math.min(patientsPerDay, phcCapacity, cameraThroughput);
    const referrals = Math.round(screened * 0.12);
    const netQueue = referrals - specialistCapacity;
    return { screened, referrals, netQueue };
  }, [patientsPerDay, phcCapacity, cameraThroughput, specialistCapacity]);

  const dotDuration = Math.max(1.6, 6 - stats.screened / 20);

  return (
    <div className="sim">
      <div className="sim__controls">
        <SimSlider label="Patients / day" value={patientsPerDay} min={10} max={150} onChange={setPatientsPerDay} />
        <SimSlider label="PHC capacity / day" value={phcCapacity} min={10} max={150} onChange={setPhcCapacity} />
        <SimSlider label="Camera throughput / day" value={cameraThroughput} min={10} max={100} onChange={setCameraThroughput} />
        <SimSlider label="Specialist review capacity / day" value={specialistCapacity} min={1} max={30} onChange={setSpecialistCapacity} />

        <div className="sim__field">
          <label htmlFor="connectivity">Connectivity</label>
          <select id="connectivity" value={connectivity} onChange={(e) => setConnectivity(e.target.value)}>
            <option value="GOOD">Good — near-real-time sync</option>
            <option value="INTERMITTENT">Intermittent — batched sync</option>
            <option value="OFFLINE">Offline — local-only, manual sync</option>
          </select>
        </div>
      </div>

      <div className="sim__output">
        <div className="sim__stats">
          <div className="sim__stat">
            <span className="sim__stat-value">{stats.screened}</span>
            <span className="sim__stat-label">Screened / day</span>
          </div>
          <div className="sim__stat">
            <span className="sim__stat-value">{stats.referrals}</span>
            <span className="sim__stat-label">Est. referrals / day</span>
          </div>
          <div className="sim__stat">
            <span className={`sim__stat-value ${stats.netQueue > 0 ? 'sim__stat-value--warn' : 'sim__stat-value--ok'}`}>
              {stats.netQueue > 0 ? `+${stats.netQueue}` : stats.netQueue}
            </span>
            <span className="sim__stat-label">Net queue change / day</span>
          </div>
        </div>

        <div className="sim__flow" aria-hidden="true">
          {['PHC', 'AI screening', 'Referral', 'Ophthalmologist'].map((label, i) => (
            <div className="sim__flow-node" key={label}>
              <Building2 size={16} strokeWidth={1.8} />
              <span>{label}</span>
              {i < 3 && <ArrowRight size={14} className="sim__flow-arrow" />}
            </div>
          ))}
          <div className="sim__flow-track">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="sim__flow-dot"
                style={{ animationDuration: `${dotDuration}s`, animationDelay: `${i * (dotDuration / 3)}s` }}
              />
            ))}
          </div>
        </div>

        <p className="sim__caption">
          Connectivity: <strong>{connectivity === 'GOOD' ? 'near-real-time sync' : connectivity === 'INTERMITTENT' ? 'batched sync when a connection is available' : 'local-only, manual sync required'}</strong>
        </p>
        <p className="sim__disclaimer">Illustrative prototype simulation — not real-world validated data.</p>
      </div>
    </div>
  );
}

function SimSlider({ label, value, min, max, onChange }) {
  return (
    <div className="sim__field">
      <label htmlFor={label}>{label}</label>
      <div className="sim__slider-row">
        <input
          id={label}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="sim__slider-value">{value}</span>
      </div>
    </div>
  );
}
