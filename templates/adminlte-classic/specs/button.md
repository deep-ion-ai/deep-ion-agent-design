---
component: button
requires: [foundations/iconography.md]
references: [specs/dropdown-menu.md, specs/modal.md, specs/badge.md]
---

# Component: Button

## Purpose

The element a person presses to make something happen. Buttons carry
the actions in a form's footer, a card's header, a table's toolbar,
a modal's confirmation row — everywhere the interface offers a
choice that has an effect.

The distinction that matters most in practice:

- A **button** performs an action in place: submits, saves, deletes,
  opens a panel, toggles a mode.
- A **link** navigates to a different address. It renders as `<a>`,
  can be opened in a new tab, and is announced as a link.

The `link` visual variant below exists so that a *button* can look
quiet. It does not make an `<a>` into a button or the reverse. Get
this wrong and middle-click, "open in new tab", and the screen
reader's announcement all break — see Accessibility rules.

## Anatomy

1. **Container** (required) — the pressable box. Padding varies by
   size (see Variants), `radius.base` corners, and a 1px border
   which is either the fill colour (solid) or the accent itself
   (outline), so that solid and outline buttons of the same size
   occupy exactly the same space and do not shift the layout when
   one replaces the other.
2. **Label** (required in all but the icon-only variant) — a verb
   phrase naming the effect ("Save changes", "Delete order"), in
   `font.weight.medium`, on one line. Buttons do not wrap; a label
   that needs two lines is a label that needs fewer words.
3. **Leading icon** (optional) — a glyph before the label,
   reinforcing the action. Decorative when a label is present.
4. **Trailing icon** (optional) — a glyph after the label, used for
   direction or disclosure (a caret on a split trigger, an arrow on
   a "next" action). A button has at most one icon on each side, and
   usually only one in total.
5. **Busy indicator** — replaces the leading icon during the loading
   state (see States). The container does not resize when it
   appears, so a row of buttons does not reflow mid-submit.

## Variants

### Emphasis

- **Solid** — filled with the accent colour, label in the matching
  on-accent colour. The page's primary action.
- **Outline** — transparent background, 1px border and label in the
  accent colour. Secondary actions, and the default choice when
  several buttons sit together: a row of solid buttons has no
  hierarchy.
- **Link** — no border, no fill, label in the accent colour, padding
  retained so the hit target stays intact. The lowest-emphasis
  option, for tertiary actions ("Cancel" beside a solid "Save").

### Colour

`brand.primary`, `brand.secondary`, `status.success`,
`status.danger`, `status.warning`, `status.info`, plus `light`
(`neutral.light` fill) and `dark` (`neutral.dark` fill).

The colour is a statement about the action, not decoration.
`danger` marks a destructive action and nothing else; `success` is
for a button that completes something, not for every affirmative.

**One solid primary action per view.** Two competing solid buttons
force the reader to decide which one the page wants, which is the
job the design was supposed to do for them.

### Size

| Size | Padding | Label |
|---|---|---|
| Large | `spacing.3` vertical, `spacing.5` horizontal | `font.size.base` |
| Default | `spacing.2` vertical, `spacing.4` horizontal | `font.size.sm` |
| Small | `spacing.1` vertical, `spacing.3` horizontal | `font.size.xs` |

Sizes do not mix within one group or one toolbar. Regardless of
size, the pressable area is at least 2.75rem in both dimensions on
touch platforms — pad the hit area beyond the visible box rather
than inflating the box.

### Icon-only

A square button carrying a glyph and no label, for dense contexts
where a labelled button does not fit — a card header toolbar, a
table row's action column. Requires an `aria-label`; see
Accessibility rules. Do not use it merely to save space in a
context that has room for words.

### Button group

Two or more buttons clustered into one control with no gap between
them, their touching corners squared so the cluster reads as a
single object, and the shared edge drawn once — never two adjacent
1px borders producing a 2px seam.

Three kinds, which behave differently and must not be conflated:

- **Action group** — several independent actions placed together
  for compactness. Each button is a plain button; grouping is
  purely visual.
