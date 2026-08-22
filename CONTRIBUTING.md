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
| `## Reference visual description` | Prose describing what a person sees, in our own words. This is what makes the spec renderable by an agent that cannot see the reference. |

Copy-pasteable skeleton:

```markdown
# Component: <Name>

## Purpose

## Anatomy

## Variants

## States

## Accessibility rules

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
      a spec missing from the catalog is invisible)
- [ ] Cross-references updated **in both directions** — if this spec
      defers to another, the other one links back
- [ ] `patterns/*.md` updated if the component changes a page
      pattern's composition
- [ ] No files under `demo/` changed

## Checklist for a demo PR

- [ ] Every component it renders has a merged spec
- [ ] It introduces no visual value that is not a token
- [ ] It does not extend, reinterpret, or "improve on" the spec — if
      building it revealed a gap, fix the spec in its own PR first
- [ ] Reviewed by a human before merge
