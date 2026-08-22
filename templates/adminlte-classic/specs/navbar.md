---
component: navbar
requires: [foundations/iconography.md, foundations/imagery.md]
references: [specs/dropdown-menu.md, specs/badge.md, specs/button.md, specs/alert.md, specs/sidebar.md]
---

# Component: Navbar

## Purpose

The light bar across the top of the content area, holding the
controls that belong to the *session* rather than to the page: the
sidebar toggle, the reader's account, and whatever has happened
since they last looked.

The division of labour with the Sidebar (`specs/sidebar.md`) is
strict, and worth stating because both are chrome: **the sidebar
navigates the product; the navbar acts on the session.** A control
that takes the reader to a section of the application belongs in the
sidebar. A control that concerns who they are, what has arrived for
them, or how the interface itself is configured belongs here.

Its light fill against the dark sidebar is the second half of the
template's structural signature: the two together frame the content
region without either being mistaken for it.

## Anatomy

1. **Container** (required) — a bar spanning the width of the area
   beside the sidebar, filled with `color.chrome.topbar-bg`, with a
   1px `color.surface.border` bottom edge separating it from the
   content region.
2. **Sidebar toggle** (required) — an icon-only Button
   (`specs/button.md`) at the leading edge. Above `breakpoint.lg` it
   collapses and restores the sidebar; below it, it opens the
   sidebar as an off-canvas panel. Where a project does not
   implement the icon-only rail, the toggle is hidden above
   `breakpoint.lg` rather than left as a control that does nothing.
3. **Page context** (optional) — the current page's title or
   breadcrumb, shown in the navbar only when the content header is
   scrolled out of view. A navbar that duplicates a visible page
   title wastes the row.
4. **Search** (optional) — a single-line input for searching the
   application's data, at the leading end of the free space. It is
   not the sidebar's menu filter, which searches navigation; if a
   project has both, their placeholders must say which is which.
5. **Action cluster** (required) — a group of icon-only controls at
   the trailing edge, in a fixed order (see below). Each is a
   Dropdown Menu trigger (`specs/dropdown-menu.md`) or a plain
   toggle button.
6. **Account control** (required) — always the last item in the
   cluster: the reader's avatar, optionally with their name beside
   it, opening a menu of account actions (profile, preferences, sign
   out). Its fixed position at the trailing edge is what makes it
   findable on every page.

### The action cluster

Order is fixed, because these controls are icon-only and readers
locate them by position:

1. **Notifications** (recommended) — a bell opening a menu of recent
   events, with an unread-count Badge (`specs/badge.md`) on the
   trigger.
2. **Messages** (optional) — the same shape, for direct messages.
   Only where the product actually has them; two near-identical bell
   and envelope icons in products that do not are a source of
   mis-clicks.
3. **Interface toggles** (optional) — colour-mode and fullscreen
   controls.
4. **Account** (required) — last, always.

**Minimum viable scope for this template: the sidebar toggle,
notifications, and the account control.** Search, messages,
colour-mode and fullscreen are recognised extensions, specified here
so that a project adding one does not invent its own placement, but
not required.

## Variants

- **With / without search.**
- **With / without page context.**
- **Account: avatar-only / avatar with name.** Below
  `breakpoint.md`, avatar-only regardless of the wider choice.
- **Condensed** (below `breakpoint.md`) — the bar reduces to the
  toggle, the page context, and the account control; search collapses
  to an icon that expands over the bar, and the remaining cluster
  items move into a single overflow menu. Cramming five icon
  triggers into a phone-width bar leaves none of them reliably
  tappable.

## States

- **Default** — the bar at rest.
- **Trigger hover / focus / active** — per `specs/button.md`, with
  the focus ring visible against `chrome.topbar-bg`.
- **Menu open** — the trigger stays visibly pressed while its menu
  is open, per `specs/dropdown-menu.md`.
- **Sidebar toggle: pressed / not pressed** — the toggle reflects
  the sidebar's current state, not its own. When the sidebar is
  open, the toggle is in its pressed state; both the visual and
  `aria-expanded` follow the sidebar.
