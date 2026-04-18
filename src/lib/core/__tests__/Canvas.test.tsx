import { expect, test, describe } from "bun:test";
import { Canvas } from "../Canvas";
import { Slice } from "../Slice";
import { appstore, appstoreIPad } from "../../presets";
import { html, StageInspector, getInspected } from "./testUtils";
import { DEVICE_SPECS } from "../deviceSpecs";

describe("<Canvas>", () => {
  test("provides a StageContext with preset, slices, and device info", () => {
    const markup = html(
      <Canvas preset={appstore} slices={5}>
        <StageInspector />
      </Canvas>,
    );
    const info = getInspected(markup);
    expect(info.sliceWidth).toBe(1320);
    expect(info.sliceHeight).toBe(2868);
    expect(info.slices).toBe(5);
    expect(info.device).toBe("iphone-16-pro");
  });

  test("total canvas width = preset.width × slices", () => {
    const markup = html(
      <Canvas preset={appstore} slices={4}>
        <div />
      </Canvas>,
    );
    // 1320 × 4 = 5280
    expect(markup).toMatch(/width:5280px/);
    expect(markup).toMatch(/height:2868px/);
  });

  test("slices=6 and slices=3 both work without changing the preset", () => {
    const three = html(<Canvas preset={appstore} slices={3}><div /></Canvas>);
    const six = html(<Canvas preset={appstore} slices={6}><div /></Canvas>);
    expect(three).toMatch(/width:3960(px)?/);
    expect(six).toMatch(/width:7920(px)?/);
  });

  test("defaults to 1 slice when not specified", () => {
    const markup = html(
      <Canvas preset={appstore}>
        <StageInspector />
      </Canvas>,
    );
    const info = getInspected(markup);
    expect(info.slices).toBe(1);
  });

  test("deviceWidth is preset.width × naturalFit by default", () => {
    const markup = html(
      <Canvas preset={appstore} slices={5}>
        <StageInspector />
      </Canvas>,
    );
    const info = getInspected(markup) as { deviceWidth: number };
    const expected = Math.round(1320 * DEVICE_SPECS["iphone-16-pro"].naturalFit);
    expect(info.deviceWidth).toBe(expected);
  });

  test("explicit deviceWidth prop overrides the natural fit", () => {
    const markup = html(
      <Canvas preset={appstore} device="iphone-16-pro" deviceWidth={800}>
        <StageInspector />
      </Canvas>,
    );
    const info = getInspected(markup) as { deviceWidth: number };
    expect(info.deviceWidth).toBe(800);
  });

  test("iPad device picks a wider slice and a different natural fit", () => {
    const markup = html(
      <Canvas preset={appstoreIPad} device="ipad-pro-13" slices={5}>
        <StageInspector />
      </Canvas>,
    );
    const info = getInspected(markup) as { deviceWidth: number; sliceWidth: number };
    expect(info.sliceWidth).toBe(2064);
    expect(info.deviceWidth).toBe(Math.round(2064 * DEVICE_SPECS["ipad-pro-13"].naturalFit));
  });

  test("safeArea merges preset values with sensible defaults", () => {
    const markup = html(
      <Canvas preset={appstore} slices={5}>
        <StageInspector />
      </Canvas>,
    );
    const info = getInspected(markup) as { safeArea: { top: number; sides: number; bottom: number } };
    expect(info.safeArea.top).toBeGreaterThan(0);
    expect(info.safeArea.sides).toBeGreaterThan(0);
    expect(info.safeArea.bottom).toBeGreaterThan(0);
  });

  test("tokens are derived from device width", () => {
    // iPad tokens should be bigger than iPhone tokens because deviceWidth is bigger.
    const iphone = getInspected(
      html(
        <Canvas preset={appstore} device="iphone-16-pro">
          <StageInspector />
        </Canvas>,
      ),
    ) as { titleSize: number };
    const ipad = getInspected(
      html(
        <Canvas preset={appstoreIPad} device="ipad-pro-13">
          <StageInspector />
        </Canvas>,
      ),
    ) as { titleSize: number };
    expect(ipad.titleSize).toBeGreaterThan(iphone.titleSize);
  });

  test("applies overflow:hidden to the root container", () => {
    const markup = html(<Canvas preset={appstore} slices={1}><div /></Canvas>);
    expect(markup).toMatch(/overflow:hidden/);
  });

  test("renders SliceGuides when showSliceGuides is true", () => {
    const markup = html(
      <Canvas preset={appstore} slices={3} showSliceGuides>
        <Slice index={0}>x</Slice>
      </Canvas>,
    );
    // SliceGuides renders dashed blue safe-area outlines — one per slice.
    const dashed = (markup.match(/border:2px dashed/g) ?? []).length;
    expect(dashed).toBe(3);
  });

  test("does not render SliceGuides by default", () => {
    const markup = html(
      <Canvas preset={appstore} slices={3}>
        <Slice index={0}>x</Slice>
      </Canvas>,
    );
    expect(markup).not.toMatch(/border:2px dashed/);
  });
});

describe("useStage() outside a Canvas", () => {
  test("throws a helpful error", () => {
    expect(() => html(<StageInspector />)).toThrow(/useStage must be used within a <Canvas>/);
  });
});
