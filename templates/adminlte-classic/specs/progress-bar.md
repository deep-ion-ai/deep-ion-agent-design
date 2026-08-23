---
component: progress-bar
requires: [foundations/iconography.md, foundations/motion.md]
references: [specs/button.md, specs/stat-callout.md, specs/specialized-inputs.md]
---

# Component: Progress Bar

## Purpose

A track that fills to show how much of a bounded task is done: an
upload in flight, a multi-step wizard's position, storage used
against a quota. It is a status display, not a control — nothing
about it is clickable, and it carries no action of its own.

Two neighbours it is not:

- **Loading state** (see `specs/button.md`'s busy indicator, or a
  Card's skeleton content) is for "something is happening, duration
  unknown, no meaningful fraction to show." A Progress Bar's
  indeterminate variant (see Variants) covers the same unknown-
  duration case but is the right choice specifically where the
  *shape* of a bounded track is still useful context — a file upload
  whose byte count isn't known yet, but which the reader still
  understands as "a thing filling up," unlike a button mid-submit.
- **`specs/specialized-inputs.md`'s Range Slider** looks similar (a
  filled track) but is an input the reader drags to set a value.
  This component only ever displays a value; it is never dragged.

## Anatomy

1. **Track** (required) — the full-width, unfilled background of the
   bar, `radius.hairline` corners (this template's one deliberately
   square-cornered element — see `tokens/radii.json`), fixed height
   per size (see Variants).
2. **Fill** (required) — the portion of the track representing
   progress so far, drawn from the leading edge, same corner radius
   as the track so the two read as one shape at 0% and 100%.
3. **Label** (optional) — the percentage or a short status phrase
   ("68%", "Uploading…"), either overlaid on the fill (default size
   only, and only once the fill is wide enough to hold it without
   crowding) or placed above/beside the track. A compact bar (see
   Variants) never carries an overlaid label — there is no room.

## Variants

- **Determinate** — the default: a known fraction, 0–100%, set once
  and updated as it changes.
