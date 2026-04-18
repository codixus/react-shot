import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "silver" | "space-gray" | (string & {});

interface MacBookFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { bezel: string; body: string; keyboard: string; accent: string }> = {
  silver: { bezel: "#E3E4E5", body: "#C8C9CB", keyboard: "#BBBCBE", accent: "#A0A1A3" },
  "space-gray": { bezel: "#2E2E30", body: "#1D1D1F", keyboard: "#161617", accent: "#0A0A0A" },
};

// 16:10 screen + bezel + keyboard area
const BASE_W = 640;
const BASE_H = 440;

export const MacBookFrame = memo(function MacBookFrame({
  screenshot,
  width = 640,
  frameColor = "silver",
  className,
  style,
}: MacBookFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.silver;

  // Lid / screen section
  const lidH = px(370);
  const bezelTop = px(12);
  const bezelSide = px(14);
  const bezelBottom = px(14);
  const notchW = px(68);
  const notchH = px(12);
  const screenW = px(BASE_W - 28);
  const screenH = px(370 - 26);
  const lidRadius = px(12);
  const screenRadius = px(4);

  // Base / keyboard section
  const baseTop = lidH;
  const baseH = px(70);
  const baseRadius = px(8);

  // Hinge
  const hingeH = px(4);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div style={{ width, height: deviceHeight, position: "relative" }}>
        {/* === LID === */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: lidH,
            background: colors.bezel,
            borderRadius: `${lidRadius}px ${lidRadius}px 0 0`,
          }}
        />

        {/* Lid edge highlight */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: lidH,
            border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.15)`,
            borderRadius: `${lidRadius}px ${lidRadius}px 0 0`,
          }}
        />

        {/* Lid shadow */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: lidH,
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.3)`,
            filter: `blur(${Math.max(1, px(1))}px)`,
            borderRadius: `${lidRadius}px ${lidRadius}px 0 0`,
          }}
        />

        {/* Notch */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: notchW,
            height: notchH,
            transform: "translateX(-50%)",
            background: colors.bezel,
            borderRadius: `0 0 ${px(6)}px ${px(6)}px`,
            zIndex: 2,
          }}
        />

        {/* Camera dot in notch */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: px(3),
            width: px(5),
            height: px(5),
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "#0a0a0a",
            boxShadow: `inset 0 0 ${px(1)}px rgba(255,255,255,0.1)`,
            zIndex: 3,
          }}
        />

        {/* Screen bezel (black) */}
        <div
          style={{
            position: "absolute",
            left: bezelSide,
            top: bezelTop,
            width: screenW,
            height: screenH,
            background: "#000",
            borderRadius: screenRadius,
          }}
        />

        {/* Actual screen */}
        <div
          style={{
            position: "absolute",
            left: bezelSide + px(2),
            top: bezelTop + px(2),
            width: px(BASE_W - 32),
            height: px(370 - 30),
            borderRadius: Math.max(2, px(2)),
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

        {/* === HINGE === */}
        <div
          style={{
            position: "absolute",
            left: px(4),
            top: lidH,
            width: px(BASE_W - 8),
            height: hingeH,
            background: `linear-gradient(180deg, ${colors.accent} 0%, ${colors.body} 100%)`,
          }}
        />

        {/* === BASE / KEYBOARD === */}
        <div
          style={{
            position: "absolute",
            left: px(20),
            top: baseTop + hingeH,
            width: px(BASE_W - 40),
            height: baseH - hingeH,
            background: colors.body,
            borderRadius: `0 0 ${baseRadius}px ${baseRadius}px`,
          }}
        />

        {/* Base edge */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: px(20),
            top: baseTop + hingeH,
            width: px(BASE_W - 40),
            height: baseH - hingeH,
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.2)`,
            borderTop: "none",
            borderRadius: `0 0 ${baseRadius}px ${baseRadius}px`,
          }}
        />

        {/* Trackpad */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: baseTop + hingeH + px(10),
            width: px(180),
            height: px(44),
            transform: "translateX(-50%)",
            background: colors.keyboard,
            borderRadius: px(4),
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.12)`,
          }}
        />

        {/* Bottom lip */}
        <div
          style={{
            position: "absolute",
            left: px(16),
            bottom: 0,
            width: px(BASE_W - 32),
            height: px(3),
            background: colors.accent,
            borderRadius: `0 0 ${px(2)}px ${px(2)}px`,
          }}
        />
      </div>
    </div>
  );
});
