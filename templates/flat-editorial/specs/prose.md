---
component: prose
requires: [foundations/typography.md, foundations/imagery.md, foundations/iconography.md]
references: [specs/code-block.md, specs/tag.md, specs/table-of-contents.md]
---

# Component: Prose (rendered article body)

## Purpose

The rendered body of an article: the paragraphs, headings, lists,
links, quotes, figures, tables and code that an author wrote in
Markdown or a rich-text editor. It is the one component this template
exists for, and the only one a reader spends minutes rather than
seconds inside.

Prose is **a styling contract over content the component does not
control**. Everything else in this template is composed by a
developer placing named parts; here an author writes whatever they
write, and this spec says how each element that comes out is set. The
practical consequence: every element listed under Anatomy must be
styled, because an author will eventually use it, and an unstyled
`<table>` appearing in the middle of a designed article is the
failure mode this component exists to prevent.

Do not confuse it with two neighbours:

- A **card excerpt** (`specs/article-card.md`) is a short summary set
  in the UI sans at `font.size.base`. It is not prose and must not
  inherit these styles.
- A **standfirst/lede** is the article's opening paragraph at
  `font.size.lg` — part of `patterns/article.md`'s header, not part
  of the body. See Variants.

## Anatomy

Every element below is styled. Sizes, families and rhythm come from
`foundations/typography.md`.

1. **Paragraph** (required) — `font.family.body` at
   `font.size.prose`, `font.lineHeight.prose`, `color.text.primary`,
   capped at `font.measure.prose`. Separated from its neighbour by
   `spacing.component.prose-block`. The first paragraph after a
   heading is not indented and takes no extra space beyond the
   heading's own.
2. **Headings** (`h2`–`h4`) — `font.family.ui`,
   `font.weight.semibold`, `font.lineHeight.tight`, sized from
   `font.heading.*`. `spacing.component.prose-heading-top` above and
   `spacing.component.prose-heading-bottom` below — the asymmetry is
   load-bearing; see `foundations/typography.md`. Each carries a
   stable id and a permalink control (see Accessibility rules).
   **An `h1` never appears inside prose**: the article title is the
   page's only `h1`.
3. **Link** — `color.accent.base`, underlined. See Variants for why
   the underline is not optional.
4. **Emphasis** — `<em>` italic, `<strong>` at `font.weight.bold`.
   Both inherit `color.text.primary`; neither is recoloured.
5. **List** (`ul`/`ol`) — markers outside the text block so the text
   edge stays flush with the paragraphs above and below. Items
   separated by `spacing.2`, nested lists by `spacing.2` again.
   Markers are typographic (a bullet, a numeral), **never an icon
   from `foundations/iconography.md`**.
6. **Blockquote** — indented from the measure's leading edge with a
   2px `color.accent.base` rule on that edge, `color.text.primary`
   at `font.size.prose`, italic. Not centred, not enlarged: a quotation
   is still reading matter.
7. **Pull quote** (optional) — a distinct element from blockquote,
   and the difference matters: a blockquote is *someone else's words*,
   a pull quote is *this article's own words, repeated for emphasis*.
   Set at `font.size.lg` in `font.family.ui`, breaking out to
   `font.measure.wide`, on `color.accent.wash`, square-cornered.
   Because it repeats text already in the article, it is
   `aria-hidden="true"` — see Accessibility rules.
8. **Figure** — an image with an optional caption, per
   `foundations/imagery.md`. May break out to `font.measure.wide`;
   the caption stays at `font.measure.prose`.
9. **Code** — inline code spans in `font.family.mono` at 0.9em of
   their context on `color.chrome.code-bg` with `radius.sm`; fenced
   blocks are `specs/code-block.md`.
10. **Table** — may break out to `font.measure.wide`. Header row on
    `color.surface.sunken` in `font.family.ui` at
    `font.weight.semibold`; body rows separated by 1px
    `color.surface.rule`; cells padded `spacing.3`. Numerals are
    tabular. Scrolls horizontally inside its own container rather
    than forcing the page to.
11. **Horizontal rule** — 1px `color.surface.rule` at
    `font.measure.prose` width, with `spacing.12` above and below. A
    section break, used sparingly.