- **Indeterminate** — duration and fraction both unknown. The fill
  renders as a shorter segment that sweeps continuously along the
  track rather than growing from the leading edge. Reserved for a
  task with no meaningful percentage at all (e.g. "waiting for a
  server response before the transfer size is known") — the moment a
  fraction becomes knowable, switch to determinate rather than
  leaving it sweeping.
- **Size: default / sm** — default carries an overlaid label
  comfortably; `sm` is a thinner track (no overlaid label — pair it
  with an adjacent text value instead) for a dense context: a table
  cell, a `specs/stat-callout.md` accessory.
- **Colour** — `brand.primary` by default; `status.success`,
  `status.danger`, `status.warning` and `status.info` where the
  fraction itself carries that meaning (a near-full storage quota in
  `status.danger`, not merely for visual variety — the same rule
  `specs/stat-callout.md` states for its own fill colour).
- **Segmented (stepped)** — for a multi-step process (a wizard, an
  onboarding checklist) where the reader benefits from seeing the
  discrete steps rather than a smooth fraction: the track is divided
  into `n` equal segments by 1px `surface.canvas` gaps, and fill
  advances whole segments at a time. Behaves identically to the
  plain variant otherwise — same roles, same states.

## States

- **Filling (0–99%)** — fill width and, where present, the label's
  text update together; a numeric change is never shown as a jump
  without the fill also moving, or the two visibly disagree.
- **Complete (100%)** — the fill reaches the track's full width. A
  consuming spec may recolour it to `status.success` at this point
  (as `specs/specialized-inputs.md`'s File Input does for a finished
  upload) — that recolouring is the consumer's choice, not automatic
  here, since a 100% bar in `status.danger` (a fully-consumed quota)
  is a meaningful state this component must not overwrite.
- **0%** — the fill is present at zero width, not omitted: the track
  and its role/label are on the page from the start so a reader is
  never met with an empty region that later, silently, gains a
  progress bar.
- **Indeterminate** — see Variants; the sweep animates continuously
  and stops (reverting to a static, empty or determinate state)
  within a moment of the underlying task resolving — a sweep that
  keeps animating after the work has actually finished misreports
  the state.

Under a reduced-motion preference, the indeterminate sweep switches
from a moving segment to a slow opacity pulse on the full track,
rather than stopping altogether: the reader still needs to know
something is running. The general rule is in
`foundations/motion.md`; this is one of the two components that
needs to say more than it does.

## Accessibility rules

- **`role="progressbar"`** on the track, with `aria-valuenow`,
  `aria-valuemin="0"` and `aria-valuemax="100"` for the determinate
  variant, updated as the value changes. The indeterminate variant
  omits all three `aria-value*` attributes entirely (per WAI-ARIA —
  their absence, not a fixed value, is what tells assistive tech the
  fraction is unknown) and instead sets `aria-valuetext` to a short
  status phrase ("Uploading…") if one is available.
- **Accessible name** via `aria-label` or `aria-labelledby` pointing
  at adjacent visible text, naming what is progressing ("Photo
  upload", not a bare "Progress" when more than one bar can appear
  on a page).
- **Colour is never the only signal.** A `status.danger` bar reading
  "storage nearly full" must say so in the adjacent label text too —
  the same rule this template already states for
  `specs/form-validation.md` and `specs/alert.md`.
- **The visible percentage and `aria-valuenow` must never disagree.**
  Where a label rounds for display ("68%" for 67.8), round
  `aria-valuenow` the same way rather than exposing the unrounded
  figure to assistive tech alone.
- A segmented bar's steps are not individually focusable and do not
  each carry their own role — the whole track is one
  `progressbar`, exactly as the plain variant; the segment gaps are
  presentation only.

## Composition rules

- **Glyphs**: this component carries no icon of its own. A leading
  or trailing icon belongs to whatever contains it (a Card header, a
  `specs/specialized-inputs.md` File Input row), not to the bar.
- **May contain**: nothing — no nested interactive content. The
  overlaid label is text only.
- **Must not**: be used as a stand-in for a Range Slider
  (`specs/specialized-inputs.md`) or a Button's loading state
  (`specs/button.md`) — see Purpose for the distinction each time.
- **Referenced by**: `specs/specialized-inputs.md` (File Input's
  upload-in-progress row), `specs/stat-callout.md` (an optional
  compact accessory beneath the value, using the `sm` size), and
  `patterns/wizard.md` (the step indicator, Segmented variant). Those
  specs decide where a bar appears and at what size; everything
  about the bar itself is defined here. Add each consumer as it
  merges.
- Sits inside a Card body, a table cell, a File Input row, or a Stat
  Callout. It never floats above content and is never itself
  interactive, so it has no placement conflict with
  `specs/dropdown-menu.md` or any other overlay component.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.border` | track background |
| `color.brand.primary` | default fill |
| `color.status.*` | fill, by meaning |
| `color.text.on-accent` | overlaid label text on a dark fill |
| `color.text.on-accent-dark` | overlaid label text on `warning`/`info` fills |
| `color.text.secondary` | adjacent (non-overlaid) label text |
| `color.surface.canvas` | segment gaps in the segmented variant |
| `radius.hairline` | track and fill corners |
| `spacing.1` | gap between a `sm` bar and its adjacent text value |
| `font.size.xs` | overlaid and adjacent label text |
| `font.weight.medium` | overlaid label text, for legibility against the fill |

## Reference visual description

A thin, almost perfectly square-cornered rectangle spanning a card's
width, pale gray where empty, filled from the left in solid blue
about two-thirds of the way across, with a small white "68%" sitting
inside the filled portion near its trailing edge. Beside it, a
narrower, shorter version of the same shape sits inline in a table
row with no label of its own — a plain percentage in gray type reads
to its right instead. Elsewhere, a red bar at nearly full width
beneath the words "92% of storage used," and, in a wizard header, the
same shape broken into four visibly separate segments, the first two
filled solid and the last two still pale.
