# Patient Records API

A simple REST API for managing patient medical records, built with Express and TypeScript. It supports listing, retrieving, creating, updating and deleting patients, and ships with interactive Swagger/OpenAPI documentation.

## Live documentation (GitHub Pages)

The documentation is published to GitHub Pages:

- **Landing page:** [https://janis-rasins-accenture.github.io/swagger-docs-example/](https://janis-rasins-accenture.github.io/swagger-docs-example/)
- **API docs (Swagger UI):** [https://janis-rasins-accenture.github.io/swagger-docs-example/docs/](https://janis-rasins-accenture.github.io/swagger-docs-example/docs/)
- **OpenAPI spec (JSON):** [https://janis-rasins-accenture.github.io/swagger-docs-example/openapi.json](https://janis-rasins-accenture.github.io/swagger-docs-example/openapi.json)

## Install

1. Navigate to the project directory.
2. Run `npm install` to install the dependencies.

## Run

1. Start the project in watch mode by running `npm run dev`.
2. Open your browser and navigate to `http://localhost:3000`.

The server runs on port **3000**.

### Other scripts

- `npm run build` — build the production bundle with Vite (also copies static assets into `dist/public`).
- `npm start` — run the built app from `dist/app.js`.

## URLs

| URL                                     | Description                                                  |
| --------------------------------------- | ------------------------------------------------------------ |
| `http://localhost:3000/`                | Static front-end (served from `dist/public` / `src/public`). |
| `http://localhost:3000/api/v1/patients` | Patient records REST API (see below).                        |
| `http://localhost:3000/docs/`           | Interactive Swagger UI documentation.                        |
| `http://localhost:3000/openapi.json`    | Raw OpenAPI 3.0 specification (JSON).                        |
| `http://localhost:3000/api-docs`        | Swagger UI (swagger-ui-express alias).                       |
| `http://localhost:3000/api-docs.json`   | OpenAPI spec alias.                                          |

## API Documentation (Swagger)

Interactive OpenAPI documentation is generated with `swagger-jsdoc` and served via `swagger-ui-express`.

- **Swagger UI:** [http://localhost:3000/docs/](http://localhost:3000/docs/)
- **OpenAPI spec (JSON):** [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

The spec is defined in [src/swagger.ts](src/swagger.ts), and the per-endpoint documentation lives as JSDoc `@openapi` annotations next to each route in [src/routes/patientRouter.ts](src/routes/patientRouter.ts).

## API Endpoints

All endpoints are prefixed with `/api/v1`.

| Method   | Endpoint                | Description                                     | Success status |
| -------- | ----------------------- | ----------------------------------------------- | -------------- |
| `GET`    | `/api/v1/patients`      | List all patients.                              | `200`          |
| `GET`    | `/api/v1/patients/{id}` | Get a single patient by its UUID.               | `200`          |
| `POST`   | `/api/v1/patients`      | Create a new patient (server assigns the `id`). | `201`          |
| `PUT`    | `/api/v1/patients/{id}` | Update an existing patient (fields are merged). | `200`          |
| `DELETE` | `/api/v1/patients/{id}` | Delete a patient.                               | `204`          |

### Error responses

| Status | Description                            |
| ------ | -------------------------------------- |
| `404`  | No patient found with the provided ID. |
| `500`  | An internal server error occurred.     |

### Patient model

A patient record has the following fields:

| Field           | Type          | Notes                                                          |
| --------------- | ------------- | -------------------------------------------------------------- |
| `id`            | string (UUID) | Server-generated, read-only.                                   |
| `patient_id`    | string        | Human-readable reference (e.g. `P1002`). _Required on create._ |
| `patient_name`  | string        | Full name. _Required on create._                               |
| `gender`        | string        | One of `Male`, `Female`, `Other`. _Required on create._        |
| `date_of_birth` | string (date) | `YYYY-MM-DD`. _Required on create._                            |
| `visit_date`    | string (date) | `YYYY-MM-DD`.                                                  |
| `symptoms`      | string        | Symptoms reported during the visit.                            |
| `diagnosis`     | string        | Diagnosis made by the clinician.                               |
| `medication`    | string        | Prescribed medication.                                         |
| `dosage`        | string        | Dosage of the prescribed medication.                           |
