import type { DeviceSpec, DeviceVariant } from "./types";

/**
 * Intrinsic spec for each device variant.
 *
 * `aspect` = physical height / width (from the frame component's BASE_H / BASE_W).
 * `naturalFit` = how wide the device looks when it's the primary focus of a slice,
 *   as a fraction of sliceWidth. A phone fills more horizontally (0.78); a tablet
 *   fills less (0.52) because the device itself is physically wider.
 *
 * This keeps the *perceived* size of the device consistent across form factors,
 * and lets text scales derive from deviceWidth rather than sliceWidth — which
 * is what makes iPhone and iPad compositions look right with the same code.
 */
export const DEVICE_SPECS: Record<DeviceVariant, DeviceSpec> = {
  "iphone-16-pro": { variant: "iphone-16-pro", category: "phone", aspect: 785 / 377, naturalFit: 0.78 },
  "android-phone": { variant: "android-phone", category: "phone", aspect: 2.1, naturalFit: 0.78 },
  pixel: { variant: "pixel", category: "phone", aspect: 2.1, naturalFit: 0.78 },
  galaxy: { variant: "galaxy", category: "phone", aspect: 2.1, naturalFit: 0.78 },
  "ipad-pro-13": { variant: "ipad-pro-13", category: "tablet", aspect: 785 / 571, naturalFit: 0.72 },
  "ipad-mini": { variant: "ipad-mini", category: "tablet", aspect: 1.45, naturalFit: 0.68 },
  "macbook-pro": { variant: "macbook-pro", category: "laptop", aspect: 0.62, naturalFit: 0.88 },
  "apple-watch": { variant: "apple-watch", category: "watch", aspect: 1.18, naturalFit: 0.42 },
  "vision-pro": { variant: "vision-pro", category: "headset", aspect: 0.55, naturalFit: 0.85 },
  browser: { variant: "browser", category: "browser", aspect: 0.65, naturalFit: 0.88 },
  desktop: { variant: "desktop", category: "desktop", aspect: 0.6, naturalFit: 0.9 },
  tv: { variant: "tv", category: "tv", aspect: 0.56, naturalFit: 0.92 },
};

export function getDeviceSpec(variant: DeviceVariant): DeviceSpec {
  return DEVICE_SPECS[variant] ?? DEVICE_SPECS["iphone-16-pro"];
}
