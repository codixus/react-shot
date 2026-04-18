import { defineConfig } from "./src/cli/config";

// Demo setup: compositions live under demo/compositions, static assets
// (screenshots + fonts) under the repo-root public/.
export default defineConfig({
  compositionsDir: "./demo/compositions",
  publicDir: "./public",
});
