import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "black" | "cream" | "lavender" | (string & {});

interface GalaxyFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { body: string; edge: string; shadow: string }> = {
  black: { body: "#1D1D1F", edge: "#2C2C2E", shadow: "#000" },
  cream: { body: "#F4E8D1", edge: "#E8DCC5", shadow: "#C7BBA5" },
  lavender: { body: "#D5C8E4", edge: "#C9BCD8", shadow: "#A99BC0" },
};

const BASE_W = 360;
const BASE_H = 780;

export const GalaxyFrame = memo(function GalaxyFrame({
  screenshot,
  width = 360,
  frameColor = "black",
  className,
  style,
}: GalaxyFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.black;

  const frameRadius = px(38);
  const screenRadius = px(30);

  const bezelSide = 6;
  const bezelTop = 8;
  const bezelBottom = 8;

  const scrLeft = px(bezelSide);
  const scrTop = px(bezelTop);
  const scrW = px(BASE_W - bezelSide * 2);
  const scrH = px(BASE_H - bezelTop - bezelBottom);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div style={{ width, height: deviceHeight, position: "relative" }}>
        {/* Frame body */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.body,
            borderRadius: frameRadius,
          }}
        />

        {/* Curved edge effect (left) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: px(40),
            width: px(3),
            height: px(BASE_H - 80),
            background: `linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)`,
            borderRadius: px(2),
          }}
        />

        {/* Curved edge effect (right) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: px(40),
            width: px(3),
            height: px(BASE_H - 80),
            background: `linear-gradient(270deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)`,
            borderRadius: px(2),
          }}
        />

        {/* Edge highlight */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            inset: 0,
            border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.1)`,
            borderRadius: frameRadius,
          }}
        />

        {/* Edge shadow */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            inset: 0,
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.35)`,
            filter: `blur(${Math.max(1, px(1))}px)`,
            borderRadius: frameRadius,
          }}
        />

        {/* Screen bezel */}
        <div
          style={{
            position: "absolute",
            left: scrLeft,
            top: scrTop,
            width: scrW,
            height: scrH,
            background: "#000",
            borderRadius: screenRadius,
          }}
        />

        {/* Actual screen */}
        <div
          style={{
            position: "absolute",
            left: scrLeft + px(2),
            top: scrTop + px(2),
            width: px(BASE_W - bezelSide * 2 - 4),
            height: px(BASE_H - bezelTop - bezelBottom - 4),
            borderRadius: px(28),
            overflow: "hidden",
            background: "#000",
          }}
        >
          <img
            src={screenshot}
            alt=""
            loading="eager"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
            }}
          />
        </div>

        {/* Front camera (center punch-hole) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: scrTop + px(7),
            width: px(8),
            height: px(8),
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "#0a0a0a",
            boxShadow: `inset 0 0 ${px(2)}px rgba(255,255,255,0.05)`,
            zIndex: 2,
          }}
        />

        {/* Power button (right) */}
        <div
          style={{
            position: "absolute",
            right: px(-4),
            top: px(190),
            width: px(4),
            height: px(55),
            background: colors.edge,
            borderRadius: `0 ${px(2)}px ${px(2)}px 0`,
          }}
        />

        {/* Volume up (left) */}
        <div
          style={{
            position: "absolute",
            left: px(-4),
            top: px(170),
            width: px(4),
            height: px(45),
            background: colors.edge,
            borderRadius: `${px(2)}px 0 0 ${px(2)}px`,
          }}
        />

        {/* Volume down (left) */}
        <div
          style={{
            position: "absolute",
            left: px(-4),
            top: px(225),
            width: px(4),
            height: px(45),
            background: colors.edge,
            borderRadius: `${px(2)}px 0 0 ${px(2)}px`,
          }}
        />
      </div>
    </div>
  );
});
