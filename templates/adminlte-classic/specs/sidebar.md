---
component: sidebar
requires: [foundations/iconography.md, foundations/imagery.md, foundations/motion.md]
references: [specs/offcanvas.md, specs/badge.md, specs/navbar.md]
---

# Component: Sidebar

## Purpose

The application's primary navigation: a dark, full-height column
pinned to the leading edge of the viewport, listing the sections of
the product and marking which one the reader is in.

`README.md` calls the dark sidebar this template's most recognisable
structural signature, and that is a functional statement as much as
an aesthetic one. The sidebar is the one region that does not change
between pages, and its darkness separates navigation from content so
completely that the reader never has to work out which is which.

It answers three questions at once: what is in this product, where
am I, and how do I get somewhere else. A sidebar that answers only
the third is a menu, and belongs in the Navbar
(`specs/navbar.md`).

## Anatomy

1. **Brand area** (required) — the top block: a logo mark and the
   product name, together acting as a single link to the
   application's home. Separated from the menu below by a divider,
   and always visible, since it doubles as the reader's way back.
2. **Menu filter** (optional) — a single-line input directly beneath
   the brand area that filters the menu items as the reader types.
   Worth including once the menu exceeds roughly fifteen items;
   below that it costs more attention than it saves.
3. **Menu** (required) — the vertical list of navigation items.
4. **Menu item** (required, 1..n) — an icon at the leading edge, a
   label, and — for an item with children — a chevron at the
   trailing edge that rotates when the group opens. An item may also
   carry a trailing Badge (`specs/badge.md`) for a count.
5. **Submenu** (optional) — a nested list revealed beneath its
   parent item, its items indented and rendered without icons, so
   the indentation alone carries the hierarchy.
6. **Section heading** (optional) — a short, non-interactive label
   in `chrome.sidebar-text` at reduced emphasis, grouping items in a
   long menu.
7. **Footer link** (optional) — a documentation or help link pinned
   at the bottom of the column, separated from the menu by space and
   a divider so it does not read as the last navigation item.

## Variants

- **With / without the menu filter** — see Anatomy.
- **Nesting depth: one level of submenu**, and no deeper. This is a
  deliberate cap: a third level cannot be indented enough to be
  legible in a 15.625rem column, and a reader who has to open two
  groups to find a page will not find it. A product needing more
  depth needs a landing page per section, not a deeper menu.
- **Expanded / icon-only** (optional) — the column may collapse to
  an icon-only rail on wide screens, trading labels for content
  width. In that mode every item shows its label in a tooltip on
  hover *and* keeps its accessible name, and items with submenus
  open them as floating panels rather than inline. A project that
  does not need this should omit it rather than build it half way:
  an icon-only rail with no accessible names is unusable.
- **Off-canvas** (required below `breakpoint.lg`) — see States.

## States

- **Item default** — label in `chrome.sidebar-text`, icon at the
  same colour.
- **Item hover** — background `chrome.sidebar-item-hover-bg`, label
  and icon lifting to `chrome.sidebar-text-active`.
- **Item active (current page)** — background
  `chrome.sidebar-item-active-bg`, label and icon in
  `chrome.sidebar-text-active`. Because the hover and active
  backgrounds are the same token, the active item must carry a
  second, non-hover signal — a leading accent bar in
  `brand.primary` along its edge, or a heavier label weight — or the
  current page becomes indistinguishable from whatever the pointer
  happens to be over.
- **Item focus** — a visible focus ring drawn in
  `chrome.sidebar-text-active` (a `brand.primary` ring is too dark
  against `chrome.sidebar-bg` to be seen).
- **Parent item with an active child** — when a submenu is closed
  and the current page is inside it, the parent shows a muted
  version of the active treatment, so the reader can see where they
  are without opening every group.
- **Submenu collapsed / expanded** — the chevron rotates and the
  child list animates open over `duration.layout`; reduced motion is
  handled per `foundations/motion.md`. A submenu containing the
  current page is expanded on load.
- **Off-canvas closed / open** (below `breakpoint.lg`) — the column
  leaves the layout entirely and is reached through the Navbar's
  toggle (`specs/navbar.md`). Open, it is the blocking variant of
  `specs/offcanvas.md`: backdrop, focus trap, Escape to dismiss,
  focus returned to the toggle. It is that component with navigation
  as its content, not a second implementation of the same idea.
- **Filter: no matches** — when the filter matches nothing, the menu
  is replaced by a short message rather than an empty column, and
  the filter input is not cleared.

## Accessibility rules

- The sidebar is a `<nav>` landmark with an accessible name
  ("Main navigation"), so it can be jumped to and skipped. A page
  with more than one `<nav>` — this and the Navbar — requires both
  to be named, or neither is distinguishable.
- **The current page's item carries `aria-current="page"`.** This is
  the programmatic marker; the background and accent bar are the
  visual ones. Marking the parent of the current page as well is
  wrong — use `aria-current="true"` on the parent at most, or
  nothing.
- **Menu items that navigate are `<a href>`**, always, so they can
  be opened in a new tab and are announced as links. Only the
  submenu toggles are `<button>`s.
