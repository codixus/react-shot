import { expect, test, describe } from "bun:test";
import { Shape } from "../Shape";
import { html } from "./testUtils";

describe("<Shape>", () => {
  test("circle (default) is absolute, 50% radius, given color", () => {
    const markup = html(<Shape x={100} y={50} size={200} color="#f00" />);
    expect(markup).toMatch(/position:absolute/);
    expect(markup).toMatch(/left:100px/);
    expect(markup).toMatch(/top:50px/);
    expect(markup).toMatch(/width:200px/);
    expect(markup).toMatch(/height:200px/);
    expect(markup).toMatch(/border-radius:50%/);
    expect(markup).toMatch(/background:#f00/);
  });

  test("ring uses border instead of background", () => {
    const markup = html(<Shape variant="ring" x={0} y={0} size={200} thickness={8} color="#00f" />);
    expect(markup).toMatch(/border:8px solid #00f/);
    expect(markup).toMatch(/background:transparent/);
    expect(markup).toMatch(/border-radius:50%/);
  });

  test("blob uses an organic border-radius pattern", () => {
    const markup = html(<Shape variant="blob" x={0} y={0} size={200} color="#0f0" />);
    expect(markup).toMatch(/border-radius:61% 39% 52% 48%/);
  });

  test("pill respects thickness for height and pill radius", () => {
    const markup = html(<Shape variant="pill" x={10} y={10} size={400} thickness={24} color="#333" />);
    expect(markup).toMatch(/border-radius:9999/);
    expect(markup).toMatch(/height:24px/);
  });

  test("square is a solid rectangle with no border-radius", () => {
    const markup = html(<Shape variant="square" x={0} y={0} size={100} color="#abc" />);
    expect(markup).toMatch(/background:#abc/);
    expect(markup).not.toMatch(/border-radius:/);
  });

  test("blur prop produces a CSS filter", () => {
    const markup = html(<Shape x={0} y={0} size={200} blur={40} />);
    expect(markup).toMatch(/filter:blur\(40px\)/);
  });

  test("no blur = no filter", () => {
    const markup = html(<Shape x={0} y={0} size={200} />);
    expect(markup).not.toMatch(/filter:blur/);
  });

  test("rotate prop applies a transform", () => {
    const markup = html(<Shape variant="square" x={0} y={0} size={100} rotate={45} />);
    expect(markup).toMatch(/transform:rotate\(45deg\)/);
  });

  test("opacity defaults to 0.1 (soft decoration)", () => {
    const markup = html(<Shape x={0} y={0} size={100} />);
    expect(markup).toMatch(/opacity:0\.1/);
  });

  test("pointerEvents:none so shapes never intercept clicks", () => {
    const markup = html(<Shape x={0} y={0} size={100} />);
    expect(markup).toMatch(/pointer-events:none/);
  });
});
