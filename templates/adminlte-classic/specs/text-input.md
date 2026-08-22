---
component: text-input
requires: [foundations/iconography.md]
references: [specs/form-validation.md]
---

# Component: Text Input

## Purpose

A single value typed by hand: an email, a password, a name, a search
term, a paragraph. This is the template's default answer to "collect
a short piece of text" — the base every other text-shaped field
composes with.

The sibling it is most often confused with: `specs/select.md`. A
Text Input is for a value the person supplies; a Select is for a
value they pick from a known set. Where a field looks like free text
but its answers are actually enumerable (a country, a status), use a
Select — a text field invites typos a select cannot have.

## Anatomy

1. **Label** (required) — a short phrase naming what the field
   collects, in `font.size.sm` / `font.weight.medium`, sitting above
   the field.
2. **Field** (required) — the editable box: `surface.canvas`
   background, 1px `surface.border` border, `radius.base` corners.
3. **Helper text** (optional) — a short line below the field, in
   `font.size.xs` / `text.secondary`, explaining a format or
   constraint that isn't obvious from the label alone ("At least 8
   characters"). Replaced by an error message when the field is
   invalid — see `specs/form-validation.md`.
4. **Required indicator** (optional) — a small mark appended to the
   label when the field must be filled before submission. See
   Accessibility rules for why this cannot be colour alone.
5. **Trailing control** (optional, password variant only) — a
   show/hide toggle that reveals the typed value in plain text. Not
   present in the AdminLTE reference; added here because a password
   field with no way to check what was typed is a usability defect
   this template will not reproduce. See Composition rules for the
   glyph.

## Variants

- **Type**: `text`, `email`, `password`, `number`, `search` —
  changes the keyboard a touch device offers and, for `password`,
  masks the value. Each renders identically otherwise.
- **Textarea** — the multi-line variant: the same label, border,
  and helper-text anatomy, with a taller, vertically resizable
  field. Line height `font.lineHeight.base`. Resizing is vertical
  only; a field that also resizes horizontally breaks the layout it
  sits in.
- **Floating label** — the label starts inside the field, at the
  same size and position as the value would be, and moves above the
  field (shrinking to `font.size.xs`) once the field is focused or
  holds a value. Functionally identical to the standard variant;
  choose one per form and do not mix the two within it, since an
  inconsistent label position is read as a layout defect rather than
  a style choice.
- **Plaintext** — no border, no background, no padding change on
  focus: the value renders like static text but remains a real,
  focusable, form-associated field. Used when a field is
  display-only within an otherwise editable form (a computed total
  beside editable line items), so it doesn't visually compete with
  the fields the reader can actually change.

## States

- **Default** — as described in Anatomy.
- **Hover** — border darkens one step, from `surface.border` toward
  `text.secondary`. Pointer cursor over the field, text cursor over
  the value.
- **Focus** — border colour becomes `brand.primary`, with a visible
  focus ring outside it (see Accessibility rules). The label does
  not change colour or weight on focus; the border and ring already
  carry that signal, and a third simultaneous change is noise.
- **Filled** — no distinct visual treatment beyond holding a value;
  called out because the floating-label variant's shrink condition is
  "focused OR filled", not "focused" alone — a floating label that
  collapses back over a filled-but-unfocused value hides what the
  reader typed.
- **Disabled** — `neutral.light` background, `text.secondary` value
  and label, `not-allowed` cursor, removed from the tab order. Used
  when a field cannot be edited for a reason outside this form (a
  plan tier gate, a field owned by another system) — not for a field
  that is merely waiting on another field's value; prefer leaving
  such a field enabled with a helper-text explanation.
- **Readonly** — visually identical to Default (border, background,
  text colour all unchanged), but the value cannot be edited. Kept
  deliberately undistinguished from Default because a readonly field
  is still meant to be read normally, unlike a disabled one, which
  is meant to look unavailable; see Accessibility rules for why the
  two must never be conflated in markup even though they can look
  alike.
