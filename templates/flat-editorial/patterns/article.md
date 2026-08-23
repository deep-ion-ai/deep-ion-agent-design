---
pattern: article
references: [specs/prose.md, specs/post-meta.md, specs/site-header.md, specs/site-footer.md, specs/table-of-contents.md, specs/subscribe-form.md, specs/article-card.md, specs/tag.md]
---

# Pattern: Article

## Purpose

The single-post page: one article, read start to finish. It is the
page this whole template exists to produce, and the one every other
decision in it was made in service of.

Its composition brief is unusual, and it is worth stating plainly:
**almost everything on this page is subordinate to a single column of
text.** The chrome above it is deliberately forgettable, the
apparatus around it is deliberately quiet, and nothing is permitted
inside the reading column that is not the article.

## Page structure

Top to bottom:

1. **Site header** — `specs/site-header.md`, in its Static variant by
   default. It scrolls away and does not come back.
2. **Article header** — inside the content region, at
   `font.measure.prose`:
   - **Title** — the page's `h1`, in `font.family.ui` at
     `font.heading.display` (stepping to `font.heading.h1` below
     `breakpoint.sm`), `font.lineHeight.display`,
     `font.tracking.tight`. Opened above by `spacing.24`.
   - **Standfirst** (optional) — one or two sentences at
     `font.size.lg` in `color.text.secondary`. Written as a lede,
     not lifted from the first paragraph. It is
     `specs/prose.md`'s **Lede paragraph** variant under another
     name, and it therefore takes `font.family.body` — the serif —
     even though it sits in a header whose title and byline are set
     in the sans. It is reading matter, and
     `foundations/typography.md`'s split assigns the serif by that
     test rather than by position on the page.
   - **Byline** — `specs/post-meta.md` in its Article variant.
3. **Cover image** (optional) — a figure per
   `foundations/imagery.md`, at `font.measure.wide`, between the
   byline and the body. Optional and must be: see that foundation.
4. **Table of contents** (conditional) — `specs/table-of-contents.md`,
   in whichever variant the viewport allows, and only past that
   spec's threshold.
5. **Body** — exactly one `specs/prose.md` region. Everything the
   author wrote, and nothing else.
6. **Article footer** — after the prose region has closed:
   - **Tags** — a row of `specs/tag.md`, where not already in the
     byline. A site picks one location and keeps it.
   - **Author block** (optional) — `spacing.component.avatar-lg`
     portrait, name, and two lines of bio.
   - **Next / previous article** (optional) — one or two links
     naming the adjacent articles by title.
   - **Subscribe** (optional) — `specs/subscribe-form.md`.
   - **Related articles** (optional) — a short row of
     `specs/article-card.md`.
7. **Site footer** — `specs/site-footer.md`.

The content region is centred, capped at `font.measure.page`, with
the text column itself capped at `font.measure.prose` inside it.

## Composition rules

- **Nothing is inserted into the body.** No subscribe form between
  paragraphs, no related-articles block "after the third paragraph",
  no scroll-triggered overlay, no advertisement in the reading
  column. `specs/prose.md` forbids site chrome inside itself and
  `specs/subscribe-form.md` forbids its own placement there; this
  pattern is where both rules are enforced. Everything the site wants
  from the reader waits until the article has ended.
- **One `h1` per page**, the article's title. The body starts at
  `h2`.
- **The article footer's blocks appear in the order listed** — tags,
  author, adjacent articles, subscribe, related. The order runs from
  most about *this* article to most about the site, which is the
  order a finishing reader's attention travels in.
- **The reading measure is never reduced** to make room for a
  sidebar, a share rail, or a table of contents. If the viewport
  cannot hold `font.measure.prose` plus a margin element, the margin
  element moves into the flow or is dropped.
- **No sticky share rail.** This template does not specify one: it
  occupies the margin the measure depends on, it is the element most
  likely to overlap the text at intermediate widths, and its value is
  to the site rather than to the reader.
- **A print stylesheet is expected**, dropping the header, footer,
  contents and subscribe block, and keeping the article. A long-form
  page is printed and saved to PDF more than any other kind, and this
  is the pattern where that is worth the effort.

## Accessibility rules

- **The body is a `<main>` landmark** and the skip link from
  `specs/site-header.md` targets it.
- **The article's title is the page's `h1` and matches the
  `<title>`**, so a reader with several tabs open can tell them
  apart.
- **The heading outline is unbroken** — see
  `foundations/typography.md`. It is what
  `specs/table-of-contents.md` reads and what a screen reader user
  navigates a long article by; on this page it is the primary
  navigation mechanism, not a nicety.
- **The publication date is machine-readable**, per
  `specs/post-meta.md`.
- **Focus is never moved automatically on load.** No autofocus on the
  subscribe field, no scroll-to-anchor that steals focus from the
  top of the article.
- **The reading column's width is expressed in `rem`**, so it narrows
  in characters rather than clipping when text is enlarged to 200%.

## Responsive behavior

- **At or above `breakpoint.lg`**: the title may be set at
  `font.heading.display`; `specs/table-of-contents.md` may take its
  Sidebar variant in the margin; figures, tables and code blocks may
  break out to `font.measure.wide`.
- **Between `breakpoint.sm` and `breakpoint.lg`**: single column, the
  contents list inline, figures breaking out as far as the viewport
  allows.
- **Below `breakpoint.sm`**: the title steps down to
  `font.heading.h1`, horizontal padding tightens, the contents list
  may collapse behind a disclosure, and every figure is full width.
  `font.size.prose` does **not** shrink — a smaller screen is not a
  reason to make reading harder.

## Tokens used

| Token | Usage |
|---|---|
| `font.heading.display` / `font.heading.h1` | article title, by viewport |
| `font.lineHeight.display` | article title |
| `font.tracking.tight` | article title |
| `font.size.lg` | standfirst |
| `font.measure.prose` | reading column |
| `font.measure.wide` | figures, tables, code |
| `font.measure.page` | content region |
| `color.text.secondary` | standfirst |
| `spacing.24` | space above the title and below the last block |
| `spacing.16` | gaps between article-footer blocks |
| `spacing.component.avatar-lg` | author block portrait |
| `breakpoint.sm`, `breakpoint.lg` | the layout thresholds above |

## Reference visual description

A white page opening with a wide band of empty space, then a headline
in heavy tightly-spaced sans running two lines, then a single quiet
grey line with a small round portrait at its start. Below that, a
photograph running wider than everything else on the page. Then the
article: a narrow column of serif text, set large, with wide margins
either side even on a big display — and nothing in those margins but
white. The column runs uninterrupted to its end: no boxes, no
call-outs from the site, nothing asking for an email. Only after the
last paragraph, separated by a wide gap, do a row of small grey
capsules, a portrait with two lines of biography, and a warm off-white
panel offering a newsletter appear in turn.