12. **Callout** (optional) — a short aside: note, tip, warning,
    caution. `color.surface.muted` background, square-cornered, a 2px
    rule on the leading edge in the matching `color.status.*`, a bold
    label line in `font.family.ui`, body in the prose serif. See
    Accessibility rules — the label is not decorative.
13. **Footnote** — a superscript marker linking to a numbered list at
    the article's end, each entry carrying a return link.

## Variants

- **Standard** — as described above; the default and, for most
  articles, the only one.
- **Compact** — `spacing.component.prose-block` reduced one step, for
  a short update or a changelog entry where full article rhythm makes
  three paragraphs look stranded. Sizes and measure do not change.
- **Lede paragraph** — the article's first paragraph at
  `font.size.lg` with `color.text.secondary`. **This is a variant of
  the first paragraph, not a separate component**, and it is opt-in
  per article: applying it automatically to every first paragraph
  produces a lede on articles whose opening sentence was not written
  as one.

**Links are always underlined.** Not on hover — always. Colour alone
does not distinguish a link for a reader who cannot perceive the hue,
and inside a paragraph there is no other cue: no shape, no position,
no surrounding chrome. Removing the underline in body copy is the
most common accessibility defect in blog design, and this template
does not permit it. Underlines may be omitted only where a link is
already unmistakable by position — a navigation item, a card that is
entirely a link.

## States

- **Link default / hover / focus** — default is
  `color.accent.base` underlined; hover deepens to
  `color.accent.strong` over `duration.state`; focus adds the visible
  ring described below. A visited link is not restyled: on a blog it
  would recolour half an article's links to no useful end.
- **Heading hover** — the permalink control becomes visible for
  pointer users. It is always present for keyboard users.
- **Table row hover** — `color.surface.muted`, only where the table
  is interactive. A static data table does not react.
- **Selection** — `color.chrome.selection-bg`. Worth specifying
  because on a long-form page text selection is frequent and visible.
- **Loading and error do not apply.** Prose is server-rendered
  content; a body that is still loading is a page that has not
  rendered.

## Accessibility rules

- **Heading levels descend without skipping**, and are chosen by
  document position, not by desired size — see
  `foundations/typography.md`. The article title is the `h1`; the
  body starts at `h2`.
- **Heading ids are stable and human-readable**, derived from the
  heading text. They are the target of both
  `specs/table-of-contents.md` and every external deep link into the
  article, so an id that changes when the text is edited breaks
  inbound links that already exist.
- **A heading's permalink control has an accessible name naming its
  section** — "Link to section: Installation" — not a bare "Link". A
  page of identical "Link" controls is useless in a screen reader's
  list.
- **Link text describes its destination out of context.** "Read the
  migration guide", never "click here" or a bare "this". Screen
  reader users navigate by link list, where surrounding sentences are
  absent.
- **A link that opens in a new tab or points at a file says so** in
  its accessible name, since the reader is about to lose their place
  in the article.
- **The pull quote is `aria-hidden="true"`.** It repeats text that
  already exists in the article; announcing it makes a screen reader
  user hear the same sentence twice with no indication why.
- **A callout's severity is carried by its label text**, not by its
  edge colour. "Warning:" is read; a coloured rule is not. The
  callout takes no live-region role — it is static content, not an
  event.
- **A table has a real `<caption>` or an accessible name**, `<th>`
  cells with a `scope`, and is never simulated with `<div>`s.
- **A figure's alt text and its caption are different things** — see
  `foundations/imagery.md`.
- **The focus ring is a 2px `color.accent.base` outline with a 2px
  offset**, present on every focusable element in prose. It must
  clear 3:1 against the surface behind it, which the accent does in
  both themes.
