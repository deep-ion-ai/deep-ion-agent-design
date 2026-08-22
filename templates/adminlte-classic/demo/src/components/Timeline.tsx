import type { ReactNode } from "react";
import { fillBg, onFillText, type Accent } from "./accents";

// Visual reference implementation of specs/timeline.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// An ordered list, because the sequence IS the content: marking a
// chronology as a stack of divs throws away the one thing separating this
// from a column of cards.

export interface TimelineEntry {
  id: string;
  /** Machine-readable timestamp for <time datetime>. */
  dateTime: string;
  /** Visible, possibly relative, label. */
  timeLabel: string;
  accent?: Accent;
  glyph?: ReactNode;
  heading: string;
  body?: ReactNode;
  actions?: ReactNode;
}

export interface TimelineGroup {
  id: string;
  /** e.g. "12 March" — a heading, not a separator: it introduces its entries. */
  label: string;
  entries: TimelineEntry[];
}

export interface TimelineProps {
  groups: TimelineGroup[];
  /** Stated in the accessible name: a timeline of ambiguous direction is misread. */
  direction?: "newest-first" | "oldest-first";
  label?: string;
  condensed?: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  emptyMessage?: string;
}

export function Timeline({
  groups,
  direction = "newest-first",
  label = "Activity",
  condensed = false,
  headingLevel = 3,
  emptyMessage = "No activity yet",
}: TimelineProps) {
  const Heading = `h${headingLevel}` as "h3";
  const total = groups.reduce((n, g) => n + g.entries.length, 0);

  // Empty drops the line and markers: a connecting line joining nothing
  // reads as a rendering failure.
  if (total === 0) {
    return <p className="text-sm text-text-secondary">{emptyMessage}</p>;
  }

  return (
    <div aria-label={`${label}, ${direction.replace("-", " ")}`} role="group">
      {groups.map((group) => (
        <section key={group.id} className="mb-5 last:mb-0">
          <Heading className="mb-3 inline-block rounded-pill border border-surface-border bg-neutral-light px-3 py-1 text-sm font-medium text-text-primary">
            {group.label}
          </Heading>

          <ol className="relative m-0 list-none p-0">
            {/* Decorative: the ordered list already carries the sequence. */}
            <span
              aria-hidden
              className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-surface-border"
            />
            {group.entries.map((entry) => (
              <li key={entry.id} className="relative mb-5 pl-9 last:mb-0">
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-pill text-xs ${fillBg[entry.accent ?? "primary"]} ${onFillText[entry.accent ?? "primary"]}`}
                >
                  {entry.glyph ?? "•"}
                </span>

                {condensed ? (
                  <p className="text-sm text-text-primary">
                    <time dateTime={entry.dateTime} className="mr-2 text-xs text-text-secondary">
                      {entry.timeLabel}
                    </time>
                    {entry.heading}
                  </p>
                ) : (
                  <div className="rounded border border-surface-border bg-surface-canvas p-card-padding shadow-card">
                    <time dateTime={entry.dateTime} className="text-xs text-text-secondary">
                      {entry.timeLabel}
                    </time>
                    <p className="mt-1 text-sm font-medium text-text-primary">
                      {entry.heading}
                    </p>
                    {entry.body && (
                      <div className="mt-1 text-sm text-text-secondary">{entry.body}</div>
                    )}
                    {entry.actions && <div className="mt-3">{entry.actions}</div>}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
