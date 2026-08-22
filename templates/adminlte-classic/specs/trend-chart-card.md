# Component: Trend Chart Card

## Purpose

A Card whose body is a time series: one or more measures plotted
over a period, so the reader can see the shape of a trend rather
than a single number. It is the "how did we get here" companion to
the Stat Callout's "where are we now".

**Use a charting library.** A chart is scales, ticks, layout,
hit-testing and responsive behaviour, and hand-drawing those is how a
chart ends up with a broken axis at the eleventh data point. Which
library is the consuming project's choice — this spec names none, and
a library the project already uses always wins;
`foundations/libraries.md` lists starting points per ecosystem as
suggestions.

What this spec does fix is the **contract the library has to
satisfy**, listed under Accessibility rules below. Check a candidate
against it before adopting: a library that cannot produce a
keyboard-reachable tooltip or an accessible name on its plot is
disqualified here, however good it looks. Wrap whatever is chosen in
a component of your own, so this contract is enforced in one place
and the library stays replaceable.

Reach for it when the *shape over time* is the message. When only
the latest value matters, a Stat Callout (`specs/stat-callout.md`)
says it in a tenth of the space, and a Sparkline Strip
(`specs/sparkline-strip.md`) sits between the two: trend shape at a
glance, no axes.

## Anatomy

1. **Card** (required) — the component is a Card
   (`specs/card.md`), not a new surface. Header, body, footer and
   states are the Card's; this spec describes what fills the body.
2. **Header** (required) — the chart's title, naming the measure
   and its period ("Sales, last 12 months"). A chart titled only
   "Sales" leaves the reader to infer the axis.
3. **Legend** (required for two or more series) — a row of entries,
   each pairing a series' colour swatch *and* its mark shape with
   its name, placed directly above or below the plot.
4. **Plot area** (required) — the chart itself: axes, gridlines, and
   the plotted series. Roughly 300px tall at default density,
   shorter in a dense layout, never so short that the vertical scale
   flattens the trend into a line.
5. **Axes** (required) — a horizontal time axis with readable tick
   labels, and a vertical value axis with units. Gridlines in
   `color.chart.grid` at low weight: they support reading values,
   they do not compete with the data.
6. **Tooltip** (optional but expected) — on hover or focus of a
   point, a small panel giving that point's date and each series'
   value at it.
7. **Data summary** (required) — a text equivalent of the chart's
   content, visually hidden or in a disclosure beneath it. See
   Accessibility rules; this is not optional and is the part most
   often skipped.

## Variants

- **Series count: single / multi** — one series, or two to three.
  Four or more series in one plot is not a variant of this
  component; it is a chart that should be split.
- **Mark: line / area** — area fills beneath the line, and suits a
  single series or a total. **For multiple series, line is the
  default**: stacked or overlapping fills make it hard to read any
  one series' value, and the reference's own overlapping
  translucent areas are a legibility compromise this spec does not
  inherit.
- **Density: default / compact** — compact reduces the plot height
  and tick count for a chart sharing a row with others.

## States

- **Default** — the plotted series at rest.
- **Point hover / focus** — the hovered point is emphasised and its
  tooltip shown. Keyboard focus produces the same tooltip: a
  hover-only tooltip is invisible to anyone not using a pointer.
- **Series hover** (multi-series) — hovering a legend entry
  emphasises that series and mutes the others. Never *hides* the
  others: a chart that changes shape under the pointer cannot be
  compared.
- **Loading** — the Card's loading state, with the skeleton
  occupying the plot's exact height so the card does not resize when
  data arrives. `aria-busy="true"` per `specs/card.md`.
