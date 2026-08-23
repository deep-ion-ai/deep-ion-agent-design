---
component: subscribe-form
requires: [foundations/typography.md]
references: [specs/button.md]
---

# Component: Subscribe Form

## Purpose

The newsletter sign-up: a heading, a line of explanation, an email
field and a submit. It is the only form this template specifies,
because on a blog it is usually the only form there is.

It is also the template's one commercial ask, and this spec takes a
position on it: **the form does not interrupt an article.** See
Composition rules.

## Anatomy

1. **Container** (required) — `color.surface.muted`,
   `radius.base`, padded `spacing.8`, with **no shadow** and no
   border. It reads as a panel because it is a different surface, not
   because it is raised.
2. **Heading** (required) — `font.family.ui` at `font.heading.h4`,
   `font.weight.semibold`. Says what arrives, not "Subscribe":
   "Get new posts by email".
3. **Description** (optional) — one line at `font.size.sm` in
   `color.text.secondary`, stating **frequency and content** — "About
   one email a month. No spam." This is the sentence that decides
   whether a reader subscribes, and it is the one most often left
   out.
4. **Email field** (required) — a single `<input type="email">`,
   `color.surface.canvas` background, 1px `color.surface.rule`
   border, `radius.base`, padded `spacing.3`, at
   `font.size.base`. With a visible `<label>` — see Accessibility
   rules.
5. **Submit** (required) — a solid `specs/button.md` reading
   "Subscribe".
6. **Message** (conditional) — the success or error line, below the
   field. See States.
7. **Consent note** (optional, required in some jurisdictions) — a
   line at `font.size.xs` in `color.text.secondary` linking to the
   privacy policy.

## Variants

- **Stacked** — label, field, then button on its own row. The
  default, and the only variant below `breakpoint.sm`.
- **Inline** — field and button on one row. For the footer on a wide
  viewport. The label sits above the row and still exists.

## States

- **Default** — as described.
- **Field focus** — a 2px `color.accent.base` ring, offset.
- **Submitting** — the submit takes `specs/button.md`'s loading
  state; the field is not disabled, so a reader can still correct a
  typo they spot mid-request.
- **Success** — the form is **replaced** by a confirmation message in
  `color.status.success` with a check that is not the only signal:
  "Thanks — check your inbox to confirm." Replaced rather than
  cleared, because a form that empties itself looks like it failed.
- **Error** — the message line appears in `color.status.danger`
  below the field, the field takes a `color.status.danger` border and
  `aria-invalid="true"`. The form is not cleared.
- **Already subscribed** — treated as success, not as an error. It
  is not a failure from the reader's point of view, and saying so
  leaks who is on the list.

## Accessibility rules

- **The field has a real, visible `<label>`.** Not a placeholder
  standing in for one: a placeholder disappears the moment the reader
  types, fails contrast in most implementations, and is not reliably
  announced. This is the single most common defect in newsletter
  forms.
- **`type="email"` and `autocomplete="email"`**, so the platform
  offers the right keyboard and the reader's saved address.
- **The message is associated with the field** via
  `aria-describedby`, and rendered in a **polite live region** so it
  is announced when it appears without interrupting.
- **The success state moves focus to the confirmation message**,
  which is what tells a screen reader user the form is gone and the
  action succeeded.
- **The error names what to do**, not what happened: "Enter a valid
  email address", not "Invalid input".
- **Colour is never the only signal** for either message — the
  wording carries it.
- **The form is a real `<form>` with a submit button**, so Enter
  submits from the field.
- **Do not autofocus the field.** On an article page it steals the
  keyboard from a reader who came to read, and on a small viewport it
  can scroll the article out of view.

## Composition rules

- **May contain**: exactly the parts under Anatomy.
- **Must not contain**: more than one field. A newsletter form asking
  for a first name converts worse and collects data most blogs never
  use.
- **Must not be placed inside `specs/prose.md`** — not between
  paragraphs, not "after the third paragraph", and never as a
  scroll-triggered overlay. `specs/prose.md`'s composition rules
  forbid site chrome in the reading column, and this component is the
  main thing that rule exists to keep out.
- **Placement**: in `specs/site-footer.md`, or as a block at the end
  of `patterns/article.md` after the prose region has closed.
- **Uses**: `specs/button.md`.
- **One per page.**

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.muted` | container background |
| `color.surface.canvas` | field background |
| `color.surface.rule` | field border |
| `color.text.primary` | heading, field text |
| `color.text.secondary` | description, consent note |
| `color.accent.base` | focus ring |
| `color.status.success` | success message |
| `color.status.danger` | error message, invalid field border |
| `font.heading.h4` | heading |
| `font.size.base` | field text |
| `font.size.sm` | description, message |
| `font.size.xs` | consent note |
| `radius.base` | container, field |
| `spacing.8` | container padding |
| `spacing.3` | field padding |
| `breakpoint.sm` | where inline collapses to stacked |

## Reference visual description

At the foot of the page, a warm off-white panel with softly rounded
corners sitting flat against the page — no border, no shadow, just a
different shade. Inside, a short bold sans line reading "Get new
posts by email", and under it, smaller and gray, "About one email a
month. No spam." Below that, a small label, then a white field with a
hairline border, and beside it a solid violet button reading
"Subscribe". Nothing about the panel demands attention; it is simply
the last thing on the page.
