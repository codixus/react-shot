import type { ReactNode } from "react";
import type { DeviceVariant, Preset, SafeArea, StageInfo } from "./types";
import { StageContext } from "./StageContext";
import { getDeviceSpec } from "./deviceSpecs";
import { makeTokens } from "./tokens";
import { SliceGuides } from "./SliceGuides";

interface CanvasProps {
  preset: Preset;
  /** Number of horizontal slices (screenshots). */
  slices?: number;
  /** Primary device variant used by <Device> in this canvas. */
  device?: DeviceVariant;
  /** Override device width (design px). Default: spec.naturalFit × sliceWidth. */
  deviceWidth?: number;
  showSliceGuides?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_SAFE_AREA: SafeArea = { top: 0, sides: 0, bottom: 0 };

export function Canvas({
  preset,
  slices = 1,
  device = "iphone-16-pro",
  deviceWidth,
  showSliceGuides = false,
  children,
  className,
  style,
}: CanvasProps) {
  const sliceWidth = preset.width;
  const sliceHeight = preset.height;
  const totalWidth = sliceWidth * slices;
  const safeArea: SafeArea = {
    top: preset.safeArea?.top ?? DEFAULT_SAFE_AREA.top,
    sides: preset.safeArea?.sides ?? DEFAULT_SAFE_AREA.sides,
    bottom: preset.safeArea?.bottom ?? DEFAULT_SAFE_AREA.bottom,
  };
  const spec = getDeviceSpec(device);
  const resolvedDeviceWidth = deviceWidth ?? Math.round(sliceWidth * spec.naturalFit);
  const resolvedDeviceHeight = Math.round(resolvedDeviceWidth * spec.aspect);
  const tokens = makeTokens(resolvedDeviceWidth);

  const info: StageInfo = {
    preset,
    slices,
    sliceWidth,
    sliceHeight,
    safeArea,
    device,
    deviceSpec: spec,
    deviceWidth: resolvedDeviceWidth,
    deviceHeight: resolvedDeviceHeight,
    tokens,
  };

  return (
    <StageContext.Provider value={info}>
      <div
        className={className}
        style={{
          width: totalWidth,
          height: sliceHeight,
          position: "relative",
          overflow: "hidden",
          contain: "layout style paint",
          ...style,
        }}
      >
        {children}
        {showSliceGuides && <SliceGuides />}
      </div>
    </StageContext.Provider>
  );
}
