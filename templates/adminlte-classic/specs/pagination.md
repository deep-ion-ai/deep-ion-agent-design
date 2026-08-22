---
component: pagination
requires: [foundations/iconography.md]
references: [specs/button.md]
---

# Component: Pagination

## Purpose

Navigation across a set of results split into pages: which page the
reader is on, how to reach the next and previous ones, and how to
jump somewhere further away.

It is defined here as a standalone primitive because more than one
thing paginates. A Data Table (`specs/data-table.md`) is the obvious
case, but a List Group, a card grid, or a gallery of search results
paginate identically, and two independent definitions of "the
pagination bar" would drift apart within a release. This spec is the
canonical one; `specs/data-table.md` references it rather than
describing its own.

When *not* to paginate is part of using it: a set the reader will
scan rather than search is often better as one scrolling list, and a
set they will filter is better served by filters. Pagination earns
its place when the reader needs to know *where they are* in a large
ordered set.

## Anatomy

1. **Container** (required) — a horizontal row of controls, grouped
   as a single navigation landmark.
2. **Previous / next controls** (optional but recommended) — icon-
   only steppers at each end. They are the controls used most, and
   the largest targets in the group.
3. **Page buttons** (required) — numbered controls for individual
   pages, with the current page marked. In long ranges the numbers
   are truncated (see below).
4. **Truncation indicator** (required in long ranges) — a
   non-interactive ellipsis standing in for a run of omitted page
   numbers.
5. **Results summary** (optional) — a short text line stating what
   is on screen out of the whole ("Showing 1–10 of 42"). It sits at
   the leading edge of the bar, with the controls at the trailing
   edge. Recommended wherever the total is known: page numbers alone
   tell the reader how many pages exist, not how much data.
6. **Page-size selector** (optional) — a small control choosing how
   many records a page holds. Changing it returns the reader to the
   first page, since keeping the page index across a size change
   lands them somewhere they did not choose.

### Truncation

The template's current Data Table implementation renders every page
number with no truncation. **That is a gap this spec closes, not a
simplification it keeps**: at fifty pages the row of numbers is
wider than the table, wraps, and buries the previous/next controls.

The rule: always show the first page, the last page, the current
page, and one page either side of the current; replace each
remaining run with a single ellipsis. Below roughly nine pages,
show every number — truncating a short range costs a click and
gains nothing.

## Variants

- **Full** — summary, previous/next, and truncated numbers. The
  default for a Data Table.
- **Compact** — previous/next plus a "Page 3 of 12" label, no
  numbered buttons. For narrow containers: a card footer, a sidebar
  panel, a mobile viewport.
- **Simple** — previous/next only, no numbers and no total. The
  right choice when the total count is genuinely unknown or too
  expensive to compute; the next control is disabled once a request
  returns fewer results than a full page. It is not an alternative
  to Full when the total *is* known.
- **Size** — matches the density of what it paginates, following
  `specs/button.md`'s size scale: small under a compact Data Table,
  default elsewhere.

## States

- **Current page** — the button for the page in view is filled with
  `color.brand.primary` and `color.text.on-accent`. It stays a
  button rather than becoming plain text so the row does not shift
  when the current page moves, and it is not disabled: a disabled
  current page cannot be focused, so a keyboard user loses the
  marker for where they are.
- **Hover / focus / active** — per `specs/button.md`, with the
  focus ring visible against both the plain and the filled current
  page.
- **Disabled** — previous on the first page, next on the last. The
  controls stay in place, disabled, rather than disappearing: a
  control that vanishes at the boundary moves every other control in
  the row.
- **Loading** — while the next page is being fetched, the controls
  are disabled and the pagination keeps its exact size. The
  surrounding content shows its own loading state; the bar itself
  must not collapse, or the page shifts under the pointer at the
  moment the reader is about to click again.
- **Single page** — when everything fits on one page, the controls
  are hidden entirely and only the results summary remains. A
  pagination bar with one page button is noise.
