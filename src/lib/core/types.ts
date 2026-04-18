export interface SafeArea {
  top: number;
  sides: number;
  bottom: number;
}

export interface Preset {
  name: string;
  description?: string;
  /** Single slice width in design px. Total canvas width = width × slices. */
  width: number;
  /** Slice (and canvas) height in design px. */
  height: number;
  safeArea?: Partial<SafeArea>;
}

export type DeviceCategory = "phone" | "tablet" | "laptop" | "watch" | "desktop" | "tv" | "headset" | "browser";

export type DeviceVariant =
  | "iphone-16-pro"
  | "ipad-pro-13"
  | "macbook-pro"
  | "apple-watch"
  | "android-phone"
  | "pixel"
  | "galaxy"
  | "browser"
  | "desktop"
  | "ipad-mini"
  | "vision-pro"
  | "tv";

export interface DeviceSpec {
  variant: DeviceVariant;
  category: DeviceCategory;
  /** Intrinsic aspect ratio: height / width. */
  aspect: number;
  /** Natural width-relative-to-slice factor. Tuned per category. */
  naturalFit: number;
}

export type RegionAnchor = "top" | "middle" | "bottom";

export type FrameColor = "titanium" | "black" | "white" | "silver" | (string & {});

export interface Tokens {
  space: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number };
  radius: { sm: number; md: number; lg: number; xl: number; pill: number };
  fontSize: {
    caption: number;
    body: number;
    subtitle: number;
    title: number;
    display: number;
  };
  fontWeight: { regular: number; medium: number; semibold: number; bold: number; black: number };
  blur: { sm: number; md: number; lg: number };
  letterSpacing: { tight: number; normal: number; wide: number };
}

export interface StageInfo {
  preset: Preset;
  slices: number;
  sliceWidth: number;
  sliceHeight: number;
  safeArea: SafeArea;
  device: DeviceVariant;
  deviceSpec: DeviceSpec;
  /** Resolved device width in slice px. */
  deviceWidth: number;
  /** Resolved device height in slice px. */
  deviceHeight: number;
  tokens: Tokens;
}

export interface CompositionProps {
  showSliceGuides?: boolean;
  locale?: string;
  device?: DeviceVariant;
}

export type HighlightStyle = "underline" | "pill" | "color" | "italic" | "stroke";
