---
pattern: wizard
references: [specs/progress-bar.md, specs/form-validation.md, specs/button.md, specs/card.md, specs/text-input.md, specs/select.md, specs/checkbox-radio-switch.md, specs/disclosure.md, specs/modal.md, patterns/settings.md]
---

# Pattern: Multi-step form (wizard)

## Purpose

Describes one task split across several sequential steps, submitted
once at the end: an onboarding flow, a multi-part application, a
guided import. Three merged specs already defer to this pattern —
`specs/card.md` rules multi-step forms out of a Card body and says
they belong "to a dedicated page pattern"; `specs/modal.md` rules a
wizard out of a modal; and `specs/progress-bar.md`'s Segmented
variant exists specifically for this shape.

**This pattern renders inside `patterns/app-shell.md`**, like
`patterns/settings.md` and `patterns/profile.md`.

Two neighbours it is easy to confuse it with:

- **`specs/disclosure.md`'s Tabs** are alternative views of the same
  thing, switchable in any order at any time. A wizard's steps are
  **sequential and gated**: step 3 may be unreachable until step 2 is
  valid, and the reader is meant to move through them in order. Tabs
  is the component someone reaches for by mistake here, and it is
  wrong for exactly the reason it is right elsewhere — free
  navigation between panels is the thing this pattern must not offer.
- **`patterns/settings.md`** is several *independent* groups, each
  saved on its own. A wizard is **one** submission at the end. If
  each step could sensibly be saved by itself, the content is a
  settings page and the sequence is imaginary.

## Page structure

1. **Page header** — provided by the shell: the page title and
   breadcrumb. This pattern adds nothing to it.
2. **Step indicator** — a `specs/progress-bar.md` Segmented bar, one
   segment per step, filled through the current step, with a
   "Step 2 of 4" label and the current step's name beside it. See
   Composition rules for why the segmented bar is the default rather
   than a numbered list of clickable step labels.
3. **Step panel** — a single `specs/card.md` holding **one step's
   fields at a time**, composed from the Forms primitives
   (`specs/text-input.md`, `specs/select.md`,
   `specs/checkbox-radio-switch.md` and the rest of that set). The
   Card's header title names the current step.
4. **Action row** — in the Card's footer: **Back** at the leading
   edge, **Next** (or **Finish** on the last step) at the trailing
   edge, following the ordering `specs/button.md` states for a
   dialog footer — the primary action last. Back is an outline
   Button, Next a solid one; there is exactly one solid action, which
   is the same one-primary-action-per-view rule `specs/button.md`
   already sets. Back is absent, not disabled, on the first step.

## Variants

- **Linear** — the default. Steps advance only through Next, and the
  step indicator is a progress display, not a control.
- **Revisitable** — completed steps may be returned to by activating
  them in the step indicator, which becomes a set of Buttons for the
  steps already passed and stays inert for those ahead. Use this only
  where a reader genuinely benefits from jumping back several steps
  at once; Back already covers the common case, and every clickable
  step is another way to arrive at a step whose preconditions have
  since changed.

There is no "non-linear wizard" variant. A form whose steps may be
completed in any order is not a wizard — it is a settings page
(`patterns/settings.md`) or a single long form.

## Composition rules

- **The step indicator is a Segmented Progress Bar, not a row of step
  labels.** A numbered list of steps reads as navigation and invites
  the reader to click ahead, which the Linear variant does not allow
  — an affordance the interface cannot honour is worse than none. The
  segmented bar shows position without implying free movement, and
  it degrades to a plain bar plus "Step 2 of 4" when there is no room
  for step names (see Responsive behavior).
- **Must not be rendered inside a `specs/modal.md`.** That spec
  already forbids it; the reason belongs here: a modal is dismissed
  by Escape and by a click outside it, and both would silently
  discard several steps of entered data. A wizard needs a page.
- **Must not be rendered inside a `specs/card.md` alongside other
  content** — the Card *is* the step panel, per Page structure.
- **One step, one Card.** Do not stack every step's Card on the page
  and hide the inactive ones: a hidden-but-present step keeps its
  fields in the tab order and in the accessibility tree, which is the
  same defect `specs/disclosure.md` warns about for a clipped panel.
- **Back never loses entered data.** Values already provided are
  restored when a step is returned to, including on the last step's
  Back. A wizard that clears a step on the way back is one the reader
  cannot safely check their own answers in.

## Accessibility rules

- **The step indicator states position in text**, not only as fill:
  "Step 2 of 4" is visible, and is part of the Progress Bar's
  accessible name per `specs/progress-bar.md`'s naming rule. Fill
  alone conveys nothing to a screen reader and nothing to a reader
  who cannot distinguish the filled segments from the empty ones.
- **Progress is never carried by colour alone** — the same rule this
  template states throughout. The segment count and the "Step 2 of 4"
  text both carry it.
- **Validation runs per step, on advancing** — not once at the end.
  The rules are `specs/form-validation.md`'s and are not restated
  here; what this pattern adds is *when*: pressing Next validates the
  current step only.
- **On a failed advance, focus moves to the first invalid field in
  that step**, exactly as `specs/form-validation.md` requires
  generally. The step does not change.
- **On a successful advance, focus moves to the new step's heading**
  (the Card's header title, made focusable for this purpose) **or to
  its first field.** Leaving focus on the Next button is the failure
  mode worth naming: the button stays under focus while the content
  around it is replaced, so a screen-reader user hears nothing change
  and a keyboard user's next Tab starts from the wrong end of a step
  they have not been told they reached.
- **The step panel's change is announced.** Replacing a step's
  content is a substantial page change with no navigation to trigger
  an announcement; moving focus as above is what does it, and is
  required rather than optional here for that reason.
- **Finish is distinguishable from Next.** The last step's primary
  action is labelled for what it does ("Create account", "Submit
  application") rather than "Finish", so a reader can tell that this
  press is the irreversible one.

## Responsive behavior

- **At or above `breakpoint.md`**: the step indicator shows the
  segmented bar, the "Step 2 of 4" label, and the current step's
  name.
- **Below `breakpoint.md`**: the step names are dropped and the
  indicator reduces to the segmented bar plus "Step 2 of 4" — four
  labelled steps will not fit, and truncating them to two words each
  communicates less than the count does.
- The step panel Card is full width at every size; its fields follow
  their own responsive rules, stacking to one column below
  `breakpoint.md`.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | step panel Card background (inherited from Card) |
| `color.text.secondary` | "Step 2 of 4" label |
| `spacing.component.grid-gap` | gap between the step indicator and the step panel |
| `spacing.4` | gap between fields within a step |
| `breakpoint.md` | the one layout threshold above |

## Reference visual description

Beneath the shell's page title, a thin bar spans the content width,
divided into four visibly separate segments; the first two are solid
blue and the last two pale gray. Just below it, in small gray type,
"Step 2 of 4" and then, in darker type, "Your details". Under that, a
single white card headed with the same step name, holding three
labelled fields stacked vertically. Across the card's footer, an
outlined "Back" button sits at the leading edge and a solid blue
"Next" at the trailing edge, with nothing between them. Nothing else
is on the page — no other card, and no way to reach step 4 from here.
