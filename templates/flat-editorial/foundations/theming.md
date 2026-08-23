---
foundation: theming
references: [foundations/libraries.md, foundations/motion.md]
---

# Foundation: Theming (light and dark)

## Purpose

This template ships two themes. `tokens/colors.json` holds the
default, light one; `tokens/colors-dark.json` holds a dark override
at `color.dark.*`, and `tokens/shadows.json` carries `shadow.dark.*`.

A blog needs dark mode more than most product surfaces do: people
read long articles at night, and a reader who has set their system to
dark and is handed a full-brightness page of prose will usually
leave. This file states what a theme may change, what it may not, and
how a target stack applies one.

## The token contract

**For every light value at `color.<path>` there is a dark value at
`color.dark.<path>`, and nothing else.** The dark file is a mirror,
not a second palette. If you add a colour, add it to both.

A spec always names the **light** path — `color.surface.canvas`,
never `color.dark.surface.canvas`. Resolving it to the dark value
when that theme is active is the implementation's job. The only two
places in this template that name `color.dark.*` paths are this file
and `tokens/colors-dark.json` itself.

## What a theme may change

Only colour and shadow.

| Token group | Theme-dependent? |
|---|---|
| `color.*` | **Yes** — mirrored in full |
| `shadow.*` | **Yes** — `overlay` mirrored; `none` needs no counterpart |
| `spacing.*` | No |
| `radius.*` | No |
| `font.*` | No |
| `breakpoint.*` | No |
| `duration.*` / `easing.*` | No |

In particular **the measure does not change between themes.**
`font.measure.prose` is a property of reading, not of brightness.

## Three things this template's dark theme re-derives

Each is documented at the token that demonstrates it, and each is a
place where inverting values instead of re-deriving roles goes wrong:

1. **The accent inverts in lightness — and it has to, to stay one
   value.** This template's accent is unusual: `color.accent.base`
   serves as both a fill and as text, because a single violet clears
   4.5:1 in both roles. Keeping the light theme's deep `#6D28D9` in
   the dark theme would still work as a fill, but the same value as
   *text* on a near-black page would be unreadable, and the
   one-value property would be lost. So the dark accent is a light
   violet, which preserves it.

2. **`color.text.on-accent` therefore flips from white to
   near-black.** Because every accent in the dark theme is a light
   value, text on an accent fill must be dark. A dark theme that
   keeps white here produces an unreadable button, and it is the most
   common way a dark palette is got wrong.

3. **`color.surface.sunken` stops being the darkest surface and
   becomes the lightest.** "Sunken" names a *relationship* — a
   surface set apart from the reading surface — not a direction. In
   the light theme that is achieved by stepping down; on a page this
   close to black there is no room left below, so a recessed panel is
   rendered by stepping up. This is also why it is the worst case
   every dark text value was verified against: being the lightest
   dark surface, it gives light text the least contrast.

What does **not** need re-deriving: nothing else. Because this
template has almost no shadows, the usual fourth problem — that
shadows stop working on a dark surface — barely arises here. The one
`shadow.overlay` is mirrored, and even that leans on the panel's own
rule to do the separating.

## Contrast is re-verified per theme

Every value in both colour files carries its measured ratios in its
`$description`, and each was chosen against the **worst** surface it
can land on. Dividers are the one shared exception: `surface.rule` is
1.29:1 on light and 1.33:1 on dark, and neither clears 3:1. Neither
needs to — a divider is decoration. The 3:1 non-text obligation lands
on focus rings and on any border that is the only thing identifying a
control, and those draw from the accent tokens.

## Applying a theme

The template mandates the contract and the behaviour below, never a
mechanism — the same position `foundations/libraries.md` takes.

On the web the usual shape is one set of CSS custom properties from
the light tokens, re-declared from the dark tokens under a
`[data-theme="dark"]` selector and a `prefers-color-scheme: dark`
query, with every component reading the property rather than a
literal. On a platform without a DOM, map the same two sets onto its
own theming primitive. What matters is that **components read tokens,
and only the token layer knows which theme is active.**

Required behaviour:

- **Honour the system preference on first load.**
- **Remember an explicit choice, and let it override the system
  preference in both directions.**
- **Never ask twice.** A theme prompt on every visit is a bug.
- **Switch without a reload**, and without losing scroll position —
  which matters unusually much here: a reader switching to dark
  mid-article must not be returned to the top of it.
- **Set `color-scheme`** (or the platform equivalent) so scrollbars
  and platform-drawn form controls follow the theme.
- **Do not animate the switch.** See `foundations/motion.md`.
- **The theme control needs an accessible name that says what it
  controls**, and it belongs in `specs/site-header.md`.

## Accessibility

- **Both themes are held to the same floor**: 4.5:1 for body text,
  3:1 for a focus ring or a control-identifying border. A dark theme
  that only mostly clears it is worse than none, because it will be
  the default for every reader whose system is set that way.
- **Respect `prefers-contrast` independently of the theme.** They are
  different requests.
- **Images need attention that colour tokens cannot give them.** A
  photograph with a white background will glare on a dark page. See
  `foundations/imagery.md`.
- **Theme is never the only carrier of meaning** — a status that
  reads as an error in one theme reads as an error in the other,
  because the wording carries it too.

## Tokens used

| Token | Usage |
|---|---|
| `color.dark.surface.canvas` | dark reading surface |
| `color.dark.surface.muted` | dark site background |
| `color.dark.surface.sunken` | dark recessed panel (see above) |
| `color.dark.surface.rule` | dark hairlines |
| `color.dark.text.primary` | dark body copy |
| `color.dark.text.secondary` | dark bylines and captions |
| `color.dark.text.on-accent` | text on a dark-theme accent fill |
| `color.dark.accent.base` | dark accent, both roles |
| `shadow.dark.overlay` | dark floating-panel elevation |

## Reference visual description

The same article, twice. In the light theme, dark serif text on white
with a warm off-white site background behind it and a violet link. In
the dark theme, the page is very nearly black, the article's own
surface sits one clear step above it, and the body text is a soft
off-white rather than pure white. The link is a visibly lighter
violet than in the light theme. A tag, which was white text on deep
violet, is now near-black text on pale violet — the same shape, the
two colours exchanged. The hairline under the site header is equally
faint in both.
