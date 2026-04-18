import { expect, test, describe } from "bun:test";
import { Canvas, Slice, Region, Device, Bg, Shape, Card, Title, Subtitle, Eyebrow, Highlight } from "../../core";
import { appstore, appstoreIPad } from "../../presets";
import { Positioned } from "../Positioned";
import { html } from "./testUtils";

describe("integration — a full 5-slice composition", () => {
  function Composition({ slices = 5, device = "iphone-16-pro" as const, preset = appstore }) {
    return (
      <Canvas preset={preset} slices={slices} device={device}>
        {Array.from({ length: slices }).map((_, i) => (
          <Slice key={i} index={i} bg={<Bg solid="#050505" />} decorations={<Shape x={100} y={100} size={200} color="#15C064" />}>
            <Region anchor="middle">
              <Eyebrow tone="accent" accentColor="#15C064">Slice {i}</Eyebrow>
              <Title color="#fff">
                Move with <Highlight variant="pill" color="#15C064">confidence</Highlight>
              </Title>
              <Subtitle color="rgba(255,255,255,0.65)">Subway, bus, and rail.</Subtitle>
            </Region>
            <Region anchor="bottom" overflow={0.12}>
              <Device screenshot={`/s${i}.png`}>
                <Card variant="glass" x={40} y={400}>Overlay</Card>
              </Device>
            </Region>
          </Slice>
        ))}
      </Canvas>
    );
  }

  test("renders without throwing for slice counts 3, 4, 5, 6", () => {
    for (const n of [3, 4, 5, 6]) {
      expect(() => html(<Composition slices={n} />)).not.toThrow();
    }
  });

  test("each slice's screenshot image is present in output", () => {
    const markup = html(<Composition slices={5} />);
    for (let i = 0; i < 5; i++) {
      expect(markup).toMatch(new RegExp(`/s${i}\\.png`));
    }
  });

  test("canvas width reflects the slice count", () => {
    const five = html(<Composition slices={5} />);
    const four = html(<Composition slices={4} />);
    expect(five).toMatch(/width:6600px/); // 1320 × 5
    expect(four).toMatch(/width:5280px/); // 1320 × 4
  });

  test("switching to iPad device + preset renders the iPad canvas size", () => {
    const markup = html(<Composition preset={appstoreIPad} device="ipad-pro-13" />);
    expect(markup).toMatch(/width:10320px/); // 2064 × 5
    expect(markup).toMatch(/height:2752px/);
  });

  test("iPad run still carries all 5 screenshots", () => {
    const markup = html(<Composition preset={appstoreIPad} device="ipad-pro-13" />);
    for (let i = 0; i < 5; i++) {
      expect(markup).toMatch(new RegExp(`/s${i}\\.png`));
    }
  });

  test("text region sits above device region in source order", () => {
    const markup = html(<Composition slices={1} />);
    const subtitleAt = markup.indexOf("Subway, bus, and rail.");
    // React 19 emits a <link rel="preload"> at the top; strip that before
    // searching for the actual <img> so we measure true render order.
    const stripped = markup.replace(/<link[^>]+>/g, "");
    const imgAt = stripped.indexOf("<img");
    expect(subtitleAt).toBeGreaterThan(-1);
    expect(imgAt).toBeGreaterThan(subtitleAt);
  });

  test("overflow bleed appears as margin-bottom on bottom regions", () => {
    const markup = html(<Composition slices={1} />);
    expect(markup).toMatch(/margin-bottom:-/);
  });

  test("safe-area padding applied by every Slice", () => {
    const markup = html(<Composition slices={3} />);
    const matches = markup.match(/padding:140px 90px 90px 90px/g) ?? [];
    expect(matches.length).toBe(3);
  });
});

describe("regression — known-bad patterns from the design phase", () => {
  test("slice count is independent of preset (no need for appstoreIOS4 vs IOS6 constants)", () => {
    const four = html(
      <Canvas preset={appstore} slices={4}>
        <Slice index={0}><div /></Slice>
      </Canvas>,
    );
    const six = html(
      <Canvas preset={appstore} slices={6}>
        <Slice index={0}><div /></Slice>
      </Canvas>,
    );
    expect(four).toMatch(/width:5280px/);
    expect(six).toMatch(/width:7920px/);
  });

  test("Region's middle anchor provides auto-centering — no manual marginTop needed", () => {
    const markup = html(
      <Canvas preset={appstore} slices={1}>
        <Slice index={0}>
          <Region anchor="middle">
            <Title>Hello</Title>
          </Region>
        </Slice>
      </Canvas>,
    );
    // flex:1 + justify-content:center on the region = auto-center remaining space.
    expect(markup).toMatch(/flex:1/);
    expect(markup).toMatch(/justify-content:center/);
  });

  test("tokens expose spacing so components don't need hardcoded gap:12 / padding:28", () => {
    const markup = html(
      <Canvas preset={appstore} slices={1}>
        <Slice index={0}>
          <Region>
            <Title>x</Title>
            <Subtitle>y</Subtitle>
          </Region>
        </Slice>
      </Canvas>,
    );
    // gap value comes from tokens.space.md, not a magic 20.
    expect(markup).toMatch(/gap:\d+/);
  });

  test("Positioned helper still works for escape-hatch overlays", () => {
    const markup = html(
      <Canvas preset={appstore} slices={1}>
        <Slice index={0} decorations={<Positioned x={500} y={200}><span data-role="emoji">🫶</span></Positioned>}>
          <Region>x</Region>
        </Slice>
      </Canvas>,
    );
    expect(markup).toMatch(/left:500px/);
    expect(markup).toMatch(/top:200px/);
    expect(markup).toMatch(/🫶/);
  });
});
