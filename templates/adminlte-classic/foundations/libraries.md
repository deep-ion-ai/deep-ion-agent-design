# Foundation: Suggested libraries

## Purpose

Several of this template's requirements are satisfied by a library
rather than by code you write: an icon set, the font family, charts,
maps, generated avatars. The other foundations say *what* the result
must do. This file exists so that a project does not have to research
the field from zero to get there.

**Everything below is a suggestion, not a requirement.** The template
mandates capabilities and behaviour, never packages. The consuming
project chooses what fits its framework, its licence constraints, its
bundle budget and what it already depends on — and a library it
already uses that meets the requirements always beats one named here
that it would have to add.

Two things follow from that:

- **A spec's requirements are the acceptance test.** If a candidate
  cannot produce a keyboard-reachable tooltip, or cannot render an
  accessible name on its canvas, that disqualifies it for this
  template no matter how good it looks. Check before adopting, not
  after.
- **Wrap the library in your own component.** Every consuming
  component talks to your wrapper, not to the library directly, so
  the spec's contract is enforced in one place and the library stays
  replaceable. The wrapper is also where the accessibility
  requirements the library does not provide get added.

Names drift, projects are abandoned, and licences change. Treat this
as a starting point to evaluate, and check the current state of
anything before adopting it.

## Icons

**Required by** `foundations/iconography.md`: one coherent
stroke-based family, rendered inline as SVG so it inherits
`currentColor`, covering the admin vocabulary. Icon *fonts* are
excluded.

| Ecosystem | Starting points |
|---|---|
| React | Lucide (`lucide-react`), Phosphor (`@phosphor-icons/react`), Heroicons, Tabler Icons |
| Vue | `lucide-vue-next`, `@phosphor-icons/vue`, `unplugin-icons` (any set) |
| Svelte | `lucide-svelte`, `phosphor-svelte` |
| Angular | `lucide-angular`, Angular Material icons (SVG mode) |
| Plain HTML/JS | `lucide` with inline SVG sprites, or an SVG sprite sheet built from any of the above |
| React Native | `lucide-react-native`, `react-native-svg` with any SVG set |

## Fonts

**Required by** `foundations/typography.md`: the family named in
`tokens/typography.json`, self-hosted and versioned, in the four
weights the tokens use.

| Ecosystem | Starting points |
|---|---|
| Web, any framework | Fontsource (`@fontsource-variable/source-sans-3` for the variable family, `@fontsource/…` for static weights) |
| Web, no bundler | Download the woff2 files and declare `@font-face` yourself — the point is self-hosting, not the tooling |
| React Native | `expo-font`, or the platform's own font bundling |

Avoid loading the family from a third-party stylesheet at runtime:
that is a request on every page load, a privacy consideration, and a
dependency on a host you do not control.

## Charts

**Required by** `specs/trend-chart-card.md` and
`specs/sparkline-strip.md`. Use a real charting library rather than
drawing marks by hand: a chart is scales, ticks, layout, hit-testing
and responsive behaviour, and hand-rolling those is how a chart ends
up with a broken axis at the eleventh data point.

The library must be able to produce, in the wrapper you build around
it:

- an accessible name on the plot, and a text summary of the series;
- a tooltip reachable by **keyboard**, not hover alone;
- a legend, and a per-series mark or dash so identity is never colour
  alone;
- colours taken from `color.chart.*` rather than the library's own
  defaults;
- no animation, or animation that can be disabled, for the
  reduced-motion case.

| Ecosystem | Starting points |
|---|---|
| React | Recharts, Nivo, visx, `react-chartjs-2` (Chart.js), `echarts-for-react` |
| Vue | `vue-chartjs`, `vue-echarts`, Unovis |
| Svelte | LayerChart, Chart.js directly |
| Angular | `ng2-charts` (Chart.js), `@swimlane/ngx-charts` |
| Plain HTML/JS | Chart.js, Apache ECharts, Observable Plot, uPlot (when the series count is large), D3 (when the chart is genuinely bespoke) |
| React Native | Victory Native, `react-native-svg` + `d3-shape`, `react-native-gifted-charts` |

A **sparkline** is the one case where the library may be more than
the job needs: a line with no axes, ticks or legend is a handful of
points on a path. Use whichever is less code in your stack — but the
accessible name required by `specs/sparkline-strip.md` is not
optional either way.

## Maps

**Required by** `specs/geo-map-card.md`. A world map is geography
data plus a projection; approximating it with hand-drawn shapes is
not a map, and a wrong map is worse than a table.

The library must be able to produce: an accessible name summarising
the finding, per-region values reachable without a pointer, a
distinct "no data" treatment, and no scroll hijacking.

| Ecosystem | Starting points |
|---|---|
| React | `react-simple-maps` with `world-atlas`/Natural Earth TopoJSON (choropleth, no tiles), `react-leaflet`, `react-map-gl` (MapLibre GL) |
| Vue | `vue-leaflet`, MapLibre GL directly |
| Svelte / Angular | Leaflet or MapLibre GL directly; `ngx-mapbox-gl` for Angular |
| Plain HTML/JS | MapLibre GL JS, Leaflet, D3-geo + TopoJSON |
| React Native | `react-native-maps`, MapLibre React Native |

For a dashboard card showing values per country or region, a
**projection-only choropleth** (D3-geo, `react-simple-maps`) is
usually the right weight: no tile server, no attribution overlay, no
network dependency. Reach for a tile-based map only when the reader
needs to zoom into real geography.

Whatever is chosen, check the licence of both the library **and the
geography data**, and honour the attribution the tiles or data
require.

## Images and avatars

**Required by** `foundations/imagery.md`.

| Need | Starting points |
|---|---|
| Generated avatars, where there are no real photographs | DiceBear (`@dicebear/core` + `@dicebear/collection`), `boring-avatars` |
| Image optimisation at build time | the framework's own image pipeline (`next/image`, `@astrojs/image`, Vite plugins), or `sharp` in a build step |
| Illustrations | one open illustration set with a consistent line weight — never several |

## Composition rules

- **One library per category per project.** Two icon sets or two
  charting libraries in one interface is the most visible way to make
  it look unfinished, and doubles the bundle for nothing.
- **The demo's choices are the demo's.** `templates/<id>/demo/`
  picks specific libraries so a human can see the template rendered;
  those choices are not part of the template and must not be copied
  into a project on the strength of appearing there.
- **Record the choice.** A project should write down which library it
  picked per category and why, so the next person does not re-open
  the question — and so a replacement can be scoped.
