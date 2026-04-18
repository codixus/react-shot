import { expect, test, describe } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ThemeToggle } from "../ThemeToggle";

describe("<ThemeToggle>", () => {
  test("renders a button with an aria-label", () => {
    const html = renderToStaticMarkup(<ThemeToggle />);
    expect(html).toMatch(/<button/);
    expect(html).toMatch(/aria-label="Switch to light mode"/);
  });

  test("renders the sun icon when mode is dark (invite to switch to light)", () => {
    // In SSR there's no window, so initial mode resolves to "dark". The
    // button then shows a sun (switch → light).
    const html = renderToStaticMarkup(<ThemeToggle />);
    expect(html).toMatch(/<circle cx="12" cy="12" r="4"/);
    expect(html).toMatch(/M12 2v2/);
  });

  test("accepts size prop and spreads it to width/height", () => {
    const html = renderToStaticMarkup(<ThemeToggle size={48} />);
    expect(html).toMatch(/width:48px/);
    expect(html).toMatch(/height:48px/);
  });

  test("always circular (border-radius 999)", () => {
    const html = renderToStaticMarkup(<ThemeToggle />);
    expect(html).toMatch(/border-radius:999/);
  });
});
