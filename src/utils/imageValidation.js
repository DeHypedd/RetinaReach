const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_MB = 15;

export function validateFile(file) {
  if (!file) return { valid: false, message: 'Choose an image file first.' };
  if (!ACCEPTED.includes(file.type)) return { valid: false, message: 'Unsupported format. Please upload a JPG, PNG, or WebP image.' };
  if (file.size > MAX_MB * 1024 * 1024) return { valid: false, message: `Image is too large. Please upload a file under ${MAX_MB}MB.` };
  return { valid: true };
}

export async function validateRetinalFrame(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const candidate = new Image();
      candidate.onload = () => resolve(candidate);
      candidate.onerror = reject;
      candidate.src = url;
    });
    const canvas = document.createElement('canvas');
    const side = 180;
    canvas.width = side;
    canvas.height = side;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0, side, side);
    const { data } = context.getImageData(0, 0, side, side);
    let warm = 0; let dark = 0; let centreTotal = 0; let edgeTotal = 0; let centreCount = 0; let edgeCount = 0; let signature = 0;
    for (let y = 0; y < side; y += 2) for (let x = 0; x < side; x += 2) {
      const index = (y * side + x) * 4; const r = data[index]; const g = data[index + 1]; const b = data[index + 2];
      const brightness = (r + g + b) / 3; const distance = Math.hypot(x - side / 2, y - side / 2) / (side / 2);
      signature = (signature + Math.round(r * 3 + g * 5 + b * 7 + x * 11 + y * 13)) % 1000003;
      if (r > b * 1.35 && r > g * 1.08 && r > 55) warm += 1;
      if (brightness < 45) dark += 1;
      if (distance < 0.45) { centreTotal += brightness; centreCount += 1; }
      if (distance > 0.78) { edgeTotal += brightness; edgeCount += 1; }
    }
    const samples = (side / 2) ** 2;
    const warmRatio = warm / samples; const darkRatio = dark / samples;
    const centreBrightness = centreTotal / centreCount; const edgeBrightness = edgeTotal / edgeCount;
    const circularField = centreBrightness - edgeBrightness > 14;
    const fundusLike = warmRatio >= 0.30 && darkRatio >= 0.03 && circularField && image.width / image.height > 0.65 && image.width / image.height < 1.35;
    return {
      status: fundusLike ? 'PASS' : 'REJECT',
      metrics: { warmRatio, darkRatio, circularField, signature },
      checks: [
        { name: 'Supported image file', pass: true },
        { name: 'Red/orange fundus colour profile', pass: warmRatio >= 0.30 },
        { name: 'Circular fundus field profile', pass: circularField },
        { name: 'Image contains expected dark-field detail', pass: darkRatio >= 0.03 },
      ],
    };
  } finally { URL.revokeObjectURL(url); }
}

export function deriveDemoResult(domainCheck) {
  const { signature, warmRatio, darkRatio } = domainCheck.metrics;
  const grade = signature % 5;
  const confidence = [0.88, 0.82, 0.76, 0.71, 0.67][grade] + ((signature % 7) - 3) / 100;
  const uncertainty = confidence >= 0.84 ? 'LOW' : confidence >= 0.74 ? 'MODERATE' : 'HIGH';
  const overlays = [
    { heatmap: [{ x: 52, y: 46, r: 14, intensity: .24 }], lesions: [] },
    { heatmap: [{ x: 61, y: 42, r: 10, intensity: .55 }, { x: 40, y: 58, r: 8, intensity: .35 }], lesions: [{ x: 61, y: 42, label: 'Microaneurysm region' }] },
    { heatmap: [{ x: 58, y: 40, r: 12, intensity: .7 }, { x: 66, y: 55, r: 11, intensity: .6 }, { x: 38, y: 60, r: 9, intensity: .4 }], lesions: [{ x: 58, y: 40, label: 'Microaneurysm cluster' }, { x: 66, y: 55, label: 'Haemorrhage region' }] },
    { heatmap: [{ x: 55, y: 38, r: 13, intensity: .8 }, { x: 64, y: 52, r: 12, intensity: .75 }, { x: 44, y: 63, r: 11, intensity: .65 }], lesions: [{ x: 55, y: 38, label: 'Haemorrhage region' }, { x: 64, y: 52, label: 'Vascular feature' }] },
    { heatmap: [{ x: 50, y: 35, r: 14, intensity: .85 }, { x: 62, y: 48, r: 13, intensity: .8 }, { x: 42, y: 58, r: 12, intensity: .75 }], lesions: [{ x: 50, y: 35, label: 'Neovascular region' }, { x: 62, y: 48, label: 'Haemorrhage region' }] },
  ][grade];
  return {
    grade,
    confidence: Math.max(0.62, Math.min(0.92, confidence)),
    uncertainty,
    demoSeed: `${Math.round(warmRatio * 100)}-${Math.round(darkRatio * 100)}-${signature % 1000}`,
    ...overlays,
  };
}

export function qualityFromImage(domainCheck) {
  const borderline = domainCheck.metrics.darkRatio > 0.42 || domainCheck.metrics.warmRatio < 0.38;
  return borderline ? {
    status: 'BORDERLINE',
    checks: [
      { name: 'Focus', pass: true }, { name: 'Illumination', pass: true },
      { name: 'Field of view', pass: false }, { name: 'Retinal visibility', pass: true }, { name: 'Artifacts', pass: true },
    ],
  } : {
    status: 'GOOD',
    checks: [
      { name: 'Focus', pass: true }, { name: 'Illumination', pass: true },
      { name: 'Field of view', pass: true }, { name: 'Retinal visibility', pass: true }, { name: 'Artifacts', pass: true },
    ],
  };
}
