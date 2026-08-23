---
component: form-validation
requires: [foundations/iconography.md]
---

# Component: Form Validation States

## Purpose

Defines, once, how any field-shaped component in this template shows
that its current value is invalid or valid — so `specs/text-input.md`,
`specs/select.md`, `specs/checkbox-radio-switch.md`,
`specs/input-group.md` and `specs/specialized-inputs.md` each defer
to this spec instead of five slightly different re-implementations of
a red border and an error message drifting apart from each other.

This is not a component a generating agent places on a page directly
— it is the shared contract every field-shaped component's Invalid
and Valid states point back to.

## Anatomy

1. **Field border/ring** (required) — the contained field's own
   border (and, where applicable, focus ring) recolours to
   `status.danger` (invalid) or `status.success` (valid), replacing
   its default `surface.border` / `brand.primary`.
2. **Status icon** (required) — a small glyph inside the field's
   trailing edge: a warning triangle (invalid) or a checkmark
   (valid), reinforcing the border colour with a shape a colour-blind
   reader can also distinguish.
3. **Message** (required, invalid; optional, valid) — a short line
   below the field, in the same position `specs/text-input.md`'s
   helper text occupies (this message replaces it, never sits beside
   it): `text.accent.danger` for an error ("Please choose a unique
   username"), `text.accent.success` for a confirmation ("Looks
   good!").
4. **Required indicator** (optional) — see
   `specs/text-input.md`'s Anatomy; defined there, not here, since it
   marks a field's requiredness independent of whether it has been
   validated yet.

## Variants

- **Field-level** — one field's border, icon and message, as
  described above. Applies identically whether the field is a Text
  Input, a Select trigger, an Input Group's outer edge, or a single
  Checkbox/Radio (which uses the message anatomy without a border
  recolour, since a checkbox has no border to speak of — see States).
- **Form-level summary** — a single `specs/alert.md` (`danger`
  variant) at the top of the form, listing what's wrong, for a form
  long enough that individual field messages might scroll out of view
  before the reader finds them all. Composes with, and never replaces,
  the field-level messages — a summary that isn't also marked at the
  field itself sends the reader hunting for which field a listed
  problem belongs to.

## States

- **Pristine** — the field's default state, before any validation has
  run against it. Identical to the contained component's own Default
  state; this spec adds nothing here.
- **Invalid** — border/ring `status.danger`, warning icon, error
  message present, `aria-invalid="true"` (see Accessibility rules).
- **Valid** — border/ring `status.success`, checkmark icon,
  confirmation message optional (many valid fields need no
  message at all — reserve it for a field where "this cleared" is
  itself useful, like a username-availability check, rather than
  showing it on every passing field and turning a whole form green).
- **Revalidating** — while an async check is in flight (a username
  availability lookup), the field keeps its previous state's visual
  treatment and adds a small inline spinner beside the trailing edge,
  rather than reverting to Pristine and flashing.

Timing — when a field moves out of Pristine — is a deliberate choice
this spec takes a position on, diverging from the AdminLTE
reference's submit-only approach:

- **On blur, then live** is the default: a field first validates when
  the reader leaves it, and after that first check, re-validates on
  every subsequent change — so an error clears the moment it's fixed
  rather than waiting for another submit attempt. Submit-only
  validation (nothing shown until the form is submitted, all fields'
  results appearing at once) is a supported variant for short forms
  where per-field interruption isn't worth it, but is not the
  default: on a form of more than two or three fields, discovering
  every problem only after submitting is the more common usability
  complaint about forms, and this template does not reproduce it
  without a reason.

## Accessibility rules

- **`aria-invalid="true"`** is set on the field itself whenever it is
  in the Invalid state (omitted, not `"false"`, when Pristine or
  Valid — a screen reader announces the field differently the moment
  the attribute is present at all on some assistive tech, so it
  should not be there before there's something to announce).
- **The message is associated via `aria-describedby`**, pointing at
  the message's id, added to whatever the field already has in
  `aria-describedby` (its helper text's id, if any) rather than
  replacing it — see Semantic skeleton.
- **Colour is never the only signal.** The status icon and the
  message text both carry the same information the border colour
  does, so a reader who cannot perceive the colour difference between
  `status.danger` and `status.success` still gets the same answer.
  This is the same rule already stated for `specs/alert.md` and for
  the contrast-driven token rework this template's colour tokens
  underwent — see `tokens/colors.json`'s `text.accent.*` group.
- **On a failed submit attempt, move focus to the first invalid
  field.** A reader using a keyboard or a screen reader who submits a
  long form and receives no focus movement has no efficient way to
  find what went wrong; landing on the first problem field, with its
  message already associated via `aria-describedby`, puts the answer
  under focus immediately.
- **A Checkbox/Radio's invalid state has no border to recolour** (see
  `specs/checkbox-radio-switch.md`'s Anatomy) — its message and
  `aria-invalid` follow the same rules as any other field, and the
  status icon sits beside the label instead of inside a field edge.
- **The form-level summary Alert is `role="alert"`** (or injected
  with `aria-live="assertive"` if already present when validation
  runs) so its appearance is itself announced, and each item in it
  is a link that moves focus to the corresponding field on
  activation.

## Semantic skeleton

Structure, roles, states and focus order only — no classes, no
styles, no framework.

```html
<label for="username">Username</label>
<input id="username"
       aria-invalid="true"
       aria-describedby="username-error">
<!-- Icon is decorative: the message text already carries the
     meaning; do not also give the icon its own accessible name. -->
<svg aria-hidden="true"><!-- warning triangle --></svg>
<p id="username-error">Please choose a unique username.</p>
```

Not visible in the markup: on submit, if this field is the first
invalid one, focus moves to it; `aria-invalid` is removed (not set to
`"false"`) once the field returns to Pristine or Valid; where the
field already has helper text, its id is added alongside
`username-error` in `aria-describedby` rather than replaced by it.

## Composition rules

- **Glyphs**: the warning and checkmark icons are drawn from
  `foundations/iconography.md`, at `icon-sm`, and are decorative
  (`aria-hidden="true"`) per that foundation's rule for an icon
  beside a visible message — the message is what carries the
  meaning, not the glyph.
- **May contain**: nothing on its own — this spec modifies the
  Invalid/Valid presentation of the field-shaped components listed
  under Purpose; it has no independent anatomy a page places
  directly.
- **Must not**: introduce a second, differently-worded error surface
  for the same problem — one message per invalid field, referenced by
  exactly one `aria-describedby` id.
- **Referenced by**: `specs/text-input.md`, `specs/select.md`,
  `specs/checkbox-radio-switch.md`, `specs/input-group.md`,
  `specs/specialized-inputs.md`, `patterns/auth.md` (its
  page-level authentication-failure banner), `patterns/settings.md`
  (each section Card's own save-failure summary), and
  `patterns/wizard.md` (per-step validation on advancing) — each
  defers its own Invalid/Valid state definition to this spec rather
  than restating it.
- Composes with `specs/alert.md` for the form-level summary variant.

## Tokens used

| Token | Usage |
|---|---|
| `color.status.danger` | invalid field border/ring |
| `color.status.success` | valid field border/ring |
| `color.text.accent.danger` | error message text |
| `color.text.accent.success` | confirmation message text |
| `font.size.xs` | message text, matching helper text |
| `spacing.1` | gap between field and message |
| `spacing.component.icon-sm` | status icon |

## Reference visual description

A field whose border has turned from its usual thin gray to a solid
red, with a small red warning triangle resting inside its right edge
and, just below, in the same small red type the border echoes:
"Please choose a username." Its neighbour, already filled in
correctly, shows the mirror image in green — a green border, a green
checkmark in the same corner, and beneath it, "Looks good!" in green.
Nothing else on the field changes: same size, same label position,
same padding as the untouched fields above and below them.
