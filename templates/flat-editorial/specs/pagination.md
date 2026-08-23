---
component: pagination
requires: [foundations/typography.md, foundations/iconography.md]
references: [specs/article-card.md]
---

# Component: Pagination

## Purpose

Moving between pages of a feed or an archive. A blog's archive is
long and mostly cold — a reader is either browsing recent posts or
looking for a specific one — so this component is deliberately plain.

## Anatomy

1. **Container** (required) — a row centred beneath the feed, with
   `spacing.16` above it, in `font.family.ui` at `font.size.sm`.
2. **Previous / Next controls** (required) — text links reading
   "Previous" and "Next" with a chevron from
   `foundations/iconography.md` on the outward side. **Text, not
   bare arrows**: a lone chevron is ambiguous about whether it means
   older or newer.
3. **Page numbers** (optional) — a run of numbered links with the
   current page marked. Truncated with an ellipsis when the count is
   long, always showing the first and last.
4. **Position summary** (optional) — "Page 2 of 9" in
   `color.text.secondary`.

## Variants

- **Prev/Next only** — the two controls and the position summary. The
  default. Most blog readers move one page at a time or use search.
- **Numbered** — with page numbers, for an archive a reader might
  jump around in.
- **Load more** — a single button appending the next page in place.
  Supported, with two conditions: the URL must update so a page is
  linkable and the browser's Back button works, and the newly
  appended items must be announced. **Infinite scroll is not a
  variant of this component and this template does not specify it** —
  it makes `specs/site-footer.md` unreachable, breaks Back, and
  strands a reader who cannot use a pointer.

## States

- **Default / hover / focus** — hover takes `color.accent.base` over
  `duration.state`; focus adds the 2px offset ring.
- **Current page** — `color.text.primary` at
  `font.weight.semibold` with `aria-current="page"`. Weight and
  colour, never colour alone.
- **Unavailable** — on the first page, "Previous" is **omitted, not
  disabled**. A disabled control that never becomes enabled is noise
  in the tab order; there is no state in which the reader could act
  on it.

## Accessibility rules

- **The container is a `<nav>` with an accessible name** —
  "Pagination". Where a page holds more than one paginated set, each
  names its own.
- **Controls are real `<a href>` elements** with working URLs, not
  buttons that mutate state. A feed page must be linkable,
  bookmarkable and openable in a new tab.
- **A number's accessible name says what it is** — "Page 3", not a
  bare "3", which announces as a stray digit in a link list.
- **The current page carries `aria-current="page"`** in addition to
  its styling.
- **A page change is announced.** After navigating within the page
  (Load more, or client-side routing), focus moves to the heading of
  the newly shown region, or a polite live region states the new
  position — otherwise a screen reader user gets no indication that
  anything happened.
- **"Load more" states how many arrived** — "12 more articles
  loaded" — in a polite live region.

## Composition rules

- **Glyphs**: the chevrons come from `foundations/iconography.md`
  and are `aria-hidden="true"`, since the adjacent word carries the
  meaning.
- **May contain**: the parts under Anatomy.
- **Must not contain**: a page-size selector, a sort control, or a
  jump-to-page field. Those belong to a data table in an application,
  not to a blog archive.
- **Placement**: beneath `patterns/home-feed.md`'s grid. Not used on
  `patterns/article.md`, whose next/previous article links are part
  of that pattern rather than this component — they navigate between
  articles, not between pages of a list.

## Tokens used

| Token | Usage |
|---|---|
| `color.text.primary` | current page |
| `color.text.secondary` | controls at rest, position summary |
| `color.accent.base` | hover, focus ring |
| `font.family.ui` | all text |
| `font.size.sm` | all text |
| `font.weight.semibold` | current page |
| `spacing.16` | space above the row |
| `spacing.4` | gap between controls |
| `spacing.component.icon-sm` | chevrons |
| `spacing.component.tap-target` | minimum pressable area |
| `duration.state` | hover transition |

## Reference visual description

Well below the last card in the feed, after a wide band of empty
page, a single quiet row centred under the grid: a thin chevron and
the word "Previous" in gray, a run of small numerals with the third
one darker and heavier than its neighbours, an ellipsis, a final
numeral, then "Next" and a chevron pointing the other way. No boxes,
no borders, no fills — just words, at the size of a caption.
