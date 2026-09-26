import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'left' }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: 'var(--fs-2xl)', marginTop: 'var(--space-3)' }}>This page doesn't exist.</h1>
      <p style={{ color: 'var(--ink-soft)', marginTop: 'var(--space-3)' }}>
        <Link to="/" style={{ color: 'var(--primary)', fontWeight: 500 }}>Go back home</Link>
      </p>
    </div>
  );
}
