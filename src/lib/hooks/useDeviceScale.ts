import { useMemo } from "react";

export function useDeviceScale(baseWidth: number, renderedWidth: number) {
  return useMemo(() => {
    const s = renderedWidth / baseWidth;
    return {
      px: (v: number) => Math.round(v * s),
      fpx: (v: number) => (v * s).toFixed(1),
      s,
    };
  }, [baseWidth, renderedWidth]);
}
