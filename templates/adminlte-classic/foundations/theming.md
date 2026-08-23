---
foundation: theming
references: [foundations/libraries.md, foundations/motion.md, foundations/iconography.md, foundations/imagery.md]
---

# Foundation: Theming (light and dark)

## Purpose

This template ships two themes. `tokens/colors.json` holds the
default, light one; `tokens/colors-dark.json` holds a dark override at
`color.dark.*`, and `tokens/shadows.json` carries `shadow.dark.*`
alongside its light values.

This file states what a theme is allowed to change, what it is not,
and how a target stack is expected to apply one. Individual specs do
not restate any of it: a spec names a token, and the theme decides
what that token resolves to. No spec in this template contains a
light value and a dark value side by side, and none should.

## The token contract

**For every light value at `color.<path>` there is a dark value at
`color.dark.<path>`, and nothing else.** The dark file is a mirror of
the light one, not a second independent palette. If you are adding a
colour, add it to both, or it is not a token — it is a hardcoded value
that will be wrong in one theme.

The same holds for `shadow.dark.*`, with one deliberate omission:
`shadow.none` has no counterpart, because it is the same absence in
either theme.

A spec always names the **light** path — `color.surface.canvas`,
never `color.dark.surface.canvas`. Resolving that to the dark value
when the dark theme is active is the implementation's job, described
below. A spec that reaches for a `color.dark.*` path directly has
hardcoded a theme into a document that is supposed to be
theme-independent; the two places in this template that name dark
paths are this file and `tokens/colors-dark.json` itself.

## What a theme may change, and what it may not

Only colour and shadow. Specifically:

| Token group | Theme-dependent? |
|---|---|
| `color.*` | **Yes** — mirrored in full |
| `shadow.*` | **Yes** — `card` and `raised` mirrored |
| `spacing.*` | No |
| `radius.*` | No |
| `font.*` | No |
| `breakpoint.*` | No |

A theme that changes spacing, corner radii or type is not a theme —
it is a second template, and belongs in `templates/` as its own
entry with its own id. The same applies to the rules in
`foundations/iconography.md` and `foundations/imagery.md`: the icon
set, its stroke weight and its sizes are identical in both themes, as
are the avatar shape and fallback rules. Only their *colour* changes,
and it does so by inheriting `currentColor`, which those foundations
already require.

## Dark is not light with the colours inverted

Four things go wrong when a dark theme is produced by inverting
values rather than by re-deriving roles. Each of them is visible in
`tokens/colors-dark.json`:

1. **Accents used as text move the opposite way.** The light theme
   *darkens* its accents into `color.text.accent.*` so they are
   legible on a light page. Inverting the surfaces without
   re-deriving that group leaves every accent word darker than the
   surface behind it. The dark set lightens them instead — and
   `status.warning` and `status.info`, the two the light theme had to
   darken most severely (raw `#ffc107` is 1.63:1 as text on white),
   need no adjustment at all on dark, where they land at 8.73:1 and
   7.27:1. The pairing that fails in one theme is frequently the one
   that works in the other.

2. **`neutral.light` and `neutral.dark` swap.** Both are defined by
   role, not by lightness: `light` is the subtle surface a half-step
   from the page, `dark` is the high-contrast fill opposite it. On a
   dark page, the high-contrast fill *is a light colour*. Carried
   over unchanged, a `dark` Button measures 1.07:1 against
   `surface.canvas` and disappears.

3. **Which `on-accent` token an accent takes is itself
   theme-dependent.** Because `neutral.dark` inverts, a fill that
   took `text.on-accent` (white) in the light theme takes
   `text.on-accent-dark` in this one. Every filled-surface component
   — `specs/stat-callout.md`, `specs/badge.md`, `specs/alert.md`,
   `specs/button.md` — must pick between the two per theme, exactly
   as `tokens/colors.json` already tells it to pick per accent.

4. **Shadows stop working.** A shadow is a darkening; darkening a
   near-black surface does close to nothing. In this theme, elevation
   is carried by the step between `color.surface.muted` and
   `color.surface.canvas`, and a floating panel additionally needs a
   1px `color.surface.border` that the light theme could treat as
   optional — its shadow alone was enough there.

What does **not** need re-deriving: the accent fills themselves.
`brand.primary`, `status.danger` and the rest are byte-identical
across the two files, because a solid fill's contrast obligation is
against its own label, not against the page behind it.

## Contrast is re-verified per theme, not assumed

