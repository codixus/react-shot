import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "midnight" | "silver" | "gold" | (string & {});

interface AppleWatchFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { body: string; crown: string; shadow: string }> = {
  midnight: { body: "#1D1D1F", crown: "#2C2C2E", shadow: "#000" },
  silver: { body: "#E3E4E5", crown: "#C7C7CC", shadow: "#8E8E93" },
  gold: { body: "#E3CAA5", crown: "#D4B88C", shadow: "#8E7A5A" },
};

// Square-ish watch face with rounded corners
const BASE_W = 200;
const BASE_H = 244;

export const AppleWatchFrame = memo(function AppleWatchFrame({
  screenshot,
  width = 200,
  frameColor = "midnight",
  className,
  style,
}: AppleWatchFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.midnight;

  const frameRadius = px(52);
  const screenRadius = px(42);

  const bezel = 12;
  const scrLeft = px(bezel);
  const scrTop = px(bezel);
  const scrW = px(BASE_W - bezel * 2);
  const scrH = px(BASE_H - bezel * 2);

  // Crown button
  const crownW = px(8);
  const crownH = px(30);
  const crownTop = px(70);
  const crownRadius = px(4);

  // Side button
  const sideBtnW = px(6);
  const sideBtnH = px(20);
  const sideBtnTop = px(110);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div style={{ width: width + px(10), height: deviceHeight, position: "relative" }}>
        {/* Main watch body */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: deviceHeight,
          }}
        >
          {/* Body */}
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
              border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.12)`,
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
              width: px(BASE_W - bezel * 2 - 4),
              height: px(BASE_H - bezel * 2 - 4),
              borderRadius: px(40),
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

        {/* Digital Crown */}
        <div
          style={{
            position: "absolute",
            left: width,
            top: crownTop,
            width: crownW,
            height: crownH,
            background: colors.crown,
            borderRadius: `0 ${crownRadius}px ${crownRadius}px 0`,
            boxShadow: `inset 0 ${px(1)}px ${px(2)}px rgba(255,255,255,0.1), 0 0 ${px(2)}px rgba(0,0,0,0.3)`,
          }}
        />

        {/* Crown ridges */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width + px(2),
              top: crownTop + px(4 + i * 4),
              width: px(4),
              height: Math.max(1, px(1)),
              background: "rgba(0,0,0,0.2)",
              borderRadius: px(1),
            }}
          />
        ))}

        {/* Side button */}
        <div
          style={{
            position: "absolute",
            left: width,
            top: sideBtnTop,
            width: sideBtnW,
            height: sideBtnH,
            background: colors.crown,
            borderRadius: `0 ${px(3)}px ${px(3)}px 0`,
            boxShadow: `0 0 ${px(2)}px rgba(0,0,0,0.3)`,
          }}
        />
      </div>
    </div>
  );
});