- **Toggle group (segmented control)** — a set of mutually exclusive
  or multi-select options, where the pressed segment is filled and
  the others are outlined. This is a *form control*, not a row of
  buttons: see Accessibility rules for the markup it requires.
- **Split button** — a primary action plus an adjacent caret-only
  trigger that opens a menu. The menu behavior, including all of its
  keyboard handling, is defined in `specs/dropdown-menu.md`; this
  spec covers only the seam and the two halves' independent
  accessible names.

## States

- **Default** — as described per variant.
- **Hover** — the fill (solid) or the background wash (outline,
  link) deepens by one step. Pointer cursor. No size change: a
  button that grows on hover shifts everything beside it.
- **Focus** — a visible focus ring, offset from the container so it
  is not absorbed by the border. Present for every variant and every
  colour, including `light` and `warning`; see Accessibility rules.
  Focus styling is never removed without an equivalent replacement.
- **Focus-visible vs. focus** — the ring is expected on keyboard
  focus. Suppressing it on pointer press is acceptable; suppressing
  it on keyboard focus is not.
- **Active (pressed)** — the fill deepens further for the duration
  of the press, giving immediate feedback before the action's own
  result appears.
- **Disabled** — reduced opacity, no hover or active response,
  `not-allowed` cursor. Disabling must be a considered choice: a
  disabled button gives no reason for being disabled, so prefer an
  enabled button that explains what is missing when pressed,
  particularly for form submissions.
- **Loading** — the busy indicator replaces the leading icon, the
  label stays visible (a button whose text vanishes mid-action tells
  the reader nothing about what is happening), the container keeps
  its width, and further presses are ignored. This state is not in
  the reference, and is specified here because any button that
  triggers asynchronous work needs it — without one, the reader
  presses twice.
- **Selected / pressed (toggle group only)** — the chosen segment
  renders solid while its siblings render outline. Selection is
  conveyed by more than fill: the pressed segment also carries the
  ARIA state described below, and where two adjacent segments differ
  only by fill, add a check glyph.

## Accessibility rules

- **Element choice is not cosmetic.** An action uses
  `<button type="button">` (or `type="submit"` in a form); a
  navigation uses `<a href>`. A `<div>` or `<span>` with a click
  handler is never acceptable: it is absent from the tab order,
  announced as nothing, and does not respond to Enter or Space. If a
  navigation must look like a solid button, style the `<a>` — do not
  swap the element.
- **Disabled means the `disabled` attribute** (or `aria-disabled`
  with the activation handler genuinely removed), not merely a
  faded appearance. A visually-faded button that still fires when
  clicked or focused is worse than no disabled state at all. Note
  the trade-off: a natively `disabled` button is removed from the
  tab order and cannot be reached to discover why it is disabled —
  where the reason matters, prefer `aria-disabled="true"` on a
  focusable button plus a message.
- **Icon-only buttons require an `aria-label`** naming the action
  and its object ("Delete order #1029", not "Delete"), because a
  screen reader has none of the row's visual context. The glyph
  itself is `aria-hidden="true"`.
- **A button with a label does not repeat it in an `aria-label`.**
  Doing so overrides the visible text and breaks voice control,
  where the user says what they see.
- **The focus ring must be visible against every colour, including
  the light ones.** A ring in `brand.primary` disappears on a
  primary solid button and is weak on `light` and `warning`. Draw
  the ring in a colour that contrasts with the button's own fill,
  with an offset gap so it reads against the page behind it. The
  ring needs 3:1 against both the button and the surrounding
  surface.
- **Contrast, per colour**, using the same pairing as the rest of
  the template: `color.text.on-accent` over `brand.primary`,
  `brand.secondary`, `status.success`, `status.danger` and `dark`;
  `color.text.on-accent-dark` over `status.warning`, `status.info`
  and `light`. White on `warning` is 1.63:1 and on `info` 1.96:1 —
  both fail. For outline and link variants, the accent colour is
  used as *text* on `surface.canvas`, which is a different and
  stricter test — `status.warning` as text on white is 1.63:1. Those
  variants therefore draw their label and border from
  `color.text.accent.*`, the darkened text-safe counterparts, never
  from the raw `brand.*`/`status.*` fill values. The solid pairing
  does not transfer.
