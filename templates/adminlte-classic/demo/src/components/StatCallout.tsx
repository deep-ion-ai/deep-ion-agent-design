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
      className={`relative overflow-hidden rounded shadow-card ${fillBg[accent]} ${onFillText[accent]}`}
      aria-busy={loading || undefined}
    >
      {glyph && (
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-2 top-1 select-none text-[5rem] leading-none ${glyphOnFill[accent]}`}
        >
          {glyph}
        </span>
      )}

      <div className="relative p-card-padding">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-8 w-24 rounded bg-overlay-accent-shade" />
            <div className="h-4 w-32 rounded bg-overlay-accent-shade" />
          </div>
        ) : (
          <>
            {/* Value and label are one unit: "Orders today, 1,204". */}
            <p className="text-xl font-bold leading-dense">{empty ? "—" : value}</p>
            <p className="text-sm">{label}</p>
            {trend && !empty && (
              <p className="mt-1 text-sm">
                <span aria-hidden>{trend.direction === "up" ? "↑" : "↓"}</span>{" "}
                {trend.text}
              </p>
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
          <span aria-hidden>→</span>
        </a>
      )}
    </div>
  );
}
