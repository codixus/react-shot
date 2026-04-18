import type { CompositionProps, DeviceVariant } from "react-shot";
import { Canvas, Slice, Region, Device, Bg, Positioned, Eyebrow, Title, Subtitle, Caption, Highlight, Stack, Row } from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

const PURPLE = "#6C4DFF";
const INK = "#1B1145";
const PINK = "#FF72B1";
const ORANGE = "#FF9B3D";
const GREEN = "#30CE88";
const MUTED = "rgba(27,17,69,0.62)";

const base = "/assets/screenshots/promptjr";

/**
 * PromptJr — gamified AI learning for kids. Light, playful, sticker-forward.
 *
 * Copy rhythm: every slice holds a 2-line title + 1-line subtitle. Each
 * slice swaps pattern and accent so the set feels like a set, not a sample.
 */
export default function PromptJrComposition({ device = "iphone-16-pro", showSliceGuides = false }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;

  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={5} showSliceGuides={showSliceGuides}>
      {/* 1 · Hook — dots + astronaut */}
      <Slice index={0} bg={<Bg dots={{ bg: "#F4F0FF", color: PURPLE, size: 30, dotRadius: 2, opacity: 0.26 }} />}>
        <Positioned x={1040} y={160}>
          <Sticker size={160}>👩‍🚀</Sticker>
        </Positioned>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={PURPLE}>Ages 6–12</Eyebrow>
          <Title color={INK}>
            Discover AI,<br />
            <Highlight variant="pill" color={PURPLE}>one prompt</Highlight> at a time
          </Title>
          <Subtitle color={MUTED}>Quests, streaks, and real prompts — built for curious kids.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/home.png`} />
        </Region>
      </Slice>

      {/* 2 · Academy — stripes + three-stat rail */}
      <Slice index={1} bg={<Bg stripes={{ bg: "#FFF4E3", color: "#FFDDB3", size: 48, thickness: 2, angle: 135 }} />}>
        <Positioned x={80} y={240}>
          <Sticker size={140}>🚀</Sticker>
        </Positioned>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={ORANGE}>Academy</Eyebrow>
          <Title color={INK}>
            Ten-minute<br />
            <Highlight variant="pill" color={ORANGE}>quests,</Highlight> every day
          </Title>
          <Subtitle color={MUTED}>Short missions that stick — new words, new tools, every time.</Subtitle>
          <Row gap="sm" justify="center" wrap>
            <StatBadge value="6" label="lessons" tone={ORANGE} />
            <StatBadge value="★ ★ ★" label="to master" tone={PURPLE} />
            <StatBadge value="5 min" label="each" tone={GREEN} />
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/academy.png`} />
        </Region>
      </Slice>

      {/* 3 · Quiz — waves */}
      <Slice index={2} bg={<Bg waves={{ bg: "#EFFBF3", color: "#B7E8C8", size: 50, thickness: 2 }} />}>
        <Positioned x={1040} y={200}>
          <Sticker size={140}>🧠</Sticker>
        </Positioned>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={GREEN}>Quick Quiz</Eyebrow>
          <Title color={INK}>
            Three taps<br />
            <Highlight variant="pill" color={GREEN}>to get it</Highlight> right
          </Title>
          <Subtitle color={MUTED}>Answer, see the why, keep moving — no busywork, no grade.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/quiz.png`} />
        </Region>
      </Slice>

      {/* 4 · Playground — grid */}
      <Slice index={3} bg={<Bg grid={{ bg: "#FFF6EC", color: "#F0D9B6", size: 44, thickness: 1, opacity: 0.8 }} />}>
        <Positioned x={80} y={220}>
          <Sticker size={130}>🐱</Sticker>
        </Positioned>
        <Positioned x={1100} y={250}>
          <Sticker size={120}>🌈</Sticker>
        </Positioned>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={PINK}>Playground</Eyebrow>
          <Title color={INK}>
            Prompt it.<br />
            <Highlight variant="pill" color={PINK}>See</Highlight> what happens.
          </Title>
          <Subtitle color={MUTED}>Safe, guided creations — from story worlds to math scenes.</Subtitle>
          <PromptBubble>&ldquo;A pink cat on a rainbow cloud&rdquo;</PromptBubble>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/playground.png`} />
        </Region>
      </Slice>

      {/* 5 · Parent — zigzag + family stats */}
      <Slice index={4} bg={<Bg zigzag={{ bg: "#F1ECFF", color: "#D8CBFF", size: 28, thickness: 2 }} />}>
        <Region anchor="middle">
          <Eyebrow tone="accent" accentColor={PURPLE}>For families</Eyebrow>
          <Title color={INK}>
            Parents stay<br />
            <Highlight variant="pill" color={PURPLE}>quietly</Highlight> in the loop
          </Title>
          <Subtitle color={MUTED}>Weekly progress and prompt history — no over-the-shoulder needed.</Subtitle>
          <Row gap="sm" justify="center" wrap>
            <StatBadge value="122" label="XP / week" tone={PURPLE} />
            <StatBadge value="3 🔥" label="day streak" tone={PINK} />
            <StatBadge value="4/50" label="badges" tone={GREEN} />
          </Row>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device screenshot={`${base}/parent.png`} />
        </Region>
      </Slice>
    </Canvas>
  );
}

function Sticker({ children, size = 120 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 14px 36px rgba(27,17,69,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.55,
      }}
    >
      {children}
    </div>
  );
}

function StatBadge({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <Stack gap="xs" align="center" style={{ background: "#fff", padding: "14px 22px", borderRadius: 20, minWidth: 160, boxShadow: "0 6px 16px rgba(27,17,69,0.08)" }}>
      <Title size={44} color={tone} style={{ lineHeight: 1 }}>{value}</Title>
      <Caption color="rgba(27,17,69,0.58)">{label}</Caption>
    </Stack>
  );
}

function PromptBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 999,
        padding: "14px 28px",
        fontSize: 28,
        fontWeight: 700,
        color: "#1B1145",
        boxShadow: "0 8px 24px rgba(27,17,69,0.1)",
        marginTop: 6,
      }}
    >
      {children}
    </div>
  );
}
