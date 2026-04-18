import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChromeTheme, type ChromePalette } from "./theme";
import { ThemeToggle } from "./ThemeToggle";

interface ViewportProps {
  children: React.ReactNode;
  canvasWidth: number;
  canvasHeight: number;
  compositionName?: string;
  compositionId?: string;
  showSliceGuides?: boolean;
  onToggleSliceGuides?: () => void;
}

/**
 * Pan + zoom viewport used by the preview route. Pure inline styles so
 * consumer projects don't need Tailwind. Theme follows the shared chrome
 * toggle (localStorage + prefers-color-scheme).
 */
export function Viewport({
  children,
  canvasWidth,
  canvasHeight,
  compositionName,
  compositionId,
  showSliceGuides = true,
  onToggleSliceGuides,
}: ViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [zoom, setZoom] = useState(0.1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hasFit, setHasFit] = useState(false);
  const navigate = useNavigate();
  const [, , c] = useChromeTheme();

  const fitToView = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const padding = 64;
    const scaleX = (rect.width - padding) / canvasWidth;
    const scaleY = (rect.height - padding) / canvasHeight;
    setZoom(Math.max(0.02, Math.min(scaleX, scaleY, 1)));
    setPan({ x: 0, y: 0 });
    setHasFit(true);
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    fitToView();
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => fitToView());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitToView]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const delta = -e.deltaY * 0.0015;
        setZoom((z) => Math.max(0.02, Math.min(3, z + delta * z)));
      });
    } else {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPan((p) => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
      });
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        e.preventDefault();
        setIsPanning(true);
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      }
    },
    [pan],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
      });
    },
    [isPanning, panStart],
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/");
      else if (e.key.toLowerCase() === "g") onToggleSliceGuides?.();
      else if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        fitToView();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        setZoom((z) => Math.min(3, z * 1.15));
      } else if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(0.02, z / 1.15));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, fitToView, onToggleSliceGuides]);

  const openFull = () => {
    if (compositionId) window.open(`/render/${compositionId}`, "_blank");
  };

  const [copied, setCopied] = useState(false);
  const copyCommand = async () => {
    if (!compositionId) return;
    const cmd = `bunx react-shot export ${compositionId} --all --store`;
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard API blocked — fall through silently
    }
  };

  const s = styles(c);

  return (
    <div style={s.root}>
      <div style={s.topbar}>
        <div style={s.topLeft}>
          <button onClick={() => navigate("/")} style={s.backBtn} title="Back to gallery (Esc)">
            <Chevron />
            <span>Gallery</span>
          </button>
          {compositionName ? (
            <>
              <span style={s.divider}>/</span>
              <span style={s.compName}>{compositionName}</span>
            </>
          ) : null}
        </div>

        <div style={s.topCenter}>
          <button onClick={() => setZoom((z) => Math.max(0.02, z / 1.15))} style={s.iconBtn} title="Zoom out">−</button>
          <button onClick={fitToView} style={s.zoomLabel} title="Fit to view (⌘0)">{Math.round(zoom * 100)}%</button>
          <button onClick={() => setZoom((z) => Math.min(3, z * 1.15))} style={s.iconBtn} title="Zoom in">+</button>
          <span style={s.dot} />
          <span style={s.dims}>{canvasWidth}×{canvasHeight}</span>
        </div>

        <div style={s.topRight}>
          <button
            onClick={onToggleSliceGuides}
            style={{ ...s.toggleBtn, ...(showSliceGuides ? s.toggleBtnActive : null) }}
            title="Toggle slice guides (G)"
          >
            {showSliceGuides ? "Hide guides" : "Show guides"}
          </button>
          <button
            onClick={copyCommand}
            style={s.toggleBtn}
            title={`Copy: bunx react-shot export ${compositionId ?? "<id>"} --all --store`}
          >
            {copied ? "Copied ✓" : "Copy CLI"}
          </button>
          <button onClick={openFull} style={s.exportBtn} title="Open render at 1:1 full size">
            Open full
          </button>
          <a
            href="https://github.com/codixus/react-shot"
            target="_blank"
            rel="noreferrer"
            style={s.ghLink}
            title="View source on GitHub"
          >
            <GitHubIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ ...s.canvasArea, cursor: isPanning ? "grabbing" : "default" }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformOrigin: "center center",
            willChange: "transform",
            transition: isPanning ? "none" : "transform 120ms ease-out",
            visibility: hasFit ? "visible" : "hidden",
          }}
        >
          {children}
        </div>
      </div>

      <div style={s.bottombar}>
        <span>Scroll: pan</span>
        <span>⌘+Scroll: zoom</span>
        <span>Alt+Drag: pan</span>
        <span>G: guides</span>
        <span>⌘0: fit</span>
        <span>Esc: gallery</span>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.2 9.14 7.64 10.62.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.1.67-3.76-1.32-3.76-1.32-.5-1.27-1.24-1.61-1.24-1.61-1.02-.7.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15 1 1.71 2.64 1.22 3.28.93.1-.72.39-1.22.7-1.5-2.47-.28-5.06-1.24-5.06-5.51 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.1-2.96 0 0 .95-.3 3.1 1.14.9-.25 1.86-.37 2.82-.38.96 0 1.92.13 2.82.38 2.15-1.44 3.09-1.14 3.09-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.6 5.22-5.07 5.5.4.34.76 1.02.76 2.07 0 1.5-.01 2.7-.01 3.07 0 .3.2.65.78.54 4.44-1.48 7.63-5.67 7.63-10.62C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}