- **Invalid / Valid** — defined once, for every field-shaped
  component, in `specs/form-validation.md`. This spec does not
  restate that border colour, message placement, or icon.
- **Loading** (search/async variants) — a small spinner replaces the
  trailing edge's empty space while a result set is being fetched;
  the field remains editable and further keystrokes are not blocked.

## Accessibility rules

- The label is programmatically associated with the field — a
  `<label for>` pointing at the field's `id`, or the field nested
  inside the `<label>` element. A placeholder is never a substitute
  for a label: it disappears on input, is not consistently announced,
  and fails as the field's accessible name.
- Helper text is associated via `aria-describedby` pointing at its
  id, so a screen reader announces it alongside the field's label
  rather than as unrelated page content.
- **Disabled vs. readonly are not interchangeable markup.** `disabled`
  removes the field from the tab order and from form submission
  entirely; `readonly` keeps it focusable, announced, and submitted,
  just not editable. Using `disabled` where the value still needs to
  reach the server (a prefilled but locked field in a multi-step
  form) silently drops that value on submit.
- **The required indicator is never colour alone.** A red asterisk
  with no text equivalent is invisible to a screen reader by default;
  pair the visual mark with `aria-required="true"` (or the `required`
  attribute) on the field, and prefer a word ("required") in the
  label or helper text over a bare glyph for a reader who cannot see
  colour.
- The password show/hide toggle is a real `<button type="button">`
  with an `aria-label` that states the action ("Show password" /
  "Reveal password"), toggling both the field's `type` and its own
  label and accessible name together, so the two never fall out of
  sync.
- Autocomplete: set the appropriate `autocomplete` token (`email`,
  `new-password`, `name`, etc.) on every field it applies to. This is
  a content requirement of the generated form, not a visual one, but
  it belongs here because omitting it is the most common accessible
  form defect and has no visual symptom to catch it in review.

## Composition rules

- **Glyphs**: the show/hide toggle's eye glyph is drawn from the icon
  set defined in `foundations/iconography.md`, at `icon-sm`, and
  swaps between its "shown" and "hidden" states as the toggle
  changes.
- **May contain**: a label, a field, helper or error text, a required
  indicator, and — password only — the show/hide toggle.
- **Must not contain**: another field, a button performing an
  unrelated action, or block content. A leading/trailing icon that is
  purely decorative (a search glyph, a currency symbol) is not part
  of this component — that composition is `specs/input-group.md`'s.
- **Referenced by**: `specs/input-group.md` (wraps a Text Input with
  addons), `patterns/auth.md` (email/username and password fields),
  `patterns/settings.md` (each section Card's text fields).
- Lives inside a form, a filter toolbar, or a Card body. Never inside
  a Dropdown Menu panel or a Badge.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | field background (default, readonly) |
| `color.surface.border` | field border (default) |
| `color.text.secondary` | field border on hover, disabled text, helper text, placeholder |
| `color.brand.primary` | field border and focus ring on focus |
| `color.neutral.light` | disabled field background |
| `color.text.primary` | field value and label |
| `radius.base` | field corners |
| `spacing.2` | field vertical padding |
| `spacing.3` | field horizontal padding |
| `spacing.1` | gap between label and field, and between field and helper text |
| `font.size.sm` | label, field value |
| `font.size.xs` | helper text, floating label once shrunk |
| `font.weight.medium` | label |
| `font.lineHeight.base` | textarea line height |
| `spacing.component.icon-sm` | show/hide toggle glyph |

## Reference visual description

A short gray label ("Email address") above a white rectangle with a
thin gray border and gently rounded corners. Inside, placeholder text
in a lighter gray reads "you@example.com" until something is typed.
Clicking in turns the border a solid blue and draws a faint blue ring
just outside it, matching the same treatment a focused button
receives. Below, in smaller, lighter type: "We'll never share your
email." A password field beside it looks identical except for the
row of dots standing in for the typed characters, and a small
eye-shaped glyph resting inside the field's right edge.
