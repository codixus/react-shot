import { expect, test, describe } from "bun:test";
import {
  appstore,
  appstoreIPad,
  playstore,
  socialInstagram,
  socialTwitter,
  createPreset,
} from "../../presets";

describe("presets", () => {
  test("appstore is the iPhone 6.9\" slot size", () => {
    expect(appstore.width).toBe(1320);
    expect(appstore.height).toBe(2868);
  });

  test("appstoreIPad is the 13\" iPad slot size", () => {
    expect(appstoreIPad.width).toBe(2064);
    expect(appstoreIPad.height).toBe(2752);
  });

  test("playstore is the expected Play portrait size", () => {
    expect(playstore.width).toBe(1080);
    expect(playstore.height).toBe(1920);
  });

  test("socialInstagram is a square", () => {
    expect(socialInstagram.width).toBe(socialInstagram.height);
  });

  test("socialTwitter is a banner (width > height)", () => {
    expect(socialTwitter.width).toBeGreaterThan(socialTwitter.height);
  });

  test("no preset carries a slice count (slices moved to Canvas prop)", () => {
    for (const p of [appstore, appstoreIPad, playstore, socialInstagram, socialTwitter]) {
      expect("slices" in p).toBe(false);
      expect("sliceWidth" in p).toBe(false);
      expect("totalWidth" in p).toBe(false);
    }
  });

  test("appstore safeArea has all three edges", () => {
    expect(appstore.safeArea?.top).toBeGreaterThan(0);
    expect(appstore.safeArea?.sides).toBeGreaterThan(0);
    expect(appstore.safeArea?.bottom).toBeGreaterThan(0);
  });

  test("each preset has a name and description", () => {
    for (const p of [appstore, appstoreIPad, playstore, socialInstagram, socialTwitter]) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description?.length ?? 0).toBeGreaterThan(0);
    }
  });
});

describe("createPreset", () => {
  test("builds a valid preset from width/height", () => {
    const p = createPreset(900, 1600);
    expect(p.width).toBe(900);
    expect(p.height).toBe(1600);
    expect(p.name).toBe("Custom");
  });

  test("passes through safeArea", () => {
    const p = createPreset(900, 1600, { top: 50, sides: 20, bottom: 30 });
    expect(p.safeArea).toEqual({ top: 50, sides: 20, bottom: 30 });
  });

  test("accepts a custom name", () => {
    const p = createPreset(100, 100, undefined, "My preset");
    expect(p.name).toBe("My preset");
  });
});
