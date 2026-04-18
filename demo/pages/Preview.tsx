import { Suspense, useState, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Viewport, useChromeTheme } from "react-shot";
import type { DeviceVariant } from "react-shot";
import { getComposition } from "../compositions";

export function Preview() {
  const { compositionId } = useParams<{ compositionId: string }>();
  const [searchParams] = useSearchParams();
  const deviceParam = searchParams.get("device") || "iphone";
  const locale = searchParams.get("locale") || "en";
  const entry = compositionId ? getComposition(compositionId) : undefined;
  const [showGuides, setShowGuides] = useState(false);
  const [, , c] = useChromeTheme();

  const handleToggleGuides = useCallback(() => setShowGuides((v) => !v), []);

  if (!entry) {
    return (
      <div style={{ minHeight: "100vh", background: c.bg, color: c.text, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Composition not found</h1>
          <Link to="/" style={{ display: "inline-block", marginTop: 12, color: c.accent, textDecoration: "none", fontSize: 14 }}>← Back to gallery</Link>
        </div>
      </div>
    );
  }

  const isIpad = deviceParam === "ipad" || deviceParam === "ipad-pro-13";
  const device: DeviceVariant = isIpad ? "ipad-pro-13" : entry.device ?? "iphone-16-pro";
  const preset = isIpad && entry.ipadPreset ? entry.ipadPreset : entry.preset;
  const slices = entry.slices ?? 5;
  const totalWidth = preset.width * slices;
  const totalHeight = preset.height;

  const Component = entry.component;

  return (
    <Viewport
      canvasWidth={totalWidth}
      canvasHeight={totalHeight}
      compositionName={`${entry.name} [${deviceParam}/${locale}]`}
      compositionId={entry.id}
      showSliceGuides={showGuides}
      onToggleSliceGuides={handleToggleGuides}
    >
      <Suspense
        fallback={
          <div style={{ width: totalWidth, height: totalHeight, display: "flex", alignItems: "center", justifyContent: "center", background: c.bgSoft, color: c.dim, fontSize: 24 }}>
            Loading…
          </div>
        }
      >
        <Component showSliceGuides={showGuides} locale={locale} device={device} />
      </Suspense>
    </Viewport>
  );
}
