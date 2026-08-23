---
component: input-group
requires: [foundations/iconography.md]
references: [specs/text-input.md, specs/button.md, specs/form-validation.md]
---

# Component: Input Group

## Purpose

Visually and semantically fuses a field with adjacent context it
cannot stand without: a unit, a currency symbol, an action. Without
it, a `$` symbol beside an amount field, or a "Copy" button beside a
generated link, reads as two unrelated controls that happen to sit
near each other; an Input Group draws them as one continuous object
so the relationship is obvious without a caption.

Reach for this whenever a field's value is meaningless without a
label that has to sit *inside* the control's visual boundary rather
than above it as `specs/text-input.md`'s own label. A field with a
`for`/`id`-associated label above it does not need this component —
Input Group is specifically for context that belongs on the same
line as the value.

## Anatomy

1. **Field** (required, 1..n) — one or more `specs/text-input.md`
   fields (or a textarea) forming the group's editable core. Most
   groups hold exactly one; a "from / to" pair is the common
   multi-field case.
2. **Leading addon** (optional) — content before the field: a plain
   symbol (`@`, `$`), a short label, an icon, or a Button.
3. **Trailing addon** (optional) — the same set of addon kinds, after
   the field.
4. **Seam** — the border shared between the field and each addon,
   drawn once rather than as two independent 1px borders meeting.
   The group's *outer* corners take `radius.base`; every internal
   corner where a field meets an addon is square, so the cluster
   reads as one object, following the same seam rule
   `specs/button.md` defines for button groups.

## Variants

- **Symbol addon** — a short, non-interactive piece of text or a
  single character (`@`, `$`, `.00`) in a `neutral.light`-filled
  addon, purely a static label for the field beside it.
- **Icon addon** — a glyph in place of a text symbol, for a field
  whose context is better shown than written (a search field's
  leading magnifying glass).
- **Button addon** — a `specs/button.md` control sharing the group's
  seam, for an action tied directly to the field's value ("Copy",
  "Generate", a file picker's trigger). The button keeps its own
  focus, hover and press states; only its outer corner is squared to
  match the seam.
- **Multi-field** — two or more fields inside one group, each keeping
  its own focus and value, separated from each other and from any
  addon by the same seam rule (a "$" addon, then an amount field,
  then a ".00" addon, is three parts in one group).
- **Textarea group** — the field anatomy is a
  `specs/text-input.md` textarea instead of a single-line field; the
  addon sits at the field's top edge rather than vertically centred,
  since a multi-line field has no single centre line to align to.

## States

Inherits every state from its contained field(s)
(`specs/text-input.md`'s Default / Hover / Focus / Disabled / Readonly,
`specs/form-validation.md`'s Invalid / Valid) with one addition at the
group level:

- **Focus-within** — when the contained field is focused, the *whole
  group's* outer border and ring highlight together, not just the
  field's own edge, so the addon reads as part of the focused control
  rather than as inert decoration beside it.
- A symbol or icon addon has no states of its own — it is not
  interactive and does not respond to hover or focus. A Button addon
  keeps its full independent state set from `specs/button.md`.

## Accessibility rules

- **A symbol or icon addon is not an editable field** and must not be
  a form control of any kind; it is presentational content, and where
  it repeats what the field's own label already says, it is
  `aria-hidden="true"` to avoid announcing the same information
  twice.
- **Where an addon adds information the label doesn't carry** (a unit
  the reader needs to know, e.g. "kg" after a weight field), associate
  it with the field via `aria-describedby` rather than leaving it
  silent — a sighted reader gets it visually, a screen reader user
  needs the same fact stated.
- **A Button addon keeps its own accessible name**, independent of
  the field's label — "Copy link", not "Link" (the field's own
  label) and not unlabelled. See `specs/button.md`'s icon-only rule
  when the addon button carries a glyph with no visible text.
- **The seam is visual only.** Grouping several controls to look like
  one object must not merge their accessible names or their tab
  stops — each field and each interactive addon remains an
  independent, separately focusable, separately labelled element in
  the tab order, in reading order from the leading edge to the
  trailing edge (or top to bottom in the textarea variant).

## Composition rules

- **Glyphs**: an icon addon is drawn from
  `foundations/iconography.md`, sized `icon-sm` to match the field's
  own text size.
- **May contain**: one or more `specs/text-input.md` fields, symbol
  addons, icon addons, and `specs/button.md` buttons, in any
  combination of leading/trailing.
- **Must not contain**: a `specs/select.md` trigger as an addon (a
  select's own trigger already looks field-shaped and combining two
  field-shaped controls in one seam reads as a single confused
  field — where a unit needs to be chosen rather than fixed, place
  the Select beside the group, not inside it), a Dropdown Menu, or a
  nested Input Group.
- **Referenced by**: `specs/specialized-inputs.md` (File Input's
  trigger, in the button-addon presentation).
- Lives inside a form, alongside plain `specs/text-input.md` fields
  it is not distinguished from at the label/helper-text level — only
  the addon marks it as a group.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | field background |
| `color.surface.border` | group outer border, seams |
| `color.neutral.light` | symbol/icon addon background |
| `color.text.secondary` | symbol/icon addon content |
| `color.brand.primary` | focus-within border and ring |
| `radius.base` | group's outer corners only |
| `spacing.2` | addon and field vertical padding |
| `spacing.3` | addon and field horizontal padding |
| `font.size.sm` | field value, addon text |
| `spacing.component.icon-sm` | icon addon glyph |

## Reference visual description

A single white bar with one gray border running around its whole
outer edge and gently rounded ends. Its left third is a pale gray
panel holding a plain "$", butted directly against a white field
where the amount is typed, which is in turn butted against another
pale panel reading ".00" — no gaps, no inner rounding, the three
parts readable as one continuous control. In another row, the same
shape holds a URL field on the left and a solid blue "Copy" button
squared into its right edge, the button's own rounded corner visible
only on its outer side.
