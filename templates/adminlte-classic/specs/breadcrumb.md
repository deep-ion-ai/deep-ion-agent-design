# Component: Breadcrumb

## Purpose

A single line naming the path from the application's home to the
page the reader is on. It answers "where am I?" and offers one click
back to each level above.

It is orientation, not navigation. The Sidebar (`specs/sidebar.md`)
is how a reader moves between sections; a breadcrumb tells them
where the current page sits in the structure they moved through. Two
consequences follow: it never carries the page's primary navigation,
and a product whose pages are all one level deep does not need one —
a breadcrumb reading "Home / Dashboard" on every page is decoration
that costs a line of vertical space.

Use it when pages nest at least two levels below home, and use it
consistently once adopted: a trail that appears on some pages and
not others is worse than none, because its absence stops meaning
anything.

## Anatomy

1. **Container** (required) — a single horizontal line of items,
   placed above the page title in the content header (see
   `patterns/app-shell.md`).
2. **Ancestor item** (required, 1..n) — a link to a page above the
   current one, in `color.text.secondary`, in the order they nest,
   starting with the application's home.
3. **Separator** (required, between items) — a small glyph (a
   chevron or slash) in `color.text.secondary` at reduced emphasis.
   Decorative; see Accessibility rules.
4. **Current item** (required) — the page the reader is on, last in
   the line, in `color.text.primary`. It is text, never a link: a
   link to the page already showing does nothing.

## Variants

- **Standard** — the full trail, every ancestor shown. The only
  variant this template requires, and adequate for the two- and
  three-level hierarchies an admin application typically has.
- **Truncated** — *not specified here, and this is a known gap.*
  Where a trail is long enough to wrap, the usual treatments are to
  collapse the middle into an overflow control or to show only the
  immediate parent. This template does not define either, because a
  trail long enough to need it is a signal the information
  architecture is too deep rather than that the component is
  missing a feature. A project that genuinely needs truncation
  should extend this spec rather than improvise, and specify the
  keyboard behavior of whatever control it adds.

## States

- **Ancestor hover / focus** — the link takes `color.text.link` and
  an underline, with a visible focus ring. The underline matters:
  these links are set in secondary-coloured text at small size, and
  colour alone is a weak signal that they are links at all.
- **Current item** — no interactive state. It is not focusable, not
  hoverable, and does not respond to the pointer.
- **Loading** — when a page's ancestry is not yet known, the
  breadcrumb renders a skeleton line of the expected width rather
  than appearing after the title has already been read. A trail that
  pops in shifts the page header down under the reader's eye.

`disabled` and `active` do not apply — the component holds links and
text, nothing that can be pressed or turned on.

## Accessibility rules

- The container is a `<nav>` with `aria-label="Breadcrumb"`,
  wrapping an ordered list (`<ol>`) with one `<li>` per item. The
  ordered list is what conveys that the items are a sequence rather
  than a set of unrelated links.
- **The current item carries `aria-current="page"` and is not a
  link.** Both halves matter: a linked current page gives the reader
  a control that does nothing, and an unmarked one leaves the
  sequence with no indication of where it ends.
- **Separators are not content.** They are drawn with CSS (a
  generated glyph or a background) or marked `aria-hidden="true"`,
  and never placed in the DOM as text between the links, where a
  screen reader reads "Home slash Orders slash Order 1029" and a
  screen-magnifier user sees glyphs that look selectable.
- The trail is placed **before** the page title in the DOM, matching
  its visual order, so the reading order is location-then-page
  rather than the reverse.
- A page carrying a breadcrumb `<nav>`, a sidebar `<nav>` and a
  navbar `<nav>` needs all three named. This one's name is fixed as
  "Breadcrumb", which assistive tech is already familiar with.
- **The trail is not a substitute for a page title.** The current
  item repeats the page's name, but the `<h1>` is what a screen
  reader user navigates by. A page must have both.
- Link text is the ancestor page's own name, not a shortened or
  invented label. "Orders", not "Back".
- Targets: the links sit close together on one line, so each needs
  vertical padding taking its hit area to at least 2.75rem on touch,
  even though the line itself is visually tighter.

## Composition rules

- **May contain**: ancestor links, separators, and the current
  page's name.
- **Must not contain**: actions, a dropdown of sibling pages, the
  page title itself, or more than one line — a breadcrumb that wraps
  has become a paragraph.
- **Placement**: in the content header defined by
  `patterns/app-shell.md`, directly above the page title, sharing
  the content region's horizontal padding so it aligns with the
  title beneath it. It sits inside the content region, not in the
  Navbar — except where the Navbar shows page context after the
  header scrolls away (`specs/navbar.md`), in which case that is the
  navbar's copy of the trail, not a second breadcrumb.
- **Relationship to the Sidebar**: the first ancestor of a trail is
  normally the section the sidebar marks as current. When the two
  disagree, the sidebar is wrong — it must mark the section the
  current page actually belongs to.
- **Referenced by**: `patterns/app-shell.md`.

## Tokens used

| Token | Usage |
|---|---|
| `color.text.secondary` | ancestor links and separators at rest |
| `color.text.link` | ancestor link on hover/focus |
| `color.text.primary` | current page item |
| `color.brand.primary` | focus ring |
| `spacing.2` | space either side of a separator |
| `spacing.2` | space between the trail and the page title |
| `font.size.sm` | all items |
| `font.lineHeight.dense` | single-line height |

## Reference visual description

Immediately above a large dark page title, a short line of small
gray text: "Home", a faint chevron, "Orders", a faint chevron, then
"Order #1029" in the same dark tone as the title below it. Passing
the pointer over "Orders" turns it blue and draws a line under it;
the last item does not react at all. The line sits flush with the
title's left edge, and the gap between the two is small enough that
they read as one block rather than as two separate rows.
