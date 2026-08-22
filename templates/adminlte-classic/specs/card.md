# Component: Card (list item / summary card)

## Purpose

A raised rectangular surface that groups one unit of related
information — a metric summary, an item within a listing, or a
self-contained block of content inside a dashboard. It is the
template's main visual composition block: nearly all page content
lives inside one or more cards.

## Anatomy

A card is made up of the following parts, all optional except the
body:

1. **Header** (optional) — a top strip with a short title on the
   left and, optionally, a status Badge (`specs/badge.md`) beside
   the title and a **header toolbar** on the right (see below).
   Separated from the body by a thin bottom border.
2. **Body** (required) — the main content area. May contain text, a
   highlighted metric with a label, a list of items, or any other
   content (including, by composition, a full Data Table — see
   `patterns/dashboard.md`).
3. **Footer** (optional) — a bottom strip, typically for a secondary
   action (e.g. a "view all" link) or metadata (e.g. "updated 5 min
   ago"). Separated from the body by a thin top border.
4. **Side accent bar** (optional) — a thin strip of status color on
   the card's left border, used to informally signal the nature of
   the content (e.g. an alert card with a `status.danger` bar)
   without changing the entire card background.

### Header toolbar

A cluster of icon-only buttons at the header's trailing edge,
right-aligned, separated from the title by flexible space and from
each other by `spacing.1`. Each is an icon-only Button
(`specs/button.md`) at the small size. The toolbar holds at most
four controls; past that, the overflow menu is where the rest
belong.

Three controls are standard, and when more than one is present they
appear in this order — a fixed order matters, because these buttons
carry no labels and readers navigate by position:

1. **Component-specific actions** (optional, 0..n) — controls that
   belong to this particular card rather than to cards in general
   (e.g. Direct Chat's toggle for its contacts pane). They occupy
   the leading end of the cluster, so the generic controls stay
   where the reader expects them across every card on the page.
2. **Dropdown** (optional) — a "⋮"-style trigger opening a menu of
   contextual actions for the card. Behavior, keyboard handling and
   markup are defined in `specs/dropdown-menu.md`; this spec adds
   nothing to them. Actions that are rare, destructive, or numerous
   belong here rather than as their own icon.
3. **Collapse/expand** (optional) — toggles the visibility of the
   card's body and footer, keeping the header in place. The glyph
   itself indicates direction and flips between states (a chevron
   pointing down when collapsed, up when expanded).
4. **Remove** (optional) — dismisses the whole card from the page.
   Placed last, at the trailing end, away from the collapse control
   it is most likely to be mistaken for.

A toolbar control never carries a text label; a card action that
needs words belongs in the card footer or in the dropdown menu.

## Variants

- **Default** — background `surface.canvas`, no accent color.
- **Summary/KPI** — the body is reduced to a large number
  (`font.size.xl`, `font.weight.semibold`) with a short label below
  (`font.size.sm`, `text.secondary`) and, optionally, a themed icon
  aligned to the right. Used in metric grids at the top of a
  dashboard.
- **List** — the body contains a vertical column of items (e.g. the
  items of a listing), each with `spacing.3` vertical spacing and a
  `surface.border` separator between items.
- **Status accent** — a variant with the side accent bar colored by
  one of the `status.*` colors.

## States

- **Default** — `shadow.card` shadow, 1px `surface.border` border.
- **Hover** (when the whole card is clickable/navigable) — the
  shadow lifts slightly to `shadow.raised`; smooth transition
  (~150ms). Non-clickable cards do not react to hover.
- **Loading** — the body is replaced by skeleton placeholders
  (rectangles of `neutral.light` with a subtle pulse animation) in
  the same proportions as the final content, to avoid layout shift.
- **Empty** — when the card's data source has no content, a short
  message centered in `text.secondary` is shown (e.g. "No items
  yet") instead of the normal body.
- **Error** — when the card's data source fails, a short message in
  `status.danger` is shown, with a retry action, instead of the
  normal body.
- **Collapsed / expanded** (cards with the collapse control) —
  collapsed, the body and footer are hidden and the header keeps its
  full width, radius and shadow, so the collapsed card still reads
  as a card rather than as a stray strip. The transition animates
  the body's height over ~200ms and is skipped entirely under a
  reduced-motion preference. Collapse state is presentational and
  must never be used to hide content that has not loaded — a
  collapsed card whose body is empty and a collapsed card whose body
  failed to load are indistinguishable to the reader.
- **Removed** (cards with the remove control) — the card unmounts
  and is taken out of the layout, not merely hidden. A hidden-but-
  present card stays in the accessibility tree and keeps being
  announced. The surrounding grid reflows; a short fade before
  removal keeps that reflow from reading as a glitch.

The `active`/`disabled` states do not apply to this component as a
whole (those are states of individual interactive elements inside
the card, such as buttons, not of the card itself).

## Accessibility rules

- If the entire card is a link/navigation button, it must be
  implemented as a single focusable element (`<a>` or `<button>`),
  never as a `<div onClick>` — it must be reachable and activatable
  via keyboard (Enter/Space) and have a visible focus ring.
- If the card contains multiple internal interactive elements (e.g.
  a menu button and a "view all" link), each must be an independent
  focusable element with its own tab order — the card itself must
  not be focusable in that case.
- The header title, when present, must use a semantic heading tag
  (`h2`–`h6`, at the level appropriate to the page hierarchy) to
  allow screen-reader navigation via heading landmarks.
- Loading states must be announced via `aria-busy="true"` on the
  card container while the placeholder is visible.

### Header toolbar

- Every toolbar control is a real `<button>` with an `aria-label`,
  since none of them carries visible text. The label must name the
  card, not just the action: a page of cards whose buttons all
  announce "Collapse" gives a screen-reader user no way to tell
  which card they are on. Use "Collapse recent orders", "Remove
  sales summary". The glyph is `aria-hidden="true"`.
- The collapse trigger carries `aria-expanded` (`true` expanded,
  `false` collapsed) and `aria-controls` pointing at the element
  that holds the body. The collapsed region must be genuinely hidden
  from the accessibility tree and the tab order — not merely
  visually clipped, which leaves its focusable contents reachable by
  Tab with nothing visible on screen.
- The collapse control's accessible name stays constant across
  states; `aria-expanded` communicates the state. Renaming the
  button between "Collapse" and "Expand" while `aria-expanded` also
  flips announces the state twice, and voice-control users lose a
  stable phrase to say.
- Remove is destructive and irreversible from the reader's point of
  view. The spec requires one of: a confirmation step before the
  card is removed (`specs/modal.md`), or an undo affordance
  presented after it (`specs/alert.md`). A consuming project may
  decide the card is trivially restorable — for example, a dashboard
  whose layout resets on reload — and skip both, but that must be a
  decision made explicitly, not by omission.
- After a removal, focus must not be left on the removed node. Move
  it to the next card in the grid, or to the container that held it,
  so a keyboard user is not returned to the top of the document.
- The dropdown trigger follows `specs/dropdown-menu.md` in full:
  `aria-haspopup="menu"`, `aria-expanded`, arrow-key navigation,
  Escape to close, focus returning to the trigger.
- The toolbar's buttons follow the header title in the DOM, in the
  same order they appear visually. Where the card's own content is
  long, consider `role="toolbar"` on the cluster with arrow-key
  navigation between its buttons, so a keyboard user reaches the
  card's controls without tabbing through its contents — required
  only when the toolbar holds three or more controls.

## Composition rules

- **May contain**: text, highlighted numbers, icons, Badges
  (`specs/badge.md`), lists, a full Data Table, a limited number of
  action buttons (1–2 in the footer) and a header toolbar of up to
  four icon-only Buttons (`specs/button.md`).
- **References**: `specs/dropdown-menu.md` for the header toolbar's
  overflow menu — this spec describes only where the trigger sits
  and which actions belong in it, never how the menu behaves;
  `specs/button.md` for the toolbar buttons' sizing and states;
  `specs/badge.md` for a status badge beside the header title.
- **Must not contain**: another card nested directly inside its body
  (cards compose side by side in a grid, not nested); complex
  multi-step forms (that belongs to a dedicated page pattern, not to
  this component).
- Cards in a dashboard grid should have consistent height within the
  same row when content allows (avoiding a "staircase" visual),
  using `spacing.grid-gap` as the spacing between them.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | card background |
| `color.surface.muted` | page background behind the card |
| `color.surface.border` | card border, header/footer dividers |
| `color.text.primary` | body text |
| `color.text.secondary` | labels, metadata |
| `color.status.*` | side accent bar, status badges |
| `radius.base` | card border radius |
| `shadow.card` | default elevation |
| `shadow.raised` | hover elevation (when clickable) |
| `spacing.component.card-padding` | body inner padding |
| `spacing.component.card-header-padding-y` | header vertical padding |
| `spacing.1` | gap between header toolbar buttons |
| `color.text.secondary` | header toolbar glyphs at rest |
| `color.text.primary` | header toolbar glyphs on hover/focus |
| `color.neutral.light` | header toolbar button hover background |
| `font.size.lg` | header title |
| `font.size.xl` + `font.weight.semibold` | highlighted number (Summary/KPI variant) |
| `font.size.sm` + `color.text.secondary` | labels and footer |

## Reference visual description

A typical metric card: a white rectangle with slightly rounded
corners and an almost imperceptible shadow, floating over a light
blue-gray page background. In the top-left corner, a small, muted
label ("Orders today"); just below, a large number in a semi-bold
weight ("1,204"). In the top-right corner, a small, monochrome icon
related to the card's theme. On a card that carries a toolbar
instead, that corner holds two or three muted gray glyphs in a row —
a vertical ellipsis, a chevron, an × — barely visible until the
pointer enters the header, each picking up a pale gray rounded
square as it is hovered. No visible internal borders — the
separation comes entirely from whitespace and the subtle shadow
elevation.