- **A submenu toggle is a button carrying `aria-expanded` and
  `aria-controls`.** Where an item both navigates *and* has
  children, split it: the label is a link, the chevron is a separate
  toggle button with its own accessible name ("Toggle Reports
  submenu"). One control cannot do both jobs without one of them
  becoming unreachable.
- **A collapsed submenu is hidden from the accessibility tree and
  the tab order**, not merely clipped.
- The menu is a list (`<ul>`/`<li>`), and a submenu is a nested
  list inside its parent's `<li>`, so assistive tech announces the
  count and the nesting. Indentation alone does not convey
  structure.
- **Tab moves between items**; arrow keys are not required. This is
  a navigation list, not a menubar — applying `role="menubar"` and
  its keyboard model to site navigation is a common and costly
  mistake, because it makes every item unreachable by the Tab key
  readers already know.
- **The off-canvas state must trap focus** and must return focus to
  the Navbar toggle on close, per `specs/offcanvas.md`. While open,
  the rest of the page is hidden from the accessibility tree.
- **A skip link** to the main content must exist as the page's first
  focusable element. Without one, every keyboard user tabs through
  the entire menu on every page.
- **The menu filter is a real labelled input** (a visually-hidden
  label or `aria-label`), announces its result count via a polite
  live region, and never removes the currently active item from the
  list — filtering the reader's own location out of view is
  disorienting.
- Contrast: `chrome.sidebar-text` on `chrome.sidebar-bg` must be
  verified at 4.5:1 for the resting state — an inactive item is
  still content to be read, not decoration, and a muted gray on
  near-black is the usual place this fails.
- Icons are `aria-hidden="true"`; the label carries the name. In the
  icon-only rail variant, the accessible name must survive the
  labels being hidden.

## Semantic skeleton

Structure, roles, states and focus order only — no classes, no
styles, no framework. A contract to reproduce in the target stack's
idiom, not markup to paste; on a platform without a DOM, map the
roles onto its own accessibility API.

```html
<nav aria-label="Main navigation">
  <a href="/"><!-- brand mark + product name --></a>

  <ul>
    <li>
      <a href="/orders" aria-current="page">
        <svg aria-hidden="true"><!-- glyph --></svg>
        Orders
      </a>
      <!-- An item that navigates AND has children is split: one
           control cannot do both jobs without one becoming
           unreachable. -->
      <button type="button" aria-expanded="true"
              aria-controls="sub-orders" aria-label="Toggle Orders submenu">
        <svg aria-hidden="true"><!-- chevron --></svg>
      </button>
      <!-- Nested list, so the nesting is announced rather than
           implied by indentation. Absent when collapsed. -->
      <ul id="sub-orders">
        <li><a href="/orders/open">Open</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

Tab moves between items — this is navigation, not a menubar, and
`role="menubar"` would take every item out of the tab order readers
already know. Not visible in the markup: below `breakpoint.lg` the
whole `<nav>` becomes the blocking variant of `specs/offcanvas.md`,
and the current page's item needs a second signal beyond its
background, which is the same token value as hover.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Images**: the brand mark follows `foundations/imagery.md`.
- **May contain**: the brand area, an optional filter, section
  headings, navigation items, one level of submenu, item Badges
  (`specs/badge.md`), and a footer link.
- **Must not contain**: page content, actions that change data, a
  user/account menu, or notification lists. Actions belong in the
  Navbar (`specs/navbar.md`); the sidebar navigates and nothing
  else.
- **Uses**: `specs/offcanvas.md` (blocking variant) for its
  below-`breakpoint.lg` behavior, `specs/badge.md` for item counts.
- **Referenced by**: `patterns/app-shell.md`, which places it in the
  page and defines its relationship to the Navbar and the content
  region. The shell is where "sidebar plus navbar plus content" is
  described; this spec covers only the sidebar itself.
- The sidebar is part of the application shell, not of any page
  pattern. `patterns/dashboard.md` describes what goes *inside* the
  content region and does not restate the shell.

## Tokens used

| Token | Usage |
|---|---|
| `color.chrome.sidebar-bg` | column background |
| `color.chrome.sidebar-text` | item labels and icons at rest |
| `color.chrome.sidebar-text-active` | hover/active/focus label, icon and focus ring |
| `color.chrome.sidebar-item-hover-bg` | item hover background |
| `color.chrome.sidebar-item-active-bg` | active item background |
| `color.brand.primary` | active item accent bar |
| `spacing.component.sidebar-width` | column width |
| `spacing.component.sidebar-padding-x` | horizontal padding of items and brand area |
| `spacing.2` | item vertical padding |
| `spacing.4` | submenu indentation |
| `font.size.sm` | item labels |
| `font.weight.medium` | active item label |
| `font.size.xs` | section headings |
| `breakpoint.lg` | threshold below which the sidebar goes off-canvas |

## Reference visual description

A near-black column running the full height of the window along its
left edge, about a sixth of a wide screen across. At the top, a
small logo mark beside the product name in white, above a faint
dividing line. Below, a list of items in a soft light gray, each
with a small outline icon set at the same distance from the left,
their labels aligned in a single column beneath one another. One
item sits on a slightly lighter panel with its text turned white and
a thin blue bar down its left edge — the page currently open. One
item has a chevron at its right end; it has been opened, and three
indented labels without icons sit beneath it. Far below, separated
by empty space and another faint line, a single item reading
"Documentation".
