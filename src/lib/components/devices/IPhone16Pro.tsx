import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type FrameColor = "titanium" | "black" | "white" | "silver" | (string & {});

interface IPhone16ProProps {
  screenshot: string;
  width?: number;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { frame: string; button: string; shadow: string; cutout: [string, string] }> = {
  titanium: { frame: "#E7E3BF", button: "#F0ECE3", shadow: "#524B40", cutout: ["#817E73", "#C3BEAC"] },
  black: { frame: "#1D1D1F", button: "#2C2C2E", shadow: "#000", cutout: ["#2C2C2E", "#3A3A3C"] },
  white: { frame: "#F5F5F7", button: "#E8E8EA", shadow: "#C7C7CC", cutout: ["#D1D1D6", "#E5E5EA"] },
  silver: { frame: "#E3E4E5", button: "#D1D1D6", shadow: "#8E8E93", cutout: ["#AEAEB2", "#C7C7CC"] },
};

const BASE_W = 377;
const BASE_H = 785;

function SideButton({
  w,
  h,
  posLeft,
  posTop,
  isRight,
  px,
  s,
  buttonColor = "#F0ECE3",
}: {
  w: number;
  h: number;
  posLeft: number;
  posTop: number;
  isRight: boolean;
  px: (v: number) => number;
  s: number;
  buttonColor?: string;
}) {
  const bw = px(w);
  const bh = px(h);
  const bl = px(posLeft);
  const bt = px(posTop);

  const r = `${px(2)}px`;
  const br = isRight ? `0px ${r} ${r} 0px` : `${r} 0px 0px ${r}`;
  const frameShadowDir = isRight ? "270deg" : "90deg";

  return (
    <div
      style={{
        position: "absolute",
        left: bl,
        top: bt,
        width: bw,
        height: bh,
        borderRadius: br,
      }}
    >
      {/* base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: buttonColor,
          borderRadius: br,
        }}
      />
      {/* top shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #000 0%, rgba(0,0,0,0) 8%)",
          opacity: 0.76,
          borderRadius: br,
        }}
      />
      {/* frame-shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${frameShadowDir}, #000 0%, rgba(174,174,174,0) 70%)`,
          borderRadius: br,
        }}
      />
      {/* bottom shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 92%, #000 100%)",
          opacity: 0.48,
          borderRadius: br,
        }}
      />
      {/* highlight line */}
      <div
        style={{
          position: "absolute",
          [isRight ? "right" : "left"]: px(1),
          top: px(2),
          width: Math.max(1, px(1)),
          height: Math.round(h * 0.2 * s),
          background: "#FFF",
          filter: "blur(0.5px)",
          borderRadius: "1px 1px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          [isRight ? "right" : "left"]: px(1),
          top: px(3),
          width: Math.max(1, px(1)),
          height: Math.round(h * 0.85 * s),
          background: "rgba(255,255,255,0.8)",
          filter: "blur(0.5px)",
          borderRadius: "0 0 1px 1px",
        }}
      />
      {/* side-shadow */}
      <div
        style={{
          position: "absolute",
          [isRight ? "left" : "right"]: 0,
          top: 0,
          width: Math.max(1, px(1)),
          height: bh + px(2),
          background: "#61605D",
          filter: "blur(1px)",
          borderRadius: "0 0 1px 1px",
        }}
      />
    </div>
  );
}

function SignalCutout({
  w,
  h,
  l,
  t,
  gradDir,
  px,
  cutoutColors = ["#817E73", "#C3BEAC"],
}: {
  w: number;
  h: number;
  l: number;
  t: number;
  gradDir: string;
  px: (v: number) => number;
  cutoutColors?: [string, string];
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: px(w),
        height: px(h),
        left: px(l),
        top: px(t),
        background: `linear-gradient(${gradDir}, ${cutoutColors[0]} 0%, ${cutoutColors[1]} 100%)`,
      }}
    />
  );
}

