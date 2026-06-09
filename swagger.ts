import swaggerJSDoc, { type Options } from "swagger-jsdoc";

/**
 * OpenAPI 3.0 specification for the Patient Records API.
 *
 * Reusable schemas, examples and responses are defined here under
 * `components`, while the per-endpoint documentation lives as JSDoc
 * `@openapi` annotations next to each route in `routes/patientRouter.ts`.
 */
const options: Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Patient Records API",
      version: "1.0.0",
      description:
        "A simple REST API for managing patient medical records. " +
        "Supports listing, retrieving, creating, updating and deleting patients.",
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    tags: [
      {
        name: "Patients",
        description: "Operations on patient medical records",
      },
    ],
    components: {
      schemas: {
        // Full patient resource as returned by the API.
        Patient: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Server-generated unique identifier (UUID v4).",
              readOnly: true,
              example: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99",
            },
            patient_id: {
              type: "string",
              description: "Human-readable patient reference number.",
              example: "P1002",
            },
            patient_name: {
              type: "string",
              description: "Full name of the patient.",
              example: "Jane Smith",
            },
            gender: {
              type: "string",
              enum: ["Male", "Female", "Other"],
              description: "Gender of the patient.",
              example: "Female",
            },
            date_of_birth: {
              type: "string",
              format: "date",
              description: "Date of birth in YYYY-MM-DD format.",
              example: "1990-09-28",
            },
            visit_date: {
              type: "string",
              format: "date",
              description: "Date of the recorded visit in YYYY-MM-DD format.",
              example: "2023-01-05",
            },
            symptoms: {
              type: "string",
              description: "Symptoms reported during the visit.",
              example: "Cough and Sore Throat",
            },
            diagnosis: {
              type: "string",
              description: "Diagnosis made by the clinician.",
              example: "Bronchitis",
            },
            medication: {
              type: "string",
              description: "Prescribed medication.",
              example: "Amoxicillin",
            },
            dosage: {
              type: "string",
              description: "Dosage of the prescribed medication.",
              example: "500mg",
            },
          },
        },
        // Payload used to create or update a patient. `id` is omitted as
        // it is always assigned by the server.
        PatientInput: {
          type: "object",
          required: [
            "patient_id",
            "patient_name",
            "gender",
            "date_of_birth",
          ],
          properties: {
            patient_id: {
              type: "string",
              example: "P1002",
            },
            patient_name: {
              type: "string",
              example: "Jane Smith",
            },
            gender: {
              type: "string",
              enum: ["Male", "Female", "Other"],
              example: "Female",
            },
            date_of_birth: {
              type: "string",
              format: "date",
              example: "1990-09-28",
            },
            visit_date: {
              type: "string",
              format: "date",
              example: "2023-01-05",
            },
            symptoms: {
              type: "string",
              example: "Cough and Sore Throat",
            },
            diagnosis: {
              type: "string",
              example: "Bronchitis",
            },
            medication: {
              type: "string",
              example: "Amoxicillin",
            },
            dosage: {
              type: "string",
              example: "500mg",
            },
          },
        },
        // Standard error envelope returned by the API.
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Human-readable error message.",
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "No patient found with the provided ID.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
              example: { error: "No patient found with the provided ID." },
            },
          },
        },
        InternalServerError: {
          description: "An unexpected internal server error occurred.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
              example: { error: "An internal server error occurred." },
            },
          },
        },
      },
      parameters: {
        PatientId: {
          name: "id",
          in: "path",
          required: true,
          description: "Server-generated UUID of the patient.",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99",
        },
      },
    },
  },
  // Files containing the per-endpoint @openapi annotations.
  apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
