import type { ReactNode } from "react";
import { useStage, SliceContext } from "./StageContext";

interface SliceProps {
  index: number;
  /** Background layer (SolidBg, Gradient, Image) — absolute, behind content. */
  bg?: ReactNode;
  /** Decorations (shapes, blobs, particles) — absolute, behind content. */
  decorations?: ReactNode;
  /** Text alignment inside content regions. */
  align?: "left" | "center" | "right";
  /** Disable safe-area padding (bleed to edges). Default: false. */
  bleed?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A Slice is one screenshot. Content flows top-to-bottom via flex column.
 * Children are typically <Region> blocks — one for text, one for a device —
 * but any element is allowed (it flows naturally).
 *
 * Safe-area padding comes from the preset; individual regions can push past
 * it via overflow props if needed.
 */
export function Slice({
  index,
  bg,
  decorations,
  align = "center",
  bleed = false,
  children,
  className,
  style,
}: SliceProps) {
  const { sliceWidth, sliceHeight, safeArea } = useStage();
  const padding = bleed
    ? "0"
    : `${safeArea.top}px ${safeArea.sides}px ${safeArea.bottom}px ${safeArea.sides}px`;

  const textAlign: React.CSSProperties["textAlign"] =
    align === "center" ? "center" : align;
  const alignItems =
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  return (
    <SliceContext.Provider value={{ index, safeArea }}>
      <div
        className={className}
        style={{
          position: "absolute",
          left: index * sliceWidth,
          top: 0,
          width: sliceWidth,
          height: sliceHeight,
          overflow: "hidden",
          ...style,
        }}
      >
        {bg}
        {decorations}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            padding,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems,
            textAlign,
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </SliceContext.Provider>
  );
}
