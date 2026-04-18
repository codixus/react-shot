import { Link } from "react-router-dom";
import { ThemeToggle, useChromeTheme, useIsMobile } from "react-shot";
import type { ChromePalette } from "react-shot";

/**
 * Single-scroll docs page. Sections anchored for quick hash nav. Content is
 * the minimum a user needs to ship their first composition — the rest lives
 * in the repo README.
 */
export function HowTo() {
  const [, , c] = useChromeTheme();
  const isMobile = useIsMobile();
  const s = styles(c, isMobile);

  return (
    <div style={s.root}>
      <div style={s.container}>
        <header style={s.header}>
          <Link to="/" style={s.backLink}>← Gallery</Link>
          <div style={s.headerActions}>
            <a href="https://github.com/codixus/react-shot" target="_blank" rel="noreferrer" style={s.ghPill}>
              <GitHubIcon /> codixus/react-shot
            </a>
            <ThemeToggle />
          </div>
        </header>

        <h1 style={s.h1}>How to use react-shot</h1>
        <p style={s.lede}>
          Create store screenshots with React. Built for AI agents.
          Preview in the browser, export production-ready PNG slices with one CLI command.
        </p>

        <nav style={s.toc}>
          {TOC.map((t) => (
            <a key={t.id} href={`#${t.id}`} style={s.tocLink}>{t.label}</a>
          ))}
        </nav>

        <Section id="install" title="Install" c={c}>
          <Code c={c}>{`bun add react-shot
# or: npm i react-shot`}</Code>
          <p style={s.p}>Requires Bun ≥ 1.1 or Node ≥ 22. FFmpeg is optional (only needed for video export).</p>
        </Section>

        <Section id="quickstart" title="Quick start" c={c}>
          <Code c={c}>{`mkdir my-screenshots && cd my-screenshots
bunx react-shot init
bun install

cp ~/simulator-screenshots/*.png public/assets/screenshots/ios/

bun run dev                                # preview locally
bunx react-shot export hero --all --store  # render + slice PNGs`}</Code>
        </Section>

        <Section id="features" title="What it unlocks" c={c}>
          <div style={s.grid2}>
            {FEATURES.map((f) => (
              <div key={f.title} style={s.cell}>
                <div style={s.featureTitle}>{f.title}</div>
                <p style={s.cellLede}>{f.lede}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="ai-agents" title="AI agents" c={c}>
          <p style={s.p}>
            react-shot ships a skill — a reusable capability package — that teaches your AI
            agent (Claude Code, compatible runtimes) to follow the composition skeleton,
            copy rules, and Bg pattern conventions automatically.
          </p>
          <p style={s.p}>Install with the <code style={s.code}>skills</code> CLI:</p>
          <Code c={c}>{`npx skills add codixus/react-shot`}</Code>
          <p style={s.p}>
            Or install manually — clone the repo and symlink the skill directory into your
            agent&apos;s skills folder:
          </p>
          <Code c={c}>{`git clone https://github.com/codixus/react-shot.git
ln -s "$PWD/react-shot/skills/react-shot" ~/.claude/skills/react-shot`}</Code>
          <p style={s.p}>
            Once installed, the agent recognizes prompts like
            {" "}<i>&ldquo;write me a react-shot composition for a meditation app&rdquo;</i>{" "}
            and reaches for the right primitives with the 2-line title / 1-line subtitle
            rhythm baked in. Skill source: {" "}
            <a href="https://github.com/codixus/react-shot/tree/main/skills/react-shot" target="_blank" rel="noreferrer" style={s.inlineLink}>
              skills/react-shot/
            </a>.
          </p>
        </Section>

        <Section id="primitives" title="The 11 primitives" c={c}>
          <p style={s.p}>
            A composition is a tree of these. That&apos;s it. There is no parallel component library to learn.
          </p>
          <div style={s.grid2}>
            {PRIMITIVES.map((p) => (
              <div key={p.name} style={s.cell}>
                <code style={s.code}>{p.name}</code>
                <p style={s.cellLede}>{p.lede}</p>
              </div>
            ))}
          </div>
          <p style={s.p}>
            Layout helpers: <code style={s.code}>Stack</code>, <code style={s.code}>Row</code>, <code style={s.code}>Positioned</code>.
          </p>
        </Section>

        <Section id="composition" title="Composition skeleton" c={c}>
          <Code c={c}>{`import type { CompositionProps, DeviceVariant } from "react-shot";
import { Canvas, Slice, Region, Device, Bg, Title, Subtitle, Eyebrow, Highlight } from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

export default function Hero({ device = "iphone-16-pro" }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;
  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={5}>
      <Slice index={0} bg={<Bg dots={{ bg: "#F7F6F1", color: "#D8D4C3" }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor="#3D3BFF">Flast</Eyebrow>
          <Title>
            Your AI,<br />
            one simple <Highlight variant="color" color="#3D3BFF">chat.</Highlight>
          </Title>
          <Subtitle>Ask, plan, research, ship — without switching tabs.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot="/assets/screenshots/flast/chat.png" />
        </Region>
      </Slice>
      {/* …slices 2..5 */}
    </Canvas>
  );
}`}</Code>
        </Section>

        <Section id="copy-rules" title="Copy rules (strict)" c={c}>
          <ul style={s.list}>
            <li><b>Title = 2 lines.</b> Split with a single <code style={s.code}>&lt;br /&gt;</code>. 4–7 words total. The second line should carry a <code style={s.code}>&lt;Highlight&gt;</code>.</li>
            <li><b>Subtitle = 1 line.</b> 50–80 chars. Conversational. Benefit-led, never a feature list.</li>
            <li>Keep char length similar across slices of a set — the eye should glide, not jump.</li>
            <li>Action verb at the top of the title, outcome in the second line.</li>
            <li>Eyebrow is 1–3 words (category, stat, persona).</li>
          </ul>
        </Section>

        <Section id="patterns" title="Bg patterns" c={c}>
          <p style={s.p}>Eleven one-shot backgrounds — pick one to set the mood, vary across slices so the set feels like a set.</p>
          <div style={s.grid2}>
            {BG_PATTERNS.map((p) => (
              <div key={p.name} style={s.cell}>
                <code style={s.code}>{p.name}</code>
                <p style={s.cellLede}>{p.lede}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="story" title="Story model" c={c}>
          <p style={s.p}>Treat a 5-slice set as a sequence — not a gallery:</p>
          <ul style={s.list}>
            <li><b>Hook</b> — one promise. Why should the viewer care?</li>
            <li><b>Shift</b> — what changes after they install?</li>
            <li><b>Proof</b> — why should they believe the claim?</li>
            <li><b>Delivery</b> — the feature that actually carries the value.</li>
            <li><b>Payoff</b> — the CTA, the last look, the memorable line.</li>
          </ul>
          <p style={s.p}>
            If a slice reads like a feature label (&quot;Settings&quot;, &quot;Dashboard&quot;), rewrite the copy before touching the layout.
          </p>
        </Section>

        <Section id="devices" title="Device variants" c={c}>
          <p style={s.p}>
            Pass via <code style={s.code}>&lt;Canvas device="…" /&gt;</code> or override per instance with <code style={s.code}>&lt;Device variant="…" /&gt;</code>.
          </p>
          <div style={s.chipRow}>
            {DEVICES.map((d) => <span key={d} style={s.devChip}>{d}</span>)}
          </div>
          <p style={s.p}>
            For iPad output, use <code style={s.code}>appstoreIPad</code> preset + <code style={s.code}>ipad-pro-13</code> variant.
            Typography auto-scales via token references so perceived size stays consistent across form factors.
          </p>
        </Section>

        <Section id="localize" title="Localize in seconds" c={c}>
          <p style={s.p}>
            Copy lives in TypeScript, so localization is a component edit — no
            translation platform, no design hand-off.
          </p>
          <Code c={c}>{`const copy = {
  en: { eyebrow: "Your AI companion", title: ["Honest AI,", "one simple chat."], subtitle: "Feedback you can act on, not validation." },
  tr: { eyebrow: "AI yol arkadaşın", title: ["Dürüst AI,", "tek bir sohbette."], subtitle: "İşe yarayan geri bildirim, boş onay değil." },
  es: { eyebrow: "Tu compañero de IA", title: ["IA honesta,", "un solo chat."], subtitle: "Feedback accionable, no validación vacía." },
  ja: { eyebrow: "あなたのAIコンパニオン", title: ["率直なAI、", "シンプルな対話。"], subtitle: "役に立つフィードバック、ただの肯定ではなく。" },
} as const;

export default function Hero({ locale = "en" }: CompositionProps) {
  const t = copy[locale as keyof typeof copy] ?? copy.en;
  // …render with t.eyebrow, t.title[0], t.title[1], t.subtitle
}`}</Code>
          <p style={s.p}>
            List the locales on the registry entry:
          </p>
          <Code c={c}>{`{ id: "hero", component: lazy(() => import("./hero")), locales: ["en", "tr", "es", "ja"] }`}</Code>
          <p style={s.p}>
            Export every locale in one shot:
          </p>
          <Code c={c}>{`bunx react-shot export hero --all-locales
bunx react-shot export hero --all --store   # all locales × ios + ipad`}</Code>
          <p style={s.p}>
            Agent prompt pattern:{" "}
            <i>
              &ldquo;Localize the hero composition to Turkish, Spanish, and
              Japanese. Follow the copy rules: no em dashes, title 2 lines,
              subtitle 1 line, 50–80 chars.&rdquo;
            </i>
          </p>
        </Section>

        <Section id="export" title="Export" c={c}>
          <Code c={c}>{`react-shot export hero                  # single locale, single device
react-shot export hero --locale tr
react-shot export hero --device ipad
react-shot export hero --all            # every locale × device
react-shot export hero --store          # output under deviceFolders/`}</Code>
          <p style={s.p}>
            Config lives in <code style={s.code}>react-shot.config.ts</code>. See the README for the full schema.
          </p>
        </Section>

        <footer style={s.footer}>
          <span>react-shot · v1.0</span>
          <a href="https://github.com/codixus/react-shot" target="_blank" rel="noreferrer" style={s.footerLink}>
            github.com/codixus/react-shot
          </a>
        </footer>
      </div>
    </div>
  );
}

const TOC = [
  { id: "install", label: "Install" },
  { id: "quickstart", label: "Quick start" },
  { id: "features", label: "What it unlocks" },
  { id: "ai-agents", label: "AI agents" },
  { id: "primitives", label: "Primitives" },
  { id: "composition", label: "Composition skeleton" },
  { id: "copy-rules", label: "Copy rules" },
  { id: "patterns", label: "Bg patterns" },
  { id: "story", label: "Story model" },
  { id: "devices", label: "Device variants" },
  { id: "localize", label: "Localize" },
  { id: "export", label: "Export" },
];

const FEATURES: Array<{ title: string; lede: string }> = [
  {
    title: "Localize in seconds",
    lede: "Ask your agent to translate every slice into a new locale — it edits the copy, you re-export.",
  },
  {
    title: "Iterate without design debt",
    lede: "Try five headline variations, pick the winner. All copy lives in TS, so diffs are readable.",
  },
  {
    title: "One file, every device",
    lede: "iPhone 6.9\" and iPad 13\" render from the same composition. Typography stays proportional.",
  },
  {
    title: "Store-ready PNGs",
    lede: "Puppeteer + Sharp slice straight to App Store Connect / Play Console dimensions.",
  },
  {
    title: "Ship a story, not a gallery",
    lede: "The skill enforces Hook · Shift · Proof · Delivery · Payoff — so copy carries the sale.",
  },
  {
    title: "Agent-first authoring",
    lede: "Claude Code and friends pick the right primitives automatically via the bundled skill.",
  },
  {
    title: "Patterns out of the box",
    lede: "Eleven tile-able backgrounds (dots, grid, zigzag, waves…) mix for a set that feels like a set.",
  },
  {
    title: "Brand refresh in a commit",
    lede: "Change a token, every slice updates. No round-trips, no stale exports.",
  },
];

const PRIMITIVES: Array<{ name: string; lede: string }> = [
  { name: "Canvas", lede: "Root. Takes a preset, a device variant, and a slice count." },
  { name: "Slice", lede: "One screenshot. Flex column with optional bg + decorations." },
  { name: "Region", lede: "Vertical zone inside a Slice — top / middle / bottom with overflow." },
  { name: "Device", lede: "Auto-fits the chosen device frame to its region." },
  { name: "Bg", lede: "Background layer: solid / gradient / image / mesh / pattern." },
  { name: "Shape", lede: "Decorative blob / circle / ring / pill." },
  { name: "Card", lede: "Overlay surface with glass / float / neon / outline variants." },
  { name: "Title / Subtitle / Eyebrow / Caption", lede: "Token-scaled typography primitives." },
  { name: "Highlight", lede: "Inline text decorator — underline, pill, italic, stroke, color." },
];

const BG_PATTERNS: Array<{ name: string; lede: string }> = [
  { name: "solid", lede: "A single flat color." },
  { name: "gradient", lede: "Linear / radial / conic — any angle." },
  { name: "mesh", lede: "Four-corner radial blobs for painterly backgrounds." },
  { name: "image", lede: "Full-bleed photo with cover / contain fit." },
  { name: "noise", lede: "SVG turbulence — paper-grain feel." },
  { name: "dots", lede: "Tiled dot grid. Quiet product-page vibe." },
  { name: "grid", lede: "Fine crosshatch lines. Engineering / utility mood." },
  { name: "stripes", lede: "Diagonal stripes via repeating-linear-gradient." },
  { name: "zigzag", lede: "SVG polyline tiled vertically. Playful but sharp." },
  { name: "waves", lede: "Gentle sine-wave lines. Editorial / premium." },
  { name: "diagonal", lede: "Two-tone checker split. Bold, blocky." },
];

const DEVICES = [
  "iphone-16-pro",
  "ipad-pro-13",
  "ipad-mini",
  "macbook-pro",
  "apple-watch",
  "vision-pro",
  "android-phone",
  "pixel",
  "galaxy",
  "browser",
  "desktop",
  "tv",
];

function Section({ id, title, children, c }: { id: string; title: string; children: React.ReactNode; c: ChromePalette }) {
  return (
    <section id={id} style={{ marginTop: 48, paddingTop: 8 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.3, color: c.text }}>{title}</h2>
      <div style={{ marginTop: 10 }}>{children}</div>
    </section>
  );
}

function Code({ children, c }: { children: React.ReactNode; c: ChromePalette }) {
  return (
    <pre
      style={{
        background: c.bgSoft,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: 16,
        color: c.text,
        fontSize: 13,
        lineHeight: 1.55,
        overflowX: "auto",
        fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
      }}
    >
      {children}
    </pre>
  );
}

function GitHubIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.2 9.14 7.64 10.62.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.1.67-3.76-1.32-3.76-1.32-.5-1.27-1.24-1.61-1.24-1.61-1.02-.7.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15 1 1.71 2.64 1.22 3.28.93.1-.72.39-1.22.7-1.5-2.47-.28-5.06-1.24-5.06-5.51 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.1-2.96 0 0 .95-.3 3.1 1.14.9-.25 1.86-.37 2.82-.38.96 0 1.92.13 2.82.38 2.15-1.44 3.09-1.14 3.09-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.6 5.22-5.07 5.5.4.34.76 1.02.76 2.07 0 1.5-.01 2.7-.01 3.07 0 .3.2.65.78.54 4.44-1.48 7.63-5.67 7.63-10.62C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}

function styles(c: ChromePalette, isMobile: boolean): Record<string, React.CSSProperties> {
  return {
    root: {
      minHeight: "100vh",
      background: `radial-gradient(1200px 600px at 50% -10%, ${c.accent}20, transparent 60%), ${c.bg}`,
      color: c.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    },
    container: { maxWidth: 820, margin: "0 auto", padding: isMobile ? "20px 16px 48px" : "28px 24px 64px" },
    header: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "stretch" : "center",
      gap: 12,
      marginBottom: 20,
    },
    backLink: { color: c.muted, textDecoration: "none", fontSize: 13 },
    headerActions: { display: "flex", alignItems: "center", gap: 8 },
    ghPill: {
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "7px 12px", borderRadius: 999,
      background: c.surface, border: `1px solid ${c.border}`, color: c.text,
      fontSize: 12, textDecoration: "none",
    },
    h1: { margin: 0, fontSize: isMobile ? 26 : 34, fontWeight: 700, letterSpacing: -0.8 },
    lede: { margin: "12px 0 0", fontSize: 16, color: c.muted, lineHeight: 1.55, maxWidth: 660 },
    toc: {
      marginTop: 24, padding: "14px 16px",
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
      display: "flex", gap: 8, flexWrap: "wrap",
    },
    tocLink: {
      color: c.muted, textDecoration: "none", fontSize: 12,
      padding: "4px 10px", borderRadius: 999,
      border: `1px solid ${c.border}`,
    },
    p: { margin: "10px 0 0", fontSize: 14, lineHeight: 1.65, color: c.muted },
    code: {
      padding: "2px 6px", borderRadius: 4,
      background: c.bgSoft, border: `1px solid ${c.border}`,
      fontSize: 12, fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
      color: c.text,
    },
    list: { margin: "12px 0 0", paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: c.muted },
    grid2: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: 10,
      marginTop: 12,
    },
    cell: {
      padding: 14, background: c.surface, border: `1px solid ${c.border}`,
      borderRadius: 12,
    },
    cellLede: { margin: "6px 0 0", fontSize: 13, color: c.muted, lineHeight: 1.5 },
    featureTitle: { fontSize: 14, fontWeight: 700, color: c.text, letterSpacing: -0.2 },
    chipRow: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 },
    devChip: {
      padding: "5px 10px", borderRadius: 999,
      background: c.surface, border: `1px solid ${c.border}`, color: c.text,
      fontFamily: "ui-monospace, monospace", fontSize: 12,
    },
    footer: {
      marginTop: 56, paddingTop: 18, borderTop: `1px solid ${c.border}`,
      display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      fontSize: 11, color: c.dim,
    },
    footerLink: { color: c.muted, textDecoration: "none", fontFamily: "ui-monospace, monospace" },
    inlineLink: { color: c.accent, textDecoration: "underline", textUnderlineOffset: 2 },
  };
}
