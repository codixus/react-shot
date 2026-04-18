import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "space-gray" | "starlight" | "purple" | (string & {});

interface IPadMiniFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, string> = {
  "space-gray": "#2C2C2E",
  starlight: "#F0E8D8",
  purple: "#C5B8D9",
};

// iPad Mini: slightly different aspect ratio, thicker bezels than Pro
const BASE_W = 440;
const BASE_H = 620;

export const IPadMiniFrame = memo(function IPadMiniFrame({
  screenshot,
  width = 440,
  frameColor = "space-gray",
  className,
  style,
}: IPadMiniFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const resolvedColor = FRAME_COLORS[frameColor] ?? frameColor;

  const frameRadius = px(32);
  const borderRadius = px(28);
  const screenRadius = px(22);

  const bezel = 14;
  const sfLeft = px(bezel);
  const sfTop = px(bezel);
  const sfW = px(BASE_W - bezel * 2);
  const sfH = px(BASE_H - bezel * 2);

  const scrInset = 4;
  const scrLeft = px(scrInset);
  const scrTop = px(scrInset);
  const scrW = px(BASE_W - bezel * 2 - scrInset * 2);
  const scrH = px(BASE_H - bezel * 2 - scrInset * 2);

  const camSize = px(6);
  const camTopPos = px(4);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div style={{ width, height: deviceHeight, position: "relative" }}>
        {/* FRAME */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: resolvedColor,
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
            border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.35)`,
            filter: `blur(${Math.max(1, px(1))}px)`,
            borderRadius: frameRadius,
          }}
        />

        {/* SCREEN FRAME */}
        <div
          style={{
            position: "absolute",
            left: sfLeft,
            top: sfTop,
            width: sfW,
            height: sfH,
            borderRadius,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              borderRadius,
            }}
          />

          {/* ACTUAL SCREEN */}
          <div
            style={{
              position: "absolute",
              left: scrLeft,
              top: scrTop,
              width: scrW,
              height: scrH,
              borderRadius: screenRadius,
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
        </div>

        {/* Front camera */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: camTopPos,
            width: camSize,
            height: camSize,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "#0a0a0a",
            boxShadow: `inset 0 0 ${px(2)}px rgba(255,255,255,0.05)`,
          }}
        />

        {/* Power button (top right) */}
        <div
          style={{
            position: "absolute",
            right: px(-4),
            top: px(50),
            width: px(4),
            height: px(36),
            background: resolvedColor,
            borderRadius: `0 ${px(2)}px ${px(2)}px 0`,
            boxShadow: `0 0 ${px(2)}px rgba(0,0,0,0.3)`,
          }}
        />

        {/* Volume up (right side) */}
        <div
          style={{
            position: "absolute",
            right: px(-4),
            top: px(120),
            width: px(4),
            height: px(30),
            background: resolvedColor,
            borderRadius: `0 ${px(2)}px ${px(2)}px 0`,
            boxShadow: `0 0 ${px(2)}px rgba(0,0,0,0.3)`,
          }}
        />

        {/* Volume down (right side) */}
        <div
          style={{
            position: "absolute",
            right: px(-4),
            top: px(158),
            width: px(4),
            height: px(30),
            background: resolvedColor,
            borderRadius: `0 ${px(2)}px ${px(2)}px 0`,
            boxShadow: `0 0 ${px(2)}px rgba(0,0,0,0.3)`,
          }}
        />
      </div>
    </div>
  );
});
