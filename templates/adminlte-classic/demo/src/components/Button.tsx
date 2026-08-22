import { Check, LoaderCircle, ICON_STROKE, iconSize } from "./icons";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  fillBg,
  onFillText,
  accentText,
  accentBorder,
  ringOnFill,
  focusRing,
  type Accent,
} from "./accents";

// Visual reference implementation of specs/button.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type ButtonEmphasis = "solid" | "outline" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: Accent;
  emphasis?: ButtonEmphasis;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Shows the busy indicator and ignores presses. The label stays visible. */
  loading?: boolean;
}

export function buttonClasses(
  accent: Accent,
  emphasis: ButtonEmphasis,
  size: ButtonSize,
) {
  const base = `inline-flex items-center justify-center gap-2 rounded border font-medium transition-colors ${sizeClasses[size]}`;
  const state = "disabled:cursor-not-allowed disabled:opacity-50";

  if (emphasis === "solid") {
    // The border matches the fill so solid and outline occupy identical space.
    return `${base} ${state} ${fillBg[accent]} ${onFillText[accent]} border-transparent hover:brightness-95 active:brightness-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-surface-canvas ${ringOnFill[accent]}`;
  }
  if (emphasis === "outline") {
    return `${base} ${state} ${focusRing} bg-surface-canvas ${accentText[accent]} ${accentBorder[accent]} hover:bg-neutral-light`;
  }
  return `${base} ${state} ${focusRing} border-transparent bg-transparent ${accentText[accent]} hover:bg-neutral-light`;
}

function Spinner() {
  return (
    <LoaderCircle
      aria-hidden
      strokeWidth={ICON_STROKE}
      className={`animate-spin ${iconSize.sm}`}
    />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    accent = "primary",
    emphasis = "solid",
    size = "md",
    leadingIcon,
    trailingIcon,
    loading,
    children,
    className = "",
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      type="button"
      {...rest}
      ref={ref}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : rest.onClick}
      className={`${buttonClasses(accent, emphasis, size)} ${className}`}
    >
      {loading ? <Spinner /> : leadingIcon}
      {/* The label stays visible while busy: a button whose text vanishes
          mid-action says nothing about what is happening. */}
      {children}
      {trailingIcon}
    </button>
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: the button carries no visible text. Name the action AND its object. */
  label: string;
  icon: ReactNode;
  size?: ButtonSize;
  tone?: "muted" | "default";
}

export function IconButton({
  label,
  icon,
  size = "sm",
  tone = "muted",
  className = "",
  ...rest
}: IconButtonProps) {
  const box = size === "lg" ? "h-10 w-10" : size === "md" ? "h-9 w-9" : "h-8 w-8";
  const colour =
    tone === "muted"
      ? "text-text-secondary hover:text-text-primary"
      : "text-text-primary";
  return (
    <button
      type="button"
      {...rest}
      aria-label={label}
      className={`inline-flex ${box} items-center justify-center rounded ${colour} hover:bg-neutral-light disabled:cursor-not-allowed disabled:opacity-50 ${focusRing} ${className}`}
    >
      <span aria-hidden>{icon}</span>
    </button>
  );
}

/**
 * An action group: several independent actions placed together for
 * compactness. Purely visual grouping — no aria-pressed, no roles that
 * would imply a choice between them.
 */
export function ButtonGroup({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none"
    >
      {children}
    </div>
  );
}

export interface ToggleGroupProps<T extends string> {
  /** Required: names what is being chosen. */
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  size?: ButtonSize;
}

/**
 * A single-select segmented control. This is a FORM CONTROL, not a row of
 * buttons: radiogroup semantics, arrow-key navigation, and only the
 * selected segment in the tab order.
 */
export function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  size = "sm",
}: ToggleGroupProps<T>) {
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const i = options.findIndex((o) => o.value === value);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(options[(i + 1) % options.length].value);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(options[(i - 1 + options.length) % options.length].value);
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(options[0].value);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(options[options.length - 1].value);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="inline-flex [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none"
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={buttonClasses(
              "primary",
              selected ? "solid" : "outline",
              size,
            )}
          >
            {/* Selection is a shape change as well as a colour change. */}
            {selected && (
              <Check aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
