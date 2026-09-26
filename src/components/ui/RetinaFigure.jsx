import './RetinaFigure.css';

// A stylised, illustrative fundus image (not a real scan) used as the
// hero's characteristic visual. `showOverlay` toggles a simulated
// explainability heatmap + lesion markers on top of it.
export default function RetinaFigure({ showOverlay }) {
  return (
    <svg viewBox="0 0 420 420" className="retina-figure" role="img" aria-label="Illustrative retinal fundus image">
      <defs>
        <radialGradient id="fundusBase" cx="50%" cy="46%" r="65%">
          <stop offset="0%" stopColor="#8a3a2c" />
          <stop offset="55%" stopColor="#6e2b22" />
          <stop offset="100%" stopColor="#41160f" />
        </radialGradient>
        <radialGradient id="heat0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--heat-hot)" stopOpacity="0.85" />
          <stop offset="55%" stopColor="var(--heat-mid)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--heat-mid)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="fundusClip">
          <circle cx="210" cy="210" r="196" />
        </clipPath>
      </defs>

      <circle cx="210" cy="210" r="200" fill="var(--surface-inverse)" />
      <g clipPath="url(#fundusClip)">
        <circle cx="210" cy="210" r="196" fill="url(#fundusBase)" />

        {/* Optic disc */}
        <circle cx="255" cy="185" r="30" fill="#e8b88f" opacity="0.9" />
        <circle cx="255" cy="185" r="30" fill="none" stroke="#c98f5f" strokeWidth="1.5" opacity="0.6" />

        {/* Macula */}
        <circle cx="165" cy="235" r="16" fill="#3b0f0a" opacity="0.55" />

        {/* Vessels */}
        <g fill="none" stroke="#7c2318" strokeWidth="3.5" strokeLinecap="round" opacity="0.75">
          <path d="M255 185 C 230 140, 190 120, 150 105" />
          <path d="M255 185 C 240 130, 260 95, 250 60" />
          <path d="M255 185 C 290 150, 320 140, 355 125" />
          <path d="M255 185 C 300 195, 335 210, 375 210" />
          <path d="M255 185 C 285 235, 310 270, 335 310" />
          <path d="M255 185 C 250 240, 235 280, 215 325" />
          <path d="M255 185 C 210 220, 180 245, 145 270" />
          <path d="M255 185 C 195 195, 150 185, 105 180" />
        </g>
        <g fill="none" stroke="#9a2f21" strokeWidth="1.8" strokeLinecap="round" opacity="0.6">
          <path d="M150 105 C 130 100, 110 105, 90 120" />
          <path d="M355 125 C 370 115, 385 118, 398 128" />
          <path d="M335 310 C 345 325, 360 332, 378 335" />
          <path d="M145 270 C 125 280, 105 278, 88 268" />
        </g>

        {showOverlay && (
          <g className="retina-figure__heat">
            <circle cx="200" cy="250" r="46" fill="url(#heat0)" />
            <circle cx="150" cy="210" r="30" fill="url(#heat0)" />
            <circle cx="230" cy="150" r="26" fill="url(#heat0)" />
          </g>
        )}
      </g>

      <circle cx="210" cy="210" r="196" fill="none" stroke="var(--border-strong)" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
