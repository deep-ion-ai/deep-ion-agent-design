// Shared accent → colour-class mapping for the demo.
//
// This file exists to encode one rule from the token set in a single
// place: which accents carry white text and which need dark text
// (tokens/colors.json — color.text.on-accent vs on-accent-dark), and
// which darkened value an accent takes when it is used AS text on a
// light surface (color.text.accent.*).
//
// Demo scaffolding only — a real project should derive the same rule
// from tokens/colors.json directly, not copy this file.

export type Accent =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export const ACCENTS: Accent[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
];

/** Solid fill background per accent. */
export const fillBg: Record<Accent, string> = {
  primary: "bg-brand-primary",
  secondary: "bg-brand-secondary",
  success: "bg-status-success",
  danger: "bg-status-danger",
  warning: "bg-status-warning",
  info: "bg-status-info",
};

/**
 * Text colour to use ON that fill. warning and info are light fills:
 * white measures 1.63:1 and 1.96:1 on them, so they take dark text.
 */
export const onFillText: Record<Accent, string> = {
  primary: "text-text-on-accent",
  secondary: "text-text-on-accent",
  success: "text-text-on-accent",
  danger: "text-text-on-accent",
  warning: "text-text-on-accent-dark",
  info: "text-text-on-accent-dark",
};

/** The accent used AS text on a light surface (never the raw fill value). */
export const accentText: Record<Accent, string> = {
  primary: "text-text-accent-primary",
  secondary: "text-text-accent-secondary",
  success: "text-text-accent-success",
  danger: "text-text-accent-danger",
  warning: "text-text-accent-warning",
  info: "text-text-accent-info",
};

/** The same, as a border colour. */
export const accentBorder: Record<Accent, string> = {
  primary: "border-text-accent-primary",
  secondary: "border-text-accent-secondary",
  success: "border-text-accent-success",
  danger: "border-text-accent-danger",
  warning: "border-text-accent-warning",
  info: "border-text-accent-info",
};

/** Decorative oversized glyph colour, per fill lightness. */
export const glyphOnFill: Record<Accent, string> = {
  primary: "text-overlay-accent-glyph",
  secondary: "text-overlay-accent-glyph",
  success: "text-overlay-accent-glyph",
  danger: "text-overlay-accent-glyph",
  warning: "text-overlay-accent-glyph-dark",
  info: "text-overlay-accent-glyph-dark",
};

/** Focus ring that stays visible on top of a saturated fill. */
export const ringOnFill: Record<Accent, string> = {
  primary: "focus-visible:ring-text-on-accent",
  secondary: "focus-visible:ring-text-on-accent",
  success: "focus-visible:ring-text-on-accent",
  danger: "focus-visible:ring-text-on-accent",
  warning: "focus-visible:ring-text-on-accent-dark",
  info: "focus-visible:ring-text-on-accent-dark",
};

/** Focus ring for controls on a light surface. */
export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary focus-visible:ring-offset-surface-canvas";
