import { expect, test, describe } from "bun:test";
import { Canvas } from "../Canvas";
import { Slice } from "../Slice";
import { appstore } from "../../presets";
import { html } from "./testUtils";

function renderSlices(count: number) {
  return html(
    <Canvas preset={appstore} slices={count}>
      {Array.from({ length: count }).map((_, i) => (
        <Slice key={i} index={i}>
          <div />
        </Slice>
      ))}
    </Canvas>,
  );
}

describe("<Slice>", () => {
  test("positions each slice at left: index × sliceWidth", () => {
    const markup = renderSlices(3);
    // React drops `px` on zero values.
    expect(markup).toMatch(/left:0[;"]/);
    expect(markup).toMatch(/left:1320px/);
    expect(markup).toMatch(/left:2640px/);
  });

  test("renders bg and decorations as separate absolute layers before content", () => {
    const markup = html(
      <Canvas preset={appstore} slices={1}>
        <Slice
          index={0}
          bg={<div data-role="bg" />}
          decorations={<div data-role="deco" />}
        >
          <div data-role="content" />
        </Slice>
      </Canvas>,
    );
    const bgAt = markup.indexOf("data-role=\"bg\"");
    const decoAt = markup.indexOf("data-role=\"deco\"");
    const contentAt = markup.indexOf("data-role=\"content\"");
    expect(bgAt).toBeGreaterThan(-1);
    expect(decoAt).toBeGreaterThan(bgAt);
    expect(contentAt).toBeGreaterThan(decoAt);
  });

  test("applies safeArea padding by default", () => {
    const markup = html(
      <Canvas preset={appstore} slices={1}>
        <Slice index={0}>
          <div />
        </Slice>
      </Canvas>,
    );
    // appstore safe area: top=140, sides=90, bottom=90
    expect(markup).toMatch(/padding:140px 90px 90px 90px/);
  });

  test("bleed mode disables padding", () => {
    const markup = html(
      <Canvas preset={appstore} slices={1}>
        <Slice index={0} bleed>
          <div />
        </Slice>
      </Canvas>,
    );
    expect(markup).toMatch(/padding:0/);
  });

  test("align prop controls alignItems + textAlign", () => {
    const left = html(
      <Canvas preset={appstore}>
        <Slice index={0} align="left">
          <div />
        </Slice>
      </Canvas>,
    );
    const right = html(
      <Canvas preset={appstore}>
        <Slice index={0} align="right">
          <div />
        </Slice>
      </Canvas>,
    );
    expect(left).toMatch(/align-items:flex-start/);
    expect(right).toMatch(/align-items:flex-end/);
  });

  test("slice dimensions match sliceWidth × sliceHeight", () => {
    const markup = renderSlices(1);
    expect(markup).toMatch(/width:1320px/);
    expect(markup).toMatch(/height:2868px/);
  });

  test("each slice clips overflow to keep content within its bounds", () => {
    const markup = renderSlices(2);
    // two inner slice containers should carry overflow:hidden
    const hits = (markup.match(/overflow:hidden/g) ?? []).length;
    expect(hits).toBeGreaterThanOrEqual(3); // 1 canvas + 2 slices
  });
});
