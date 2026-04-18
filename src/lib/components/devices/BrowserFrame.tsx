import { memo } from "react";
import { useDeviceScale } from "../../hooks/useDeviceScale";

type BrowserVariant = "chrome" | "safari" | "minimal";
type FrameColor = "light" | "dark" | (string & {});

interface BrowserFrameProps {
  screenshot: string;
  width?: number;
  variant?: BrowserVariant;
  url?: string;
  frameColor?: FrameColor;
  className?: string;
  style?: React.CSSProperties;
}

const FRAME_COLORS: Record<string, { toolbar: string; border: string; text: string; urlBg: string; urlText: string; dot1: string; dot2: string; dot3: string }> = {
  light: { toolbar: "#E8E6E3", border: "#D1D1D1", text: "#333", urlBg: "#FFFFFF", urlText: "#555", dot1: "#FF5F57", dot2: "#FEBC2E", dot3: "#28C840" },
  dark: { toolbar: "#2B2B2B", border: "#3A3A3A", text: "#CCC", urlBg: "#1A1A1A", urlText: "#999", dot1: "#FF5F57", dot2: "#FEBC2E", dot3: "#28C840" },
};

const BASE_W = 800;
const BASE_H = 540;

export const BrowserFrame = memo(function BrowserFrame({
  screenshot,
  width = 800,
  variant = "chrome",
  url,
  frameColor = "light",
  className,
  style,
}: BrowserFrameProps) {
  const { px, s } = useDeviceScale(BASE_W, width);
  const deviceHeight = Math.round(BASE_H * s);

  const colors = FRAME_COLORS[frameColor] ?? FRAME_COLORS.light;

  const toolbarH = variant === "minimal" ? px(32) : px(42);
  const borderRadius = px(10);
  const dotSize = px(10);
  const dotGap = px(7);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div
        style={{
          width,
          height: deviceHeight,
          position: "relative",
          borderRadius,
          overflow: "hidden",
          boxShadow: `0 ${px(4)}px ${px(20)}px rgba(0,0,0,0.15), 0 ${px(1)}px ${px(3)}px rgba(0,0,0,0.1)`,
        }}
      >
        {/* Toolbar background */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: toolbarH,
            background: colors.toolbar,
            borderBottom: `${Math.max(1, px(1))}px solid ${colors.border}`,
          }}
        />

        {/* Traffic light dots */}
        <div
          style={{
            position: "absolute",
            left: px(14),
            top: toolbarH / 2 - dotSize / 2,
            display: "flex",
            gap: dotGap,
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", background: colors.dot1 }} />
          <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", background: colors.dot2 }} />
          <div style={{ width: dotSize, height: dotSize, borderRadius: "50%", background: colors.dot3 }} />
        </div>

        {/* URL bar */}
        {variant !== "minimal" && (
          <div
            style={{
              position: "absolute",
              left: px(80),
              top: toolbarH / 2 - px(12),
              right: px(14),
              height: px(24),
              background: colors.urlBg,
              borderRadius: px(6),
              border: `${Math.max(1, px(1))}px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              paddingLeft: px(10),
              paddingRight: px(10),
              overflow: "hidden",
            }}
          >
            {/* Lock icon (simplified) */}
            <div
              style={{
                width: px(8),
                height: px(10),
                borderRadius: px(2),
                border: `${Math.max(1, px(1))}px solid ${colors.urlText}`,
                marginRight: px(6),
                flexShrink: 0,
              }}
            />
            {url && (
              <span
                style={{
                  fontSize: px(11),
                  color: colors.urlText,
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {url}
              </span>
            )}
          </div>
        )}

        {/* Tab bar for Chrome variant */}
        {variant === "chrome" && (
          <div
            style={{
              position: "absolute",
              left: px(80),
              top: px(2),
              width: px(160),
              height: px(10),
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            {/* Active tab indicator */}
            <div
              style={{
                width: px(120),
                height: px(8),
                background: colors.urlBg,
                borderRadius: `${px(4)}px ${px(4)}px 0 0`,
              }}
            />
          </div>
        )}

        {/* Content area */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: toolbarH,
            width,
            height: deviceHeight - toolbarH,
            overflow: "hidden",
            background: "#FFF",
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

        {/* Outer border */}
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            inset: 0,
            border: `${Math.max(1, px(1))}px solid ${colors.border}`,
            borderRadius,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
});
