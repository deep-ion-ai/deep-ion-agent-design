---
component: select
requires: [foundations/iconography.md]
references: [specs/form-validation.md, specs/dropdown-menu.md]
---

# Component: Select

## Purpose

Picks one or more values from a known, enumerable set — a country, a
status, an assignee. Use this instead of `specs/text-input.md`
whenever the set of valid answers is fixed: a text field invites a
typo a Select cannot produce, and a Select can be searched or scanned
in a way free text cannot.

Do not confuse it with `specs/dropdown-menu.md`: a Dropdown Menu
*invokes an action* and forgets its own state the moment the action
runs; a Select *stores a value* as part of a form. The two happen to
share a floating-panel shape, which is exactly why this spec exists
separately — to keep that shape's behavior consistent without
collapsing the two into one component with two incompatible meanings.

## Anatomy

1. **Label** (required) — same anatomy and token usage as
   `specs/text-input.md`'s label.
2. **Trigger** (required) — a field-shaped control showing the
   current selection (or a placeholder, "Select one…", when empty),
   with a caret glyph on its trailing edge indicating it opens.
   Same border, background, and sizing as a Text Input, so a form
   mixing both reads as one control family.
3. **Option list** (required, 1..n) — the set of choices, shown
   either as the browser's native picker (default) or, in the
   custom-listbox variant, a floating panel following
   `specs/dropdown-menu.md`'s panel anatomy.
4. **Selected-value chip(s)** (multi-select only) — once a choice is
   made, it renders as a small removable chip inside the trigger
   rather than plain text, so several selections remain individually
   visible and individually removable without reopening the list.
5. **Helper / error text** (optional) — identical to Text Input's;
   defined once in `specs/form-validation.md`.

## Variants

- **Native single-select** — the default. A real `<select>` element,
  styled only insofar as the platform allows (trigger chrome,
  caret), with the browser supplying the option list, its
  positioning, and its keyboard behavior. Preferred whenever nothing
  below requires leaving it.
- **Custom single-select** — a styled trigger plus a
  `specs/dropdown-menu.md`-shaped floating panel, used only when a
  requirement the native element cannot meet forces it: an option
  needs a leading icon or avatar, the list needs in-panel search, or
  the panel must render option groups with headings. Reaching for
  this variant by default, for styling alone, trades away the
  platform's built-in accessibility for a reimplementation this
  template then has to get right on every target stack — see
  Accessibility rules.
- **Multi-select** — either kind above, storing a set instead of one
  value. The reference's approach (a native `<select multiple>` shown
  as a fixed-height scrolling list box) is not used here: it hides
  most options below the fold with no visual signal that more exist,
  and offers no way to see what's already chosen without scrolling
  back to find it. This spec instead uses the trigger-plus-chips
  anatomy above for both native (`<select multiple>` progressively
  enhanced) and custom implementations, and says so explicitly as a
  deliberate divergence from the reference.
- **Searchable** — an in-panel text input (custom variant only)
  filtering the option list as the reader types, for a set too long
  to scan.

## States

- **Default** — as described in Anatomy, one placeholder or value
  showing.
- **Hover / Focus** — identical treatment to `specs/text-input.md`'s
  field: border and ring in `brand.primary` on focus.
- **Open** — the option list is visible; the trigger stays visually
  "pressed" the same way a Dropdown Menu trigger does while its panel
  is open.
- **Disabled** — matches Text Input's disabled state: `neutral.light`
  background, muted text, removed from the tab order.
- **Invalid / Valid** — defined once in `specs/form-validation.md`.
- **Loading** (searchable variant, remote options) — the panel opens
  at a stable size showing skeleton option rows with
  `aria-busy="true"`, per `specs/dropdown-menu.md`'s Loading state.
- **Empty** (searchable variant, no matches) — the panel shows a
  short "No matches" row in `text.secondary` in place of options,
  rather than closing or showing nothing.

## Accessibility rules

- **Prefer the native `<select>`.** It is keyboard-operable, exposed
  to assistive tech, and works with no additional markup on every
  platform — properties a custom listbox has to reconstruct by hand.
  Reach for the custom variant only for the specific gaps listed
  under Variants, and even then, keep the same trigger semantics
  (`aria-haspopup="listbox"`, not `"menu"` — see Semantic skeleton).
