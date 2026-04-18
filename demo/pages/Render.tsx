import { Suspense } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { DeviceVariant } from "react-shot";
import { getComposition } from "../compositions";

export function Render() {
  const { compositionId } = useParams<{ compositionId: string }>();
  const [searchParams] = useSearchParams();
  const deviceParam = searchParams.get("device") || "ios";
  const locale = searchParams.get("locale") || "en";
  const entry = compositionId ? getComposition(compositionId) : undefined;

  if (!entry) return <div>Composition not found: {compositionId}</div>;

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
