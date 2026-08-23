---
component: button
requires: [foundations/typography.md, foundations/iconography.md]
references: [specs/subscribe-form.md]
---

# Component: Button

## Purpose

The control a reader presses to make something happen. A blog has
very few: a newsletter form's submit, a code block's copy, a mobile
navigation toggle, a theme switch. This spec is short because the
template's button vocabulary is small on purpose.

The distinction that decides the element:

- A **button** performs an action in place.
- A **link** navigates. It renders as `<a href>`, opens in a new tab
  on middle-click, and is announced as a link.

Most pressable things on a blog are links. When in doubt, it is a
link — a "Read more" that is a `<button>` is a defect, not a style
choice.

## Anatomy

1. **Container** (required) — `radius.base`, padded `spacing.3`
   vertical and `spacing.6` horizontal, no shadow.
2. **Label** (required except icon-only) — `font.family.ui` at
   `font.size.base`, `font.weight.medium`, one line. A verb phrase
   naming the effect.
3. **Icon** (optional) — one, leading or trailing, from
   `foundations/iconography.md`. Decorative when a label is present.

## Variants

### Emphasis

- **Solid** — `color.accent.base` fill, `color.text.on-accent`
  label. The one primary action in its region.
- **Outline** — transparent, a 1px `color.accent.base` border and
  label. Secondary actions.
- **Quiet** — no border, no fill, `color.text.secondary` label.
  For an icon-only control in chrome: the copy control, the menu
  toggle, the theme switch.

**One solid button per view.** On a blog that is almost always the
newsletter submit.

### Size

| Size | Padding | Label |
|---|---|---|
| Default | `spacing.3` / `spacing.6` | `font.size.base` |
| Small | `spacing.2` / `spacing.3` | `font.size.sm` |

### Icon-only

A square button carrying a glyph and no label, at the quiet emphasis.
Requires an accessible name; see below. Used only in chrome, never in
an article.

## States

- **Default** — per variant.
- **Hover** — solid deepens to `color.accent.strong`; outline and
  quiet take a `color.accent.wash` background. Over `duration.state`.
  No size change.
- **Focus** — a visible 2px `color.accent.base` ring, offset from the
  container so the border does not absorb it. Never removed.
- **Active** — the fill deepens for the press's duration.
- **Disabled** — reduced opacity, no hover response. Prefer an
  enabled button that explains what is missing when pressed; a
  disabled button gives no reason for being disabled.
- **Loading** — the label stays visible and a busy indicator replaces
  the leading icon; the container keeps its width so the row does not
  reflow. Further presses are ignored. Needed by
  `specs/subscribe-form.md`, whose submit waits on a network round
  trip.

## Accessibility rules

- **Element choice is not cosmetic.** An action is
  `<button type="button">` (or `type="submit"` in a form); a
  navigation is `<a href>`. A `<div>` with a click handler is never
  acceptable: absent from the tab order, announced as nothing, and
  unresponsive to Enter and Space.
- **An icon-only button requires an accessible name** naming the
  action and its object — "Copy code sample", "Open navigation",
  "Switch to dark theme". The glyph is `aria-hidden="true"`.
- **A labelled button does not repeat its label in an accessible
  name**, which would override the visible text and break voice
  control.
- **Disabled means the `disabled` attribute**, or `aria-disabled`
  with the handler genuinely removed — never a faded button that
  still fires.
- **The focus ring clears 3:1** against the surface behind it, which
  `color.accent.base` does in both themes.
- **Loading is announced**, not only shown: `aria-busy="true"` while
  the button works, and the accessible name does not change mid-
  action.
- **The pressable area is at least
  `spacing.component.tap-target`** on touch platforms, padded beyond
  the visible box.

## Composition rules

- **May contain**: a label, up to one icon, a busy indicator.
- **Must not contain**: another button, a link, or block content.
- **Must not appear inside `specs/prose.md`.** An article's body
  contains links, not buttons — see that spec's composition rules.
- **Referenced by**: `specs/subscribe-form.md` (its submit),
  `specs/code-block.md` (the copy control), `specs/site-header.md`
  (the menu and theme controls).

## Tokens used

| Token | Usage |
|---|---|
| `color.accent.base` | solid fill, outline border and label, focus ring |
| `color.accent.strong` | hover on a solid fill |
| `color.accent.wash` | hover on outline and quiet |
| `color.text.on-accent` | label on a solid fill |
| `color.text.secondary` | quiet label |
| `font.family.ui` | label |
| `font.size.base` / `font.size.sm` | label by size |
| `font.weight.medium` | label |
| `radius.base` | container |
| `spacing.2` / `spacing.3` / `spacing.6` | padding by size |
| `spacing.component.tap-target` | minimum pressable area |
| `duration.state` | hover transition |

## Reference visual description

Beside a newsletter field, a solid violet rectangle with gently
rounded corners and white medium-weight sans reading "Subscribe" —
flat, with no shadow beneath it and no gradient across it. Pressing
Tab draws a violet ring a small gap outside its edge. Elsewhere, in
the site header, a small square control holding only three thin
stacked lines, with no border or fill until the pointer reaches it,
at which point the palest violet appears behind the glyph.
