---
component: checkbox-radio-switch
requires: [foundations/iconography.md]
references: [specs/form-validation.md]
---

# Component: Checkbox, Radio &amp; Switch

## Purpose

Three controls for a boolean or exclusive-choice answer, bundled
together because they are one semantic idea wearing different
clothes: a Checkbox is an independent on/off value, a Radio is one
Checkbox-like choice among mutually exclusive siblings, and a Switch
is a Checkbox with a different visual metaphor (a physical toggle
rather than a tick mark) for a setting that takes effect immediately
rather than waiting on a form submission.

The distinction that matters for which one to reach for:

- **Checkbox** — "is this true?" (agree to terms, include archived
  items). Independent of any other control.
- **Radio** — "which one of these?" Always appears in a group of two
  or more; a single radio with no siblings is a modelling mistake —
  use a Checkbox or a Switch instead.
- **Switch** — "is this on, right now?" A setting that applies
  immediately on change (dark mode, a notification channel), as
  opposed to a Checkbox's value, which is typically read only when a
  surrounding form is submitted. Where a boolean sits inside a form
  that has its own Save action, prefer the Checkbox — a Switch implies
  the change already happened.

## Anatomy

1. **Control** (required) — the visual box (Checkbox), circle
   (Radio), or pill-shaped track with a thumb (Switch).
2. **Label** (required) — the text beside the control, describing
   what checking it means. The label is part of the hit target for
   all three (see Accessibility rules) — never a control with no
   adjacent, clickable text.
3. **Group legend** (Radio only, required when 2+ radios form a
   group) — a heading naming what the group is choosing between
   ("Notification frequency"), announced before the individual
   options.
4. **Check glyph** (Checkbox only, checked/indeterminate states) — a
   checkmark or a short dash, drawn from the icon set, shown inside
   the control once it holds a value.

## Variants

- **Checkbox** — square control, `radius.sm` corners.
- **Radio** — circular control, `radius.pill`.
- **Switch** — a track roughly two controls wide with `radius.pill`
  ends, holding a circular thumb that slides between its two edges.
  Functionally a Checkbox: same `input`, same value semantics,
  different presentation.

Each of the three above additionally supports:

- **Standalone** — a single control with its own label, for an
  independent boolean (Checkbox, Switch) — never Radio, which always
  needs siblings.