- **Toggle groups are form controls.** A single-select segmented
  control is a `radiogroup` (native radios visually restyled, or
  `role="radiogroup"` with `role="radio"` and `aria-checked`); a
  multi-select one uses toggle buttons with `aria-pressed`. A row of
  plain buttons where one merely looks different is not perceivable
  as a choice. The group needs an accessible name describing what is
  being chosen, and arrow keys move between segments in a
  `radiogroup`, with only the selected segment in the tab order.
- **Action groups are not toggle groups** — they take no
  `aria-pressed` and no group role beyond an optional
  `role="group"` with a label. Grouping several unrelated actions
  visually must not imply a choice between them.
- **Loading state must be announced**, not only shown: set
  `aria-busy="true"` on the button while it works, and keep the
  label so its accessible name does not change mid-action.
- **Destructive actions** name their object in the accessible name
  and, where the action cannot be undone, are confirmed by a Modal
  (`specs/modal.md`) rather than firing on the first press.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **May contain**: a text label, up to one leading and one trailing
  icon, a busy indicator, and — for a notification count — a Badge
  (`specs/badge.md`), whose count must be folded into the button's
  accessible name.
- **Must not contain**: another button, a link, a form field, or
  block content. A "button" holding multiple interactive elements is
  a toolbar or a card, not a button.
- **Referenced by**: `specs/dropdown-menu.md` (trigger and split
  trigger), `specs/card.md` (header toolbar, footer actions),
  `specs/data-table.md` (toolbar and row actions),
  `specs/alert.md` (action control), the modal/offcanvas footer
  actions in `specs/modal.md`, `specs/input-group.md` (button addon),
  and `specs/specialized-inputs.md` (File Input's trigger). Those
  specs choose which buttons appear and where; emphasis, size,
  states, and the rules above are defined here. Add each consumer as
  it merges.
- **References**: `specs/dropdown-menu.md` for everything about the
  split button's menu — this spec deliberately does not restate the
  menu's keyboard behavior.
- **Ordering within a group of actions**: the primary action sits
  last on the trailing edge in a dialog footer, with secondary and
  cancel actions before it. Whatever order a project picks, it
  applies to every action row on every page — an inconsistent order
  produces mispresses.
- Buttons sit inside cards, headers, toolbars, table cells, alerts,
  modals and forms. A button group is a single unit and is never
  split across a responsive wrap — if it does not fit, it stacks
  whole.

## Tokens used

| Token | Usage |
|---|---|
| `color.brand.primary` / `brand.secondary` | fill (solid) |
| `color.status.*` | fill (solid), by action meaning |
| `color.text.accent.*` | label and border of the outline and link variants |
| `color.neutral.light` / `neutral.dark` | fill of the `light` / `dark` colours |
| `color.text.on-accent` | label on primary, secondary, success, danger, dark |
| `color.text.on-accent-dark` | label on warning, info, light |
| `color.surface.canvas` | background of outline and link variants |
| `color.overlay.accent-shade` | hover and active darkening on solid fills |
| `radius.base` | container corners (outer corners of a group) |
| `spacing.1` / `spacing.2` / `spacing.3` | vertical padding by size |
| `spacing.3` / `spacing.4` / `spacing.5` | horizontal padding by size |
| `spacing.2` | gap between icon and label |
| `font.size.xs` / `font.size.sm` / `font.size.base` | label by size |
| `font.weight.medium` | label weight |

## Reference visual description

In a card footer, two buttons side by side: the trailing one a solid
blue rectangle with softly rounded corners and white medium-weight
text reading "Save changes"; before it, the same shape in outline —
white inside, a thin blue border, blue text — reading "Cancel".
Pressing tab draws a ring a small gap outside the blue button's
edge, clearly separated from the fill. Elsewhere, in a toolbar,
three buttons touch with no gap, their inner corners square and the
outer ones rounded, so the trio reads as one control; the middle one
is filled blue while its neighbours are outlined, marking the
current choice. Beside them, a single square button carrying only a
trash glyph, sized to match the row.
