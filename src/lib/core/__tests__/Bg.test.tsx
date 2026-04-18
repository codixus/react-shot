import { expect, test, describe } from "bun:test";
import { Bg } from "../Bg";
import { html } from "./testUtils";

describe("<Bg>", () => {
  test("solid shorthand renders a background-color", () => {
    const markup = html(<Bg solid="#123456" />);
    expect(markup).toMatch(/background-color:#123456/);
  });

  test("solid is absolute and fills inset:0", () => {
    const markup = html(<Bg solid="#000" />);
    expect(markup).toMatch(/position:absolute/);
    expect(markup).toMatch(/inset:0/);
  });

  test("gradient shorthand renders a linear-gradient by default", () => {
    const markup = html(<Bg gradient={{ colors: ["#000", "#fff"] }} />);
    expect(markup).toMatch(/linear-gradient\(to bottom, #000, #fff\)/);
  });

  test("gradient direction is configurable", () => {
    const markup = html(<Bg gradient={{ colors: ["#a", "#b"], direction: "to right" }} />);
    expect(markup).toMatch(/to right, #a, #b/);
  });

  test("gradient kind=radial produces a radial gradient", () => {
    const markup = html(<Bg gradient={{ colors: ["#000", "#fff"], kind: "radial" }} />);
    expect(markup).toMatch(/radial-gradient/);
  });

  test("gradient kind=conic produces a conic gradient", () => {
    const markup = html(<Bg gradient={{ colors: ["#000", "#fff"], kind: "conic", direction: "0deg" }} />);
    expect(markup).toMatch(/conic-gradient\(from 0deg/);
  });

  test("image shorthand produces a url() background", () => {
    const markup = html(<Bg image={{ src: "/x.png" }} />);
    expect(markup).toMatch(/url\(\/x\.png\)/);
  });

  test("image fit defaults to cover and position to center", () => {
    const markup = html(<Bg image={{ src: "/x.png" }} />);
    expect(markup).toMatch(/background-size:cover/);
    expect(markup).toMatch(/background-position:center/);
  });

  test("mesh produces four stacked radial gradients", () => {
    const markup = html(<Bg mesh={{ colors: ["#111", "#222", "#333", "#444"] }} />);
    expect(markup).toMatch(/radial-gradient\(at 20% 10%,\s*#111/);
    expect(markup).toMatch(/radial-gradient\(at 80% 10%,\s*#222/);
    expect(markup).toMatch(/radial-gradient\(at 20% 90%,\s*#333/);
    expect(markup).toMatch(/radial-gradient\(at 80% 90%,\s*#444/);
  });

  test("noise embeds an SVG turbulence filter over the base color", () => {
    const markup = html(<Bg noise={{ base: "#eee" }} />);
    expect(markup).toMatch(/background-color:#eee/);
    expect(markup).toMatch(/feTurbulence/);
  });

  test("falls back to white when no shorthand is supplied", () => {
    const markup = html(<Bg />);
    expect(markup).toMatch(/background-color:#fff/);
  });

  test("tagged variant prop produces the same output as shorthand", () => {
    const shorthand = html(<Bg solid="#abc" />);
    const tagged = html(<Bg variant={{ type: "solid", color: "#abc" }} />);
    expect(shorthand).toBe(tagged);
  });

  describe("patterns", () => {
    test("dots embeds an SVG circle pattern", () => {
      const markup = html(<Bg dots={{ bg: "#fff", color: "#000" }} />);
      expect(markup).toMatch(/background-color:#fff/);
      expect(markup).toMatch(/data:image\/svg\+xml/);
      expect(markup).toMatch(/circle/);
    });

    test("dots opts: size and radius affect the tiled SVG", () => {
      const markup = html(<Bg dots={{ bg: "#fff", color: "#000", size: 50, dotRadius: 3 }} />);
      expect(markup).toMatch(/background-size:50px 50px/);
    });

    test("grid renders a path-based stroke pattern", () => {
      const markup = html(<Bg grid={{ bg: "#fff", color: "#000" }} />);
      expect(markup).toMatch(/stroke=/);
    });

    test("stripes use repeating-linear-gradient", () => {
      const markup = html(<Bg stripes={{ bg: "#fff", color: "#f00" }} />);
      expect(markup).toMatch(/repeating-linear-gradient/);
    });

    test("stripes angle is configurable", () => {
      const markup = html(<Bg stripes={{ bg: "#fff", color: "#f00", angle: 90 }} />);
      expect(markup).toMatch(/repeating-linear-gradient\(90deg/);
    });

    test("zigzag embeds a polyline SVG", () => {
      const markup = html(<Bg zigzag={{ bg: "#fff", color: "#000" }} />);
      expect(markup).toMatch(/data:image\/svg\+xml/);
    });

    test("waves embed a wavy path SVG", () => {
      const markup = html(<Bg waves={{ bg: "#fff", color: "#000" }} />);
      expect(markup).toMatch(/data:image\/svg\+xml/);
    });

    test("diagonal two-tone uses repeating gradient", () => {
      const markup = html(<Bg diagonal={{ colors: ["#111", "#fff"] }} />);
      expect(markup).toMatch(/repeating-linear-gradient/);
      expect(markup).toMatch(/#111/);
      expect(markup).toMatch(/#fff/);
    });
  });
});
