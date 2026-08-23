// The one drawing in this demo. Demo scaffolding only — see
// ../../README.md and /AGENTS.md.
//
// WHY THIS ONE IS NOT A PHOTOGRAPH
//
// Its subject is the shape of a page: a narrow column of text with a
// wider element cutting across it. That is diagrammatic content, and
// foundations/imagery.md's dark-theme rule applies to it exactly —
// "author diagrams as SVG with currentColor where possible" — so it
// is drawn from `currentColor` plus the accent tokens and needs no
// second asset and no filter to follow the theme.
//
// The covers, whose subject is not diagrammatic, are photographs. See
// Photo.tsx. The same foundation governs both, and the difference
// between them is the content, not a preference for drawings.

/** A narrow column of text interrupted by a block that runs wider than
 *  it — the alternation this template's rhythm depends on. */
function Breakout() {
  const col = { x: 96, w: 128 };
  const rows = [34, 46, 58, 70];
  const tail = [128, 140, 152];
  const line = (x: number, y: number, w: number, key: string) => (
    <rect key={key} x={x} y={y} width={w} height={5} rx={1} fill="currentColor" opacity={0.22} />
  );
  return (
    <>
      {rows.map((y, i) =>
        line(col.x, y, col.w - (i === rows.length - 1 ? 34 : 0), `t${i}`),
      )}
      {/* The wide element, breaking past the column on both sides. */}
      <rect x={36} y={88} width={248} height={30} rx={2} className="fill-accent-base" opacity={0.85} />
      {tail.map((y, i) => line(col.x, y, col.w - (i === tail.length - 1 ? 52 : 0), `b${i}`))}
      {/* The column's own edges, so the break-out is legible as one. */}
      {[col.x - 10, col.x + col.w + 10].map((x) => (
        <line
          key={x}
          x1={x}
          y1={26}
          x2={x}
          y2={160}
          stroke="currentColor"
          strokeOpacity={0.22}
          strokeWidth={1}
          strokeDasharray="3 4"
        />
      ))}
    </>
  );
}

export interface DiagramProps {
  /** Tailwind aspect class — the container reserves the space so
   *  nothing reflows, per foundations/imagery.md. */
  aspect?: string;
  /** A diagram that carries information states what it shows. */
  alt: string;
  className?: string;
}

export function Diagram({ aspect = "aspect-[16/9]", alt, className = "" }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
      className={`block w-full bg-accent-wash text-text-primary ${aspect} ${className}`}
    >
      <Breakout />
    </svg>
  );
}
