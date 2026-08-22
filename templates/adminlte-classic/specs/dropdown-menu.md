# Component: Dropdown Menu

## Purpose

A trigger that reveals a short, floating list of actions anchored to
itself. It is the template's canonical answer to "this element has
more actions than fit in the layout" — a card header's overflow
controls, a navbar's account menu, the extra options hanging off a
button group.

This spec is the single definition of that interaction. Any other
spec that needs a menu (`specs/card.md` header toolbar,
`specs/navbar.md`, `specs/button.md` split buttons) references this
one instead of restating it, so the keyboard behavior below is
identical everywhere it appears.

Do not confuse it with two neighbours:

- A **`<select>`** picks a value in a form. A Dropdown Menu invokes
  actions. If the result is a value stored in a field, it is a
  select, not this component.
- **Disclosure** (`specs/disclosure.md`, when it exists) expands
  content in place, in flow, pushing the page down. A Dropdown Menu
  floats above the page and closes on the next click.

## Anatomy

1. **Trigger** (required) — a `<button>` that opens and closes the
   menu. Carries a text label, an icon, or both. When it carries a
   text label it also shows a small caret glyph indicating that
   something opens; icon-only triggers (the card header "⋮"
   overflow, for example) omit the caret.
2. **Menu panel** (required) — a floating surface holding the items.
   Background `surface.canvas`, 1px `surface.border` border,
   `radius.base` corners, `shadow.raised` elevation. Vertical
   padding of `spacing.1` above and below the item list, so the
   first and last items do not touch the panel edge.
3. **Menu item** (required, 1..n) — a single row of the panel: a
   text label, an optional leading icon, and an optional trailing
   hint (a keyboard shortcut, a count). Full panel width; padding
   `spacing.2` vertical, `spacing.3` horizontal.
4. **Divider** (optional) — a 1px `surface.border` line separating
   groups of items, with `spacing.1` of space above and below.
   Purely a grouping device; it is never focusable.
5. **Section label** (optional) — a short, non-interactive heading
   above a group of items, in `font.size.xs` and `text.secondary`,
   naming what the group does.

## Variants

- **Single trigger** — one button that does nothing but open the
  menu. The default.
- **Split trigger** — two adjacent buttons sharing a seam: a primary
  button that performs the most common action directly, and a
  narrow caret-only button that opens the menu. Used when one action
  dominates the others. Both halves are separate `<button>`
  elements with their own accessible names — never one button with
  two click regions. Visual seam rules follow `specs/button.md`'s
  button-group section.
