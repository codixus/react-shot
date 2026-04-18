import type { CSSProperties, ReactNode } from "react";
import { useStage } from "../StageContext";

interface SubtitleProps {
  children: ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  lineHeight?: number;
  className?: string;
  style?: CSSProperties;
}

export function Subtitle({
  children,
  size,
  weight,
  color = "rgba(17,17,17,0.62)",
  align,
  maxWidth,
  lineHeight = 1.3,
  className,
  style,
}: SubtitleProps) {
  const { tokens } = useStage();
  const fontSize = size ?? tokens.fontSize.subtitle;
  const resolvedWeight = weight ?? tokens.fontWeight.semibold;

  return (
    <div
      className={className}
      style={{
        fontSize,
        fontWeight: resolvedWeight,
        color,
        textAlign: align,
        lineHeight,
        fontFamily: "Nunito, sans-serif",
        maxWidth,
        WebkitFontSmoothing: "antialiased",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
