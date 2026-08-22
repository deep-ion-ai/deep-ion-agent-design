# Component: List Group

## Purpose

A vertical stack of single-column items separated by thin dividers:
a settings menu, a list of recent activity, a set of options to pick
from, a summary of related links.

It is the simpler neighbour of Data Table (`specs/data-table.md`),
and the choice between them is about the data, not the styling. Use
a List Group when each row is **one thing** — a label, perhaps with
an icon and a piece of trailing metadata — and the reader neither
sorts nor paginates it. Use a Data Table when rows have *columns*
that align and are compared down the page, or when sorting,
selection or pagination are needed. A table of one column is a list
with extra machinery; a list of five values crammed into each row is
a table that has lost its alignment.

`specs/card.md`'s **List** variant describes a card whose body is
this component. That variant is the composition; this spec is the
component.

## Anatomy

1. **Container** (required) — a vertical stack with a 1px
   `color.surface.border` outline and `radius.base` corners, its
   items separated by 1px dividers. Inside a Card body the outline
   and corners are dropped, since the card already provides them.
2. **Item** (required, 1..n) — one row, `spacing.3` vertical and
   `spacing.4` horizontal padding, containing at minimum a primary
   text label.
3. **Leading element** (optional) — an icon or an avatar at the
   start of the item, aligned to the first line of text.
4. **Primary text** (required) — the item's name.
5. **Secondary text** (optional) — a second line beneath the
   primary, in `color.text.secondary`, for a description or
   timestamp.
6. **Trailing element** (optional) — metadata, a Badge
   (`specs/badge.md`), a chevron indicating navigation, or a single
   control. **One** trailing element, not a cluster: a row with
   several controls is a table row.
7. **Section heading** (optional) — a non-interactive label
   grouping items in a long list.

## Variants

- **Static** — items that are read, not activated. Plain text rows.
- **Navigational** — every item leads somewhere; each is a link, and
  usually carries a trailing chevron.
- **Selectable** — the list represents a choice, one item of which
  is current. This variant has different semantics from the other
  two; see Accessibility rules.
- **With / without a leading element**, applied consistently: a list
  where some items have icons and others do not reads as broken
  rather than as varied.

## States

- **Default** — `surface.canvas` background.
- **Hover** (interactive variants) — `color.neutral.light`
  background across the full row width, since the whole item is the
  target.
- **Focus** — a visible focus ring drawn around the whole item, not
  around its text.
- **Active / current** (selectable variant) — a leading accent bar
  in `color.brand.primary` and a `font.weight.medium` label. A
  background tint alone is not enough: it is the same treatment as
  hover, and the reader cannot tell their own position from where
  the pointer happens to be.
- **Disabled** — `color.text.secondary` at reduced opacity, not
  activatable, and kept in place rather than removed, so the set of
  options stays stable between visits.
- **Loading** — skeleton items at the expected count and height.
- **Empty** — a single item-height row with a short message in
  `color.text.secondary`, keeping the container's shape so the
  layout does not collapse.

## Accessibility rules

- **The markup follows the variant, and the three are not
  interchangeable:**
  - *Static* — an unordered list (`<ul>`/`<li>`), or an ordered one
    where the sequence carries meaning.
  - *Navigational* — a list whose items each contain a single `<a
    href>` spanning the row. Not a `<div>` with a click handler:
    that is unreachable by keyboard, unannounced, and cannot be
    opened in a new tab. Where the list is the page's navigation, it
    sits in a named `<nav>`.
  - *Selectable* — `role="listbox"` on the container and
    `role="option"` with `aria-selected` on the items, **or** a
    group of radio inputs. Whichever is chosen, the container needs
    an accessible name saying what is being chosen, and arrow keys
    move between options with only the selected one in the tab
    order. A row of links where one merely looks different is not
    perceivable as a choice.
- **The whole item is the target**, not just its text. A row whose
  clickable area is narrower than its highlight is a mis-click
  waiting to happen, and the target must be at least 2.75rem tall on
  touch.
- **One interactive element per item.** An item that is itself a
  link and also contains a button produces a nested control that is
  ambiguous to activate. Where a row needs both, the row is not a
  link — the label is.
- **The accessible name is the item's own text.** A trailing Badge
  is folded in ("Billing, 3 unread"), and a decorative leading icon
  is `aria-hidden="true"`.
- **The current item in a navigational list carries
  `aria-current="page"`**, as in `specs/sidebar.md`.
- **Secondary text is part of the item's name**, not a separate
  announcement, so an item reads as one unit.
- **Dividers are presentational** and must not be list items.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Images**: avatars and other imagery follow
  `foundations/imagery.md`, including the required initials fallback.
- **May contain**: the parts named in Anatomy — one leading element,
  one or two lines of text, one trailing element per item.
- **Must not contain**: multiple columns of aligned data, several
  controls per item, a nested List Group, or a Data Table. Each of
  those means the content outgrew this component.
- **Is the body of**: a Card's **List** variant
  (`specs/card.md`) — the most common placement. Also used inside
  an Offcanvas panel (`specs/offcanvas.md`) and as the content of a
  Dropdown Menu's *neighbour*, though a menu of actions is
  `specs/dropdown-menu.md`, not this.
- **Uses**: `specs/badge.md` (trailing counts),
  `specs/pagination.md` — a long List Group paginates with the same
  component a Data Table uses.
- **Relationship to Timeline** (`specs/timeline.md`): a Timeline is
  a list ordered by *time*, with the sequence itself drawn. Where
  the ordering is chronological and the reader is meant to see the
  passage of time, that component says so; a List Group does not.
- **Length**: past roughly twenty-five items, add either a filter or
  pagination. A list long enough to scroll past its container is one
  the reader cannot survey.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | item background |
| `color.surface.border` | container outline, item dividers |
| `color.neutral.light` | item hover background |
| `color.brand.primary` | current-item accent bar, focus ring |
| `color.text.primary` | primary text |
| `color.text.secondary` | secondary text, disabled items, empty message |
| `radius.base` | container corners (standalone only) |
| `spacing.3` | item vertical padding |
| `spacing.4` | item horizontal padding |
| `spacing.2` | gap between a leading element and the text |
| `font.size.sm` | primary text |
| `font.size.xs` | secondary text |
| `font.weight.medium` | current item |

## Reference visual description

Inside a white card, a single column of rows running its full width,
each separated from the next by a hairline that reaches from edge to
edge. Every row holds a small outline icon at the left, a short dark
label beside it, and — on some rows — a small gray figure at the far
right. Moving the pointer down the column fills one row at a time in
a very light gray, edge to edge, so it is plain that the whole row
is the target and not just the words. One row sits with a thin blue
bar down its left edge and its label in a heavier weight: the
section the reader is currently in.
