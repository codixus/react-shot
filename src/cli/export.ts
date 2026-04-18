import { createServer } from "vite";
import { resolve, join } from "path";
import { mkdirSync, rmSync, existsSync } from "fs";
import { execSync } from "child_process";
import puppeteer from "puppeteer";
import sharp from "sharp";
import { pathToFileURL } from "url";
import type { ReactShotConfig } from "./config";
import type { CompositionEntry, Preset } from "../lib/types";
import { createViteConfig } from "./vite-config";

interface Job {
  compositionId: string;
  locale: string;
  device: "ios" | "ipad";
  preset: Preset;
  slices: number;
}

export function parseExportArgs(args: string[]) {
  let compositionId = "";
  let locale: string | undefined;
  let device: string | undefined;
  let allLocales = false;
  let all = false;
  let store = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--locale" && args[i + 1]) locale = args[++i];
    else if (args[i] === "--device" && args[i + 1]) device = args[++i];
    else if (args[i] === "--all-locales") allLocales = true;
    else if (args[i] === "--all") all = true;
    else if (args[i] === "--store") store = true;
    else if (!args[i].startsWith("--") && !compositionId) compositionId = args[i];
  }

  return { compositionId, locale, device, allLocales, all, store };
}

export async function runExport(cwd: string, config: ReactShotConfig, args: string[]) {
  const { compositionId, locale, device, allLocales, all, store } = parseExportArgs(args);

  if (!compositionId) {
    console.error("Usage: react-shot export <compositionId> [--all] [--store]");
    process.exit(1);
  }

  const registryPath = resolve(cwd, config.compositionsDir, "index.ts");
  const registry = await import(pathToFileURL(registryPath).href);
  const rawCompositions = registry.compositions || registry.default?.compositions || [];
  const compositions: CompositionEntry[] = Array.isArray(rawCompositions) ? rawCompositions : [];
  const comp = compositions.find((c) => c.id === compositionId);

  if (!comp) {
    console.error(`Composition "${compositionId}" not found.`);
    console.error(`Available: ${compositions.map((c) => c.id).join(", ")}`);
    process.exit(1);
  }

  const { appstore, appstoreIPad } = await import("../lib/presets");
  const locales = comp.locales || ["en"];
  const devices = ["ios", "ipad"] as const;
  const slices = comp.slices ?? 5;
  const presets: Record<string, Preset> = {
    ios: comp.preset || appstore,
    ipad: comp.ipadPreset || appstoreIPad,
  };

  const jobs: Job[] = [];

  if (all) {
    for (const loc of locales) {
      for (const dev of devices) {
        jobs.push({ compositionId, locale: loc, device: dev, preset: presets[dev], slices });
      }
    }
  } else if (allLocales) {
    const dev = (device || "ios") as "ios" | "ipad";
    for (const loc of locales) {
      jobs.push({ compositionId, locale: loc, device: dev, preset: presets[dev], slices });
    }
  } else {
    const loc = locale || "en";
    const dev = (device || "ios") as "ios" | "ipad";
    jobs.push({ compositionId, locale: loc, device: dev, preset: presets[dev], slices });
  }

  console.log(`react-shot export${store ? " [STORE]" : ""}`);
  console.log(`Jobs: ${jobs.length} (${jobs.map(j => `${j.locale}/${j.device}`).join(", ")})\n`);

  const port = config.port + 100;
  const server = await createServer(createViteConfig(cwd, config, {
    server: { port },
    logLevel: "silent",
  }));

  await server.listen();
  const serverUrl = `http://localhost:${port}`;
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

  try {
    for (const job of jobs) {
      const sliceWidth = job.preset.width;
      const sliceHeight = job.preset.height;
      const totalWidth = sliceWidth * job.slices;
      const totalHeight = sliceHeight;

      const outputDir = store
        ? join(resolve(cwd, config.export.outputDir), job.locale, config.export.deviceFolders[job.device])
        : resolve(cwd, "output", job.compositionId, job.locale, job.device);

      if (existsSync(outputDir)) rmSync(outputDir, { recursive: true });
      mkdirSync(outputDir, { recursive: true });

      const label = `${job.compositionId}/${job.locale}/${job.device}`;
      console.log(`  Exporting: ${label}`);

      const page = await browser.newPage();
      let buf: Buffer | Uint8Array;

      try {
        await page.setViewport({ width: totalWidth, height: totalHeight, deviceScaleFactor: 1 });

        const url = `${serverUrl}/render/${job.compositionId}?locale=${job.locale}&device=${job.device}`;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 });
        await new Promise((r) => setTimeout(r, 500));

        buf = await page.screenshot({
          type: "png",
          clip: { x: 0, y: 0, width: totalWidth, height: totalHeight },
        });
      } catch (error) {
        console.error(`    Failed to render ${label}:`, error);
        await page.close();
        continue;
      }

      await page.close();

      for (let i = 0; i < job.slices; i++) {
        const path = join(outputDir, `${String(i + 1).padStart(2, "0")}.png`);
        await sharp(buf)
          .extract({ left: i * sliceWidth, top: 0, width: sliceWidth, height: sliceHeight })
          .toFile(path);
        console.log(`    -> ${path}`);
      }

      if (!store) {
        try {
          const zipName = `${job.compositionId}-${job.locale}-${job.device}.zip`;
          const files = Array.from({ length: job.slices }, (_, i) => `${String(i + 1).padStart(2, "0")}.png`).join(" ");
          execSync(`cd "${outputDir}" && zip -j "${join(outputDir, zipName)}" ${files}`, { stdio: "pipe" });
        } catch (error) {
          console.warn(`    ZIP failed for ${label}:`, error);
        }
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log(`\nDone! ${jobs.length} sets exported.`);
  if (store) {
    console.log(`Output: ${resolve(cwd, config.export.outputDir)}`);
  }
}