- **Alignment: start / end** — the panel's edge that aligns to the
  trigger. Start-aligned by default; end-aligned when the trigger
  sits at the right edge of its container (a card header toolbar, a
  navbar's right cluster), so the panel opens inward rather than off
  the viewport.
- **Placement: below / above** — below the trigger by default,
  flipping above it when there is not enough room beneath. This flip
  is automatic and positional, not an authoring choice.

## States

- **Closed** — default. The panel is not rendered, or is rendered
  hidden from both the accessibility tree and the tab order. Never
  merely transparent or moved off-screen while still focusable.
- **Open** — the panel is visible and the trigger stays visibly
  pressed/active so the relationship between the two reads at a
  glance.
- **Item hover / focus** — background `neutral.light`. Hover and
  keyboard focus produce the *same* highlight, so a keyboard user
  sees exactly what a mouse user sees; the focused item additionally
  carries the visible focus ring.
- **Item active** — while the item is being pressed, the background
  deepens briefly before the menu closes.
- **Item disabled** — label and icon in `text.secondary` at reduced
  opacity, not activatable. A disabled item stays in the reading
  order and is announced as disabled rather than being removed,
  since a silently vanishing item is harder to understand than a
  visibly unavailable one.
- **Item destructive** — an item whose action deletes or is
  otherwise hard to undo uses `status.danger` for its label and
  icon. Colour is not the only signal: destructive items sit last,
  below a divider, and their labels name the object being destroyed
  ("Delete report", never "Delete").
- **Loading** — when a menu's contents are fetched on open, the
  panel opens immediately at a stable size showing skeleton item
  rows with `aria-busy="true"`, rather than opening empty and
  resizing under the pointer.
- **Empty** — a menu with no available items disables its trigger
  rather than opening an empty panel.

## Accessibility rules

This component is reused across the template, so these rules are
what every consumer inherits. They are requirements, not defaults.

- The trigger is a real `<button type="button">` with
  `aria-haspopup="menu"` and `aria-expanded` reflecting the current
  state (`false` closed, `true` open). An icon-only trigger needs an
  `aria-label` naming what it opens in context (e.g. "Card actions",
  "Account menu") — never a bare "Menu" when several menus share a
  page.
- The panel has `role="menu"` and is associated with its trigger via
  `aria-labelledby` pointing at the trigger. Items are
  `role="menuitem"` and, when items toggle a setting, the
  `menuitemcheckbox` / `menuitemradio` roles with `aria-checked`
  instead.
- Items are placed inside the panel in the same order they read
  visually. A divider is `role="separator"`; a section label is
  associated with its group via `role="group"` and
  `aria-labelledby`.
- **Keyboard, on the trigger:** Enter, Space, or Down Arrow opens
  the menu and moves focus to the first item. Up Arrow opens it and
  moves focus to the last.
- **Keyboard, inside the panel:** Up/Down Arrow move between enabled
  items and wrap at the ends. Home/End jump to the first/last item.
  Typing a printable character moves focus to the next item whose
  label starts with it. Enter or Space activates the focused item
  and closes the menu. Escape closes the menu without activating
  anything. Tab closes the menu and moves focus onward to the next
  element after the trigger, rather than tabbing through the items.
- **Focus management:** exactly one item is in the tab order at a
  time (roving tabindex) — arrow keys, not Tab, move between items.
  When the menu closes for any reason other than a navigation that
  unmounts the trigger, focus returns to the trigger. Losing focus
  to the page body on close is a defect: it drops a keyboard user
  back at the top of the document.
- The menu closes on Escape, on activating an item, on a click
  outside the panel and trigger, and when focus leaves the panel
  entirely. It does not close on scroll — it repositions with its
  trigger or closes, never detaching from it.
- The panel is not a modal: it does not trap focus and does not
  render a backdrop. If an interaction genuinely needs to block the
  rest of the page, it is a Modal (`specs/modal.md`), not a menu.
- Item hit targets are at least 2.75rem tall on touch platforms,
  regardless of the visual density used on pointer platforms.

## Composition rules

- **May contain**: menu items with text labels, leading icons,
  trailing shortcut/count hints, dividers, and section labels.
- **Must not contain**: form fields, more than roughly ten items
  (past that, the content wants a searchable panel or a dedicated
  page), a nested submenu (deliberately out of scope for this
  template — a menu that needs a submenu is a sign the actions
  belong on a page, and multi-level menu keyboard behavior is a
  reliable accessibility failure), or content that is read rather
  than acted on.
- **Referenced by**: `specs/card.md` (header toolbar dropdown),
  `specs/navbar.md` (account and notification menus),
  `specs/button.md` (split-button group). Those specs describe
  *which* items their menu holds and how the trigger is placed;
  everything about how the menu opens, closes, and responds to the
  keyboard lives here. When a consuming spec merges, add it to this
  list.
- Lives inside a Card header, a Navbar, a button group, or a Data
  Table row action column. It floats above surrounding content and
  is therefore allowed to visually overflow its container — the
  container must not clip it.
- A Dropdown Menu may open from inside a Modal or an Offcanvas
  panel. It closes before the overlay containing it closes, and
  Escape dismisses the menu first, the overlay second.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | menu panel background |
| `color.surface.border` | panel border, dividers |
| `color.neutral.light` | item hover/focus background |
| `color.text.primary` | item labels |
| `color.text.secondary` | section labels, trailing hints, disabled items |
| `color.status.danger` | destructive item label and icon |
| `color.brand.primary` | focus ring on trigger and items |
| `radius.base` | panel corners |
| `shadow.raised` | panel elevation |
| `spacing.1` | panel vertical padding, space around dividers |
| `spacing.2` | item vertical padding |
| `spacing.3` | item horizontal padding |
| `font.size.sm` | item labels |
| `font.size.xs` | section labels, trailing hints |

## Reference visual description

A small white rectangle that appears just under its trigger,
overlapping whatever was beneath it, with softly rounded corners, a
hairline gray border, and a diffuse shadow that lifts it clearly off
the card behind. Inside, three or four single-line text labels in
the body font, left-aligned, each padded enough that the row reads
as a full-width band rather than as loose text. Moving the pointer
down the list paints one band at a time in a very light gray. Near
the bottom, a hairline divider separates a final label rendered in
red. The trigger above stays visibly depressed the whole time the
panel is open.
