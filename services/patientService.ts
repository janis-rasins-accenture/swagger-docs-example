import { generateUniqueId, readData, writeData } from "../helpers.js";
import { Patient } from "./patientService.types";

async function getAllPatients() {
  return await readData();
}

async function getPatientById(id: string) {
  const patients = await readData();
  const patient = patients.find((patient: Patient) => patient.id === id);
  if (!patient) throw new Error("notfound");
  return patient;
}

async function createNewPatient(patient: Omit<Patient, "id">) {
  const patients = await readData();
  const newId = await generateUniqueId();
  const newPatient = { id: newId, ...patient };
  patients.push(newPatient);
  await writeData(patients);
  return newPatient;
}

async function updatePatient(id: string, updatedData: Partial<Patient>) {
  const patients = await readData();
  const index = patients.findIndex((p: Patient) => p.id === id);
  if (index === -1) throw new Error("notfound");
  patients[index] = { ...patients[index], ...updatedData, id };
  await writeData(patients);
  return patients[index];
}

async function deletePatient(id: string) {
  const patients = await readData();
  const index = patients.findIndex((p: Patient) => p.id === id);
  if (index === -1) throw new Error("notfound");
  patients.splice(index, 1);
  await writeData(patients);
  return patients;
}

export {
  getAllPatients,
  getPatientById,
  createNewPatient,
  updatePatient,
  deletePatient,
};
