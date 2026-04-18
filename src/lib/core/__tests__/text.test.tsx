import { expect, test, describe } from "bun:test";
import { Canvas } from "../Canvas";
import { Title } from "../text/Title";
import { Subtitle } from "../text/Subtitle";
import { Eyebrow } from "../text/Eyebrow";
import { Caption } from "../text/Caption";
import { Highlight } from "../text/Highlight";
import { appstore, appstoreIPad } from "../../presets";
import { makeTokens } from "../tokens";
import { DEVICE_SPECS } from "../deviceSpecs";
import { html } from "./testUtils";

function inCanvas(el: React.ReactNode, device: "iphone-16-pro" | "ipad-pro-13" = "iphone-16-pro", preset = appstore) {
  return html(
    <Canvas preset={preset} slices={1} device={device}>
      {el}
    </Canvas>,
  );
}

function iphoneTokens() {
  return makeTokens(Math.round(appstore.width * DEVICE_SPECS["iphone-16-pro"].naturalFit));
}

function ipadTokens() {
  return makeTokens(Math.round(appstoreIPad.width * DEVICE_SPECS["ipad-pro-13"].naturalFit));
}

describe("<Title>", () => {
  test("uses tokens.fontSize.title by default", () => {
    const markup = inCanvas(<Title>hi</Title>);
    expect(markup).toMatch(new RegExp(`font-size:${iphoneTokens().fontSize.title}px`));
  });

  test("size prop overrides the token", () => {
    const markup = inCanvas(<Title size={77}>hi</Title>);
    expect(markup).toMatch(/font-size:77px/);
  });

  test("iPad Title is larger than iPhone Title", () => {
    const iphone = inCanvas(<Title>x</Title>, "iphone-16-pro", appstore);
    const ipad = inCanvas(<Title>x</Title>, "ipad-pro-13", appstoreIPad);
    const iSize = Number(iphone.match(/font-size:(\d+)px/)![1]);
    const pSize = Number(ipad.match(/font-size:(\d+)px/)![1]);
    expect(pSize).toBeGreaterThan(iSize);
  });

  test("weight defaults to 900 (black) and can be overridden", () => {
    const def = inCanvas(<Title>x</Title>);
    const light = inCanvas(<Title weight={400}>x</Title>);
    expect(def).toMatch(/font-weight:900/);
    expect(light).toMatch(/font-weight:400/);
  });

  test("color defaults to #111", () => {
    const markup = inCanvas(<Title>x</Title>);
    expect(markup).toMatch(/color:#111/);
  });

  test("custom color is applied", () => {
    const markup = inCanvas(<Title color="#abc">x</Title>);
    expect(markup).toMatch(/color:#abc/);
  });

  test("line-height and letter-spacing are applied", () => {
    const markup = inCanvas(<Title>x</Title>);
    expect(markup).toMatch(/line-height:1\.02/);
    expect(markup).toMatch(/letter-spacing:-/);
  });

  test("renders children", () => {
    const markup = inCanvas(<Title>unique-title-content</Title>);
    expect(markup).toMatch(/unique-title-content/);
  });
});

describe("<Subtitle>", () => {
  test("uses tokens.fontSize.subtitle by default", () => {
    const markup = inCanvas(<Subtitle>x</Subtitle>);
    expect(markup).toMatch(new RegExp(`font-size:${iphoneTokens().fontSize.subtitle}px`));
  });

  test("size override works", () => {
    const markup = inCanvas(<Subtitle size={55}>x</Subtitle>);
    expect(markup).toMatch(/font-size:55px/);
  });

  test("default color is a translucent black", () => {
    const markup = inCanvas(<Subtitle>x</Subtitle>);
    expect(markup).toMatch(/rgba\(17,17,17,0\.62\)/);
  });
});

describe("<Eyebrow>", () => {
  test("accent tone uses accentColor as background", () => {
    const markup = inCanvas(<Eyebrow tone="accent" accentColor="#ff0">hi</Eyebrow>);
    expect(markup).toMatch(/background:#ff0/);
  });

  test("dark tone uses a dark translucent background", () => {
    const markup = inCanvas(<Eyebrow tone="dark">hi</Eyebrow>);
    expect(markup).toMatch(/rgba\(0,0,0,0\.82\)/);
  });

  test("ghost tone is transparent with accent text color", () => {
    const markup = inCanvas(<Eyebrow tone="ghost" accentColor="#0af">hi</Eyebrow>);
    expect(markup).toMatch(/background:transparent/);
    expect(markup).toMatch(/color:#0af/);
  });

  test("uses uppercase + wide letter-spacing", () => {
    const markup = inCanvas(<Eyebrow>hi</Eyebrow>);
    expect(markup).toMatch(/text-transform:uppercase/);
    expect(markup).toMatch(/letter-spacing:0\.05/);
  });

  test("pill-shaped radius", () => {
    const markup = inCanvas(<Eyebrow>hi</Eyebrow>);
    expect(markup).toMatch(/border-radius:9999/);
  });
});

describe("<Caption>", () => {
  test("uses tokens.fontSize.caption by default", () => {
    const markup = inCanvas(<Caption>x</Caption>);
    expect(markup).toMatch(new RegExp(`font-size:${iphoneTokens().fontSize.caption}px`));
  });

  test("medium weight by default", () => {
    const markup = inCanvas(<Caption>x</Caption>);
    expect(markup).toMatch(/font-weight:500/);
  });
});

describe("<Highlight>", () => {
  test("underline variant draws a bar below", () => {
    const markup = inCanvas(<Highlight variant="underline" color="#f00">x</Highlight>);
    expect(markup).toMatch(/height:\d+px;background:#f00/);
  });

  test("pill variant renders filled background with text color fallback", () => {
    const markup = inCanvas(<Highlight variant="pill" color="#f00">x</Highlight>);
    expect(markup).toMatch(/background:#f00/);
    expect(markup).toMatch(/color:#fff/);
  });

  test("pill with textColor uses the provided color", () => {
    const markup = inCanvas(<Highlight variant="pill" color="#f00" textColor="#000">x</Highlight>);
    expect(markup).toMatch(/color:#000/);
  });

  test("color variant only recolors text", () => {
    const markup = inCanvas(<Highlight variant="color" color="#123">word</Highlight>);
    expect(markup).toMatch(/color:#123/);
    expect(markup).not.toMatch(/background:#123/);
  });

  test("italic variant sets font-style", () => {
    const markup = inCanvas(<Highlight variant="italic" color="#123">x</Highlight>);
    expect(markup).toMatch(/font-style:italic/);
  });

  test("stroke variant uses -webkit-text-stroke", () => {
    const markup = inCanvas(<Highlight variant="stroke" color="#abc" strokeWidth={5}>x</Highlight>);
    expect(markup).toMatch(/-webkit-text-stroke:5px #abc/);
  });

  test("underline thickness scales with tokens", () => {
    const iphone = inCanvas(<Highlight variant="underline" color="#f00">x</Highlight>, "iphone-16-pro", appstore);
    const ipad = inCanvas(<Highlight variant="underline" color="#f00">x</Highlight>, "ipad-pro-13", appstoreIPad);
    const iBar = Number(iphone.match(/height:(\d+)px;background:#f00/)![1]);
    const pBar = Number(ipad.match(/height:(\d+)px;background:#f00/)![1]);
    expect(pBar).toBeGreaterThan(iBar);
  });
});

describe("iPad vs iPhone typography parity", () => {
  test("token ratio tracks device width ratio (not slice width ratio)", () => {
    const iSize = iphoneTokens().fontSize.title;
    const pSize = ipadTokens().fontSize.title;
    const deviceRatio = ipadTokens().fontSize.title / iphoneTokens().fontSize.title;

    // Slice-width ratio would be 2064/1320 ≈ 1.56.
    // Device-width ratio is (2064×0.72) / (1320×0.78) ≈ 1.44 — noticeably smaller.
    // That's the whole point: iPad text doesn't blow up as much as the canvas does.
    expect(deviceRatio).toBeLessThan(1.56);
    expect(pSize).toBeGreaterThan(iSize);
  });
});
