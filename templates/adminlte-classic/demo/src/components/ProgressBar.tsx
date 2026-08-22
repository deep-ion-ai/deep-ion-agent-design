import { fillBg, onFillText, type Accent } from "./accents";
import { usePrefersReducedMotion } from "./motion";

// Visual reference implementation of specs/progress-bar.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type ProgressBarSize = "default" | "sm";

export interface ProgressBarProps {
  /** Accessible name — what is progressing ("Photo upload"), not a bare "Progress". */
  label: string;
  /** 0–100. Omit (or pass indeterminate) when the fraction is unknown. */
  value?: number;
  indeterminate?: boolean;
  /** Announced via aria-valuetext when indeterminate ("Uploading…"). */
  statusText?: string;
  size?: ProgressBarSize;
  accent?: Accent;
  /** Overlaid percentage — default size only; a `sm` bar has no room for it. */
  showLabel?: boolean;
  /** Divides the track into equal steps for a multi-step process. */
  segments?: number;
  className?: string;
}

export function ProgressBar({
  label,
  value = 0,
  indeterminate = false,
  statusText,
  size = "default",
  accent = "primary",
  showLabel = size === "default",
  segments,
  className = "",
}: ProgressBarProps) {
  const reducedMotion = usePrefersReducedMotion();
  const clamped = Math.max(0, Math.min(100, value));
  const rounded = Math.round(clamped);
  const height = size === "default" ? "h-5" : "h-1.5";

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 100}
      aria-valuenow={indeterminate ? undefined : rounded}
      aria-valuetext={indeterminate ? statusText : undefined}
      className={`relative w-full overflow-hidden rounded-hairline bg-surface-border ${height} ${className}`}
    >
      {indeterminate ? (
        <div
          className={`h-full w-1/3 rounded-hairline ${fillBg[accent]} ${
            reducedMotion ? "animate-pulse" : "animate-progress-sweep"
          }`}
        />
      ) : (
        <div
          className={`h-full rounded-hairline transition-[width] duration-300 ${fillBg[accent]}`}
          style={{ width: `${clamped}%` }}
        >
          {showLabel && clamped >= 12 && (
            <span
              aria-hidden
              className={`flex h-full items-center justify-end pr-1 text-xs font-medium ${onFillText[accent]}`}
            >
              {rounded}%
            </span>
          )}
        </div>
      )}

      {/* Segment gaps are presentation only — the whole track stays one
          progressbar; see specs/progress-bar.md's Accessibility rules. */}
      {segments && segments > 1 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 flex">
          {Array.from({ length: segments - 1 }).map((_, i) => (
            <div
              key={i}
              className="h-full border-r-2 border-surface-canvas"
              style={{ width: `${100 / segments}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** A `sm` bar paired with an adjacent (non-overlaid) text value — the
 *  compact placement `specs/progress-bar.md` describes for a table cell
 *  or a Stat Callout accessory. */
export function ProgressBarInline({
  label,
  value,
  accent = "primary",
  className = "",
}: {
  label: string;
  value: number;
  accent?: Accent;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ProgressBar label={label} value={value} size="sm" accent={accent} showLabel={false} className="flex-1" />
      <span className="text-xs text-text-secondary">{Math.round(value)}%</span>
    </div>
  );
}