Every value in `tokens/colors-dark.json` carries its measured ratios
in its `$description`, the way the light palette already does, and
each was chosen against the **worst** surface it can land on rather
than the most flattering one — `text.secondary` is picked for the
4.63:1 it holds on a table's hover row, not the 5.95:1 it enjoys on
the page background.

Two properties are shared between the themes rather than fixed in
one:

- **Dividers are decorative.** `surface.border` is 1.30:1 on light and
  1.34:1 on dark. Neither clears 3:1, and neither needs to: the
  non-text obligation lands on focus rings, and on any border that is
  the only thing identifying a control. Those draw from the accent
  tokens.
- **The focus ring is drawn from the accent-as-text group in both
  themes**, since that is the group derived against the page rather
  than against a fill. On dark, raw `brand.primary` as a ring
  measures 3.67:1 against `surface.canvas` — over the floor, with
  nothing in hand — which is why `color.dark.text.accent.primary`
  is the ring colour there.

## Applying a theme

The template mandates the token contract and the behaviour below. It
does **not** mandate a mechanism — same position
`foundations/libraries.md` takes on libraries, and for the same
reason: the right mechanism depends on a stack this template cannot
see.

On the web, the usual shape is one set of CSS custom properties
emitted from the light tokens, re-declared from the dark tokens under
a `[data-theme="dark"]` selector and/or a
`prefers-color-scheme: dark` media query, with every component
reading the property rather than a literal. On a platform without a
DOM, map the same two sets onto whatever that platform's theming
primitive is. What matters is that **components read tokens, and only
the token layer knows which theme is active** — a component that
branches on the theme itself is a component that will be missed when
a third theme arrives.

Required behaviour, whatever the mechanism:

- **Honour the system preference on first load.** A reader who has
  set their OS to dark should not get a light flash and then have to
  find a switch.
- **Remember an explicit choice, and let it override the system
  preference.** Someone who picks light on a dark-set machine means
  it.
- **Never ask twice.** A theme prompt on every visit is a bug.
- **Switch without a reload**, and without losing scroll position,
  form state, or an open Modal.
- **Set `color-scheme` (or the platform equivalent)** so that
  scrollbars, form controls the platform draws itself, and the
  browser's own UI follow the theme. A dark page with a light native
  scrollbar and white-flashing native selects is the most common
  half-finished dark mode.
- **The theme control is a Switch or a toggle group**, per
  `specs/checkbox-radio-switch.md`'s rule — it applies immediately
  and has no Save button — and it needs an accessible name that
  states what it controls, not just "Dark".

## Accessibility

- **Both themes are held to the same floor**: 4.5:1 for body text,
  3:1 for a focus ring or for a border that identifies a control.
  Shipping a dark theme that only *mostly* clears it is worse than
  shipping none, because it will be the default for every reader
  whose system is set that way.
- **Respect `prefers-contrast` independently of the theme.** They are
  different requests, and a dark theme is not a substitute for a
  high-contrast one.
- **Do not animate the theme switch.** A full-page colour transition
  is exactly the kind of large-area motion that causes trouble, and
  it delays the thing the reader asked for. See
  `foundations/motion.md`.
- **Theme is never the only carrier of meaning**, which follows from
  the rule this template states repeatedly for colour: a status that
  reads as danger in one theme reads as danger in the other, because
  the icon shape and the wording carry it too.

## Tokens used

| Token | Usage |
|---|---|
| `color.dark.surface.canvas` | dark card/panel surface |
| `color.dark.surface.muted` | dark content-region background |
| `color.dark.surface.border` | dark dividers |
| `color.dark.text.primary` | dark body text |
| `color.dark.text.secondary` | dark supporting text |
| `color.dark.text.accent.primary` | dark accent text and focus rings |
| `color.dark.neutral.light` | dark subtle surface and row hover |
| `color.dark.neutral.dark` | dark high-contrast fill (inverted) |
| `shadow.dark.card` | dark card elevation |
| `shadow.dark.raised` | dark floating-panel elevation |

## Reference visual description

The same dashboard, twice. In the light theme, near-white cards
floating on a soft blue-gray page beside a near-black sidebar. In the
dark theme, the page is very nearly black, the cards sit one clear
step above it in a slightly blue-tinged charcoal, and the sidebar —
which was the darkest thing on the screen — is now darker still than
the page, so it still reads as chrome. Body text is a soft off-white
rather than pure white. The blue of a primary button is the identical
blue in both, and the same white sits on it; but the blue of a *link*
is visibly lighter in the dark theme than in the light one. The amber
"Pending" badge is unchanged in both, still carrying near-black text.
Card edges, which were defined by a shadow in the light theme, are
defined by the step in surface colour here, with a hairline border
doing the rest.
