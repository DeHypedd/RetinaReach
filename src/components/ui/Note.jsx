import { Info } from 'lucide-react';
import './Note.css';

export default function Note({ children, tone = 'neutral' }) {
  return (
    <p className={`note note--${tone}`}>
      <Info size={14} strokeWidth={2} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
