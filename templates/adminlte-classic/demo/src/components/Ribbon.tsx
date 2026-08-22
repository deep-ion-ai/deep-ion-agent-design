import { fillBg, onFillText, type Accent } from "./accents";

// Visual reference implementation of specs/ribbon.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type RibbonSize = "default" | "lg" | "xl";

const sizeClasses: Record<RibbonSize, string> = {
  default: "w-40 py-1 text-xs",
  lg: "w-48 py-2 text-sm",
  xl: "w-56 py-2 text-base",
};

export interface RibbonProps {
  label: string;
  accent?: Accent;
  corner?: "top-start" | "top-end";
  size?: RibbonSize;
}

/**
 * The visual banner ONLY. It is aria-hidden, because the word is folded
 * into the card's own accessible name/description — see Card's `ribbon`
 * prop. Rendering it as an announced element on its own would either be
 * silent or read as a stray word between cards.
 *
 * Requires the parent to establish a positioning context and clip overflow.
 */
export function Ribbon({
  label,
  accent = "success",
  corner = "top-start",
  size = "default",
}: RibbonProps) {
  const place =
    corner === "top-start"
      ? "-left-12 top-5 -rotate-45"
      : "-right-12 top-5 rotate-45";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 text-center font-semibold uppercase tracking-wide ${place} ${sizeClasses[size]} ${fillBg[accent]} ${onFillText[accent]}`}
    >
      {label}
    </span>
  );
}
