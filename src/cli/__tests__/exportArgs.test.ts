import { expect, test, describe } from "bun:test";
import { parseExportArgs } from "../export";

describe("parseExportArgs", () => {
  test("picks up the composition id as the first bare arg", () => {
    const r = parseExportArgs(["hero"]);
    expect(r.compositionId).toBe("hero");
    expect(r.locale).toBeUndefined();
    expect(r.device).toBeUndefined();
    expect(r.all).toBe(false);
    expect(r.store).toBe(false);
  });

  test("--locale takes the next value", () => {
    const r = parseExportArgs(["hero", "--locale", "tr"]);
    expect(r.locale).toBe("tr");
  });

  test("--device takes the next value", () => {
    const r = parseExportArgs(["hero", "--device", "ipad"]);
    expect(r.device).toBe("ipad");
  });

  test("--all enables every locale × device", () => {
    const r = parseExportArgs(["hero", "--all"]);
    expect(r.all).toBe(true);
    expect(r.allLocales).toBe(false);
  });

  test("--all-locales is separate from --all", () => {
    const r = parseExportArgs(["hero", "--all-locales"]);
    expect(r.allLocales).toBe(true);
    expect(r.all).toBe(false);
  });

  test("--store flag routes to deviceFolders output", () => {
    const r = parseExportArgs(["hero", "--store"]);
    expect(r.store).toBe(true);
  });

  test("combined flags all resolve", () => {
    const r = parseExportArgs(["hero", "--all", "--store", "--locale", "tr"]);
    expect(r.compositionId).toBe("hero");
    expect(r.all).toBe(true);
    expect(r.store).toBe(true);
    expect(r.locale).toBe("tr");
  });

  test("no composition id when only flags passed", () => {
    const r = parseExportArgs(["--all"]);
    expect(r.compositionId).toBe("");
    expect(r.all).toBe(true);
  });

  test("only first bare arg becomes compositionId; extras ignored", () => {
    const r = parseExportArgs(["hero", "other-id"]);
    expect(r.compositionId).toBe("hero");
  });
});
