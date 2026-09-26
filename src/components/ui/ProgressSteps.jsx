import { Check } from 'lucide-react';
import './ProgressSteps.css';

// steps: [{ key, label }]; currentIndex: number
export default function ProgressSteps({ steps, currentIndex, onStepClick }) {
  return (
    <ol className="progress-steps" aria-label="Screening progress">
      {steps.map((step, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'upcoming';
        const clickable = i < currentIndex && onStepClick;
        return (
          <li key={step.key} className={`progress-steps__item progress-steps__item--${state}`}>
            <button
              type="button"
              className="progress-steps__marker"
              onClick={clickable ? () => onStepClick(i) : undefined}
              disabled={!clickable}
              aria-label={`${step.label}, ${state === 'done' ? 'completed' : state}`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {state === 'done' ? <Check size={13} strokeWidth={3} /> : String(i + 1).padStart(2, '0')}
            </button>
            <span className="progress-steps__label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
