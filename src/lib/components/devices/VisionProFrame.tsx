import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "silver" | (string & {});

interface VisionProFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { body: string; glass: string; cushion: string; accent: string }> = {
  silver: { body: "#E3E4E5", glass: "#D1D1D6", cushion: "#8E8E93", accent: "#C7C7CC" },
};

// Wide goggle-like front view
const BASE_W = 600;
const BASE_H = 260;

export const VisionProFrame = memo(function VisionProFrame({
  screenshot,
  width = 600,
  frameColor = "silver",
  className,
  style,
}: VisionProFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.silver;

  // Main visor dimensions
  const visorH = px(180);
  const visorTop = px(20);
  const visorRadius = px(90); // very rounded - goggle shape

  // Glass/visor area
  const glassInset = 12;
  const glassTop = px(glassInset);
  const glassSide = px(glassInset);
  const glassW = px(BASE_W - glassInset * 2);
  const glassH = px(180 - glassInset * 2);
  const glassRadius = px(78);

  // Screen area within glass
  const screenInset = 6;

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div style={{ width, height: deviceHeight, position: "relative" }}>
        {/* === OUTER SHELL === */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: visorTop,
            width,
            height: visorH,
            background: colors.body,
            borderRadius: visorRadius,
          }}
        />

        {/* Shell highlight */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            top: visorTop,
            width,
            height: visorH,
            border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.3)`,
            borderRadius: visorRadius,
          }}
        />

        {/* Shell shadow */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            top: visorTop,
            width,
            height: visorH,
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.15)`,
            filter: `blur(${Math.max(1, px(1))}px)`,
            borderRadius: visorRadius,
          }}
        />

        {/* Top band/strap attachment (left) */}
        <div
          style={{
            position: "absolute",
            left: px(10),
            top: visorTop + px(60),
            width: px(20),
            height: px(60),
            background: colors.cushion,
            borderRadius: `${px(10)}px 0 0 ${px(10)}px`,
          }}
        />

        {/* Top band/strap attachment (right) */}
        <div
          style={{
            position: "absolute",
            right: px(10),
            top: visorTop + px(60),
            width: px(20),
            height: px(60),
            background: colors.cushion,
            borderRadius: `0 ${px(10)}px ${px(10)}px 0`,
          }}
        />

        {/* === GLASS VISOR === */}
        <div
          style={{
            position: "absolute",
            left: glassSide,
            top: visorTop + glassTop,
            width: glassW,
            height: glassH,
            background: `linear-gradient(180deg, rgba(50,50,55,0.9) 0%, rgba(20,20,22,0.95) 100%)`,
            borderRadius: glassRadius,
            overflow: "hidden",
          }}
        >
          {/* Glass reflection */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.05) 100%)`,
              borderRadius: glassRadius,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Screen content area */}
          <div
            style={{
              position: "absolute",
              left: px(screenInset),
              top: px(screenInset),
              width: px(BASE_W - glassInset * 2 - screenInset * 2),
              height: px(180 - glassInset * 2 - screenInset * 2),
              borderRadius: px(72),
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
                opacity: 0.85,
              }}
            />
          </div>
        </div>

        {/* === DIGITAL CROWN (top right) === */}
        <div
          style={{
            position: "absolute",
            right: px(50),
            top: visorTop - px(4),
            width: px(16),
            height: px(16),
            background: colors.accent,
            borderRadius: "50%",
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.2)`,
            boxShadow: `0 ${px(1)}px ${px(2)}px rgba(0,0,0,0.15)`,
          }}
        />

        {/* === LIGHT SEAL / CUSHION (bottom) === */}
        <div
          style={{
            position: "absolute",
            left: px(80),
            top: visorTop + visorH - px(6),
            width: px(BASE_W - 160),
            height: px(40),
            background: `linear-gradient(180deg, ${colors.cushion} 0%, ${colors.body} 100%)`,
            borderRadius: `0 0 ${px(40)}px ${px(40)}px`,
            opacity: 0.6,
          }}
        />

        {/* Nose bridge gap */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            width: px(60),
            height: px(20),
            transform: "translateX(-50%)",
            background: "transparent",
            borderRadius: `0 0 ${px(30)}px ${px(30)}px`,
          }}
        />
      </div>
    </div>
  );
});
