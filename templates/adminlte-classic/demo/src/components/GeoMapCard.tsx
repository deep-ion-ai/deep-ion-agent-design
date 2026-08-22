import { useState } from "react";
import { Card } from "./Card";
import { Collapse } from "./Disclosure";

// Visual reference implementation of specs/geo-map-card.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The geography below is a deliberately simplified, stylised outline drawn
// inline, NOT a cartographically accurate map and not a mapping library.
// The spec is library-agnostic; a real project supplies its own map. What
// this demo does implement faithfully are the parts the spec insists on:
// the "no data" tone, the legend, the tabular equivalent, and the error
// state that keeps the numbers reachable when the picture fails.

export interface Region {
  id: string;
  name: string;
  /** Rough blob, in the 0 0 400 200 viewBox. */
  d: string;
  value: number | null;
}

export interface GeoMapCardProps {
  title: string;
  regions: Region[];
  formatValue?: (n: number) => string;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

export function GeoMapCard({
  title,
  regions,
  formatValue = (n) => n.toLocaleString(),
  loading,
  error,
  onRetry,
}: GeoMapCardProps) {
  const [hovered, setHovered] = useState<Region | null>(null);
  const values = regions.map((r) => r.value ?? 0);
  const max = Math.max(1, ...values);

  const dataTable = (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-neutral-light">
          <th scope="col" className="px-cell-x py-cell-y text-left">Region</th>
          <th scope="col" className="px-cell-x py-cell-y text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        {regions.map((r) => (
          <tr key={r.id} className="border-t border-surface-border">
            <td className="px-cell-x py-cell-y">{r.name}</td>
            <td className="px-cell-x py-cell-y">
              {r.value === null ? "No data" : formatValue(r.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // A map that fails to load must not leave a blank rectangle: the numbers
  // are still available even when the picture is not.
  if (error) {
    return (
      <Card title={title} titleText={title} collapsible>
        <p className="text-sm text-text-accent-danger">The map couldn’t be loaded.</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 text-sm font-medium text-text-accent-primary hover:underline"
          >
            Retry
          </button>
        )}
        <div className="mt-3">{dataTable}</div>
      </Card>
    );
  }

  const named = regions.filter((r) => r.value !== null).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  const noData = regions.filter((r) => r.value === null).length;
  const summary = `${title}. Highest in ${named.slice(0, 3).map((r) => r.name).join(", ")}. No data for ${noData} regions.`;

  return (
    <Card title={title} titleText={title} collapsible>
      <div className="h-viz-h w-full overflow-hidden rounded bg-surface-canvas">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-neutral-light" />
        ) : (
          <svg role="img" aria-label={summary} viewBox="0 0 400 200" className="h-full w-full">
            {regions.map((r) => {
              const t = r.value === null ? null : (r.value ?? 0) / max;
              return (
                <path
                  key={r.id}
                  d={r.d}
                  tabIndex={0}
                  role="button"
                  aria-label={`${r.name}: ${r.value === null ? "no data" : formatValue(r.value)}`}
                  onMouseEnter={() => setHovered(r)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(r)}
                  onBlur={() => setHovered(null)}
                  fill={t === null ? "var(--color-neutral-light)" : "var(--color-chart-series-1)"}
                  fillOpacity={t === null ? 1 : 0.25 + t * 0.75}
                  stroke="var(--color-chart-grid)"
                  strokeWidth={1}
                  className="outline-none focus-visible:stroke-brand-primary focus-visible:stroke-2"
                />
              );
            })}
          </svg>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-2">
          Low
          <span
            aria-hidden
            className="inline-block h-3 w-24 rounded-hairline"
            style={{
              background:
                "linear-gradient(to right, color-mix(in srgb, var(--color-chart-series-1) 25%, white), var(--color-chart-series-1))",
            }}
          />
          High
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-3 w-3 border border-chart-grid bg-neutral-light" />
          {/* Named in the legend, and NOT the lightest shade of the scale,
              which would read as a low value rather than as absent. */}
          No data
        </span>
        {hovered && (
          <span className="ml-auto rounded border border-surface-border bg-surface-canvas px-2 py-1 text-sm text-text-primary shadow-raised">
            {hovered.name}:{" "}
            {hovered.value === null ? "No data" : formatValue(hovered.value)}
          </span>
        )}
      </div>

      <div className="mt-3 border-t border-surface-border pt-3">
        <Collapse label="View as table">{dataTable}</Collapse>
      </div>
    </Card>
  );
}
