import { expect, test, describe } from "bun:test";
import { mkdtempSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { defineConfig, loadConfig } from "../config";

describe("defineConfig", () => {
  test("returns all defaults when no overrides given", () => {
    const c = defineConfig({});
    expect(c.compositionsDir).toBe("./compositions");
    expect(c.publicDir).toBe("./public");
    expect(c.port).toBe(5174);
    expect(c.export.outputDir).toBe("./appstore");
    expect(c.export.deviceFolders.ios).toBe("APP_IPHONE_67");
    expect(c.export.deviceFolders.ipad).toBe("APP_IPAD_PRO_6GEN_129");
  });

  test("overrides merge onto defaults", () => {
    const c = defineConfig({
      compositionsDir: "./src/compositions",
      port: 6000,
    });
    expect(c.compositionsDir).toBe("./src/compositions");
    expect(c.port).toBe(6000);
    // Non-overridden keys keep defaults
    expect(c.publicDir).toBe("./public");
    expect(c.export.outputDir).toBe("./appstore");
  });

  test("export key is shallow-merged, not replaced", () => {
    const c = defineConfig({ export: { outputDir: "./out", deviceFolders: {} } });
    expect(c.export.outputDir).toBe("./out");
    // deviceFolders explicitly overridden to empty
    expect(c.export.deviceFolders).toEqual({});
  });

  test("creativeFamily, brandColor, targetDisplay pass through", () => {
    const c = defineConfig({
      creativeFamily: "ai-assistant",
      brandColor: "#FF0000",
      targetDisplay: "ipad",
    });
    expect(c.creativeFamily).toBe("ai-assistant");
    expect(c.brandColor).toBe("#FF0000");
    expect(c.targetDisplay).toBe("ipad");
  });
});

describe("loadConfig", () => {
  test("returns defaults when config file is missing", async () => {
    const dir = mkdtempSync(join(tmpdir(), "rs-config-missing-"));
    const c = await loadConfig(dir);
    expect(c.compositionsDir).toBe("./compositions");
    expect(c.port).toBe(5174);
  });

  test("reads a valid react-shot.config.ts", async () => {
    const dir = mkdtempSync(join(tmpdir(), "rs-config-valid-"));
    writeFileSync(
      join(dir, "react-shot.config.ts"),
      `export default { compositionsDir: "./my-comps", port: 7001 };`,
    );
    const c = await loadConfig(dir);
    expect(c.compositionsDir).toBe("./my-comps");
    expect(c.port).toBe(7001);
    // missing keys still fall back
    expect(c.publicDir).toBe("./public");
  });

  test("invalid default export falls back to defaults silently", async () => {
    const dir = mkdtempSync(join(tmpdir(), "rs-config-invalid-"));
    writeFileSync(join(dir, "react-shot.config.ts"), `export default 42;`);
    const c = await loadConfig(dir);
    expect(c.compositionsDir).toBe("./compositions");
  });
});
