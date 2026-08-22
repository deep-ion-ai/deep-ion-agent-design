# Pattern: Dashboard

## Purpose

Describes how to compose the Card and Data Table components (see
`specs/card.md` and `specs/data-table.md`) into a single overview
page — the most common landing page of an admin-style application:
a quick read of key metrics followed by a detailed listing.

This is a composition pattern, not a new component: it does not
introduce anatomy or states of its own beyond what the two
components already define. It only describes layout, order, and how
the page's surrounding chrome (page background, spacing) relates to
the tokens.

## Page structure

1. **Page background** — the full page area uses
   `color.surface.muted` as background, so that the white cards
   (`color.surface.canvas`) visually float above it. This contrast is
   central to the template's identity: content never sits directly
   on a white page background.
2. **Page header** — a short title (`h1`, using `font.heading.h1` /
   `font.weight.semibold`) at the top of the content area, optionally
   with a one-line description below it in `color.text.secondary`.
   Page margins use `spacing.8` on the sides on large screens.
3. **Metrics row** — a horizontal grid of 2 to 4 Summary/KPI-variant
   Cards (see `specs/card.md`), one per key metric (e.g. "Orders
   today", "Revenue", "New users", "Open tickets"). Cards in this row
   share equal width and are spaced with `spacing.grid-gap`. On
   screens below the `md` breakpoint, the grid collapses to a single
   column, stacking the cards vertically.
4. **Detail section** — below the metrics row, a single full-width
   Default-variant Card whose body contains a Data Table (see
   `specs/data-table.md`) listing the underlying records for the
   metrics above (e.g. the list of recent orders). The Card header
   holds the section title (e.g. "Recent orders") and, optionally, a
   filter or "view all" action aligned to the right.

## Composition rules

- The metrics row always comes before the detail table — summary
  before detail is the fixed reading order of this pattern.
- A dashboard built from this pattern must contain at least one
  metrics row and exactly one detail section for this POC's scope;
  additional detail sections (e.g. a second table) may be stacked
  below the first, each as its own full-width Card, separated by
  `spacing.6`.
- Do not place a Data Table directly on the page background outside
  of a Card — per `specs/card.md`, a table's natural container in
  this template is always a Card body.
- Do not nest a metrics-row Card inside the detail section's Card, or
  vice versa; the two sections are siblings, not parents of one
  another.

## Responsive behavior

- **Large screens (≥ `breakpoint.lg`)**: metrics row as a multi-column
  grid (2–4 columns depending on how many metrics exist); detail
  section spans the full content width.
- **Medium screens (`breakpoint.md`–`breakpoint.lg`)**: metrics row
  as a 2-column grid; detail table may switch to horizontal scroll
  inside its Card if the number of columns doesn't fit.
- **Small screens (< `breakpoint.md`)**: metrics row collapses to a
  single column (cards stacked vertically); detail table follows its
  own responsive rule from `specs/data-table.md` (horizontal scroll
  or stacked-card row layout, at the generating agent's judgment).

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.muted` | page background |
| `color.surface.canvas` | card backgrounds (inherited from Card spec) |
| `font.heading.h1` + `font.weight.semibold` | page title |
| `color.text.secondary` | page description, section subtitle |
| `spacing.8` | page horizontal margins on large screens |
| `spacing.grid-gap` | gap between metric cards, and between the metrics row and the detail section |
| `spacing.6` | gap between multiple stacked detail sections, if more than one |
| `breakpoint.md`, `breakpoint.lg` | layout collapse points described above |

## Reference visual description

A page with a soft blue-gray background. At the top, a page title in
dark, semi-bold text. Below it, four evenly-spaced white cards in a
row, each showing a small label and a large number, with a subtle
icon in the corner — these summarize the page's key numbers at a
glance. Beneath that row, a single wide white card spans the full
width of the content area; its header shows a section title on the
left, and its body is a data table with a light header row, thin
row dividers, a status-badge column, and a pagination bar at the
bottom. The whole page reads top-to-bottom as "summary, then detail."
