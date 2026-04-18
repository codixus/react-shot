import type { CSSProperties, ReactNode } from "react";
import { useStage } from "./StageContext";

type CardVariant = "solid" | "glass" | "float" | "neon" | "outline";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  /**
   * Optional absolute position inside parent. Pass a number for design px,
   * or a string for CSS units (e.g. `"8%"`) — percentages are ideal for
   * overlays inside a <Device>, where they stay correct across iPhone/iPad.
   */
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  textColor?: string;
  accentColor?: string;
  /** Rotation in degrees. */
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Unified card surface. Replaces GlassCard / NeonCard / FloatingCard /
 * TestimonialCard / FeatureCard / ChatBubble / NotificationBubble. Sizing,
 * radius, padding, blur, and shadow all come from stage tokens.
 */
export function Card({
  children,
  variant = "solid",
  x,
  y,
  width,
  height,
  color,
  textColor,
  accentColor,
  rotate = 0,
  className,
  style,
}: CardProps) {
  const { tokens } = useStage();
  const positioned = x !== undefined || y !== undefined;

  const base: CSSProperties = {
    position: positioned ? "absolute" : "relative",
    left: x,
    top: y,
    width,
    height,
    padding: `${tokens.space.md}px ${tokens.space.lg}px`,
    borderRadius: tokens.radius.xl,
    color: textColor,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    boxSizing: "border-box",
  };

  const skin = resolveSkin(variant, color ?? "#fff", accentColor ?? "#111", tokens.blur.md);

  return (
    <div className={className} style={{ ...base, ...skin, ...style }}>
      {children}
    </div>
  );
}

function resolveSkin(variant: CardVariant, color: string, accent: string, blurPx: number): CSSProperties {
  switch (variant) {
    case "glass":
      return {
        background: "rgba(255,255,255,0.18)",
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`,
        border: "1px solid rgba(255,255,255,0.28)",
      };
    case "float":
      return {
        background: color,
        boxShadow: "0 18px 50px rgba(0,0,0,0.16)",
      };
    case "neon":
      return {
        background: color,
        boxShadow: `0 0 40px ${accent}66, 0 0 80px ${accent}33`,
        border: `2px solid ${accent}`,
      };
    case "outline":
      return {
        background: "transparent",
        border: `2px solid ${accent}`,
      };
    case "solid":
    default:
      return { background: color };
  }
}
