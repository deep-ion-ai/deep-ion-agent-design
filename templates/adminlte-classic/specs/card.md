# Component: Card (list item / summary card)

## Purpose

A raised rectangular surface that groups one unit of related
information — a metric summary, an item within a listing, or a
self-contained block of content inside a dashboard. It is the
template's main visual composition block: nearly all page content
lives inside one or more cards.

## Anatomy

A card is made up of the following parts, all optional except the
body:

1. **Header** (optional) — a top strip with a short title on the
   left and, optionally, a group of actions/icons on the right
   (e.g. an options menu, a collapse/expand button, a status badge).
   Separated from the body by a thin bottom border.
2. **Body** (required) — the main content area. May contain text, a
   highlighted metric with a label, a list of items, or any other
   content (including, by composition, a full Data Table — see
   `patterns/dashboard.md`).
3. **Footer** (optional) — a bottom strip, typically for a secondary
   action (e.g. a "view all" link) or metadata (e.g. "updated 5 min
   ago"). Separated from the body by a thin top border.
4. **Side accent bar** (optional) — a thin strip of status color on
   the card's left border, used to informally signal the nature of
   the content (e.g. an alert card with a `status.danger` bar)
   without changing the entire card background.

## Variants

- **Default** — background `surface.canvas`, no accent color.
- **Summary/KPI** — the body is reduced to a large number
  (`font.size.xl`, `font.weight.semibold`) with a short label below
  (`font.size.sm`, `text.secondary`) and, optionally, a themed icon
  aligned to the right. Used in metric grids at the top of a
  dashboard.
- **List** — the body contains a vertical column of items (e.g. the
  items of a listing), each with `spacing.3` vertical spacing and a
  `surface.border` separator between items.
- **Status accent** — a variant with the side accent bar colored by
  one of the `status.*` colors.

## States

- **Default** — `shadow.card` shadow, 1px `surface.border` border.
- **Hover** (when the whole card is clickable/navigable) — the
  shadow lifts slightly to `shadow.raised`; smooth transition
  (~150ms). Non-clickable cards do not react to hover.
- **Loading** — the body is replaced by skeleton placeholders
  (rectangles of `neutral.light` with a subtle pulse animation) in
  the same proportions as the final content, to avoid layout shift.
- **Empty** — when the card's data source has no content, a short
  message centered in `text.secondary` is shown (e.g. "No items
  yet") instead of the normal body.
- **Error** — when the card's data source fails, a short message in
  `status.danger` is shown, with a retry action, instead of the
  normal body.

The `active`/`disabled` states do not apply to this component as a
whole (those are states of individual interactive elements inside
the card, such as buttons, not of the card itself).

## Accessibility rules

- If the entire card is a link/navigation button, it must be
  implemented as a single focusable element (`<a>` or `<button>`),
  never as a `<div onClick>` — it must be reachable and activatable
  via keyboard (Enter/Space) and have a visible focus ring.
- If the card contains multiple internal interactive elements (e.g.
  a menu button and a "view all" link), each must be an independent
  focusable element with its own tab order — the card itself must
  not be focusable in that case.
- The header title, when present, must use a semantic heading tag
  (`h2`–`h6`, at the level appropriate to the page hierarchy) to
  allow screen-reader navigation via heading landmarks.
- Loading states must be announced via `aria-busy="true"` on the
  card container while the placeholder is visible.

## Composition rules

- **May contain**: text, highlighted numbers, icons, badges, lists,
  a full Data Table, a limited number of action buttons (1–2 in the
  header/footer).
- **Must not contain**: another card nested directly inside its body
  (cards compose side by side in a grid, not nested); complex
  multi-step forms (that belongs to a dedicated page pattern, not to
  this component).
- Cards in a dashboard grid should have consistent height within the
  same row when content allows (avoiding a "staircase" visual),
  using `spacing.grid-gap` as the spacing between them.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | card background |
| `color.surface.muted` | page background behind the card |
| `color.surface.border` | card border, header/footer dividers |
| `color.text.primary` | body text |
| `color.text.secondary` | labels, metadata |
| `color.status.*` | side accent bar, status badges |
| `radius.base` | card border radius |
| `shadow.card` | default elevation |
| `shadow.raised` | hover elevation (when clickable) |
| `spacing.component.card-padding` | body inner padding |
| `spacing.component.card-header-padding-y` | header vertical padding |
| `font.size.lg` | header title |
| `font.size.xl` + `font.weight.semibold` | highlighted number (Summary/KPI variant) |
| `font.size.sm` + `color.text.secondary` | labels and footer |

## Reference visual description

A typical metric card: a white rectangle with slightly rounded
corners and an almost imperceptible shadow, floating over a light
blue-gray page background. In the top-left corner, a small, muted
label ("Orders today"); just below, a large number in a semi-bold
weight ("1,204"). In the top-right corner, a small, monochrome icon
related to the card's theme. No visible internal borders — the
separation comes entirely from whitespace and the subtle shadow
elevation.
