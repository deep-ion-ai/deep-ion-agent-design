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

## The libraries it depends on

Per the template's `foundations/`, an interface is not
framework-agnostic by depending on nothing. Each dependency below
exists because a foundation or a spec requires what it provides —
and each is a **demo-local choice**, not part of the template.
`foundations/libraries.md` lists alternatives per ecosystem as
suggestions; a project picks whatever fits its stack.

| Dependency | Why | Required by |
|---|---|---|
| `lucide-react` | one coherent, stroke-based icon family, inline SVG inheriting `currentColor` | `foundations/iconography.md` |
| `@fontsource-variable/source-sans-3` | ships the family the tokens name, self-hosted and versioned | `foundations/typography.md` |
| `@dicebear/core` + `/collection` | the demo has no real photographs, so avatars are generated per name rather than faked with a glyph | `foundations/imagery.md` |
| `recharts` | the trend chart and the sparklines — scales, ticks, hit-testing and keyboard navigation, rather than hand-plotted paths | `specs/trend-chart-card.md`, `specs/sparkline-strip.md` |
| `react-simple-maps` + `world-atlas` | a real projection over real geography, bundled rather than fetched — no tile server, nothing requested at render time | `specs/geo-map-card.md` |

Icons are re-exported from `src/components/icons.ts`, so the set can
be swapped in one place. No emoji or Unicode characters are used as
icons anywhere.

Every library is wrapped in a component of this demo's own, which is
where the parts the library does not provide are added: the chart's
figure caption and text summary, the map's "no data" tone and
tabular fallback, the accessible names on both.

## Charts and the map

The chart is drawn by a charting library and the map by a mapping
library, as their specs require — hand-plotting a chart means
reinventing scales, ticks and hit-testing, and a hand-drawn world is
not a map. What the specs fix is the contract those libraries have to
satisfy, and the wrappers here enforce it:

- the plot is **focusable and driven by the arrow keys**, so every
  value the pointer can reveal is reachable without one;
- the chart carries a **legend pairing each colour with a mark
  shape**, plus a `<figcaption>` summary naming each series'
  direction and extremes, and a **data table** behind a disclosure;
- colours come from `color.chart.*`, never the libraries' defaults;
- animation is disabled under `prefers-reduced-motion`;
- the map gives every country an accessible name and a value, marks
  countries with no data distinctly from a low value, and keeps the
  numbers reachable as a table when the picture fails.

## What to look at

A few behaviours are easier to check by hand than to read:

- **Keyboard** — Tab from the top of the page hits "Skip to content"
  first. Arrow keys move within the dropdown menu, the tabs, the
  segmented control and the selectable list; Tab leaves them.
- **Overlays** — the modal opens with focus on *Cancel*, not on
  *Delete order*; Escape closes it and focus returns to the trigger.
- **Contrast** — the `warning` and `info` Stat Callouts render dark
  text, not white. White on those fills is 1.63:1 and 1.96:1.
- **Typography** — the page is set in Source Sans 3, shipped with the
  build. If it renders in the system sans, the font package did not
  load and that is a bug, not a fallback working as intended.
- **Avatars** — the account avatar is a generated portrait; the
  contacts pane shows the initials fallback for anyone without one.
- **Failure states** — "Simulate a map failure" on the Overview page
  replaces the map with a message, a retry, and the same data as a
  table.
- **Chart by keyboard** — Tab to the plot and press the arrow keys:
  the tooltip follows, month by month.
- **Narrow viewports** — below 992px the sidebar leaves the layout
  and returns as a focus-trapping offcanvas panel.
