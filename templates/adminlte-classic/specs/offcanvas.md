# Component: Offcanvas

## Purpose

A panel that slides in from an edge of the viewport, over the page,
holding content that belongs *alongside* the main view rather than
in place of it: a filter set for the table behind it, a form for
adding a record to the list still visible, a navigation menu on a
small screen.

The distinction from Modal (`specs/modal.md`) is intent, not
mechanics. A modal interrupts: the page cannot proceed until the
reader deals with it. An offcanvas accompanies: it is where the
reader goes to adjust or add something, with the thing being
adjusted still on screen behind it. When the answer to "should the
page behind stay visible and meaningful?" is yes, this is the
component.

Both share the same overlay machinery. Rather than restate it, this
spec **references the shared overlay behavior defined in
`specs/modal.md`'s Accessibility rules** — focus trapping, focus
return, Escape and backdrop dismissal, page scroll locking,
stacking, and hiding the rest of the page from the accessibility
tree. Everything below is what differs.

## Anatomy

1. **Backdrop** (required in the blocking variant, absent in the
   non-blocking one) — the same `color.overlay.backdrop` layer as a
   modal's.
2. **Panel** (required) — a `surface.canvas` surface anchored to one
   viewport edge, spanning that edge's full length, with
   `shadow.raised` elevation. Its corners are square along the edge
   it is anchored to and `radius.lg` on the two that face into the
   page, so the panel reads as attached to the edge rather than
   floating.
3. **Header** (required) — the panel's title as a semantic heading,
   with the close control at its trailing edge.
4. **Close control** (required) — an icon-only Button
   (`specs/button.md`) with an `aria-label`. Required for the same
   reason as a modal's: Escape and the backdrop are invisible
   affordances, and on a touch device an edge-anchored panel is
   easily mistaken for part of the page.
5. **Body** (required) — the panel's content, scrolling internally
   when it exceeds the panel height.
6. **Footer** (optional) — a pinned action row, used when the panel
   holds a form. It stays in view while the body scrolls; a submit
   button that scrolls out of reach is a common failure of long
   panels.

## Variants

- **Edge: end** — anchored to the inline end of the viewport (the
  right side in a left-to-right layout), full viewport height.
  **This is the only edge in scope for this template**, and it is a
  deliberate scoping decision: a single edge keeps the transition,
  the layout, and the responsive rules to one case each, and covers
  the filter/form/menu uses this template needs. Start, top and
  bottom edges are recognised as future work; a project needing one
  should extend this spec rather than improvise, and the bottom edge
  in particular brings its own interaction expectations (drag to
  dismiss, safe-area insets) that this spec does not cover.
- **Width** — a default readable width of roughly 22rem, widening to
  a maximum of about 30rem for denser content. Below
  `breakpoint.sm`, the panel spans the full viewport width, since a
  narrow panel on a narrow screen leaves neither side usable.
- **Blocking / non-blocking** — blocking renders the backdrop, locks
  page scroll, and traps focus, exactly as a modal does.
  Non-blocking omits the backdrop, leaves the page scrollable and
  interactive, and does **not** trap focus — used when the reader is
  meant to work with the page and the panel together (adjusting
  filters and watching the table update). The two differ in
  accessibility behavior, not only in appearance; see below.
  **Blocking is the default**, because a non-blocking panel that
  overlaps content is easy to build and easy to get wrong.

## States

- **Closed** — not rendered, for the same reason as a modal: a
  hidden panel still holds its focusable content in the tab order.
- **Opening** — the panel slides in from its edge over ~200ms while
  the backdrop, if present, fades in. Skipped under a reduced-motion
  preference, which replaces the slide with a plain fade.
- **Open** — the panel is visible and, in the blocking variant,
  holds focus.
- **Closing** — the reverse, after which the panel unmounts and
  focus returns to its trigger.
- **Busy** — while the panel's action is working, that action shows
  the Button loading state; the panel stays open until it resolves,
  then either closes on success or shows an Alert
  (`specs/alert.md`) in place.

