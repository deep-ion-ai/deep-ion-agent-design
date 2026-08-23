---
foundation: libraries
references: [foundations/iconography.md, foundations/typography.md, foundations/imagery.md]
---

# Foundation: Suggested libraries

## Purpose

Several of this template's requirements are met by a library rather
than by code you write: the two type families, an icon set, syntax
highlighting, Markdown or MDX rendering. The other foundations say
*what* the result must do. This file exists so a project does not
have to research the field from zero to get there.

**Everything below is a suggestion, not a requirement.** The template
mandates capabilities and behaviour, never packages. A library the
project already uses that meets the requirements always beats one
named here that it would have to add.

Two things follow:

- **A spec's requirements are the acceptance test.** If a candidate
  cannot render a code block with a real `<code>` element, or cannot
  produce headings with stable ids, that disqualifies it no matter
  how it looks.
- **Wrap the library in your own component.** Every consuming
  component talks to your wrapper, so the contract is enforced in one
  place and the library stays replaceable.

Names drift and licences change. Check the current state of anything
before adopting it.

## Fonts

**Required by** `foundations/typography.md`: the families named in
`tokens/typography.json`, self-hosted and versioned. This is the most
consequential library choice in this template — the type is the
identity.

| Ecosystem | Starting points |
|---|---|
| Web, any framework | Fontsource (`@fontsource-variable/source-serif-4`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`) |
| Next.js | `next/font/google` or `next/font/local`, which self-hosts and inlines the metrics automatically |
| Web, no bundler | Download the woff2 files and declare `@font-face` yourself — the point is self-hosting, not the tooling |
| React Native | `expo-font`, or the platform's own bundling |

Two requirements beyond installing them:

- **Load only the weights the tokens use**, or a variable font. A
  blog that ships eight static weights spends its whole performance
  budget on type it never sets.
- **Set `font-display: swap` and match the fallback's metrics**
  (`size-adjust`, `ascent-override`). The fallbacks in
  `tokens/typography.json` were chosen to be metrically close for
  this reason: on an article, a font swap that reflows three
  paragraphs is worse than a slightly wrong-looking first paint.

Avoid loading the families from a third-party stylesheet at runtime:
a request on every page load, a privacy consideration, and a
dependency on a host you do not control.

## Icons

**Required by** `foundations/iconography.md`: one coherent
stroke-based family, inline SVG so it inherits `currentColor`. Icon
*fonts* are excluded. This template uses very few icons, so the set
can be tree-shaken to almost nothing — prefer a library that allows
that over a sprite sheet.

| Ecosystem | Starting points |
|---|---|
| React | Lucide (`lucide-react`), Phosphor, Heroicons |
| Vue | `lucide-vue-next`, `unplugin-icons` (any set) |
| Svelte | `lucide-svelte`, `phosphor-svelte` |
| Astro | `astro-icon` |
| Plain HTML/JS | `lucide` with inline SVG, or an SVG sprite built from any of the above |

## Content rendering

**Required by** `specs/prose.md`. Most blogs author in Markdown or
MDX, and the renderer decides whether the prose contract is met.

The renderer must be able to produce, in the wrapper you build:

- semantic block elements — real `<p>`, `<ul>`, `<blockquote>`,
  `<figure>`/`<figcaption>`, `<table>`;
- headings with **stable, human-readable ids**, which
  `specs/table-of-contents.md` and heading permalinks both depend on;
- a code block as `<pre><code>` with the language recorded;
- no wrapping of block elements in stray `<div>`s that break the
  vertical rhythm.

| Ecosystem | Starting points |
|---|---|
| Any (Markdown) | `unified` / `remark` / `rehype`, with `rehype-slug` for heading ids |
| React | MDX (`@mdx-js/react`, `next-mdx-remote`), `react-markdown` |
| Astro | built-in Markdown/MDX support |
| Vue / Svelte | `unified` in a build step, or the framework's own Markdown integration |

## Syntax highlighting

**Required by** `specs/code-block.md`.

The highlighter must be able to: emit real `<code>` content rather
than an image or a canvas; theme from this template's own tokens
rather than ship its own palette; and run at **build time** where the
platform allows, since a blog's code samples are static and shipping
a highlighter to the browser to re-derive them is waste.

| Ecosystem | Starting points |
|---|---|
| Build-time, any | Shiki, Prism (via `rehype-prism-plus`) |
| Runtime, React | `react-syntax-highlighter`, `shiki` in a worker |

**Check the contrast of whatever theme you adopt** against
`color.chrome.code-bg` in both themes. Highlighter themes are
routinely shipped with token colours below 4.5:1, and adopting one
unchecked silently undoes the contrast work in
`tokens/colors.json`.

## Images and avatars

**Required by** `foundations/imagery.md`.

| Need | Starting points |
|---|---|
| Responsive images, build-time optimisation | the framework's own pipeline (`next/image`, `astro:assets`, Vite plugins), or `sharp` in a build step |
| Generated avatars, where there are no photographs | DiceBear, `boring-avatars` |

## Composition rules

- **One library per category per project.** Two icon sets or two
  highlighters in one site is the most visible way to make it look
  unfinished.
- **Record the choice**, so the next person does not re-open the
  question and a replacement can be scoped.
- **A demo's choices are the demo's.** Where this template gains a
  `demo/`, its picks are not part of the template and must not be
  copied into a project on the strength of appearing there.
