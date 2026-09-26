import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { BRAND } from '../../config/brand.js';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/technology', label: 'Technology' },
  { to: '/impact', label: 'Impact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  function closeMenu() { setOpen(false); }

  useEffect(() => {
    if (!open) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" aria-label={`${BRAND.name} home`}>
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="15" fill="var(--primary)" />
            <circle cx="16" cy="16" r="7.5" fill="none" stroke="#EAF3F0" strokeWidth="1.6" />
            <circle cx="16" cy="16" r="2.6" fill="#EAF3F0" />
          </svg>
          <span>{BRAND.name}</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__cta">
          <Button as={NavLink} to="/prototype" size="sm">Open workspace</Button>
        </div>

        <button
          className="navbar__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="navbar__mobile" id="mobile-navigation">
          <nav className="container navbar__mobile-links" aria-label="Primary mobile">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className="navbar__mobile-link" end={l.to === '/'} onClick={closeMenu}>
                {l.label}
              </NavLink>
            ))}
            <Button as={NavLink} to="/prototype" className="navbar__mobile-cta" onClick={closeMenu}>
              Open workspace
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
