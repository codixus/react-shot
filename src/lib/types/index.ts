import type { ComponentType } from "react";
import type {
  CompositionProps,
  DeviceCategory,
  DeviceSpec,
  DeviceVariant,
  FrameColor,
  HighlightStyle,
  Preset,
  RegionAnchor,
  SafeArea,
  StageInfo,
  Tokens,
} from "../core/types";

export type {
  CompositionProps,
  DeviceCategory,
  DeviceSpec,
  DeviceVariant,
  FrameColor,
  HighlightStyle,
  Preset,
  RegionAnchor,
  SafeArea,
  StageInfo,
  Tokens,
};

export type CreativeFamily =
  | "editorial-travel"
  | "creator-bold"
  | "transit-utility"
  | "playful-commerce"
  | "premium-neutral"
  | "ai-learning"
  | "ai-assistant";

export type StorySlotRole = "hook" | "shift" | "proof" | "feature" | "cta";

export interface BenefitHeadline {
  verb: string;
  outcome: string;
  support?: string;
  kicker?: string;
  proof?: string;
}

export interface StorySlot {
  role: StorySlotRole;
  headline: BenefitHeadline;
  screenshot?: string;
  proofItems?: string[];
}

export interface ScreenshotNarrative {
  name: string;
  family: CreativeFamily;
  brandColor: string;
  slots: StorySlot[];
}

export interface CompositionEntry {
  id: string;
  name: string;
  component: ComponentType<CompositionProps>;
  /** Canvas preset for the default device. */
  preset: Preset;
  /** Number of screenshot slices. Default: 5. */
  slices?: number;
  /** Primary device variant. Default: iphone-16-pro. */
  device?: DeviceVariant;
  /** Optional iPad override — when set, `--device ipad` exports use it. */
  ipadPreset?: Preset;
  locales?: string[];
  family?: CreativeFamily;
  narrative?: ScreenshotNarrative;
}
