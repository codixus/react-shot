# Primitives reference

All exported from `"react-shot"`. Types come from `"react-shot"` or `"react-shot/types"`.

## `<Canvas>` — root

```tsx
<Canvas
  preset={appstore}            // required: { width, height, safeArea? }
  device="iphone-16-pro"        // default variant for children <Device>
  slices={5}                    // number of screenshots — independent of preset
  deviceWidth={1030}            // optional override; defaults to preset.width × spec.naturalFit
  showSliceGuides={false}       // toggles visual slice + safe-area guides
>
```

Provides a StageContext with `{ preset, slices, sliceWidth, sliceHeight, safeArea, device, deviceWidth, deviceHeight, tokens }`.

## `<Slice index>` — one screenshot

```tsx
<Slice
  index={0}
  bg={<Bg dots={{ bg: "#fff", color: "#eee" }} />}   // absolute behind content
  decorations={<Shape x={100} y={100} size={200} />} // absolute above bg, below content
  align="center"                                      // left | center | right
  bleed={false}                                       // true disables safeArea padding
>
  {/* usually two <Region>s */}
</Slice>
```

Each Slice is positioned at `left = index * sliceWidth`. Width is `preset.width`, height is `preset.height`.

## `<Region>` — vertical zone inside a Slice

```tsx
<Region
  anchor="middle"     // top | middle | bottom (default middle = fills space, centers)
  overflow={0.12}     // fraction of slice height to bleed past anchor edge
  align="center"      // left | center | right — horizontal alignment of children
  gap={20}            // child spacing (default: tokens.space.md)
  minHeight={0.4}     // 0..1 = fraction of slice height; >1 = px
  padBottom="lg"      // reserved bottom space; middle regions auto-add space.lg
>
```

`anchor="middle"` is the default — fills remaining space with `flex: 1` and centers content.

## `<Device screenshot>`

```tsx
<Device
  screenshot="/assets/screenshots/app/home.png"  // required
  variant="iphone-16-pro"                         // override stage default
  frameColor="white"                              // titanium | black | white | silver | (string)
  width={500}                                     // override computed device width
  scale={0.92}                                    // scale the computed width
  noShadow={false}                                // drops the default frame shadow
>
  {/* optional absolute overlays — NOT shadowed by the frame filter */}
  <Card x="6%" y="60%" width="60%">…</Card>
</Device>
```

## `<Bg>` — background layer

Shorthands (pick one):

```tsx
<Bg solid="#050505" />
<Bg gradient={{ colors: ["#000", "#222"], direction: "to bottom", kind: "linear" }} />
<Bg mesh={{ colors: ["#f00","#0f0","#00f","#ff0"] }} />
<Bg image={{ src: "/hero.jpg", fit: "cover", position: "center" }} />
<Bg noise={{ base: "#F5F3EE", intensity: 0.06 }} />
<Bg dots={{ bg: "#fff", color: "#000", size: 28, dotRadius: 1.6, opacity: 0.6 }} />
<Bg grid={{ bg: "#fff", color: "#000", size: 40, thickness: 1, opacity: 0.5 }} />
<Bg stripes={{ bg: "#fff", color: "#f00", size: 24, thickness: 2, angle: 45 }} />
<Bg zigzag={{ bg: "#fff", color: "#000", size: 24, thickness: 2 }} />
<Bg waves={{ bg: "#fff", color: "#000", size: 40, thickness: 2 }} />
<Bg diagonal={{ colors: ["#111", "#fff"], size: 48 }} />
```

## `<Shape>` — decorative primitive

```tsx
<Shape
  variant="circle"   // circle | ring | blob | pill | square (default: circle)
  x={100} y={100}    // absolute within its Slice
  size={300}
  thickness={12}     // ring stroke / pill height
  color="#3D3BFF"
  opacity={0.2}
  blur={60}
  rotate={0}
/>
```

`pointer-events: none` — never intercepts clicks.

## `<Card>` — overlay surface

```tsx
<Card
  variant="float"    // solid | glass | float | neon | outline
  x="6%" y="48%"     // number (px) or string (%) for device-relative overlays
  width="60%"
  height={200}
  color="#fff"
  textColor="#111"
  accentColor="#3D3BFF"  // neon / outline border color
  rotate={0}
>
  …
</Card>
```

Avoid `rotate` — it produced awkward 3D-looking results in the demo pass and was de-emphasized.

## Typography — `Title`, `Subtitle`, `Eyebrow`, `Caption`

All four read from `tokens.fontSize.*`. Override with `size` only when necessary.

```tsx
<Eyebrow tone="accent" accentColor="#f00">Label</Eyebrow>
<Title color="#111">
  Top line<br />
  <Highlight variant="pill" color="#f00">bottom line</Highlight>
</Title>
<Subtitle color="rgba(0,0,0,0.6)">One-line benefit statement.</Subtitle>
<Caption color="rgba(0,0,0,0.55)">Small note</Caption>
```

`Eyebrow` tones: `light | dark | accent | ghost`.

## `<Highlight>` — inline text decorator

```tsx
<Highlight variant="pill" color="#f00" textColor="#fff">word</Highlight>
<Highlight variant="color" color="#f00">word</Highlight>
<Highlight variant="underline" color="#f00" underlineHeight={12}>word</Highlight>
<Highlight variant="italic" color="#f00">word</Highlight>
<Highlight variant="stroke" color="#f00" strokeWidth={3}>word</Highlight>
```

## Layout helpers — `Stack`, `Row`, `Positioned`

```tsx
<Stack gap="md" align="center">…</Stack>     // flex column
<Row gap="sm" justify="center" wrap>…</Row>  // flex row
<Positioned x={100} y={200} rotate={0}>…</Positioned>  // absolute helper
```

`gap` accepts token keys (`xs|sm|md|lg|xl|xxl`) or a number in px.

## Presets

```tsx
import { appstore, appstoreIPad, playstore, socialInstagram, socialTwitter } from "react-shot/presets";
```

Each is `{ name, width, height, safeArea }`. No `slices` on the preset — that's a Canvas prop.
