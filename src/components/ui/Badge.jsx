import './Badge.css';

// tone: 'success' | 'warning' | 'danger' | 'neutral' | 'primary'
export default function Badge({ tone = 'neutral', children, mono = false }) {
  return (
    <span className={`badge badge--${tone} ${mono ? 'badge--mono' : ''}`}>
      <span className="badge__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
