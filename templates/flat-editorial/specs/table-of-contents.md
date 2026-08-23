---
component: table-of-contents
requires: [foundations/typography.md]
references: [specs/prose.md]
---

# Component: Table of Contents

## Purpose

A list of an article's section headings, linking into the body. It
earns its place on a long or reference-style article — a tutorial, a
changelog, documentation-shaped writing — and only there.

**On a short essay it is clutter.** A table of contents listing three
headings above a 900-word article tells the reader nothing they would
not learn by scrolling, and takes the space between the byline and
the first paragraph. This spec states a threshold rather than leaving
it to taste: see Variants.

## Anatomy

1. **Container** (required) — no background, no border, no shadow.
   Separated from what surrounds it by whitespace and, where placed
   in the flow, a 1px `color.surface.rule` above and below.
2. **Heading** (required) — "Contents" or "On this page", in
   `font.family.ui` at `font.size.xs`, `font.tracking.wide`,
   uppercase, `color.text.secondary`.
3. **Entries** (required) — one per heading, in
   `font.family.ui` at `font.size.sm`, `color.text.secondary`,
   separated by `spacing.2`. Nested one level for `h3` under `h2`,
   indented by `spacing.4`. **Never deeper than two levels**: a
   three-level contents list is an outline, and an article that needs
   an outline needs to be shorter.
4. **Active marker** (Sidebar variant only) — a 2px
   `color.accent.base` rule on the entry's leading edge.

## Variants

- **Inline** — in the article flow, between the byline and the first
  paragraph, at `font.measure.prose`. The default, and the only
  variant below `breakpoint.lg`.
- **Sidebar** — in the margin beside the article, sticky as the
  reader scrolls, with the current section marked. Available only at
  `breakpoint.lg` and above, where there is margin to put it in
  without narrowing `font.measure.prose` — **the measure is never
  reduced to make room for it**. If the viewport cannot hold the
  measure plus a sidebar, the Inline variant is used.
- **Omitted** — the correct choice below roughly six headings or
  1,500 words. A site should apply one threshold consistently rather
  than deciding per article.

## States

- **Entry default / hover / focus** — hover takes
  `color.accent.base` over `duration.state`; focus adds the ring.
- **Current section** (Sidebar variant) — `color.text.primary` at
  `font.weight.medium` plus the active marker. Colour and weight
  together.
- **Collapsed** (Inline variant, below `breakpoint.sm`) — the list
  may collapse behind a disclosure control labelled "Contents", to
  keep a long list from pushing the article's first paragraph off a
  small screen. It is closed by default in that case.

## Accessibility rules

- **The container is a `<nav>` with an accessible name** matching its
  visible heading, so it can be skipped or jumped to.
- **The entries are a real list** (`<ul>`, nested for sub-entries), so
  a screen reader announces the count and the structure.
- **Each entry links to its heading's id**, which
  `specs/prose.md` guarantees is stable and human-readable. This
  component reads those ids and must never invent its own: a
  generated `#section-3` breaks the moment a heading is inserted
  above it.
- **Entry text is the heading text, verbatim.** Shortening it breaks
  the correspondence the reader is relying on to find the section.
- **Activating an entry moves focus to the target heading**, not just
  the scroll position. Scrolling alone leaves a keyboard user's focus
  at the top of the document, so their next Tab returns them to where
  they started — the defect that makes most tables of contents
  useless to keyboard users.
- **The current-section marker is not announced as a state change**
  while scrolling. Updating a live region as the reader scrolls
  produces continuous chatter; the visual marker is a pointer-user
  convenience and stays visual.
- **The nav is not a heading level** and must not be marked up as
  one — it would appear in the outline it is describing.

## Composition rules

- **May contain**: the heading and the entry list.
- **Must not contain**: entries for headings that do not exist in the
  body, links to other articles, or an advertisement.
- **Must not**: reduce `font.measure.prose` in the Sidebar variant —
  see Variants.
- **Referenced by**: `patterns/article.md`, which decides which
  variant is used and where; this spec defines both.

## Tokens used

| Token | Usage |
|---|---|
| `color.text.secondary` | heading, entries at rest |
| `color.text.primary` | current entry |
| `color.accent.base` | hover, active marker, focus ring |
| `color.surface.rule` | rules above and below the inline variant |
| `font.family.ui` | all text |
| `font.size.xs` | heading |
| `font.size.sm` | entries |
| `font.tracking.wide` | heading |
| `font.weight.medium` | current entry |
| `font.measure.prose` | inline variant width |
| `spacing.2` | gap between entries |
| `spacing.4` | nested entry indent |
| `breakpoint.lg` | where the sidebar variant becomes available |
| `duration.state` | hover transition |

## Reference visual description

Between the byline and the first paragraph, bounded above and below
by hairlines, a small block: the word "CONTENTS" in tiny spaced-out
gray capitals, then five short gray lines of sans type, two of them
indented a step. Nothing is boxed or filled. On a wide display the
same list instead sits out in the left margin, level with the first
paragraph and staying there as the page scrolls, one of its lines
darker than the others with a short violet rule against its leading
edge — and the article's text column has not moved or narrowed to
make room for it.
