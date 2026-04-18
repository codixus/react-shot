import type { CompositionProps, DeviceVariant } from "react-shot";
import { Canvas, Slice, Region, Device, Bg, Shape, Positioned, Eyebrow, Title, Subtitle, Highlight, Card } from "react-shot";
import { appstore, appstoreIPad } from "react-shot/presets";

const PINK_LIGHT = "#F8C8EA";
const PINK = "#E347B9";
const TEXT = "#23121E";
const MUTED = "rgba(35,18,30,0.62)";

/**
 * Playful Gifting — e-commerce / lifestyle in pink. Emoji stickers via
 * Positioned, gradient + solid backgrounds, 2-line titles + 1-line subs.
 */
function Emoji({ x, y, icon, size = 120 }: { x: number; y: number; icon: string; size?: number }) {
  return (
    <Positioned x={x} y={y}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          background: "rgba(255,255,255,0.44)",
          boxShadow: "0 16px 40px rgba(35,18,30,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.48,
        }}
      >
        {icon}
      </div>
    </Positioned>
  );
}

export default function PlayfulGifting({ device = "iphone-16-pro", showSliceGuides = false }: CompositionProps) {
  const preset = device === "ipad-pro-13" ? appstoreIPad : appstore;

  return (
    <Canvas preset={preset} device={device as DeviceVariant} slices={5} showSliceGuides={showSliceGuides}>
      {/* 1 · Hook */}
      <Slice
        index={0}
        bg={<Bg gradient={{ colors: [PINK_LIGHT, "#FCDCF0"] }} />}
        decorations={
          <>
            <Shape x={1080} y={100} size={340} color="#FFFFFF" opacity={0.4} blur={36} />
            <Shape x={80} y={2300} size={280} color="#FFFFFF" opacity={0.32} blur={30} />
            <Emoji x={60} y={340} icon="💐" size={140} />
            <Emoji x={1100} y={2400} icon="🫶" size={110} />
          </>
        }
      >
        <Region anchor="middle">
          <Eyebrow tone="dark">Uber Eats</Eyebrow>
          <Title color={TEXT}>
            Date night,<br />
            <Highlight variant="pill" color={PINK}>delivered.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Turn a regular evening into a plan they&apos;ll remember.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 2 · Shift */}
      <Slice
        index={1}
        bg={<Bg solid={PINK} />}
        decorations={
          <>
            <Shape x={1100} y={2200} size={300} color="#FFFFFF" opacity={0.16} blur={34} />
            <Emoji x={1080} y={160} icon="💖" size={130} />
          </>
        }
      >
        <Region anchor="middle">
          <Title color={TEXT}>
            No reservation?<br />
            <Highlight variant="pill" color="#FFFFFF" textColor={TEXT}>No problem.</Highlight>
          </Title>
          <Subtitle color="rgba(35,18,30,0.7)">Order a whole mood from wherever you happen to be.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 3 · Delivery */}
      <Slice
        index={2}
        bg={<Bg solid={PINK_LIGHT} />}
        decorations={
          <>
            <Shape x={1040} y={130} size={260} color="#FFFFFF" opacity={0.32} blur={30} />
            <Emoji x={60} y={2360} icon="🤍" size={110} />
          </>
        }
      >
        <Region anchor="middle">
          <Title color={TEXT}>
            Straight to<br />
            <Highlight variant="italic" color={PINK}>their door.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Dinner, flowers, and a last-minute gift in one pass.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device>
            <Card variant="float" x="44%" y="56%" width="26%" color="rgba(255,255,255,0.96)" textColor={TEXT}>
              <Title size={30}>1 min away</Title>
            </Card>
          </Device>
        </Region>
      </Slice>

      {/* 4 · Sweet */}
      <Slice
        index={3}
        bg={<Bg gradient={{ colors: [PINK, "#C2378F"] }} />}
        decorations={
          <>
            <Shape x={80} y={2280} size={280} color="#FFFFFF" opacity={0.14} blur={32} />
            <Emoji x={1100} y={2380} icon="🍫" size={120} />
          </>
        }
      >
        <Region anchor="middle">
          <Title color={TEXT}>
            A little something,<br />
            <Highlight variant="pill" color="#FFFFFF" textColor={TEXT}>on the way.</Highlight>
          </Title>
          <Subtitle color="rgba(35,18,30,0.72)">Tiny gestures you can send without a big conversation.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>

      {/* 5 · Browse */}
      <Slice
        index={4}
        bg={<Bg solid={PINK_LIGHT} />}
        decorations={
          <>
            <Shape x={80} y={100} size={280} color="#FFFFFF" opacity={0.32} blur={28} />
            <Emoji x={1100} y={2340} icon="💐" size={120} />
          </>
        }
      >
        <Region anchor="middle">
          <Title color={TEXT}>
            Flowers, gifts,<br />
            <Highlight variant="pill" color={PINK}>and more.</Highlight>
          </Title>
          <Subtitle color={MUTED}>Thoughtful picks — the opposite of a generic gift card.</Subtitle>
        </Region>
        <Region anchor="bottom" overflow={0.12}>
          <Device />
        </Region>
      </Slice>
    </Canvas>
  );
}
