import { Link } from 'react-router-dom';
import { BRAND } from '../../config/brand.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__mark">{BRAND.name}</span>
          <p>
            Explainable AI-assisted retinal screening for underserved communities.
            SIH 2026 · Problem Statement {BRAND.problemStatement} · {BRAND.track}.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <Link to="/how-it-works">How it works</Link>
          <Link to="/technology">Technology</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/prototype">Screening workspace</Link>
        </nav>

        <p className="footer__disclaimer">
          RetinaReach is an AI-assisted diabetic retinopathy screening initiative focused on
          accessible early-risk identification, explainable outputs, and clinician-led review for underserved communities.
        </p>
      </div>
    </footer>
  );
}
