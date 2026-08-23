---
foundation: iconography
references: [foundations/libraries.md]
---

# Foundation: Iconography

## Purpose

Defines the icon set this template uses and, more importantly, how
little of it there is. An editorial page is carried by type and
space; an icon here is a small piece of apparatus, never a decoration
and never a substitute for a word.

## Use an icon library

**Icons are rendered as inline SVG from one coherent, stroke-based
family, so they inherit `currentColor`** and follow the text they sit
beside — including across a theme change, which is most of why
`currentColor` matters. `foundations/libraries.md` lists starting
points per ecosystem; the template mandates the properties below, not
a package.

**Never substitute an emoji or a Unicode character for an icon.** An
emoji is a colour image the reader's platform chooses, it ignores
`currentColor`, it renders differently on every device, and it is
announced by a screen reader with a name nobody chose. This applies
to a category glyph, a bullet, and an arrow alike.

### Choosing the set

- One family, one stroke weight, across the whole site.
- Stroke-based rather than filled, matching the hairline weight this
  template's rules and borders already use.
- A stroke weight that sits at the visual weight of the text beside
  it — for most families that means lighter than their default.

## How few

This template's entire icon vocabulary is roughly:

- a menu glyph and a close glyph (mobile navigation)
- a chevron (pagination, a disclosure)
- a link/anchor glyph (a heading's permalink)
- a copy glyph (a code block)
- a theme glyph (sun/moon)
- a small set of share/social marks, if the site has them
- an arrow (a "next article" link)

**If a needed glyph is not on that list, prefer a word.** "Read more"
is better than an arrow alone; "3 min read" is better than a clock.
An icon earns its place when a label genuinely will not fit or when
the same control repeats often enough that its shape becomes faster
to recognise than its text — which, on a blog, is rare.

## Sizing

Icon boxes come from `tokens/spacing.json`:

| Token | Paired with |
|---|---|
| `spacing.component.icon-sm` | `font.size.xs` / `font.size.sm` text |
| `spacing.component.icon-md` | `font.size.base` text |
| `spacing.component.icon-lg` | `font.size.lg` text or a heading |

The box is square and fixed; an icon is never scaled to a size
outside this list. Optical alignment matters more than box alignment:
centre the glyph on the text's x-height, not on its line box.

## Colour and alignment

- **Colour is never set on an icon.** It inherits `currentColor` from
  whatever it sits in — which is what makes a theme change free.
- **An icon beside text takes `spacing.1` of gap** and sits on the
  same baseline treatment as the text.
- **An icon is never the only carrier of meaning**, which follows
  from the general rule this template states for colour.

## Accessibility

- **A decorative icon is `aria-hidden="true"`.** That includes every
  icon that sits beside a visible label — announcing both reads the
  same thing twice.
- **An icon-only control requires an accessible name** describing the
  action and its object: "Open navigation", "Copy code", "Switch to
  dark theme" — never a bare "Menu" or "Copy".
- **The hit target is `spacing.component.tap-target`**, padded beyond
  the visible glyph rather than by inflating the glyph. This template
  draws icons small, so the gap between what is visible and what is
  pressable is larger here than usual and must be deliberate.
- **A heading's permalink glyph** may be revealed on hover for
  pointer users, but must be reachable and visible on keyboard focus
  — a control that exists only on hover does not exist for a keyboard
  or touch reader.

## Composition rules

- **May be used by**: `specs/site-header.md`, `specs/pagination.md`,
  `specs/code-block.md`, `specs/prose.md` (heading permalinks),
  `specs/post-meta.md`.
- **Must not be used**: as a bullet in a prose list, as a decorative
  flourish beside a heading, or as a category marker in place of a
  `specs/tag.md`.
- **Illustrations are not icons** and follow
  `foundations/imagery.md`.

## Tokens used

| Token | Usage |
|---|---|
| `spacing.component.icon-sm` | icon beside small text |
| `spacing.component.icon-md` | default icon box |
| `spacing.component.icon-lg` | icon beside large text |
| `spacing.component.tap-target` | minimum pressable area |
| `spacing.1` | gap between an icon and its label |

## Reference visual description

A page with almost no icons on it. In the header, at a narrow width,
three thin stacked lines in the same near-black as the text beside
them. Beside an article's section heading, invisible until the
pointer arrives, a small thin link glyph. At the top corner of a code
block, a small outline of two overlapping rectangles. At the foot of
the article, a thin chevron pointing along the reading direction
beside the words "Next article". Nothing else — no glyph beside the
date, none beside the reading time, none marking the tags.
