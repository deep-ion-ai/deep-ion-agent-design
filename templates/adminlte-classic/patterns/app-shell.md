# Pattern: App Shell

## Purpose

Describes the frame every page of an admin application is rendered
inside: the dark Sidebar (`specs/sidebar.md`) on the leading edge,
the Navbar (`specs/navbar.md`) across the top of the remaining
space, and the content region beneath it.

The shell is defined once, here, rather than inside each page
pattern, because it does not change between pages. Page patterns
such as `patterns/dashboard.md` describe what fills the content
region and say nothing about the frame around it. When shell
behavior changes — how the sidebar collapses, where the page title
sits — it changes in this file and every page inherits it.

## Page structure

1. **Sidebar** — a full-height column pinned to the leading edge,
   `spacing.component.sidebar-width` wide, filled with
   `color.chrome.sidebar-bg`. Defined in `specs/sidebar.md`. It does
   not scroll with the page: the content region scrolls beneath a
   sidebar that stays put, so navigation is always reachable.
2. **Navbar** — a bar across the top of the area beside the sidebar,
   filled with `color.chrome.topbar-bg`. Defined in
   `specs/navbar.md`. It carries the sidebar toggle at its leading
   edge and the account and notification controls at its trailing
   edge.
3. **Content region** — everything else: `color.surface.muted`
   background, horizontal padding of `spacing.8` on large screens
   and `spacing.4` below `breakpoint.md`. This is the only region a
   page pattern controls.
4. **Content header** — at the top of the content region, the page
   title (`h1`, `font.heading.h1`, `font.weight.semibold`) with an
   optional one-line description in `color.text.secondary`, and the
   Breadcrumb (`specs/breadcrumb.md`) placed above or beside it as
   that spec defines. Page-level actions, when a page has them, sit
   at the trailing edge of this header, aligned with the title.
5. **Skip link** — the page's first focusable element, visually
   hidden until focused, moving focus past the sidebar and navbar to
   the content region. Required; see Composition rules.

## Composition rules

- A page pattern owns the content region and nothing else. It must
  not describe, restyle, or place elements in the sidebar or navbar
  — a page that needs a control in the shell needs the shell spec
  changed, so that every page gets the same treatment.
- There is exactly one Sidebar and one Navbar per page.
- The content region is the page's `<main>` landmark, with the
  sidebar and navbar as `<nav>` and `<header>` landmarks outside it.
  The three landmarks together are what let a screen-reader user
  move between chrome and content directly.
- The skip link is required, not optional. Without it a keyboard
  user tabs through every navigation item on every page before
  reaching the content.
- Only the content region scrolls. A page that scrolls the whole
  window instead moves the sidebar and navbar out of reach, which is
  the reason for pinning them.
- Page patterns that render inside this shell:
  `patterns/dashboard.md`.

## Responsive behavior

- **At or above `breakpoint.lg`** — the sidebar is a persistent
  column; the content region occupies the remaining width. The
  navbar's toggle collapses the sidebar to the icon-only rail if the
  project implements that variant, or is hidden if it does not.
- **Below `breakpoint.lg`** — the sidebar leaves the layout and is
  reached through the navbar's toggle, opening as the blocking
  variant of `specs/offcanvas.md` with a backdrop and a focus trap.
  The content region spans the full width.
- **Below `breakpoint.md`** — the content region's horizontal
  padding drops to `spacing.4`, and the navbar reduces to the
  toggle, the page context, and the account control; secondary
  navbar items move into a menu.

## Tokens used

| Token | Usage |
|---|---|
| `color.chrome.sidebar-bg` | sidebar column background |
| `color.chrome.topbar-bg` | navbar background |
| `color.surface.muted` | content region background |
| `color.surface.border` | divider beneath the navbar |
| `font.heading.h1` + `font.weight.semibold` | page title |
| `color.text.secondary` | page description |
| `spacing.component.sidebar-width` | sidebar column width |
| `spacing.8` | content region horizontal padding, large screens |
| `spacing.4` | content region horizontal padding below `breakpoint.md` |
| `breakpoint.md`, `breakpoint.lg` | the two layout thresholds above |

## Reference visual description

The window divides into two: a near-black column down the left side,
and everything else. Across the top of that remaining space sits a
white bar carrying a hamburger glyph at its left end and a small
cluster of icons and a name at its right, with a hairline beneath
it. Below the bar, the soft blue-gray content area begins, indented
from both edges, starting with a large dark page title. Scrolling
the content moves only that area — the dark column and the white bar
stay exactly where they were. Narrowing the window past a point makes
the dark column disappear entirely; pressing the hamburger slides it
back over the page with the content dimmed behind it.
