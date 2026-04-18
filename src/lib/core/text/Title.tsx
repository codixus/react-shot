import type { CSSProperties, ReactNode } from "react";
import { useStage } from "../StageContext";

interface TitleProps {
  children: ReactNode;
  /** Override computed font size in design px. */
  size?: number;
  /** 100..900. Default: tokens.fontWeight.black. */
  weight?: number;
  color?: string;
  align?: "left" | "center" | "right";
  lineHeight?: number;
  letterSpacing?: number;
  /** Max width in design px; if omitted, content-width within region. */
  maxWidth?: number;
  className?: string;
  style?: CSSProperties;
}

export function Title({
  children,
  size,
  weight,
  color = "#111",
  align,
  lineHeight = 1.02,
  letterSpacing,
  maxWidth,
  className,
  style,
}: TitleProps) {
  const { tokens } = useStage();
  const fontSize = size ?? tokens.fontSize.title;
  const resolvedWeight = weight ?? tokens.fontWeight.black;
  const resolvedLetter = letterSpacing ?? fontSize * -0.02;

  return (
    <div
      className={className}
      style={{
        fontSize,
        fontWeight: resolvedWeight,
        color,
        textAlign: align,
        lineHeight,
        letterSpacing: resolvedLetter,
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
