import { expect, test, describe } from "bun:test";
import { palette } from "../theme";

describe("palette()", () => {
  test("dark and light produce distinct backgrounds", () => {
    const d = palette("dark");
    const l = palette("light");
    expect(d.bg).not.toBe(l.bg);
    expect(d.text).not.toBe(l.text);
  });

  test("dark has dark bg, light has light bg", () => {
    // Dark bg starts with 0 or 1 hex digit (dark), light bg with E/F (bright).
    expect(palette("dark").bg.toUpperCase()).toMatch(/^#0/);
    expect(palette("light").bg.toUpperCase()).toMatch(/^#[EF]/);
  });

  test("exposes every chrome token", () => {
    const c = palette("dark");
    const keys: Array<keyof typeof c> = [
      "bg", "bgSoft", "surface", "surfaceHi",
      "border", "borderHi", "text", "muted",
      "dim", "accent", "checker",
    ];
    for (const k of keys) expect(typeof c[k]).toBe("string");
  });

  test("accent stays visible on both themes (non-empty)", () => {
    expect(palette("dark").accent.length).toBeGreaterThan(0);
    expect(palette("light").accent.length).toBeGreaterThan(0);
  });
});
