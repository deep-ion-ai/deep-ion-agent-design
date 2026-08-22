# deep-ion-agent-design

A repository of **visual identity templates for AI agents** —
specifications an AI coding agent (e.g. Claude Code) reads and uses
to generate idiomatic UI code inside *your* project's actual stack
(React, Vue, React Native, plain HTML, etc.), instead of a component
library you `npm install`.

## Why this exists

Design systems and UI kits are usually tied to one framework: you
either adopt their React components as-is, or you don't use them at
all. That doesn't work for an AI agent that needs to generate code
for whatever stack a given project already uses.

This repository takes a different shape: each template is a set of
**design tokens** (colors, typography, spacing, radii, shadows,
breakpoints), **component specs** (purpose, anatomy, variants,
states, accessibility rules, composition rules), and **page
patterns** (how components compose into a full page) — all written
in plain JSON/Markdown, framework-agnostic. An agent reads these and
writes new, idiomatic code for your project. A small demo app exists
per template purely so a human can preview it visually; it is never
the thing an agent should copy from.

The goal: point two different projects — one React, one Vue, say —
at the same template, and get UIs that look and behave consistently,
without hand-pasting design values into every prompt.

## Repository structure

```
/catalog.json                 — index of available templates
/AGENTS.md                    — rules for AI agents using this repo
/CONTRIBUTING.md              — how to write specs/tokens for this repo
/LICENSE                      — MIT, covers all original content here
/templates/
  <template-id>/
    tokens/*.json              — design tokens (W3C Design Tokens format)
    specs/*.md                 — component specifications
    patterns/*.md              — page composition patterns
    demo/                      — human-facing visual reference app (not source of truth)
    README.md                  — template overview: personality, when to use
    ATTRIBUTION.md             — provenance/licensing notes, if the identity was
                                  derived from an existing open source project
```

## Available templates

| Template | Display name | Description |
|---|---|---|
| `adminlte-classic` | **Classic Admin** | Dense, data-forward admin dashboard identity: dark side navigation, clean white cards on a soft blue-gray background, subtle shadows, compact data tables. |

See `catalog.json` for the machine-readable version of this list, and
each template's own `README.md` for its full personality description
and guidance on when to use it.

## How to choose a template

1. Look at each template's `README.md` for its personality and
   intended use case.
2. Optionally, run that template's `demo/` app locally to see it
   rendered (see that template's `demo/README.md` for instructions —
   it's a visual preview only, not something to copy code from).
3. Once you've picked one, tell your AI coding agent which template
   to use (see below).

## How to instruct Claude Code to use a template

Point Claude Code at this repository (as a cloned dependency, a
linked path, or by giving it the repo URL) and describe what you want
to build, naming the template by its display name or technical id,
e.g.:

> "Use the Classic Admin template (`adminlte-classic`) from
> deep-ion-agent-design to build a dashboard with a metrics row and a
> data table of recent orders, in this React project."

The agent should discover the template on its own — reading
`/catalog.json`, then that template's `tokens/`, `specs/`, and
`patterns/` — following the rules in `/AGENTS.md`. You should not
need to paste token or spec content into your prompt yourself; if the
agent asks you to, something is off (see `/AGENTS.md` rule 3 — it
should never need to copy the `demo/` app either).

## License

All original content in this repository — tokens, specs, patterns,
`AGENTS.md`, `catalog.json`, and template READMEs — is licensed under
MIT by deep-ion-ai. See `/LICENSE`.

Where a template's visual identity was reverse-engineered from an
existing open source project's public look and feel (rather than
designed from scratch), that template's own `ATTRIBUTION.md`
documents the source project, confirms no source code or binary
assets were copied, and reproduces that project's original license
notice as required by its terms.