## Accessibility rules

- **The shared overlay behavior in `specs/modal.md` applies in
  full** to the blocking variant: `role="dialog"` with
  `aria-modal="true"`, an accessible name from the header title,
  focus moved in on open, focus trapped while open, focus returned
  to the trigger on close, Escape and backdrop dismissal, page
  scroll locked, the rest of the page hidden from the accessibility
  tree, and at most one overlay at a time.
- **The non-blocking variant differs, and the differences are
  requirements, not omissions:**
  - It is `role="dialog"` **without** `aria-modal="true"`, or a
    `role="region"` with an accessible name where it is not
    dialog-like at all. Declaring `aria-modal` on a panel that does
    not actually trap focus tells assistive tech the rest of the
    page is unavailable when it is not.
  - Focus is **not** trapped and the rest of the page is **not**
    hidden. Tab moves out of the panel into the page in DOM order.
  - The panel is placed in the DOM adjacent to the content it
    affects, so tabbing out of it lands somewhere sensible rather
    than at the top of the document.
  - Escape still closes it, and focus still returns to the trigger.
  - Page scroll is not locked.
- **Opening must not steal focus in the non-blocking case** if the
  panel opens as a side effect of something else; move focus only
  when the reader's own action opened it.
- **The panel's title states what it is for** ("Filter orders", not
  "Filters"), since it is the panel's accessible name and may be the
  only thing announced on open.
- **A footer action row must remain reachable** by keyboard while
  the body scrolls — pinned, not merely positioned at the end of a
  long scrolling column.
- **On a viewport narrower than `breakpoint.sm`**, where the panel
  covers the whole screen, it is effectively a modal and must
  behave as one, backdrop and focus trap included, regardless of the
  blocking/non-blocking choice made for wider screens.

## Composition rules

- **May contain**: a form, a filter set, a navigation menu, a detail
  summary, an Alert (`specs/alert.md`), Dropdown Menus
  (`specs/dropdown-menu.md`), and Buttons (`specs/button.md`).
- **Must not contain**: a Modal, another Offcanvas, a Data Table
  wide enough to need horizontal scrolling inside the panel, or the
  page's primary content — a panel is where the reader adjusts what
  is behind it, not where the work itself lives.
- **References**: `specs/modal.md` for all shared overlay behavior.
  A change to focus or dismissal rules is made there, once, and
  inherited here.
- **Referenced by**: `specs/sidebar.md` (once merged) for the
  off-canvas navigation panel the sidebar becomes below
  `breakpoint.lg` — that is this component's blocking variant with
  navigation as its content, not a second implementation of the same
  idea.
- **Relationship to Data Table**: an offcanvas is the natural home
  for a table's filter controls and for adding a record, since the
  table stays visible behind it. Opening a full record for editing
  is a page.

## Tokens used

| Token | Usage |
|---|---|
| `color.overlay.backdrop` | backdrop (blocking variant) |
| `color.surface.canvas` | panel background |
| `color.surface.border` | header and footer dividers |
| `color.text.primary` | title and body text |
| `color.text.secondary` | close control glyph at rest |
| `radius.lg` | the two corners facing into the page |
| `shadow.raised` | panel elevation |
| `spacing.component.card-padding` | header, body and footer padding |
| `spacing.2` | gap between footer actions |
| `font.size.lg` | panel title |
| `breakpoint.sm` | threshold below which the panel spans full width |
| `breakpoint.lg` | threshold at which the sidebar adopts this component |

## Reference visual description

The page dims and a white column slides in from the right edge,
about a third of the screen wide, running from the very top to the
very bottom with its right side flush to the screen edge and its
left corners rounded. At its top, a short bold title and a thin ×.
Beneath, a stack of labelled form fields; if they run long, they
scroll while the title stays put. Pinned across the bottom, two
buttons — an outlined "Reset" and a solid "Apply filters" — that
stay in place no matter how far the fields scroll. Behind the panel,
the table is still legible through the dimming, which is the whole
point of choosing this over a dialog.
