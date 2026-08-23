---
component: site-header
requires: [foundations/typography.md, foundations/iconography.md, foundations/theming.md]
references: [specs/button.md]
---

# Component: Site Header

## Purpose

The bar across the top of every page: the site's wordmark, its
top-level navigation, and the theme control. It is the only piece of
persistent chrome this template has — there is no sidebar, and the
footer is not persistent in the same sense.

Its design brief is to be forgettable. On an article page the header
is the thing between the reader and the article, and every pixel it
takes is taken from the reading surface.

## Anatomy

1. **Container** (required) — `spacing.component.header-height`
   tall, `color.chrome.header-bg`, with a 1px `color.surface.rule`
   along its bottom edge and **no shadow**. Its contents are capped
   at `font.measure.page` and centred.
2. **Wordmark** (required) — the site's name at the leading edge, in
   `font.family.ui` at `font.heading.h4`, `font.weight.bold`,
   `font.tracking.tight`. A link to the home page. Text rather than
   an image wherever possible: it scales with the reader's font size,
   it costs no request, and it follows the theme for free.
3. **Navigation** (optional) — up to five top-level links at the
   trailing edge, `font.family.ui` at `font.size.sm`,
   `font.weight.medium`. A blog with more than five top-level
   sections has an information architecture problem this component
   cannot solve.
4. **Theme control** (optional) — an icon-only quiet
   `specs/button.md`, per `foundations/theming.md`.
5. **Menu control** (required below `breakpoint.md`) — an icon-only
   quiet `specs/button.md` that opens the navigation panel.
6. **Navigation panel** (below `breakpoint.md` only) — the links in a
   panel anchored to the trailing edge, on
   `color.surface.canvas` at `radius.lg` with a 1px
   `color.surface.rule` and `shadow.overlay`. This is the **only**
   place in this template that uses a shadow — see
   `tokens/shadows.json` for why it is allowed here.

## Variants

- **Static** — scrolls away with the page. **The default.** On an
  article, the reader wants the words, and a bar that follows them
  down the page takes a slice of every screenful for the whole
  article.
- **Sticky** — pinned to the top. Supported, but a deliberate choice
  a project makes rather than the default. When sticky, the header
  must shrink or the reading surface must be padded to compensate.
- **With / without navigation** — a single-author blog may have only
  a wordmark. The header is not padded out with invented links to
  look fuller.

## States

- **Default** — as described.
- **Navigation link hover / focus** — the label takes
  `color.accent.base` over `duration.state`. Focus adds the ring.
- **Current section** — the link for the section being viewed takes
  `color.text.primary` at `font.weight.semibold` and
  `aria-current="page"`. Weight and colour together, never colour
  alone.
- **Panel open / closed** (below `breakpoint.md`) — the panel
  animates over `duration.layout`; reduced motion makes it instant,
  per `foundations/motion.md`.

## Accessibility rules

- **The header is a `<header>` landmark** containing a `<nav>` with
  an accessible name ("Main"), so a screen reader user can skip it —
  which, on a site whose pages are long articles, they will do
  constantly.
- **A skip link is required**, first in the tab order, jumping to the
  article's content. It may be visually hidden until focused, but it
  must become visible then. Without it, every article page starts
  with the same handful of tab stops.
- **The wordmark links home and its accessible name says so** — the
  site's name is sufficient; "Home" appended is redundant when the
  name is already the link.
- **The current section carries `aria-current="page"`.**
- **The menu control has `aria-expanded` reflecting the panel's
  state** and `aria-controls` pointing at the panel, with an
  accessible name of "Open navigation" / the panel's own close
  control named "Close navigation".
- **The open panel traps nothing.** It is not a modal: Escape closes
  it, focus returns to the menu control, and a click outside closes
  it. Trapping focus in a site menu strands a reader who only wanted
  to glance at it.
- **The theme control is a switch** with an accessible name stating
  what it controls, per `foundations/theming.md`.
- **The header's contents keep a logical DOM order** — wordmark,
  navigation, controls — regardless of how they are positioned.

## Composition rules

- **Glyphs**: the menu, close and theme icons come from
  `foundations/iconography.md`.
- **May contain**: exactly the parts under Anatomy.
- **Must not contain**: a search field, a subscribe form, a social
  row, or a category dropdown. Each is a reasonable thing for a blog
  to have and none of them belongs in the header of a template whose
  brief is to keep the chrome out of the way — they belong in
  `specs/site-footer.md` or on their own page.
- **Uses**: `specs/button.md` for the menu and theme controls.
- **Placement**: at the top of every page, above the content region.

## Tokens used

| Token | Usage |
|---|---|
| `color.chrome.header-bg` | container background |
| `color.surface.rule` | bottom edge, panel border |
| `color.surface.canvas` | navigation panel background |
| `color.text.primary` | wordmark, current section |
| `color.text.secondary` | navigation links at rest |
| `color.accent.base` | link hover, focus ring |
| `font.heading.h4` | wordmark |
| `font.size.sm` | navigation links |
| `font.tracking.tight` | wordmark |
| `font.measure.page` | maximum content width |
| `spacing.component.header-height` | container height |
| `radius.lg` | navigation panel |
| `shadow.overlay` | navigation panel (the template's only shadow) |
| `breakpoint.md` | where navigation collapses |
| `duration.layout` | panel open/close |

## Reference visual description

A white bar the full width of the window, separated from the page
below it by a single hairline and by nothing else — no shadow, no
tint, no border on any other side. At its leading edge, the site's
name in tight bold sans, sized like a small heading. At the trailing
edge, three or four short gray words with generous space between
them, one of them darker and heavier than the rest, and beside them a
small sun glyph in the same gray. On a narrow screen the words are
gone and only three thin stacked lines remain; pressing them slides a
white panel in beneath the bar, its edge marked by a hairline and the
faintest shadow — the only shadow anywhere in this template.
