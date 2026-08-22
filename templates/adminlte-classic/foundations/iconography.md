<!-- lint-allow-glyphs: this document quotes emoji in order to forbid them -->

# Foundation: Iconography

## Purpose

Defines the icon system every component in this template draws from:
what an icon is here, where it comes from, how big it is, and what it
is never allowed to do.

Icons are not decoration in an admin interface — they are how a
reader scans a dense sidebar, tells a collapse control from a remove
control, and recognises a status at a glance. A template that
specifies components but leaves their glyphs unspecified produces
interfaces that look assembled rather than designed, because every
implementation reaches for whatever is nearest.

## Use an icon library

**Generate against a real icon library. Do not draw icons by hand,
and never substitute emoji or typographic characters for them.**

This is the rule the rest of this document exists to support. Emoji
(🛒, ✉, ☺) and Unicode glyphs (⋮, ▤, ✓) are tempting because they
need no dependency, and they are wrong for every reason that matters:

- **They are not a set.** Each glyph comes from a different design,
  at a different weight, on a different baseline, with different
  padding. Placed in a row — a sidebar, a card toolbar — they read as
  a ransom note.
- **They render differently on every platform.** Emoji are painted by
  the operating system's own font: the same interface is a colour
  cartoon on one machine and a flat outline on another, and the
  designer controls neither.
- **They cannot be sized or coloured.** An emoji ignores `color`, and
  scales as text rather than as a graphic, so it will not sit on the
  same optical grid as the text beside it.
- **They are announced.** A screen reader reads "🛒" as "shopping
  trolley" mid-sentence, and `aria-hidden` on a text node is easy to
  forget precisely because it does not look like an image.

Being framework-agnostic is not a reason to avoid an icon library. A
template that describes what a "settings" icon means and leaves the
drawing to a maintained, consistent set is more portable, not less —
every target stack has a binding for the major sets.

### Choosing the set

The consuming project picks **one** library and uses it everywhere.
The template does not mandate a specific one, but it does constrain
the choice — the set must:

1. Be a **single coherent family** drawn on one grid at one weight,
   not an aggregation of several sets.
2. Be **stroke-based (outline)** rather than filled, at a stroke
   weight that reads as the same "colour" as the body text beside
   it. This template's surfaces are light and its type is light — a
   wall of solid black glyphs overpowers them.
3. Ship the **common admin vocabulary**: navigation, search, filter,
   sort, chevrons in four directions, overflow (a vertical
   ellipsis), close, plus/add, edit, delete, download, upload,
   refresh, settings, user, bell, mail, check, warning triangle,
   info, error, calendar, chart, map.
4. Be **renderable inline as SVG**, so it inherits `currentColor` and
   scales with its context. Icon *fonts* are excluded: they fail to
   the wrong glyph when the font does not load, and are announced as
   letters.

Widely used sets that satisfy all four exist for every major
framework — `foundations/libraries.md` lists starting points per
ecosystem, as suggestions to evaluate rather than requirements. The
demo in this repository picks one, and that choice is demo-local, not
part of the template.

## Sizing

Icons are sized in three steps, each paired with the text they sit
beside:

| Size | Value | Used with |
|---|---|---|
| Small | `spacing.component.icon-sm` (1rem) | `font.size.xs` text, dense table cells, badges |
| Default | `spacing.component.icon-md` (1.25rem) | `font.size.sm` text — most of the interface |
| Large | `spacing.component.icon-lg` (1.5rem) | `font.size.base`/`lg` text, empty states, large buttons |

An icon is never scaled to an arbitrary value to make a layout work.
If a glyph looks too small beside its text, the text is probably the
wrong size.

**The decorative oversized glyph in a Stat Callout
(`specs/stat-callout.md`) is the one exception**, and it is a
different thing: background texture at several times the large size,
in a low-contrast overlay colour, explicitly not content.

## Colour and alignment

- Icons take their colour from `currentColor` — they inherit the text
  colour of what they sit in and are not coloured independently. An
  icon in a `danger` button is on-accent because the button's label
  is; an icon in a muted toolbar is `text.secondary` because the
  toolbar is.
- Icons that carry status use the same per-fill contrast pairing as
  text (`color.text.on-accent` / `on-accent-dark` on a fill,
  `color.text.accent.*` as a mark on a light surface).
- An icon beside a label is separated by `spacing.2` and aligned to
  the label's optical centre, not to the top of its line box.
- An icon-only control's hit area follows `specs/button.md`'s
  minimum, which is larger than the glyph: pad the target, do not
  inflate the icon.

## Accessibility

- **An icon beside a visible label is decorative**:
  `aria-hidden="true"`, no title, no alternative text. The label
  already names the control, and announcing both produces "Delete
  delete".
- **An icon-only control carries the name on the control**, not on
  the icon: `aria-label` on the `<button>`/`<a>`, naming the action
  and its object ("Delete order #1029"), with the glyph
  `aria-hidden="true"`.
- **A standalone informational icon** — a warning mark beside a field
  with no other indication — is not decorative. It takes
  `role="img"` and an accessible name stating what it means, not
  what it depicts ("Requires attention", not "Triangle").
- **An icon is never the only carrier of meaning.** A status column
  of coloured glyphs with no text is unreadable to anyone who does
  not know the convention. Pair it with text, or with a Badge
  (`specs/badge.md`) whose word carries the meaning.
- Icons must survive the reader's own zoom and font settings: sized
  in `rem`, never in fixed pixels.

## Composition rules

- **Every component that names a glyph** — `specs/button.md`,
  `specs/card.md` (header toolbar), `specs/sidebar.md`,
  `specs/navbar.md`, `specs/alert.md` (severity marks),
  `specs/dropdown-menu.md`, `specs/breadcrumb.md` (separators),
  `specs/pagination.md` (steppers), `specs/timeline.md` (markers),
  `specs/data-table.md` (sort indicators, row actions),
  `specs/list-group.md`, `specs/direct-chat.md`,
  `specs/stat-callout.md` — draws it from the set defined here. Those
  specs say *which* glyph and *what it means*; this document says
  where it comes from and how it behaves.
- **One set per project.** Mixing two icon libraries in one interface
  is the single most visible way to make it look unfinished.
- **The same concept keeps the same glyph** everywhere: if a chevron
  means "expands" in the sidebar, a chevron does not mean "navigates"
  in a list.
- Icons do not appear inside body copy. An icon belongs to a control,
  a status, or a label — not to a sentence.

## Tokens used

| Token | Usage |
|---|---|
| `spacing.component.icon-sm` / `icon-md` / `icon-lg` | icon box size |
| `spacing.2` | gap between an icon and its label |
| `color.text.secondary` | icons at rest in toolbars and chrome |
| `color.text.primary` | icons on hover/active in chrome |
| `color.text.on-accent` / `on-accent-dark` | icons on a saturated fill |
| `color.text.accent.*` | icons used as a coloured mark on a light surface |

## Reference visual description

Down the sidebar, a column of thin outline glyphs — a grid, a list, a
person, a gear — every one drawn with the same stroke weight, every
one occupying the same square, their optical centres aligned so the
labels beside them run in a straight line. In the card header, three
smaller marks in muted gray: a vertical ellipsis, a chevron, a cross,
visibly members of the same family as the sidebar's. Nothing anywhere
is coloured except where colour carries meaning, and nothing is
filled solid.
