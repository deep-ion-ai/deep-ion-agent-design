---
component: ribbon
requires: [foundations/iconography.md]
references: [specs/card.md, specs/badge.md]
---

# Component: Ribbon

## Purpose

A short word pinned diagonally across the corner of a card, marking
what the whole card is: "New", "Draft", "Beta", "Expired". It is a
label for the container, read before the container's contents.

It is a **decoration applied to a Card** (`specs/card.md`), not a
component that stands on its own — a ribbon with nothing behind it
has nothing to label.

The neighbour to distinguish it from is Badge (`specs/badge.md`),
and the line is about scope: a badge labels an *element* — a row's
status, a heading's stage, a count on an icon — and sits inline in
the reading order. A ribbon labels the *entire card* and sits
outside the reading order, in the corner. A card that needs several
states labelled needs badges in its body; a ribbon is one word about
the whole thing.

Use it sparingly. A grid where most cards carry a ribbon has taught
the reader that a ribbon means nothing, and the ribbons are then
costing corner space and attention for no signal.

## Anatomy

1. **Banner** (required) — a diagonal strip crossing one corner of
   the parent, filled with an accent colour, its ends clipped by the
   parent's edges so it appears to pass behind them.
2. **Label** (required) — a very short word, in
   `font.weight.semibold`, rendered along the banner's diagonal.
   Roughly six characters at the default size: a ribbon is not a
   place for a phrase, and text that outgrows the banner is a badge
   or a card header.

## Variants

- **Corner: top-start / top-end** — the two corners in scope. Bottom
  corners are excluded: a card's bottom corner is where its footer
  actions sit, and a ribbon there covers them.
- **Colour** — from `color.brand.*` and `color.status.*`, following
  the template's per-fill text pairing.
- **Size: default / large / extra-large** — larger sizes increase
  the banner's depth and its label's size together. The default is
  correct for nearly every case; the larger ones exist for a card
  used as a page-level feature, not for emphasis within a grid.

## States

A ribbon is static. It has no interactive states: it is not
clickable, not focusable, and does not respond to the pointer —
including when the card behind it is itself clickable, where the
ribbon must not intercept the pointer.

Two behaviours still apply:

- **Present / absent** — a ribbon is added when its condition holds
  and removed when it does not. It is never rendered in a muted or
  "off" form: an off ribbon still occupies the corner and still
  reads as a label.
- **Value change** — where a card's state changes while the page is
  open, the ribbon is replaced. No transition; a corner banner
  animating on a dashboard draws attention out of proportion to what
  it says.

## Accessibility rules

- **A ribbon must be perceivable by a reader who cannot see it, and
  it must be attached to the card it labels.** A ribbon rendered as
  a floating decorative element — the usual implementation — is
  either not announced at all, or announced as a stray word between
  cards. Neither tells the reader that *this card* is a draft.
- **The required approach**: include the ribbon's word in the card's
  own accessible name or description, and mark the visual banner
  `aria-hidden="true"` as a duplicate of that text. In practice:
  - Where the card's title is its accessible name, the ribbon's word
    joins it — the card is named "Quarterly report (Draft)".
  - Where the card is a link or button, its accessible name carries
    the word — "Open quarterly report, draft".
  - Where neither fits, the card carries `aria-describedby` pointing
    at visually-hidden text containing the word.
  Exactly one of these, never a combination: two of them produce
  "Draft" twice.
- **Never leave the banner as the only carrier** with no `alt`, no
  hidden text and no name — which is what a purely CSS-drawn ribbon
  amounts to.
- **Colour is not the signal; the word is.** A red ribbon and a
  green ribbon differ only by hue to many readers, so "Expired" and
  "New" must be legible as words. This also means a ribbon must
  never be wordless.
- **Contrast**: the label uses `color.text.on-accent` over
  `brand.primary`, `brand.secondary`, `status.success` and
  `status.danger`, and `color.text.on-accent-dark` over
  `status.warning` and `status.info` — white over those two is
  1.63:1 and 1.96:1. The rotated text does not change the
  requirement.
- **The banner must not overlap the card's own controls.** A ribbon
  in the top-end corner collides with the card header toolbar
  (`specs/card.md`); pick the opposite corner, or drop the toolbar.
  A decoration that covers a control is a defect, not a style
  choice.
- **Rotated text must remain selectable and scalable** — drawn as
  real text with a transform, never as an image of text, so it
  survives zoom and a reader's own font settings.

## Composition rules

- **Applies to**: a Card (`specs/card.md`). It is documented there
  as an optional decoration.
- **Requires** of its parent: a positioning context, and clipped
  overflow so the banner's ends are cut by the card's rounded
  corners rather than hanging outside them. A parent that cannot
  clip its overflow cannot carry a ribbon.
- **One ribbon per card.** Two ribbons on one card is two labels for
  one thing, and they compete rather than combine.
- **Must not contain**: an icon, a count, a link, or more than one
  word.
- **Must not be applied to**: a Stat Callout (its corner holds the
  decorative glyph and its fill already carries the meaning a ribbon
  would), a Data Table row (that is a Badge in a status cell), a
  Modal, or the page itself.
- **Alternative**: where the label needs to be read as part of the
  card's content rather than as a mark on it — where it is data
  rather than a flag — use a Badge in the card header instead.

## Tokens used

| Token | Usage |
|---|---|
| `color.brand.*` / `color.status.*` | banner fill |
| `color.text.on-accent` | label over primary, secondary, success, danger |
| `color.text.on-accent-dark` | label over warning, info |
| `font.weight.semibold` | label |
| `font.size.xs` | label, default size |
| `font.size.sm` | label, large size |
| `font.size.base` | label, extra-large size |
| `spacing.1` | banner padding, default size |
| `spacing.2` | banner padding, large and extra-large sizes |
| (card anatomy) | see `specs/card.md` |

## Reference visual description

A white card in a grid of white cards, distinguished by a strip of
solid green running diagonally across its upper-left corner, its two
ends disappearing behind the card's edges as though the strip passed
underneath. Along the diagonal, in small white capitals, the word
"NEW". The strip sits above the card's surface but below nothing
else; the card's own title begins clear of it, and the corner it
occupies holds no other control.
