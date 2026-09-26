import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ScanLine, Layers, Gauge, UserCheck, ArrowRight, MapPinned,
  Stethoscope, Radio, ClipboardCheck,
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import RetinaFigure from '../components/ui/RetinaFigure.jsx';
import { BRAND } from '../config/brand.js';
import './Home.css';

const PILLARS = [
  {
    icon: ScanLine,
    title: 'Quality before classification',
    body: 'A captured image is screened for focus, illumination, field of view and artifacts before it ever reaches a classifier — so a bad photo produces a request for a better one, not a false result.',
  },
  {
    icon: Layers,
    title: 'Explainability by default',
    body: 'Every AI-assisted result ships with a Grad-CAM++ style heatmap and lesion-level evidence, so a reviewing clinician sees why a grade was suggested, not just what it was.',
  },
  {
    icon: Gauge,
    title: 'Uncertainty awareness',
    body: 'A confidence score alone can look precise and still be wrong. RetinaReach separates model confidence from an uncertainty signal, and flags low-confidence, high-uncertainty cases for closer review.',
  },
  {
    icon: UserCheck,
    title: 'Human-in-the-loop, always',
    body: 'The workflow is decision support, not an autonomous diagnosis. An ophthalmologist confirms, overrides and annotates every AI-assisted result before it becomes a record.',
  },
];

const WORKFLOW_PREVIEW = [
  'Capture at the PHC',
  'Automated quality gate',
  'AI-assisted grading',
  'Explainability review',
  'Ophthalmologist sign-off',
  'Follow-up pathway',
];

