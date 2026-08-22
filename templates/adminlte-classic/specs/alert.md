# Component: Alert

## Purpose

A block that states a situation in a sentence, placed inline in the
page where the situation applies: a save succeeded, a form has three
errors, a subscription expires in four days, a background import is
still running.

An Alert stays in the document flow — it pushes content down rather
than floating over it — and it persists until dismissed or until the
condition that produced it goes away. That is what separates it from
its neighbours:

- A **toast/snackbar** floats over the page, is time-limited, and
  disappears on its own. This template does not specify one; an
  Alert is not a substitute for it and must not auto-dismiss.
- A **Badge** (`specs/badge.md`) labels an element in one or two
  words. An Alert explains something in a sentence and may carry an
  action.
- A **Modal** (`specs/modal.md`) blocks the page until the user
  responds. An Alert never blocks.
- A **field-level error message** belongs to one input and sits
  beneath it. An Alert speaks for a page or a section. A form with
  failed validation frequently needs both: a summary Alert above the
  form and a message on each offending field.

## Anatomy

1. **Container** (required) — a full-width block within its parent,
   `radius.base` corners, padded `spacing.3` vertically and
   `spacing.4` horizontally.
2. **Icon** (required) — a glyph at the leading edge, vertically
   aligned to the first line of text, whose shape differs per
   severity. It is required rather than optional because it is the
   non-colour signal that carries severity (see Accessibility
   rules).
3. **Message** (required) — one or two sentences of plain text.
   Optionally preceded by a short bold lead-in naming the situation
   ("Import failed"), which acts as the alert's title without being
   a separate heading element.
4. **Action** (optional) — at most one inline link or one low-
   emphasis button, for the single thing the reader would most
   plausibly do next ("Retry import", "Review 3 errors"). More than
   one action means the content belongs somewhere with more room.
5. **Dismiss control** (optional) — an icon-only button at the
   trailing edge that removes the alert.

## Variants

- **Severity** — `success`, `danger`, `warning`, `info`, mapping to
  `color.status.*`, plus a `neutral` variant on `neutral.light` for
  a message with no severity at all (a hint, a tip). Severity picks
  the icon shape as well as the colour.
- **Fill: tinted (default) / solid** — tinted renders the message in
  `text.primary` on a light wash of the status colour, with a 1px
  border and an icon in `color.text.accent.*` (the text-safe
  darkened counterpart — the raw `status.warning` and `status.info`
  values are invisible against a light wash), keeping page text
  legible at body size.
  Solid fills the whole block with the status colour. **Tinted is
  the default**, and deliberately so: this template's pages are
  dense, and a row of solid full-width blocks reads as an emergency
  even when the content is routine. Reserve solid for a single,
  genuinely blocking message.
- **Dismissible / persistent** — whether the dismiss control is
  present. An alert reporting a condition the user cannot resolve by
  reading it (a failed import, a required action) is persistent; a
  confirmation of something already finished is dismissible.

## States

- **Visible** — the default and, for most alerts, the only state.
- **Dismissing** — a short (~150ms) fade and height collapse before
  removal, so the surrounding content does not jump. Skipped
  entirely under a reduced-motion preference.
- **Dismissed** — the element is removed from the DOM, not hidden.
  A hidden-but-present alert stays in the accessibility tree and
  keeps being announced.
- **Action pending** — when the alert's action starts work (a
  retry), the action control shows a busy state and is disabled to
  prevent a double submit; the alert itself does not change
  severity until the work resolves.

`hover`, `focus` and `active` apply only to the alert's own
interactive children (the action and the dismiss control), never to
the container — the container is not clickable, and making the whole
block a click target hides the real action from keyboard users.

## Accessibility rules

- **The role depends on how the alert arrives, and choosing wrong
  either says nothing or interrupts.**
  - An alert **already present when the page loads** (a standing
    notice, an expiring-trial banner) takes no live role at all. It
    is ordinary page content, reachable by reading order, and
    announcing it on load would talk over the page.
  - An alert **inserted in response to something the user did** (a
    save succeeded, a validation summary appeared) takes
    `role="status"` (`aria-live="polite"`), which announces after
    the current utterance finishes.
  - An alert **announcing a genuine, time-sensitive failure the
    user must act on** takes `role="alert"` (`aria-live="assertive"`)
    — this interrupts whatever the screen reader is saying, so it is
    reserved for that case, not used for every `danger` variant.
  - The live region container must exist in the DOM before the
    message is inserted into it. A region that appears at the same
    moment as its content is frequently not announced at all.
