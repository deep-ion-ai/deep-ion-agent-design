---
component: specialized-inputs
requires: [foundations/iconography.md]
references: [specs/button.md, specs/input-group.md, specs/form-validation.md]
---

# Component: Specialized Inputs

## Purpose

Three native input types whose value isn't text: a Range Slider picks
a number by position, a Color Picker picks a colour, a File Input
picks one or more files from the device. Bundled in one spec because
each is a styling contract over browser-default behavior this
template does not reimplement — the anatomy each needs is a
container and a value readout, not a novel interaction.

Reach for one of these instead of `specs/text-input.md` only when the
value genuinely isn't typed text: a number chosen by dragging within
bounds, a colour, a file. A numeric field the reader types into
directly is still a Text Input with `type="number"`, not a Range
Slider.

## Anatomy

### Range Slider

1. **Track** (required) — a horizontal line spanning the control's
   width, representing the value's full range.
2. **Fill** (required) — the portion of the track from the minimum to
   the current value, in `brand.primary`, so the current position
   reads at a glance without reading the handle's exact spot.
3. **Handle** (required) — a circular, draggable control at the
   current value's position on the track.
4. **Value readout** (optional but recommended) — the current numeric
   value shown near the handle or beside the label; a slider with no
   readout forces the reader to infer the value from position alone,
   which is imprecise past a handful of steps.

### Color Picker

1. **Swatch** (required) — a small square or circle filled with the
   current colour, acting as the trigger for the platform's native
   colour picker.
2. **Value text** (optional) — the current colour's hex value shown
   beside the swatch, for a reader who needs the exact value rather
   than just the visual match.

### File Input

1. **Trigger** (required) — a `specs/button.md`-styled control
   reading "Choose file" (or "Choose files", multiple variant),
   invoking the platform's native file picker.
2. **Selection readout** (required) — the chosen file's name, or a
   count ("3 files selected") in the multiple variant, beside the
   trigger. Reads "No file chosen" when empty.

## Variants

- **Range**: single-value (one handle) or a min/max pair (two
  handles on one track, for a range rather than a point) — the
  reference shows only the single-value form; the paired form is
  noted here as a common real-world need but is out of scope for
  this template's first pass and should get its own spec addendum
  before it is built.
- **Color**: single swatch. No palette/swatch-picker variant is
  specified here — that would be a custom component built from
  `specs/dropdown-menu.md`'s panel shape, not a variant of the native
  colour input.
- **File**: single file, or multiple (accepting more than one file in
  one selection, shown as a count once chosen rather than listing
  every name inline — a chosen-files list belongs in
  `specs/list-group.md`, composed beside this component, not inside
  it).

## States

- **Default** — as described per type in Anatomy.
- **Focus** — a visible ring in `brand.primary` around the handle
  (Range), the swatch (Color), or the trigger button (File),
  matching every other field's focus treatment.
- **Dragging** (Range only) — the handle enlarges slightly and the
  value readout updates continuously as the reader drags, not only on
  release, so the reader can stop precisely on the value they want.
- **Disabled** — Range: track, fill and handle in `text.secondary`
  tones, drag disabled. Color: swatch shown at reduced opacity, click
  disabled. File: trigger follows `specs/button.md`'s disabled state.
  All three removed from the tab order.
- **Empty** (File only) — readout shows "No file chosen" in
  `text.secondary`.
- **Selected** (File only) — readout shows the filename(s); a
  trailing remove control (a small `specs/button.md` icon button)
  clears the selection back to Empty.
- **Invalid** — defined once in `specs/form-validation.md`; most
  relevant to File (wrong type, size over limit) and Range (value
  outside an application-level bound narrower than the control's own
  min/max).

## Accessibility rules

- **Range**: `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
  are kept in sync with the control's actual state on every change —
  a native `<input type="range">` maintains these automatically; a
  custom-drawn slider must update all three on every drag frame, not
  only on release. The control needs an accessible name (its
  `<label>`) describing what it sets, and where the raw number alone
  is ambiguous (a percentage, a currency amount), `aria-valuetext`
  supplies the human-readable form ("$42 per month") the announced
  number alone would not convey.
- **Color**: native colour input accessibility is inconsistent across
  browsers and platforms, and this spec does not promise a
  work-around — provide the hex `value text` as a genuine, readable,
  selectable text alternative beside the swatch specifically because
  the swatch's own accessible presentation cannot be relied on.
- **File**: the styled trigger **must remain the real, native
  `<input type="file">`'s activation surface** — visually hide the
  native input and trigger it from the styled button's `click`
  (e.g. a `<label>` wrapping a visually-hidden native input, so
  clicking the label activates it with no script required), never
  replace the native input with a fake button plus custom file-picker
  logic. The native element is what invokes the OS-level picker with
  full keyboard and assistive-tech support; nothing else can
  reproduce that. The selection readout is associated with the input
  via `aria-describedby` so a screen reader announces what's
  currently chosen alongside the label.
- Every control here keeps its native element as the thing that
  receives focus and fires `change` — the styling wraps it, never
  substitutes for it.

## Composition rules

- **Glyphs**: File Input's trigger may carry a leading upload/attach
  icon per `specs/button.md`'s icon rules, drawn from
  `foundations/iconography.md`.
- **May contain**: Range — a label and a value readout. Color — a
  label and a hex value readout. File — a label, a
  `specs/button.md` trigger, and a selection readout.
- **Must not contain**: a list of individually-removable chosen files
  inline (compose `specs/list-group.md` beside the component for
  that instead); a colour palette panel (out of scope, see Variants).
- File's trigger button composes with `specs/input-group.md` when the
  reference's "label addon" presentation is wanted (the button as a
  leading or trailing addon on a field showing the filename) — in
  that composition, `specs/input-group.md`'s Button-addon variant
  governs the seam, and this spec governs the trigger's own
  behavior.
- **Referenced by**: none yet — add a consumer here as it merges.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.border` | Range track, Color swatch border |
| `color.brand.primary` | Range fill and handle, focus rings |
| `color.text.primary` | value readouts |
| `color.text.secondary` | disabled state, "No file chosen" |
| `radius.pill` | Range handle, Color swatch (circular option) |
| `radius.base` | Color swatch (square option), File trigger (inherits from the Button spec) |
| `spacing.2` | gap between File trigger and its readout |
| `font.size.sm` | value readouts |
| `spacing.component.icon-sm` | File trigger's optional leading icon |

## Reference visual description

A thin gray horizontal line under the label "Volume", most of its
left portion painted solid blue up to a round blue handle sitting
roughly two-thirds along; the number "67" sits just above the handle.
Beside "Accent colour", a small square swatch filled a saturated
teal, its hex value "#14b8a6" printed in monospace-adjacent type to
its right. Under "Attachment", an outlined gray button reading
"Choose file" followed by "resume.pdf" in body text where empty
selections instead read "No file chosen" in a lighter gray.
