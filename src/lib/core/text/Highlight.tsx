import type { ReactNode } from "react";
import { useStage } from "../StageContext";
import type { HighlightStyle } from "../types";

interface HighlightProps {
  children: ReactNode;
  variant: HighlightStyle;
  color: string;
  textColor?: string;
  /** Override underline bar thickness (design px). Defaults to tokens.space.sm. */
  underlineHeight?: number;
  strokeWidth?: number;
}

/**
 * Text decorator. Token-driven sizing — underline thickness, pill padding, and
 * stroke width all derive from the active stage. Color still must be explicit
 * because highlight color is a brand decision, not a size decision.
 */
export function Highlight({
  children,
  variant,
  color,
  textColor,
  underlineHeight,
  strokeWidth,
}: HighlightProps) {
  const { tokens } = useStage();
  const bar = underlineHeight ?? tokens.space.sm;

  switch (variant) {
    case "underline":
      return (
        <span style={{ position: "relative", display: "inline-block" }}>
          {children}
          <span
            style={{
              position: "absolute",
              bottom: -tokens.space.xs,
              left: -tokens.space.xs,
              right: -tokens.space.xs,
              height: bar,
              background: color,
              borderRadius: bar / 2,
              zIndex: -1,
            }}
          />
        </span>
      );

    case "pill":
      return (
        <span
          style={{
            background: color,
            color: textColor ?? "#fff",
            padding: "0.08em 0.22em",
            borderRadius: "0.2em",
            display: "inline-block",
          }}
        >
          {children}
        </span>
      );

    case "color":
      return <span style={{ color }}>{children}</span>;

    case "italic":
      return <span style={{ fontStyle: "italic", color }}>{children}</span>;

    case "stroke":
      return (
        <span
          style={{
            color: textColor ?? "transparent",
            WebkitTextStroke: `${strokeWidth ?? Math.max(2, tokens.space.xs / 4)}px ${color}`,
          }}
        >
          {children}
        </span>
      );

    default:
      return <span>{children}</span>;
  }
}
