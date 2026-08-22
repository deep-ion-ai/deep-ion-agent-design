# Classic Admin — demo (visual reference only)

This is a React + Tailwind CSS app that renders every component this
template specifies, inside the app shell, so a human can see what
"Classic Admin" looks like before choosing it.

Two pages, reachable from the sidebar:

- **Overview** — `patterns/dashboard.md`: a metrics row of Stat
  Callouts, a trend chart, a region map, a sparkline strip, a chat
  widget, an activity timeline, and the orders Data Table.
- **UI elements** — a gallery of the primitives: buttons and button
  groups, badges, alerts, a dropdown menu, modal and offcanvas
  overlays, tabs/pills/accordion/collapse, the three List Group
  variants, a timeline, pagination, and ribbons.

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

This starts a Vite dev server at whatever local URL Vite prints.

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Charts and the map

The trend chart, sparklines and region map are drawn as inline SVG
with no charting or mapping library. That is deliberate: those specs
are explicitly library-agnostic, and shipping a library here would
read as the template endorsing one. The map's geography in particular
is a simplified stylised outline, not a cartographically accurate
map — a real project supplies its own.

What the demo does implement faithfully are the parts those specs
insist on: the legend and per-series mark shapes, the text
equivalents, the tabular fallback behind a disclosure, the "no data"
tone distinct from the value scale, and the map's error state, which
keeps the numbers reachable when the picture fails.

## What to look at

A few behaviours are easier to check by hand than to read:

- **Keyboard** — Tab from the top of the page hits "Skip to content"
  first. Arrow keys move within the dropdown menu, the tabs, the
  segmented control and the selectable list; Tab leaves them.
- **Overlays** — the modal opens with focus on *Cancel*, not on
  *Delete order*; Escape closes it and focus returns to the trigger.
- **Contrast** — the `warning` and `info` Stat Callouts render dark
  text, not white. White on those fills is 1.63:1 and 1.96:1.
- **Failure states** — "Simulate a map failure" on the Overview page
  replaces the map with a message, a retry, and the same data as a
  table.
- **Narrow viewports** — below 992px the sidebar leaves the layout
  and returns as a focus-trapping offcanvas panel.
