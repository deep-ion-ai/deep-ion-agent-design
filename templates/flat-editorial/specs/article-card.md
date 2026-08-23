---
component: article-card
requires: [foundations/typography.md, foundations/imagery.md]
references: [specs/post-meta.md, specs/tag.md]
---

# Component: Article Card

## Purpose

One article as it appears in a list: a feed, an archive, a "related
articles" row. It carries just enough for a reader to decide whether
to open the article — title, a short excerpt, and when it was
published.

**A card is not a small article.** Its excerpt is UI text in the sans
family, not `specs/prose.md`; its title is not the page's heading
level; and it never carries the article's full first paragraph.

## Anatomy

1. **Container** (required) — `color.surface.canvas`,
   `radius.base`, padded `spacing.component.card-padding`. Separated
   from its neighbours by a 1px `color.surface.rule` or by
   whitespace — see Variants. **No shadow**: this template has none.
2. **Thumbnail** (optional) — the article's cover image, per
   `foundations/imagery.md`, at `radius.lg`, with a fixed aspect
   ratio so a row of cards does not stagger. Cropped, never
   letterboxed.
3. **Title** (required) — `font.family.ui` at `font.heading.h3`,
   `font.weight.semibold`, `color.text.primary`,
   `font.lineHeight.tight`. Wraps to at most three lines and
   truncates with an ellipsis beyond that.
4. **Excerpt** (optional) — two or three lines in
   `font.family.ui` at `font.size.base`, `color.text.secondary`,
   truncated at a fixed line count so cards in a row stay level. An
   author-written summary where one exists; the article's first
   sentences otherwise.
5. **Meta** (required) — `specs/post-meta.md` in its Card variant:
   date and reading time.
6. **Tags** (optional) — `specs/tag.md`, at most three. A card
   showing every tag of a heavily-tagged article becomes a tag list
   with a headline attached.

## Variants

- **Stacked** — thumbnail above the text. The default in a
  multi-column feed grid.
- **Horizontal** — thumbnail at the leading edge, text beside it. For
  a single-column list on a wide viewport, where a stacked card would
  leave the text stranded under a very wide image.
- **Text-only** — no thumbnail. **Not a fallback but a first-class
  variant**: many good articles have no cover image, and a feed that
  renders a placeholder rectangle for them looks broken. Cards
  without thumbnails sit in the same grid as cards with them.
- **Bordered / borderless** — a `color.surface.rule` outline, or
  separation by whitespace and a divider rule between rows. Pick one
  per surface; mixing them in one feed reads as an error.

## States

- **Default** — as described.
- **Hover** — the title takes `color.accent.base` over
  `duration.state`. The container itself does not lift, tint, or
  scale: there is no elevation in this template to raise it to.
- **Focus** — the focus ring is drawn around **the whole card**, not
  around the title alone, since the card is one target. 2px
  `color.accent.base`, offset.
- **Visited** — not styled. See `specs/prose.md`.

## Accessibility rules

- **The whole card is one link, with one focusable element.** The
  common defect is a card containing a linked thumbnail, a linked
  title, and a linked "Read more" — three tab stops and three
  identical announcements for one destination. Wrap the title in the
  `<a>` and let the card's clickable area extend from it, so there is
  exactly one link.
- **Tags are the exception**, because they lead somewhere else. A
  card with tags therefore has two destinations and must not be a
  single wrapping `<a>` — nesting a link inside a link is invalid.
  Use the title link plus an overlay that covers the card, with the
  tags sitting above it in stacking order.
- **The title's heading level comes from the page**, not from this
  component: inside a feed whose section has an `h2`, a card title is
  an `h3`. It is never an `h1`.
- **The link's accessible name is the article title**, not "Read
  more". A screen reader's link list of twelve "Read more" entries is
  useless.
- **The excerpt is not part of the link's accessible name.**
  Announcing three lines of summary before the reader can move to the
  next card makes the feed slow to skim.
- **A truncated title must still be fully available** to assistive
  technology — truncate visually with CSS, never by cutting the
  string.
- **The thumbnail is decorative** (`alt=""`): the title beside it
  already names the article.

## Composition rules

- **May contain**: exactly the parts under Anatomy.
- **Must not contain**: a share row, an author bio, a comment count,
  a "Read more" control (the title is the link), or
  `specs/prose.md`.
- **Uses**: `specs/post-meta.md` (Card variant), `specs/tag.md`.
- **Placement**: inside `patterns/home-feed.md`'s grid, or in a
  related-articles row at the foot of `patterns/article.md`.
- **Cards in a row keep equal height** regardless of excerpt length,
  with the meta pinned to the bottom of the card rather than
  following the text — otherwise a row of cards with different
  excerpt lengths leaves the dates visibly ragged.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | container background |
| `color.surface.rule` | container border, divider between rows |
| `color.text.primary` | title |
| `color.text.secondary` | excerpt |
| `color.accent.base` | title on hover, focus ring |
| `font.family.ui` | all text |
| `font.heading.h3` | title |
| `font.size.base` | excerpt |
| `font.lineHeight.tight` | title |
| `radius.base` | container |
| `radius.lg` | thumbnail |
| `spacing.component.card-padding` | container padding |
| `spacing.4` | gap between title, excerpt and meta |
| `duration.state` | title hover |

## Reference visual description

In a grid of three, a white block with softly rounded corners sitting
flat on a warm off-white page — no shadow, its edge marked by a
hairline. At the top, a photograph cropped to a consistent letterbox
shape with slightly rounder corners than the card. Beneath it, two
lines of heavy sans headline in near-black, then two lines of gray
summary, then, pinned to the card's lower edge, a small gray line
reading "14 March 2026 · 6 min read". The card beside it has no
photograph at all and starts straight at its headline, sitting in the
same grid at the same height. Moving the pointer over either turns
its headline violet and nothing else moves.
