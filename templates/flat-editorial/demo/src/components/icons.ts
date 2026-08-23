// The demo's icon set, per foundations/iconography.md.
//
// One coherent, stroke-based family (Lucide), re-exported from a single
// module so the choice can be swapped in one place. The library choice is
// DEMO-LOCAL: the template constrains what a set must satisfy and does not
// mandate this one.
//
// This list is deliberately short. foundations/iconography.md sets out the
// template's entire icon vocabulary and adds: "if a needed glyph is not on
// that list, prefer a word."

export {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Link2,
  Copy,
  Check,
  Sun,
  Moon,
  Rss,
} from "lucide-react";

/** Lighter than Lucide's default 2, so a glyph reads at the weight of the
 *  text beside it — foundations/iconography.md. */
export const ICON_STROKE = 1.5;

export const iconSize = {
  sm: "h-icon-sm w-icon-sm",
  md: "h-icon-md w-icon-md",
  lg: "h-icon-lg w-icon-lg",
} as const;
