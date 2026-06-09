import express from "express";
const router = express.Router();

import {
  createNewPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../services/patientService.js";

/**
 * @openapi
 * /api/v1/patients:
 *   get:
 *     summary: List all patients
 *     description: Returns the full collection of patient records.
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *             example:
 *               - id: 621c7f80-cefb-47d5-b2b4-01f7c3f25b99
 *                 patient_id: P1002
 *                 patient_name: Jane Smith
 *                 gender: Female
 *                 date_of_birth: '1990-09-28'
 *                 visit_date: '2023-01-05'
 *                 symptoms: Cough and Sore Throat
 *                 diagnosis: Bronchitis
 *                 medication: Amoxicillin
 *                 dosage: 500mg
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /patients
router.get("/patients", async (req, res, next) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/v1/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     description: Returns a single patient identified by its UUID.
 *     tags: [Patients]
 *     parameters:
 *       - $ref: '#/components/parameters/PatientId'
 *     responses:
 *       200:
 *         description: The requested patient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *             example:
 *               id: 621c7f80-cefb-47d5-b2b4-01f7c3f25b99
 *               patient_id: P1002
 *               patient_name: Jane Smith
 *               gender: Female
 *               date_of_birth: '1990-09-28'
 *               visit_date: '2023-01-05'
 *               symptoms: Cough and Sore Throat
 *               diagnosis: Bronchitis
 *               medication: Amoxicillin
 *               dosage: 500mg
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /patients/:id
router.get("/patients/:id", async (req, res, next) => {
  try {
    const patient = await getPatientById(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/v1/patients:
 *   post:
 *     summary: Create a new patient
 *     description: Creates a new patient record. The server assigns the `id`.
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *           example:
 *             patient_id: P1002
 *             patient_name: Jane Smith
 *             gender: Female
 *             date_of_birth: '1990-09-28'
 *             visit_date: '2023-01-05'
 *             symptoms: Cough and Sore Throat
 *             diagnosis: Bronchitis
 *             medication: Amoxicillin
 *             dosage: 500mg
 *     responses:
 *       201:
 *         description: The newly created patient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *             example:
 *               id: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
 *               patient_id: P1002
 *               patient_name: Jane Smith
 *               gender: Female
 *               date_of_birth: '1990-09-28'
 *               visit_date: '2023-01-05'
 *               symptoms: Cough and Sore Throat
 *               diagnosis: Bronchitis
 *               medication: Amoxicillin
 *               dosage: 500mg
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// POST /patients
router.post("/patients", async (req, res, next) => {
  try {
    const patient = await createNewPatient(req.body);
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/v1/patients/{id}:
 *   put:
 *     summary: Update an existing patient
 *     description: >-
 *       Updates the patient identified by its UUID. Supplied fields are merged
 *       into the existing record; the `id` cannot be changed.
 *     tags: [Patients]
 *     parameters:
 *       - $ref: '#/components/parameters/PatientId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *           example:
 *             diagnosis: Pneumonia
 *             medication: Azithromycin
 *             dosage: 250mg
 *     responses:
 *       200:
 *         description: The updated patient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *             example:
 *               id: 621c7f80-cefb-47d5-b2b4-01f7c3f25b99
 *               patient_id: P1002
 *               patient_name: Jane Smith
 *               gender: Female
 *               date_of_birth: '1990-09-28'
 *               visit_date: '2023-01-05'
 *               symptoms: Cough and Sore Throat
 *               diagnosis: Pneumonia
 *               medication: Azithromycin
 *               dosage: 250mg
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// PUT /patients/:id
router.put("/patients/:id", async (req, res, next) => {
  try {
    const updatedPatient = await updatePatient(req.params.id, req.body);
    res.status(200).json(updatedPatient);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/v1/patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Permanently removes the patient identified by its UUID.
 *     tags: [Patients]
 *     parameters:
 *       - $ref: '#/components/parameters/PatientId'
 *     responses:
 *       204:
 *         description: Patient deleted successfully. No content is returned.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// DELETE /patients/:id
router.delete("/patients/:id", async (req, res, next) => {
  try {
    await deletePatient(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
