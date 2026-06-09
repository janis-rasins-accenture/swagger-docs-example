import { defineConfig } from "vite";

/**
 * Vite build configuration for the Express server.
 *
 * This is an SSR (Node) build: Vite bundles the TypeScript entry in `src/`
 * into a single `dist/app.js`, resolving relative imports at build time so
 * the output runs under Node with `node dist/app.js`. Third-party
 * dependencies (express, swagger-*, uuid, …) are externalized and loaded
 * from node_modules at runtime.
 *
 * Static assets in `src/public/` are copied to `dist/public/` by the
 * "postbuild" npm script.
 */
export default defineConfig({
  // No client assets / index.html entry — this build targets Node only.
  publicDir: false,
  build: {
    ssr: "src/app.ts",
    outDir: "dist",
    target: "node22",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "app.js",
        format: "esm",
      },
    },
  },
});
