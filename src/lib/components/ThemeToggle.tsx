import { useChromeTheme } from "./theme";

interface ThemeToggleProps {
  size?: number;
  style?: React.CSSProperties;
}

/**
 * Compact icon button that flips the chrome theme. Shares state with every
 * other ThemeToggle + Viewport on the page via the tiny store in ./theme.
 */
export function ThemeToggle({ size = 32, style }: ThemeToggleProps) {
  const [mode, setMode, c] = useChromeTheme();
  const next: typeof mode = mode === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setMode(next)}
      title={`Switch to ${next} mode`}
      aria-label={`Switch to ${next} mode`}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: c.surface,
        border: `1px solid ${c.border}`,
        color: c.muted,
        borderRadius: 999,
        cursor: "pointer",
        padding: 0,
        ...style,
      }}
    >
      {mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={4} />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
