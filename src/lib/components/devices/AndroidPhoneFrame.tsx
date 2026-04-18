import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "black" | "white" | (string & {});

interface AndroidPhoneFrameProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { body: string; chin: string; shadow: string }> = {
  black: { body: "#1D1D1F", chin: "#141415", shadow: "#000" },
  white: { body: "#F5F5F7", chin: "#E8E8EA", shadow: "#C7C7CC" },
};

const BASE_W = 360;
const BASE_H = 760;

export const AndroidPhoneFrame = memo(function AndroidPhoneFrame({
  screenshot,
  width = 360,
  frameColor = "black",
  className,
  style,
}: AndroidPhoneFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.black;

  const frameRadius = px(36);
  const screenRadius = px(28);

  const bezelSide = 8;
  const bezelTop = 10;
  const bezelBottom = 16; // chin

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
            border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.08)`,
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
            borderRadius: px(26),
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

        {/* Front camera (punch-hole) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: scrTop + px(6),
            width: px(8),
            height: px(8),
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "#0a0a0a",
            boxShadow: `inset 0 0 ${px(2)}px rgba(255,255,255,0.05)`,
            zIndex: 2,
          }}
        />

        {/* Bottom chin area */}
        <div
          style={{
            position: "absolute",
            left: scrLeft,
            bottom: px(4),
            width: scrW,
            height: px(bezelBottom - 6),
            background: colors.chin,
            borderRadius: `0 0 ${px(24)}px ${px(24)}px`,
            opacity: 0.3,
          }}
        />
      </div>
    </div>
  );
});
