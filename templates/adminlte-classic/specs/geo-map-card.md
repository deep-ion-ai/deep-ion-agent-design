# Component: Geo Map Card

## Purpose

A Card whose body is a map: values distributed across places, drawn
on geography so the reader can see *where* rather than *how much*.

The question to ask before using it is whether geography is the
message. A map is expensive — to render, to make accessible, and to
read accurately — and for ranking ("which five countries sell most")
a sorted Data Table answers better in less space. Use a map when the
spatial pattern itself is the finding: clustering, spread, gaps.

Like `specs/trend-chart-card.md`, this spec is **mapping-library
agnostic**. It describes what must be shown, what must never be
relied on, and what must exist for a reader who cannot see or cannot
use the map. It never assumes a particular library, projection, or
tile source.

## Anatomy

1. **Card** (required) — the component is a Card
   (`specs/card.md`). Header, footer, and the loading/empty/error
   states are the Card's.
2. **Header** (required) — a title naming the measure and its
   geographic scope ("Sales by country, last 30 days"), plus the
   Card's header toolbar where a period or measure switcher is
   needed.
3. **Map canvas** (required) — a fixed-height region
   (`spacing.component.viz-height`) rendering the geography and the
   data drawn on it. Fixed rather than content-derived, because a
   map has no intrinsic height and a row of map cards must align.
4. **Data overlay** (optional) — the values themselves: regions
   shaded by value, or markers placed at points. A map with no
   overlay is an illustration, not a visualisation.
5. **Legend** (required whenever an overlay encodes value by colour
   or size) — the scale that makes the overlay readable. Shading
   without a legend cannot be converted back into numbers.
6. **Region tooltip** (optional) — a small panel giving a region's
   name and value on hover or focus.
7. **Data equivalent** (required) — a table or list of the same
   values, reachable from the card. See Accessibility rules.

**A note on the reference's filled header.** The reference draws
this card with a saturated, gradient-filled header. This spec keeps
the template's standard Card header instead: a filled header is a
second colour system for card headers that nothing else in the
template uses, would need its own on-accent contrast rules per
colour, and would make this card louder than the data cards beside
it for reasons of decoration rather than meaning. Recorded as a
deliberate divergence.

## Variants

- **Choropleth** — regions shaded by value along a sequential scale.
  The default for a measure that exists per region.
- **Point markers** — discrete locations marked, optionally sized by
  value. For events or sites rather than regions.
- **Scope: world / continent / country** — the geography drawn. The
  scope is fixed per card and stated in the title; a card whose
  scope changes as the reader pans is a different, interactive
  component this template does not specify.
- **Static / interactive** — static renders one view with no pan or
  zoom, which is the right default for a dashboard card. Interactive
  adds pan and zoom, and then must satisfy the keyboard rules below.

## States

- **Default** — the map with its overlay at rest.
- **Region hover / focus** — the region is outlined and its tooltip
  shown. Keyboard focus produces the same tooltip as hover.
- **Loading** — the Card's loading state at the canvas's exact
  height, so the card does not resize when the map arrives. Map
  libraries and tiles are heavy; this state will be visible often
  enough to matter.
- **Empty** — no data for the period: the geography still renders,
  unshaded, with a short message naming the period. An unshaded map
  with no message reads as "zero everywhere" rather than "not
  measured".
- **Error** — **the failure this component must handle properly.**
  A map that fails to load must not leave a blank rectangle. The
  canvas is replaced by a short message, a retry action, and a link
  to the data equivalent — the numbers are still available even when
  the picture is not.
- **Partial data** — regions with no value are drawn in a distinct
  "no data" tone, named in the legend, never in the lightest shade
  of the value scale, which would read as a low value.

## Accessibility rules

- **A non-visual equivalent is required**, not recommended: a Data
  Table (`specs/data-table.md`) of region and value, in a
  `specs/disclosure.md` panel beneath the map or on a linked page.
  The map must never be the only route to its own numbers. This is
  the single most important rule in this spec.
