import { Suspense } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getComposition } from "@compositions/index";
import type { DeviceVariant } from "../../lib/core/types";

/**
 * Headless render page used by Puppeteer during export and by the editor's
 * "Export" button. Resolves the composition's preset + slice count, then
 * renders the composition at its full canvas size (preset.width × slices).
 */
export function Render() {
  const { compositionId } = useParams<{ compositionId: string }>();
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const deviceParam = searchParams.get("device") || "ios";
  const entry = compositionId ? getComposition(compositionId) : undefined;

  if (!entry) return <div>Not found: {compositionId}</div>;

  const isIpad = deviceParam === "ipad" || deviceParam === "ipad-pro-13";
  const device: DeviceVariant = isIpad ? "ipad-pro-13" : entry.device ?? "iphone-16-pro";
  const preset = isIpad && entry.ipadPreset ? entry.ipadPreset : entry.preset;
  const slices = entry.slices ?? 5;
  const totalWidth = preset.width * slices;
  const totalHeight = preset.height;

  const Component = entry.component;

  return (
    <div style={{ width: totalWidth, height: totalHeight, overflow: "hidden" }}>
      <Suspense fallback={null}>
        <Component showSliceGuides={false} locale={locale} device={device} />
      </Suspense>
    </div>
  );
}
