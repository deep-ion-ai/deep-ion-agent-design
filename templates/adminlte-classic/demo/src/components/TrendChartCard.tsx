import { useMemo, useState } from "react";
import { Card } from "./Card";
import { Collapse } from "./Disclosure";

// Visual reference implementation of specs/trend-chart-card.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Deliberately hand-drawn SVG rather than a charting library: the spec is
// library-agnostic, and shipping a library here would read as the template
// endorsing one. A real project plugs in whatever it already uses.

export interface Series {
  id: string;
  name: string;
  values: number[];
  /** The second, non-colour signal: a mark shape per series. */
  mark: "circle" | "square" | "triangle";
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

const W = 640;
const H = 260;
const PAD = { top: 16, right: 16, bottom: 28, left: 44 };

function Mark({ shape, x, y, fill }: { shape: Series["mark"]; x: number; y: number; fill: string }) {
  if (shape === "square") return <rect x={x - 3} y={y - 3} width={6} height={6} fill={fill} />;
  if (shape === "triangle")
    return <polygon points={`${x},${y - 4} ${x + 4},${y + 3} ${x - 4},${y + 3}`} fill={fill} />;
  return <circle cx={x} cy={y} r={3.5} fill={fill} />;
}

export function TrendChartCard({
  title,
  labels,
  series,
  formatValue = (n) => n.toLocaleString(),
  loading,
  emptyMessage,
}: TrendChartCardProps) {
  const [active, setActive] = useState<number | null>(null);

  const { max, points, ticks } = useMemo(() => {
    const all = series.flatMap((s) => s.values);
    const rawMax = Math.max(1, ...all);
    const max = Math.ceil(rawMax / 1000) * 1000 || rawMax;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const x = (i: number) => PAD.left + (innerW * i) / Math.max(1, labels.length - 1);
    const y = (v: number) => PAD.top + innerH - (innerH * v) / max;
    return {
      max,
      points: series.map((s) => s.values.map((v, i) => ({ x: x(i), y: y(v), v }))),
      ticks: [0, 0.25, 0.5, 0.75, 1].map((f) => ({ v: max * f, y: y(max * f) })),
    };
  }, [series, labels.length]);

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
        <p className="py-8 text-center text-sm text-text-secondary">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card title={title} titleText={title} collapsible loading={loading}>
      {/* Legend: required, because colour alone does not separate series. */}
      <ul className="m-0 mb-3 flex list-none flex-wrap gap-4 p-0">
        {series.map((s) => (
          <li key={s.id} className="flex items-center gap-2 text-sm text-text-secondary">
            <svg width="14" height="14" aria-hidden>
              <Mark shape={s.mark} x={7} y={7} fill={`var(${s.colorVar})`} />
            </svg>
            {s.name}
          </li>
        ))}
      </ul>

      <div className="overflow-x-auto">
        <svg
          role="img"
          aria-label={`${title}. ${summary}`}
          viewBox={`0 0 ${W} ${H}`}
          className="h-[260px] w-full min-w-[32rem]"
          onMouseLeave={() => setActive(null)}
        >
          {ticks.map((t) => (
            <g key={t.v}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={t.y}
                y2={t.y}
                stroke="var(--color-chart-grid)"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 8}
                y={t.y + 4}
                textAnchor="end"
                fontSize="10"
                fill="var(--color-text-secondary)"
              >
                {formatValue(Math.round(t.v))}
              </text>
            </g>
          ))}

          {labels.map((lb, i) =>
            i % Math.ceil(labels.length / 12) === 0 ? (
              <text
                key={lb}
                x={points[0]?.[i]?.x ?? 0}
                y={H - 8}
                textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
                fontSize="10"
                fill="var(--color-text-secondary)"
              >
                {lb}
              </text>
            ) : null,
          )}

          {series.map((s, si) => (
            <g key={s.id}>
              <polyline
                fill="none"
                stroke={`var(${s.colorVar})`}
                strokeWidth={2}
                points={points[si].map((p) => `${p.x},${p.y}`).join(" ")}
              />
              {points[si].map((p, i) => (
                <Mark key={i} shape={s.mark} x={p.x} y={p.y} fill={`var(${s.colorVar})`} />
              ))}
            </g>
          ))}

          {/* One focusable hit area per period, so every value the pointer
              can reveal is reachable by keyboard too. */}
          {labels.map((lb, i) => (
            <rect
              key={lb}
              x={(points[0]?.[i]?.x ?? 0) - 12}
              y={PAD.top}
              width={24}
              height={H - PAD.top - PAD.bottom}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${lb}: ${series.map((s) => `${s.name} ${formatValue(s.values[i])}`).join(", ")}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            />
          ))}

          {active !== null && (
            <line
              x1={points[0][active].x}
              x2={points[0][active].x}
              y1={PAD.top}
              y2={H - PAD.bottom}
              stroke="var(--color-chart-grid)"
              strokeWidth={1}
            />
          )}
        </svg>
      </div>

      {active !== null && (
        <p className="mt-2 rounded border border-surface-border bg-surface-canvas px-3 py-2 text-sm shadow-raised">
          <strong className="font-medium">{labels[active]}</strong>{" "}
          {series.map((s) => `· ${s.name} ${formatValue(s.values[active])}`).join(" ")}
        </p>
      )}

      <div className="mt-3 border-t border-surface-border pt-3">
        <Collapse label="View data table">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-light">
                <th scope="col" className="px-cell-x py-cell-y text-left">
                  Month
                </th>
                {series.map((s) => (
                  <th key={s.id} scope="col" className="px-cell-x py-cell-y text-left">
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
