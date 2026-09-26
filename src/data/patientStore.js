const STORAGE_KEY = 'retinareach-patients-v2';

export function loadPatients() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function savePatients(patients) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  return patients;
}

export function createPatient(values) {
  const name = values?.name?.trim();
  if (!name) throw new Error('Enter a patient name before registering the record.');
  const patients = loadPatients();
  const id = `RR-${String(Date.now()).slice(-6)}`;
  const patient = {
    id,
    name,
    age: Number(values.age) || 0,
    diabetesDuration: values.diabetesDuration?.trim() || 'Not recorded',
    history: [],
  };
  savePatients([...patients, patient]);
  return patient;
}

export function deletePatient(patientId) {
  const patients = loadPatients().filter((patient) => patient.id !== patientId);
  savePatients(patients);
  return patients;
}

export function appendScreening(patientId, screening) {
  const patients = loadPatients().map((patient) => patient.id === patientId
    ? { ...patient, history: [...(patient.history || []), screening] }
    : patient);
  savePatients(patients);
  return patients.find((patient) => patient.id === patientId);
}
