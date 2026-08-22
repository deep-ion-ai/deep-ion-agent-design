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
- `foundations` and `foundationDocs` — the template's cross-cutting
  rules (iconography, imagery, typography), which apply to every
  component in it.

Do not assume a template exists or guess its contents — read the
catalog first, every time.

## 2. Read the chosen template's own files

Once a template is selected, read, in this order:

1. `templates/<id>/tokens/*.json` — every token file. These are the
   only source of truth for colors, typography, spacing, border
   radii, shadows, and breakpoints.
2. `templates/<id>/foundations/*.md` — the cross-cutting rules every
   component depends on: which icon library to draw glyphs from, how
   the font is shipped and applied, and how images behave. Read these
   before the component specs, because the specs assume them.
3. `templates/<id>/specs/*.md` — one file per component. Each spec
   defines purpose, anatomy, variants, states, accessibility rules,
   composition rules, and which tokens apply.
4. `templates/<id>/patterns/*.md` — page-level composition patterns
   that combine multiple components (layout, order, responsive
   behavior).
5. `templates/<id>/README.md` — general context: personality, when
   to use this template.
6. `templates/<id>/ATTRIBUTION.md` — provenance and licensing notes.
   Useful context, not implementation guidance.

**Do not read `templates/<id>/demo/`** for implementation guidance —
see rule 3 below.

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

### A spec's "Semantic skeleton" is a contract, not a snippet

Some specs carry a `## Semantic skeleton` section: a minimal HTML
fragment giving the structure, roles, states and focus order. It
exists because an accessibility contract has an exact form that prose
describes only approximately — not as markup to paste.

Reproduce its **structure, roles, states and focus order** in the
idiom of the target stack. It carries no classes, no styles and no
framework syntax, so there is nothing else in it to copy. On a
platform without a DOM (React Native, for example), map each role
onto that platform's own accessibility API rather than looking for an
HTML equivalent — the skeleton tells you *what the thing is* and
*what can be focused in what order*, which every platform can
express.

## 4. Use the libraries the foundations call for

Being framework-agnostic does not mean depending on nothing. A
template's `foundations/` files require the target project to draw
its icons from a real icon library, to ship the font family rather
than merely name it, to render images as real assets, and to draw
charts and maps with a real charting or mapping library. Do not
substitute emoji, Unicode glyphs, or hand-drawn paths for an icon
set; do not skip loading the font because a fallback exists; do not
hand-plot a chart.

**Which library is the target project's decision, not the
template's.** `foundations/libraries.md` lists suggestions per
ecosystem — they are starting points to evaluate, never a
requirement, and a library the project already depends on that meets
the spec's requirements always wins. What the specs do fix is the
contract the library must satisfy (keyboard-reachable tooltips, an
accessible name on a plot, and so on): check a candidate against it
before adopting, and wrap it in a component of your own so the
contract lives in one place. When more than one candidate fits,
propose rather than assume — see rule 6.

## 5. Never invent values outside the defined tokens

Every color, font size, spacing value, border radius, shadow, or
breakpoint you use when generating code must trace back to a key
defined in that template's `tokens/*.json` files. Do not introduce a
new hex color, a random padding value, or a shadow that isn't in the
token set, even if it "looks close enough." If the visual result
needs a value the tokens don't cover, that's a gap — see rule 6.

## 6. When a spec is missing information, ask — don't assume

If you're generating a component or a piece of layout and the spec
doesn't say what to do (e.g. a state, a breakpoint behavior, or a
composition rule isn't covered), do not silently invent a decision
that could diverge from what other agents/projects using the same
template would produce. Ask the user for clarification, or state
your assumption explicitly and ask for confirmation before writing
code. Consistency across different projects using the same template
is the entire point of this repository — silent improvisation
undermines it.

## 7. Token format

Tokens follow the W3C Design Tokens Community Group format (`$value`
and `$type` keys, with an optional `$description`). Treat `$value` as
the literal design value and `$type` as its category (`color`,
`dimension`, `fontFamily`, `fontWeight`, `number`, `shadow`, etc.).
Nested groups are namespaces (e.g. `color.brand.primary`) — when
referencing a token in a spec's "Tokens used" table, resolve it by
following the dotted path into the corresponding JSON file.