function styles(c: ChromePalette): Record<string, React.CSSProperties> {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100%",
      background: c.bg,
      color: c.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
      fontSize: 13,
      overflow: "hidden",
    },
    topbar: {
      display: "flex",
      alignItems: "center",
      height: 48,
      padding: "0 12px",
      background: c.bgSoft,
      borderBottom: `1px solid ${c.border}`,
      gap: 8,
      flex: "0 0 auto",
      userSelect: "none",
    },
    topLeft: { display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: "0 0 auto" },
    topCenter: { display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" },
    topRight: { display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" },
    backBtn: {
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "transparent", border: "none", color: c.muted,
      padding: "6px 8px", borderRadius: 6, cursor: "pointer", fontSize: 13,
    },
    divider: { color: c.dim },
    compName: { color: c.text, fontWeight: 600 },
    iconBtn: {
      width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: "transparent", border: "none", color: c.muted, cursor: "pointer",
      borderRadius: 6, fontSize: 16,
    },
    zoomLabel: {
      minWidth: 56, height: 28, padding: "0 8px", background: "transparent", border: "none",
      color: c.text, cursor: "pointer", fontFamily: "ui-monospace, monospace", fontSize: 12,
    },
    dot: { width: 1, height: 14, background: c.border, margin: "0 6px" },
    dims: { color: c.dim, fontFamily: "ui-monospace, monospace", fontSize: 11 },
    toggleBtn: {
      padding: "6px 10px", background: "transparent", border: `1px solid ${c.border}`,
      color: c.muted, borderRadius: 6, cursor: "pointer", fontSize: 12,
    },
    toggleBtnActive: { background: c.surfaceHi, color: c.text, borderColor: "transparent" },
    exportBtn: {
      padding: "6px 12px", background: c.accent, border: "none", color: "#fff",
      borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600,
    },
    ghLink: {
      width: 28, height: 28, borderRadius: 6,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: "transparent", border: `1px solid ${c.border}`, color: c.muted,
      textDecoration: "none",
    },
    canvasArea: {
      flex: 1,
      minHeight: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      contain: "layout style paint",
      backgroundImage:
        `linear-gradient(45deg, ${c.checker} 25%, transparent 25%), linear-gradient(-45deg, ${c.checker} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${c.checker} 75%), linear-gradient(-45deg, transparent 75%, ${c.checker} 75%)`,
      backgroundSize: "24px 24px",
      backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
    },
    bottombar: {
      height: 28, flex: "0 0 auto", display: "flex", alignItems: "center", gap: 16,
      padding: "0 16px", background: c.bgSoft, borderTop: `1px solid ${c.border}`,
      fontSize: 10, color: c.dim, userSelect: "none",
    },
  };
}