- **Empty** — when there are no results at all, the bar is hidden;
  the empty state belongs to the content, not to its navigation.

## Accessibility rules

- The container is a `<nav>` with `aria-label="Pagination"`. Where
  two paginated sets share one page, each label names its set
  ("Orders pagination"), since duplicate landmark names are not
  distinguishable.
- Inside it, the controls are an ordered list (`<ol>`), one item per
  control, preserving the sequence for assistive tech.
- **The current page carries `aria-current="page"`.** This is the
  programmatic marker; the fill colour is the visual one. Colour
  alone would leave the current page unmarked for anyone not
  perceiving it.
- **Each page control names its destination**: an accessible name of
  "Page 3", not a bare "3". A screen reader's element list otherwise
  reads as a row of unexplained digits.
- **Previous and next need `aria-label`s** ("Previous page", "Next
  page"), since they are icon-only, and their glyphs are
  `aria-hidden="true"`.
- **The ellipsis is not focusable and not announced** — it is
  `aria-hidden="true"`. It stands for omitted numbers, which is
  meaningful visually and noise when read aloud.
- **Choose `<a>` or `<button>` by what the control does.** If each
  page has its own address, the controls are links and gain the
  browser's own affordances (open in a new tab, bookmark, back
  button). If pagination happens in place with no URL change, they
  are buttons. Do not style one as the other.
- **A page change must be announced.** Moving to a new page replaces
  the content without moving the viewport in a way a screen-reader
  user perceives. Either move focus to the heading (or first item)
  of the new page's content, or announce the change in a polite live
  region ("Page 3 of 12, showing 21 to 30"). Doing neither leaves
  the reader on a control whose surroundings have silently changed.
- **Disabled boundary controls use the `disabled` attribute**, not
  only a faded appearance, so they are not activated by keyboard.
- **Targets are at least 2.75rem on touch**, padded beyond the
  visible box if the visual density is tighter. Small adjacent
  numeric targets are among the easiest controls to mis-tap.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **May contain**: previous/next controls, numbered page controls, a
  truncation ellipsis, a results summary, a page-size selector.
- **Must not contain**: filters, sort controls, or bulk actions —
  those belong to the toolbar above the content, not to its
  navigation.
- **Referenced by**: `specs/data-table.md`, whose footer bar is this
  component. Any other paginated set — a List Group, a card grid —
  uses it in the same way. Add each consumer as it merges.
- **Uses**: `specs/button.md` for every control's shape, sizing and
  states.
- **Placement**: directly below the content it paginates, aligned to
  its edges. When the paginated content is a Card body, the bar sits
  in the Card footer. A bar repeated above *and* below a long table
  is acceptable; both instances must then stay in sync and only one
  carries the `<nav>` landmark's primary label.
- **Responsive**: below `breakpoint.md`, the Full variant becomes
  Compact rather than wrapping its numbers onto a second row.

## Tokens used

| Token | Usage |
|---|---|
| `color.brand.primary` | current page fill, focus ring |
| `color.text.on-accent` | current page label |
| `color.text.primary` | page number labels |
| `color.text.secondary` | results summary, ellipsis, disabled controls |
| `color.neutral.light` | control hover background |
| `color.surface.canvas` | bar background |
| `color.surface.border` | control borders, divider above the bar |
| `radius.base` | control corners |
| `spacing.1` | gap between controls |
| `spacing.2` / `spacing.3` | control padding |
| `font.size.sm` | control labels and summary |
| `font.weight.medium` | current page label |
| `breakpoint.md` | threshold at which Full becomes Compact |

## Reference visual description

Along the bottom edge of a table, inside the card that holds it: at
the left, in small gray text, "Showing 1 to 10 of 42 entries". At
the right, a row of small square controls with hairline borders and
softly rounded corners — a left chevron, then 1, 2, 3, then a gray
ellipsis, then 5, then a right chevron. The 2 is filled solid blue
with white text; the others are white with dark text and pick up a
pale gray fill as the pointer passes. The left chevron is faded and
unresponsive, because the reader is near the start.
