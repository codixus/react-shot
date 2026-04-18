// react-shot public API
// A declarative screenshot composition library. Minimal primitive set;
// everything else is a variant prop or a composition of these pieces.

export * from "./core";
export * from "./presets";
export { Viewport } from "./components/Viewport";
export { ThemeToggle } from "./components/ThemeToggle";
export { useChromeTheme, setChromeTheme, palette } from "./components/theme";
export type { ChromeMode, ChromePalette } from "./components/theme";
export { useIsMobile } from "./components/useIsMobile";
export type {
  CompositionEntry,
  CompositionProps,
  CreativeFamily,
  StorySlot,
  StorySlotRole,
  BenefitHeadline,
  ScreenshotNarrative,
} from "./types";
