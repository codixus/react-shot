import type { CSSProperties } from "react";

type ShapeVariant = "circle" | "ring" | "blob" | "pill" | "square";

interface ShapeProps {
  variant?: ShapeVariant;
  x: number;
  y: number;
  size: number;
  /** For ring/pill: thickness or aspect tweak (design px). */
  thickness?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  rotate?: number;
  style?: CSSProperties;
}

/**
 * Single decorative shape primitive. Replaces Circle / Ring / Blob / Pill /
 * Square / Squircle. Use multiple instances for layered blurry decoration.
 */
export function Shape({
  variant = "circle",
  x,
  y,
  size,
  thickness = 12,
  color = "#fff",
  opacity = 0.1,
  blur,
  rotate,
  style,
}: ShapeProps) {
  const common: CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    opacity,
    filter: blur ? `blur(${blur}px)` : undefined,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    pointerEvents: "none",
  };

  switch (variant) {
    case "ring":
      return (
        <div
          style={{
            ...common,
            borderRadius: "50%",
            border: `${thickness}px solid ${color}`,
            background: "transparent",
            ...style,
          }}
        />
      );
    case "blob":
      return (
        <div
          style={{
            ...common,
            background: color,
            borderRadius: "61% 39% 52% 48% / 55% 46% 54% 45%",
            ...style,
          }}
        />
      );
    case "pill":
      return (
        <div
          style={{
            ...common,
            background: color,
            borderRadius: 9999,
            height: thickness,
            ...style,
          }}
        />
      );
    case "square":
      return (
        <div
          style={{
            ...common,
            background: color,
            ...style,
          }}
        />
      );
    case "circle":
    default:
      return (
        <div
          style={{
            ...common,
            background: color,
            borderRadius: "50%",
            ...style,
          }}
        />
      );
  }
}
