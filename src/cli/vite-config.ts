import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import type { InlineConfig } from "vite";
import type { ReactShotConfig } from "./config";
import { SDK_ROOT } from "./paths";

export function createViteConfig(
  cwd: string,
  config: ReactShotConfig,
  overrides: InlineConfig = {}
): InlineConfig {
  const aliases = {
    "@compositions": resolve(cwd, config.compositionsDir),
    "@/lib": resolve(SDK_ROOT, "src/lib"),
  };

  return {
    root: resolve(SDK_ROOT, "src/runtime"),
    plugins: [react(), tailwindcss()],
    publicDir: resolve(cwd, config.publicDir),
    configFile: false,
    ...overrides,
    resolve: {
      ...overrides.resolve,
      alias: {
        ...aliases,
        ...(overrides.resolve?.alias ?? {}),
      },
    },
  };
}
