# AGENTS.md — instructions for AI coding agents

This repository does not ship a component library or runnable
production code. It ships **specifications** — design tokens,
component rules, and page-composition patterns — that you, an AI
coding agent (e.g. Claude Code), read and use to **generate**
idiomatic code inside whatever framework the target project uses
(React, Vue, React Native, plain HTML, etc.).

Follow these rules whenever a user asks you to use a template from
this repository.

## 1. Discover templates via `/catalog.json`

Always start by reading `/catalog.json` at the root of this
repository. It lists every available template with:

- `id` — the technical folder identifier (e.g. `adminlte-classic`).
- `displayName` — the name to use when talking to the user (e.g.
  "Classic Admin"). Never use the technical `id` as a marketing name
  in front of the user unless they specifically ask for the folder
  path.
- `path` — where the template's files live.
- `components` and `componentPatterns` — what's implemented for that
  template in this POC.

Do not assume a template exists or guess its contents — read the
catalog first, every time.

## 2. Read the chosen template's own files

Once a template is selected, read, in this order:

1. `templates/<id>/tokens/*.json` — every token file. These are the
   only source of truth for colors, typography, spacing, border
   radii, shadows, and breakpoints.
2. `templates/<id>/specs/*.md` — one file per component. Each spec
   defines purpose, anatomy, variants, states, accessibility rules,
   composition rules, and which tokens apply.
3. `templates/<id>/patterns/*.md` — page-level composition patterns
   that combine multiple components (layout, order, responsive
   behavior).
4. `templates/<id>/README.md` — general context: personality, when
   to use this template.
5. `templates/<id>/ATTRIBUTION.md` — provenance and licensing notes.
   Useful context, not implementation guidance.

**Do not read `templates/<id>/demo/`** for implementation guidance —
see rule 4 below.

## 3. Generate idiomatic code for the target framework — never copy the demo

Translate what you read in tokens/specs/patterns into code that is
natural for the target project's actual stack:

- React → components with props, CSS-in-JS or CSS Modules or
  Tailwind, following the target project's existing conventions.
- Vue → single-file components, following the target project's
  existing conventions.
- React Native → native primitives (`View`, `Text`, `Pressable`,
  `FlatList`, etc.), since HTML/CSS concepts (borders, box-shadow)
  must be translated to their platform equivalents.
- Plain HTML/CSS → semantic markup with a stylesheet or CSS
  variables.

The `demo/` folder inside a template is a **visual reference for
humans only** — a way for a person to preview what the template looks
like before choosing it. **Never copy markup, class names, or code
from `demo/` into a user's project.** The demo may use a specific
stack (e.g. React + Tailwind) that has nothing to do with the target
project's stack, and copying it would defeat the purpose of this
repository being framework-agnostic. If asked to build a Vue app, do
not "translate" the demo's JSX line by line — go back to the tokens
and specs and build the Vue component from those.

## 4. Never invent values outside the defined tokens

Every color, font size, spacing value, border radius, shadow, or
breakpoint you use when generating code must trace back to a key
defined in that template's `tokens/*.json` files. Do not introduce a
new hex color, a random padding value, or a shadow that isn't in the
token set, even if it "looks close enough." If the visual result
needs a value the tokens don't cover, that's a gap — see rule 5.

## 5. When a spec is missing information, ask — don't assume

If you're generating a component or a piece of layout and the spec
doesn't say what to do (e.g. a state, a breakpoint behavior, or a
composition rule isn't covered), do not silently invent a decision
that could diverge from what other agents/projects using the same
template would produce. Ask the user for clarification, or state
your assumption explicitly and ask for confirmation before writing
code. Consistency across different projects using the same template
is the entire point of this repository — silent improvisation
undermines it.

## 6. Token format

Tokens follow the W3C Design Tokens Community Group format (`$value`
and `$type` keys, with an optional `$description`). Treat `$value` as
the literal design value and `$type` as its category (`color`,
`dimension`, `fontFamily`, `fontWeight`, `number`, `shadow`, etc.).
Nested groups are namespaces (e.g. `color.brand.primary`) — when
referencing a token in a spec's "Tokens used" table, resolve it by
following the dotted path into the corresponding JSON file.
