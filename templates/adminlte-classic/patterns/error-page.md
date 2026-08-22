---
pattern: error-page
references: [specs/button.md]
---

# Pattern: Error Page (404 / 500)

## Purpose

Describes the page a reader lands on when the thing they asked for
does not exist (404) or when the application itself has failed to
respond (500). Both are a large status indicator, one plain-language
sentence explaining it, and exactly one way back — never a Dashboard
page repurposed to show an error, and never a bare, unstyled browser
error page either.

**This pattern does not render inside `patterns/app-shell.md`.**
Same reasoning `patterns/auth.md` gives for its own no-shell rule,
pushed further here: a 404 has nothing meaningful to put in a
breadcrumb (there is no page to name), and a 500 must be renderable
even when the very thing that would populate the shell's chrome — an
account name, a notification count, the data behind the Sidebar's
badges — may be exactly what is broken. A frame that depends on the
same systems the error page exists to route around is not a safe
frame to depend on.

## Page structure

1. **Page background** — full-bleed `color.surface.muted`, the same
   token `patterns/auth.md` uses for the same reason: the identity
   reads as continuous even on a page with no shell. Content is
   centered, vertically and horizontally.
2. **Status indicator** — a large numeral ("404", "500") in
   `font.heading.h1` or larger, `text.secondary`, low enough contrast
   that it reads as a mark rather than as the page's real message —
   the sentence beneath it is that message.
3. **Heading** — a short `h1` (see Accessibility rules for why the
   numeral above is not the heading) naming the problem in plain
   language: "We can't find that page" (404), "Something went wrong
   on our end" (500). Never the bare HTTP status language ("Not
   Found", "Internal Server Error") on its own — a reader is not
   expected to know what those mean.
4. **Supporting line** (optional) — one short sentence of further
   context beneath the heading, where one is genuinely useful ("The
   page may have been moved or deleted.") — omitted rather than
   padded out when there is nothing more to say.
5. **Primary action** — a single solid `specs/button.md`, the only
   action on the page, reading "Back to dashboard" (both variants) or
   "Try again" (500, when a retry is a real option — a reload rather
   than a resubmission of whatever failed). Exactly one action: an
   error page is not the place to offer several paths.

## Variants

- **404 (not found)** — the reader followed a broken or outdated
  link, or mistyped an address, inside the application.
- **500 (server error)** — the application received the request but
  failed to produce a response. Must render from static content the
  client already has — no data fetch of its own — since the same
  failure class that produced the 500 may prevent a fetch from this
  page from succeeding either.

Both variants share the page structure above and differ only in the
numeral, the heading and supporting-line text, and which primary
action reads better — exactly the way `patterns/auth.md` treats its
three variants as one pattern, not as separate documents.

## Composition rules

- Must not assume any app-shell chrome, session state, or fetched
  data is available — see Purpose. This applies most strictly to the
  500 variant: everything on the page ships with the page itself.
- Must not contain a Data Table, a form, a Card grid, or any other
  component that assumes a content region exists around it. The
  entire page is this pattern's own frame, the same constraint
  `patterns/auth.md` places on its own Card.
- Do not render the Sidebar, Navbar, or breadcrumb from
  `patterns/app-shell.md`. If a way back to marketing or support
  pages is needed beyond the primary action, it is a plain secondary
  link beneath the button, not shell chrome.

## Accessibility rules

- **The large numeral is `aria-hidden="true"`.** It is a visual mark,
  not the page's accessible content — a screen reader that announced
  "4 0 4" would convey nothing a reader could act on. The heading
  beneath it is the real `h1` and states the problem in words
  ("Page not found"), so the same information reaches every reader
  either way.
- The heading is a real, page-level `h1` — this pattern has no
  app-shell page title competing with it, exactly as
  `patterns/auth.md` states for its own heading.
- The primary action is a real `<button>` (a reload/retry) or `<a
  href>` (navigating back to a known-good page), per the same
  element-choice rule `specs/button.md` states generally — never a
  styled `<div>` standing in for either.
- The page's `<title>` states which error it is ("Page not found",
  "Something went wrong") rather than a shared generic title, so a
  reader with several tabs open — or one relying on a screen reader's
  list of open tabs — can tell them apart.

## Responsive behavior

- **At or above `breakpoint.sm`**: content block has a comfortable
  maximum width (similar to `patterns/auth.md`'s Card) and stays
  centered, with visible `color.surface.muted` margin on larger
  screens.
- **Below `breakpoint.sm`**: margins reduce to `spacing.4`; the
  numeral's size steps down so it never forces horizontal scrolling
  on a narrow viewport. No other layout change — this page has no
  sidebar to collapse and no grid to reflow.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.muted` | page background |
| `color.text.secondary` | large status numeral |
| `color.text.primary` | heading and supporting line |
| `font.heading.h1` | status numeral (or larger, at the generating agent's judgment) |
| `font.heading.h2` | heading |
| `font.size.base` | supporting line |
| `spacing.4` | page margin below `breakpoint.sm` |
| `breakpoint.sm` | the one layout threshold above |

## Reference visual description

A soft blue-gray field filling the whole window, empty except for a
small centered block. A large, pale gray "404" sits above a short
line of dark, semi-bold text: "We can't find that page." Beneath
that, in lighter regular type, "The page may have been moved or
deleted." A solid blue button reading "Back to dashboard" sits below,
centered, with nothing else on the page — no sidebar, no top bar, no
navigation of any kind. The 500 variant is identical in every
respect except the numeral and the two lines of text.
