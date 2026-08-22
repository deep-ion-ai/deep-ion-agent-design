import { fillBg, onFillText, type Accent } from "./accents";

// Visual reference implementation of specs/ribbon.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type RibbonSize = "default" | "lg" | "xl";

const sizeClasses: Record<RibbonSize, string> = {
  default: "w-40 py-1 text-xs",
  lg: "w-48 py-2 text-sm",
  xl: "w-56 py-2 text-base",
};

// The corner box's footprint must clear the banner's rotated diagonal on
// its own — it is what clips the banner now, never the parent card. See
// specs/ribbon.md's Composition rules for why the card itself must stay
// unclipped (a header Dropdown Menu's panel floats past the card's edge
// and must not be truncated by it).
const boxSizeClasses: Record<RibbonSize, string> = {
  default: "h-24 w-24",
  lg: "h-28 w-28",
  xl: "h-32 w-32",
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
 * Requires the parent to establish a positioning context. It does NOT
 * require the parent to clip its overflow — this component clips itself,
 * inside its own corner box, so a card carrying both a Ribbon and a
 * header Dropdown Menu never has to choose between them.
 */
export function Ribbon({
  label,
  accent = "success",
  corner = "top-start",
  size = "default",
}: RibbonProps) {
  const boxPlace = corner === "top-start" ? "top-0 left-0" : "top-0 right-0";
  const bannerPlace =
    corner === "top-start"
      ? "-left-12 top-5 -rotate-45"
      : "-right-12 top-5 rotate-45";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-10 overflow-hidden ${boxPlace} ${boxSizeClasses[size]}`}
    >
      <span
        className={`absolute text-center font-semibold uppercase tracking-wide ${bannerPlace} ${sizeClasses[size]} ${fillBg[accent]} ${onFillText[accent]}`}
      >
        {label}
      </span>
    </div>
  );
}
