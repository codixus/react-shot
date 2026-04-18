import type { CSSProperties, ReactNode } from "react";
import { useStage } from "../StageContext";

interface CaptionProps {
  children: ReactNode;
  color?: string;
  align?: "left" | "center" | "right";
  size?: number;
  weight?: number;
  style?: CSSProperties;
}

export function Caption({ children, color = "rgba(17,17,17,0.55)", align, size, weight, style }: CaptionProps) {
  const { tokens } = useStage();
  return (
    <div
      style={{
        fontSize: size ?? tokens.fontSize.caption,
        fontWeight: weight ?? tokens.fontWeight.medium,
        color,
        textAlign: align,
        fontFamily: "Nunito, sans-serif",
        letterSpacing: tokens.letterSpacing.wide * 0.4,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
