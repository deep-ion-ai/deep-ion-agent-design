---
pattern: auth
references: [specs/card.md, specs/text-input.md, specs/checkbox-radio-switch.md, specs/button.md, specs/form-validation.md]
---

# Pattern: Auth (Login / Register)

## Purpose

Describes the page a person reaches before they have an identity in
the product yet: signing in, creating an account, or (by the same
shape) recovering a password. It composes `specs/text-input.md`,
`specs/checkbox-radio-switch.md`, `specs/button.md` and
`specs/form-validation.md` around a single centered Card
(`specs/card.md`).

**This pattern does not render inside `patterns/app-shell.md`.** The
shell's Sidebar and Navbar assume an identity already exists — there
is nothing to navigate to and no account to show in the Navbar's
account control before sign-in. An auth page is its own, simpler
frame: no chrome to compose, no content region to fill. Building it
as "the dashboard shell with the sidebar hidden" produces a page that
half-remembers a product the reader hasn't entered yet; this pattern
is a clean break instead.

## Page structure

1. **Page background** — full-bleed `color.surface.muted`, the same
   token the app shell's content region uses, so the identity reads
   as continuous across the boundary between "before" and "after"
   sign-in, without the shell's sidebar or navbar. Centered on it,
   vertically and horizontally, a single default-variant Card
   (`specs/card.md`).
2. **Brand mark** — at the top of the Card body, a small
   logo/wordmark, the same one the app shell's Sidebar carries.
   Centered, above the heading.
3. **Heading** — a short `h1` (`font.heading.h2` — one step down from
   the app shell's own page-title size, since this Card is a smaller
   canvas than a full content region), naming the page's purpose:
   "Sign in", "Create your account".
4. **Form** — the fields, in reading order:
   - **Login**: email or username (`specs/text-input.md`), password
     (`specs/text-input.md`'s `PasswordInput` variant), a "Remember
     me" Checkbox (`specs/checkbox-radio-switch.md`), and a "Forgot
     your password?" link aligned opposite it on the same row.
   - **Register**: the login fields' equivalents plus whatever
     additional identity fields the product needs (e.g. a name
     field), and a required "I agree to the Terms" Checkbox — see
     Accessibility rules for why this one is never pre-checked.
   Every field's invalid/valid presentation is
   `specs/form-validation.md`'s, not redefined here.
5. **Submit** — a full-width, solid, `primary` Button
   (`specs/button.md`), the single solid action on the page, reading
   "Sign in" / "Create account". Full-width because the Card is the
   entire page's content: there is nothing beside it competing for
   width, unlike a form embedded in a wider page.
6. **Secondary links** — below the submit Button, centered, in
   `font.size.sm`: for Login, "Don't have an account? Register"; for
   Register, "Already have an account? Sign in". Exactly one such
   link — the page offers one alternative path, not a menu of them.

## Variants

- **Login** — email/username + password + remember me.
- **Register** — the above, plus any additional identity fields the
  product collects, plus the required terms agreement.
- **Forgot password** — the same shell, reduced to a single field
  (email or username) and a submit Button reading "Send reset link";
  no password field, no remember-me, no terms.

All three share the same page structure and differ only in which
fields the Form step (4) contains — this pattern does not define a
fourth shape for "forgot password"; it is variant 3 above, not a
separate pattern.

## Composition rules

- The Card is the entire page — it must not itself contain a nested
  Card, a Data Table, or any other components/patterns that assume a
  content region exists around them.
- Do not render the Sidebar, Navbar, or breadcrumb from
  `patterns/app-shell.md` on this page. If a signed-out visitor needs
  a way back to marketing pages, that is a plain link in the Card,
  not shell chrome.
- Register's terms Checkbox and Login's remember-me Checkbox are the
  only Checkboxes this pattern uses; neither is a Switch — both
  belong to a form with its own explicit Submit, so
  `specs/checkbox-radio-switch.md`'s rule about preferring a Checkbox
  over a Switch inside such a form applies directly.
- A page-level authentication failure ("incorrect email or
  password") is not tied to one field, so it is not a
  `specs/form-validation.md` field message — render it as a
  `specs/card.md`-internal banner above the Form step, using
  `specs/form-validation.md`'s Form-level summary variant (an Alert,
  `role="alert"`, per that spec's Accessibility rules), never as a
  message glued to the password field alone.

## Accessibility rules

- The Card's heading is a real `h1` for this page — an auth page has
  no app-shell page title competing with it, so the Card's own
  heading is the page's only, top-level heading.
- **The terms-agreement Checkbox is never pre-checked.** A
  default-checked agreement is not informed consent; the reader must
  take the action themselves.
- The "Forgot your password?" and "Register"/"Sign in" links are real
  `<a href>` elements, navigating to the other pages in this pattern
  — never buttons standing in for navigation, per the same
  element-choice rule `specs/button.md` states for its own component.
- Submitting with an invalid field moves focus to the first invalid
  field, exactly as `specs/form-validation.md` requires generally —
  worth restating here because on a short form like this one it is
  the single most noticeable accessibility behavior the page has.
- The page's `<title>` states which of the three variants it is
  ("Sign in", "Create your account", "Reset your password") — a
  reader using a screen reader who has several tabs open cannot tell
  three auth pages apart by a shared generic title.

## Responsive behavior

- **At or above `breakpoint.sm`**: the Card has a fixed maximum
  width (comfortable for a two-field form — roughly 24rem) and stays
  centered, with visible `color.surface.muted` margin around it on
  larger screens.
- **Below `breakpoint.sm`**: the Card grows to fill the viewport
  width, margins reduced to `spacing.4`, so the page reads as a
  single full-width form rather than a small card floating in a
  large background.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.muted` | page background |
| `color.surface.canvas` | card background (inherited from Card spec) |
| `font.heading.h2` | page heading |
| `font.size.sm` | secondary links |
| `color.text.secondary` | secondary link text (inherited from Button's `link` emphasis) |
| `spacing.4` | page margin below `breakpoint.sm` |
| `breakpoint.sm` | the one layout threshold above |

## Reference visual description

A soft blue-gray field filling the whole window, empty except for one
white card resting in its exact center. Inside the card, a small
logo mark, then "Sign in" in dark, semi-bold type. Below it, two
labeled fields stacked vertically — email, then password with a
small eye glyph at its edge — a checkbox reading "Remember me" beside
a blue "Forgot your password?" link on the same line, then a solid
blue button spanning the card's full width reading "Sign in". Beneath
the button, small centered gray text: "Don't have an account?"
followed by a blue "Register" link. Nothing else is on the page — no
sidebar, no top bar, no navigation of any kind.