- **Footnote markers are links with an accessible name** ("Footnote
  1"), and each footnote entry has a return link back to its marker.

## Semantic skeleton

Structure and roles only — no classes, no styles, no framework.
Reproduce this shape in the target stack's idiom.

```html
<article>
  <!-- The page's only h1; the body starts at h2. -->
  <h1>Why measure matters</h1>

  <p>Opening paragraph.</p>

  <h2 id="the-return-sweep">
    The return sweep
    <a href="#the-return-sweep" aria-label="Link to section: The return sweep">
      <svg aria-hidden="true"><!-- link glyph --></svg>
    </a>
  </h2>
  <p>Body text with a <a href="/guide">descriptive link</a>.</p>

  <!-- Breaks out past the text measure; caption does not. -->
  <figure>
    <img src="/chart.png" alt="Signups doubled after the March release">
    <figcaption>Signups, January to June.</figcaption>
  </figure>

  <!-- Severity is in the LABEL, not only the edge colour. -->
  <aside>
    <p><strong>Warning:</strong> this migration is not reversible.</p>
  </aside>

  <!-- Repeats text already in the article, so it is hidden from AT. -->
  <p aria-hidden="true">A line worth repeating.</p>

  <blockquote><p>Someone else's words.</p></blockquote>
</article>
```

Not visible in the markup: heading ids are stable across edits; links
are underlined at all times, not on hover; and the permalink control
is revealed on pointer hover but always reachable by keyboard.

## Composition rules

- **Glyphs**: the only icon prose uses is the heading permalink, from
  `foundations/iconography.md`. List markers are never icons.
- **May contain**: every element under Anatomy, plus
  `specs/code-block.md` for fenced code.
- **Must not contain**: site chrome of any kind — no
  `specs/site-header.md`, no `specs/subscribe-form.md` injected
  between paragraphs, no `specs/tag.md` (tags belong to
  `specs/post-meta.md`, outside the body). A component that appears
  *within* the reading column interrupts the one thing this template
  is for.
- **Must not contain**: an `h1`, a nested `<article>`, or a second
  prose region.
- **Referenced by**: `specs/table-of-contents.md`, which reads this
  component's heading ids and depends on their stability.
- **Placement**: exactly one prose region per article, inside
  `patterns/article.md`'s content column.

## Tokens used

| Token | Usage |
|---|---|
| `font.family.body` | paragraphs, lists, blockquotes |
| `font.family.ui` | headings, captions, callout labels, table headers |
| `font.family.mono` | inline code |
| `font.size.prose` | body copy |
| `font.size.lg` | lede paragraph, pull quote |
| `font.heading.h2` … `font.heading.h4` | section headings |
| `font.lineHeight.prose` | body copy |
| `font.lineHeight.tight` | headings |
| `font.measure.prose` | text column width |
| `font.measure.wide` | figures, tables, code, pull quotes |
| `color.text.primary` | body copy, headings |
| `color.text.secondary` | captions, lede |
| `color.accent.base` | links, blockquote rule, focus ring |
| `color.accent.strong` | link hover |
| `color.accent.wash` | pull quote background |
| `color.status.*` | callout edge, by severity |
| `color.surface.muted` | callout background |
| `color.surface.sunken` | table header row |
| `color.surface.rule` | table rules, horizontal rule |
| `color.chrome.code-bg` | inline code background |
| `color.chrome.selection-bg` | text selection |
| `radius.sm` | inline code |
| `radius.none` | figures, tables, pull quotes |
| `spacing.component.prose-block` | gap between blocks |
| `spacing.component.prose-heading-top` / `-bottom` | heading spacing |
| `spacing.2` | list item separation |
| `spacing.3` | table cell padding |
| `spacing.12` | space around a horizontal rule |
| `duration.state` | link hover |

## Reference visual description

A column of dark serif text, noticeably narrower than the window,
running down the centre of a white page. Paragraphs are separated by
a clear band of space rather than by indentation. Every link inside
them is violet and underlined, the underline sitting a little below
the baseline and clearing the descenders. A section heading appears
in a heavy sans, in a large pocket of space above it and a small one
below, so it reads as belonging to the paragraph that follows; as the
pointer passes it, a small thin link glyph fades in beside it. Further
down, a photograph runs wider than the text on both sides with a
single line of small gray sans beneath it, pulled back to the text's
width. Near the end, a short quotation sits indented behind a thin
violet vertical rule, in italic serif at the same size as everything
around it.
