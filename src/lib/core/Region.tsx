import type { ReactNode } from "react";
import { useStage } from "./StageContext";
import type { RegionAnchor, Tokens } from "./types";

type SpaceKey = keyof Tokens["space"];

interface RegionProps {
  /**
   * `top` / `bottom`: hugs the edge, sized to content.
   * `middle` (default): fills remaining space, content centered.
   */
  anchor?: RegionAnchor;
  /**
   * Fraction of the slice height to bleed past the anchor edge (0..1). E.g.
   * `anchor="bottom" overflow={0.12}` lets a device extend 12% below the
   * slice's safe area. Negative margin on the region leaves the opposite
   * region free to absorb the space.
   */
  overflow?: number;
  /** Horizontal alignment of children (overrides Slice.align for this region). */
  align?: "left" | "center" | "right";
  /** Gap between children. Default: tokens.space.md. */
  gap?: number;
  /** Reserve at least this much space (design px, or a 0-1 fraction of slice height). */
  minHeight?: number;
  /**
   * Reserved space at the region's bottom edge. Keeps stat rows / badges from
   * kissing an overflowing Device in the next region. Pass a token key
   * (`"xs|sm|md|lg|xl|xxl"`) or a raw px value. Defaults to `"lg"` when
   * `overflow` is 0 *and* this is the middle region (i.e., the common case
   * where a device Region sits below). Explicit value always wins.
   */
  padBottom?: SpaceKey | number;
  children: ReactNode;
  style?: React.CSSProperties;
}

export function Region({
  anchor = "middle",
  overflow = 0,
  align,
  gap,
  minHeight,
  padBottom,
  children,
  style,
}: RegionProps) {
  const { tokens, sliceHeight } = useStage();
  const resolvedGap = gap ?? tokens.space.md;
  const resolvedMinHeight =
    minHeight === undefined
      ? undefined
      : minHeight <= 1
        ? minHeight * sliceHeight
        : minHeight;

  const isFill = anchor === "middle";
  // Default to center so fixed-width items (Device, narrow Cards) sit in the
  // middle of the slice instead of pinning to the left edge. Opt out per
  // region with `align="left"` / `align="right"`.
  const alignItems =
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  const overflowPx = overflow > 0 && anchor !== "middle" ? overflow * sliceHeight * 0.5 : 0;
  const overflowMargin =
    overflowPx > 0
      ? anchor === "top"
        ? { marginTop: -overflowPx }
        : { marginBottom: -overflowPx }
      : undefined;

  // Auto-breathing-room: middle regions get a tokens.space.lg bottom pad by
  // default so their last child (often a Row of badges) doesn't kiss the
  // device region below. Any explicit `padBottom` (including 0) overrides.
  const resolvedPadBottom =
    padBottom === undefined
      ? isFill
        ? tokens.space.lg
        : undefined
      : typeof padBottom === "number"
        ? padBottom
        : tokens.space[padBottom];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems,
        gap: resolvedGap,
        flex: isFill ? 1 : "0 0 auto",
        justifyContent: isFill ? "center" : anchor === "top" ? "flex-start" : "flex-end",
        minHeight: resolvedMinHeight,
        paddingBottom: resolvedPadBottom,
        ...overflowMargin,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
