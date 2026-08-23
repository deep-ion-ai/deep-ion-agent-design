// Original specimen artwork for the demo's covers and figures.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// WHY SVG RATHER THAN PHOTOGRAPHS
//
// foundations/imagery.md prescribes exactly this for anything
// diagrammatic: "author diagrams as SVG with currentColor where
// possible, or supply a dark variant and select it with the theme."
// These are drawn from `currentColor` plus the accent tokens, so they
// follow the theme with no second asset and no CSS filter — the rule
// that foundation states, demonstrated rather than only asserted.
//
// They are also original work, MIT with the rest of the repository, so
// the template's ATTRIBUTION.md keeps a clean provenance record.
//
// Each piece is abstract-editorial: it depicts the thing its article is
// about (a measure overrunning, a scale, a theme inverting) rather than
// decorating the page with something unrelated.

export type ArtworkName =
  | "measure"
  | "layers"
  | "invert"
  | "underline"
  | "scale"
  | "breakout";

/** Abstract "text lines" — the unit every one of these is built from. */
function Line({
  x,
  y,
  w,
  h = 6,
  o = 0.22,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  o?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={1} fill="currentColor" opacity={o} />;
}

/** A column of text whose last lines overrun the marked measure — the
 *  article this illustrates is about exactly that. */
function Measure() {
  const ws = [176, 168, 180, 172, 164, 178];
  return (
    <>
      {ws.map((w, i) => (
        <Line key={i} x={40} y={38 + i * 16} w={w} />
      ))}
      {/* The measure boundary. */}
      <line
        x1={224}
        y1={28}
        x2={224}
        y2={152}
        stroke="currentColor"
        strokeOpacity={0.28}
        strokeWidth={1}
        strokeDasharray="3 4"
      />
      {/* Two lines running past it, in the accent. */}
      <rect x={40} y={134} width={244} height={6} rx={1} className="fill-accent-base" />
      <rect x={40} y={150} width={228} height={6} rx={1} className="fill-accent-base" opacity={0.55} />
    </>
  );
}

/** Flat planes separated by rules and a surface step — no shadows. */
function Layers() {
  return (
    <>
      <rect x={36} y={30} width={248} height={40} rx={2} fill="currentColor" opacity={0.07} />
      <rect x={36} y={78} width={248} height={40} rx={2} fill="currentColor" opacity={0.12} />
      <rect x={36} y={126} width={248} height={28} rx={2} className="fill-accent-base" opacity={0.9} />
      {[70, 118].map((y) => (
        <line key={y} x1={36} y1={y} x2={284} y2={y} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} />
      ))}
      <Line x={52} y={44} w={120} o={0.3} />
      <Line x={52} y={92} w={92} o={0.3} />
    </>
  );
}

/** The same marks in both themes, the two colours exchanged. */
function Invert() {
  return (
    <>
      <rect x={28} y={30} width={124} height={124} rx={2} fill="currentColor" opacity={0.06} />
      <rect x={168} y={30} width={124} height={124} rx={2} fill="currentColor" opacity={0.85} />
      {[0, 1, 2].map((i) => (
        <Line key={`l${i}`} x={46} y={52 + i * 18} w={88 - i * 16} o={0.35} />
      ))}
      {[0, 1, 2].map((i) => (
        <rect
          key={`r${i}`}
          x={186}
          y={52 + i * 18}
          width={88 - i * 16}
          height={6}
          rx={1}
          className="fill-surface-canvas"
          opacity={0.75}
        />
      ))}
      <circle cx={90} cy={128} r={11} className="fill-accent-base" />
      <circle cx={230} cy={128} r={11} className="fill-accent-base" opacity={0.55} />
    </>
  );
}

/** Text lines with underlined segments — the article's whole argument. */
function Underline() {
  const rows = [
    { w: 190, u: [40, 54] },
    { w: 206, u: [120, 62] },
    { w: 178, u: null },
    { w: 198, u: [86, 48] },
    { w: 164, u: null },
  ];
  return (
    <>
      {rows.map((r, i) => {
        const y = 40 + i * 24;
        return (
          <g key={i}>
            <Line x={56} y={y} w={r.w} />
            {r.u && (
              <>
                <rect x={r.u[0]} y={y} width={r.u[1]} height={6} rx={1} className="fill-accent-base" />
                <rect x={r.u[0]} y={y + 9} width={r.u[1]} height={1.5} rx={0.75} className="fill-accent-base" />
              </>
            )}
          </g>
        );
      })}
    </>
  );
}

/** A ladder of sizes, with the space above each step larger than below. */
function Scale() {
  const steps = [
    { y: 26, h: 18, w: 150 },
    { y: 62, h: 13, w: 118 },
    { y: 92, h: 10, w: 96 },
    { y: 116, h: 7, w: 78 },
  ];
  return (
    <>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={44} y={s.y} width={s.w} height={s.h} rx={1.5} fill="currentColor" opacity={0.26} />
          {[0, 1].map((k) => (
            <Line key={k} x={44} y={s.y + s.h + 7 + k * 9} w={s.w + 70 - k * 24} o={0.13} />
          ))}
        </g>
      ))}
      {/* Each tick sits immediately after the bar it measures, rather
          than floating at the frame's edge. */}
      <rect x={202} y={26} width={3} height={18} rx={1.5} className="fill-accent-base" />
      <rect x={170} y={62} width={3} height={13} rx={1.5} className="fill-accent-base" opacity={0.75} />
      <rect x={148} y={92} width={3} height={10} rx={1.5} className="fill-accent-base" opacity={0.55} />
    </>
  );
}

/** A narrow column of text interrupted by a block that runs wider than
 *  it — the alternation this template's rhythm depends on. */
function Breakout() {
  const col = { x: 96, w: 128 };
  const rows = [34, 46, 58, 70];
  const tail = [128, 140, 152];
  return (
    <>
      {rows.map((y, i) => (
        <Line key={`t${i}`} x={col.x} y={y} w={col.w - (i === rows.length - 1 ? 34 : 0)} h={5} />
      ))}
      {/* The wide element, breaking past the column on both sides. */}
      <rect x={36} y={88} width={248} height={30} rx={2} className="fill-accent-base" opacity={0.85} />
      {tail.map((y, i) => (
        <Line key={`b${i}`} x={col.x} y={y} w={col.w - (i === tail.length - 1 ? 52 : 0)} h={5} />
      ))}
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

const PIECES: Record<ArtworkName, () => JSX.Element> = {
  measure: Measure,
  layers: Layers,
  invert: Invert,
  underline: Underline,
  scale: Scale,
  breakout: Breakout,
};

export interface ArtworkProps {
  name: ArtworkName;
  /** Tailwind aspect class — the container reserves the space so nothing
   *  reflows, per foundations/imagery.md. */
  aspect?: string;
  /** Informative artwork states what it shows. Omit for decoration, and
   *  the piece is then hidden from assistive tech entirely. */
  alt?: string;
  className?: string;
}

export function Artwork({ name, aspect = "aspect-[16/9]", alt, className = "" }: ArtworkProps) {
  const Piece = PIECES[name];
  const a11y = alt
    ? { role: "img" as const, "aria-label": alt }
    : { "aria-hidden": true, focusable: false as const };

  return (
    <svg
      viewBox="0 0 320 180"
      // `slice` so one drawing crops cleanly into a card's 16:9, an
      // article cover's 21:9 and a figure's 16:7 without redrawing it.
      preserveAspectRatio="xMidYMid slice"
      {...a11y}
      className={`block w-full bg-accent-wash text-text-primary ${aspect} ${className}`}
    >
      <Piece />
    </svg>
  );
}
