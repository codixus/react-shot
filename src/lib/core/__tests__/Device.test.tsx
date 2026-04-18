import { expect, test, describe } from "bun:test";
import { Canvas } from "../Canvas";
import { Slice } from "../Slice";
import { Device } from "../Device";
import { Region } from "../Region";
import { appstore, appstoreIPad } from "../../presets";
import { DEVICE_SPECS } from "../deviceSpecs";
import { html } from "./testUtils";

function inDevice(el: React.ReactNode, preset = appstore, device: "iphone-16-pro" | "ipad-pro-13" = "iphone-16-pro") {
  return html(
    <Canvas preset={preset} slices={1} device={device}>
      <Slice index={0}>
        <Region anchor="middle">{el}</Region>
      </Slice>
    </Canvas>,
  );
}

describe("<Device>", () => {
  test("inherits variant from Canvas", () => {
    const markup = inDevice(<Device screenshot="/img.png" />);
    // iPhone16Pro frame renders an image with the screenshot src
    expect(markup).toMatch(/img\.png/);
  });

  test("respects explicit variant override", () => {
    const markup = html(
      <Canvas preset={appstore} slices={1} device="iphone-16-pro">
        <Slice index={0}>
          <Region anchor="middle">
            <Device variant="apple-watch" screenshot="/w.png" />
          </Region>
        </Slice>
      </Canvas>,
    );
    expect(markup).toMatch(/w\.png/);
    // apple-watch frame has a much lower aspect ratio; width should be smaller.
  });

  test("default width = stage.deviceWidth = preset.width × naturalFit", () => {
    const markup = inDevice(<Device screenshot="/a.png" />);
    const expected = Math.round(1320 * DEVICE_SPECS["iphone-16-pro"].naturalFit);
    expect(markup).toMatch(new RegExp(`width:${expected}px`));
  });

  test("scale prop multiplies the computed width", () => {
    const markup = inDevice(<Device screenshot="/a.png" scale={0.5} />);
    const expected = Math.round(1320 * DEVICE_SPECS["iphone-16-pro"].naturalFit * 0.5);
    expect(markup).toMatch(new RegExp(`width:${expected}px`));
  });

  test("explicit width prop overrides stage and scale", () => {
    const markup = inDevice(<Device screenshot="/a.png" width={500} />);
    expect(markup).toMatch(/width:500px/);
  });

  test("computed height = width × aspect for iPhone", () => {
    const markup = inDevice(<Device screenshot="/a.png" width={400} />);
    const expectedH = Math.round(400 * DEVICE_SPECS["iphone-16-pro"].aspect);
    expect(markup).toMatch(new RegExp(`height:${expectedH}px`));
  });

  test("iPad variant uses its own aspect ratio", () => {
    const markup = html(
      <Canvas preset={appstoreIPad} slices={1} device="ipad-pro-13">
        <Slice index={0}>
          <Region anchor="middle">
            <Device screenshot="/a.png" width={600} />
          </Region>
        </Slice>
      </Canvas>,
    );
    const expectedH = Math.round(600 * DEVICE_SPECS["ipad-pro-13"].aspect);
    expect(markup).toMatch(new RegExp(`height:${expectedH}px`));
  });

  test("applies a drop-shadow filter to the frame layer", () => {
    const markup = inDevice(<Device screenshot="/a.png" />);
    expect(markup).toMatch(/filter:drop-shadow\(/);
  });

  test("noShadow disables the drop-shadow filter entirely", () => {
    const markup = inDevice(<Device screenshot="/a.png" noShadow />);
    expect(markup).not.toMatch(/drop-shadow/);
  });

  test("overlay children are NOT inside the shadow filter layer", () => {
    // The filter wrapper and the children div should be siblings — if the
    // children's nearest ancestor with a filter is the device wrapper, the
    // shadow would bleed onto text/cards laid over the phone.
    const markup = inDevice(
      <Device screenshot="/a.png">
        <span data-role="overlay">hi</span>
      </Device>,
    );
    // Find the overlay element, walk backwards to find the nearest enclosing
    // style with `filter:drop-shadow`. It should belong to a previous sibling,
    // not an ancestor.
    const overlayIdx = markup.indexOf('data-role="overlay"');
    const filterIdx = markup.lastIndexOf("filter:drop-shadow", overlayIdx);
    const closingFilterDiv = markup.indexOf("</div>", filterIdx);
    // The filter's closing </div> should come BEFORE the overlay starts —
    // i.e., overlay is a sibling, not a descendant.
    expect(closingFilterDiv).toBeLessThan(overlayIdx);
  });

  test("children render on top of the frame", () => {
    const markup = inDevice(
      <Device screenshot="/a.png">
        <div data-role="overlay">hi</div>
      </Device>,
    );
    expect(markup).toMatch(/data-role="overlay"/);
  });

  test("dispatches to the correct frame component per variant", () => {
    const variants = ["iphone-16-pro", "ipad-pro-13", "macbook-pro", "apple-watch"] as const;
    for (const v of variants) {
      const markup = html(
        <Canvas preset={appstore} slices={1} device={v}>
          <Slice index={0}>
            <Region anchor="middle">
              <Device screenshot={`/${v}.png`} width={400} />
            </Region>
          </Slice>
        </Canvas>,
      );
      expect(markup).toMatch(new RegExp(`${v}\\.png`));
    }
  });
});
