import { expect, test, describe } from "bun:test";
import { getDeviceSpec, DEVICE_SPECS } from "../deviceSpecs";
import type { DeviceVariant } from "../types";

const ALL_VARIANTS: DeviceVariant[] = [
  "iphone-16-pro",
  "ipad-pro-13",
  "macbook-pro",
  "apple-watch",
  "android-phone",
  "pixel",
  "galaxy",
  "browser",
  "desktop",
  "ipad-mini",
  "vision-pro",
  "tv",
];

describe("DEVICE_SPECS", () => {
  test("covers every variant in the type union", () => {
    for (const v of ALL_VARIANTS) {
      expect(DEVICE_SPECS[v]).toBeDefined();
      expect(DEVICE_SPECS[v].variant).toBe(v);
    }
  });

  test("aspect ratios are positive finite numbers", () => {
    for (const spec of Object.values(DEVICE_SPECS)) {
      expect(spec.aspect).toBeGreaterThan(0);
      expect(Number.isFinite(spec.aspect)).toBe(true);
    }
  });

  test("naturalFit is between 0 and 1", () => {
    for (const spec of Object.values(DEVICE_SPECS)) {
      expect(spec.naturalFit).toBeGreaterThan(0);
      expect(spec.naturalFit).toBeLessThanOrEqual(1);
    }
  });

  test("phones have larger naturalFit than tablets", () => {
    const phones = ALL_VARIANTS.filter((v) => DEVICE_SPECS[v].category === "phone");
    const tablets = ALL_VARIANTS.filter((v) => DEVICE_SPECS[v].category === "tablet");
    const minPhoneFit = Math.min(...phones.map((v) => DEVICE_SPECS[v].naturalFit));
    const maxTabletFit = Math.max(...tablets.map((v) => DEVICE_SPECS[v].naturalFit));
    expect(minPhoneFit).toBeGreaterThan(maxTabletFit);
  });

  test("phone category has aspect ratio > 1.8 (portrait, tall)", () => {
    const phones = ALL_VARIANTS.filter((v) => DEVICE_SPECS[v].category === "phone");
    for (const v of phones) {
      expect(DEVICE_SPECS[v].aspect).toBeGreaterThan(1.8);
    }
  });

  test("laptop / desktop / tv are landscape (aspect < 1)", () => {
    const landscape = ["macbook-pro", "browser", "desktop", "tv", "vision-pro"] as const;
    for (const v of landscape) {
      expect(DEVICE_SPECS[v].aspect).toBeLessThan(1);
    }
  });
});

describe("getDeviceSpec", () => {
  test("returns the correct spec for a known variant", () => {
    const spec = getDeviceSpec("iphone-16-pro");
    expect(spec.category).toBe("phone");
    expect(spec.naturalFit).toBe(DEVICE_SPECS["iphone-16-pro"].naturalFit);
  });

  test("falls back to iphone-16-pro for an unknown variant", () => {
    // @ts-expect-error intentional invalid input
    const spec = getDeviceSpec("nonsense");
    expect(spec.variant).toBe("iphone-16-pro");
  });

  test("iPhone aspect matches the frame's BASE_H/BASE_W (785/377)", () => {
    const spec = getDeviceSpec("iphone-16-pro");
    expect(spec.aspect).toBeCloseTo(785 / 377, 3);
  });

  test("iPad aspect matches 785/571", () => {
    const spec = getDeviceSpec("ipad-pro-13");
    expect(spec.aspect).toBeCloseTo(785 / 571, 3);
  });
});
