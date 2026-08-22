import { ArrowRight, TrendingDown, TrendingUp, ICON_STROKE, iconSize } from "./icons";
import type { ReactNode } from "react";
import { fillBg, onFillText, glyphOnFill, ringOnFill, type Accent } from "./accents";

// Visual reference implementation of specs/stat-callout.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// A sibling of Card, not a variant of it: the fill IS the content, the
// anatomy is fixed, and the footer link is the only interactive part.

export interface StatCalloutProps {
  /** Formatted for glance-ability: "1,204", "$38,920", "68%". */
  value: string;
  label: string;
  accent?: Accent;
  glyph?: ReactNode;
  /** A trend against a baseline. Its DIRECTION is spelled out in words. */
  trend?: { text: string; direction: "up" | "down" };
  /** 0–100, for a metric that is itself a fraction of a bound. Mutually
   *  exclusive with `trend` — see specs/stat-callout.md's Anatomy. */
  progress?: number;
  href?: string;
  /** Falls back to a name that identifies the metric, not "More info". */
  linkLabel?: string;
  loading?: boolean;
  /** No value for the period. Renders an em dash — not "0". */
  empty?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

export function StatCallout({
  value,
  label,
  accent = "primary",
  glyph,
  trend,
  progress,
  href,
  linkLabel = "More info",
  loading,
  empty,
  error,
  onRetry,
}: StatCalloutProps) {
  // The error state drops OUT of the accent colour: a red callout that
  // failed to load looks exactly like a red callout reporting bad news.
  if (error) {
    return (
      <div className="rounded bg-neutral-light p-card-padding shadow-card">
        <p className="text-sm text-text-primary">Couldn’t load “{label}”.</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 text-sm font-medium text-text-accent-primary hover:underline"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      // A column, so the footer strip pins to the bottom: in a row where
      // one callout has a trend line and another does not, floating
      // strips leave the row visibly ragged.
      className={`relative flex h-full flex-col overflow-hidden rounded shadow-card ${fillBg[accent]} ${onFillText[accent]}`}
      aria-busy={loading || undefined}
    >
      {/* Background texture, not content: several times the large icon
          size, in a low-contrast overlay colour, aria-hidden. */}
      {glyph && (
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-3 top-2 ${glyphOnFill[accent]}`}
        >
          {glyph}
        </span>
      )}

      <div className="relative flex-1 p-card-padding">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-8 w-24 rounded bg-overlay-accent-shade" />
            <div className="h-4 w-32 rounded bg-overlay-accent-shade" />
          </div>
        ) : (
          <>
            {/* Value and label are one unit: "Orders today, 1,204". */}
            <p className="tabular text-xl font-bold leading-dense">
              {empty ? "—" : value}
            </p>
            <p className="text-sm">{label}</p>
            {trend && !empty && (
              <p className="mt-1 flex items-center gap-1 text-sm">
                {trend.direction === "up" ? (
                  <TrendingUp aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
                ) : (
                  <TrendingDown aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
                )}
                {trend.text}
              </p>
            )}
            {progress !== undefined && !empty && !trend && (
              // On-fill placement: the track uses overlay.accent-shade and the
              // fill the same on-fill text colour, per specs/stat-callout.md's
              // Variants — specs/progress-bar.md's own colour variants assume
              // a surface.canvas background this callout does not have.
              <div
                role="progressbar"
                aria-label={`${label}, progress`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                className="mt-2 h-1.5 w-full overflow-hidden rounded-hairline bg-overlay-accent-shade"
              >
                <div
                  className={`h-full rounded-hairline ${onFillText[accent] === "text-text-on-accent" ? "bg-text-on-accent" : "bg-text-on-accent-dark"}`}
                  style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {href && (
        <a
          href={href}
          // Names the metric: four links all announcing "More info" are
          // indistinguishable in a screen reader's link list.
          aria-label={`${linkLabel} about ${label.toLowerCase()}`}
          className={`flex items-center justify-center gap-1 bg-overlay-accent-shade px-card-padding py-3 text-sm hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset ${ringOnFill[accent]}`}
        >
          {linkLabel}
          <ArrowRight aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
        </a>
      )}
    </div>
  );
}
