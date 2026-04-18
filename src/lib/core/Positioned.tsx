import type { CSSProperties, ReactNode } from "react";

interface PositionedProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotate?: number;
  /** Transform-origin anchor relative to the child. */
  origin?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  zIndex?: number;
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Absolute-positioning helper. Use inside a Slice's `decorations` slot or
 * anywhere a child needs to escape normal flow.
 */
export function Positioned({
  x = 0,
  y = 0,
  width,
  height,
  rotate,
  origin = "top-left",
  zIndex,
  children,
  style,
}: PositionedProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        transformOrigin: originToCss(origin),
        zIndex,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function originToCss(o: PositionedProps["origin"]): string {
  switch (o) {
    case "top-right": return "top right";
    case "bottom-left": return "bottom left";
    case "bottom-right": return "bottom right";
    case "center": return "center";
    case "top-left":
    default: return "top left";
  }
}
