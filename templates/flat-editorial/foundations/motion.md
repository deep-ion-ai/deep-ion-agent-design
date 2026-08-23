---
foundation: motion
references: [foundations/libraries.md, foundations/theming.md]
---

# Foundation: Motion

## Purpose

Defines the durations this template animates at and what happens when
a reader has asked for less motion. It is short, because this
template animates very little on purpose.

**A reading page should be still.** There is no data arriving, no
layout reflowing, and nothing that benefits from being watched. A
transition competing with a paragraph is a transition that should not
exist. Where an application template uses motion to explain where a
panel came from, this one mostly has nothing to explain.

## The two durations

| Token | Job |
|---|---|
| `duration.state` | A property changes **in place** |
| `duration.layout` | Something changes **size or position** |

- **`duration.state`** (120ms) — a link's underline appearing, a
  button's fill deepening, a tag's background on hover. Shorter than
  the 150ms an application template uses: this is pointer-following
  feedback on a page where the pointer is mostly at rest, and lag
  reads as sluggishness rather than as polish.
- **`duration.layout`** (200ms) — in this template, one thing only:
  the mobile navigation panel opening. There is no accordion, no
  collapsing card, no animated height anywhere in an article.

Both use `easing.standard`, except something leaving the screen
entirely — the navigation panel closing — which uses `easing.exit`.

If a transition seems to need a third duration, it is usually an
animation that should be removed.

## Reduced motion

**Every animation here is conditional on the reader not having asked
for less of it.** Where a platform exposes that preference, honouring
it is a requirement.

- **A size or position change becomes an instant show/hide** — not a
  fade. Swapping one large-area motion for another is not a fix.
- **A `duration.state` change becomes instant.**
- **The end state is always reached.** Reduced motion removes the
  transition, never the outcome.

There are no per-component exceptions in this template, because there
is no looping or continuous animation anywhere in it to make one for.

## What must never animate

- **Focus rings.** A ring that eases in is not there when a fast
  keyboard user arrives.
- **Anything the reader is waiting on** — a form's validation
  result, a search result.
- **A switch between themes.** See `foundations/theming.md`: a
  full-page colour transition is large-area motion, and it delays
  exactly what was asked for.
- **Text.** No word-by-word reveals, no headline animations, no
  scroll-triggered fade-ins on paragraphs. This is worth stating
  plainly because it is a common blog-template flourish and it is
  actively hostile: it delays reading, breaks find-in-page, and
  behaves unpredictably when a reader scrolls back up.
- **Images arriving.** An image fading in as it loads shifts the
  reader's attention to the loading rather than to the article; see
  `foundations/imagery.md` on reserving space instead.

## Motion is never the only signal

A state communicated by movement alone is invisible to a reader with
reduced motion enabled, to anyone who looked away, and to assistive
technology. Whatever a transition shows, the end state must also
carry — through text, shape, an ARIA state, or position.

## What this foundation does not cover

Scroll behaviour. Smooth-scrolling to an anchor from a table of
contents is the platform's, governed by the reader's own
`prefers-reduced-motion` setting at the platform level; this template
neither requires nor forbids it, and does not define a duration for
it.

## Tokens used

| Token | Usage |
|---|---|
| `duration.state` | in-place property transitions |
| `duration.layout` | the navigation panel |
| `easing.standard` | default for both |
| `easing.exit` | the navigation panel closing |

## Reference visual description

Nothing on the page is moving. A pointer crossing a link brings up an
underline almost as fast as the eye registers the pointer arriving. A
tag picks up a pale violet background just as quickly. On a narrow
screen, pressing the menu button slides a panel in from the trailing
edge and stops it without a bounce. Scrolling the length of a long
article produces no animation of any kind: the text is simply there,
all of it, from the moment the page loads.
