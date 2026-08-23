---
component: site-footer
requires: [foundations/typography.md]
references: [specs/subscribe-form.md]
---

# Component: Site Footer

## Purpose

The block at the foot of every page: the things a reader looks for
only once they have decided to look — an about line, secondary
navigation, feed and social links, a copyright.

The footer is where this template puts what the header deliberately
refuses. `specs/site-header.md`'s brief is to stay out of the way; a
reader who has scrolled to the bottom of an article is finished with
it and is available for something else.

## Anatomy

1. **Container** (required) — `color.surface.sunken`, separated from
   the content above by a 1px `color.surface.rule`, padded
   `spacing.16` vertically. Contents capped at `font.measure.page`.
2. **About line** (optional) — one or two sentences saying what the
   site is, in `font.family.ui` at `font.size.sm`,
   `color.text.secondary`, capped at `font.measure.prose`.
3. **Link columns** (optional) — up to three short columns, each with
   a heading in `font.family.ui` at `font.size.xs`,
   `font.tracking.wide`, uppercase, `color.text.secondary`, and its
   links at `font.size.sm` in `color.text.primary`.
4. **Subscribe block** (optional) — `specs/subscribe-form.md`. The
   footer is its natural home; see that spec on why it does not
   interrupt an article.
5. **Feed link** (recommended) — a link to the site's RSS/Atom feed.
   Recommended rather than optional because it is the one piece of
   blog infrastructure that survives platforms, and it costs a line.
6. **Copyright** (required) — a single line at `font.size.xs` in
   `color.text.secondary`, at the foot.

## Variants

- **Minimal** — about line and copyright only. The default for a
  personal blog, and enough.
- **Columned** — with link columns, for a site with real secondary
  navigation.
- **With subscribe** — either of the above plus the subscribe block,
  which sits above the columns.

## States

The footer has no state of its own. Its links behave as
`specs/site-header.md`'s navigation links do: `color.accent.base` on
hover over `duration.state`, with the same focus ring.

## Accessibility rules

- **The footer is a `<footer>` landmark** at the page level.
- **Its navigation, where present, is a `<nav>` with its own
  accessible name** ("Footer") — distinct from the header's "Main",
  since two identically-named landmarks are worse than one.
- **The column headings are real headings** at the level the page's
  outline calls for, not styled `<div>`s. They are what makes the
  columns navigable rather than one long list of links.
- **Link text describes its destination out of context**, per
  `specs/prose.md`.
- **The feed link names the format** — "RSS feed" — since "Feed"
  alone is ambiguous.
- **Social links are text or icons with accessible names**, never
  bare glyphs. An icon-only social row where each control is
  announced as "link" is the most common footer defect.
- **Contrast is verified against `color.surface.sunken`**, the
  darkest light surface in the palette, which is why every text
  token in `tokens/colors.json` was measured against it.

## Composition rules

- **May contain**: the parts under Anatomy.
- **Must not contain**: an article's own metadata, a comment form, or
  a second copy of the header's navigation. A footer that mirrors the
  header adds a second identical tab-stop set to every page.
- **Uses**: `specs/subscribe-form.md`.
- **Placement**: last on every page, after the content region.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.sunken` | container background |
| `color.surface.rule` | top edge |
| `color.text.primary` | column links |
| `color.text.secondary` | about line, column headings, copyright |
| `color.accent.base` | link hover, focus ring |
| `font.family.ui` | all text |
| `font.size.sm` | about line, links |
| `font.size.xs` | column headings, copyright |
| `font.tracking.wide` | column headings |
| `font.measure.page` | maximum content width |
| `font.measure.prose` | about line width |
| `spacing.16` | vertical padding |
| `duration.state` | link hover |

## Reference visual description

Below the end of the article, separated by a hairline, a band of warm
gray filling the window's width. Inside it, at the reading column's
width, two sentences of small gray sans explaining what the site is.
To the trailing side, two short columns of links under tiny
letter-spaced capitals. At the very bottom, on its own line, a single
faint line of type with a year in it. Nothing is boxed, nothing is
raised, and the only line anywhere is the one separating the band
from the page above.