- The trigger's accessible name comes from the associated `<label>`,
  the same association rule as Text Input.
- **Custom variant**: the panel uses `role="listbox"`; each option is
  `role="option"` with `aria-selected` reflecting its state. This is
  a different role pair from `specs/dropdown-menu.md`'s
  `menu`/`menuitem` — a listbox stores a selection, a menu performs
  an action, and assistive technology announces the two differently.
  A Select's custom panel borrows the menu's floating, positioning,
  and open/close mechanics, never its roles.
- **Keyboard, custom variant**: Up/Down Arrow move the active option
  and wrap; Enter or Space selects the active option (in multi-select,
  toggles it without closing the panel); typing a character jumps to
  the next option starting with it; Escape closes without changing
  the selection; Home/End jump to the first/last option — all
  matching `specs/dropdown-menu.md`'s keyboard model, with selection
  semantics substituted for activation.
- **Multi-select chips**: each chip's remove control is a real
  `<button>` with an `aria-label` naming the value it removes ("Remove
  Germany"), not a bare "×" glyph with no label.
- The caret glyph is decorative (`aria-hidden="true"`) — the trigger's
  own `aria-expanded` state is what communicates open/closed to
  assistive tech, not the glyph's rotation.

## Semantic skeleton

Structure, roles, states and focus order only — no classes, no
styles, no framework. The custom variant only; the native
`<select>`/`<option>` pairing needs no skeleton of its own.

```html
<label for="assignee">Assignee</label>
<button type="button"
        id="assignee"
        aria-haspopup="listbox"
        aria-expanded="false">
  Select an assignee…
  <svg aria-hidden="true"><!-- caret --></svg>
</button>

<!-- Rendered only while open. Not hidden — absent. -->
<div role="listbox" aria-labelledby="assignee">
  <!-- role="option", never role="menuitem" — this stores a
       selection, it does not perform an action. -->
  <div role="option" aria-selected="false" tabindex="-1">Ava Torres</div>
  <div role="option" aria-selected="true" tabindex="0">Liam Chen</div>
</div>
```

Not visible in the markup: arrow keys move the active option via
roving `tabindex`, exactly as in `specs/dropdown-menu.md`; Escape
closes without changing `aria-selected`; on close, focus returns to
the trigger and the trigger's visible text updates to the current
selection.

## Composition rules

- **Glyphs**: the trigger's caret is drawn from
  `foundations/iconography.md`, at `icon-sm`.
- **May contain**: a label, a trigger, an option list, selected-value
  chips (multi-select), helper or error text.
- **Must not contain**: an option that triggers an action rather than
  storing a value — that belongs in `specs/dropdown-menu.md`; a
  nested Select or Dropdown Menu inside its own panel.
- Lives inside a form or a filter toolbar. Never inside a Dropdown
  Menu panel, and never as an addon inside `specs/input-group.md` —
  see that spec's Composition rules for why. Its trigger nonetheless
  matches `specs/text-input.md`'s height, so the two read as one
  family where they sit side by side outside a group.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | trigger background, panel background |
| `color.surface.border` | trigger border, panel border |
| `color.brand.primary` | trigger border and ring on focus, selected option's chip fill |
| `color.neutral.light` | disabled trigger background, option hover/focus |
| `color.text.primary` | trigger value, option labels |
| `color.text.secondary` | placeholder, disabled text, "No matches" row |
| `color.text.on-accent` | chip label on its `brand.primary` fill |
| `radius.base` | trigger and panel corners |
| `radius.pill` | chip shape |
| `shadow.raised` | panel elevation |
| `spacing.2` | trigger vertical padding, option vertical padding |
| `spacing.3` | trigger horizontal padding, option horizontal padding |
| `font.size.sm` | trigger value, option labels |
| `spacing.component.icon-sm` | caret glyph, chip remove glyph |

## Reference visual description

A field identical in size and border to a text input, but its value
area is never an insertion caret — clicking anywhere opens a white
panel just beneath it, bordered and shadowed the same way a dropdown
menu is, listing plain-text rows. Pointing at a row paints it pale
gray; the currently chosen one carries a checkmark at its trailing
edge. In the multi-select version, the trigger itself holds one or
more small blue pill-shaped chips, each with a name and a tiny "×",
instead of the plain placeholder text a single-select shows when
empty.
