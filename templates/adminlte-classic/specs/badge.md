# Component: Badge

## Purpose

A small, compact label carrying a status word or a count, attached
to something else. A badge annotates — it never acts. It is the
template's way of saying "this row is active", "there are nine
unread", "this feature is beta", in the smallest amount of space
that still reads.

This spec is the canonical definition. `specs/data-table.md`
(status column), `specs/card.md` (header status badge),
`specs/navbar.md` and `specs/direct-chat.md` (unread counts) all use
badges; they reference this file rather than each redefining one.

Its neighbours, and the test for telling them apart:

- A **Ribbon** (`specs/ribbon.md`, when it exists) is a corner
  banner belonging to a whole card. A badge sits inline in a line of
  content, or on the corner of a single small element.
- An **Alert** (`specs/alert.md`) is a full-width block that
  explains a situation in a sentence. A badge is one or two words.
- A **Button** is pressed. If it is clickable, it is not a badge —
  see Accessibility rules.

## Anatomy

1. **Container** (required) — a compact inline box, padded
   `spacing.1` vertically and `spacing.2` horizontally, filled with
   a solid colour from the palette. Sized by its content, never
   stretched to fill its parent.
2. **Content** (required) — a short word, a short phrase, or a
   number. One or two words at most; long text belongs in an Alert
   or in the surrounding copy. Rendered in `font.size.xs`,
   `font.weight.medium`, on a single line — a badge never wraps.
3. **Leading icon** (optional) — a small glyph before the label,
   used when the badge's meaning is carried by colour and needs a
   second, non-colour signal (see Accessibility rules).

## Variants

- **Colour** — one per palette entry: `brand.primary`,
  `brand.secondary`, `status.success`, `status.danger`,
  `status.warning`, `status.info`, plus a neutral badge on
  `neutral.light`. The fill determines the text colour, and the
  choice is not free — see the contrast rule in Accessibility.
- **Shape: default / pill** — `radius.sm` for a badge holding a word
  (its rectangular shape echoes the surrounding surfaces), or
  `radius.pill` for one holding a count (the fully-round shape reads
  as a numeric marker). Both shapes exist for both content kinds;
  the above is the default pairing, not a restriction.
- **Subtle** — a low-emphasis variant: `color.text.accent.*` — the
  text-safe darkened counterpart of the status colour, not the raw
  fill value — is used for the text and a 1px border, with a
  `surface.canvas` fill instead of a solid one. Used where a row of solid badges would out-shout the
  data around them, e.g. a status column in a dense Data Table.
- **Overflow count** — a pill badge positioned on the top-right
  corner of a small parent element (an icon button, an avatar),
  overlapping it slightly. Counts above a defined ceiling are
  truncated with a plus ("99+") rather than allowed to widen the
  badge indefinitely; the spec's default ceiling is 99, and the
  consuming project may lower it.

## States

A badge is not interactive, so `hover`, `focus`, `active` and
`disabled` do not apply to it. It has no states of its own — it
reflects the state of something else. Two behaviors are still worth
specifying:

- **Value change** — when a count changes while the page is open,
  the badge updates in place. It may use a brief (~150ms) scale or
  fade transition to draw the eye, but must not animate on every
  render or loop indefinitely; motion that repeats becomes noise and
  must respect a reduced-motion preference.
- **Zero / absent** — a count badge showing zero is removed from the
  layout, not rendered as "0". A badge that always shows stops being
  a signal.

## Accessibility rules

- **A badge is never interactive.** It is a `<span>`, not a
  `<button>` or an `<a>`. If clicking it should filter, navigate, or
  dismiss, the correct component is a button styled compactly — a
  clickable `<span>` is unreachable by keyboard and unannounced by
  assistive tech.
- **Colour alone must not carry the meaning.** A green badge and a
  red badge are indistinguishable to a colour-blind reader and to
  anyone using a monochrome display. Every badge therefore carries
  its meaning in its text ("Active", "Failed"), or, when the text is
  only a number, in a leading icon plus an accessible name that
  states what is being counted.
