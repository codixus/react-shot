import type { Tokens } from "./types";

/**
 * Build design tokens from a reference width.
 *
 * `ref` is usually the *device width* (not slice width). Typography and spacing
 * scale against the thing the viewer actually looks at — the phone/tablet on
 * screen — so compositions feel the same size regardless of form factor.
 *
 * Spacing uses fractions tuned against an iPhone 6.7" screenshot (deviceWidth
 * ≈ 1030px) where `md` = 40px, `lg` = 60px feel natural at that size.
 */
export function makeTokens(ref: number): Tokens {
  return {
    space: {
      xs: Math.round(ref * 0.012),
      sm: Math.round(ref * 0.024),
      md: Math.round(ref * 0.04),
      lg: Math.round(ref * 0.06),
      xl: Math.round(ref * 0.09),
      xxl: Math.round(ref * 0.13),
    },
    radius: {
      sm: Math.round(ref * 0.015),
      md: Math.round(ref * 0.03),
      lg: Math.round(ref * 0.05),
      xl: Math.round(ref * 0.08),
      pill: 9999,
    },
    fontSize: {
      caption: Math.round(ref * 0.028),
      body: Math.round(ref * 0.038),
      subtitle: Math.round(ref * 0.05),
      title: Math.round(ref * 0.115),
      display: Math.round(ref * 0.16),
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    blur: {
      sm: Math.round(ref * 0.008),
      md: Math.round(ref * 0.018),
      lg: Math.round(ref * 0.04),
    },
    letterSpacing: {
      tight: -0.025,
      normal: 0,
      wide: 0.05,
    },
  };
}
