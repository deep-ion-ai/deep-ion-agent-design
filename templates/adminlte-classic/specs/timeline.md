# Component: Timeline

## Purpose

A chronological record of what happened: an order's progress, an
audit trail, a ticket's history, a deployment log. Entries run down
the page in time order, connected by a line, each marked by an icon
whose colour says what kind of event it was.

What separates it from a List Group (`specs/list-group.md`) is that
**the sequence is the content**. A timeline draws the passage of
time — the connecting line, the date groups, the ordering — so the
reader sees a history rather than a set of rows that happen to be
sorted. If the order could be changed without losing meaning, it is
a list, not a timeline.

Direction is fixed per timeline and stated in the interface:
newest-first for a live feed the reader checks repeatedly,
oldest-first for a record read as a story. A timeline whose
direction is ambiguous is misread.

## Anatomy

1. **Container** (required) — the ordered sequence of entries, with
   a vertical rule running down the leading edge behind the markers.
2. **Connecting line** (required) — a 1px `color.surface.border`
   rule joining the markers. Purely decorative; it draws the
   sequence the markup already carries.
3. **Date group divider** (optional) — a label breaking the sequence
   into days or periods, drawn as a small pill on the line.
4. **Entry** (required, 1..n) — one event.
5. **Marker** (required per entry) — a small circular badge sitting
   on the line, carrying an icon and coloured by event type.
6. **Timestamp** (required per entry) — when it happened, near the
   marker, in `color.text.secondary`.
7. **Entry content** (required per entry) — a Card
   (`specs/card.md`) beside the marker holding a heading, optional
   body text, and optional actions. It is a Card, not a card-like
   block: the surface, border, radius and shadow come from
   `specs/card.md` rather than being restyled here.

## Variants

- **Full** — every entry a Card with heading, body and actions.
- **Condensed** — entries reduced to a single line of text beside
  the marker, with no card surface. For long histories where each
  event is a sentence; the connecting line and markers remain.
- **Grouped / ungrouped** — with or without date dividers. Grouping
  is worth it once the timeline spans more than a day or two.
- **Marker colour** — from `color.status.*` and `color.brand.*` by
  event type: `success` for something completed, `danger` for a
  failure, `warning` for something needing attention, `info` or
  `primary` for a neutral event. The colours must map to event
  *kinds* consistently across the product, or they teach nothing.

## States

- **Default** — the sequence at rest.
- **Entry hover / focus** (interactive entries) — per
  `specs/card.md`. Entries are interactive only when each opens
  something; a timeline of unclickable cards must not react to the
  pointer.
- **Loading** — three or four skeleton entries with skeleton
  markers, keeping the connecting line, so the shape of the
  component is recognisable before its content arrives.
- **Loading more** — where scrolling loads older entries, they are
  appended without moving the reader's position.
- **Empty** — a short message where the entries would be ("No
  activity yet"), without the line and markers: a connecting line
  joining nothing reads as a rendering failure.
- **Live** — a timeline that receives entries while open follows
  `specs/direct-chat.md`'s rule: append quietly, and only move the
  reader's view if they are already at the end nearest the newest
  entry.
- **Error** — a message with a retry action in place of the
  sequence.

## Accessibility rules

- **The container is an ordered list (`<ol>`)**, one `<li>` per
  entry, so assistive tech announces the position and count and the
  reader knows a sequence is being read. Marking a chronology as a
  set of `<div>`s throws away the one thing that distinguishes this
  component from a stack of cards. Where the timeline is
  newest-first, the markup order matches the visual order and the
  direction is stated in the container's accessible name ("Order
  history, newest first").
- **The connecting line and markers are decorative** and
  `aria-hidden="true"`. The line carries no information the ordered
  list does not, and a marker's *colour* is never the only carrier
  of the event's kind — the entry's text states it ("Payment
  failed", not a red dot beside "Payment").
- **Date group dividers are headings**, not separators. This is a
  deliberate call: a divider labelled "12 March" introduces the
  entries beneath it, and a heading lets a screen-reader user jump
  between days, which `role="separator"` does not. The heading level
  sits beneath the section's own heading, and the entries for a day
  are grouped under it — either as a nested `<ol>` per group, or by
  placing the heading inside the first entry of the group. Prefer
  the nested list: it keeps the grouping structural rather than
  implied.
- **Timestamps are `<time>` elements** with a machine-readable
  value. Visible relative text ("2 hours ago") is fine; the
  accessible form must be absolute, since "2 hours ago" is
  meaningless when read later.
- **Each entry is announced as one unit** — timestamp, kind and
  content together, rather than as loose fragments.
- **An entry's Card follows `specs/card.md`'s accessibility rules
  in full**, including the heading level of its title and the rule
  that an entry with several controls is not itself clickable.
- **Actions inside an entry name their object** — "Retry payment for
  order #1029", not "Retry" — since a screen-reader user hears them
  outside the visual context of the row.
- Contrast: marker icons sit on a saturated fill and follow the
  template's per-fill pairing (`color.text.on-accent` /
  `color.text.on-accent-dark`); the connecting line is decorative
  and exempt from contrast minimums, but the timestamps are not.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **May contain**: entries, date group dividers, and — inside an
  entry — anything a Card body may contain.
- **Must not contain**: a nested Timeline, a Data Table inside an
  entry (an entry summarises an event; a table of events is a
  table), or entries out of chronological order.
- **Uses**: `specs/card.md` (entry content), `specs/badge.md`
  (an entry's status), `specs/button.md` (entry actions).
- **Relationship to List Group** (`specs/list-group.md`): where the
  order is incidental rather than the point, use a List Group. Where
  the reader is meant to see time passing, use this.
- **Placement**: in the content region of `patterns/app-shell.md`,
  or as the body of a Card — in which case the entries use the
  Condensed variant, since a card of cards is the nesting
  `specs/card.md` prohibits.
- **Length**: past roughly twenty entries, paginate
  (`specs/pagination.md`) or load progressively. An audit trail
  rendered in full is a page that never finishes loading.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.border` | connecting line, date divider pill border |
| `color.status.*` / `color.brand.primary` | marker fill by event type |
| `color.text.on-accent` / `on-accent-dark` | marker icon, per fill |
| `color.text.secondary` | timestamps |
| `color.neutral.light` | date divider pill background |
| `color.text.primary` | date divider label, entry text |
| `radius.pill` | marker and date divider shapes |
| `spacing.5` | vertical rhythm between entries |
| `spacing.3` | gap between marker and entry content |
| `font.size.xs` | timestamps |
| `font.size.sm` | entry text, date divider label |
| `font.weight.medium` | date divider label |
| (card anatomy) | see `specs/card.md` |

## Reference visual description

Down the left of a column of content runs a thin gray line. Sitting
astride it at intervals are small coloured discs — green, blue, red
— each holding a tiny white glyph. To the right of every disc, a
white card with a bold short heading, a line or two of gray text,
and sometimes a small button at its foot; to the left of the disc,
in small gray type, the time. Twice down the column the line is
interrupted by a pale rounded pill carrying a date in dark text,
after which the pattern resumes. The eye follows the line downward
and reads the history in order.
