import { useEffect, useState } from "react";

/**
 * Simple viewport breakpoint hook for chrome (Gallery, Docs, Viewport).
 * Returns `true` below `breakpoint` px. Works on the server (defaults to
 * desktop = false) and hydrates to the real viewport after mount.
 */
export function useIsMobile(breakpoint = 720): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => setIsMobile(window.innerWidth < breakpoint);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [breakpoint]);

  return isMobile;
}
