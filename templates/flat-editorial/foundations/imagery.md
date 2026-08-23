---
foundation: imagery
references: [foundations/libraries.md, foundations/theming.md]
---

# Foundation: Imagery

## Purpose

A blog carries more imagery than an application does, and it carries
it differently: a photograph in an article is *content*, not
decoration, and it is often the largest thing on the page. This
foundation covers the three kinds this template has — article
figures, cover images, and author avatars — and the rules that keep
them from undoing the restraint the rest of the identity is built on.

## Use real image assets

**Ship real assets — an image file, an SVG, or a generated avatar —
through the platform's own pipeline. Never substitute typographic
characters or emoji for an image**, for the reasons
`foundations/iconography.md` gives.

Two sources, doing different jobs:

- **Editorial assets** — cover images, in-article figures, diagrams.
  Author-supplied, versioned, and sized at build time.
- **User content** — author avatars. These arrive at runtime, may be
  missing, and may fail to load. Every fallback rule below exists for
  these.

## Where the images come from: ask for them

This foundation specifies how an image **behaves** — its aspect
ratio, its corners, its caption, its alt text, its fallback, when it
loads and what happens when it does not. It never specifies **which
image**. The photographs belong to the publication, not to the visual
identity, and no file in this template will ever supply one.

So when a page you are generating calls for a photograph and the
project has not given you one, **ask the user for it**. This is
`/AGENTS.md` rule 6 applied to assets, and asking is the only correct
move available: an agent cannot know what the article is about in the
way a picture editor does, what the publication would actually run,
or what it holds a licence to use.

Ask for four things in one message, rather than one at a time:

1. **The files** — or a path, a bucket, a CMS field, whatever the
   build can read — at the largest size available, so they can be
   resized down here instead of upscaled.
2. **Alt text** for each, or the information each image carries so
   that alt text can be drafted for the user to approve. See
   **Accessibility** below for what makes it good.
3. **Credit line and licence**, and where the credit has to appear
   if it has to appear at all.
4. **Which articles get one**, since a cover is optional by design
   (see **Cover images**) and a publication that illustrates only
   some of its articles is entirely normal.

Until the answer arrives, **build the no-cover path** — the layout
`specs/article-card.md` and `patterns/article.md` are already
required to handle. Do not fill the gap with:

- a grey box, a coloured block, a gradient or a blurred placeholder
  shipped as though it were the image;
- an abstract SVG standing in for a photograph the design asked for.
  A drawing is a legitimate image where the content is genuinely
  diagrammatic, and a poor substitute where it is not;
- a hotlinked stock-photography URL, which puts a third party in the
  page's critical path for the reasons `foundations/libraries.md`
  gives about fonts, and is usually a licence breach besides;
- a generated image presented as a photograph of something real.

A visible gap is honest and gets filled. A plausible stand-in ships.

**Nothing in this foundation limits what may be photographed, how
many photographs a page may carry, or what they may be of.** Every
rule below is about how an image sits on the page once it exists.

## Figures in an article

1. **Width.** A figure may break out of `font.measure.prose` to
   `font.measure.wide`. That alternation between a narrow text column
   and a wider figure is one of the few structural rhythms a flat
   page has — see `foundations/typography.md`.
2. **Corners are square** (`radius.none`). A rounded corner on a
   large image draws attention to the container rather than to the
   photograph.
3. **No shadow, no border, no frame.** The image sits on the page.
   The one exception: an image whose own edges are near-white on the
   light theme may take a 1px `color.surface.rule` so it does not
   bleed into the page.
4. **Caption** (optional) — directly beneath, in
   `font.family.ui` at `font.size.sm`, `color.text.secondary`, at
   the *text column's* width even when the image is wider. A caption
   is apparatus, and pinning it to the measure keeps it readable and
   visibly subordinate.
5. **Aspect ratio is preserved. Always.** A distorted photograph is
   worse than a cropped one.

## Cover images

A cover image is the figure that opens an article and the thumbnail
that represents it in a feed. Two rules:

- **The same asset serves both**, cropped differently. A feed
  thumbnail is not a separate upload.
