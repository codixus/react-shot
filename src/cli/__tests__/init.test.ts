import { expect, test, describe, beforeEach, afterEach } from "bun:test";
import { mkdtempSync, rmSync, existsSync, readFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { runInit } from "../init";

describe("runInit scaffold", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "rs-init-"));
  });

  afterEach(() => {
    if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  });

  test("creates all expected files", async () => {
    await runInit(dir);
    for (const path of [
      "react-shot.config.ts",
      "package.json",
      ".gitignore",
      "compositions/hero/index.tsx",
      "compositions/index.ts",
      "public/assets/screenshots/ios",
      "public/assets/screenshots/ipad",
      "public/assets/fonts",
    ]) {
      expect(existsSync(join(dir, path))).toBe(true);
    }
  });

  test("generated hero.tsx uses the v1 API", async () => {
    await runInit(dir);
    const src = readFileSync(join(dir, "compositions/hero/index.tsx"), "utf8");
    // v1 primitives present
    expect(src).toMatch(/from "react-shot"/);
    expect(src).toMatch(/Canvas,\s*Slice,\s*Region,\s*Device/);
    expect(src).toMatch(/<Bg\s+dots=/);
    expect(src).toMatch(/variant="pill"/);
    expect(src).toMatch(/appstoreIPad/);
    // v0 API absent
    expect(src).not.toMatch(/CampaignSlide/);
    expect(src).not.toMatch(/appstoreIOS\b/);
    expect(src).not.toMatch(/<Circle\b/);
    expect(src).not.toMatch(/style="pill"/);
  });

  test("registry entry sets the correct slice count + locales", async () => {
    await runInit(dir);
    const src = readFileSync(join(dir, "compositions/index.ts"), "utf8");
    expect(src).toMatch(/slices:\s*5/);
    expect(src).toMatch(/locales:\s*\["en"\]/);
    expect(src).toMatch(/preset:\s*appstore\b/);
    expect(src).toMatch(/ipadPreset:\s*appstoreIPad/);
  });

  test("package.json has the three expected scripts", async () => {
    await runInit(dir);
    const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    expect(pkg.scripts.dev).toBe("react-shot dev");
    expect(pkg.scripts.export).toBe("react-shot export");
    expect(pkg.scripts.build).toBe("react-shot build");
    expect(pkg.dependencies["react-shot"]).toBe("latest");
  });

  test("skips scaffold if already initialized", async () => {
    await runInit(dir);
    const firstMtime = readFileSync(join(dir, "react-shot.config.ts"));
    await new Promise((r) => setTimeout(r, 10));
    await runInit(dir); // second call should no-op
    const secondMtime = readFileSync(join(dir, "react-shot.config.ts"));
    expect(secondMtime.equals(firstMtime)).toBe(true);
  });
});
