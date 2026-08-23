---
foundation: motion
references: [foundations/libraries.md, foundations/theming.md]
---

# Foundation: Motion

## Purpose

Defines the two durations this template animates at, when each
applies, and what happens when a reader has asked for less motion —
so that a spec can say "this uses `duration.layout`" instead of
picking a number, and so the reduced-motion rule is written down once
instead of being paraphrased in every spec that happens to animate
something.

Before this file existed, eleven specs each restated some version of
"~150ms, skipped under a reduced-motion preference", and the two
durations were already drifting apart with no stated reason for the
difference. The values in `tokens/motion.json` are not new: they are
the two groups those specs had independently converged on, named.

The house style this encodes: **motion in an admin interface is
functional or it is absent.** It shows where something came from, or
that a thing the reader is looking at is the same thing that just
moved. Nothing here animates to be noticed.

## The two durations

| Token | Job |
|---|---|
| `duration.state` | A property changes **in place** |
| `duration.layout` | Something changes **size or position** |

- **`duration.state`** — a hover colour, a shadow lifting, an opacity
  fade, a small scale on a value that just updated. Nothing moves and
  nothing reflows, so it can afford to be quick.
- **`duration.layout`** — a panel's height opening, a drawer sliding
  in from an edge, a card body collapsing. Slower, because the eye is
  tracking an edge across a distance, and because these are the
  transitions that push other content around.

Both use `easing.standard`. The one exception is something leaving
the screen entirely — a dismissed Alert, a closing drawer — which
uses `easing.exit`: it accelerates away without decelerating, because
there is no arrival to land.

**`duration.hover-intent` is not a duration in this sense.** It is
the delay before a hover-triggered surface appears (see
`specs/tooltip.md`), and it exists so a pointer crossing an element
does not flash something it never meant to open. It has no
reduced-motion behaviour, because a delay is not motion.

If a transition seems to need a third duration, it is usually one of
two things: an animation that is decorative and should be removed, or
a `duration.layout` change large enough that the content should
simply be replaced rather than animated between states.

## Reduced motion

**Every animation in this template is conditional on the reader not
having asked for less of it.** Where a platform exposes that
preference — `prefers-reduced-motion` on the web, and the equivalent
accessibility setting elsewhere — honouring it is a requirement, not
an enhancement.

What that means in practice is more specific than "turn animation
off", and getting it wrong in the obvious way makes things worse:

- **A height, size or position change becomes an instant show/hide.**
  Not a fade. Vestibular discomfort is caused by the movement, and a
  cross-fade of a large area is its own problem — swapping one for
  the other is not a fix.
- **A `duration.state` change may simply become instant.** These are
  small and in place, and are rarely the cause of trouble; the
  simplest correct behaviour is to apply the end state immediately.
- **A continuous or looping animation stops being continuous.** A
  sweeping indeterminate `specs/progress-bar.md` becomes a slow
  opacity pulse: the reader still needs to know something is running,
  and removing the only indicator of that in the name of reduced
  motion trades one accessibility problem for another.
- **The end state is always reached.** Reduced motion removes the
  transition, never the outcome. A panel that was going to be open is
  open.

Per-component substitutions live with the component, since they
depend on what that component was communicating. This file states the
rule; `specs/disclosure.md` and `specs/progress-bar.md` are the two
that currently need to say more than it does.

## What must never animate

- **Focus rings.** A ring that eases in is a ring that is not there
  when a fast keyboard user arrives, and focus position is the one
  thing that must be unambiguous at all times.
- **Anything the reader is waiting on.** An error message, a
  validation result, a search result. Delaying information behind an
  animation to make it feel considered makes the interface slower and
  the message easier to miss.
- **A switch between themes.** A full-page colour transition is
  large-area motion, and it delays exactly the thing that was asked
  for. See `foundations/theming.md`.
- **Content arriving in a list or table.** Rows that animate in on
  every render make a data-dense page unreadable, and a page built
  from this template is data-dense by design.

## Motion is never the only signal

A state that is communicated by movement alone is invisible to a
reader with reduced motion enabled, to anyone who looked away, and to
assistive technology, which has no concept of the animation at all.
Whatever a transition shows, the end state must also carry it —
through text, a shape, an ARIA state, or position.

This is the same rule this template already applies to colour in
`specs/form-validation.md`, `specs/alert.md` and
`tokens/colors.json`'s `text.accent.*` group, and it fails the same
way for the same reason.

## What this foundation does not cover

- **Chart and data-visualisation animation** stays with
  `foundations/libraries.md`, whose requirement on any charting
  library is "no animation, or animation that can be disabled". A
  chart library's built-in transitions are not built from these
  tokens and are governed by that requirement instead.
- **Loading and skeleton states.** Whether a component shows a
  skeleton, a spinner or nothing is a per-component decision, stated
  in that component's States section. This file governs only how the
  transition between them is timed.

## Tokens used

| Token | Usage |
|---|---|
| `duration.state` | in-place property transitions |
| `duration.layout` | size and position transitions |
| `duration.hover-intent` | delay before a hover-triggered surface appears |
| `easing.standard` | default for both durations |
| `easing.exit` | something leaving the screen entirely |

## Reference visual description

Almost nothing on the page is moving. A pointer crossing a card lifts
its shadow by a barely perceptible amount, over about the time it
takes to notice. Pressing a card's collapse chevron folds the body
upward, a little slower, the content below sliding up to meet it
rather than jumping. A drawer enters from the trailing edge at the
same pace and stops without bouncing. Nothing pulses, nothing draws
attention to itself, and with the system's reduce-motion setting on,
the same interactions produce the same end states with the
in-between removed — the card is simply collapsed, the drawer is
simply there.
