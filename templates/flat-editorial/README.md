# Flat Editorial (`flat-editorial`)

## What this is

A visual identity template for AI-generated blogs and publishing
sites. It defines the typography, palette, spacing and component
behaviour for long-form reading — the kind of site where an article
is the product and everything around it is apparatus.

`flat-editorial` is this template's technical folder identifier. When
talking to a user, refer to it by its display name, **"Flat
Editorial."**

Unlike `adminlte-classic`, this identity was **designed for this
repository rather than reverse-engineered** from an existing project.
See `ATTRIBUTION.md`.

## Personality

- **Type-led.** The type is the design. A serif reading face at 19px
  on a column capped at roughly 68 characters, with a tight
  neo-grotesque sans for headlines and chrome. The serif/sans split
  is functional: a reader can tell at a glance what is the article
  and what is the site around it.
- **Genuinely flat.** `tokens/shadows.json` contains `none` and one
  justified exception. Depth comes from hairline rules, a step
  between background surfaces, and whitespace. No gradients, no
  raised cards, no glass.
- **Warm, high contrast.** Near-black ink on white for reading, a
  warm off-white behind it for the site. The warmth is what separates
  this template from the cool blue-grays of `adminlte-classic` at a
  glance.
- **One accent, doing one job.** A violet used for links, the primary
  action and the active state — and for nothing decorative. Violet
  rather than blue is deliberate: `adminlte-classic` already owns
  blue, and it keeps the accent clearly distinct from the red this
  template reserves for errors.
- **Quiet.** Very few icons, very little motion, and no chrome inside
  the reading column. The chrome's job is to be forgettable.

## When to use it

Use "Flat Editorial" for:

- Blogs, personal sites and company engineering blogs.
- Newsletters, changelogs and release notes.
- Documentation-shaped writing — tutorials, guides, handbooks.
- Any surface where somebody reads several hundred words in a row.

It is probably not the right choice for an admin panel, a dashboard,
or any data-dense operational UI — use `adminlte-classic` for those.
It is also not a marketing-site template: it has no hero, no feature
grid and no pricing table, and it deliberately does not chase
attention.

## What's included

- **`tokens/`** — colours (light and a full dark mirror), typography,
  spacing, radii, shadows, breakpoints and motion, in W3C Design
  Tokens format. Every colour value's contrast is measured and
  recorded in its own `$description`.
- **`foundations/`** — cross-cutting rules to read before the specs:
  - `typography.md` — **read this first.** The two families, the
    three numbers that decide readability, and the vertical rhythm.
  - `theming.md` — the light/dark token contract.
  - `iconography.md`, `imagery.md`, `motion.md`, `libraries.md`.
- **`specs/`** — eleven components: `prose` (the rendered article
  body, and the heart of the template), `code-block`, `article-card`,
  `post-meta`, `tag`, `site-header`, `site-footer`, `button`,
  `pagination`, `subscribe-form`, `table-of-contents`.
- **`patterns/`** — `article` (the single-post page) and `home-feed`
  (the index, which also covers archive and search-results).

## What is deliberately absent

Stated so an agent does not go looking, or invent one:

- **No demo app yet.** Tracked separately; the template is complete
  and usable without it. `adminlte-classic/demo/` is the example of
  what one looks like — and per `/AGENTS.md` rule 3, no demo is ever
  a source to copy from.
- **No comments component.** Blog comments are almost always a
  third-party embed whose markup this template does not control.
- **No hero, no feature grid, no pricing table.** This is not a
  marketing template.
- **No sticky share rail and no infinite scroll.**
  `patterns/article.md` and `specs/pagination.md` each explain why.
- **No status badges and no per-topic tag colours.** See
  `specs/tag.md`.

## Where the opinions are

If you read three files, read these:

1. **`foundations/typography.md`** — why prose is 19px, why the
   column is capped, and why leading and measure are one decision.
2. **`specs/prose.md`** — the styling contract over author-written
   content, and the rule that links in body copy are always
   underlined.
3. **`patterns/article.md`** — the rule that nothing is inserted into
   the reading column, which most of the rest of the template exists
   to protect.
