import type { ReactNode } from "react";
import { useStage } from "./StageContext";
import type { DeviceVariant, FrameColor } from "./types";
import { getDeviceSpec } from "./deviceSpecs";

import { IPhone16Pro } from "../components/devices/IPhone16Pro";
import { IPadPro13 } from "../components/devices/IPadPro13";
import { MacBookFrame } from "../components/devices/MacBookFrame";
import { AppleWatchFrame } from "../components/devices/AppleWatchFrame";
import { AndroidPhoneFrame } from "../components/devices/AndroidPhoneFrame";
import { PixelFrame } from "../components/devices/PixelFrame";
import { GalaxyFrame } from "../components/devices/GalaxyFrame";
import { BrowserFrame } from "../components/devices/BrowserFrame";
import { DesktopFrame } from "../components/devices/DesktopFrame";
import { IPadMiniFrame } from "../components/devices/IPadMiniFrame";
import { VisionProFrame } from "../components/devices/VisionProFrame";
import { TVFrame } from "../components/devices/TVFrame";

interface DeviceProps {
  /**
   * App screenshot URL. Omit (or pass an empty string) to render an empty
   * dark device frame — useful for marketing sets that show the device
   * silhouette without promising specific UI.
   */
  screenshot?: string;
  /** Override canvas-level device variant for this instance. */
  variant?: DeviceVariant;
  frameColor?: FrameColor;
  /** Override computed width (design px). */
  width?: number;
  /** Scale the auto-computed device width (0..∞). Default 1. */
  scale?: number;
  /** Children positioned absolutely over the device frame. Not shadowed. */
  children?: ReactNode;
  /** Disable the default drop shadow on the frame. */
  noShadow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Canvas-aware device frame. Inherits variant, width, and shadow defaults
 * from the parent <Canvas>, so most usage is just `<Device screenshot="..." />`.
 *
 * Width resolution: explicit `width` prop → stage.deviceWidth × scale.
 * Stage.deviceWidth is `preset.width × DeviceSpec.naturalFit`, so perceived
 * size stays consistent across iPhone and iPad.
 *
 * Overlay children (Card, Badge, etc.) render above the frame and are NOT
 * subject to the frame's drop-shadow filter.
 */
export function Device({
  screenshot,
  variant,
  frameColor = "white",
  width,
  scale = 1,
  children,
  noShadow = false,
  className,
  style,
}: DeviceProps) {
  const stage = useStage();
  const resolvedVariant = variant ?? stage.device;
  const spec = variant ? getDeviceSpec(variant) : stage.deviceSpec;
  const resolvedWidth = Math.round((width ?? stage.deviceWidth) * scale);
  const resolvedHeight = Math.round(resolvedWidth * spec.aspect);

  const shadow = noShadow
    ? undefined
    : `drop-shadow(0 ${Math.round(resolvedWidth * 0.025)}px ${Math.round(resolvedWidth * 0.08)}px rgba(0,0,0,0.22))`;

  // Empty / missing screenshot renders a transparent SVG so each frame's
  // intrinsic `background: #000` screen area shows through as a dark phone.
  const resolvedScreenshot = screenshot && screenshot.length > 0 ? screenshot : BLANK_SCREENSHOT;
  const frame = renderFrame(resolvedVariant, resolvedScreenshot, resolvedWidth, frameColor);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: resolvedWidth,
        height: resolvedHeight,
        ...style,
      }}
    >
      <div style={{ filter: shadow, width: "100%", height: "100%" }}>{frame}</div>
      {children}
    </div>
  );
}

const BLANK_SCREENSHOT =
  "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%2F%3E";

function renderFrame(variant: DeviceVariant, screenshot: string, width: number, frameColor: FrameColor) {
  switch (variant) {
    case "iphone-16-pro":
      return <IPhone16Pro screenshot={screenshot} width={width} frameColor={frameColor} />;
    case "ipad-pro-13":
      return <IPadPro13 screenshot={screenshot} width={width} frameColor={frameColor} />;
    case "macbook-pro":
      return <MacBookFrame screenshot={screenshot} width={width} />;
    case "apple-watch":
      return <AppleWatchFrame screenshot={screenshot} width={width} />;
    case "android-phone":
      return <AndroidPhoneFrame screenshot={screenshot} width={width} />;
    case "pixel":
      return <PixelFrame screenshot={screenshot} width={width} />;
    case "galaxy":
      return <GalaxyFrame screenshot={screenshot} width={width} />;
    case "browser":
      return <BrowserFrame screenshot={screenshot} width={width} />;
    case "desktop":
      return <DesktopFrame screenshot={screenshot} width={width} />;
    case "ipad-mini":
      return <IPadMiniFrame screenshot={screenshot} width={width} />;
    case "vision-pro":
      return <VisionProFrame screenshot={screenshot} width={width} />;
    case "tv":
      return <TVFrame screenshot={screenshot} width={width} />;
    default:
      return null;
  }
}
