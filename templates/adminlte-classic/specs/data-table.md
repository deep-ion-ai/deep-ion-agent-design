---
component: data-table
requires: [foundations/iconography.md, foundations/imagery.md]
references: [specs/pagination.md, specs/badge.md, specs/button.md, specs/card.md, specs/modal.md, specs/tooltip.md]
---

# Component: Data Table

## Purpose

Presents a dense set of tabular records (rows × columns) with support
for per-column sorting and pagination. It is the standard component
for administrative listings (users, orders, log entries, etc.) inside
a dashboard.

## Anatomy

1. **Toolbar** (optional, above the table) — may contain a
   search/filter field on the left and bulk or export actions on the
   right.
2. **Header row** — a row of column headers, with a background
   slightly differentiated from the table body. Sortable columns show
   a sort indicator (arrow) next to the label.
3. **Body rows** — data rows, one per record. Alternating rows may
   have a slight background variation (zebra striping) to support
   horizontal reading in wide tables — optional, decided by column
   density.
4. **Cell** — an individual unit of data. Cells may contain plain
   text, a status badge, an avatar+name pair, or a group of actions
   (edit/delete icons) when in the last column. A text cell whose
   content overflows its column's fixed width truncates with an
   ellipsis rather than wrapping (wrapping breaks row-height
   alignment across the table) and gains a `specs/tooltip.md`
   showing the untruncated value on hover/focus — only when
   truncation has actually occurred, never on a cell that already
   fits.
5. **Footer/pagination bar** — below the table body, the Pagination
   component (`specs/pagination.md`): a results summary at the
   leading edge and the page controls at the trailing edge. Its
   anatomy, truncation, states and accessibility rules are defined
   there and are not restated here — a table's pagination is the
   same component a List Group or a card grid uses.

## Variants

- **Default** — thin horizontal borders between rows, no vertical
  borders between columns.
- **Compact** — reduces cell vertical padding to fit more visible
  rows (used when data volume is high and information density takes
  priority over visual breathing room).
- **Striped** — applies a `neutral.light` background to even rows to
  reinforce horizontal reading in tables with many columns.

## States

- **Default** — row background `surface.canvas`.
- **Hover** (row) — background changes to `neutral.light` when
  hovering over the entire row, signaling that the row is an
  interactive unit (e.g. clickable to open a detail view).
- **Selected** (when selection via checkbox is available) —
  background with a light tint of the `brand.primary` color at low
  opacity, keeping text legible.
- **Sorted** (column) — the header of the currently sorted column
  shows a stronger font weight (`font.weight.medium`) and the arrow
  icon pointing in the active direction (ascending/descending); other
  sortable columns show the icon at low opacity only on header hover.
- **Loading** — the table body is replaced by skeleton rows (same
  number of columns, variable widths simulating text) with
  `aria-busy="true"`.
- **Empty** — when the current pagination page returns no records,
  the body is replaced by a message centered in `text.secondary` and
  the pagination bar is hidden or disabled.
- **Error** — the body is replaced by an error message in
  `status.danger` with a retry action; pagination is disabled.
- **Disabled row** (optional, when applicable to the domain) — text
  in `text.secondary` at reduced opacity with row actions disabled,
  without removing the row from view.

## Accessibility rules

- Must use semantic table markup (`<table>`, `<thead>`, `<tbody>`,
  `<th scope="col">`) — never simulate a table with `<div>`s, even
  when implemented with CSS Grid/Flexbox for responsive layout.
- Sortable column headers must be a focusable element (`<button>`
  inside the `<th>`) with `aria-sort` (`ascending`, `descending`, or
  `none`) on the corresponding `<th>`, updated dynamically as the
  sort state changes.
- Pagination follows `specs/pagination.md` in full, including the
  `<nav aria-label="Pagination">` landmark, `aria-current="page"` on
  the current page, and the requirement that a page change be
  announced. Where a page holds more than one paginated set, each
  landmark's label names its own set.
- Per-row actions (edit/delete) must have a descriptive `aria-label`
  that includes the record's context (e.g. "Delete order #1029"),
  since a screen reader lacks the visual context of the row.
