import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { focusRing } from "./focus";

// Visual reference implementation of specs/button.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// A blog has very few buttons. Most pressable things here are links —
// that spec's Purpose says so, and "when in doubt it is a link".

export type ButtonEmphasis = "solid" | "outline" | "quiet";
export type ButtonSize = "default" | "small";

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-6 py-3 text-base",
  small: "px-3 py-2 text-sm",
};

const emphasisClasses: Record<ButtonEmphasis, string> = {
  solid:
    "bg-accent-base text-text-on-accent border border-transparent hover:bg-accent-strong",
  outline:
    "bg-transparent text-accent-base border border-accent-base hover:bg-accent-wash",
  quiet:
    "bg-transparent text-text-secondary border border-transparent hover:bg-accent-wash hover:text-accent-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  emphasis?: ButtonEmphasis;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  /** Shows the busy state and ignores presses. The label stays visible. */
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { emphasis = "solid", size = "default", leadingIcon, loading, children, className = "", ...rest },
  ref,
) {
  return (
    <button
      type="button"
      {...rest}
      ref={ref}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : rest.onClick}
      className={`inline-flex items-center justify-center gap-2 rounded font-ui font-medium transition-colors duration-state ease-standard disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses[size]} ${emphasisClasses[emphasis]} ${focusRing} ${className}`}
    >
      {leadingIcon}
      {/* The label stays visible while busy: a button whose text vanishes
          mid-action tells the reader nothing about what is happening. */}
      {children}
    </button>
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: the button carries no visible text. Name the action AND its object. */
  label: string;
  icon: ReactNode;
}

/** Icon-only, always at the quiet emphasis, and only ever in chrome —
 *  never in an article (specs/button.md). The visible glyph is small, so
 *  the pressable box is padded out to spacing.component.tap-target
 *  rather than the glyph being inflated to meet it. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, className = "", ...rest },
  ref,
) {
  return (
    <button
      type="button"
      {...rest}
      ref={ref}
      aria-label={label}
      className={`inline-flex h-tap-target w-tap-target items-center justify-center rounded text-text-secondary transition-colors duration-state ease-standard hover:bg-accent-wash hover:text-accent-base ${focusRing} ${className}`}
    >
      <span aria-hidden>{icon}</span>
    </button>
  );
});
