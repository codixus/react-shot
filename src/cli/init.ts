import { join } from "path";
import { mkdirSync, writeFileSync, existsSync, copyFileSync } from "fs";
import { SDK_ROOT } from "./paths";

/**
 * Scaffold a fresh react-shot project. Uses v1 primitives (Canvas · Slice ·
 * Region · Device · Bg · Title · Subtitle · Eyebrow · Highlight) and the
 * copy rules the bundled skill enforces — 2-line title, 1-line subtitle.
 */
export async function runInit(cwd: string) {
  console.log("react-shot init\n");

  if (existsSync(join(cwd, "react-shot.config.ts"))) {
    console.log("Already initialized (react-shot.config.ts exists)");
    return;
  }

  const dirs = [
    "compositions/hero",
    "public/assets/fonts",
    "public/assets/screenshots/ios",
    "public/assets/screenshots/ipad",
  ];
  for (const dir of dirs) mkdirSync(join(cwd, dir), { recursive: true });
  console.log("  Created directories");

  // 1 · Config
  writeFileSync(
    join(cwd, "react-shot.config.ts"),
    `import { defineConfig } from "react-shot/config";

export default defineConfig({
  compositionsDir: "./compositions",
  publicDir: "./public",
  port: 5174,
  export: {
    outputDir: "./appstore",
    deviceFolders: {
      ios: "APP_IPHONE_67",
      ipad: "APP_IPAD_PRO_3GEN_129",
    },
  },
});
`,
  );
  console.log("  Created react-shot.config.ts");

  // 2 · package.json
  writeFileSync(
    join(cwd, "package.json"),
    JSON.stringify(
      {
        name: "app-screenshots",
        private: true,
        type: "module",
        scripts: {
          dev: "react-shot dev",
          export: "react-shot export",
          build: "react-shot build",
        },
        dependencies: {
          "react-shot": "latest",
        },
      },
      null,
      2,
    ) + "\n",
  );
  console.log("  Created package.json");

  // 3 · .gitignore
  writeFileSync(
    join(cwd, ".gitignore"),
    `node_modules/
output/
appstore/
*.tgz
.DS_Store
.env
.env.*
`,
  );
  console.log("  Created .gitignore");

  // 4 · Example composition — v1 API, follows the skill's copy rules
  writeFileSync(
    join(cwd, "compositions/hero/index.tsx"),
    `import type { CompositionProps, DeviceVariant } from "react-shot";
import {
  Canvas, Slice, Region, Device,
  Bg, Title, Subtitle, Eyebrow, Highlight,
} from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

// ─── Swap these for your brand ─────────────────
const INK = "#0A0A0A";
const PAPER = "#F7F6F1";
const LINE = "#D0D0D0";
const ACCENT = "#3D3BFF";
const MUTED = "rgba(10,10,10,0.6)";

/**
 * Copy rules (enforced by the react-shot skill):
 *   • Title: 2 lines, 4–7 words total. Line 2 carries <Highlight>.
 *   • Subtitle: 1 line, 50–80 chars. Benefit-first.
 *   • Eyebrow: 1–3 words (category, stat, or persona).
 *
 * Drop real screenshots into public/assets/screenshots/ios/ and pass them
 * via <Device screenshot="/assets/screenshots/ios/1.png" />. Without a
 * screenshot, the Device renders as an empty dark frame.
 */
export default function Hero({ device = "iphone-16-pro" }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;

  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={5}>
      {/* 1 · Hook — why should the viewer care */}
      <Slice index={0} bg={<Bg dots={{ bg: PAPER, color: LINE, size: 28, dotRadius: 1.4 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={ACCENT}>Your app</Eyebrow>
          <Title color={INK}>
            Do it,<br />
            the <Highlight variant="pill" color={ACCENT}>quiet way.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Name the pain your app solves in a single sentence.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 2 · Shift — what changes after install */}
      <Slice index={1} bg={<Bg grid={{ bg: PAPER, color: LINE, size: 44, thickness: 1, opacity: 0.6 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Faster</Eyebrow>
          <Title color={INK}>
            It just<br />
            <Highlight variant="pill" color={ACCENT}>works for you.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Describe the new reality after they tap install.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 3 · Proof — why should they believe you */}
      <Slice index={2} bg={<Bg waves={{ bg: PAPER, color: LINE, size: 48, thickness: 2 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">10,000 folks</Eyebrow>
          <Title color={INK}>
            Trusted every<br />
            <Highlight variant="pill" color={ACCENT}>single day.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Social proof, trust signals, or a hard result.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 4 · Feature — the capability that delivers */}
      <Slice index={3} bg={<Bg stripes={{ bg: PAPER, color: LINE, size: 40, thickness: 1, angle: 135 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Built-in</Eyebrow>
          <Title color={INK}>
            Every detail,<br />
            <Highlight variant="pill" color={ACCENT}>your way.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Show the capability that delivers the promise.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 5 · Payoff — the last look, the CTA */}
      <Slice index={4} bg={<Bg zigzag={{ bg: PAPER, color: LINE, size: 28, thickness: 2 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={ACCENT}>Free to try</Eyebrow>
          <Title color={INK}>
            Ready when<br />
            <Highlight variant="pill" color={ACCENT}>you are.</Highlight>
          </Title>
          <Subtitle color={MUTED}>End on the strongest motivation to tap download.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>
    </Canvas>
  );
}
`,
  );
  console.log("  Created compositions/hero/index.tsx");

  // 5 · Composition registry
  writeFileSync(
    join(cwd, "compositions/index.ts"),
    `import { lazy } from "react";
import type { CompositionEntry } from "react-shot/types";
import { appstore, appstoreIPad } from "react-shot/presets";

export const compositions: CompositionEntry[] = [
  {
    id: "hero",
    name: "Hero",
    component: lazy(() => import("./hero")),
    preset: appstore,
    ipadPreset: appstoreIPad,
    slices: 5,
    device: "iphone-16-pro",
    locales: ["en"],
  },
];

export function getComposition(id: string): CompositionEntry | undefined {
  return compositions.find((c) => c.id === id);
}
`,
  );
  console.log("  Created compositions/index.ts");

  // 6 · Copy fonts
  const sdkFontsDir = join(SDK_ROOT, "public/assets/fonts");
  const targetFontsDir = join(cwd, "public/assets/fonts");
  const fonts = ["Nunito-Bold.ttf", "Nunito-ExtraBold.ttf", "Nunito-Black.ttf"];
  for (const font of fonts) {
    const src = join(sdkFontsDir, font);
    if (existsSync(src)) copyFileSync(src, join(targetFontsDir, font));
  }
  console.log("  Copied fonts");

  console.log(`
Done. Next steps:

  1. Install dependencies
     bun install

  2. Drop your raw screenshots into
     public/assets/screenshots/ios/    (1.png … 5.png)
     public/assets/screenshots/ipad/   (iPad variants, optional)

     In compositions/hero/index.tsx, swap each <Device /> for
     <Device screenshot="/assets/screenshots/ios/1.png" />.

  3. Rewrite the 5 titles + subtitles. 2-line title, 1-line subtitle,
     benefit-first. The bundled skill keeps your AI agent on-brand.

  4. Preview
     bun run dev

  5. Export PNGs
     bun run export -- hero --all --store

Docs: https://react-shot.codixus.dev/docs
`);
}
