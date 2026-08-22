# Contributing to this repository

This file is for whoever **writes** the templates here — a person or
an AI agent adding a component spec, a token, or a page pattern.

It is not the same audience as `AGENTS.md`. That file tells an agent
how to **consume** a template to generate code in someone else's
project. This one tells you how to **produce** the template content
in the first place.

## The rule everything else follows from

**A spec is merged before its `demo/` implementation exists.**

The specs, tokens, and patterns are the product. `demo/` is a
human-facing preview whose only job is to prove a spec is buildable
and looks right. If you find yourself writing `demo/` code for a
component with no merged spec, stop and write the spec first —
otherwise the demo becomes the real source of truth by accident and
the repository stops being framework-agnostic.

Practical consequence: a spec PR and a demo PR are separate PRs.

## Foundations come before specs

`templates/<id>/foundations/*.md` holds the rules that cut across
every component: which icon library glyphs come from, how the font is
shipped and applied, how images behave. They are not components and
do not follow the eight-section schema below.

Write a foundation document when a rule would otherwise have to be
repeated — and drift — across many specs. Keep them few.

`foundations/libraries.md` is the one place where specific packages
are named, and everything in it is a **suggestion**. A spec never
mandates a library: it states the capability and the contract the
library has to satisfy, and the consuming project chooses. When you
add a requirement that a library will satisfy, add the contract to
the spec and the starting points to that file — not a package name
to the spec.

A component spec **assumes** the foundations rather than restating
them. A spec that names a glyph says which glyph and what it means;
where the glyph comes from and how it is sized is
`foundations/iconography.md`'s job.

## Spec file schema

Every file in `templates/<id>/specs/` uses the same eight sections,
in this order, with these exact headings. `card.md` and
`data-table.md` are the reference examples — match their depth and
tone, not just their headings.

| Section | Must answer |
|---|---|
| `## Purpose` | What problem this component solves and when to reach for it over a similar one. Name the sibling it is most likely to be confused with. |
| `## Anatomy` | The named parts, numbered, each marked required or optional. A generating agent builds from this list, so an unnamed part does not exist. |
| `## Variants` | The axes of variation (color × size × shape) and the full matrix, expressed in token names. |
| `## States` | Default, hover, focus, active, disabled, loading, empty, error. State the ones that do **not** apply and why, rather than omitting them silently. |
| `## Accessibility rules` | Semantic element, ARIA, keyboard operation, focus management, and any contrast constraint. Written as requirements, not suggestions. |
| `## Composition rules` | What it may contain, what it must not contain, and which other specs it cross-references in each direction. |
| `## Tokens used` | A two-column table of token path → usage. Every visual value in the spec traces to a row here. |
| `## Semantic skeleton` *(optional)* | The structure, roles, states and focus order as a minimal HTML fragment. Include one wherever prose cannot pin the markup down — see below. |
| `## Reference visual description` | Prose describing what a person sees, in our own words. This is what makes the spec renderable by an agent that cannot see the reference. |

### The semantic skeleton

An accessibility contract *is* structure, roles, attributes and focus
order — describing it only in prose is a lossy encoding of something
that has an exact form. Three of the defects found in the first test
pass of the demo existed because the prose was ambiguous; one of them
was a spec that required `role="img"` on a plot and, four bullets
later, focusable data points inside it. In prose that survived several
readings. In markup, a `role="img"` with a `tabindex="0"` inside it is
wrong at a glance.

So: **include a skeleton in any spec whose markup is contested** —
anything interactive, anything with ARIA, anything where the reading
order matters. A Badge does not need one; a Dropdown Menu does.

The rules that keep it from becoming a second `demo/`:

- **Structure, roles, states and focus order. Nothing else.** No
  classes, no inline styles, no CSS, no framework syntax, no token
  values. There is nothing to copy because nothing visual is in it.
- **Say it is a contract, not a snippet.** Every skeleton opens with
  a line to that effect, and with how to read it on a platform that
  has no DOM: map the roles onto that platform's accessibility API.
- **Keep it short** — roughly 25 lines. A skeleton that needs more is
  a component that needs splitting.
- **Comment the invariants** that markup cannot show: which item
  holds the roving tabindex, that the panel is absent rather than
  hidden, that focus returns to the trigger.
- **Close with what the skeleton cannot express** — Escape handling,
  focus restoration, animation — so nobody reads its absence as
  permission.
- **It never contradicts the prose.** Where they disagree, one of
  them is a bug; fix both in the same change.

Copy-pasteable skeleton:

```markdown
# Component: <Name>

## Purpose

## Anatomy

## Variants

## States

## Accessibility rules

## Semantic skeleton   <!-- optional; see above -->

## Composition rules

## Tokens used

| Token | Usage |
|---|---|

## Reference visual description
```

### Write in our own words

Several specs are reverse-engineered by observing an existing open
source project's rendered output — see each template's
`ATTRIBUTION.md` for the rule. Describe anatomy and behavior
originally. Never copy markup, class names, or documentation prose
from the reference.

### Diverge from the reference when the reference is wrong

A reference visual that fails accessibility is not a spec
requirement. Where our spec knowingly departs from what the
reference does — a legend the original omits, dark text where the
original uses white — say so explicitly in the spec and give the
reason. Silent divergence looks like a mistake to the next reader.

## Tokens

- A spec may only reference tokens that exist. If it needs a value
  the token set does not cover, add the token **in the same PR as
  the spec**, never later in a demo PR.
- Prefer reusing an existing token over adding a near-duplicate. A
  new token needs a `$description` explaining when to pick it over
  the neighbour it resembles.
- Token files follow the W3C Design Tokens format (`$value`,
  `$type`, optional `$description`).
- After changing tokens, run `node demo/scripts/build-tokens.mjs`
  from inside the template's `demo/` folder to confirm the token
  build still succeeds. Its output is gitignored, so this verifies
  without touching tracked demo files.

## Checklist for a spec PR

- [ ] `specs/<component>.md` follows the eight-section schema above
- [ ] Any new token added to `tokens/*.json` in this same PR
- [ ] `catalog.json` — the template's `components` array lists the
      new component id (this is how a consuming agent discovers it;
      a spec missing from the catalog is invisible), or
      `foundationDocs` for a foundation document
- [ ] Glyphs, images and type follow `foundations/*.md` rather than
      being re-specified — and no spec introduces emoji or Unicode
      characters as icons
- [ ] Cross-references updated **in both directions** — if this spec
      defers to another, the other one links back
- [ ] `patterns/*.md` updated if the component changes a page
      pattern's composition
- [ ] No files under `demo/` changed

## Checklist for a demo PR

- [ ] Every component it renders has a merged spec
- [ ] It introduces no visual value that is not a token
- [ ] Icons come from a real icon library, the font family is
      actually shipped, and images are real assets — never emoji or
      Unicode stand-ins
- [ ] It does not extend, reinterpret, or "improve on" the spec — if
      building it revealed a gap, fix the spec in its own PR first
- [ ] Reviewed by a human before merge
