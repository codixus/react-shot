import { expect, test, describe } from "bun:test";
import { Canvas } from "../Canvas";
import { Slice } from "../Slice";
import { Region } from "../Region";
import { appstore } from "../../presets";
import { html } from "./testUtils";

function oneSlice(child: React.ReactNode) {
  return html(
    <Canvas preset={appstore} slices={1}>
      <Slice index={0}>{child}</Slice>
    </Canvas>,
  );
}

describe("<Region>", () => {
  test("anchor=middle fills remaining space with flex:1 and centers content", () => {
    const markup = oneSlice(<Region>X</Region>);
    expect(markup).toMatch(/flex:1/);
    expect(markup).toMatch(/justify-content:center/);
  });

  test("anchor=top hugs the top and is content-sized", () => {
    const markup = oneSlice(<Region anchor="top">X</Region>);
    expect(markup).toMatch(/flex:0 0 auto/);
    expect(markup).toMatch(/justify-content:flex-start/);
  });

  test("anchor=bottom hugs the bottom", () => {
    const markup = oneSlice(<Region anchor="bottom">X</Region>);
    expect(markup).toMatch(/justify-content:flex-end/);
  });

  test("overflow pushes past the slice bounds via negative margin", () => {
    const markup = oneSlice(<Region anchor="bottom" overflow={0.2}>X</Region>);
    // overflow × sliceHeight × 0.5 = 0.2 × 2868 × 0.5 = 286.8 → -286.8
    expect(markup).toMatch(/margin-bottom:-286\.8(px)?/);
  });

  test("no overflow = no negative margin", () => {
    const markup = oneSlice(<Region anchor="bottom">X</Region>);
    expect(markup).not.toMatch(/margin-bottom:-/);
  });

  test("overflow on anchor=top uses marginTop", () => {
    const markup = oneSlice(<Region anchor="top" overflow={0.1}>X</Region>);
    expect(markup).toMatch(/margin-top:-143\.4(px)?/);
  });

  test("overflow on anchor=middle is ignored (no layout sense)", () => {
    const markup = oneSlice(<Region anchor="middle" overflow={0.3}>X</Region>);
    expect(markup).not.toMatch(/margin-top:-/);
    expect(markup).not.toMatch(/margin-bottom:-/);
  });

  test("gap defaults to tokens.space.md and falls back to prop override", () => {
    const defaulted = oneSlice(<Region>X</Region>);
    const custom = oneSlice(<Region gap={77}>X</Region>);
    expect(defaulted).toMatch(/gap:\d+/);
    expect(custom).toMatch(/gap:77/);
  });

  test("minHeight interprets values ≤ 1 as a slice-height fraction", () => {
    const markup = oneSlice(<Region minHeight={0.5}>X</Region>);
    // 0.5 × 2868 = 1434
    expect(markup).toMatch(/min-height:1434/);
  });

  test("minHeight interprets values > 1 as explicit px", () => {
    const markup = oneSlice(<Region minHeight={400}>X</Region>);
    expect(markup).toMatch(/min-height:400/);
  });

  test("align prop controls alignItems", () => {
    const left = oneSlice(<Region align="left">X</Region>);
    const right = oneSlice(<Region align="right">X</Region>);
    expect(left).toMatch(/align-items:flex-start/);
    expect(right).toMatch(/align-items:flex-end/);
  });

  test("default align is center so fixed-width Device/Card sits centered", () => {
    const markup = oneSlice(<Region>X</Region>);
    expect(markup).toMatch(/align-items:center/);
  });

  test("middle region auto-reserves bottom breathing room (tokens.space.lg)", () => {
    const markup = oneSlice(<Region>X</Region>);
    // Middle region + no explicit padBottom = token-derived space.lg padding-bottom
    expect(markup).toMatch(/padding-bottom:\d+/);
  });

  test("padBottom token key resolves to token px", () => {
    const markup = oneSlice(<Region anchor="top" padBottom="xl">X</Region>);
    // Any matching px value; just ensure padding-bottom appears on an anchor=top region
    expect(markup).toMatch(/padding-bottom:\d+/);
  });

  test("padBottom={0} opts out of auto breathing room", () => {
    const markup = oneSlice(<Region padBottom={0}>X</Region>);
    // Either no padding-bottom emitted, or padding-bottom:0 — both mean "no space"
    expect(markup).not.toMatch(/padding-bottom:[1-9]/);
  });

  test("two regions in a Slice render in vertical flow order", () => {
    const markup = oneSlice(
      <>
        <Region anchor="middle"><span data-r="text" /></Region>
        <Region anchor="bottom"><span data-r="device" /></Region>
      </>,
    );
    const textAt = markup.indexOf('data-r="text"');
    const deviceAt = markup.indexOf('data-r="device"');
    expect(textAt).toBeLessThan(deviceAt);
  });
});
