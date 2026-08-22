# Component: Modal

## Purpose

A dialog that opens over the page, dims everything behind it, and
takes the reader's whole attention until they finish with it or
dismiss it. Modals exist for the small number of interactions the
page cannot continue past: confirming something destructive,
completing one short focused task, or reading something the reader
must acknowledge.

Because a modal interrupts, the bar for using one is high. Anything
the reader might want to compare against the page behind it, revisit
later, or link to belongs on a page or in a panel instead. The two
neighbours:

- An **Offcanvas** (`specs/offcanvas.md`) is a panel anchored to an
  edge of the viewport, for secondary content *alongside* the main
  view rather than in place of it. Same overlay mechanics, different
  intent — and it can be non-blocking, which a modal never is.
- A **Dropdown Menu** (`specs/dropdown-menu.md`) floats above the
  page too, but does not dim it, does not trap focus, and closes on
  the next click. A short list of actions is a menu, not a modal.

This spec also carries the **shared overlay behavior** used by both
modal and offcanvas — focus trapping, dismissal, scroll and stacking
— in its Accessibility rules. `specs/offcanvas.md` references those
rules rather than restating them, so the two cannot drift apart.

## Anatomy

1. **Backdrop** (required) — a full-viewport layer in
   `color.overlay.backdrop` behind the dialog, dimming the page so
   the content behind stays faintly legible but clearly demoted.
2. **Dialog container** (required) — a centred `surface.canvas`
   panel with `radius.lg` corners and `shadow.raised` elevation,
   horizontally centred and offset from the viewport top rather than
   vertically centred, so the panel does not jump as its content
   grows.
3. **Header** (required) — the dialog's title as a semantic heading,
   with the close control at its trailing edge. The title names the
   task in a few words ("Delete order #1029?"), not the component
   ("Confirmation").
4. **Close control** (required) — an icon-only Button
   (`specs/button.md`) with an `aria-label`. Required, and not
   replaceable by the backdrop or the Escape key alone: those two
   are invisible affordances, unusable by a reader who does not know
   them and unreliable on touch.
5. **Body** (required) — the dialog's content. Scrolls internally
   when it exceeds the available height (see Variants), so the
   header and footer stay in view.
6. **Footer** (optional) — a trailing-aligned row of actions. The
   confirming action is a solid Button, the dismissing action an
   outline or link Button beside it. At most three actions; a modal
   offering more is a page.

## Variants

- **Default** — width capped at a readable measure (roughly 32rem),
  height driven by content.
- **Scrollable** — when content exceeds the viewport, the body
  scrolls within a fixed dialog height while the header and footer
  stay pinned. This is the default behavior for long content, not an
  opt-in: a modal that grows past the viewport strands its own
  footer actions off-screen.
- **Wide** — a larger maximum width for content that genuinely needs
  it (a table, a two-column form). Wide modals are the usual sign
  that the content wanted a page.
- **Fullscreen below a breakpoint** — below `breakpoint.md` the
  dialog fills the viewport, dropping its radius and margins. On a
  small screen a centred dialog with margins wastes the space it
  needs most.
- **Blocking** — a modal that cannot be dismissed by the backdrop or
  Escape, only by an explicit action. Reserved for a decision that
  genuinely cannot be deferred (unsaved changes, a required
  acknowledgement). A blocking modal still has a close control if
  any dismissal at all is possible; if truly none is, it has none —
  but a dialog with no way out is nearly always a design error, not
  a requirement.

## States

- **Closed** — not rendered. Not merely hidden: a display-hidden
  dialog still holds focusable content in the tab order.
- **Opening** — the backdrop fades in and the dialog fades and rises
  slightly over ~150ms. Skipped under a reduced-motion preference.
- **Open** — the dialog holds focus, the page behind it does not
  scroll, and no element outside the dialog is reachable.
- **Closing** — the reverse transition, after which the dialog
  unmounts and focus returns to its trigger.
- **Busy** — while a confirming action is working, that action shows
  the Button loading state and the dialog stays open; the close
  control remains enabled unless cancelling is genuinely impossible,
  so the reader is never locked in with no feedback.

`hover`, `focus`, `active` and `disabled` apply to the dialog's
controls, not to the dialog.

## Accessibility rules

The rules in this section define **overlay behavior for both this
component and `specs/offcanvas.md`**. Where that spec says "shared
overlay behavior", it means everything below.

