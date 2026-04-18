import type { CompositionProps, DeviceVariant } from "react-shot";
import { Canvas, Slice, Region, Device, Bg, Title, Subtitle, Eyebrow, Highlight } from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

const INK = "#0F0F10";
const PAPER = "#F5F3EE";
const ACCENT = "#3C5A40";
const MUTED = "rgba(15,15,16,0.62)";

/**
 * Quiet Premium — a minimal 4-slice set.
 *
 * Device-on-top / text-on-bottom layout. No decorations, no overlays — pure
 * typographic rhythm. 2-line titles, 1-line subtitles.
 */
export default function QuietPremium({ device = "iphone-16-pro", showSliceGuides = false }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;

  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={4} showSliceGuides={showSliceGuides}>
      <Slice index={0} bg={<Bg gradient={{ colors: [PAPER, "#EEE9DF"] }} />}>
        <Region anchor="top" overflow={0.08}>
          <Device scale={0.92} />
        </Region>
        <Region anchor="middle">
          <Eyebrow tone="ghost" accentColor={ACCENT}>Quiet Premium</Eyebrow>
          <Title color={INK}>
            A workspace<br />
            <Highlight variant="color" color={ACCENT}>that stays quiet.</Highlight>
          </Title>
          <Subtitle color={MUTED}>No banners, no nagging — just the writing.</Subtitle>
        </Region>
      </Slice>

      <Slice index={1} bg={<Bg solid={PAPER} />}>
        <Region anchor="top" overflow={0.08}>
          <Device scale={0.92} />
        </Region>
        <Region anchor="middle">
          <Title color={INK}>
            Research and<br />
            <Highlight variant="color" color={ACCENT}>drafts, together.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Everything you read and write lives on the same page.</Subtitle>
        </Region>
      </Slice>

      <Slice index={2} bg={<Bg solid={PAPER} />}>
        <Region anchor="top" overflow={0.08}>
          <Device scale={0.92} />
        </Region>
        <Region anchor="middle">
          <Title color={INK}>
            Ship quietly,<br />
            <Highlight variant="color" color={ACCENT}>save the noise.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Daily digests instead of pings — always on, never loud.</Subtitle>
        </Region>
      </Slice>

      <Slice index={3} bg={<Bg gradient={{ colors: ["#EEE9DF", PAPER] }} />}>
        <Region anchor="top" overflow={0.08}>
          <Device scale={0.92} />
        </Region>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={ACCENT}>Free for 14 days</Eyebrow>
          <Title color={INK}>
            Start with<br />
            <Highlight variant="color" color={ACCENT}>a blank page.</Highlight>
          </Title>
          <Subtitle color={MUTED}>No onboarding tour — write a word and you&apos;re in.</Subtitle>
        </Region>
      </Slice>
    </Canvas>
  );
}
