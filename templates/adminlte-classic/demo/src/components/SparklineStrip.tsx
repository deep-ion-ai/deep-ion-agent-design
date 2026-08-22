import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp, ICON_STROKE, iconSize } from "./icons";
import { usePrefersReducedMotion } from "./motion";

// Visual reference implementation of specs/sparkline-strip.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Drawn with the same charting library as the Trend Chart Card. The spec
// allows a hand-drawn path here — a sparkline has no axes, ticks, legend
// or hit-testing — but reusing the library keeps one dependency doing
// both jobs. The accessible name is required either way.

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

export function SparklineStrip({ items, loading }: SparklineStripProps) {
  const reduceMotion = usePrefersReducedMotion();

  // Every item shares one muted tone: colouring them differently would
  // imply a distinction between the measures that does not exist.
  return (
    <ul className="m-0 grid list-none grid-cols-1 divide-y divide-surface-border p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((item) => {
        const direction =
          item.values[item.values.length - 1] >= item.values[0] ? "rising" : "falling";
        const data = item.values.map((v, i) => ({ i, v }));
        return (
          <li key={item.id} className="px-3 py-3 text-center">
            <div
              role="img"
              aria-label={`${item.label}${item.value ? `, ${item.value}` : ""}${item.period ? ` ${item.period}` : ""}, ${direction}`}
              className="mx-auto h-[50px] w-full max-w-[9rem]"
            >
              {loading ? (
                <div className="h-full w-full animate-pulse rounded bg-neutral-light" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="var(--color-chart-sparkline)"
                      strokeWidth={1.5}
                      fill="var(--color-chart-sparkline)"
                      fillOpacity={0.15}
                      dot={false}
                      isAnimationActive={!reduceMotion}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
            {item.value !== undefined && (
              <p className="tabular mt-1 text-lg font-medium leading-dense text-text-primary">
                {loading ? "—" : item.value}
              </p>
            )}
            <p className="text-sm text-text-secondary">{item.label}</p>
            {item.delta && !loading && (
              <p
                className={`flex items-center justify-center gap-1 text-xs ${
                  item.delta.direction === "up"
                    ? "text-text-accent-success"
                    : "text-text-accent-danger"
                }`}
              >
                {item.delta.direction === "up" ? (
                  <TrendingUp aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
                ) : (
                  <TrendingDown aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
                )}
                {item.delta.text}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
