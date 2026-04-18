import { createContext, useContext } from "react";
import type { StageInfo, SafeArea } from "./types";

export const StageContext = createContext<StageInfo | null>(null);

export function useStage(): StageInfo {
  const ctx = useContext(StageContext);
  if (!ctx) throw new Error("useStage must be used within a <Canvas>");
  return ctx;
}

export const SliceContext = createContext<{ index: number; safeArea: SafeArea } | null>(null);

export function useSlice() {
  return useContext(SliceContext);
}
