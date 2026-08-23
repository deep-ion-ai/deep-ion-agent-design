---
component: code-block
requires: [foundations/typography.md, foundations/iconography.md, foundations/libraries.md]
references: [specs/prose.md, specs/button.md]
---

# Component: Code Block

## Purpose

A fenced block of source code inside an article. Separated from
`specs/prose.md` because it carries behaviour prose does not — a
language label, a copy control, horizontal overflow, and syntax
highlighting supplied by a library this template does not mandate.

Inline code spans are `specs/prose.md`'s, not this component's.

## Anatomy

1. **Container** (required) — `color.chrome.code-bg`,
   `radius.none`, no border and no shadow. May break out from
   `font.measure.prose` to `font.measure.wide`, since code is scanned
   rather than read line by line.
2. **Code** (required) — `font.family.mono` at `font.size.sm`,
   `font.lineHeight.base`, padded `spacing.8`. Tabs render at 2
   spaces.
3. **Language label** (optional) — the language name in
   `font.family.ui` at `font.size.xs`, `color.text.secondary`,
   `font.tracking.wide`, in the block's top trailing corner.
4. **Copy control** (optional) — an icon-only `specs/button.md` in
   the same corner, revealed on hover for pointer users and always
   present for keyboard users.
5. **Highlighted lines** (optional) — a subtle
   `color.accent.wash` band across a line's full width, for drawing
   attention to part of a sample.

## Variants

- **Plain** — no label, no copy control. For a one-line shell
  command, where the chrome would outweigh the content.
- **Labelled** — with a language label.
- **With filename** — the label slot carries a path
  (`src/index.ts`) instead of a language. Useful in a multi-file
  walkthrough, and mutually exclusive with the language label: two
  labels in one corner is clutter.

There is no line-numbers variant. Line numbers get copied along with
the code by most selection behaviour, which makes the sample useless
to paste — and pasting is what a reader wants from a code block.
Where a line must be referenced in the surrounding prose, highlight
it instead.

## States

- **Default** — as described.
- **Copy control hover / focus** — per `specs/button.md`.
- **Copied** — the control's accessible name and visible label change
  to "Copied" for roughly two seconds, then revert. The change is
  announced (see Accessibility rules); a control that silently
  succeeds leaves the reader pressing it again.
- **Overflowing** — a line longer than the container scrolls
  horizontally **within the block**, never widening the page. Code is
  not wrapped: a wrapped line changes the sample's meaning in
  whitespace-sensitive languages and misleads in every other.

## Accessibility rules

- **Real `<pre><code>` markup.** Not a `<div>` of styled spans, and
  never an image of code — an image is unsearchable, unselectable,
  does not scale with the reader's font size, and is invisible to a
  screen reader.
- **The language is recorded on the element** (a `language-*` class
  or equivalent), so tooling and assistive technology can identify
  it. The visible label is a convenience on top, not the record.
- **A horizontally scrolling block must be keyboard-scrollable**,
  which means giving it `tabindex="0"` and an accessible name — a
  scroll container that only a pointer can reach hides code from a
  keyboard user.
- **The copy control names its object**: "Copy code sample", not
  "Copy". Several blocks in one article otherwise produce identical
  controls.
- **The copied confirmation is announced** via a polite live region,
  not by visual change alone.
- **Highlighting must never be the only carrier of meaning.** A
  highlighted line means nothing to a screen reader; if the
  highlighted line matters, the prose says which line and why.
- **Syntax colours must clear 4.5:1 against
  `color.chrome.code-bg` in both themes.** Highlighter themes are
  routinely shipped below that; see `foundations/libraries.md`.

## Composition rules

- **Glyphs**: the copy control's icon comes from
  `foundations/iconography.md`.
- **May contain**: code, and the two optional chrome elements above.
- **Must not contain**: prose, links, or interactive content inside
  the sample.
- **Must not**: be nested inside a `specs/prose.md` blockquote or
  callout — a code sample that needs a warning gets the warning as
  prose above it.
- **Placement**: inside a prose region, as a block-level element.

## Tokens used

| Token | Usage |
|---|---|
| `color.chrome.code-bg` | container background |
| `font.family.mono` | code |
| `font.size.sm` | code |
| `font.size.xs` | language label |
| `font.family.ui` | language label |
| `font.tracking.wide` | language label |
| `color.text.secondary` | language label |
| `color.accent.wash` | highlighted line |
| `font.measure.wide` | maximum width |
| `radius.none` | container corners |
| `spacing.8` | container padding |
| `spacing.component.icon-sm` | copy glyph |

## Reference visual description

A square-cornered panel in warm off-white, wider than the text column
around it, sitting flat on the page with no border and no shadow.
Inside, several lines of monospaced code at a smaller size than the
article's text. In the top right, a tiny grey word — "typescript" —
in spaced-out capitals, and beside it, appearing as the pointer
enters, a small outline of two overlapping rectangles. One line of
the sample sits on a pale violet band running the panel's full width.
A long line runs off the panel's edge, and the panel scrolls sideways
rather than the page doing so.
