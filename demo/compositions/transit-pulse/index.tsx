import type { CompositionProps, DeviceVariant } from "react-shot";
import { Canvas, Slice, Region, Device, Bg, Eyebrow, Title, Subtitle, Caption, Highlight, Stack, Row } from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

const INK = "#082029";
const PAPER = "#F3F7F4";
const GREEN = "#0FA958";
const BLUE = "#2F6FEE";
const AMBER = "#F59E0B";
const RED = "#E8453E";
const MUTED = "rgba(8,32,41,0.62)";

const base = "/assets/screenshots/promptjr";

/**
 * Transit Pulse — signage-style utility. Light patterns, bright single accents
 * per slice, route-pill stat rows. Every slice reads like a departure board.
 */
export default function TransitPulse({ device = "iphone-16-pro", showSliceGuides = false }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;

  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={5} showSliceGuides={showSliceGuides}>
      {/* 1 · Hook — diagonal stripes */}
      <Slice index={0} bg={<Bg stripes={{ bg: PAPER, color: "#CDE4D5", size: 40, thickness: 2, angle: 135 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={GREEN}>Transit</Eyebrow>
          <Title color={INK}>
            Move with<br />
            <Highlight variant="pill" color={GREEN}>confidence.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Subway, bus, and rail — one glance, one next move.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 2 · Departures — grid + live pills */}
      <Slice index={1} bg={<Bg grid={{ bg: "#FFFAEB", color: "#F1D98A", size: 48, thickness: 1 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={AMBER}>Right now</Eyebrow>
          <Title color={INK}>
            Leaving now,<br />
            <Highlight variant="pill" color={AMBER}>right here.</Highlight>
          </Title>
          <Subtitle color={MUTED}>See what&apos;s departing before you even start walking.</Subtitle>
          <Row gap="xs" justify="center" wrap>
            <RoutePill color={GREEN}>7 min · M</RoutePill>
            <RoutePill color={BLUE}>12 min · 2</RoutePill>
            <RoutePill color={AMBER}>15 min · B42</RoutePill>
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 3 · Best route — dots */}
      <Slice index={2} bg={<Bg dots={{ bg: "#EFF4FE", color: BLUE, size: 28, dotRadius: 1.6, opacity: 0.3 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={BLUE}>Best route</Eyebrow>
          <Title color={INK}>
            Your next move,<br />
            <Highlight variant="pill" color={BLUE}>first.</Highlight>
          </Title>
          <Subtitle color={MUTED}>One recommendation — not a wall of identical routes.</Subtitle>
          <Row gap="sm" justify="center">
            <Stat label="duration" value="1h 18m" tone={INK} />
            <Stat label="transfers" value="2" tone={BLUE} />
            <Stat label="score" value="4.8" tone={GREEN} />
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 4 · Live — waves */}
      <Slice index={3} bg={<Bg waves={{ bg: "#FEEDEB", color: "#F3B8B2", size: 56, thickness: 2 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={RED}>Live</Eyebrow>
          <Title color={INK}>
            Track your bus,<br />
            <Highlight variant="pill" color={RED}>in real time.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Watch it move before you step out the door.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 5 · Alerts — zigzag */}
      <Slice index={4} bg={<Bg zigzag={{ bg: "#F6F3EC", color: "#D9D1BE", size: 32, thickness: 2 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="dark">Alerts</Eyebrow>
          <Title color={INK}>
            Service changes,<br />
            <Highlight variant="pill" color={RED}>before they hit.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Status, skipped stops, and outages — one place, one tap.</Subtitle>
          <Row gap="xs" justify="center" wrap>
            <RoutePill color={GREEN}>Subway</RoutePill>
            <RoutePill color={BLUE}>Bus</RoutePill>
            <RoutePill color={AMBER}>Rail</RoutePill>
            <RoutePill color={RED}>Alerts</RoutePill>
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>
    </Canvas>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <Stack gap="xs" align="center" style={{ background: "#fff", borderRadius: 18, padding: "14px 26px", minWidth: 160 }}>
      <Title size={44} color={tone} style={{ lineHeight: 1 }}>{value}</Title>
      <Caption color={MUTED}>{label}</Caption>
    </Stack>
  );
}

function RoutePill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "10px 20px",
        borderRadius: 999,
        background: "#fff",
        border: `2px solid ${color}`,
        color,
        fontSize: 26,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: 0.2,
      }}
    >
      {children}
    </span>
  );
}
