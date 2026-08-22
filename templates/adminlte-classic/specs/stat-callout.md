# Component: Stat Callout

## Purpose

A single headline number, saturated in colour, sitting at the top of
a dashboard as one of a row of three or four. It answers "how is the
system doing right now?" in the time it takes to glance at the page,
and hands off to a detail view for anything more.

It is **a sibling of Card, not a variant of it**. That call is worth
justifying, because the two are visually adjacent:

- A Card is a *surface that holds content* — its background is
  neutral so that whatever sits inside it is what the reader sees. A
  Stat Callout is *itself the content*: the fill colour is the
  signal, and the block carries exactly one number.
- Card's anatomy is header / body / footer, each optional and each
  free to hold anything, including a full Data Table. A Stat
  Callout's anatomy is fixed and cannot be composed into — number,
  label, decorative glyph, footer link, in that arrangement only.
- The footer link is a click target of its own inside a block that
  is otherwise inert, which is a structure `card.md` explicitly does
  not describe.

Modelling it as a Card variant would mean every Card rule
("may contain a Data Table", "the header title is a semantic
heading") needing an exception for this one case. It is cheaper and
more honest to describe it separately.

The neighbour to distinguish it from is Card's **Summary/KPI
variant**, which is also a number with a label. Use that one for
metrics that live *inside* a page's content — a white surface,
quiet, one of many. Use a Stat Callout for the small set of numbers
that head the page and are meant to be seen from across a room. A
dashboard should have one row of them at most; a page of Stat
Callouts is a page with no hierarchy.

## Anatomy

1. **Container** (required) — a rectangle filled edge to edge with a
   single accent colour, `radius.base` corners, `shadow.card`
   elevation, no border. The fill is the component's defining trait:
   unlike everything else in this template, text here sits directly
   on a saturated colour.
2. **Value** (required) — the metric itself, in `font.size.xl` and
   `font.weight.bold`, at the top of the block. Formatted for
   glanceability: thousands separated, long numbers abbreviated
   ("1.2M"), a unit or currency symbol attached ("$5,320", "68%").
   One value per callout.
3. **Label** (required) — a short phrase directly beneath the value
   naming what was measured ("Orders today", "Bounce rate"), in
   `font.size.sm`. Never a bare noun that needs the surrounding page
   to be understood.
4. **Decorative glyph** (optional) — an oversized icon in the
   trailing corner, rendered at low contrast against the fill so it
   reads as texture behind the number rather than as a second
   element competing with it. It is decoration and carries no
   meaning (see Accessibility rules).
5. **Footer link** (optional) — a full-width strip across the bottom
   of the block, separated from the body by a darkening wash rather
   than a border, containing a short phrase ("More info") and a
   trailing chevron. The entire strip is one click target leading to
   the detail view for this metric.
6. **Trend indicator** (optional) — a short delta beside or beneath
   the value ("+12% vs. last week"), with a direction glyph. A
   number with no baseline is hard to act on, so this is
   recommended wherever a comparison period exists.

## Variants

- **Colour** — one per accent: `brand.primary`, `brand.secondary`,
  `status.success`, `status.danger`, `status.warning`,
  `status.info`. The colour is not decoration; it encodes how the
  reader should feel about the number. Reserve `danger` for values
  that are actually bad, not merely for visual variety across the
  row — four callouts in four colours chosen for looks teach the
  reader that colour means nothing here.
- **With / without footer link** — a callout for a metric that has
  no detail view drops the strip entirely rather than showing a dead
  one.
- **With / without glyph** — the glyph is omitted when no icon
  genuinely represents the metric. A vague glyph is worse than none.

## States

- **Default** — the fill at full saturation, `shadow.card`.
- **Footer link hover / focus** — the strip darkens by an additional
  wash and the chevron shifts slightly toward the trailing edge.
  Focus additionally shows the ring described in Accessibility
  rules. The body of the callout does not react — only the strip is
  interactive.
- **Loading** — the fill renders at full colour with the value and
  label replaced by skeleton bars in the same positions and
  proportions, and `aria-busy="true"` on the container. The
  container keeps its final size, so a row of four callouts does not
  reflow as data arrives.
- **Empty** — when the metric has no value for the period, the value
  slot shows an em dash and the label gains a short qualifier ("No
  orders today") rather than rendering "0" where zero is not a
  measurement. A real, measured zero is a value, not an empty state,
  and is shown as "0".
- **Error** — when the metric fails to load, the container drops to
  `neutral.light` with `text.primary` text, a short message, and a
  retry action. It does **not** stay in its accent colour: a red
  callout that failed to load is indistinguishable from a red
  callout reporting bad news, which is the more dangerous of the two
  misreadings.

`hover` on the container as a whole and `disabled` do not apply —
the block is not a control.

## Accessibility rules

- **The contrast pairing is per fill, and this is the component
  where getting it wrong is most likely.** Text and any meaningful
  glyph use `color.text.on-accent` (white) over `brand.primary`,
  `brand.secondary`, `status.success` and `status.danger`, and
  `color.text.on-accent-dark` over `status.warning` and
  `status.info`. White over `status.warning` measures 1.63:1 and
  over `status.info` 1.96:1 — both far below the 4.5:1 floor, and
  both are the reference's own combination. This spec diverges from
  the reference deliberately on that point.
- The **label and footer text are body-sized**, so the 4.5:1
  threshold applies to them, not the 3:1 large-text allowance. The
  value, at `font.size.xl` and bold, does qualify as large-scale
  text, but there is no reason to rely on that: a single pairing per
  fill covers the whole block. Note that white over
  `brand.primary`, `status.success` and `status.danger` clears AA at
  4.50–4.53:1 and fails AAA — do not lighten or tint those fills.
- **The decorative glyph is `aria-hidden="true"`** and must never be
  the only carrier of meaning. It uses the low-contrast overlay
  tokens and would fail contrast if it were content; that is
  acceptable precisely *because* it is decoration. If an icon needs
  to be understood, it is not this glyph.
- **The footer link is a real `<a>`** (or a `<button>` where it
  opens a panel rather than navigating), never a click handler on
  the strip. Its accessible name must identify the metric, not just
  repeat the visible phrase: four callouts each announcing "More
  info" are indistinguishable in a screen reader's link list. Use
  visually-hidden text or `aria-label` — "More info about orders
  today".
- **The focus ring must be visible on every fill.** A ring in
  `brand.primary` is invisible on the primary-filled callout and
  weak on `info`. The ring therefore uses the same
  `text.on-accent` / `text.on-accent-dark` pairing as the text, with
  an offset so it reads against the fill rather than blending into
  it.
- **The value must not be announced as a bare number.** The label is
  associated with the value programmatically (they are read as one
  unit), so a screen reader announces "Orders today, 1,204" rather
  than an orphan "1,204". The trend indicator, when present, is part
  of that same unit and spells out its direction in text
  ("up 12 percent versus last week"), since an arrow glyph alone
  says nothing.
- **Colour must not be the sole signal of whether a number is good
  or bad.** A green callout and a red callout differ only in hue for
  a colour-blind reader — the trend indicator's text, or the label's
  phrasing, must carry that judgement too.
- The row of callouts is an unordered list of peers; marking it up
  as a list lets assistive tech announce "4 items" and navigate
  between them.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **May contain**: exactly the parts named in Anatomy. Nothing else.
- **Must not contain**: a chart, a table, a second metric, multiple
  actions, or free text beyond the label and trend. A callout that
  needs more is a Card.
- **Placement**: in a single row directly beneath the page header,
  above the page's cards, in `patterns/dashboard.md`'s metrics band.
  Three or four per row on wide viewports, stacking to two and then
  one as the viewport narrows. All callouts in a row keep equal
  height regardless of whether some have a footer strip and others
  do not.
- **Not nested.** A Stat Callout never sits inside a Card, and a
  Card never sits inside a Stat Callout. Where a metric belongs
  inside page content rather than at the top of the page, the
  correct component is Card's Summary/KPI variant
  (`specs/card.md`).
- **May reference**: `specs/badge.md`, when the trend indicator is
  rendered as a badge rather than as plain text. In that case the
  badge's own contrast pairing applies on top of the fill, which
  usually means the neutral or subtle badge variant — a solid
  `success` badge on a `success` fill is unreadable.

## Tokens used

| Token | Usage |
|---|---|
| `color.brand.primary` / `brand.secondary` | container fill |
| `color.status.*` | container fill by meaning |
| `color.text.on-accent` | value, label, footer text and focus ring on dark fills |
| `color.text.on-accent-dark` | the same on `warning` / `info` fills |
| `color.overlay.accent-shade` | footer strip separation, footer hover darkening |
| `color.overlay.accent-glyph` | decorative glyph on dark fills |
| `color.overlay.accent-glyph-dark` | decorative glyph on light fills |
| `color.neutral.light` | container background in the error state |
| `color.text.primary` | text in the error state |
| `radius.base` | container corners |
| `shadow.card` | container elevation |
| `spacing.component.card-padding` | body padding, matching the Cards below the row |
| `spacing.3` | footer strip vertical padding |
| `spacing.component.grid-gap` | gap between callouts in the row |
| `font.size.xl` + `font.weight.bold` | the value |
| `font.size.sm` | label, footer text, trend |
| `font.lineHeight.dense` | value line height |

## Reference visual description

Across the top of the dashboard, four solid blocks of colour in a
row — blue, green, amber, red — each the same height, separated by
the same gap as the cards below them. Inside the first, a large bold
white "1,204" with "Orders today" set beneath it in a smaller white
line. Filling the block's right side, a shopping-cart glyph several
times the size of the text, barely lighter than the blue behind it,
reading as texture rather than as an icon. Across the bottom, a
strip a shade darker than the block, spanning its full width,
holding a small "More info" and a chevron; the pointer entering it
darkens the strip further. The amber block beside it follows the
same arrangement, but every mark on it is near-black instead of
white.