- **The map canvas is exposed as an image with an accessible name**
  that summarises the finding, not the picture: "Sales by country —
  highest in Brazil, Germany and Japan; no data for 40 countries",
  rather than "World map". Where a full summary is too long for a
  name, the name is short and `aria-describedby` points at the
  summary text.
- **Colour must not be the only encoding.** A choropleth encodes
  value by lightness along a single hue, so it degrades gracefully
  for colour-blind readers — but a legend, tooltips and the data
  equivalent are what make it readable, and all three are required
  for a colour-encoded map.
- **Interactive maps must be operable by keyboard**: pan, zoom, and
  region selection reachable without a pointer, with a visible focus
  indicator on the focused region. A library that cannot do this
  makes the interactive variant unusable — in which case use the
  static variant, which needs none of it.
- **A map must not trap scroll.** Scroll-to-zoom on a map inside a
  scrolling page hijacks the reader's scroll; require a modifier
  key, or an explicit "activate map" step, or zoom controls as
  buttons.
- **Markers need accessible names**, are reachable in a defined
  order, and do not rely on hover alone to reveal what they mark.
- **Do not encode meaning in the base geography.** Borders,
  coastlines and place names are context. Only the overlay carries
  the data, so the map's own detail level must not compete with it.
- Text placed on the map (labels, legend, tooltip) follows the
  template's contrast rules against the map's own background, not
  against the card's.
- **Respect reduced motion**: no fly-to or zoom animation on load.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Is a**: Card. All Card rules apply, including the header
  toolbar.
- **May contain**: the map canvas, an overlay, a legend, tooltips,
  and — in the card's footer — a Sparkline Strip
  (`specs/sparkline-strip.md`) or a link to the fuller report.
- **Must not contain**: a second map, a Data Table beside the map
  inside the same body (the tabular equivalent belongs in a
  disclosure or on its own page), or page-level navigation.
- **Relationship to Sparkline Strip**: the reference composes the
  two in one card — map in the body, strip in the footer. **They are
  independent components** and either may be used without the other;
  `specs/sparkline-strip.md` carries the matching note. When they
  are combined, the strip's measures must relate to the map's
  subject, or the card is two unrelated widgets sharing a border.
- **Uses**: `specs/card.md`, `specs/data-table.md` (data
  equivalent), `specs/disclosure.md` (revealing it),
  `specs/dropdown-menu.md` (period/measure switcher via the card
  toolbar).
- **Placement**: in the content region of `patterns/app-shell.md`.
  A map card needs at least half the content width; narrower, the
  geography is unreadable and the card should be a Data Table
  instead.

## Tokens used

| Token | Usage |
|---|---|
| `spacing.component.viz-height` | map canvas height |
| `color.chart.series-1` | overlay base hue, shaded by value |
| `color.chart.grid` | map outlines, region borders |
| `color.neutral.light` | "no data" region tone |
| `color.surface.canvas` | map background, tooltip background |
| `color.surface.border` | tooltip border, legend divider |
| `shadow.raised` | tooltip elevation |
| `color.text.primary` | tooltip values |
| `color.text.secondary` | legend labels |
| `font.size.xs` | legend labels |
| `font.size.sm` | tooltip text |
| (card anatomy) | see `specs/card.md` |

## Reference visual description

Inside a white card headed "Sales by country, last 30 days", a wide
rectangular panel a little over a finger's height, holding a plain
world map drawn in hairline gray outlines with no place names. Most
countries sit in a very light gray; a handful are filled in blues of
increasing depth, and three or four are the deepest. Below the map's
lower edge, a short horizontal bar shading from pale to deep blue
with two small numbers at its ends, and a separate gray square
labelled "No data". Resting the pointer on a filled country raises a
small white panel naming it and its figure. At the bottom of the
card, a small control reading "View as table".
