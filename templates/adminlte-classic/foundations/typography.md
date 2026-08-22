---
foundation: typography
references: [foundations/libraries.md]
---

# Foundation: Typography

## Purpose

Defines how this template's type is actually rendered: which family,
where it comes from, how it is loaded, and how the size and weight
tokens are applied.

`tokens/typography.json` names the family and the scale. That is not
enough on its own — a project that names Source Sans 3 and never
loads it renders in the browser's default sans, which is a different
typeface at a different width, and the interface immediately reads as
a wireframe rather than as this template. **Naming a font and loading
a font are two separate obligations, and both are required.**

## Load the font from a font package

**Self-host the family through a font package (a `@fontsource`-style
npm package or the equivalent for the target platform). Do not rely
on the family being installed locally, and do not skip loading it
because a fallback exists.**

The fallback stack in `font.family.base` is a safety net for the
moment before the font arrives — not a substitute for shipping it.

Why a package rather than a third-party stylesheet link:

- **It is versioned and offline-capable.** The font is part of the
  build, so the interface renders identically in a locked-down
  network, an air-gapped deployment, or a preview environment.
- **It avoids a third-party request** on every page load, with the
  privacy and latency that carries.
- **It subsets and self-hosts** the exact weights used, rather than
  fetching a whole family.

A project whose platform has no such package (a native app, for
example) bundles the font files by the platform's own mechanism. The
requirement is that the family is *shipped*, not how.

`foundations/libraries.md` lists starting points per ecosystem, as
suggestions rather than requirements.

### Which weights to ship

Only those the tokens use: `font.weight.regular` (400),
`font.weight.medium` (500), `font.weight.semibold` (600), and
`font.weight.bold` (700), in the normal style. A variable font
covering that range is preferred — one file, every weight.

Italic is not part of this template's scale. Where emphasis is
needed, it comes from weight or colour.

### The variable family is named separately

Font packages ship variable families under their own name — "Source
Sans 3 Variable" rather than "Source Sans 3" — so `font.family.base`
lists **both**, variable first, before the system fallbacks. A stack
that names only the static family silently renders in the fallback on
a project that shipped the variable one, which is the failure this
whole document exists to prevent.

### Loading behaviour

- Fonts load with `font-display: swap` (or the platform equivalent),
  so text is readable immediately and reflows once rather than
  hanging invisible.
- The fallback stack must be metrically close enough that the swap
  does not visibly relayout the page. Where the platform supports it,
  declare size-adjust/ascent overrides on the fallback.
- Font files are preloaded only for the weights used above the fold —
  typically regular and medium.

## Applying the scale

- **Every size comes from `font.size.*` or `font.heading.*`.** No
  arbitrary values, and no scaling text to fit a layout: a label that
  does not fit needs fewer words or more room, not a smaller size.
- **Weight carries hierarchy before size does.** This template is
  dense; jumping a size for emphasis costs vertical rhythm, while
  `font.weight.medium` costs nothing.
- **Line height follows purpose**: `font.lineHeight.base` for body
  copy, `font.lineHeight.dense` for table rows and tightly packed
  values, `font.lineHeight.tight` for headings.
- **One `h1` per page**, supplied by the content header in
  `patterns/app-shell.md`. Heading levels descend without skipping —
  a card title choosing `h3` because it "looks right" breaks document
  navigation for anyone moving by heading.
- **Numbers in tables and metric displays use tabular figures** where
  the family provides them, so digits align down a column and a
  changing value does not shift its neighbours.
- **Text is never justified**, and body copy is never set wider than
  roughly 75 characters — in this template that limit mostly binds
  inside modals and empty states.

## Accessibility

- Sizes are declared in `rem`, so the reader's own font-size setting
  is respected. A `font.size.xs` label is already the smallest thing
  in the interface; do not add a smaller one.
- Text must remain readable at 200% zoom without horizontal
  scrolling — a consequence of the same `rem` rule plus layouts that
  wrap rather than fix widths.
- Contrast follows the token pairing rules in `tokens/colors.json`.
  Note that this template's `font.size.xs` and `sm` text never
  qualifies as large-scale text, so 4.5:1 always applies to it.
- Do not disable the reader's ability to select text, and do not
  render text as an image — including in charts, where labels are
  real text.

## Composition rules

- The family, sizes, weights and line heights come from
  `tokens/typography.json`. This document says how they are loaded
  and applied; the tokens say what they are.
- `foundations/iconography.md` sizes icons against these text sizes —
  an icon changes size when the text beside it does.
- Every component spec's "Tokens used" table names the sizes it
  applies. Where a component needs a size the scale does not have,
  that is a token gap, not a licence to invent a value.

## Tokens used

| Token | Usage |
|---|---|
| `font.family.base` | the shipped family plus its fallback stack |
| `font.family.monospace` | code, identifiers, fixed-width values |
| `font.size.xs` … `font.size.xl` | the interface scale |
| `font.heading.h1` … `h6` | page and section headings |
| `font.weight.regular` … `bold` | the four shipped weights |
| `font.lineHeight.tight` / `base` / `dense` | headings / body / dense rows |

## Reference visual description

A humanist sans with open counters and slightly narrow proportions,
set small and tightly led — the page reads as dense but not cramped.
Page titles are large and semi-bold; card titles are barely larger
than body text and distinguished mostly by weight. Table figures line
up in a column because the digits are all one width. Nothing on the
page is italic, and nothing is set in a second family except the
occasional identifier in monospace.