- **Group** — 2+ Radios sharing a legend and exclusivity, or 2+
  Checkboxes sharing a legend without exclusivity ("select all that
  apply").

## States

- **Unchecked** — default, empty control.
- **Checked** — Checkbox and Switch show their filled/on
  presentation with the check glyph or slid thumb; Radio shows a
  filled inner dot.
- **Indeterminate** (Checkbox only) — a short dash glyph instead of a
  checkmark, for a "select all" Checkbox whose children are partially
  selected. This is a DOM property, not an attribute — see
  Accessibility rules; it cannot be produced by markup alone.
- **Hover** — control's border darkens one step, matching
  `specs/text-input.md`'s hover treatment.
- **Focus** — a visible focus ring around the control, in
  `brand.primary`, present regardless of checked state.
- **Disabled** — control and label render in `text.secondary` at
  reduced opacity, removed from the tab order, `not-allowed` cursor
  over the whole label.
- **Invalid** — used rarely (a single required agreement Checkbox is
  the common case: "You must agree before continuing"), defined once
  in `specs/form-validation.md` rather than restated per control.

## Accessibility rules

- **Element choice is not cosmetic**, the same rule `specs/button.md`
  states for its own element: a Checkbox is `<input type="checkbox">`,
  a Radio is `<input type="radio">`, and a Switch is either a native
  checkbox styled as a track-and-thumb or, where the platform offers
  one, `role="switch"` with `aria-checked` — never a `<div>` toggled
  by a click handler with no underlying form control.
- **The label is part of the hit target.** Wrap the control in its
  `<label>`, or associate them via `for`/`id` and make the label text
  itself clickable — never a control alone with adjacent, unassociated
  text, which halves the usable target and breaks the accessible
  name.
- **A Radio group needs a `<fieldset>`/`<legend>`** (or
  `role="radiogroup"` with `aria-labelledby`, if the platform has no
  native fieldset), so the group's purpose is announced once rather
  than left for the reader to infer from context. Only the checked
  radio (or the first, if none is checked) sits in the tab order;
  arrow keys move the checked state between siblings — this is
  native `<input type="radio">` behavior for elements sharing a
  `name`, not something to reimplement.
- **Indeterminate is set via the DOM**, not an HTML attribute: there
  is no `indeterminate=""` markup — the generated code must set the
  element's `.indeterminate` boolean property directly. A checkbox
  left as plain `checked=false` with only a visual dash is announced
  as unchecked, which is wrong for a partially-selected group.
- **A Switch is still a checkbox to assistive tech** unless
  `role="switch"` is used deliberately; either way, its accessible
  name states the setting it controls ("Email notifications"), not
  its current state — the state is exposed separately via `checked`
  / `aria-checked`, and doubling it into the label ("Email
  notifications: on") produces a redundant announcement once the
  state changes.
- Hit target: the full label-plus-control region is at least 2.75rem
  tall on touch platforms, matching every other control's minimum in
  this template.

## Semantic skeleton

Structure, roles, states and focus order only — no classes, no
styles, no framework.

```html
<fieldset>
  <legend>Notification frequency</legend>

  <!-- Same `name` groups these natively; arrow keys move the
       checked state between them without extra script. -->
  <label>
    <input type="radio" name="frequency" value="daily" checked>
    Daily
  </label>
  <label>
    <input type="radio" name="frequency" value="weekly">
    Weekly
  </label>
</fieldset>

<label>
  <!-- .indeterminate is set via the DOM property, never markup. -->
  <input type="checkbox" id="select-all">
  Select all
</label>

<label>
  <input type="checkbox" role="switch" aria-checked="true">
  Email notifications
</label>
```

Not visible in the markup: the indeterminate state is applied by
script after render, not by an attribute; a disabled control is
`disabled`, not merely styled; focus moves through the group with
Tab landing once, then Arrow keys inside it.

## Composition rules

- **Glyphs**: the checkmark and indeterminate-dash are drawn from
  `foundations/iconography.md`, sized to fit inside the control
  rather than at a fixed icon step.
- **May contain**: a label (required), a group legend (Radio groups).
- **Must not contain**: another interactive control inside the label,
  block content, or a Checkbox styled to look like a Switch without
  also behaving like one (see Accessibility rules on `role="switch"`).
- **Referenced by**: none yet — add a consumer here as it merges.
- Lives inside a form, a Card body, a Dropdown Menu item (as
  `menuitemcheckbox`/`menuitemradio`, per `specs/dropdown-menu.md` —
  that variant is defined there, not here), or a table cell for
  row selection.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | control background, unchecked |
| `color.surface.border` | control border, unchecked |
| `color.brand.primary` | control fill when checked, focus ring |
| `color.text.on-accent` | check glyph on the checked fill |
| `color.text.primary` | label text |
| `color.text.secondary` | disabled control and label |
| `radius.sm` | Checkbox corners |
| `radius.pill` | Radio and Switch shape |
| `spacing.2` | gap between control and label |
| `font.size.sm` | label |
| `spacing.component.icon-sm` | check / indeterminate glyph |

## Reference visual description

A small white square with a thin gray border, sitting just before
the words "Send me product updates" in the body type. Checked, it
fills solid blue with a white checkmark; a "select all" version above
a partly-checked list instead shows a short white dash on the same
blue fill. Beside it, two circles under the heading "Plan" — one
filled with a smaller blue dot inside a blue-ringed circle, its
sibling an empty ring — reading as a single choice rather than two
independent boxes. Further down, a pill-shaped track next to "Dark
mode": grey with the thumb resting left when off, and blue with the
thumb slid right when on.
