import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useStage } from "../StageContext";

/** Render a component tree to HTML (no DOM required). */
export function html(el: ReactElement): string {
  return renderToStaticMarkup(el);
}

/**
 * Inspect a StageContext value by serializing it into a data attribute.
 * Use inside a Canvas; then parse the emitted JSON out of the markup.
 */
export function StageInspector({ id = "stage" }: { id?: string }) {
  const stage = useStage();
  const payload = {
    sliceWidth: stage.sliceWidth,
    sliceHeight: stage.sliceHeight,
    slices: stage.slices,
    device: stage.device,
    deviceWidth: stage.deviceWidth,
    deviceHeight: stage.deviceHeight,
    safeArea: stage.safeArea,
    titleSize: stage.tokens.fontSize.title,
    spaceMd: stage.tokens.space.md,
  };
  return <div data-inspect={id} data-payload={JSON.stringify(payload)} />;
}

export function getInspected(markup: string, id = "stage"): Record<string, unknown> {
  const re = new RegExp(`data-inspect="${id}"[^>]*data-payload="([^"]+)"`);
  const match = markup.match(re);
  if (!match) throw new Error(`StageInspector id=${id} not found in markup`);
  // HTML escapes quotes; React uses &quot; inside attributes.
  const decoded = match[1].replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
  return JSON.parse(decoded);
}

/** Count occurrences of an absolute-positioned element at a given left offset. */
export function countSliceAt(markup: string, left: number): number {
  const re = new RegExp(`left:${left}(px)?[;"]`, "g");
  return (markup.match(re) ?? []).length;
}
