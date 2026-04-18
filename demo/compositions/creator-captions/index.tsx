import type { CompositionProps, DeviceVariant } from "react-shot";
import { Canvas, Slice, Region, Device, Bg, Eyebrow, Title, Subtitle, Caption, Highlight, Card, Stack, Row } from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

const INK = "#0B0B15";
const PAPER = "#FFF7EF";
const ACCENT = "#FF5733";
const WARM = "#FFB770";
const BLUE = "#2B63FF";
const EMERALD = "#15A86C";
const MUTED = "rgba(11,11,21,0.6)";

const base = "/assets/screenshots/promptjr";

/**
 * Creator Captions — bold, warm, magazine-spread. Mixes patterns, stat rails,
 * and a device-less preset grid. Heavy type with a black-frame device.
 */
export default function CreatorCaptions({ device = "iphone-16-pro", showSliceGuides = false }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;

  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={5} showSliceGuides={showSliceGuides}>
      {/* 1 · Hook — stripes poster */}
      <Slice index={0} bg={<Bg stripes={{ bg: PAPER, color: "#FFD9BE", size: 44, thickness: 3, angle: 45 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={ACCENT}>Captions</Eyebrow>
          <Title color={INK}>
            Captions that<br />
            <Highlight variant="pill" color={ACCENT}>pull viewers</Highlight> in
          </Title>
          <Subtitle color={MUTED}>Auto-timed words that boost retention from the first second.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device frameColor="black" />
        </Region>
      </Slice>

      {/* 2 · Reach — waves + stat trio */}
      <Slice index={1} bg={<Bg waves={{ bg: "#FFEFE1", color: "#FFCFA1", size: 56, thickness: 2 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={WARM}>Reach</Eyebrow>
          <Title color={INK}>
            More views,<br />
            <Highlight variant="pill" color={WARM} textColor="#111">same upload.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Readable captions keep viewers watching — the algorithm notices.</Subtitle>
          <Row gap="sm" justify="center" wrap>
            <Big value="2×" label="reach" tone={ACCENT} />
            <Big value="+38%" label="watch time" tone={EMERALD} />
            <Big value="30+" label="languages" tone={BLUE} />
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device frameColor="black" />
        </Region>
      </Slice>

      {/* 3 · Editor — dots */}
      <Slice index={2} bg={<Bg dots={{ bg: "#FFFBEF", color: "#E7C767", size: 26, dotRadius: 1.6, opacity: 0.8 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Editor</Eyebrow>
          <Title color={INK}>
            Every detail,<br />
            <Highlight variant="color" color={ACCENT}>your call.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Fonts, colors, emphasis and timing — all in one editor.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device frameColor="black" />
        </Region>
      </Slice>

      {/* 4 · Presets — grid, NO device: full-bleed preset card grid */}
      <Slice index={3} bg={<Bg grid={{ bg: PAPER, color: "#E8D7C1", size: 44, thickness: 1 }} />}>
        <Region anchor="top" gap="md" padBottom="md" style={{ paddingTop: 40 }}>
          <Eyebrow tone="accent" accentColor={ACCENT}>Preset library</Eyebrow>
          <Title color={INK}>
            Nine looks,<br />
            <Highlight variant="color" color={ACCENT}>one tap each.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Brand-ready styles you can drop onto any clip.</Subtitle>
        </Region>
        <Region anchor="middle" padBottom={0}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 28,
              width: "100%",
            }}
          >
            {[
              { bg: "#FFFFFF", label: "Clean", color: "#111" },
              { bg: "#F5C51D", label: "Bold", color: "#111" },
              { bg: "#262626", label: "Dark", color: "#FFF" },
              { bg: "#FF5733", label: "Fire", color: "#FFF" },
              { bg: "#255FE8", label: "Ocean", color: "#FFF" },
              { bg: "#0CCF86", label: "Fresh", color: "#111" },
              { bg: "#783AF6", label: "Neon", color: "#FFF" },
              { bg: "#F71748", label: "Punch", color: "#FFF" },
              { bg: "#111111", label: "Minimal", color: "#888" },
            ].map((item) => (
              <Card
                key={item.label}
                variant="float"
                color={item.bg}
                textColor={item.color}
                height={260}
                style={{ display: "flex", alignItems: "flex-end", fontSize: 40, fontWeight: 900, letterSpacing: -0.8 }}
              >
                {item.label}
              </Card>
            ))}
          </div>
        </Region>
      </Slice>

      {/* 5 · Transcription — zigzag */}
      <Slice index={4} bg={<Bg zigzag={{ bg: "#FFF3E6", color: "#FFC08A", size: 30, thickness: 2 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={ACCENT}>AI Transcription</Eyebrow>
          <Title color={INK}>
            Perfect timing,<br />
            <Highlight variant="pill" color={WARM} textColor="#111">in seconds.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Upload, confirm, publish — the AI handles the rest.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device frameColor="black" />
        </Region>
      </Slice>
    </Canvas>
  );
}

function Big({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <Stack gap="xs" align="center" style={{ background: "#fff", borderRadius: 20, padding: "14px 26px", minWidth: 170 }}>
      <Title size={52} color={tone} style={{ lineHeight: 1 }}>{value}</Title>
      <Caption color={MUTED}>{label}</Caption>
    </Stack>
  );
}
