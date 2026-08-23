---
component: tag
requires: [foundations/typography.md]
references: [specs/post-meta.md]
---

# Component: Tag

## Purpose

A short label naming a topic an article belongs to — "TypeScript",
"Design systems". Tags are how a reader moves sideways through a
blog: from an article to everything else on the same subject.

**A tag is almost always a link**, to that topic's archive. A tag
that is not a link is a claim with nothing behind it, and this
template treats that as a smell rather than a variant: if a topic has
no archive page, it should not be shown as a tag.

Do not confuse it with a **status badge**. This template has none:
nothing on a blog has a status a reader needs colour-coded, and a set
of differently-coloured tags teaches readers that the colours mean
something when they only mean "different topic".

## Anatomy

1. **Container** (required) — `radius.pill`, padded `spacing.2`
   horizontally and half that vertically, on
   `color.surface.sunken`. The pill is the only heavy rounding in
   this template, and it is doing semantic work: it says "this is a
   label you can press".
2. **Label** (required) — `font.family.ui` at `font.size.xs`,
   `font.weight.medium`, `color.text.secondary`. Sentence case, not
   uppercase: a tag is a proper noun as often as not, and uppercasing
   "TypeScript" loses information.
3. **Count** (optional) — the number of articles under the tag,
   after the label in `color.text.secondary`. Only on an archive
   index, never in an article's byline, where it is noise.

## Variants

- **Default** — as described.
- **Active** — the tag whose archive the reader is currently on:
  `color.accent.base` background with `color.text.on-accent` label.
  Used only on an archive page.
- **Plain** — no pill, label only, in `color.accent.base` with an
  underline. For a dense byline where a row of pills would out-shout
  the article's own title. Choose one treatment per site and keep it.

**All tags are the same colour.** No per-topic colour coding — see
Purpose.

## States

- **Default / hover / focus** — hover lifts the background to
  `color.accent.wash` and the label to `color.accent.base` over
  `duration.state`. Focus adds the ring described below.
- **Active** — see Variants; not a hover state.
- **Disabled does not apply.** A tag is a link; a topic with no
  articles has no page to link to and is not rendered.

## Accessibility rules

- **A tag is a real `<a href>`.** Not a `<span>` with a click
  handler, and not a `<button>` — it navigates.
- **A row of tags is a list** (`<ul>`), so assistive tech announces
  how many there are.
- **The row has an accessible name** — "Topics" — so the tags are not
  announced as an unexplained set of links.
- **The label alone is not always enough context.** In a screen
  reader's link list, a bare "Design" is ambiguous; where the row is
  not adjacent to a heading that explains it, each tag's accessible
  name reads "Topic: Design".
- **The hit target is `spacing.component.tap-target`.** A tag is
  visually small, so the pressable area is padded beyond the pill
  rather than the pill being inflated to meet it.
- **Contrast**: the label on `color.surface.sunken` is
  `color.text.secondary`, verified at 5.89:1 against that surface in
  `tokens/colors.json` — the sunken surface is the worst case the
  palette was built against, and this component is why.

## Composition rules

- **May contain**: a text label and an optional count. Nothing else —
  no icon, no close control. A removable tag belongs to a filter UI,
  which this template does not have.
- **Must not**: be used for anything that is not a topic — not a
  reading time, not a date, not a "new" marker.
- **Referenced by**: `specs/post-meta.md`, which places the tag row
  in a byline. That spec decides where tags appear; everything about
  the tag itself is here.
- **Placement**: inside `specs/post-meta.md`, in
  `specs/article-card.md`'s footer, or as an index on an archive
  page. **Never inside `specs/prose.md`** — see that spec's
  composition rules.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.sunken` | container background |
| `color.text.secondary` | label |
| `color.accent.wash` | hover background |
| `color.accent.base` | hover label, active background, plain variant |
| `color.text.on-accent` | active label |
| `font.family.ui` | label |
| `font.size.xs` | label |
| `font.weight.medium` | label |
| `radius.pill` | container |
| `spacing.2` | container padding, gap between tags |
| `spacing.component.tap-target` | minimum pressable area |
| `duration.state` | hover transition |

## Reference visual description

Beneath an article's title, a row of three small warm-gray capsules,
each holding one or two words in a compact sans at a size clearly
below the byline beside them. All three are the same colour; nothing
distinguishes one topic from another. As the pointer crosses one, its
fill turns the palest violet and its text turns violet with it,
quickly enough that the change reads as immediate.