- On narrow screens, if the table collapses into a stacked-card
  layout (see Composition rules), the label→value relationship of
  each cell must remain programmatically perceivable (e.g. via a
  `data-label` associated through CSS `content` or equivalent
  markup), not just visually.

## Semantic skeleton

Structure, roles, states and focus order only — no classes, no
styles, no framework. A contract to reproduce in the target stack's
idiom, not markup to paste; on a platform without a DOM, map the
roles onto its own accessibility API.

```html
<table>
  <thead>
    <tr>
      <!-- aria-sort lives on the th; the button inside it is what the
           reader activates. Never simulate a table with divs. -->
      <th scope="col" aria-sort="ascending">
        <button type="button">
          Customer
          <svg aria-hidden="true"><!-- direction glyph --></svg>
        </button>
      </th>
      <th scope="col" aria-sort="none"><button type="button">Total</button></th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ava Torres</td>
      <td>$196.40</td>
      <td><span>Active</span></td>
      <td>
        <!-- Row actions name their record: a screen reader has none
             of the row's visual context. -->
        <button type="button" aria-label="Delete order #1024">
          <svg aria-hidden="true"><!-- glyph --></svg>
        </button>
      </td>
    </tr>
  </tbody>
</table>

<!-- The footer bar is specs/pagination.md, unchanged. -->
```

Not visible in the markup: `aria-sort` updates as the sort changes,
and only ever on one column; the loading state sets `aria-busy` on
the body while skeleton rows stand in; and where the table collapses
to stacked blocks on a narrow screen, each cell's label→value
relationship has to survive that in the markup, not only visually.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Images**: avatars and other imagery follow
  `foundations/imagery.md`, including the required initials fallback.
- **May contain** per cell: text, status badges (using
  `color.status.*`), a small avatar + text, a group of up to 2–3
  action icons.
- **Must not contain**: complex inline editing forms (multiple
  fields per cell) — editing should open a separate panel or modal;
  must not contain another Data Table nested inside it.
- **Uses**: `specs/pagination.md` for the footer bar,
  `specs/badge.md` for status cells, `specs/button.md` for
  toolbar and row-action controls, and `specs/tooltip.md` for a
  truncated text cell's full-value reveal (see Anatomy).
- A Data Table may be the body of a Card (see `specs/card.md`) —
  this is the primary composition pattern described in
  `patterns/dashboard.md`. When inside a Card, the table spans the
  full body width and the toolbar/pagination use the same horizontal
  padding as the card.
- On screens below the `md` breakpoint, the table should either (a)
  allow horizontal scrolling inside a container with `overflow-x`,
  preserving the tabular structure, or (b) collapse each row into a
  card-like block with stacked label/value pairs — the choice belongs
  to the generating agent, guided by the number of columns and the
  target platform (e.g. React Native tends toward (b)).

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | default row background |
| `color.neutral.light` | row hover background, zebra row background, header background |
| `color.surface.border` | horizontal divider lines between records |
| `color.text.primary` | default cell text |
| `color.text.secondary` | metadata, pagination summary, search placeholder |
| `color.brand.primary` | selected row background (low opacity), control focus |
| `color.status.*` | status badges in a cell |
| `radius.hairline` | (when the table uses an in-cell progress bar) |
| (pagination bar) | see `specs/pagination.md` |
| `spacing.component.table-cell-padding-x` / `table-cell-padding-y` | cell padding |
| `font.size.sm` | cell and header text |
| `font.weight.medium` | column header, currently sorted column |
| `font.lineHeight.dense` | table body line height |

## Reference visual description

A table inside a white card: header with a very light gray
background and normal-case text (not all-caps), slightly stronger
than the body text. Data rows separated only by a thin, light
horizontal line — no vertical grid lines. Hovering over a row subtly
darkens the entire row background. A status column shows small
colored pill badges (green for "active", gray for "inactive"). In
the card footer, the pagination bar described in
`specs/pagination.md`: left-aligned, the text "Showing 1 to 10 of 42
entries"; right-aligned, numbered page buttons with the current page
highlighted in solid `brand.primary` color and white text.
