---
foundation: bidirectionality
references: [foundations/libraries.md, foundations/iconography.md]
---

# Foundation: Bidirectionality (RTL)

## Purpose

This template's specs are written to be read in either direction.
"Leading edge" and "trailing edge" appear throughout them instead of
left and right, and `specs/offcanvas.md` anchors its panel to "the
inline end of the viewport (the right side in a left-to-right
layout)" rather than to the right.

That convention was never written down, which made it invisible to
anyone reading the template and left it drifting in the places where
a spec quietly said "left" for something that flips. This file states
it, so an agent generating code from these specs knows that
*leading* is a real instruction and not a stylistic tic.

## The convention

**A spec describes position relative to the reading direction, never
as left or right.**

- **Leading** — the side text starts on. Left in English, right in
  Arabic or Hebrew.
- **Trailing** — the opposite side.
- **Start / end** — the same idea where the surrounding language
  prefers those words: `specs/dropdown-menu.md`'s alignment variants
  are named "start" and "end" for exactly this reason.

Where naming a physical side genuinely helps a reader picture
something, do it the way `specs/offcanvas.md` already does — name the
logical side first and give the physical one as a parenthetical tied
to a stated direction:

> anchored to the inline end of the viewport (the right side in a
> left-to-right layout)

**Top and bottom never flip** and are used plainly.

### One deliberate exception

Each spec's **Reference visual description** is prose describing one
concrete rendering — what a person would see looking at a screen. It
is written left-to-right and stays that way. Rewriting those passages
in logical terms would make them worse at the one job they have,
which is to be picturable. Every *normative* section — Anatomy,
Variants, States, Accessibility rules, Composition rules, Page
structure — uses leading/trailing.

## What flips, and what does not

**Flips with the reading direction:**

- Layout and alignment: the Sidebar's side, a Card header's title and
  toolbar, a table toolbar's two clusters, a Modal's footer actions.
- Text alignment, and the side a border or accent bar sits on.
- Directional glyphs: chevrons that mean "forward"/"back"/"expand
  toward", a Breadcrumb's separators, a Pagination stepper's arrows,
  a Button's trailing "next" arrow.
- The direction a `specs/progress-bar.md` fills, and the side a
  `specs/checkbox-radio-switch.md` Switch's thumb rests on.
- Which corner a `specs/badge.md` overflow count or a
  `specs/ribbon.md` banner occupies.

**Does not flip:**

- **Icons of real-world objects that have no direction** — a trash
  can, a bell, a magnifier, a gear. Mirroring these produces a
  subtly wrong drawing and nothing else. See
  `foundations/iconography.md`.
- **Media playback controls.** Play, fast-forward and rewind are
  conventionally left-to-right in every locale.
- **Numbers, and Latin-script strings embedded in RTL text.** A
  phone number, an order id, a hex colour, a currency amount and a
  code snippet keep their own internal direction even inside an RTL
  paragraph. This is handled by the platform's bidi algorithm rather
  than by anything this template specifies — the requirement is not
  to fight it, and in particular not to force a direction on a field
  whose content may be either.
- **Time as a chart axis**, where the convention is
  locale-independent — `specs/trend-chart-card.md`'s x-axis runs the
  same way in both directions.
- **Progress through a `patterns/wizard.md`** as a concept: step 1 is
  still step 1. Its *indicator* fills from the leading edge, which is
  the flipping part.

## The tokens do not change

Nothing in `tokens/` needs an RTL counterpart. Spacing, radii and
typography are the same values in both directions — they are simply
applied to *logical* sides rather than physical ones. This is
different from the theme work in `foundations/theming.md`, which does
need a mirrored token set, and the difference is worth stating so
that nobody adds one here.

The one thing to watch is a radius applied to a named corner: a
`specs/offcanvas.md` panel rounds the corners on the side facing the
content, which is a different physical pair in each direction — the
same `radius.base` value, a different corner.

## Implementation

The template mandates the behaviour, never the mechanism — the same
position `foundations/libraries.md` takes on libraries.

On the web that usually means `dir="rtl"` on the document together
with CSS logical properties — `margin-inline-start`,
`padding-inline-end`, `border-inline-start`, `inset-inline-start`,
and `text-align: start` — in place of their physical equivalents, so
one stylesheet serves both directions. On a platform without a DOM,
map the same logical sides onto whatever that platform provides.

Two rules that hold whatever the mechanism:

- **Set the direction on the document, not per component.** A
  component that decides its own direction will disagree with its
  neighbour the first time one is missed.
- **Direction follows the content's language.** A page rendering
  Arabic content inside an English admin shell needs `dir` on the
  element holding that content, not on the whole page.

## Accessibility

- **Do not fake direction with `transform: scaleX(-1)`** on a whole
  region. It mirrors text and non-directional icons along with
  everything else, and it inverts the visual order without changing
  the DOM order, so what a sighted reader sees and what a screen
  reader announces stop matching.
- **The DOM order stays the reading order.** Direction changes how a
  row is painted, never the sequence a keyboard tabs through — that
  follows the document, and the document follows the content.
- **Arrow keys follow the visual direction.** In a
  `specs/disclosure.md` tab list or a `specs/button.md` toggle group
  under RTL, Left Arrow moves to the *next* item, because it moves
  toward where the next item now is. Wiring arrow keys to a fixed
  index regardless of direction is the common failure.
- **Focus rings and hit targets are unaffected**, being symmetrical.

## Reference visual description

The app shell, mirrored. The near-black navigation column now runs
down the right side of the window, its item icons sitting to the
right of their labels and the thin accent bar marking the current
item on the column's right edge. The top bar's hamburger glyph is at
its right end and the account cluster at its left. In the content
region, a card's title sits at the right of its header with the
toolbar glyphs at the left, the breadcrumb reads right to left with
its chevrons pointing left, and a progress bar fills from the right.
The trash glyph in the table's action column is drawn exactly as it
was, and an order id in the cell beside it still reads left to right.
