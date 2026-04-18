import type { CSSProperties, ReactNode } from "react";
import { useStage } from "../StageContext";

interface EyebrowProps {
  children: ReactNode;
  /** Visual tone: translucent background, solid accent, or plain text. */
  tone?: "light" | "dark" | "accent" | "ghost";
  accentColor?: string;
  color?: string;
  size?: number;
  style?: CSSProperties;
}

/**
 * Small attention-grabbing label that sits above the Title.
 * Scales with stage tokens; no manual font-size tuning needed.
 */
export function Eyebrow({
  children,
  tone = "light",
  accentColor = "#111",
  color,
  size,
  style,
}: EyebrowProps) {
  const { tokens } = useStage();
  const fontSize = size ?? tokens.fontSize.caption;

  const palette = toneToPalette(tone, accentColor, color);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: `${tokens.space.xs}px ${tokens.space.sm}px`,
        background: palette.bg,
        color: palette.fg,
        fontSize,
        fontWeight: tokens.fontWeight.bold,
        letterSpacing: tokens.letterSpacing.wide,
        textTransform: "uppercase",
        borderRadius: tokens.radius.pill,
        fontFamily: "Nunito, sans-serif",
        backdropFilter: tone === "light" || tone === "dark" ? `blur(${tokens.blur.md}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function toneToPalette(
  tone: "light" | "dark" | "accent" | "ghost",
  accent: string,
  override?: string,
): { bg: string; fg: string } {
  if (tone === "accent") return { bg: accent, fg: override ?? "#fff" };
  if (tone === "dark") return { bg: "rgba(0,0,0,0.82)", fg: override ?? "#fff" };
  if (tone === "ghost") return { bg: "transparent", fg: override ?? accent };
  return { bg: "rgba(255,255,255,0.82)", fg: override ?? "#111" };
}
