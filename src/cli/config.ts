import { resolve } from "path";
import { existsSync } from "fs";
import { pathToFileURL } from "url";

import type { CreativeFamily } from "../lib/types";

export interface ReactShotConfig {
  compositionsDir: string;
  publicDir: string;
  export: {
    outputDir: string;
    deviceFolders: Record<string, string>;
  };
  port: number;
  creativeFamily: CreativeFamily;
  brandColor: string;
  targetDisplay: "iphone-65" | "iphone-67" | "iphone-69" | "ipad";
}

const DEFAULTS: ReactShotConfig = {
  compositionsDir: "./compositions",
  publicDir: "./public",
  export: {
    outputDir: "./appstore",
    deviceFolders: {
      ios: "APP_IPHONE_67",
      ipad: "APP_IPAD_PRO_6GEN_129",
    },
  },
  port: 5174,
  creativeFamily: "premium-neutral",
  brandColor: "#1F2937",
  targetDisplay: "iphone-67",
};

export function defineConfig(config: Partial<ReactShotConfig>): ReactShotConfig {
  return {
    compositionsDir: config.compositionsDir ?? DEFAULTS.compositionsDir,
    publicDir: config.publicDir ?? DEFAULTS.publicDir,
    port: config.port ?? DEFAULTS.port,
    creativeFamily: config.creativeFamily ?? DEFAULTS.creativeFamily,
    brandColor: config.brandColor ?? DEFAULTS.brandColor,
    targetDisplay: config.targetDisplay ?? DEFAULTS.targetDisplay,
    export: { ...DEFAULTS.export, ...config.export },
  };
}

const TOP_LEVEL_KEYS = new Set<keyof ReactShotConfig>([
  "compositionsDir",
  "publicDir",
  "export",
  "port",
  "creativeFamily",
  "brandColor",
  "targetDisplay",
]);

export async function loadConfig(cwd: string): Promise<ReactShotConfig> {
  const configPath = resolve(cwd, "react-shot.config.ts");

  if (existsSync(configPath)) {
    try {
      const mod = await import(pathToFileURL(configPath).href);
      const loadedConfig = mod.default;

      if (!loadedConfig || typeof loadedConfig !== "object") {
        return DEFAULTS;
      }

      const unknownKeys = Object.keys(loadedConfig).filter(
        (key) => !TOP_LEVEL_KEYS.has(key as keyof ReactShotConfig)
      );
      if (unknownKeys.length > 0) {
        console.warn(`Unknown config keys in react-shot.config.ts: ${unknownKeys.join(", ")}`);
      }

      return defineConfig(loadedConfig as Partial<ReactShotConfig>);
    } catch {
      console.warn("Failed to load react-shot.config.ts, using defaults");
    }
  }

  return DEFAULTS;
}
