# Classic Admin — demo (visual reference only)

This is a minimal React + Tailwind CSS app that renders the Card,
Data Table, and Dashboard pattern from this template, so a human can
see what "Classic Admin" looks like before choosing it.

**This app is not the source of truth for the template**, and an AI
agent generating code for a real project must never copy markup,
class names, or components from `src/` here. The source of truth is:

- `../tokens/*.json` — design tokens
- `../specs/*.md` — component specs
- `../patterns/*.md` — page composition patterns

See `/AGENTS.md` at the repository root for the full rule set agents
must follow.

## Why it exists

Both this template's identity and the components in it should be
verifiable by eye, not just readable as JSON/Markdown. This demo
exists purely so a human evaluating the "Classic Admin" template has
something to look at.

## How the tokens reach this app

`scripts/build-tokens.mjs` reads every file in `../tokens/*.json` and
writes `src/tokens.generated.css`, a flat set of CSS custom
properties (e.g. `--color-brand-primary`, `--spacing-4`,
`--shadow-card`). `tailwind.config.js` then maps Tailwind's theme
(colors, spacing, font sizes, radii, shadows) to those CSS variables,
so every Tailwind utility class used in `src/` (`bg-brand-primary`,
`p-card-padding`, `shadow-card`, etc.) resolves back to a token value
— nothing here is a hand-picked hex code or pixel value.

`src/tokens.generated.css` is not committed (see `.gitignore`) — it's
regenerated automatically by `npm run dev` / `npm run build`. If you
change a token in `../tokens/*.json`, just restart `npm run dev` and
the demo picks up the new value.

## Running it locally

```bash
npm install
npm run dev
```

This starts a Vite dev server rendering the Dashboard pattern (four
metric cards + a paginated, sortable orders table) at whatever local
URL Vite prints.

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```
