---
name: react-shot
description: Use when building App Store or Play Store screenshot sets in React — authoring Canvas/Slice/Region compositions, picking Device variants, using Bg patterns, following the 2-line-title / 1-line-subtitle copy rules, or exporting PNG slices with the react-shot CLI. Triggers on "react-shot", "app store screenshots", "play store screenshots", "screenshot composition", "react screenshot SDK", "generate store screenshots".
---

# react-shot

A declarative React SDK for App Store / Play Store screenshots. Eleven primitives. One preset. Preview in the browser, export PNG slices with Puppeteer + Sharp.

## When this skill applies

Use it when:

- The user asks you to build, edit, or preview App Store / Play Store screenshot creatives in React.
- They reference `react-shot`, `Canvas`, `Slice`, `Region`, `Device`, `Bg`, or the `appstore` preset.
- They paste a composition file and want help rewriting copy, adding slices, or changing layout.
- They want to export via CLI (`bunx react-shot export …`).

Skip when:

- The user is building a general React app (no screenshot framing).
- They want video generation (react-shot is stills only; for video see hyperframes).
- They ask for a motion-graphics / animation SDK.

## The 11 primitives

```tsx
import {
  Canvas, Slice, Region, Device,    // structure
  Bg, Shape, Card,                  // visuals
  Title, Subtitle, Eyebrow, Caption,// typography
  Highlight,                        // inline decorator
  Stack, Row, Positioned,           // layout helpers
} from "react-shot";
```

One composition is a tree of these. There is **no** parallel component library — do not invent `CampaignSlide`, `ScreenshotBreakout`, `StoryBadge`, `HeroHeadlineBlock`, `ProofStrip`, `GlassCard`, etc. Those belonged to the v0.1 API and were removed.

See `references/primitives.md` for each prop signature and minimal example.

## Composition skeleton

Always start here. Swap content per slice; keep the shape.

```tsx
import type { CompositionProps, DeviceVariant } from "react-shot";
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
      {/* …slices 1..4 with the same shape */}
    </Canvas>
  );
}
```

Key invariants:

- `<Canvas slices={N}>` — N is independent of preset. `<Canvas slices={4}>` and `<Canvas slices={6}>` both work with `appstore`.
- A Slice almost always holds two Regions: one `anchor="middle"` for text, one `anchor="bottom" overflow={0.12}` for the Device.
- `overflow` on the device region bleeds it past the safe area; the sibling middle region auto-reserves bottom padding so stat rails don't kiss the frame.

## Copy rules (strict)

The whole set must read as one rhythm. Follow these without asking:

- **Title**: fixed **2 lines**, split with a single `<br />`. 4–7 words total. Put an action verb on line 1, an outcome on line 2. The second line must carry a `<Highlight>`.
- **Subtitle**: fixed **1 line**, 50–80 characters. Conversational, benefit-first. Never a feature list.
- **Keep length similar across slices**. ±6 chars per title line, ±15 chars for subtitles. Eyes should glide, not jump.
- **Eyebrow**: 1–3 words. Category, stat, or persona (e.g. "Ages 6–12", "7 personas", "Free for 14 days").

Before submitting a composition, eyeball all 5 slices together — if one line wraps unexpectedly or a subtitle runs to 110 chars, rewrite before touching the layout.

Full examples + rewrites: `references/copy-rules.md`.

## Bg pattern cookbook

Pick one pattern per slice. Vary across slices so the set feels like a set.

| Pattern | When to reach for it |
|---|---|
| `dots` | Light minimal, product-page calm |
| `grid` | Engineering / utility / data-dense |
| `stripes` | Posters, signage, retail energy |
| `zigzag` | Playful but sharp (kids, gaming) |
| `waves` | Editorial / premium / lifestyle |
| `diagonal` | Bold, blocky two-tone |
| `gradient` | Soft hero moments |
| `mesh` | Painterly hero (4-corner blobs) |
| `noise` | Paper-grain backgrounds |
| `solid` | The strongest type moments |
| `image` | Photo-led compositions |

Use `<Bg dots={{ bg, color, size, dotRadius, opacity }} />` shorthands. All pattern values scale automatically via stage tokens — don't hardcode px.

## Device variants

Pass at Canvas level; override per instance if needed:

- `iphone-16-pro` (default) — pair with `appstore` preset
- `ipad-pro-13` — pair with `appstoreIPad` preset
- Others: `ipad-mini`, `macbook-pro`, `apple-watch`, `vision-pro`, `android-phone`, `pixel`, `galaxy`, `browser`, `desktop`, `tv`

Typography scales off the device width (not the slice width) via stage tokens, so iPhone vs iPad compositions look the same size *relative to the device* — no manual padding tweaks.

**Do not rotate or 3D-tilt devices.** The SDK previously exposed `tilt` / `rotate` props on `<Device>`; they were removed for a reason. Keep devices straight.

## Export

```bash
react-shot export hero                  # single locale, single device
react-shot export hero --locale tr
react-shot export hero --device ipad
react-shot export hero --all            # every locale × device
react-shot export hero --store          # write to deviceFolders/
```

Config in `react-shot.config.ts` drives `outputDir` and `deviceFolders`. See `references/export.md` for the full pipeline (Puppeteer → Sharp slice).

## Common mistakes (do not make these)

- ❌ Importing `CampaignSlide`, `ScreenshotBreakout`, `StoryBadge`, `HeroHeadlineBlock`, `ProofStrip`, `GlassCard`, `NeonCard`, `FloatingCard`, `SolidBg`, `GradientBg`, `Circle`, `Ring`. These do not exist in this SDK.
- ❌ Rotating or 3D-tilting the device.
- ❌ 3-line titles or two-line subtitles.
- ❌ Hardcoding `fontSize`, `padding`, `gap` when tokens/regions would cover it.
- ❌ Using `appstoreIOS4` / `appstoreIOS6` constants — they're gone. Use `<Canvas slices={N}>`.
- ❌ Placing an overlay `<Card>` with `y` values under ~10% — it'll kiss the device bezel.

## Repo

`https://github.com/codixus/react-shot`
