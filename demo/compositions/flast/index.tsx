import type { CompositionProps, DeviceVariant } from "react-shot";
import { Canvas, Slice, Region, Device, Bg, Eyebrow, Title, Subtitle, Caption, Highlight, Stack, Row } from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

// Flast palette — pure monochrome, straight from frontend/app/app.css.
const INK = "#000000";
const PAPER = "#F8F8F7";
const STONE = "#ECEBE9";
const LINE = "#D0D0D0";
const MUTED = "#666666";
const NIGHT = "#272728";
const NIGHT_LINE = "#363537";

const base = "/assets/screenshots/flast";

/**
 * Flast — your AI companion that makes you better.
 *
 * Monochrome by design. No accent hues, no emoji chips, no em dashes.
 * Restrained voice — honest over validating, benefit over feature.
 */
export default function FlastComposition({ device = "iphone-16-pro", showSliceGuides = false }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;

  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={5} showSliceGuides={showSliceGuides}>
      {/* 1 · Hook — companion intro */}
      <Slice index={0} bg={<Bg dots={{ bg: PAPER, color: LINE, size: 28, dotRadius: 1.4, opacity: 0.7 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Your AI companion</Eyebrow>
          <Title color={INK}>
            Honest AI,<br />
            one <Highlight variant="pill" color={INK}>simple chat.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Get feedback you can act on, not validation you don&apos;t need.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/chat.png`} />
        </Region>
      </Slice>

      {/* 2 · Memory — knows you */}
      <Slice index={1} bg={<Bg grid={{ bg: STONE, color: LINE, size: 48, thickness: 1, opacity: 0.6 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Memory</Eyebrow>
          <Title color={INK}>
            It remembers<br />
            <Highlight variant="pill" color={INK}>what matters.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Every conversation builds on the last. Nothing gets lost.</Subtitle>
          <Row gap="sm" justify="center" wrap>
            <Stat value="∞" label="context" />
            <Stat value="24/7" label="recall" />
            <Stat value="100%" label="yours" />
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/search.png`} />
        </Region>
      </Slice>

      {/* 3 · Personas — voices */}
      <Slice index={2} bg={<Bg waves={{ bg: PAPER, color: LINE, size: 52, thickness: 1 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Personas</Eyebrow>
          <Title color={INK}>
            Switch voices,<br />
            <Highlight variant="pill" color={INK}>match the task.</Highlight>
          </Title>
          <Subtitle color={MUTED}>From patient tutor to ruthless editor, pick the tone.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/persona.png`} />
        </Region>
      </Slice>

      {/* 4 · Tools — capabilities */}
      <Slice index={3} bg={<Bg stripes={{ bg: STONE, color: LINE, size: 44, thickness: 1, opacity: 0.7, angle: 135 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Tools</Eyebrow>
          <Title color={INK}>
            Everything<br />
            in <Highlight variant="pill" color={INK}>one chat.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Research, code, design, and ship without switching tabs.</Subtitle>
          <Row gap="xs" wrap justify="center" style={{ maxWidth: "88%" }}>
            <TextChip>Thinking</TextChip>
            <TextChip>Search</TextChip>
            <TextChip>Artifacts</TextChip>
            <TextChip>Image</TextChip>
            <TextChip>Audio</TextChip>
            <TextChip>Video</TextChip>
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/tools.png`} />
        </Region>
      </Slice>

      {/* 5 · Library — saved, dark */}
      <Slice index={4} bg={<Bg dots={{ bg: NIGHT, color: NIGHT_LINE, size: 28, dotRadius: 1.4 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="light">Library</Eyebrow>
          <Title color="#fff">
            Everything saved,<br />
            <Highlight variant="pill" color="#fff" textColor={INK}>always ready.</Highlight>
          </Title>
          <Subtitle color="rgba(255,255,255,0.7)">Chats, drafts, media, and prompts stay searchable.</Subtitle>
          <Row gap="xs" justify="center" wrap style={{ marginTop: 8 }}>
            <DarkTag>Chats</DarkTag>
            <DarkTag>Todos</DarkTag>
            <DarkTag>Media</DarkTag>
            <DarkTag>Prompts</DarkTag>
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/library.png`} frameColor="black" />
        </Region>
      </Slice>
    </Canvas>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Stack
      gap="xs"
      align="center"
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "14px 24px",
        minWidth: 170,
        border: `1px solid ${LINE}`,
      }}
    >
      <Title size={46} color={INK} style={{ lineHeight: 1 }}>{value}</Title>
      <Caption color={MUTED}>{label}</Caption>
    </Stack>
  );
}

function TextChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "10px 18px",
        borderRadius: 999,
        background: "#fff",
        border: `1px solid ${LINE}`,
        color: INK,
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: 0.1,
      }}
    >
      {children}
    </span>
  );
}

function DarkTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "8px 18px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.08)",
        color: "#fff",
        border: `1px solid ${NIGHT_LINE}`,
        fontSize: 22,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}
