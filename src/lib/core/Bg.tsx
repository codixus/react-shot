import type { CSSProperties } from "react";

type BgVariant =
  | { type: "solid"; color: string }
  | { type: "gradient"; colors: string[]; direction?: string; kind?: "linear" | "radial" | "conic" }
  | { type: "image"; src: string; fit?: "cover" | "contain"; position?: string }
  | { type: "mesh"; colors: string[] }
  | { type: "noise"; base: string; intensity?: number }
  | { type: "dots"; bg: string; color: string; size?: number; dotRadius?: number; opacity?: number }
  | { type: "grid"; bg: string; color: string; size?: number; thickness?: number; opacity?: number }
  | { type: "stripes"; bg: string; color: string; size?: number; thickness?: number; angle?: number }
  | { type: "zigzag"; bg: string; color: string; size?: number; thickness?: number }
  | { type: "waves"; bg: string; color: string; size?: number; thickness?: number }
  | { type: "diagonal"; colors: [string, string]; size?: number };

interface BgProps {
  variant?: BgVariant;
  /** Shorthand: solid color. */
  solid?: string;
  /** Shorthand: gradient. */
  gradient?: { colors: string[]; direction?: string; kind?: "linear" | "radial" | "conic" };
  image?: { src: string; fit?: "cover" | "contain"; position?: string };
  mesh?: { colors: string[] };
  noise?: { base: string; intensity?: number };
  /** Dot grid pattern. */
  dots?: { bg: string; color: string; size?: number; dotRadius?: number; opacity?: number };
  /** Fine grid lines. */
  grid?: { bg: string; color: string; size?: number; thickness?: number; opacity?: number };
  /** Diagonal (or any angle) stripes. */
  stripes?: { bg: string; color: string; size?: number; thickness?: number; angle?: number };
  /** Zigzag lines repeating vertically. */
  zigzag?: { bg: string; color: string; size?: number; thickness?: number };
  /** Gentle sine-wave lines. */
  waves?: { bg: string; color: string; size?: number; thickness?: number };
  /** Two-tone diagonal split (checker-style). */
  diagonal?: { colors: [string, string]; size?: number };
  className?: string;
  style?: CSSProperties;
}

/**
 * Single unified background layer. Pass any shorthand (`solid`, `gradient`,
 * `dots`, `grid`, `stripes`, `zigzag`, `waves`, `mesh`, `noise`, `image`,
 * `diagonal`) or a tagged `variant`. Renders an absolute fill designed to
 * slot into `<Slice bg={...} />`.
 */
export function Bg(props: BgProps) {
  const { className, style } = props;
  const v = resolveVariant(props);
  const bg = renderBg(v);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bg.color,
        backgroundImage: bg.image,
        backgroundSize: bg.size,
        backgroundPosition: bg.position,
        backgroundRepeat: bg.repeat ?? "repeat",
        ...style,
      }}
    />
  );
}

function resolveVariant({ variant, solid, gradient, image, mesh, noise, dots, grid, stripes, zigzag, waves, diagonal }: BgProps): BgVariant {
  if (variant) return variant;
  if (solid) return { type: "solid", color: solid };
  if (gradient) return { type: "gradient", ...gradient };
  if (image) return { type: "image", ...image };
  if (mesh) return { type: "mesh", ...mesh };
  if (noise) return { type: "noise", ...noise };
  if (dots) return { type: "dots", ...dots };
  if (grid) return { type: "grid", ...grid };
  if (stripes) return { type: "stripes", ...stripes };
  if (zigzag) return { type: "zigzag", ...zigzag };
  if (waves) return { type: "waves", ...waves };
  if (diagonal) return { type: "diagonal", ...diagonal };
  return { type: "solid", color: "#fff" };
}

interface BgResolved {
  color?: string;
  image?: string;
  size?: string;
  position?: string;
  repeat?: string;
}

