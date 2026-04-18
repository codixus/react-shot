import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "titanium" | "black" | "white" | "silver" | (string & {});

interface IPadPro13Props {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const BASE_W = 571;
const BASE_H = 785;

const FRAME_COLORS: Record<string, string> = {
  titanium: "#E7E3BF",
  black: "#1D1D1F",
  white: "#F5F5F7",
  silver: "#E3E4E5",
};

export const IPadPro13 = memo(function IPadPro13({
  screenshot,
  width = 571,
  frameColor = "black",
  className,
  style,
}: IPadPro13Props) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const resolvedColor = FRAME_COLORS[frameColor] ?? frameColor;

  const frameRadius = px(28);
  const borderRadius = px(24);
  const screenRadius = px(20);

  const bezel = 7;
  const sfLeft = px(bezel);
  const sfTop = px(bezel);
  const sfW = px(BASE_W - bezel * 2);
  const sfH = px(BASE_H - bezel * 2);

  const scrInset = 4;
  const scrLeft = px(scrInset);
  const scrTop = px(scrInset);
  const scrW = px(BASE_W - bezel * 2 - scrInset * 2);
  const scrH = px(BASE_H - bezel * 2 - scrInset * 2);

  const camSize = px(8);
  const camTopPos = px(3);

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
            border: `${Math.max(1, px(1))}px solid rgba(255,255,255,0.08)`,
            borderRadius: frameRadius,
          }}
        />

        {/* Inner edge shadow */}
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
      </div>
    </div>
  );
});
