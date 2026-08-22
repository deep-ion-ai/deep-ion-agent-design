import type { ReactNode } from "react";
import { fillBg, onFillText, accentText, accentBorder, type Accent } from "./accents";

// Visual reference implementation of specs/badge.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface BadgeProps {
  accent?: Accent | "neutral";
  /** pill for counts, default (slightly rounded) for words. */
  shape?: "default" | "pill";
  /** Low-emphasis: accent text + border on canvas, for dense contexts. */
  subtle?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

// A badge is never interactive: it is a <span>. Anything clickable is a
// compact Button instead.
export function Badge({
  accent = "secondary",
  shape = "default",
  subtle,
  icon,
  children,
  className = "",
}: BadgeProps) {
  const radius = shape === "pill" ? "rounded-pill" : "rounded-sm";
  const colours =
    accent === "neutral"
      ? subtle
        ? "bg-surface-canvas text-text-secondary border border-surface-border"
        : "bg-neutral-light text-text-on-accent-dark border border-transparent"
      : subtle
        ? `bg-surface-canvas ${accentText[accent]} border ${accentBorder[accent]}`
        : `${fillBg[accent]} ${onFillText[accent]} border border-transparent`;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap px-2 py-1 text-xs font-medium leading-dense ${radius} ${colours} ${className}`}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}

export interface CountBadgeProps {
  count: number;
  accent?: Accent;
  /** Counts above this render as "99+". */
  max?: number;
  className?: string;
}

/**
 * An overflow count pinned to a parent's corner. It is aria-hidden: the
 * PARENT control's accessible name carries the count ("Notifications, 9
 * unread"). Never both, or it announces twice.
 */
export function CountBadge({
  count,
  accent = "danger",
  max = 99,
  className = "",
}: CountBadgeProps) {
  // Zero renders as nothing: a badge that is always present is not a signal.
  if (count <= 0) return null;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -right-1 -top-1 inline-flex min-w-[1.25rem] items-center justify-center rounded-pill px-1 py-0.5 text-xs font-medium leading-dense ${fillBg[accent]} ${onFillText[accent]} ${className}`}
    >
      {count > max ? `${max}+` : count}
    </span>
  );
}