function renderBg(v: BgVariant): BgResolved {
  switch (v.type) {
    case "solid":
      return { color: v.color };

    case "gradient": {
      const kind = v.kind ?? "linear";
      const dir = v.direction ?? "to bottom";
      const colors = v.colors.join(", ");
      const image =
        kind === "radial" ? `radial-gradient(${dir}, ${colors})` :
        kind === "conic" ? `conic-gradient(from ${dir}, ${colors})` :
        `linear-gradient(${dir}, ${colors})`;
      return { image, repeat: "no-repeat" };
    }

    case "image":
      return {
        image: `url(${v.src})`,
        size: v.fit ?? "cover",
        position: v.position ?? "center",
        repeat: "no-repeat",
      };

    case "mesh": {
      const [a, b, c, d] = [...v.colors, "#fff", "#fff", "#fff", "#fff"];
      return {
        image: [
          `radial-gradient(at 20% 10%, ${a} 0%, transparent 50%)`,
          `radial-gradient(at 80% 10%, ${b} 0%, transparent 50%)`,
          `radial-gradient(at 20% 90%, ${c} 0%, transparent 50%)`,
          `radial-gradient(at 80% 90%, ${d} 0%, transparent 50%)`,
        ].join(", "),
        repeat: "no-repeat",
      };
    }

    case "noise": {
      const alpha = v.intensity ?? 0.08;
      return {
        color: v.base,
        image: svg(`<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='${alpha}'/></svg>`),
        size: "160px 160px",
      };
    }

    case "dots": {
      const step = v.size ?? 28;
      const r = v.dotRadius ?? 1.6;
      const op = v.opacity ?? 1;
      return {
        color: v.bg,
        image: svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${step}' height='${step}'><circle cx='${step / 2}' cy='${step / 2}' r='${r}' fill='${encodeColor(v.color)}' opacity='${op}'/></svg>`),
        size: `${step}px ${step}px`,
      };
    }

    case "grid": {
      const step = v.size ?? 40;
      const t = v.thickness ?? 1;
      const op = v.opacity ?? 0.5;
      return {
        color: v.bg,
        image: svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${step}' height='${step}'><path d='M ${step} 0 L 0 0 0 ${step}' fill='none' stroke='${encodeColor(v.color)}' stroke-width='${t}' opacity='${op}'/></svg>`),
        size: `${step}px ${step}px`,
      };
    }

    case "stripes": {
      const step = v.size ?? 24;
      const t = v.thickness ?? 2;
      const angle = v.angle ?? 45;
      // Two-stop linear gradient repeats cleanly when tiled.
      const image = `repeating-linear-gradient(${angle}deg, ${v.color} 0 ${t}px, transparent ${t}px ${step}px)`;
      return { color: v.bg, image };
    }

    case "zigzag": {
      const step = v.size ?? 24;
      const t = v.thickness ?? 2;
      return {
        color: v.bg,
        image: svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${step * 2}' height='${step}'><path d='M 0 ${step} L ${step / 2} ${step / 2} L ${step} ${step} L ${step * 1.5} ${step / 2} L ${step * 2} ${step}' fill='none' stroke='${encodeColor(v.color)}' stroke-width='${t}' stroke-linejoin='round'/></svg>`),
        size: `${step * 2}px ${step}px`,
      };
    }

    case "waves": {
      const step = v.size ?? 40;
      const t = v.thickness ?? 2;
      const h = step / 2;
      return {
        color: v.bg,
        image: svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${step * 2}' height='${h}'><path d='M 0 ${h / 2} Q ${step / 2} 0 ${step} ${h / 2} T ${step * 2} ${h / 2}' fill='none' stroke='${encodeColor(v.color)}' stroke-width='${t}' stroke-linecap='round'/></svg>`),
        size: `${step * 2}px ${h}px`,
      };
    }

    case "diagonal": {
      const step = v.size ?? 48;
      return {
        image: `repeating-linear-gradient(45deg, ${v.colors[0]} 0 ${step}px, ${v.colors[1]} ${step}px ${step * 2}px)`,
      };
    }
  }
}

function svg(markup: string): string {
  // SVG data URL, `#` escaped for the URL encoder-less path.
  return `url("data:image/svg+xml;utf8,${markup.replace(/#/g, "%23").replace(/"/g, "'")}")`;
}

function encodeColor(color: string): string {
  // # needs to be escaped inside a data URL's unencoded form.
  return color.replace(/#/g, "%23");
}
