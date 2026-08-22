# Component: Sparkline Strip

## Purpose

A row of small trend charts, each labelled, giving the shape of
several related measures in the space a single sentence would take.
It is the smallest of the template's three ways of showing a number
over time: a Stat Callout (`specs/stat-callout.md`) gives one value
now, a Trend Chart Card (`specs/trend-chart-card.md`) gives one
measure with a scale, and this gives several measures with no scale
at all.

That last part is the trade-off, and this spec takes a position on
it. **A trend with no numbers attached is of limited use**: the
reader sees a line rising without knowing from what, to what, or
whether the rise matters. The reference shows shape and label only.
Here, **each item carries a current value beside its label by
default**, and the value-less form is a variant for cases where the
number genuinely adds nothing. A strip that only gestures at trends
is decoration, and decoration on a dashboard costs the reader
attention it does not repay.

## Anatomy

1. **Strip container** (required) — a single row of equal-width
   items, divided by thin `color.surface.border` rules or by
   whitespace alone.
2. **Item** (required, 2..4) — one measure. Two is the minimum
   (one sparkline is not a strip; it belongs inline beside the
   number it describes); four is the practical maximum, past which
   each chart is too narrow to have a readable shape.
3. **Sparkline** (required per item) — a small area or line chart,
   roughly 50px tall, with no axes, gridlines, tick labels or
   legend. It shows shape, and nothing else.
4. **Value** (required by default, see Variants) — the measure's
   current figure, in `font.size.lg`, giving the shape a scale.
5. **Label** (required per item) — a short name beneath or beside
   the value ("Visitors", "Signups"), naming what was measured.
6. **Delta** (optional) — a change against the previous period
   ("+8%"), with its direction in text as well as in colour.

## Variants

- **With value (default)** — value, label and sparkline per item.
- **Shape only** — sparkline and label, no value. The reference's
  form. Use it only where the reader already knows the magnitudes
  from elsewhere on the page, and never for a measure appearing
  nowhere else.
- **Mark: area / line** — area reads better at this size, since the
  fill gives the shape mass; line suits a measure that crosses zero.
- **Item count: 2 to 4.**

## States

- **Default** — the item at rest.
- **Item hover / focus** (when items are interactive) — the item's
  background lifts to `color.neutral.light`. Items are interactive
  only when each opens a fuller view of its measure; a strip whose
  items lead nowhere is not clickable.
- **Loading** — a skeleton per item at the same height and width as
  the final content, so the strip does not resize. The whole strip
  loads at once rather than item by item, which would flicker.
- **Empty (per item)** — an item with no data shows an em dash where
  its value would be and a flat baseline where its chart would be,
  keeping the row's alignment. It does not disappear: a strip whose
  item count changes between loads is disorienting.
- **Empty (whole strip)** — where no item has data, the strip is
  hidden rather than showing a row of dashes.
- **Error** — the strip inherits the error state of the Card it sits
  in (`specs/card.md`); it does not report errors per item.

## Accessibility rules

- **Each item needs a text equivalent, and a shape alone is not
  one.** Every sparkline is exposed with an accessible name stating
  the measure, its current value, the period, and the direction —
  "Visitors, 4,050 this week, rising" — rather than being left as a
  decorative graphic. The chart element itself is `role="img"` with
  that name, or `aria-hidden="true"` with the equivalent text
  supplied visually or visually-hidden beside it.
- **The value is not decorative.** In the default variant it is real
  text, readable by assistive tech, not baked into the chart's
  rendering.
- **The direction is stated in words**, not only by the line's slope
  or the delta's colour. A rising green line and a falling red line
  are the same picture to a reader who perceives neither.
- **The strip is a list** of related measures — marked up as one, so
  the item count is announced and items can be navigated between.
- **Interactive items are single focusable elements** (`<a>` or
  `<button>` wrapping the whole item), never a click handler on a
  container, and their accessible name is the same text described
  above plus the destination.
- **Sparkline colour is not load-bearing.** `color.chart.sparkline`
  is a muted neutral, and the same tone is used for every item in a
  strip: colouring items differently implies a distinction between
  measures that does not exist. Where a single item must be
  emphasised, emphasise its value's weight, not its chart's hue.
- **Contrast**: at this size the chart is a thin mark on a light
  surface; `color.chart.sparkline` must be verified at 3:1 against
  the card background as a non-text graphic.
- **Respect reduced motion** — no draw-in animation.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Lives inside**: a Card (`specs/card.md`) — its footer, where it
  summarises measures related to the card's main content, or its
  body, where the strip is the card's content. It is **not** a
  page-level element: a strip sitting directly on the page
  background has no context to explain what its measures belong to.
- **May contain**: the items described in Anatomy, and nothing else.
- **Must not contain**: axes, legends, tooltips, or a second row of
  items — a strip that wraps is a grid of charts, which is a
  different arrangement and needs its own specification.
- **Relationship to Geo Map Card**: the reference composes this
  strip inside the map card's footer. The two are independent
  components and either may be used without the other; see
  `specs/geo-map-card.md`. When they are combined, the strip's
  measures must relate to the map's subject, or the card is two
  unrelated widgets sharing a border.
- **Relationship to Trend Chart Card**: where a single measure
  deserves a scale, an axis and a tooltip, it is a Trend Chart Card.
  A sparkline is a summary, not a smaller chart.
- **Uses**: `specs/card.md` (container and error state).

## Tokens used

| Token | Usage |
|---|---|
| `color.chart.sparkline` | sparkline line and fill, every item |
| `color.text.primary` | item value |
| `color.text.secondary` | item label |
| `color.text.accent.success` / `accent.danger` | delta, paired with a direction word |
| `color.surface.border` | dividers between items |
| `color.neutral.light` | item hover background (interactive strips) |
| `spacing.3` | item padding |
| `font.size.lg` | item value |
| `font.size.sm` | item label |
| `font.size.xs` | delta |
| (card anatomy) | see `specs/card.md` |

## Reference visual description

Across the bottom of a card, below a hairline, three equal columns
divided by two more hairlines. In each, a small gray area chart
about a finger's width tall, its shape rising and falling across a
few weeks with no numbers or lines around it. Directly beneath each
chart, a figure in dark type — "4,050" — and under that, a single
small gray word: "Visitors", "Signups", "Orders". Beside the first
figure, in small green text, "+8% this week". Nothing in the strip
is coloured except those deltas; the three charts are the same
muted gray, so the eye compares their shapes rather than their hues.
