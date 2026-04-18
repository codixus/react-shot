import type { Preset } from "../core/types";

const IOS_SAFE_AREA = { top: 140, sides: 90, bottom: 90 } as const;

/**
 * App Store preset. One screenshot = 1320×2868 (iPhone 6.9"). Canvas total
 * width is multiplied by the `slices` prop on <Canvas>, so a single preset
 * handles any slice count (3, 4, 5, 6, …).
 */
export const appstore: Preset = {
  name: "App Store — iPhone",
  description: "iPhone 6.7/6.9 display",
  width: 1320,
  height: 2868,
  safeArea: IOS_SAFE_AREA,
};

/**
 * App Store iPad preset. One screenshot = 2064×2752 (13"). Pair with
 * `<Canvas device="ipad-pro-13">` to render iPad-framed screenshots.
 */
export const appstoreIPad: Preset = {
  name: "App Store — iPad",
  description: "iPad 13\" display",
  width: 2064,
  height: 2752,
  safeArea: { top: 160, sides: 120, bottom: 120 },
};

/** Google Play — portrait phone screenshot. */
export const playstore: Preset = {
  name: "Google Play",
  description: "Phone portrait",
  width: 1080,
  height: 1920,
  safeArea: { top: 100, sides: 70, bottom: 70 },
};

/** Instagram square post. */
export const socialInstagram: Preset = {
  name: "Instagram",
  description: "Square post",
  width: 1080,
  height: 1080,
  safeArea: { top: 60, sides: 60, bottom: 60 },
};

/** Twitter / X header image. */
export const socialTwitter: Preset = {
  name: "Twitter header",
  description: "Header image",
  width: 1500,
  height: 500,
  safeArea: { top: 40, sides: 60, bottom: 40 },
};

/** Build a custom preset inline. */
export function createPreset(
  width: number,
  height: number,
  safeArea?: Partial<{ top: number; sides: number; bottom: number }>,
  name = "Custom",
): Preset {
  return { name, width, height, safeArea };
}