- **Roles and naming.** The dialog container is `role="dialog"`
  with `aria-modal="true"`, and its accessible name comes from the
  header title via `aria-labelledby`. Where the body is a short
  message that the reader must hear (a confirmation), associate it
  with `aria-describedby` as well. Only the truly blocking,
  interruption-worthy case uses `role="alertdialog"`.
- **Focus moves in on open.** When the dialog opens, focus moves
  into it — to the first focusable element, or to the dialog
  container itself when the content is a message to read. It must
  not land on a destructive action: a modal that opens with "Delete"
  focused turns a stray Enter into data loss. Prefer the dismissing
  action or the first field.
- **Focus is trapped while open.** Tab and Shift+Tab cycle within
  the dialog only, wrapping at both ends. Nothing outside the dialog
  — including the browser-rendered page behind it — is reachable by
  keyboard while it is open.
- **Content outside is hidden, not merely covered.** The rest of the
  page is removed from the accessibility tree while the dialog is
  open (`inert`, or `aria-hidden="true"` on the page container with
  the dialog outside it), or a screen reader can still read straight
  past the backdrop into content the reader cannot see or reach.
- **Focus returns on close.** Focus goes back to the element that
  opened the dialog. If that element no longer exists — the row it
  sat in was deleted by the dialog's own action — focus moves to the
  nearest stable ancestor and that region is announced, never left
  on the document body.
- **Escape closes**, unless the modal is the blocking variant. So
  does activating the close control, and so does a click on the
  backdrop — but backdrop dismissal is disabled whenever the dialog
  holds unsaved input, where a stray click would discard work
  silently. State that choice per dialog rather than globally.
- **The page behind does not scroll** while the dialog is open, and
  the scroll position is preserved on close. Scrolling behind a
  modal moves content the reader cannot interact with.
- **Stacking.** This template allows at most one modal at a time; a
  second must not open on top of the first. A Dropdown Menu opened
  *inside* a dialog is permitted, and Escape then closes the menu
  first and the dialog second — the innermost layer always closes
  first.
- **Announcement of arrival is the focus move, not a live region.**
  Do not wrap a dialog in `aria-live`; moving focus into it is what
  announces it, and doing both produces a double announcement.
- **Touch targets** in the header and footer follow
  `specs/button.md`'s minimum size — the close control especially,
  since it is small and sits at a viewport edge on mobile.

## Composition rules

- **May contain**: a short form, a confirmation message, a summary
  of what an action will do, a Data Table too small to warrant a
  page, an Alert (`specs/alert.md`) reporting the result of an
  action taken inside the dialog, and Dropdown Menus
  (`specs/dropdown-menu.md`).
- **Must not contain**: another modal, an Offcanvas, a multi-step
  wizard, content the reader may need to compare with the page
  behind it, or anything that should be linkable or bookmarkable.
- **Referenced by**: `specs/card.md` (confirmation before the header
  toolbar's remove action), `specs/button.md` (confirmation for
  irreversible actions), and `specs/data-table.md`, whose row
  actions may open a record's detail view in a dialog when the
  record is small — a full record belongs on its own page.
- **Referenced by** `specs/offcanvas.md` for the shared overlay
  behavior defined in Accessibility rules above.
- **Uses**: `specs/button.md` for the footer actions and close
  control.

## Tokens used

| Token | Usage |
|---|---|
| `color.overlay.backdrop` | backdrop dimming layer |
| `color.surface.canvas` | dialog background |
| `color.surface.border` | header and footer dividers |
| `color.text.primary` | title and body text |
| `color.text.secondary` | close control glyph at rest |
| `radius.lg` | dialog corners |
| `shadow.raised` | dialog elevation |
| `spacing.component.card-padding` | header, body and footer padding |
| `spacing.2` | gap between footer actions |
| `font.size.lg` | dialog title |
| `breakpoint.md` | threshold below which the dialog goes fullscreen |

## Reference visual description

The page dims to about half its brightness, still legible but
plainly out of reach, and a white panel appears near the top centre
of the screen with generously rounded corners and a soft shadow
spread wide beneath it. Its top strip carries a short bold question
and, at the far right, a thin ×. Below a hairline divider, two lines
of ordinary body text. At the bottom, separated by another hairline,
two buttons pushed to the right: an outlined one reading "Cancel"
and, last, a solid red one reading "Delete order". Pressing Tab
moves between the three controls and then back to the first — the
page behind never takes focus. On a phone, the same panel instead
fills the screen edge to edge, its corners square.