- **Unread present / absent** — the notification and message
  triggers show a count Badge only when the count is above zero, per
  `specs/badge.md`.
- **Menu loading** — a notification menu whose contents are fetched
  on open follows `specs/dropdown-menu.md`'s loading state: it opens
  at a stable size with skeleton rows, rather than opening empty and
  resizing under the pointer.
- **Menu empty** — a notification menu with nothing in it opens and
  says so ("No new notifications"). This is the one place the
  dropdown's "disable the trigger when empty" rule is overridden:
  the reader is checking *whether* anything arrived, and a dead
  trigger does not answer that question.
- **Offline / degraded** (optional) — where the application can lose
  its connection, the navbar is the conventional place to say so,
  using an Alert (`specs/alert.md`) directly beneath the bar rather
  than an icon whose meaning must be guessed.

## Accessibility rules

- The navbar is a `<header>` landmark containing the session
  controls; where its cluster is marked up as navigation, that
  grouping is a `<nav>` with its own accessible name ("Account and
  notifications"). A page carrying both this and the sidebar's
  `<nav>` requires both to be named — two unnamed navigation
  landmarks are indistinguishable.
- **The sidebar toggle carries `aria-expanded` and `aria-controls`
  pointing at the sidebar element**, and its accessible name stays
  constant across states ("Toggle navigation"), with `aria-expanded`
  carrying the state.
- **`aria-controls` must reference an element that exists.** Below
  `breakpoint.lg` the sidebar column is unmounted and the off-canvas
  panel takes its place, so the id has to follow: give the panel the
  same id, and where neither is mounted — the panel closed at a
  narrow width — drop the attribute rather than leave it pointing at
  nothing. `aria-expanded` stands on its own. A dangling
  `aria-controls` is an invalid reference, not a harmless one. Renaming it between "Open" and "Close"
  announces the state twice and removes the stable phrase
  voice-control users rely on.
- **Every icon-only trigger needs an `aria-label`** naming what it
  opens, distinctly: "Notifications", "Messages", "Account menu" —
  not three variations of "Menu". Their glyphs are
  `aria-hidden="true"`.
- **Unread counts must be exposed, not merely drawn.** Per
  `specs/badge.md`: either the trigger's accessible name carries the
  whole meaning ("Notifications, 9 unread") with the badge
  `aria-hidden`, or the badge carries visually-hidden text — one or
  the other, never both.
- **A count that changes without the reader acting needs a polite
  live region**, so an arriving message is announced without
  stealing focus. A count that changes because the reader opened the
  menu does not.
- **Every menu follows `specs/dropdown-menu.md` in full** —
  `aria-haspopup`, `aria-expanded`, arrow-key navigation, Escape to
  close, focus returning to the trigger. This spec adds nothing to
  that behavior and must not restate it.
- **The search input is labelled** (visually-hidden `<label>` or
  `aria-label`) and its role is stated: a `role="search"` landmark
  around it where it searches the application's data. Placeholder
  text is not a label — it disappears on the first keystroke.
- **The navbar comes after the skip link in the tab order** and
  before the content region, so the skip link (defined in
  `patterns/app-shell.md`) can bypass both it and the sidebar.
- **The account control is a trigger, not a link.** It opens a menu;
  making the avatar navigate to a profile page while also looking
  like a menu trigger produces a control whose behavior cannot be
  predicted.
- Contrast: icon glyphs at rest use `color.text.secondary` on
  `chrome.topbar-bg`, which must be verified at 4.5:1 — these are
  controls, not decoration. The unread badge follows
  `specs/badge.md`'s per-fill pairing.
- **Touch targets** in the cluster are at least 2.75rem, padded
  beyond the visible glyph. A row of small adjacent icon triggers at
  the top edge of a phone screen is among the easiest things to
  mis-tap.

## Semantic skeleton

Structure, roles, states and focus order only — no classes, no
styles, no framework. A contract to reproduce in the target stack's
idiom, not markup to paste; on a platform without a DOM, map the
roles onto its own accessibility API.

```html
<header>
  <!-- aria-controls must point at an element that exists: the column
       when wide, the offcanvas panel when narrow, and the attribute
       is dropped when neither is mounted. -->
  <button type="button" aria-label="Toggle navigation"
          aria-expanded="true" aria-controls="app-sidebar">
    <svg aria-hidden="true"><!-- glyph --></svg>
  </button>

  <div role="search">
    <!-- Visually hidden — how is the consuming project's business.
         A placeholder is not a label: it leaves on the first keystroke. -->
    <label for="q">Search orders</label>
    <input id="q" type="search" placeholder="Search orders" />
  </div>

  <nav aria-label="Account and notifications">
    <!-- The count lives in the trigger's NAME; the badge is hidden,
         so it is never announced twice. -->
    <button type="button" aria-label="Notifications, 9 unread"
            aria-haspopup="menu" aria-expanded="false">
      <svg aria-hidden="true"><!-- bell --></svg>
      <span aria-hidden="true">9</span>
    </button>

    <button type="button" aria-label="Account menu"
            aria-haspopup="menu" aria-expanded="false">
      <img src="…" alt="" /> Jane Cooper
    </button>
  </nav>
</header>
```

Menu behaviour is `specs/dropdown-menu.md` in full. Not visible in the
markup: the toggle reflects the sidebar's state rather than its own,
and a count that changes without the reader acting needs a polite
live region.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Images**: avatars and other imagery follow
  `foundations/imagery.md`, including the required initials fallback.
- **May contain**: the sidebar toggle, page context, a search input,
  icon-only Dropdown Menu triggers with Badges, interface toggles,
  and the account control.
- **Must not contain**: primary navigation between sections of the
  product (that is the Sidebar's job), page-level actions such as
  "New order" or "Export" (those belong in the content header,
  per `patterns/app-shell.md`, beside the page title they act on),
  or more than roughly five items in the trailing cluster.
- **Uses**: `specs/dropdown-menu.md` (every menu),
  `specs/badge.md` (unread counts), `specs/button.md` (every
  trigger), `specs/alert.md` (a degraded-connection notice beneath
  the bar).
- **Referenced by**: `patterns/app-shell.md`, which places it and
  defines its relationship to the sidebar and content region, and
  `specs/sidebar.md`, whose off-canvas state this bar's toggle
  controls.
- The navbar belongs to the shell, not to any page. A page pattern
  must not add items to it.

## Tokens used

| Token | Usage |
|---|---|
| `color.chrome.topbar-bg` | bar background |
| `color.surface.border` | bottom edge, search input border |
| `color.text.primary` | page context, account name |
| `color.text.secondary` | icon glyphs at rest, search placeholder |
| `color.neutral.light` | trigger hover background |
| `color.brand.primary` | focus ring |
| `color.status.danger` | unread count badge fill (per `specs/badge.md`) |
| `radius.base` | search input corners |
| `radius.pill` | avatar shape |
| `spacing.2` | gap between cluster items |
| `spacing.4` | bar horizontal padding |
| `spacing.3` | bar vertical padding |
| `font.size.sm` | account name, page context, search text |
| `breakpoint.md` | threshold at which the bar becomes condensed |
| `breakpoint.lg` | threshold at which the toggle switches roles |

## Reference visual description

A white strip running along the top of the content area, ending
where the dark column begins, with a hairline along its lower edge.
At its left end, three stacked lines forming a hamburger glyph, in
muted gray. The middle of the bar is empty. At its right end, a
small cluster: a bell with a tiny red circle clinging to its
upper-right corner carrying a white number, then a circular
photograph about the height of the bar's text, with a first name
beside it in dark type. Hovering any of them fills a pale gray
rounded square behind the glyph. Clicking the photograph drops a
small white panel beneath it, its corner aligned to the bar's right
edge rather than to the avatar, so it opens inward over the content.
