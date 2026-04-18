import { useStage } from "./StageContext";

export function SliceGuides() {
  const { slices, sliceWidth, sliceHeight, safeArea } = useStage();
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {Array.from({ length: slices - 1 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i + 1) * sliceWidth - 1,
            top: 0,
            width: 2,
            height: sliceHeight,
            background: "rgba(255,0,0,0.35)",
          }}
        />
      ))}
      {Array.from({ length: slices }).map((_, i) => (
        <div
          key={`safe-${i}`}
          style={{
            position: "absolute",
            left: i * sliceWidth + safeArea.sides,
            top: safeArea.top,
            width: sliceWidth - safeArea.sides * 2,
            height: sliceHeight - safeArea.top - safeArea.bottom,
            border: "2px dashed rgba(0,150,255,0.35)",
            boxSizing: "border-box",
          }}
        />
      ))}
    </div>
  );
}
