import type { CSSProperties, ReactNode } from "react";
import { useStage } from "./StageContext";

interface LayoutProps {
  children: ReactNode;
  gap?: number | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  style?: CSSProperties;
}

function resolveGap(gap: LayoutProps["gap"], tokens: ReturnType<typeof useStage>["tokens"]): number {
  if (typeof gap === "number") return gap;
  if (gap === undefined) return tokens.space.md;
  return tokens.space[gap];
}

const align2css: Record<NonNullable<LayoutProps["align"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

const justify2css: Record<NonNullable<LayoutProps["justify"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

// Text-align needs to follow the cross-axis alignment so children like <Title>
// don't inherit a stale center from <Slice>. Only applied to Stack — Row's
// cross axis is vertical, so text alignment inherits.
const align2text: Record<NonNullable<LayoutProps["align"]>, React.CSSProperties["textAlign"]> = {
  start: "left",
  center: "center",
  end: "right",
  stretch: undefined,
};

/** Vertical flex container. Children stack top-to-bottom. */
export function Stack({ children, gap, align = "center", justify = "start", wrap, style }: LayoutProps) {
  const { tokens } = useStage();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align2css[align],
        justifyContent: justify2css[justify],
        gap: resolveGap(gap, tokens),
        flexWrap: wrap ? "wrap" : undefined,
        textAlign: align2text[align],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Horizontal flex container. Children sit left-to-right. `justify` maps to
 * flex justification *and* the resulting text-align, because a Row that pulls
 * its items to the left should also left-align the text inside them.
 */
export function Row({ children, gap, align = "center", justify = "start", wrap, style }: LayoutProps) {
  const { tokens } = useStage();
  const textAlign: React.CSSProperties["textAlign"] =
    justify === "start" ? "left" :
    justify === "end" ? "right" :
    justify === "center" ? "center" : undefined;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: align2css[align],
        justifyContent: justify2css[justify],
        gap: resolveGap(gap, tokens),
        flexWrap: wrap ? "wrap" : undefined,
        textAlign,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
