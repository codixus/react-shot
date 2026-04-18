import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  root: __dirname,
  // Serve demo assets (screenshots) + library assets (fonts, elements) from
  // the repo's top-level `public/`. Screenshots live under `screenshots/` and
  // are intentionally excluded from `files` in package.json — demo only.
  publicDir: resolve(__dirname, "../public"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "react-shot/presets": resolve(__dirname, "../src/lib/presets/index.ts"),
      "react-shot/types": resolve(__dirname, "../src/lib/types/index.ts"),
      "react-shot/config": resolve(__dirname, "../src/cli/config.ts"),
      "react-shot": resolve(__dirname, "../src/lib/index.ts"),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: resolve(__dirname, "../dist-demo"),
    emptyOutDir: true,
  },
});
