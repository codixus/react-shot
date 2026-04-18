import { build } from "vite";
import { resolve } from "path";
import type { ReactShotConfig } from "./config";
import { createViteConfig } from "./vite-config";

export async function runBuild(cwd: string, config: ReactShotConfig) {
  console.log("react-shot build\n");

  await build(createViteConfig(cwd, config, {
    build: {
      outDir: resolve(cwd, "dist"),
    },
  }));

  console.log("\nBuild complete → dist/");
}
