import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "black" | "silver" | (string & {});

interface TVFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { bezel: string; stand: string; shadow: string }> = {
  black: { bezel: "#1D1D1F", stand: "#0A0A0A", shadow: "#000" },
  silver: { bezel: "#E3E4E5", stand: "#C8C9CB", shadow: "#8E8E93" },
};

// Wide 16:9 TV + stand
const BASE_W = 800;
const BASE_H = 500;

export const TVFrame = memo(function TVFrame({
  screenshot,
  width = 800,
  frameColor = "black",
  className,
  style,
}: TVFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.black;

  // Panel
  const panelH = px(440);
  const panelRadius = px(6);
  const bezelSide = 6;
  const bezelTop = 6;
  const bezelBottom = 14;
  const screenRadius = px(2);

  const scrLeft = px(bezelSide);
  const scrTop = px(bezelTop);
  const scrW = px(BASE_W - bezelSide * 2);
  const scrH = px(440 - bezelTop - bezelBottom);

  // Stand
  const standTop = panelH;
  const neckW = px(40);
  const neckH = px(24);
  const footW = px(200);
  const footH = px(8);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div style={{ width, height: deviceHeight, position: "relative" }}>
        {/* === TV PANEL === */}
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
            border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.08)`,
            borderRadius: panelRadius,
          }}
        />

        {/* Panel shadow */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: panelH,
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.4)`,
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
            left: scrLeft + px(1),
            top: scrTop + px(1),
            width: px(BASE_W - bezelSide * 2 - 2),
            height: px(440 - bezelTop - bezelBottom - 2),
            borderRadius: Math.max(1, px(1)),
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

        {/* Bottom bezel logo/indicator */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: scrTop + scrH + px(4),
            width: px(6),
            height: px(3),
            transform: "translateX(-50%)",
            background: colors.shadow,
            borderRadius: px(2),
            opacity: 0.4,
          }}
        />

        {/* === CENTER STAND NECK === */}
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

        {/* Neck side highlights */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: standTop,
            width: neckW,
            height: neckH,
            transform: "translateX(-50%)",
            background: `linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.08) 100%)`,
          }}
        />

        {/* === CENTER STAND FOOT === */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: standTop + neckH,
            width: footW,
            height: footH,
            transform: "translateX(-50%)",
            background: colors.stand,
            borderRadius: `${px(2)}px ${px(2)}px ${px(4)}px ${px(4)}px`,
            boxShadow: `0 ${px(2)}px ${px(8)}px rgba(0,0,0,0.2)`,
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
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.25)`,
            borderRadius: `${px(2)}px ${px(2)}px ${px(4)}px ${px(4)}px`,
          }}
        />
      </div>
    </div>
  );
});
