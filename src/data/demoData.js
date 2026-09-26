// All values in this file are prototype/demo data only.
// Nothing here represents a trained model, a real patient, or a validated
// clinical statistic. Each demo patient is pre-wired to a specific
// screening path so the prototype behaves the same way every time it is
// presented — useful during a live hackathon demo.

export const ICDR_GRADES = [
  {
    grade: 0,
    label: 'No apparent DR',
    short: 'No DR',
    description: 'No visible microaneurysms or haemorrhages in this illustrative pass.',
    color: 'success',
  },
  {
    grade: 1,
    label: 'Mild NPDR',
    short: 'Mild NPDR',
    description: 'Microaneurysms only, in this illustrative pass.',
    color: 'success',
  },
  {
    grade: 2,
    label: 'Moderate NPDR',
    short: 'Moderate NPDR',
    description: 'More than microaneurysms but less than severe NPDR, in this illustrative pass.',
    color: 'warning',
  },
  {
    grade: 3,
    label: 'Severe NPDR',
    short: 'Severe NPDR',
    description: 'Extensive haemorrhages, venous beading, or IRMA in this illustrative pass.',
    color: 'warning',
  },
  {
    grade: 4,
    label: 'Proliferative DR',
    short: 'PDR',
    description: 'Neovascularisation or vitreous/pre-retinal haemorrhage in this illustrative pass.',
    color: 'danger',
  },
];

export const REVIEW_PATHWAYS = {
  0: 'Follow-up / referral status is determined after clinician review.',
  1: 'Follow-up / referral status is determined after clinician review.',
  2: 'Follow-up / referral status is determined after clinician review.',
  3: 'Follow-up / referral status is determined after clinician review.',
  4: 'Follow-up / referral status is determined after clinician review.',
};

// Lesion marker coordinates are percentages of the image container, so
// they sit correctly on top of whatever image a presenter uploads.
export const demoScreeningResults = {
  'case-grade0': {
    grade: 0,
    confidence: 0.91,
    uncertainty: 'LOW',
    heatmap: [{ x: 52, y: 46, r: 14, intensity: 0.25 }],
    lesions: [],
  },
  'case-grade1': {
    grade: 1,
    confidence: 0.84,
    uncertainty: 'LOW',
    heatmap: [
      { x: 61, y: 42, r: 10, intensity: 0.55 },
      { x: 40, y: 58, r: 8, intensity: 0.35 },
    ],
    lesions: [{ x: 61, y: 42, label: 'Microaneurysm' }],
  },
  'case-grade2': {
    grade: 2,
    confidence: 0.77,
    uncertainty: 'MODERATE',
    heatmap: [
      { x: 58, y: 40, r: 12, intensity: 0.7 },
      { x: 66, y: 55, r: 11, intensity: 0.6 },
      { x: 38, y: 60, r: 9, intensity: 0.4 },
    ],
    lesions: [
      { x: 58, y: 40, label: 'Microaneurysm cluster' },
      { x: 66, y: 55, label: 'Dot haemorrhage' },
    ],
  },
  'case-grade3': {
    grade: 3,
    confidence: 0.71,
    uncertainty: 'MODERATE',
    heatmap: [
      { x: 55, y: 38, r: 13, intensity: 0.8 },
      { x: 64, y: 52, r: 12, intensity: 0.75 },
      { x: 44, y: 63, r: 11, intensity: 0.65 },
      { x: 35, y: 45, r: 9, intensity: 0.5 },
    ],
    lesions: [
      { x: 55, y: 38, label: 'Blot haemorrhage' },
      { x: 64, y: 52, label: 'Venous beading' },
      { x: 44, y: 63, label: 'IRMA' },
    ],
  },
  'case-grade4': {
    grade: 4,
    confidence: 0.66,
    uncertainty: 'HIGH',
    heatmap: [
      { x: 50, y: 35, r: 14, intensity: 0.85 },
      { x: 62, y: 48, r: 13, intensity: 0.8 },
      { x: 42, y: 58, r: 12, intensity: 0.75 },
      { x: 58, y: 65, r: 10, intensity: 0.6 },
    ],
    lesions: [
      { x: 50, y: 35, label: 'Neovascularisation' },
      { x: 62, y: 48, label: 'Pre-retinal haemorrhage' },
      { x: 42, y: 58, label: 'Venous beading' },
    ],
  },
};

export const demoQualityResults = {
  GOOD: {
    status: 'GOOD',
    checks: [
      { name: 'Focus', pass: true },
      { name: 'Illumination', pass: true },
      { name: 'Field of view', pass: true },
      { name: 'Retinal visibility', pass: true },
      { name: 'Artifacts', pass: true },
    ],
  },
  BORDERLINE: {
    status: 'BORDERLINE',
    checks: [
      { name: 'Focus', pass: true },
      { name: 'Illumination', pass: false },
      { name: 'Field of view', pass: true },
      { name: 'Retinal visibility', pass: true },
      { name: 'Artifacts', pass: true },
    ],
  },
  UNGRADABLE: {
    status: 'UNGRADABLE',
    checks: [
      { name: 'Focus', pass: false },
      { name: 'Illumination', pass: false },
      { name: 'Field of view', pass: true },
      { name: 'Retinal visibility', pass: false },
      { name: 'Artifacts', pass: true },
    ],
  },
};

export const demoPatients = [
  {
    id: 'DEMO-001',
    name: 'Demo patient — Kamala R.',
    age: 58,
    diabetesDuration: '9 years',
    quality: 'GOOD',
    resultKey: 'case-grade2',
    history: [
      { year: 2024, grade: 1 },
      { year: 2025, grade: 1 },
      { year: 2026, grade: 2 },
    ],
  },
  {
    id: 'DEMO-002',
    name: 'Demo patient — Suresh P.',
    age: 47,
    diabetesDuration: '4 years',
    quality: 'GOOD',
    resultKey: 'case-grade0',
    history: [
      { year: 2025, grade: 0 },
      { year: 2026, grade: 0 },
    ],
  },
  {
    id: 'DEMO-003',
    name: 'Demo patient — Farida B.',
    age: 63,
    diabetesDuration: '15 years',
    quality: 'BORDERLINE',
    resultKey: 'case-grade3',
    history: [
      { year: 2024, grade: 2 },
      { year: 2025, grade: 3 },
      { year: 2026, grade: 3 },
    ],
  },
  {
    id: 'DEMO-004',
    name: 'Demo patient — Ravi T.',
    age: 66,
    diabetesDuration: '21 years',
    quality: 'UNGRADABLE',
    resultKey: 'case-grade4',
    history: [
      { year: 2024, grade: 3 },
      { year: 2025, grade: 4 },
    ],
  },
];

// Illustrative district-scale figures for the workflow simulation panel.
// Not derived from real deployment data.
export const demoSimulationDefaults = {
  patientsPerDay: 60,
  phcCapacity: 80,
  cameraThroughput: 45,
  specialistCapacity: 12,
  connectivity: 'INTERMITTENT',
};
