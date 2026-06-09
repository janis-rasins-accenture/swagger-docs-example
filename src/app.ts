import path from "node:path";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";
import patientRouter from "./routes/patientRouter";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets (index.html, etc.). Paths are resolved from the working
// directory (the project root, where `npm start`/`npm run dev` run). The built
// app uses dist/public (copied by the "postbuild" step); running from source
// via tsx falls back to src/public. express.static serves index.html for "/".
app.use(express.static(path.resolve("dist/public")));
app.use(express.static(path.resolve("src/public")));

// Interactive Swagger/OpenAPI documentation.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Raw OpenAPI specification (JSON). Exposed at /openapi.json to match the
// static GitHub Pages site (the landing page and docs/index.html reference
// `./openapi.json` / `../openapi.json`); /api-docs.json is kept as an alias.
app.get(["/openapi.json", "/api-docs.json"], (_req, res) => {
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
