import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import geoData from "world-atlas/countries-110m.json";
import { Card } from "./Card";
import { Collapse } from "./Disclosure";

// Visual reference implementation of specs/geo-map-card.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// A real projection over real geography, as the spec requires:
// react-simple-maps over Natural Earth data (world-atlas), bundled
// rather than fetched. Both are the DEMO'S choice — see
// foundations/libraries.md — and both are ISC/BSD-licensed public-domain
// derived data. No tile server, so nothing is requested at render time.

export interface GeoMapCardProps {
  title: string;
  /** Country name (as in the geography data) → value. */
  values: Record<string, number>;
  formatValue?: (n: number) => string;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

export function GeoMapCard({
  title,
  values,
  formatValue = (n) => n.toLocaleString(),
  loading,
  error,
  onRetry,
}: GeoMapCardProps) {
  const [hovered, setHovered] = useState<{ name: string; value: number | null } | null>(null);

  const named = Object.entries(values).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...named.map(([, v]) => v));

  const dataTable = (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-neutral-light">
          <th scope="col" className="px-cell-x py-cell-y text-left">
            Country
          </th>
          <th scope="col" className="px-cell-x py-cell-y text-left">
            Sales
          </th>
        </tr>
      </thead>
      <tbody>
        {named.map(([name, value]) => (
          <tr key={name} className="border-t border-surface-border">
            <td className="px-cell-x py-cell-y">{name}</td>
            <td className="px-cell-x py-cell-y">{formatValue(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // A map that fails to load must not leave a blank rectangle: the
  // numbers are still available even when the picture is not.
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

  const summary = `${title}. Highest in ${named
    .slice(0, 3)
    .map(([n]) => n)
    .join(", ")}. No data for the remaining countries.`;

  return (
    <Card title={title} titleText={title} collapsible>
      <div className="h-viz-h w-full overflow-hidden rounded bg-surface-canvas">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-neutral-light" />
        ) : (
          <div role="img" aria-label={summary} className="h-full w-full">
            <ComposableMap
              projection="geoEqualEarth"
              // Cropped above Antarctica: an empty white band at the foot
              // of the card is a fifth of the map area spent on nothing.
              projectionConfig={{ scale: 175, center: [0, 14] }}
              width={800}
              height={330}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const name = geo.properties.name as string;
                    const value = values[name] ?? null;
                    const t = value === null ? null : value / max;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        tabIndex={value === null ? -1 : 0}
                        role="button"
                        aria-label={`${name}: ${
                          value === null ? "no data" : formatValue(value)
                        }`}
                        onMouseEnter={() => setHovered({ name, value })}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered({ name, value })}
                        onBlur={() => setHovered(null)}
                        style={{
                          default: {
                            fill:
                              t === null
                                ? "var(--color-neutral-light)"
                                : "var(--color-chart-series-1)",
                            fillOpacity: t === null ? 1 : 0.3 + t * 0.7,
                            stroke: "var(--color-chart-grid)",
                            strokeWidth: 0.4,
                            outline: "none",
                          },
                          hover: {
                            fill:
                              t === null
                                ? "var(--color-neutral-light)"
                                : "var(--color-chart-series-1)",
                            fillOpacity: t === null ? 1 : 0.45 + t * 0.55,
                            stroke: "var(--color-text-primary)",
                            strokeWidth: 0.8,
                            outline: "none",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
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
                "linear-gradient(to right, color-mix(in srgb, var(--color-chart-series-1) 30%, white), var(--color-chart-series-1))",
            }}
          />
          High
        </span>
        <span className="flex items-center gap-2">
          {/* Named in the legend, and NOT the lightest shade of the scale,
              which would read as a low value rather than as absent. */}
          <span
            aria-hidden
            className="inline-block h-3 w-3 border border-dashed border-text-secondary bg-neutral-light"
          />
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
