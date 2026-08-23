---
component: post-meta
requires: [foundations/typography.md, foundations/imagery.md]
references: [specs/tag.md]
---

# Component: Post Meta (byline)

## Purpose

The line of apparatus that says who wrote an article, when, how long
it takes to read, and what it is about. It appears under an article's
title and, in reduced form, inside `specs/article-card.md`.

It is one component rather than four loose pieces because the order
and the separators have to be consistent between the article page and
the feed — a byline that reorders itself between contexts reads as
two different sites.

## Anatomy

Parts, in this order. All are optional except the date, and a site
picks a set and keeps it.

1. **Author avatar** (optional) — `spacing.component.avatar-sm`, per
   `foundations/imagery.md`, with the required initials fallback.
2. **Author name** (optional) — `font.family.ui` at `font.size.sm`,
   `color.text.primary`, `font.weight.medium`. A link to the author's
   page where one exists, plain text where it does not.
3. **Date** (required) — the publication date in
   `color.text.secondary`. Written out ("14 March 2026"), never
   numeric-only: `03/04/2026` is two different days depending on the
   reader's country.
4. **Reading time** (optional) — "6 min read", in
   `color.text.secondary`.
5. **Updated date** (optional) — "Updated 2 April 2026". Shown only
   when it differs materially from the publication date, and it
   never replaces the original: a reader deciding whether they have
   read this before needs both.
6. **Tags** (optional) — a row of `specs/tag.md`.

Separators between items are a middot with `spacing.2` either side,
in `color.text.secondary`. Tags sit on their own line below the rest
rather than in the run of text — a row of pills inline with the
separators reads as a broken sentence.

## Variants

- **Article** — the full set, under an article's title on
  `patterns/article.md`.
- **Card** — date and reading time only, no avatar, no tags. Inside
  `specs/article-card.md`, where the author is usually the same for
  every card in the feed and the tags would triple the card's height.
- **Stacked** — avatar on its own row above the text, for a narrow
  viewport where the inline row would wrap awkwardly.

## States

This component has no interactive state of its own. Its author link
and its tags carry their own, per `specs/tag.md` and the link rules
in `specs/prose.md`.

## Accessibility rules

- **The date is a `<time datetime="...">`** carrying a machine-
  readable value alongside the human one. This is what lets a reader
  agent, a feed reader, or a search engine order the article
  correctly, and it costs one attribute.
- **The separator middots are `aria-hidden="true"`.** Announced, they
  produce "Jane Cooper middot 14 March 2026 middot 6 min read".
- **Reading time is an estimate and is worded as one** — "6 min
  read", not "6 minutes". It is derived from word count and is
  routinely wrong for a code-heavy article; a site that cannot
  estimate honestly should omit it rather than mislead.
- **The avatar is decorative** (`alt=""`) when the author's name is
  visible beside it, per `foundations/imagery.md`.
- **The updated date is distinguishable from the publication date in
  text**, not by position alone — "Updated 2 April 2026" carries its
  own label.
- **The tag row is a labelled list**, per `specs/tag.md`.
- **This is not a heading.** A byline styled at a heading's weight is
  still a paragraph, and marking it up as a heading corrupts the
  document outline `specs/table-of-contents.md` depends on.

## Composition rules

- **May contain**: exactly the parts under Anatomy.
- **Must not contain**: a share row, a subscribe control, a comment
  count, or an excerpt. Those belong to `patterns/article.md` or
  `specs/article-card.md`, and a byline that accumulates them stops
  being scannable.
- **Uses**: `specs/tag.md` for the tag row.
- **Placement**: directly beneath an article's title, or in an
  article card's footer. Never inside `specs/prose.md`.

## Tokens used

| Token | Usage |
|---|---|
| `font.family.ui` | all text |
| `font.size.sm` | author name, date, reading time |
| `font.weight.medium` | author name |
| `color.text.primary` | author name |
| `color.text.secondary` | date, reading time, separators |
| `spacing.component.avatar-sm` | avatar |
| `spacing.2` | separator spacing, gap above the tag row |
| `spacing.3` | gap between avatar and name |

## Reference visual description

Under a large sans headline, a single quiet line: a small circular
portrait, then a name in medium-weight sans, then a faint middot,
then "14 March 2026" in warm gray, another middot, and "6 min read".
Everything after the name is the same gray weight, so the eye takes
the line as one piece of apparatus rather than four facts. A little
below it, on its own line, three small gray capsules.