export default function Home() {
  const [overlay, setOverlay] = useState(true);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__text">
            <p className="eyebrow">SIH 2026 · Problem statement {BRAND.problemStatement} · {BRAND.track}</p>
            <h1 className="home-hero__title">
              <span className="home-hero__brand">{BRAND.name}</span>
              Explainable AI-assisted retinal screening for underserved communities
            </h1>
            <p className="home-hero__lede">
              A prototype workflow combining image-quality assessment, AI-assisted screening,
              visual evidence, uncertainty awareness and human review.
            </p>
            <div className="home-hero__actions">
              <Button as={Link} to="/prototype" size="lg" icon={ArrowRight}>Try screening prototype</Button>
              <Button as={Link} to="/how-it-works" variant="secondary" size="lg">Explore how it works</Button>
            </div>
            <p className="home-hero__caveat">
              A hackathon prototype of a proposed workflow — not a diagnostic device, and not
              clinically validated.
            </p>
          </div>

          <div className="home-hero__visual">
            <div className="home-hero__figure-frame">
              <RetinaFigure showOverlay={overlay} />
            </div>
            <div className="home-hero__figure-controls" role="group" aria-label="Toggle visualisation">
              <button
                type="button"
                className={`home-hero__toggle ${!overlay ? 'is-active' : ''}`}
                onClick={() => setOverlay(false)}
              >
                Original
              </button>
              <button
                type="button"
                className={`home-hero__toggle ${overlay ? 'is-active' : ''}`}
                onClick={() => setOverlay(true)}
              >
                AI-assisted view
              </button>
            </div>
            <p className="home-hero__figure-caption">Illustrative visualization — not an AI prediction</p>
          </div>
        </div>
      </section>

      {/* ---------- Problem ---------- */}
      <section className="section home-problem">
        <div className="container home-problem__grid">
          <div>
            <p className="eyebrow">The problem</p>
            <h2 className="home-section-title">Screening reaches people late, or not at all</h2>
            <p className="home-section-lede">
              India carries one of the largest diabetic populations in the world, and routine
              retinal screening is the main way diabetic retinopathy is caught before it causes
              irreversible vision loss. In rural districts, that screening depends on a chain
              that breaks easily: a working camera, a trained grader, a specialist to confirm
              borderline cases, and a patient who can make a second trip if the first image
              wasn't usable.
            </p>
          </div>
          <ul className="home-problem__list">
            <li>
              <strong>Specialist scarcity.</strong> Very few ophthalmologists serve very large
              rural catchments, so grading queues up.
            </li>
            <li>
              <strong>Image quality is inconsistent.</strong> Portable cameras and non-mydriatic
              capture in the field often produce borderline or ungradable images, discovered
              only after the patient has left.
            </li>
            <li>
              <strong>Connectivity is unreliable.</strong> A workflow that assumes constant
              cloud access breaks down exactly where it's needed most.
            </li>
            <li>
              <strong>Opaque outputs erode trust.</strong> A single grade with no evidence is
              hard for a clinician to act on, and hard for a patient to believe.
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Pillars ---------- */}
      <section className="section home-pillars">
        <div className="container">
          <p className="eyebrow">The approach</p>
          <h2 className="home-section-title">Four principles the workflow is built around</h2>
          <div className="home-pillars__grid">
            {PILLARS.map((p) => (
              <div className="home-pillar" key={p.title}>
                <p.icon size={22} strokeWidth={1.8} className="home-pillar__icon" aria-hidden="true" />
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Workflow preview ---------- */}
      <section className="section home-workflow">
        <div className="container home-workflow__grid">
          <div>
            <p className="eyebrow">The workflow</p>
            <h2 className="home-section-title">From a captured image to a reviewed result</h2>
            <p className="home-section-lede">
              Six stages carry every case from capture to a clinician-confirmed outcome. Each
              stage is inspectable on its own — nothing happens inside a black box.
            </p>
            <Button as={Link} to="/how-it-works" variant="secondary" icon={ArrowRight}>
              See the full interactive workflow
            </Button>
          </div>
          <ol className="home-workflow__list">
            {WORKFLOW_PREVIEW.map((step, i) => (
              <li key={step}>
                <span className="home-workflow__index">{String(i + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Explainability preview ---------- */}
      <section className="section home-explain">
        <div className="container home-explain__grid">
          <div className="home-explain__compare">
            <div className="home-explain__pane">
              <RetinaFigure showOverlay={false} />
              <span>Original</span>
            </div>
            <div className="home-explain__pane">
              <RetinaFigure showOverlay />
              <span>Grad-CAM++ overlay</span>
            </div>
          </div>
          <div>
            <p className="eyebrow">Explainability</p>
            <h2 className="home-section-title">A result a clinician can actually interrogate</h2>
            <p className="home-section-lede">
              Instead of a bare grade, every AI-assisted screen surfaces the image regions that
              most influenced it, alongside illustrative lesion-level markers. A reviewer can
              agree, disagree, or ask for a recapture — with reasons visible either way.
            </p>
            <Badge tone="neutral">Illustrative visualisation, not causal proof</Badge>
          </div>
        </div>
      </section>

      {/* ---------- Human + rural ---------- */}
      <section className="section home-human">
        <div className="container">
          <p className="eyebrow">Built for where it will run</p>
          <h2 className="home-section-title">Designed around people and low connectivity, not around a lab</h2>
          <div className="home-human__grid">
            <div className="home-human__card">
              <MapPinned size={20} strokeWidth={1.8} aria-hidden="true" />
              <h3>Field-first capture</h3>
              <p>Built for a portable fundus camera at a PHC counter, operated by a health worker rather than a specialist.</p>
            </div>
            <div className="home-human__card">
              <Radio size={20} strokeWidth={1.8} aria-hidden="true" />
              <h3>Offline-tolerant by design</h3>
              <p>Quality checks and preliminary grading are designed to run close to the capture point, syncing when a connection is available.</p>
            </div>
            <div className="home-human__card">
              <Stethoscope size={20} strokeWidth={1.8} aria-hidden="true" />
              <h3>Specialist time, spent well</h3>
              <p>AI-assisted triage means an ophthalmologist's attention goes first to the cases most likely to need it.</p>
            </div>
            <div className="home-human__card">
              <ClipboardCheck size={20} strokeWidth={1.8} aria-hidden="true" />
              <h3>A record that follows the patient</h3>
              <p>Longitudinal history turns a one-off screening into a trend a clinician can act on over years, not just one visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section home-cta">
        <div className="container home-cta__inner">
          <div>
            <h2 className="home-section-title">See the workflow end to end</h2>
            <p className="home-section-lede">
              Walk through the prototype the same way a health worker and a reviewing
              ophthalmologist would — from patient selection to a signed-off result.
            </p>
          </div>
          <Button as={Link} to="/prototype" size="lg" icon={ArrowRight}>Try screening prototype</Button>
        </div>
      </section>
    </>
  );
}
