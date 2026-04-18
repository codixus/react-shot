import { expect, test, describe } from "bun:test";
import { makeTokens } from "../tokens";

describe("makeTokens", () => {
  test("scales linearly with reference width (±1px rounding)", () => {
    const small = makeTokens(500);
    const big = makeTokens(1000);

    for (const key of ["xs", "sm", "md", "lg", "xl", "xxl"] as const) {
      const delta = Math.abs(big.space[key] - small.space[key] * 2);
      expect(delta).toBeLessThanOrEqual(1);
    }
    for (const key of ["caption", "body", "subtitle", "title", "display"] as const) {
      const delta = Math.abs(big.fontSize[key] - small.fontSize[key] * 2);
      expect(delta).toBeLessThanOrEqual(1);
    }
  });

  test("space tokens are in ascending order", () => {
    const t = makeTokens(1000);
    expect(t.space.xs).toBeLessThan(t.space.sm);
    expect(t.space.sm).toBeLessThan(t.space.md);
    expect(t.space.md).toBeLessThan(t.space.lg);
    expect(t.space.lg).toBeLessThan(t.space.xl);
    expect(t.space.xl).toBeLessThan(t.space.xxl);
  });

  test("fontSize is in ascending order", () => {
    const t = makeTokens(1000);
    expect(t.fontSize.caption).toBeLessThan(t.fontSize.body);
    expect(t.fontSize.body).toBeLessThan(t.fontSize.subtitle);
    expect(t.fontSize.subtitle).toBeLessThan(t.fontSize.title);
    expect(t.fontSize.title).toBeLessThan(t.fontSize.display);
  });

  test("font weights are constant regardless of scale", () => {
    const a = makeTokens(100);
    const b = makeTokens(5000);
    expect(a.fontWeight.black).toBe(900);
    expect(b.fontWeight.black).toBe(900);
    expect(a.fontWeight.regular).toBe(400);
    expect(a.fontWeight.medium).toBe(500);
    expect(a.fontWeight.semibold).toBe(600);
    expect(a.fontWeight.bold).toBe(700);
  });

  test("radius.pill is a huge sentinel (effectively infinite)", () => {
    const t = makeTokens(1000);
    expect(t.radius.pill).toBeGreaterThanOrEqual(9999);
  });

  test("letterSpacing values are sane", () => {
    const t = makeTokens(1000);
    expect(t.letterSpacing.tight).toBeLessThan(0);
    expect(t.letterSpacing.normal).toBe(0);
    expect(t.letterSpacing.wide).toBeGreaterThan(0);
  });

  test("handles very small reference width without negatives", () => {
    const t = makeTokens(100);
    for (const v of Object.values(t.space)) expect(v).toBeGreaterThanOrEqual(0);
    for (const v of Object.values(t.fontSize)) expect(v).toBeGreaterThan(0);
  });

  test("handles very large reference width", () => {
    const t = makeTokens(10000);
    expect(t.fontSize.display).toBeGreaterThan(1000);
    expect(t.space.xxl).toBeGreaterThan(1000);
  });

  test("iPhone 6.9\" device width produces reasonable title size", () => {
    // Canvas with appstore preset (1320) × iPhone naturalFit (0.78) ≈ 1030
    const t = makeTokens(1030);
    // Title should land near ~120px which was the old hardcoded value
    expect(t.fontSize.title).toBeGreaterThan(100);
    expect(t.fontSize.title).toBeLessThan(140);
  });

  test("iPad 13\" device width produces a similar title size to iPhone", () => {
    // iPad preset (2064) × iPad naturalFit (0.72) ≈ 1486
    // iPhone ref = 1030. We want perceived parity — not identical, but within 50%.
    const iphone = makeTokens(1030).fontSize.title;
    const ipad = makeTokens(1486).fontSize.title;
    const ratio = ipad / iphone;
    expect(ratio).toBeGreaterThan(1.0);
    expect(ratio).toBeLessThan(1.6);
  });
});
