import { useStage } from "./StageContext";

/**
 * Scale helper for code that draws device-relative geometry (bezels, buttons,
 * cutouts). Same shape as the old `useDeviceScale` — returns a px() function
 * that rounds design-px to rendered-px based on the active device's scale.
 */
export function useDeviceRenderScale(baseWidth: number) {
  const { deviceWidth } = useStage();
  const s = deviceWidth / baseWidth;
  return {
    px: (v: number) => Math.round(v * s),
    fpx: (v: number) => (v * s).toFixed(1),
    s,
  };
}
