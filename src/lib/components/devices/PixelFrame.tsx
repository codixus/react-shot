import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "obsidian" | "snow" | "hazel" | (string & {});

interface PixelFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { body: string; bar: string; shadow: string }> = {
  obsidian: { body: "#1D1D1F", bar: "#2C2C2E", shadow: "#000" },
  snow: { body: "#F5F5F7", bar: "#E8E8EA", shadow: "#C7C7CC" },
  hazel: { body: "#B5C4A1", bar: "#A3B38F", shadow: "#7A8A68" },
};

const BASE_W = 360;
const BASE_H = 780;

export const PixelFrame = memo(function PixelFrame({
  screenshot,
  width = 360,
  frameColor = "obsidian",
  className,
  style,
}: PixelFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.obsidian;

  const frameRadius = px(40);
  const screenRadius = px(32);

  const bezelSide = 8;
  const bezelTop = 10;
  const bezelBottom = 10;

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
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.4)`,
            filter: `blur(${Math.max(1, px(1))}px)`,
            borderRadius: frameRadius,
          }}
        />

        {/* Pixel camera bar (decorative, visible at top back - shown as subtle stripe) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: px(80),
            width,
            height: px(3),
            background: colors.bar,
            opacity: 0.3,
          }}
        />

        {/* Screen bezel (black) */}
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
            borderRadius: px(30),
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

        {/* Punch-hole camera (offset to left) */}
        <div
          style={{
            position: "absolute",
            left: px(BASE_W / 2 - 4),
            top: scrTop + px(6),
            width: px(8),
            height: px(8),
            borderRadius: "50%",
            background: "#0a0a0a",
            boxShadow: `inset 0 0 ${px(2)}px rgba(255,255,255,0.05)`,
            zIndex: 2,
          }}
        />

        {/* Power button (right side) */}
        <div
          style={{
            position: "absolute",
            right: px(-4),
            top: px(160),
            width: px(4),
            height: px(50),
            background: colors.bar,
            borderRadius: `0 ${px(2)}px ${px(2)}px 0`,
          }}
        />

        {/* Volume buttons (left side) */}
        <div
          style={{
            position: "absolute",
            left: px(-4),
            top: px(150),
            width: px(4),
            height: px(40),
            background: colors.bar,
            borderRadius: `${px(2)}px 0 0 ${px(2)}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: px(-4),
            top: px(200),
            width: px(4),
            height: px(40),
            background: colors.bar,
            borderRadius: `${px(2)}px 0 0 ${px(2)}px`,
          }}
        />
      </div>
    </div>
  );
});
