import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "silver" | "black" | (string & {});

interface DesktopFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { bezel: string; stand: string; chin: string; shadow: string }> = {
  silver: { bezel: "#E3E4E5", stand: "#C8C9CB", chin: "#D8D9DB", shadow: "#A0A1A3" },
  black: { bezel: "#1D1D1F", stand: "#0A0A0A", chin: "#2C2C2E", shadow: "#000" },
};

// Monitor + stand proportions
const BASE_W = 640;
const BASE_H = 480;

export const DesktopFrame = memo(function DesktopFrame({
  screenshot,
  width = 640,
  frameColor = "silver",
  className,
  style,
}: DesktopFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.silver;

  // Monitor panel
  const panelH = px(390);
  const panelRadius = px(12);
  const bezelSide = 10;
  const bezelTop = 10;
  const bezelBottom = 28; // chin with logo area
  const screenRadius = px(4);

  const scrLeft = px(bezelSide);
  const scrTop = px(bezelTop);
  const scrW = px(BASE_W - bezelSide * 2);
  const scrH = px(390 - bezelTop - bezelBottom);

  // Stand
  const standTop = panelH;
  const neckW = px(60);
  const neckH = px(40);
  const footW = px(180);
  const footH = px(12);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div style={{ width, height: deviceHeight, position: "relative" }}>
        {/* === MONITOR PANEL === */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: panelH,
            background: colors.bezel,
            borderRadius: panelRadius,
          }}
        />

        {/* Panel edge highlight */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: panelH,
            border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.12)`,
            borderRadius: panelRadius,
          }}
        />

        {/* Panel edge shadow */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: panelH,
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.3)`,
            filter: `blur(${Math.max(1, px(1))}px)`,
            borderRadius: panelRadius,
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
            height: px(390 - bezelTop - bezelBottom - 4),
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

        {/* Chin logo dot */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: scrTop + scrH + px(6),
            width: px(8),
            height: px(8),
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: colors.shadow,
            opacity: 0.4,
          }}
        />

        {/* Front camera */}
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
            boxShadow: `inset 0 0 ${px(1)}px rgba(255,255,255,0.08)`,
          }}
        />

        {/* === STAND NECK === */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: standTop,
            width: neckW,
            height: neckH,
            transform: "translateX(-50%)",
            background: `linear-gradient(180deg, ${colors.stand} 0%, ${colors.shadow} 100%)`,
          }}
        />

        {/* Stand neck highlight */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: standTop,
            width: neckW,
            height: neckH,
            transform: "translateX(-50%)",
            background: `linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.1) 100%)`,
          }}
        />

        {/* === STAND FOOT === */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: standTop + neckH,
            width: footW,
            height: footH,
            transform: "translateX(-50%)",
            background: colors.stand,
            borderRadius: `${px(2)}px ${px(2)}px ${px(6)}px ${px(6)}px`,
            boxShadow: `0 ${px(2)}px ${px(6)}px rgba(0,0,0,0.15)`,
          }}
        />

        {/* Foot edge */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: "50%",
            top: standTop + neckH,
            width: footW,
            height: footH,
            transform: "translateX(-50%)",
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.2)`,
            borderRadius: `${px(2)}px ${px(2)}px ${px(6)}px ${px(6)}px`,
          }}
        />
      </div>
    </div>
  );
});
