import { useEffect, useState } from "react";

export type ChromeMode = "dark" | "light";

export interface ChromePalette {
  bg: string;
  bgSoft: string;
  surface: string;
  surfaceHi: string;
  border: string;
  borderHi: string;
  text: string;
  muted: string;
  dim: string;
  accent: string;
  /** Checker-square accent for the canvas area backdrop. */
  checker: string;
}

const DARK: ChromePalette = {
  bg: "#0A0A0E",
  bgSoft: "#14141A",
  surface: "rgba(255,255,255,0.04)",
  surfaceHi: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  borderHi: "rgba(255,255,255,0.16)",
  text: "#F4F4F5",
  muted: "#A1A1AA",
  dim: "#71717A",
  accent: "#10B981",
  checker: "#121217",
};

const LIGHT: ChromePalette = {
  bg: "#F7F7F5",
  bgSoft: "#ECECEA",
  surface: "#FFFFFF",
  surfaceHi: "#F2F2F1",
  border: "rgba(0,0,0,0.08)",
  borderHi: "rgba(0,0,0,0.18)",
  text: "#0F0F12",
  muted: "#52525B",
  dim: "#9CA3AF",
  accent: "#0EA35F",
  checker: "#EDEDEC",
};

export function palette(mode: ChromeMode): ChromePalette {
  return mode === "light" ? LIGHT : DARK;
}

const KEY = "react-shot:chrome-theme";
const listeners = new Set<() => void>();

function readInitial(): ChromeMode {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/**
 * Tiny shared store so Gallery and Viewport stay in sync across routes
 * without a context provider or a state manager.
 */
export function setChromeTheme(mode: ChromeMode) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, mode);
  listeners.forEach((fn) => fn());
}

export function useChromeTheme(): [ChromeMode, (m: ChromeMode) => void, ChromePalette] {
  const [mode, setMode] = useState<ChromeMode>(readInitial);

  useEffect(() => {
    const sync = () => setMode(readInitial());
    listeners.add(sync);

    // Also follow the OS preference when the user hasn't set a choice.
    const mq = typeof window !== "undefined" ? window.matchMedia?.("(prefers-color-scheme: light)") : undefined;
    const mqHandler = () => {
      if (typeof window !== "undefined" && !window.localStorage.getItem(KEY)) sync();
    };
    mq?.addEventListener?.("change", mqHandler);

    return () => {
      listeners.delete(sync);
      mq?.removeEventListener?.("change", mqHandler);
    };
  }, []);

  const set = (m: ChromeMode) => {
    setChromeTheme(m);
  };

  return [mode, set, palette(mode)];
}