- **Colour must not be the only carrier of severity.** Every alert
  has an icon whose *shape* differs per severity, and phrasing that
  states the outcome ("Import failed", not a red block reading
  "Import"). The `warning` variant is the specific case #3 raised
  for filled surfaces, and the same trap applies here.
- **Contrast, per fill:**
  - *Tinted*: `text.primary` on a light wash of the status colour;
    the border, icon and any bold lead-in rendered in the status
    colour use `color.text.accent.*`, not the raw fill value. The
    wash must stay light enough to keep body text at 4.5:1 — verify
    per colour rather than assuming a single opacity works for all
    five.
  - *Solid*: `color.text.on-accent` over `success` and `danger`;
    `color.text.on-accent-dark` over `warning`, `info` and
    `neutral` — white fails AA over those (1.63:1, 1.96:1, 1.05:1).
    Alert text is body-sized, so the 4.5:1 threshold applies.
- **The dismiss control is a real `<button>`** with an `aria-label`
  naming what it closes ("Dismiss import error"), not a bare
  "Close" when several alerts can share a page, and not a `<span>`
  with a click handler.
- **Dismissal must not strand focus.** If focus is inside the alert
  when it is dismissed, move focus to a sensible neighbour — the
  element that follows the alert, or the control that produced it —
  never leave it on a removed node, which drops the user to the top
  of the document.
- **A validation-summary alert links to its fields.** When an alert
  summarises form errors, each listed error is a link that moves
  focus to the offending input. A summary that only counts errors
  without a way to reach them is of little use to a screen-reader or
  keyboard user.
- The alert is **not focusable itself** and takes no `tabindex`.
  Live regions are announced without focus; making the block
  focusable adds a stop in the tab order that does nothing.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **May contain**: one or two sentences of text, an optional bold
  lead-in, an inline list of errors (in a validation summary), at
  most one action, and a dismiss control.
- **Must not contain**: form fields, images, a nested Card, more
  than one action, or paragraphs of explanation — content past two
  sentences belongs on the page, not in an alert.
- **Placement**: at the top of the content area it concerns, below
  the page header and above the content it comments on; or directly
  above the form it summarises errors for. An alert far from its
  subject is easy to miss.
- **Not inside a Card.** An alert speaks for a page or a section,
  and a Card is a self-contained unit — a per-card condition is
  expressed by the Card's own `error` or `empty` state
  (`specs/card.md`), not by embedding an alert in its body. The one
  exception is an alert inside a Modal or Offcanvas panel, which is
  a page-level surface of its own.
- **Stacking**: when several alerts apply at once they stack
  vertically with `spacing.3` between them, most severe first. Past
  three simultaneous alerts, the page has a design problem the
  component cannot solve.
- **References**: uses `specs/button.md` for its action control's
  low-emphasis styling once that spec merges.

## Tokens used

| Token | Usage |
|---|---|
| `color.status.success` / `danger` / `warning` / `info` | severity colour: the wash behind a tinted alert, the fill of a solid one |
| `color.text.accent.*` | border, icon and lead-in of a tinted alert |
| `color.neutral.light` | neutral variant background |
| `color.text.primary` | message text, tinted fill |
| `color.text.on-accent` | message text on solid success / danger |
| `color.text.on-accent-dark` | message text on solid warning / info / neutral |
| `color.text.link` | inline action link |
| `radius.base` | container corners |
| `spacing.3` | vertical padding, gap between stacked alerts |
| `spacing.4` | horizontal padding |
| `spacing.2` | gap between icon and message |
| `font.size.sm` | message text |
| `font.weight.semibold` | bold lead-in |
| `font.lineHeight.base` | message line height |

## Reference visual description

Directly beneath a page title, a full-width rounded rectangle
washed in pale green, outlined by a thin green line. At its left
edge, a small green check glyph sits level with the first line of
text; beside it, in ordinary dark body text, "Settings saved." At
the far right, a faint × that darkens under the pointer. Below it, a
second block in pale red, this one with a warning-triangle glyph, a
semibold lead-in reading "Import failed" followed by a plain
sentence, and a red text link reading "Retry import" — and no × at
all, because the situation has not been resolved by being read.
