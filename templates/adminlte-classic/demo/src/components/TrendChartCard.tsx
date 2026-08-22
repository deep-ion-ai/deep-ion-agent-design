import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "./Card";
import { Collapse } from "./Disclosure";
import { usePrefersReducedMotion } from "./motion";

// Visual reference implementation of specs/trend-chart-card.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Drawn with a charting library, as the spec requires. Recharts is the
// DEMO'S choice, not the template's: foundations/libraries.md lists
// starting points per ecosystem, and a project's existing library wins.
// Everything the spec fixes — the accessible summary, keyboard-reachable
// values, the legend with per-series marks, token colours, no animation
// under reduced motion — is enforced here in the wrapper.

export type SeriesMark = "circle" | "square" | "triangle";

export interface Series {
  id: string;
  name: string;
  values: number[];
  /** The second, non-colour signal: a mark shape per series. */
  mark: SeriesMark;
  colorVar: string;
}

export interface TrendChartCardProps {
  title: string;
  labels: string[];
  series: Series[];
  formatValue?: (n: number) => string;
  loading?: boolean;
  /** No data for the period — names the period rather than drawing an empty grid. */
  emptyMessage?: string;
}

function MarkGlyph({
  mark,
  x,
  y,
  fill,
  size = 4,
}: {
  mark: SeriesMark;
  x: number;
  y: number;
  fill: string;
  size?: number;
}) {
  if (mark === "square")
    return (
      <rect
        x={x - size}
        y={y - size}
        width={size * 2}
        height={size * 2}
        fill={fill}
      />
    );
  if (mark === "triangle")
    return (
      <polygon
        points={`${x},${y - size - 1} ${x + size + 1},${y + size} ${x - size - 1},${y + size}`}
        fill={fill}
      />
    );
  return <circle cx={x} cy={y} r={size} fill={fill} />;
}

function seriesDot(mark: SeriesMark, colorVar: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => (
    <MarkGlyph
      mark={mark}
      x={props.cx}
      y={props.cy}
      fill={`var(${colorVar})`}
      size={3}
    />
  );
}

export function TrendChartCard({
  title,
  labels,
  series,
  formatValue = (n) => n.toLocaleString(),
  loading,
  emptyMessage,
}: TrendChartCardProps) {
  const reduceMotion = usePrefersReducedMotion();

  const data = useMemo(
    () =>
      labels.map((label, i) => {
        const row: Record<string, string | number> = { label };
        series.forEach((s) => (row[s.id] = s.values[i]));
        return row;
      }),
    [labels, series],
  );

  // The text equivalent: name, period, start, end, direction, extremes.
  const summary = series
    .map((s) => {
      const first = s.values[0];
      const last = s.values[s.values.length - 1];
      const peak = Math.max(...s.values);
      const peakAt = labels[s.values.indexOf(peak)];
      const dir = last > first ? "rose" : last < first ? "fell" : "was flat";
      return `${s.name}, ${labels[0]} to ${labels[labels.length - 1]}: ${dir} from ${formatValue(first)} to ${formatValue(last)}, peaking at ${formatValue(peak)} in ${peakAt}.`;
    })
    .join(" ");

  if (emptyMessage) {
    return (
      <Card title={title} titleText={title} collapsible>
        <p className="py-8 text-center text-sm text-text-secondary">
          {emptyMessage}
        </p>
      </Card>
    );
  }

  return (
    <Card title={title} titleText={title} collapsible loading={loading}>
      {/* Legend: required, and pairs each colour with its mark shape, so
          identity never rests on colour alone. */}
      <ul className="m-0 mb-3 flex list-none flex-wrap gap-4 p-0">
        {series.map((s) => (
          <li
            key={s.id}
            className="flex items-center gap-2 text-sm text-text-secondary"
          >
            <svg width="14" height="14" aria-hidden>
              <MarkGlyph
                mark={s.mark}
                x={7}
                y={7}
                fill={`var(${s.colorVar})`}
              />
            </svg>
            {s.name}
          </li>
        ))}
      </ul>

      {/* The summary carries the chart's content for anyone who cannot see
          it. It is a figcaption rather than role="img" on the plot: the
          plot is keyboard-operable, and role="img" would hide the very
          interaction the spec requires from assistive tech. */}
      <figure className="m-0">
        <figcaption className="sr-only">
          {title}. {summary}
        </figcaption>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
              // Makes the plot focusable and driven by the arrow keys, so
              // every value the pointer can reveal is reachable without one.
              accessibilityLayer
              // That focusable surface is role="application", so it needs a
              // name of its own — the figcaption names the figure, not the
              // control inside it.
              aria-label={`${title}, interactive chart. Use the arrow keys to move between months.`}
            >
              <CartesianGrid
                stroke="var(--color-chart-grid)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--color-chart-grid)" }}
              />
              <YAxis
                width={56}
                tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => formatValue(v)}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-chart-grid)" }}
                formatter={(value, name) => [
                  formatValue(Number(value)),
                  String(name),
                ]}
                contentStyle={{
                  background: "var(--color-surface-canvas)",
                  border: "1px solid var(--color-surface-border)",
                  borderRadius: "var(--radius-base)",
                  boxShadow: "var(--shadow-raised)",
                  fontSize: "var(--font-size-sm)",
                }}
                labelStyle={{
                  color: "var(--color-text-primary)",
                  fontWeight: 500,
                }}
              />
              {series.map((s) => (
                <Line
                  key={s.id}
                  type="monotone"
                  dataKey={s.id}
                  name={s.name}
                  stroke={`var(${s.colorVar})`}
                  strokeWidth={2}
                  dot={seriesDot(s.mark, s.colorVar)}
                  activeDot={{ r: 5 }}
                  isAnimationActive={!reduceMotion}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </figure>

      <div className="mt-3 border-t border-surface-border pt-3">
        <Collapse label="View data table">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-light">
                <th scope="col" className="px-cell-x py-cell-y text-left">
                  Month
                </th>
                {series.map((s) => (
                  <th
                    key={s.id}
                    scope="col"
                    className="px-cell-x py-cell-y text-left"
                  >
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map((lb, i) => (
                <tr key={lb} className="border-t border-surface-border">
                  <td className="px-cell-x py-cell-y">{lb}</td>
                  {series.map((s) => (
                    <td key={s.id} className="px-cell-x py-cell-y">
                      {formatValue(s.values[i])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Collapse>
      </div>
    </Card>
  );
}
