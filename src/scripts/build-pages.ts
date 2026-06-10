import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerSpec from "../swagger";

/**
 * Builds the static GitHub Pages site.
 *
 * Generates:
 *   _site/index.html         - landing page (links to /docs and /openapi.json)
 *   _site/docs/index.html    - interactive Swagger UI
 *   _site/openapi.json       - OpenAPI specification (generated from src/swagger.ts)
 */
const outDir = path.resolve("_site");
const srcDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

async function buildPages(): Promise<void> {
  await mkdir(path.join(outDir, "docs"), { recursive: true });

  // Copy landing page
  const landingHtml = await readFile(
    path.join(srcDir, "public/index.html"),
    "utf-8",
  );
  await writeFile(path.join(outDir, "index.html"), landingHtml);

  // Copy Swagger UI page
  const swaggerHtml = await readFile(
    path.join(srcDir, "public/docs/index.html"),
    "utf-8",
  );
  await writeFile(path.join(outDir, "docs/index.html"), swaggerHtml);

  // Generate OpenAPI spec
  await writeFile(
    path.join(outDir, "openapi.json"),
    JSON.stringify(swaggerSpec, null, 2),
  );

  const paths = Object.keys((swaggerSpec as { paths?: object }).paths ?? {});
  console.log(`Built static site in ${outDir}`);
  console.log(`  Paths: ${paths.join(", ")}`);
}

buildPages().catch((error: unknown) => {
  console.error("Failed to build pages:", error);
  process.exit(1);
});
