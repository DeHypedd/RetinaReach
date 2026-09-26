import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Note from '../../components/ui/Note.jsx';

const MODES = [
  { key: 'original', label: 'Original', description: 'Original retinal image without an explanatory overlay.' },
  { key: 'heatmap', label: 'Grad-CAM++', description: 'Model attention visualization: illustrative image regions associated with the classifier output.' },
  { key: 'lesions', label: 'Lesion evidence', description: 'Illustrative visualization of evaluated lesion-region evidence.' },
  { key: 'combined', label: 'Combined', description: 'Both visualizations together for reviewer context.' },
];

export default function StepExplain({ imageUrl, result, next, back }) {
  const [mode, setMode] = useState('heatmap');
  if (!result) return null;

  const showHeat = mode === 'heatmap' || mode === 'combined';
  const showLesions = mode === 'lesions' || mode === 'combined';
  const activeMode = MODES.find((item) => item.key === mode);

  return (
    <div className="proto-step proto-step--explain">
      <h2 className="proto-step__title">Explainability view</h2>
      <p className="proto-step__lede">
        Toggle between views to see the same result from different angles. These overlays are
        illustrative visualisations, not causal proof of what the model used.
      </p>

      <div className="explain-controls" role="tablist" aria-label="Explainability view">
        {MODES.map((m) => (
          <button
            key={m.key}
            role="tab"
            aria-selected={mode === m.key}
            className={`explain-controls__btn ${mode === m.key ? 'is-active' : ''}`}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="explain-viewer">
        {imageUrl ? <img src={imageUrl} alt="Retinal image under review" /> : <div className="explain-viewer__placeholder" />}

        {showHeat && (result.heatmap || []).map((h, i) => (
          <span
            key={i}
            className="explain-viewer__heat"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: `${h.r * 2}%`,
              paddingBottom: `${h.r * 2}%`,
              opacity: h.intensity,
            }}
          />
        ))}

        {showLesions && (result.lesions || []).map((l, i) => (
          <span key={i} className="explain-viewer__lesion" style={{ left: `${l.x}%`, top: `${l.y}%` }}>
            <span className="explain-viewer__lesion-dot" />
            <span className="explain-viewer__lesion-label">{l.label}</span>
          </span>
        ))}
      </div>

      <Note>
        <strong>{activeMode.label}: </strong>{activeMode.description} These visualizations are illustrative and are not causal proof.
      </Note>

      <div className="proto-step__footer">
        <Button variant="secondary" onClick={back} icon={RotateCcw} iconPosition="left">Back</Button>
        <Button onClick={next} icon={ArrowRight}>Send to ophthalmologist review</Button>
      </div>
    </div>
  );
}
