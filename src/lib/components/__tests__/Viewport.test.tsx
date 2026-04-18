import { expect, test, describe } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { Viewport } from "../Viewport";

function html(composition: string | undefined, props: Partial<React.ComponentProps<typeof Viewport>> = {}) {
  return renderToStaticMarkup(
    <MemoryRouter>
      <Viewport
        canvasWidth={1320 * 5}
        canvasHeight={2868}
        compositionId={composition}
        compositionName="Test"
        showSliceGuides={false}
        onToggleSliceGuides={() => {}}
        {...props}
      >
        <div data-role="canvas" />
      </Viewport>
    </MemoryRouter>,
  );
}

describe("<Viewport>", () => {
  test("renders the top toolbar with Gallery button, zoom, and dims", () => {
    const markup = html("hero");
    expect(markup).toMatch(/Gallery/);
    expect(markup).toMatch(/6600×2868/); // canvas dim readout
  });

  test("exposes Copy CLI + Open full + GitHub link in toolbar", () => {
    const markup = html("hero");
    expect(markup).toMatch(/Copy CLI/);
    expect(markup).toMatch(/Open full/);
    expect(markup).toMatch(/github\.com\/codixus\/react-shot/);
  });

  test("guides button label reflects state — hidden by default", () => {
    const hidden = html("hero", { showSliceGuides: false });
    const shown = html("hero", { showSliceGuides: true });
    expect(hidden).toMatch(/Show guides/);
    expect(shown).toMatch(/Hide guides/);
  });

  test("bottom hint bar lists all shortcuts", () => {
    const markup = html("hero");
    for (const hint of ["Scroll: pan", "⌘+Scroll: zoom", "G: guides", "⌘0: fit", "Esc: gallery"]) {
      expect(markup).toMatch(new RegExp(hint.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  test("renders children inside the zoom layer", () => {
    const markup = html("hero");
    expect(markup).toMatch(/data-role="canvas"/);
  });

  test("composition name shows after the divider", () => {
    const markup = html("hero", { compositionName: "My Set [en/ios]" });
    expect(markup).toMatch(/My Set \[en\/ios\]/);
  });
});