- **A cover image is optional and must be.** `specs/article-card.md`
  and `patterns/article.md` both render correctly without one — a
  blog whose layout breaks on an article with no cover is a blog that
  will publish bad covers to avoid the gap.

## Avatars

1. **Shape** — a circle (`radius.pill`).
2. **Sizes** — `spacing.component.avatar-sm` in a byline,
   `spacing.component.avatar-lg` in an article's author block.
3. **Fit** — cover-cropped, centred. Never stretched.
4. **Fallback** — when there is no image, or it fails to load, render
   the author's initials in `font.family.ui` on a
   `color.surface.sunken` background at the same size and shape.
   **The fallback is required**, not a nicety. Never a generic
   silhouette, which conveys nothing and reads as an error.

## Dark theme

Images are the one part of a page that theme tokens cannot fix, and
this template says so plainly rather than pretending otherwise:

- **A photograph is not adjusted between themes.** Do not dim,
  desaturate or filter it. A reader came to look at it.
- **A diagram or screenshot with a white background WILL glare on a
  dark page.** The fix is a second asset, not a filter: author
  diagrams as SVG with `currentColor` where possible, or supply a
  dark variant and select it with the theme. This is a rule about
  diagrams, not a reason to prefer them: it does not apply to a
  photograph, and it is not licence to draw an abstract SVG where the
  page called for a picture.
- **A transparent PNG of dark line art disappears on a dark page.**
  Same fix.
- **Never invert an image with a CSS filter.** It turns photographs
  into negatives and misrepresents any diagram that encodes meaning
  in colour.

## Loading, layout and failure

- **Every image reserves its space before it loads** — explicit
  dimensions or an aspect-ratio box. On a text page, an image that
  arrives late and pushes paragraphs down is the most disruptive
  thing that can happen to someone already reading.
- **Images do not fade in.** See `foundations/motion.md`.
- **Serve appropriately sized files**, with a responsive source set:
  a cover image is the heaviest thing most blog pages load.
- **Lazy-load below-the-fold figures; never lazy-load the cover
  image**, which is usually the page's largest contentful paint.
- **Every image handles failure**: avatars fall back to initials, a
  cover falls back to nothing at all. A broken-image glyph must never
  reach the reader.

## Accessibility

- **A figure that carries information needs alt text that conveys
  that information**, not a label. "Chart: signups doubled after the
  March release" — not "chart".
- **A purely decorative image takes empty alt text** (`alt=""`) so it
  is skipped rather than announced.
- **A caption is not alt text.** They serve different readers and
  frequently say different things; a figure may need both. Where the
  caption genuinely says everything the alt would, the image takes
  `alt=""` and the caption carries it — but that is a decision to
  make per figure, not a default.
- **Text baked into an image is unreadable** to a screen reader,
  unsearchable, and does not scale with the reader's font size. A
  quote, a heading or a code sample must be text.
- **Decorative images must not be background images where the
  content matters** — background images are invisible to assistive
  tech and are not printed.

## Composition rules

- **Used by**: `specs/prose.md` (figures), `specs/article-card.md`
  (thumbnail), `specs/post-meta.md` (author avatar).
- **Must not**: invent, substitute or hotlink an image the project
  has not supplied — ask for it, per **Where the images come from**
  above.
- **Must not**: place text over a photograph without a verified
  contrast treatment; this template has no such treatment defined and
  therefore no such component.

## Tokens used

| Token | Usage |
|---|---|
| `font.measure.wide` | maximum figure width |
| `font.measure.prose` | caption width |
| `radius.none` | figure corners |
| `radius.pill` | avatar shape |
| `radius.lg` | image inside a card |
| `color.surface.rule` | optional edge on a near-white image |
| `color.surface.sunken` | avatar initials fallback background |
| `color.text.secondary` | caption text |
| `font.size.sm` | caption text |
| `spacing.component.avatar-sm` / `-lg` | avatar sizes |

## Reference visual description

A photograph running wider than the text column on both sides,
square-cornered, sitting directly on the white page with no frame or
shadow of any kind. Beneath it, pulled back in to the width of the
text above, a single line of small gray sans type. Further down, at
the foot of the article, a small circular portrait beside an author's
name — and where the portrait is missing, a circle of warm gray with
two initials in it, exactly the same size, so the row does not shift.
