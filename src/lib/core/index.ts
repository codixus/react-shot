// Stage & layout
export { Canvas } from "./Canvas";
export { Slice } from "./Slice";
export { Region } from "./Region";
export { Positioned } from "./Positioned";
export { Stack, Row } from "./layout";
export { StageContext, useStage, useSlice } from "./StageContext";
export { useDeviceRenderScale } from "./useStageScale";

// Device & visuals
export { Device } from "./Device";
export { Bg } from "./Bg";
export { Card } from "./Card";
export { Shape } from "./Shape";

// Text
export { Title } from "./text/Title";
export { Subtitle } from "./text/Subtitle";
export { Eyebrow } from "./text/Eyebrow";
export { Caption } from "./text/Caption";
export { Highlight } from "./text/Highlight";

// Tokens & specs
export { makeTokens } from "./tokens";
export { getDeviceSpec, DEVICE_SPECS } from "./deviceSpecs";

// Types
export type {
  Preset,
  SafeArea,
  DeviceVariant,
  DeviceSpec,
  DeviceCategory,
  RegionAnchor,
  FrameColor,
  Tokens,
  StageInfo,
  CompositionProps,
  HighlightStyle,
} from "./types";
