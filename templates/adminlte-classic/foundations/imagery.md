# Foundation: Imagery

## Purpose

Defines the images this template uses — avatars, the brand mark, and
the illustrations that appear in empty states — and the rules that
keep them from becoming the least considered part of an otherwise
specified interface.

An admin interface holds little imagery, which is exactly why the
little it holds is conspicuous: a stretched avatar, a logo that
shifts the header as it loads, or a stock illustration in one style
beside icons in another undoes the coherence every other spec builds.

## Use real image assets

**Ship real assets — an image file, an SVG, or a generated avatar —
through the platform's own asset pipeline. Do not substitute
typographic characters or emoji for images**, for the same reasons
`foundations/iconography.md` gives.

Two sources are acceptable, and they are different jobs:

- **Author-supplied assets** — the brand mark, empty-state
  illustrations. These live in the project as versioned files
  (SVG wherever the artwork is vector), sized and optimised at build
  time.
- **User content** — avatars and uploads. These arrive at runtime,
  arbitrary in size and aspect, may be missing, and may fail to load.
  Every rule below about fallbacks exists for these.

Illustrations, where a project uses them, come from **one** set with
a consistent line weight and palette, chosen to sit alongside the
icon set rather than to compete with it. A single mismatched
illustration is more noticeable than none at all.

For generated avatars and image tooling, `foundations/libraries.md`
lists starting points per ecosystem — suggestions, not requirements.

## Avatars

1. **Shape** — a circle (`radius.pill`). Squares are acceptable for
   organisations, but a project picks one and keeps it.
2. **Sizes** — `spacing.component.avatar-sm` (1.5rem) in table rows
   and message threads, `avatar-md` (2rem) in the navbar and list
   items, `avatar-lg` (3rem) in profile headers.
3. **Fit** — cover-cropped to the shape, centred. Never stretched:
   a distorted face is worse than a crop.
4. **Fallback** — when there is no image, or it fails to load, render
   the person's initials on a `neutral.light` background in
   `text.secondary`, at the same size and shape. **The fallback is
   required**, not a nicety: user-supplied images are missing often
   enough that the empty case is a normal state, not an edge case.
   Never fall back to a generic silhouette of a person, which
   conveys nothing and reads as an error.
5. **Colour** — a project may tint the initials fallback per person,
   but the tint must come from the token palette and must keep the
   initials above 4.5:1.
6. **Groups** — overlapping avatar stacks show at most three, with a
   "+N" counter as the fourth position, per `specs/badge.md`'s count
   rules.

## The brand mark

- Rendered as SVG so it stays sharp and inherits colour where the
  artwork allows.
- Reserved a fixed box in the sidebar's brand area
  (`specs/sidebar.md`), so its load does not shift the layout.
- Has an accessible name only when it is the sole content of the home
  link; where the product name is beside it in text, the mark is
  `aria-hidden="true"`.

## Empty-state illustrations

- Optional, and used sparingly — at most one per page. An empty table
  cell does not need a drawing; an empty *page* may.
- Always accompanied by text that says what is missing and what to do
  about it. The illustration never carries the message.
- `aria-hidden="true"`, because the text beside it is the content.
- Sized to no more than a third of the empty region's height, so the
  message stays the focus.

## Loading, layout and failure

- **Every image reserves its space** before it loads — explicit
  dimensions or an aspect-ratio box. Images that arrive and push
  content are the most common source of layout shift in an
  otherwise stable interface.
- **Below-the-fold images load lazily**; above-the-fold ones do not,
  and the brand mark is eager.
- **Every image handles failure**: avatars fall back to initials, the
  brand mark to the product name in text, illustrations to nothing at
  all. A broken-image glyph must never reach the reader.
- **Serve appropriately sized files.** A 1024px avatar rendered at
  2rem is bandwidth spent to look worse.
- Decorative images must not be background images where the content
  matters — background images are invisible to assistive tech and are
  not printed.

## Accessibility

- **Decorative images take `alt=""`** — not a missing `alt`, which
  causes the file name to be announced. An avatar beside a visible
  name is decorative.
- **Content images take alternative text that carries their
  information**, not their appearance. An avatar with no visible name
  beside it takes the person's name as its alternative text.
- Text is never rendered as an image (see
  `foundations/typography.md`).
- Images must not be the only route to information: a chart, a map or
  a diagram carries the requirement stated in its own spec
  (`specs/trend-chart-card.md`, `specs/geo-map-card.md`).
- Respect reduced motion: animated images (GIF, video posters that
  autoplay) are paused or replaced by a still frame.

## Composition rules

- **Referenced by**: `specs/sidebar.md` (brand mark),
  `specs/navbar.md` (account avatar), `specs/direct-chat.md`
  (message and contact avatars), `specs/data-table.md`
  (avatar + name cells), `specs/list-group.md` (leading avatars),
  and any component's empty state that uses an illustration.
- **One illustration set, one avatar shape, one brand mark
  treatment** per project.
- Imagery never carries status. Status is a Badge
  (`specs/badge.md`), a colour token, or text.

## Tokens used

| Token | Usage |
|---|---|
| `spacing.component.avatar-sm` / `avatar-md` / `avatar-lg` | avatar box size |
| `radius.pill` | avatar shape |
| `color.neutral.light` | initials-fallback background |
| `color.text.secondary` | initials-fallback text |
| `color.surface.border` | avatar ring, where one is used |

## Reference visual description

In the top-right of the bar, a small circular photograph, cropped
tight to the face, the same height as the name in text beside it.
Down a message thread, the same circles at a smaller size, each
paired with a name; one of them is not a photograph at all but two
grey letters on a pale disc, and at a glance the difference is barely
noticeable. In the sidebar's top corner, a small solid mark in white
beside the product name, holding its space whether or not it has
loaded.