export const IPhone16Pro = memo(function IPhone16Pro({
  screenshot,
  width = 377,
  frameColor = "titanium",
  className,
  style,
}: IPhone16ProProps) {
  const { px, fpx, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  // Resolve frame colors
  const colors = FRAME_COLORS[frameColor] ?? {
    frame: frameColor, button: frameColor, shadow: "#333",
    cutout: [frameColor, frameColor],
  };

  const frameRadius = px(62);
  const borderRadius = px(58);
  const screenRadius = px(52);

  // Screen-frame
  const sfLeft = px(4);
  const sfTop = px(4);
  const sfW = px(369);
  const sfH = px(777);

  // Actual screen
  const scrLeft = px(8);
  const scrTop = px(9);
  const scrW = px(353);
  const scrH = px(761);


  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {/* Device container (includes buttons overflow) */}
      <div
        style={{
          width: width + px(6),
          height: deviceHeight,
          position: "relative",
        }}
      >
        {/* Main device body offset for button space */}
        <div
          style={{
            position: "absolute",
            left: px(3),
            top: 0,
            width,
            height: deviceHeight,
          }}
        >
          {/* FRAME - Base color */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: colors.frame,
              borderRadius: frameRadius,
            }}
          />

          {/* Shadow outer (gray) */}
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              inset: 0,
              border: `${px(3)}px solid #C3C3C3`,
              filter: `blur(${px(2)}px)`,
              borderRadius: frameRadius,
            }}
          />

          {/* Shadow outer (dark thin) */}
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              inset: 0,
              border: `${Math.max(1, px(1))}px solid ${colors.shadow}`,
              filter: `blur(${Math.max(1, px(1))}px)`,
              borderRadius: frameRadius,
            }}
          />

          {/* Shadow inner (white glow) */}
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              left: px(5),
              top: px(5),
              width: px(368),
              height: px(776),
              border: `${Math.max(1, px(1))}px solid #FFFFFF`,
              filter: `blur(${Math.max(1, px(1))}px)`,
              borderRadius,
            }}
          />

          {/* Highlight inner */}
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              left: px(4),
              top: px(4),
              width: px(369),
              height: px(777),
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius,
            }}
          />

          {/* SIGNAL CUTOUTS */}
          <SignalCutout w={6} h={4} l={293} t={0} gradDir="180deg" px={px} cutoutColors={colors.cutout as [string, string]} />
          <SignalCutout w={6} h={4} l={0} t={81} gradDir="90deg" px={px} cutoutColors={colors.cutout as [string, string]} />
          <SignalCutout w={4} h={6} l={0} t={698} gradDir="90deg" px={px} cutoutColors={colors.cutout as [string, string]} />
          <SignalCutout w={5} h={4} l={63} t={781} gradDir="0deg" px={px} cutoutColors={colors.cutout as [string, string]} />
          <SignalCutout w={4} h={6} l={373} t={698} gradDir="270deg" px={px} cutoutColors={colors.cutout as [string, string]} />

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
            {/* Screen border (BLACK bezel) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#000100",
                borderRadius,
              }}
            />

            {/* Screen border blur */}
            <div
              style={{
                boxSizing: "border-box",
                position: "absolute",
                inset: 0,
                border: `${Math.max(1, px(1))}px solid rgba(0,0,0,0.3)`,
                filter: `blur(${fpx(3.5)}px)`,
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

        </div>

        {/* SIDE BUTTONS */}
        {/* Power button (right) */}
        <SideButton
          w={5}
          h={96}
          posLeft={378 + 3}
          posTop={149 + 103}
          isRight={true}
          px={px}
          s={s}
          buttonColor={colors.button}
        />

        {/* Silent switch (left) */}
        <SideButton
          w={5}
          h={31}
          posLeft={0}
          posTop={149}
          isRight={false}
          px={px}
          s={s}
          buttonColor={colors.button}
        />

        {/* Volume up (left) */}
        <SideButton
          w={5}
          h={56}
          posLeft={0}
          posTop={149 + 60}
          isRight={false}
          px={px}
          s={s}
          buttonColor={colors.button}
        />

        {/* Volume down (left) */}
        <SideButton
          w={5}
          h={56}
          posLeft={0}
          posTop={149 + 133}
          isRight={false}
          px={px}
          s={s}
          buttonColor={colors.button}
        />
      </div>
    </div>
  );
});