- **Empty** — where the period genuinely holds no data, the plot
  area is replaced by a short message naming the period ("No sales
  recorded in the last 12 months"), not an empty grid, which reads
  as zero rather than as absent.
- **Partial data** — where some points are missing, the gap is drawn
  as a gap. Interpolating across a missing point invents data, and
  the reader cannot tell. The summary names the missing periods.
- **Error** — the Card's error state, with a retry action.

## Accessibility rules

A chart is a picture of numbers. Everything below exists because a
picture, on its own, is unreadable to a significant share of
readers.

- **A text equivalent is required, not recommended.** The chart is
  accompanied by either a visually-hidden summary or a disclosure
  (`specs/disclosure.md`) revealing a Data Table
  (`specs/data-table.md`) of the same values. The summary states,
  per series: its name, the period covered, its start and end
  values, its direction, and its extremes ("Online sales, January
  to December: rose from 1,200 to 4,050, peaking at 4,600 in
  October"). A chart with `alt="Sales chart"` and nothing else is
  not accessible; it merely names the picture.
- **The plot itself is exposed as an image with a name**
  (`role="img"` and an accessible name), so assistive tech announces
  something meaningful rather than reading out axis tick labels as
  loose text.
- **Series must not be distinguished by colour alone.** This is a
  deliberate divergence from the reference, which distinguishes its
  two series only by hue and offers no legend at all. Every chart
  here carries a legend, and each series carries a second
  distinguishing signal — a mark shape at its data points, a dash
  pattern, or a direct label at the end of the line. The reason is
  measured rather than assumed: the three `color.chart.series-*`
  values clear colour-vision separation (worst adjacent pair, ΔE
  12.7 under deuteranopia), but `series-2` and `series-3` sit at
  2.07:1 and 2.5:1 against a light chart surface — below the 3:1 a
  mark needs to carry identity on its own. The legend, the labels
  and the data-table equivalent are what discharge that, which is
  why all three are required here.
- **Colours come from `color.chart.series-*`**, in order, and are
  assigned consistently: the same measure keeps the same colour
  across every chart on the page and between pages. Re-colouring the
  same series per chart is a reliable source of misreading.
- **Tooltips must be reachable by keyboard.** Data points are
  focusable in series order, or the chart provides an equivalent
  keyboard mode; either way, a keyboard user can obtain every value
  the pointer can.
- **Axis labels must be legible**, not rotated to the point of
  illegibility or thinned until the period is ambiguous. Where
  labels do not fit, reduce the tick count rather than the font
  size.
- **Do not encode meaning in the fill's opacity** — a translucent
  area over another area produces a third colour that means nothing.
- **Respect reduced motion**: an animated draw-in on load is
  omitted, not shortened.
- Text inside the plot (axis labels, legend, tooltip) follows the
  template's contrast rules; where a series colour is used as a
  *label*, it takes `color.text.accent.*`, not the raw series
  colour.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Is a**: Card. All Card rules apply, including the header
  toolbar (`specs/card.md`) — a chart card commonly carries a
  dropdown for switching the period.
- **May contain**: the plot, a legend, a tooltip, a data summary or
  its disclosure, and a footer with a link to a fuller report.
- **Must not contain**: a second chart (two charts are two cards), a
  Data Table shown *alongside* the plot rather than inside the
  summary disclosure, or interactive controls inside the plot area
  itself.
- **Uses**: `specs/card.md`, `specs/disclosure.md` (summary),
  `specs/data-table.md` (tabular equivalent),
  `specs/dropdown-menu.md` (period switcher, via the card toolbar),
  and a charting library of the project's choosing — see
  `foundations/libraries.md`.
- **Placement**: in the content region of `patterns/app-shell.md`,
  typically beside or below the metrics row of
  `patterns/dashboard.md`. A chart card spans at least half the
  content width — below that the time axis compresses past
  usefulness, and the card should be given a full row instead.
- **Relationship to Sparkline Strip**: a sparkline shows shape with
  no scale; this component shows shape *with* scale. A card may
  carry a sparkline strip in its footer
  (`specs/sparkline-strip.md`) summarising related measures, but
  the two are independent components.

## Tokens used

| Token | Usage |
|---|---|
| `color.chart.series-1` / `series-2` / `series-3` | plotted series, in order |
| `color.chart.grid` | gridlines, axis lines, ticks |
| `color.text.secondary` | axis tick labels, legend text |
| `color.text.accent.*` | a series name rendered in its own colour |
| `color.surface.canvas` | plot background, tooltip background |
| `color.surface.border` | tooltip border |
| `shadow.raised` | tooltip elevation |
| `color.text.primary` | tooltip values |
| `font.size.xs` | axis tick labels |
| `font.size.sm` | legend and tooltip text |
| (card anatomy) | see `specs/card.md` |

## Reference visual description

Inside a white card headed "Sales, last 12 months", a plot about
three times as wide as it is tall. Two lines run across it left to
right — one blue, one teal — each carrying small marks at its
monthly data points, the blue one's round and the teal one's square.
Behind them, four or five very light horizontal rules mark the value
scale, with small gray numbers at the left edge and month
abbreviations along the bottom. Above the plot, two short entries
pair each line's colour and mark with a name. Resting the pointer on
a month raises a small white panel with a shadow, listing the month
and both values. Beneath the card's plot, a small gray "View data
table" control that opens the same twelve months as rows and
columns.