- **Contrast is a per-colour decision, not a global one.** Text uses
  `color.text.on-accent` (white) over `brand.primary`,
  `brand.secondary`, `status.success` and `status.danger`, and
  `color.text.on-accent-dark` over `status.warning`, `status.info`
  and `neutral.light` — white fails WCAG AA over those three
  (1.63:1, 1.96:1 and 1.05:1 respectively). Because badge text is
  `font.size.xs`, it is never large-scale text, so the 4.5:1
  threshold always applies. Note that `brand.primary`,
  `status.success` and `status.danger` clear it only narrowly
  (4.50–4.53:1): do not tint or lighten those fills for a badge.
- **A positioned badge must be announced with its parent.** An
  unread count sitting on a notification icon is visually adjacent
  to its meaning but programmatically orphaned — "9" alone tells a
  screen-reader user nothing. Either the parent control carries the
  whole meaning in its accessible name ("Notifications, 9 unread"),
  with the badge marked `aria-hidden="true"` as a visual duplicate,
  or the badge carries visually-hidden text of its own ("9 unread
  notifications"). One or the other, never both — doubling produces
  "Notifications 9 unread 9 unread".
- **A live count needs a live region.** If a count changes without
  user action (a message arrives), the element carrying the
  accessible name is `aria-live="polite"` so the change is
  announced without stealing focus. A count that only changes as a
  result of the user's own action does not need one.
- The badge's inline box must not be the sole means of separating it
  from adjacent text: preserve real whitespace between a heading and
  its badge, so the two do not run together when styles fail to
  load.

## Composition rules

- **May contain**: a short text label, a number, an optional leading
  icon.
- **Must not contain**: an interactive element, a dismiss control (a
  badge that can be removed is a chip/tag — a different component,
  out of scope for this template), an icon by itself with no label
  or accessible name, or a second badge.
- **Referenced by**: `specs/data-table.md` (status cells),
  `specs/card.md` (header status badge), `specs/navbar.md` (unread
  counts on the notification and message triggers),
  `specs/sidebar.md` (item counts), `specs/disclosure.md` (counts on
  tabs), and — once merged — `specs/direct-chat.md` (unread count in
  the card header). Those specs choose the colour and the content;
  the shape, contrast pairing, and announcement rules are defined
  here. Add each consumer to this list as it merges.
- Sits inside: a heading, a table cell, a card header, a button, a
  list item, or on the corner of an icon button or avatar. It is
  always attached to something — a badge alone on a page has no
  referent and no meaning.
- The overflow-count variant requires its parent to establish a
  positioning context. The parent must not clip its own overflow, or
  the badge is cut off at the corner.

## Tokens used

| Token | Usage |
|---|---|
| `color.brand.primary` / `brand.secondary` | badge fill |
| `color.status.*` | badge fill by status |
| `color.neutral.light` | neutral badge fill |
| `color.text.on-accent` | text over primary, secondary, success, danger |
| `color.text.on-accent-dark` | text over warning, info, neutral.light |
| `color.surface.canvas` | fill of the Subtle variant |
| `color.text.accent.*` | text and border of the Subtle variant |
| `radius.sm` | default (word) shape |
| `radius.pill` | count / overflow shape |
| `spacing.1` | vertical padding |
| `spacing.2` | horizontal padding |
| `font.size.xs` | label and count |
| `font.weight.medium` | label and count |
| `font.lineHeight.dense` | single-line box height |

## Reference visual description

In a table's status column, a row of small, solid-colour capsules —
green reading "Active", gray reading "Inactive" — each just wide
enough for its word, the text white and noticeably smaller than the
row text beside it. In the top bar, a bell icon with a tiny red
circle clinging to its upper-right corner, overlapping the glyph,
carrying a white "9". Next to a section heading, a single small blue
capsule reading "Beta", set on the heading's baseline with clear
space between the two.
