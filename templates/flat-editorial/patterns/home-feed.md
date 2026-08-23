---
pattern: home-feed
references: [specs/article-card.md, specs/pagination.md, specs/site-header.md, specs/site-footer.md, specs/tag.md, specs/subscribe-form.md, patterns/article.md]
---

# Pattern: Home Feed

## Purpose

The index page: a list of articles, newest first, that a reader scans
to decide what to open. It is also the shape an archive page takes —
a tag's articles, a year's articles — with a different heading and a
different source. Those are not separate patterns; see Variants.

Its job is **triage, not reading**. Every decision below follows from
that: the type is smaller than an article's, the layout is a grid
rather than a column, and `font.measure.prose` does not apply, because
nothing here is read line by line.

## Page structure

1. **Site header** — `specs/site-header.md`.
2. **Page header** (optional on the home page, required on an
   archive) — a title in `font.family.ui` at `font.heading.h1`, and
   on an archive a line of context beneath it ("12 articles tagged
   Design systems") in `color.text.secondary`. A personal blog's home
   page may go straight to the feed: a page whose entire content is a
   list of articles does not need a heading that says so.
3. **Lead article** (optional) — the most recent article as a single
   full-width `specs/article-card.md` in its Horizontal variant,
   above the grid. For a site that publishes often enough for the
   newest post to be worth privileging.
4. **Feed grid** — `specs/article-card.md` in its Stacked variant.
   Column count by viewport; see Responsive behavior. Gaps of
   `spacing.8`.
5. **Pagination** — `specs/pagination.md`, beneath the grid.
6. **Subscribe** (optional) — `specs/subscribe-form.md`, between the
   pagination and the footer.
7. **Site footer** — `specs/site-footer.md`.

The whole region is centred and capped at `font.measure.page`.

## Variants

- **Home** — the newest articles across the site, optionally with a
  lead article.
- **Archive** — the same grid filtered by tag, author or date. A page
  header is required here: a reader arriving from a tag link needs to
  be told what they are looking at. May carry a `specs/tag.md` index
  above the grid.
- **Search results** — the same grid, ordered by relevance rather
  than date, with the query echoed in the page header and a result
  count. The empty case is part of this variant, not an afterthought:
  it states what was searched for and offers a way back to the full
  feed.

All three share one page structure and differ in their heading and
their source. This template does not define a fourth shape for any of
them.

## Composition rules

- **`font.measure.prose` does not apply on this page.** It binds
  continuous text; card excerpts are scanned. The constraint here is
  `font.measure.page` on the region and a column count that keeps
  each card narrow enough to read.
- **One card treatment per feed.** Bordered or borderless, stacked or
  horizontal — a grid mixing them reads as a rendering error. The
  lead article is the single permitted exception, and it is
  positioned outside the grid precisely so it reads as deliberate.
- **Cards in a row keep equal height**, with meta pinned to the
  bottom, per `specs/article-card.md`.
- **Articles with no cover image sit in the same grid** as those with
  one, in their Text-only variant. No placeholder rectangles, no
  auto-generated gradient thumbnails, and no reordering the feed to
  group the ones that have images.
- **The feed is chronological in the Home variant.** Not
  algorithmically ranked, not "featured" first beyond the single lead
  slot — a reader returning to a blog is looking for what is new.
- **Must not contain** a `specs/prose.md` region. A feed that renders
  the first article in full is an article page with a list stapled
  to it, and it should be `patterns/article.md`.

## Accessibility rules

- **The feed is a list** (`<ul>` of cards), so assistive technology
  announces how many articles are on the page.
- **Card titles take the heading level the page's outline gives
  them** — an `h2` under a page `h1`, an `h3` if the grid sits under
  a section heading. Never an `h1`: the page's `h1` is its own
  title, not an article's.
- **Each card is one link with one tab stop**, per
  `specs/article-card.md`. On a page of twelve cards this is the
  difference between twelve tab stops and thirty-six.
- **The grid's DOM order matches its visual order**, so keyboard and
  screen-reader traversal follow the reading order at every column
  count.
- **The `<main>` landmark wraps the feed**, and the header's skip
  link targets it.
- **An empty feed says what is missing and what to do** — "No
  articles tagged Design systems yet" with a link to the full feed —
  rather than rendering an empty grid.
- **On paginating, focus moves to the page header or the first
  card**, per `specs/pagination.md`, so a reader is not returned to
  the top of the document.

## Responsive behavior

- **At or above `breakpoint.lg`**: three columns; the lead article,
  where present, spans the full width in its Horizontal variant.
- **Between `breakpoint.md` and `breakpoint.lg`**: two columns; the
  lead article stays horizontal.
- **Below `breakpoint.md`**: one column, and the lead article becomes
  a Stacked card indistinguishable from the rest — at this width the
  privilege it was expressing cannot be shown, and faking it with a
  larger thumbnail just costs the reader a screenful.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.muted` | page background behind the grid |
| `font.heading.h1` | page title |
| `color.text.secondary` | archive context line |
| `font.measure.page` | content region width |
| `spacing.8` | grid gaps |
| `spacing.12` | space between the page header and the grid |
| `spacing.16` | space between the grid and the pagination |
| `breakpoint.md`, `breakpoint.lg` | column-count thresholds |

## Reference visual description

A warm off-white page under a white header bar. Across the top, one
wide white block with a photograph at its leading edge and a headline
beside it. Below, a grid of three columns of white cards, each with a
cropped photograph, a heavy sans headline of one or two lines, two
lines of grey summary, and a faint date pinned to its lower edge — the
cards level with one another regardless of how much text each holds.
One card in the second row has no photograph and simply starts at its
headline, sitting flush in the grid at the same height as its
neighbours. Well beneath the last row, after a wide band of empty
page, a single centred line of small grey words for moving between
pages.
