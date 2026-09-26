import { useRef, useState } from 'react';
import { UploadCloud, RotateCcw, ArrowRight, ImageOff } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Note from '../../components/ui/Note.jsx';
import { validateFile, validateRetinalFrame } from '../../utils/imageValidation.js';

export default function StepCapture({ imageUrl, onFile, next, back }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  async function validateAndSet(file) {
    if (!file) return;
    const validation = validateFile(file);
    if (!validation.valid) { setError(validation.message); return; }
    setError('Checking whether the image has a fundus-camera field…');
    try {
      const domainCheck = await validateRetinalFrame(file);
      if (domainCheck.status !== 'PASS') {
        setError('Rejected: this image does not match the expected retinal fundus field. Retake using a fundus camera; it cannot continue to quality or ICDR analysis.');
        onFile(null);
        return;
      }
      onFile(file, domainCheck);
    } catch {
      setError('The image could not be read for retinal-field validation. Please choose another JPG, PNG, or WebP image.');
      return;
    }
    setError(null);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  }

  return (
    <div className="proto-step">
      <h2 className="proto-step__title">Capture or upload a retinal image</h2>
      <p className="proto-step__lede">
        In the field, this image comes directly from a portable fundus camera. For this
        prototype, choose a de-identified JPG, PNG, or WebP image from a fundus camera. A local retinal-field
        check blocks non-fundus images before they reach quality or simulated analysis.
      </p>

      {!imageUrl ? (
        <div
          className={`capture-dropzone ${dragActive ? 'is-active' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        >
          <UploadCloud size={30} strokeWidth={1.6} aria-hidden="true" />
          <p><strong>Drag and drop</strong> a retinal image, or click to choose a file</p>
          <span>JPG, PNG, or WebP · up to 15MB</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="visually-hidden"
            onChange={(e) => validateAndSet(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="capture-preview">
          <img src={imageUrl} alt="Uploaded retinal image preview" />
        </div>
      )}

      {error && (
        <p className="proto-error"><ImageOff size={15} aria-hidden="true" /> {error}</p>
      )}

      <div className="proto-step__footer">
        <Button variant="secondary" onClick={imageUrl ? () => onFile(null) : back} icon={RotateCcw} iconPosition="left">
          {imageUrl ? 'Retake' : 'Back'}
        </Button>
        <Button onClick={next} disabled={!imageUrl} icon={ArrowRight}>Continue</Button>
      </div>

      <Note>Uploaded images stay in this browser tab only — nothing is transmitted anywhere.</Note>
    </div>
  );
}
