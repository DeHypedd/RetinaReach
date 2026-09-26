import { useState } from 'react';
import { UserPlus, ArrowRight, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Note from '../../components/ui/Note.jsx';

export default function StepPatient({ patients, selected, onSelect, onRegisterNew, onDelete, onNext }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', diabetesDuration: '' });
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    try { onRegisterNew(form); setShowForm(false); setForm({ name: '', age: '', diabetesDuration: '' }); setError(''); }
    catch (reason) { setError(reason.message); }
  }
  return (
    <div className="proto-step">
      <h2 className="proto-step__title">Select or register a patient</h2>
      <p className="proto-step__lede">
        Create or select a local patient record to begin a screening workflow. Patient selection
        does not determine image quality or the illustrative screening profile.
      </p>

      <div className="patient-grid">
        {patients.map((p) => (
          <div key={p.id} className={`patient-card ${selected?.id === p.id ? 'is-selected' : ''}`}>
            <button className="patient-card__select" onClick={() => onSelect(p)}>
              <span className="patient-card__id">{p.id}</span><span className="patient-card__name">{p.name}</span><span className="patient-card__meta">Age {p.age} · Diabetes {p.diabetesDuration}</span>
            </button>
            <button className="patient-card__delete" aria-label={`Delete ${p.name}`} onClick={() => onDelete(p)}><Trash2 size={15} /></button>
          </div>
        ))}
        {patients.length === 0 && <div className="patient-empty"><strong>No patient records yet</strong><span>Create a local record to start the workflow.</span></div>}
        <button className="patient-card patient-card--new" onClick={() => setShowForm((value) => !value)}>
          <UserPlus size={20} strokeWidth={1.8} aria-hidden="true" />
          <span>Register patient</span>
        </button>
      </div>

      {showForm && <form className="patient-form" onSubmit={submit}>
        <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Patient name" /></label>
        <label>Age<input type="number" min="1" max="120" value={form.age} onChange={(event) => setForm({ ...form, age: event.target.value })} placeholder="e.g. 52" /></label>
        <label>Diabetes duration<input value={form.diabetesDuration} onChange={(event) => setForm({ ...form, diabetesDuration: event.target.value })} placeholder="e.g. 6 years" /></label>
        {error && <p className="proto-error">{error}</p>}
        <Button size="sm" icon={UserPlus}>Save patient record</Button>
      </form>}

      <Note>Records are stored only in this browser on this device. Use de-identified information for presentations.</Note>

      <div className="proto-step__footer">
        <span />
        <Button onClick={onNext} disabled={!selected} icon={ArrowRight}>Continue</Button>
      </div>
    </div>
  );
}
