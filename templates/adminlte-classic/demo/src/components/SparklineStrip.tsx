// Visual reference implementation of specs/sparkline-strip.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface SparklineItem {
  id: string;
  label: string;
  /** Present by default: a trend with no scale says a line rose, not from what. */
  value?: string;
  values: number[];
  delta?: { text: string; direction: "up" | "down" };
  period?: string;
}

export interface SparklineStripProps {
  items: SparklineItem[];
  loading?: boolean;
}

function path(values: number[], w: number, h: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = w / Math.max(1, values.length - 1);
  const pts = values.map((v, i) => [i * step, h - ((v - min) / span) * (h - 4) - 2]);
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w},${h} L0,${h} Z` };
}

export function SparklineStrip({ items, loading }: SparklineStripProps) {
  // Every item shares one muted tone: colouring them differently would
  // imply a distinction between the measures that does not exist.
  return (
    <ul className="m-0 grid list-none grid-cols-1 divide-y divide-surface-border p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((item) => {
        const { line, area } = path(item.values, 120, 40);
        const direction =
          item.values[item.values.length - 1] >= item.values[0] ? "rising" : "falling";
        return (
          <li key={item.id} className="px-3 py-3 text-center">
            {loading ? (
              <div className="mx-auto h-[50px] w-full animate-pulse rounded bg-neutral-light" />
            ) : (
              <svg
                role="img"
                aria-label={`${item.label}${item.value ? `, ${item.value}` : ""}${item.period ? ` ${item.period}` : ""}, ${direction}`}
                viewBox="0 0 120 40"
                className="mx-auto h-[50px] w-full max-w-[9rem]"
              >
                <path d={area} fill="var(--color-chart-sparkline)" fillOpacity={0.15} />
                <path d={line} fill="none" stroke="var(--color-chart-sparkline)" strokeWidth={1.5} />
              </svg>
            )}
            {item.value !== undefined && (
              <p className="mt-1 text-lg font-medium leading-dense text-text-primary">
                {loading ? "—" : item.value}
              </p>
            )}
            <p className="text-sm text-text-secondary">{item.label}</p>
            {item.delta && !loading && (
              <p
                className={`text-xs ${
                  item.delta.direction === "up"
                    ? "text-text-accent-success"
                    : "text-text-accent-danger"
                }`}
              >
                <span aria-hidden>{item.delta.direction === "up" ? "↑" : "↓"}</span>{" "}
                {item.delta.text}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
