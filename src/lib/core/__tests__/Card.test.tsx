import { expect, test, describe } from "bun:test";
import { Canvas } from "../Canvas";
import { Card } from "../Card";
import { appstore } from "../../presets";
import { html } from "./testUtils";

function inCanvas(el: React.ReactNode) {
  return html(
    <Canvas preset={appstore} slices={1} device="iphone-16-pro">
      {el}
    </Canvas>,
  );
}

describe("<Card>", () => {
  test("defaults to variant=solid", () => {
    const markup = inCanvas(<Card>hi</Card>);
    expect(markup).toMatch(/background:#fff/);
  });

  test("glass variant uses backdrop-filter blur", () => {
    const markup = inCanvas(<Card variant="glass">hi</Card>);
    expect(markup).toMatch(/backdrop-filter:blur\(/);
    expect(markup).toMatch(/rgba\(255,255,255,0\.18\)/);
  });

  test("float variant adds a drop shadow", () => {
    const markup = inCanvas(<Card variant="float" color="#fff">hi</Card>);
    expect(markup).toMatch(/box-shadow:0 18px 50px/);
  });

  test("neon variant uses accent color for glow and border", () => {
    const markup = inCanvas(<Card variant="neon" accentColor="#f0f">hi</Card>);
    expect(markup).toMatch(/box-shadow:0 0 40px #f0f/);
    expect(markup).toMatch(/border:2px solid #f0f/);
  });

  test("outline variant is transparent with an accent border", () => {
    const markup = inCanvas(<Card variant="outline" accentColor="#0f0">hi</Card>);
    expect(markup).toMatch(/background:transparent/);
    expect(markup).toMatch(/border:2px solid #0f0/);
  });

  test("x/y props position the card absolutely", () => {
    const markup = inCanvas(<Card x={120} y={80}>hi</Card>);
    expect(markup).toMatch(/position:absolute/);
    expect(markup).toMatch(/left:120px/);
    expect(markup).toMatch(/top:80px/);
  });

  test("without x/y the card is relative (inline flow)", () => {
    const markup = inCanvas(<Card>hi</Card>);
    expect(markup).toMatch(/position:relative/);
  });

  test("rotate prop applies a CSS transform", () => {
    const markup = inCanvas(<Card rotate={7}>hi</Card>);
    expect(markup).toMatch(/transform:rotate\(7deg\)/);
  });

  test("renders children", () => {
    const markup = inCanvas(<Card>unique-content-token</Card>);
    expect(markup).toMatch(/unique-content-token/);
  });

  test("width and height props pass through to style", () => {
    const markup = inCanvas(<Card width={333} height={444}>hi</Card>);
    expect(markup).toMatch(/width:333px/);
    expect(markup).toMatch(/height:444px/);
  });

  test("x/y accept string CSS values (percentages) for device-relative overlays", () => {
    const markup = inCanvas(<Card x="8%" y="42%" width="60%">hi</Card>);
    expect(markup).toMatch(/left:8%/);
    expect(markup).toMatch(/top:42%/);
    expect(markup).toMatch(/width:60%/);
  });
});
