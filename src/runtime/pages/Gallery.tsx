import { Link } from "react-router-dom";
import { compositions } from "@compositions/index";
import { ThemeToggle, useChromeTheme, type ChromePalette } from "@/lib/index";

const FAMILY_META: Record<string, { label: string; tone: string; fg: string }> = {
  "ai-learning": { label: "AI · Learning", tone: "#6C4DFF", fg: "#fff" },
  "ai-assistant": { label: "AI · Assistant", tone: "#0A0A0A", fg: "#fff" },
  "editorial-travel": { label: "Editorial · Travel", tone: "#E8DED1", fg: "#191512" },
  "creator-bold": { label: "Creator · Bold", tone: "#FF5733", fg: "#fff" },
  "transit-utility": { label: "Transit · Utility", tone: "#15C064", fg: "#031108" },
  "playful-commerce": { label: "Playful · Commerce", tone: "#E347B9", fg: "#fff" },
  "premium-neutral": { label: "Premium · Neutral", tone: "#3C5A40", fg: "#fff" },
};

function roleLabel(role: string) {
  return role === "cta" ? "Payoff" : role[0].toUpperCase() + role.slice(1);
}

export function Gallery() {
  const [, , c] = useChromeTheme();
  const s = styles(c);

  return (
    <div style={s.root}>
      <div style={s.container}>
        <header style={s.header}>
          <div style={s.logoRow}>
            <div style={s.logoGroup}>
              <div style={s.titleRow}>
                <div style={s.logoMark}>
                  <SliceStackIcon />
                </div>
                <h1 style={s.title}>react-shot</h1>
              </div>
              <p style={s.subtitle}>Create store screenshots with React. Built for AI agents.</p>
            </div>
            <div style={s.topActions}>
              <Link to="/docs" style={s.docsLink} title="How to use">Docs</Link>
              <a href="https://github.com/codixus/react-shot" target="_blank" rel="noreferrer" style={s.ghLink} title="View on GitHub">
                <GitHubIcon />
              </a>
              <ThemeToggle size={36} />
            </div>
          </div>
        </header>

        <section style={s.grid}>
          {compositions.map((comp) => {
            const fam = comp.family ? FAMILY_META[comp.family] : undefined;
            const slices = comp.slices ?? 5;
            return (
              <Link key={comp.id} to={`/${comp.id}`} style={s.card}>
                <div style={s.cardHead}>
                  <span style={{ ...s.badge, background: fam?.tone ?? "#E5E7EB", color: fam?.fg ?? "#111" }}>
                    {fam?.label ?? "Uncategorized"}
                  </span>
                  <span style={s.pill}>{comp.preset.width}×{comp.preset.height}</span>
                  <span style={s.pill}>{slices} slots</span>
                </div>

                <h3 style={s.cardTitle}>{comp.name}</h3>
                <p style={s.cardLede}>
                  {comp.narrative?.slots[0]?.headline.support ?? "Benefit-led screenshot system."}
                </p>

                {comp.narrative ? (
                  <div style={s.roleRow}>
                    {comp.narrative.slots.map((slot, i) => (
                      <span key={`${slot.role}-${i}`} style={s.rolePill}>{roleLabel(slot.role)}</span>
                    ))}
                  </div>
                ) : null}

                <div style={s.cardFoot}>
                  <span style={s.open}>Open preview</span>
                  <span style={s.arrow}>→</span>
                </div>
              </Link>
            );
          })}
        </section>

        <footer style={s.footer}>
          <span>Scroll to pan · ⌘+scroll to zoom · G toggles guides</span>
          <a href="https://github.com/codixus/react-shot" target="_blank" rel="noreferrer" style={s.footerLink}>
            github.com/codixus/react-shot
          </a>
        </footer>
      </div>
    </div>
  );
}

function SliceStackIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={3} y={4} width={12} height={16} rx={2} />
      <rect x={6} y={3} width={12} height={16} rx={2} opacity={0.6} />
      <rect x={9} y={2} width={12} height={16} rx={2} opacity={0.35} />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.2 9.14 7.64 10.62.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.1.67-3.76-1.32-3.76-1.32-.5-1.27-1.24-1.61-1.24-1.61-1.02-.7.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15 1 1.71 2.64 1.22 3.28.93.1-.72.39-1.22.7-1.5-2.47-.28-5.06-1.24-5.06-5.51 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.1-2.96 0 0 .95-.3 3.1 1.14.9-.25 1.86-.37 2.82-.38.96 0 1.92.13 2.82.38 2.15-1.44 3.09-1.14 3.09-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.6 5.22-5.07 5.5.4.34.76 1.02.76 2.07 0 1.5-.01 2.7-.01 3.07 0 .3.2.65.78.54 4.44-1.48 7.63-5.67 7.63-10.62C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}

function styles(c: ChromePalette): Record<string, React.CSSProperties> {
  return {
    root: {
      minHeight: "100vh",
      background: `radial-gradient(1200px 600px at 50% -10%, ${c.accent}26, transparent 60%), ${c.bg}`,
      color: c.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    },
    container: { maxWidth: 1080, margin: "0 auto", padding: "48px 24px" },
    header: { marginBottom: 40 },
    logoRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 },
    logoGroup: { display: "flex", flexDirection: "column", gap: 10, minWidth: 0 },
    titleRow: { display: "flex", alignItems: "center", gap: 14 },
    topActions: { display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" },
    docsLink: {
      padding: "8px 14px",
      borderRadius: 999,
      background: c.surface,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontSize: 12,
      fontWeight: 600,
      textDecoration: "none",
      letterSpacing: 0.3,
    },
    ghLink: {
      width: 36, height: 36, borderRadius: 999,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: c.surface, border: `1px solid ${c.border}`, color: c.muted,
      textDecoration: "none",
    },
    logoMark: {
      width: 44, height: 44, borderRadius: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(135deg, ${c.accent}, #059669)`,
      flex: "0 0 auto",
    },
    title: { margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 },
    subtitle: { margin: 0, fontSize: 14, color: c.muted, maxWidth: 560, lineHeight: 1.5 },
    grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 },
    card: {
      display: "flex", flexDirection: "column", gap: 12, padding: 20,
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20,
      textDecoration: "none", color: "inherit",
      transition: "background 120ms, border-color 120ms",
    },
    cardHead: { display: "flex", flexWrap: "wrap", gap: 6 },
    badge: {
      padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: 1.2,
    },
    pill: {
      padding: "4px 10px", borderRadius: 999, fontSize: 10, color: c.muted,
      border: `1px solid ${c.border}`, textTransform: "uppercase", letterSpacing: 1,
    },
    cardTitle: { margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: -0.4, color: c.text },
    cardLede: { margin: 0, fontSize: 13, color: c.muted, lineHeight: 1.5 },
    roleRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 },
    rolePill: {
      padding: "3px 8px", borderRadius: 999, fontSize: 9.5, color: c.dim,
      border: `1px solid ${c.border}`, textTransform: "uppercase", letterSpacing: 1,
    },
    cardFoot: {
      marginTop: "auto", paddingTop: 8,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderTop: `1px solid ${c.border}`,
    },
    open: { fontSize: 12, color: c.text, fontWeight: 500 },
    arrow: { fontSize: 14, color: c.muted },
    footer: {
      marginTop: 48, paddingTop: 20, borderTop: `1px solid ${c.border}`,
      display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      fontSize: 11, color: c.dim,
    },
    footerLink: { color: c.muted, textDecoration: "none", fontFamily: "ui-monospace, monospace" },
  };
}
