---
component: tooltip
requires: [foundations/iconography.md, foundations/motion.md]
references: [specs/button.md, specs/data-table.md, specs/dropdown-menu.md, specs/geo-map-card.md, specs/trend-chart-card.md]
---

# Component: Tooltip

## Purpose

A short, plain-text hint that appears beside an element on hover or
focus, and disappears when the reader moves away. It is the generic
answer to "this element could use one more word of explanation" — an
icon-only `specs/button.md` whose glyph isn't self-evident to a
sighted mouse user, a truncated cell in `specs/data-table.md`, an
abbreviation or a disambiguating label in body copy.

Two neighbours it is not:

- **`specs/dropdown-menu.md`** is interactive: it opens on click, holds
  actionable items, and stays open until dismissed. A Tooltip opens on
  hover/focus, holds inert text, and closes the moment attention
  moves away. Putting a link or a button inside a Tooltip is a sign
  the component needed is a Dropdown Menu (or, for a larger panel, a
  Popover — this template does not specify one separately; use
  Dropdown Menu's floating-panel shape for that case instead of
  inventing a second one).
- **The chart-specific hover panels** already defined inline in
  `specs/geo-map-card.md` (a region's value panel) and
  `specs/trend-chart-card.md` (a data point's value panel) stay
  exactly as those specs define them — they show structured,
  multi-line data tied to a plotted point, not a short label. This
  spec is the generic, non-chart case; it does not replace those two,
  and they do not need to be rewritten to use it.

## Anatomy

1. **Panel** (required) — a small block of text, `radius.sm` corners,
   `shadow.raised` elevation, sized to its content up to a short
   maximum width beyond which it wraps rather than growing wider.
2. **Pointer** (optional) — a small triangular indicator on the edge
   facing the trigger, confirming which element the panel belongs to
   when its position alone leaves any doubt (a dense toolbar with
   several adjacent triggers, for instance).

## Variants

- **Placement: top / bottom / left / right** — the side of the
  trigger the panel opens toward. Top is the default. Whichever side
  is chosen, the panel flips to the opposite side when there isn't
  room (the same collision-flip rule `specs/dropdown-menu.md` states
  for its own panel), rather than rendering partially off-screen.
- **Plain text only** — the one supported content shape. No
  headings, lists, images or interactive controls. A hint that needs
  more structure than a sentence is content, not a tooltip — move it
  into the page or a `specs/modal.md`.

## States

- **Hidden** — default; the panel is not rendered.
- **Shown, via hover** — appears after `duration.hover-intent` once
  the pointer rests on the trigger, so a pointer merely passing over
  it does not flash a panel it never reaches. That token is a delay,
  not an animation, and is not affected by a reduced-motion
  preference — see `foundations/motion.md`.
- **Shown, via focus** — appears **immediately**, no delay. A
  keyboard user has already committed to this element by tabbing to
  it; making them wait reproduces the hover delay for no reason and
  reads as sluggish.
- **Dismissed** — Escape hides the panel without moving focus off the
  trigger; the panel also hides the moment hover or focus leaves the
  trigger (with a brief grace period on hover so the pointer can
  cross a small gap onto the panel itself, for the rare case the
  panel needs to be pointed at directly — text selection, mainly).

## Accessibility rules

This is the section that matters most for this component.

- **`role="tooltip"`** on the panel, referenced from the trigger via
  **`aria-describedby`** — never `aria-labelledby`. A tooltip
  supplements the trigger's existing accessible name; it does not
  replace it. The one exception: an icon-only Button already using
  `aria-label` for its accessible name may reuse that same text as
  the tooltip's visible content, so a sighted and a screen-reader
  user learn the same thing — see Composition rules.
- **Must appear on keyboard focus, not hover alone.** This is a
  requirement this template already states for chart tooltips in
  `specs/trend-chart-card.md` and for any candidate charting library
  in `foundations/libraries.md`; this spec is where the same rule
  belongs for the generic case. A hover-only tooltip is invisible to
  anyone who has not used, or cannot use, a pointer.
- **Escape dismisses without moving focus.** The trigger keeps focus;
  only the panel disappears — consistent with how Escape behaves on
  `specs/dropdown-menu.md`, without adopting that component's other
  keyboard handling (no arrow keys, no roving tabindex: a tooltip has
  no internal items to move between).
- **Never the only way to reach essential information.** Content that
  exists solely inside a tooltip is unreachable on a touch device,
  which has no hover state and (depending on the platform) no
  reliable long-press equivalent either. If the information is
  necessary to use the page, it belongs in visible text, not behind a
  hover.
- **Colour and position are not the content.** The panel's text is
  the entire message; nothing about *which side* it opens on or what
  colour it renders in carries meaning of its own.

## Composition rules

- **Glyphs**: this component carries no icon of its own — it is
  text-only (see Variants).
- **May contain**: a single short line or two of plain text.
- **Must not contain**: links, buttons, form fields, or any other
  focusable content — a focusable element inside a region that
  disappears when focus leaves its trigger is unreachable by
  keyboard. That need is `specs/dropdown-menu.md`'s, not this
  component's.
- **On an icon-only Button**: the tooltip's text should match the
  button's `aria-label` rather than add new information — a tooltip
  is not a substitute for a missing or vague accessible name, it is
  the same name made visible to a sighted user who has not yet
  learned the icon.
- **On a truncated `specs/data-table.md` cell**: the tooltip shows the
  cell's full, untruncated value and nothing more — it is a reveal of
  content already present, not a place to add detail unavailable in
  the cell itself.
- **Referenced by**: `specs/button.md` (icon-only trigger hints),
  `specs/data-table.md` (truncated cell values). Those specs decide
  when a tooltip appears; everything about how it opens, positions
  and dismisses lives here. Add each consumer as it merges.
- **Does not replace**: the hover panels already specified inline in
  `specs/geo-map-card.md` and `specs/trend-chart-card.md` — see
  Purpose.
- May be attached to any element that can hold focus or receive
  pointer hover. It floats above surrounding content, like
  `specs/dropdown-menu.md`'s panel, and a container must never clip
  it for the same reason that spec's panel must never be clipped.

## Tokens used

| Token | Usage |
|---|---|
| `color.neutral.dark` | panel background |
| `color.text.inverse` | panel text |
| `radius.sm` | panel corners |
| `shadow.raised` | panel elevation |
| `spacing.1` | panel vertical padding |
| `spacing.2` | panel horizontal padding |
| `font.size.xs` | panel text |

## Reference visual description

A small, dark, softly rounded rectangle floating just above a plain
icon-only button in a table's action column, holding a single line of
white text reading "Delete order" — small enough that it disappears
the instant the pointer moves off the button, with a tiny solid
triangle beneath it pointing straight down at the button's top edge.
Elsewhere, over a truncated customer name cut short with an ellipsis
in a table cell, the same shape appears on hover holding the full
name that did not fit.
