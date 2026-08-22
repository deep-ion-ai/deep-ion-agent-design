# Pattern: Dashboard

## Purpose

Describes how to compose the Card and Data Table components (see
`specs/card.md` and `specs/data-table.md`) into a single overview
page — the most common landing page of an admin-style application:
a quick read of key metrics followed by a detailed listing.

This is a composition pattern, not a new component: it does not
introduce anatomy or states of its own beyond what the two
components already define. It only describes layout and order.

**This pattern describes the content region only.** The frame around
it — the dark Sidebar, the Navbar, the content region's background
and padding, the page header and breadcrumb — is
`patterns/app-shell.md`, which every page in the application shares.
A dashboard is what fills the shell's content region, and must not
restate or modify the shell.

## Page structure

1. **Page header** — provided by the shell
   (`patterns/app-shell.md`): the page title, an optional one-line
   description, and the breadcrumb. A dashboard adds nothing to it
   beyond supplying the title.
2. **Metrics row** — a horizontal grid of 2 to 4 blocks, one per key
   metric (e.g. "Orders today", "Revenue", "New users", "Open
   tickets"), sharing equal width and spaced with
   `spacing.component.grid-gap`. On screens below the `md` breakpoint, the grid
   collapses to a single column, stacking them vertically.

   The row uses **either** Summary/KPI-variant Cards
   (`specs/card.md`) **or** Stat Callouts (`specs/stat-callout.md`),
   never a mix of the two — a row of white cards with one saturated
   block in it reads as an error state rather than as a design
   choice. Choose Cards for a page whose content below is itself
   dense and colourful, and Stat Callouts when the page needs a
   strong entry point and the colour can carry meaning about each
   number.
3. **Detail section** — below the metrics row, a single full-width
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
| `color.surface.canvas` | card backgrounds (inherited from Card spec) |
| `color.text.secondary` | section subtitle |
| `spacing.component.grid-gap` | gap between metric cards, and between the metrics row and the detail section |
| `spacing.6` | gap between multiple stacked detail sections, if more than one |
| `breakpoint.md`, `breakpoint.lg` | layout collapse points described above |

## Reference visual description

The content region of the app shell, on its soft blue-gray
background, beneath the page title the shell provides. Four
evenly-spaced white cards in a
row, each showing a small label and a large number, with a subtle
icon in the corner — these summarize the page's key numbers at a
glance. Beneath that row, a single wide white card spans the full
width of the content area; its header shows a section title on the
left, and its body is a data table with a light header row, thin
row dividers, a status-badge column, and a pagination bar at the
bottom. The whole page reads top-to-bottom as "summary, then detail."
