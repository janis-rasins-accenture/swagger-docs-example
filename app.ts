import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";
import patientRouter from "./routes/patientRouter.js";
import swaggerSpec from "./swagger.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "API is running. Navigate to /api/v1/patients to interact with the API, or /api-docs for the API documentation.",
  );
});

// Interactive Swagger/OpenAPI documentation.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Raw OpenAPI specification (JSON).
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

app.use("/api/v1", patientRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  if (error.message === "notfound") {
    res.status(404).json({ error: "No patient found with the provided ID." });
  } else {
    res.status(500).json({
      error: "An internal server error occurred.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
