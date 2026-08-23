---
foundation: typography
references: [foundations/libraries.md]
---

# Foundation: Typography

## Purpose

In a blog the type is not a component — it is the product. This
foundation defines the two families, how the scale is applied, and
the three numbers that decide whether a long article is comfortable
to read: the size prose is set at, the width its column is capped
at, and the leading between its lines.

Every spec in this template defers to this file for those decisions.
`specs/prose.md` describes what the rendered article body contains;
what it *looks like* is here.

## Two families, two jobs

- **`font.family.body`** — a serif, used for **article prose and
  nothing else**.
- **`font.family.ui`** — a sans, used for **everything that is not
  article prose**: site navigation, article titles and headings,
  bylines, tags, buttons, captions, form labels, footer.

This split is the identity's central typographic decision, and it is
functional rather than decorative: the reader can tell at a glance
what is the article and what is the site around it. Two consequences
follow that are easy to get wrong:

- **Headings inside an article take the UI sans, not the body
  serif.** A serif heading over serif body makes the split invisible
  and the page reverts to looking like an undesigned document.
- **A figure's caption takes the sans**, because it is apparatus
  around the prose rather than prose itself — even though it sits in
  the middle of the text column.

`font.family.mono` is the third family, and it has one job: code.

## The three numbers

**`font.size.prose` (19px).** Article body copy is set here, not at
the 16px an application UI uses. 16px is a size for text that is
*scanned*; continuous prose is *read*, and at a normal viewing
distance a serif needs the extra size to stop feeling cramped. Every
other size in `tokens/typography.json` was chosen in relation to this
one.

**`font.measure.prose` (34rem, ≈68 characters).** The article text
column is capped at this width no matter how wide the viewport gets.
Lines materially longer than about 75 characters are the single most
common reason a blog is uncomfortable to read: the eye loses the
start of the next line on the return sweep. This token has no
counterpart in the `adminlte-classic` template, and the difference
is the point — a dashboard fills the width it is given, and an
article must not.

**`font.lineHeight.prose` (1.7).** Looser than a UI's 1.5, and it
has to be: at a 68-character measure, tighter leading makes that same
return sweep harder. Leading and measure are one decision, not two —
a narrower column can take tighter leading, a wider one needs more.

## What may exceed the measure

`font.measure.prose` binds **text**. Elements that are looked at
rather than read line by line may widen to `font.measure.wide`,
breaking out of the text column and back in:

- figures and images
- code blocks
- tables
- pull quotes

Letting these break out is what gives an article page its rhythm.
Nothing else does it: this template has no shadows and few rules, so
the alternation between a narrow text column and a wider figure is
one of the few structural rhythms available.

## Vertical rhythm

Three tokens carry the whole rhythm of an article body, and they are
defined in `tokens/spacing.json` rather than here because they are
spacing:

- **`spacing.component.prose-block`** — between two block elements
  (paragraph to paragraph, paragraph to list).
- **`spacing.component.prose-heading-top`** — above a heading.
- **`spacing.component.prose-heading-bottom`** — below a heading.

**The asymmetry is deliberate and load-bearing.** The space above a
heading is four times the space below it, so the heading visually
belongs to the text that follows rather than floating between two
sections. On a flat page this grouping has to be made by space,
because there is no rule or colour change available to make it.

## Choosing a heading level

**Level comes from position in the document; size comes from the
scale.** These are separate decisions, and conflating them is the
most common heading defect:

- An article's title is the page's `h1`.
- A section heading inside the article body is an `h2`, the next
  level down an `h3`, and so on, never skipping a level.
- If an `h2` looks too large in a given article, style it smaller —
  do not promote it to an `h3` to get the size you wanted. A screen
  reader user navigating by heading level is reading the outline,
  and an outline with a hole in it is a broken document.

`font.heading.display` is a **size**, not a level. It is what an
article title is set at on a wide viewport; below `breakpoint.sm` the
same `h1` steps down to `font.heading.h1`.

## Rules that hold everywhere

- **Never track body copy.** `font.tracking.tight` applies to the UI
  sans at display and h1 sizes only, where a neo-grotesque set for
  text sizes looks loose at 56px. `font.tracking.wide` applies only
  to small uppercase labels, where it partly compensates for the
  word-shape uppercase destroys.
- **Never set prose lighter than `font.weight.regular`.** A
  light-weight serif at reading size loses its thin strokes.
- **Prose is left-aligned, never justified.** Browser justification
  has no hyphenation dictionary worth relying on and produces rivers
  of white space at this measure.
- **Respect the reader's font size.** Sizes are in `rem`, so a
  reader who has set a larger default gets a larger article. Nothing
  in this template may set a font size in `px`.
- **Numerals in running prose are proportional; numerals in a table
  or a data column are tabular**, so figures line up down a column.

## Accessibility

- **Text must be resizable to 200% without loss of content.** The
  measure is set in `rem`, so the column narrows in characters as
  text grows rather than clipping.
- **A line length limit is an accessibility requirement**, not only
  an aesthetic one — it is what WCAG's "Visual Presentation" asks
  for, and it matters most to readers with dyslexia or low vision.
- **Contrast is stated per token** in `tokens/colors.json`, and every
  value there was verified against the darkest light surface rather
  than against white.
- **Do not communicate anything by typeface alone.** The serif/sans
  split tells a sighted reader what is article and what is chrome; a
  screen reader gets none of it, so the same distinction must exist
  in the document structure — see `specs/prose.md`.

## Tokens used

| Token | Usage |
|---|---|
| `font.family.body` | article prose |
| `font.family.ui` | headings, chrome, captions, controls |
| `font.family.mono` | code |
| `font.size.prose` | article body copy |
| `font.size.lg` | lede paragraph, pull quote |
| `font.heading.display` / `font.heading.h1` | article title, by viewport |
| `font.heading.h2` … `font.heading.h4` | section headings |
| `font.lineHeight.prose` | article body |
| `font.lineHeight.display` | article title |
| `font.measure.prose` | article text column width |
| `font.measure.wide` | figures, code, tables, pull quotes |
| `font.measure.page` | feed and header outer width |
| `font.tracking.tight` | display and h1 sizes |
| `font.tracking.wide` | small uppercase labels |
| `spacing.component.prose-block` | gap between prose blocks |
| `spacing.component.prose-heading-top` / `-bottom` | asymmetric heading spacing |

## Reference visual description

A single column of dark serif text running down the middle of a white
page, noticeably narrower than the window — wide margins on both
sides even on a large display. The text is set large enough to read
leaning back, with generous space between the lines. Above it, the
article's title in a heavy, tightly-spaced sans, several times the
size of the body text and set on two lines that sit close together.
Between sections, a sans heading sits in a large pocket of space, its
own text starting close beneath it. A third of the way down, a
photograph breaks out past the text column on both sides, its caption
in small sans type back at the column's width.
