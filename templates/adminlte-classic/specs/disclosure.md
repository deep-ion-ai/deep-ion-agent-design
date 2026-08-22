---
component: disclosure
requires: [foundations/iconography.md]
references: [specs/button.md, specs/badge.md, specs/card.md]
---

# Component: Disclosure (Collapse, Accordion, Tabs & Pills)

## Purpose

Three ways of showing one panel of content at a time instead of all
of it at once. They share a mechanism — a trigger controls a panel's
visibility — and differ in what that mechanism is for, which is why
they are specified together but kept in clearly separate
sub-sections below rather than blurred into one generic component.

- **Collapse** — one trigger, one panel, no group. Detail the reader
  can open when they want it: an advanced-options section, a long
  explanation beneath a summary.
- **Accordion** — a stack of collapse sections sharing a container,
  read top to bottom. A list of topics the reader works through one
  at a time.
- **Tabs & Pills** — a row of triggers where exactly one panel is
  visible at all times. Alternative views *of the same thing*: a
  record's details, activity and permissions.

Choosing between them is a content question, not a styling one:

- If the panels are **alternatives** and one must always be showing,
  it is Tabs. If they are **details** that may all be closed, it is
  an Accordion or a Collapse.
- If there is **one** panel, it is a Collapse — an accordion of one
  is just a collapse with extra markup.
- Content that is hidden is content that is harder to find, will not
  be caught by the browser's find-in-page, and may not print. None
  of these components is the right home for something the reader
  needs on arrival.

Two neighbours: a **Dropdown Menu** (`specs/dropdown-menu.md`)
floats above the page and holds actions, not content; these three
expand in flow and push the page down. A **Modal**
(`specs/modal.md`) interrupts.

## Anatomy

### Collapse

1. **Trigger** (required) — a Button (`specs/button.md`), usually
   the link or outline variant, carrying a label that names what
   will appear ("Advanced options"), plus a chevron glyph that
   rotates between states.
2. **Panel** (required) — the content region the trigger controls,
   appearing directly beneath it in the document flow.

### Accordion

1. **Container** (required) — a vertical stack of sections with a
   1px `surface.border` outline and `radius.base` corners, its
   sections separated by 1px dividers, so the group reads as one
   object.
2. **Section header** (required, 1..n) — a full-width trigger: a
   short label at the leading edge, a chevron at the trailing edge.
   Background `neutral.light` at rest.
3. **Section panel** (required, one per header) — the content,
   revealed beneath its own header, padded to match the card
   padding used elsewhere in the template.

### Tabs & Pills

1. **Tab list** (required) — a horizontal row of triggers above the
   panel, in DOM order matching visual order.
2. **Tab** (required, 2..n) — a trigger carrying a short label and,
   optionally, a leading icon or a trailing Badge
   (`specs/badge.md`) for a count. A single tab is not a tab list.
3. **Panel** (required, one per tab) — the content of the selected
   tab, beneath the tab list, in a region that keeps a stable
   height where practical so the page does not jump between tabs.

## Variants

- **Accordion: single-open / multi-open** — single-open closes the
  previously open section when a new one opens; multi-open lets any
  number stand open. **Multi-open is the default here**, diverging
  from the reference's single-open behavior: closing a section the
  reader did not ask to close loses their place, and single-open
  should be reserved for cases where the sections are genuinely
  alternatives — at which point Tabs is usually the better
  component. When single-open is used, it must be a deliberate
  choice recorded in the consuming project.
- **Accordion: initially open section** — zero or one section open
  on load. Opening none is right when the reader is scanning
  headings; opening the first is right when there is an obvious
  starting point.
- **Tabs vs. Pills** — the same component with two visual
  treatments. **Tabs**: the active trigger is joined to the panel by
  a shared edge, with an underline or border in
  `color.brand.primary` marking it. **Pills**: the active trigger is
  a filled `radius.pill` shape in `brand.primary` with
  `text.on-accent` text, detached from the panel. Pills suit a tab
  row inside a card header, where a bordered tab strip would fight
  the card's own edges. The choice is presentational only —
  behavior, markup and keyboard handling are identical.
- **Tabs: horizontal scroll on overflow** — when tabs exceed the
  available width they scroll horizontally within the tab list;
  they never wrap to a second row, which breaks the relationship
  between the row and the panel beneath it.

## States

- **Collapsed / expanded** (Collapse, Accordion sections) — the
  panel's height animates over ~200ms; the chevron rotates. Both
  are skipped under a reduced-motion preference, which switches to
  an instant show/hide rather than a fade, since a fading height is
  the part that causes discomfort.
- **Trigger hover / focus / active** — per `specs/button.md`. In an
  Accordion, hover shades the whole section header, not just its
  label.
- **Tab: selected / unselected** — exactly one tab is selected at
  all times. Selected is marked by more than colour: the underline
  (tabs) or the filled shape (pills) is a shape change as well as a
  colour change.
- **Trigger disabled** — a section or tab whose content is
  unavailable renders disabled rather than being removed, so the
  set of options stays stable between visits. A disabled tab is
  never the selected one.
- **Loading** — when a panel's content is fetched on first open, the
  panel opens immediately at a stable height with skeleton content
  and `aria-busy="true"` on the panel. It must not stay closed while
  loading: the reader pressed the trigger and needs to see that
  something happened.
- **Error** — a panel whose content failed to load shows an inline
  message and a retry action inside the panel, leaving the trigger
  and the rest of the group untouched.

## Accessibility rules

The three patterns need **different** ARIA. Applying tab semantics
to an accordion, or disclosure semantics to tabs, is the common
failure here — they are not interchangeable.

### Collapse and Accordion

- The trigger is a real `<button>` carrying `aria-expanded`
  (`true`/`false`) and `aria-controls` referencing the panel's id.
  Not a `<div>`, and not a link: this toggles visibility, it does
  not navigate.
- The panel, when collapsed, is genuinely hidden from the
  accessibility tree and the tab order — not clipped with overflow,
  which leaves its focusable contents reachable by Tab with nothing
  visible on screen.
- The trigger's accessible name stays **constant** across states;
  `aria-expanded` carries the state. Swapping the label between
  "Show" and "Hide" while `aria-expanded` also flips announces the
  state twice and costs voice-control users a stable phrase.
- In an Accordion, each section header sits inside a heading element
  (`h2`–`h6`, at the level appropriate to the page) that wraps the
  button, so screen-reader users can navigate the sections by
  heading. The heading provides structure; the button provides the
  control.
- Keyboard: Enter and Space toggle the focused trigger. **Tab moves
  between triggers** — arrow keys are not required for an accordion
  and must not be used to *replace* Tab, because an accordion is a
  sequence of independent disclosures, not a single composite
  widget.
- Focus stays on the trigger when a panel opens. Do not move focus
  into the panel: the reader can reach it with the next Tab, and
  moving it silently skips content between them.
- Collapsing a section that contains focus moves focus back to that
  section's trigger, never leaving it on a hidden element.

### Tabs & Pills

- The tab list is `role="tablist"`; each trigger is `role="tab"`
  with `aria-selected` and `aria-controls`; each panel is
  `role="tabpanel"` with `aria-labelledby` pointing at its tab.
- **Only the selected tab is in the tab order** (`tabindex="0"`);
  the others are `tabindex="-1"`. This is the roving-tabindex
  pattern, and it is what makes a long tab row navigable — Tab
  reaches the row, then leaves it for the panel.
- Keyboard, within the tab list: Left/Right Arrow move between tabs
  and wrap at the ends; Home/End jump to the first/last. Arrow keys
  select as they move (the panel changes with focus), which is the
  expected behavior when panels are cheap to render; where a panel
  is expensive, arrows move focus only and Enter or Space selects —
  pick one per project and apply it everywhere.
- The panel is focusable (`tabindex="0"`) **only** when it contains
  no focusable elements of its own, so a keyboard user can still
  reach and scroll it. Adding it unconditionally puts a stop in the
  tab order that does nothing.
- Selecting a tab does not move focus into the panel. Tab from the
  selected tab lands there next.
- A tab's accessible name is its label; a trailing count Badge is
  folded into that name ("Comments, 4"), following
  `specs/badge.md`'s rule against orphan numbers.
- Tabs are not links and do not navigate. Where each panel needs to
  be linkable or bookmarkable, the correct pattern is a set of pages
  with a navigation row that looks like tabs — and then they are
  `<a>` elements in a `<nav>`, without any tab roles at all. Making
  that call is part of using this component.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **May contain**: any content in a panel, including Cards, Data
  Tables, forms and other components — with one exception below.
- **Must not contain**: a nested Accordion or Tabs inside another's
  panel. Nesting disclosure inside disclosure hides content two
  levels deep, and the reader has no way to know it is there.
- **Must not hold**: content required to complete a form the reader
  is filling in, error messages, or anything the page's primary
  task depends on. Hidden content is missed content.
- **Uses**: `specs/button.md` (triggers), `specs/badge.md` (counts
  on tabs).
- **Placement**: an Accordion or Collapse sits in a Card body or in
  page content. A tab list sits either directly in page content or
  at the top of a Card body — a pills row may sit in a Card header
  (`specs/card.md`), where it replaces the header's title area
  rather than crowding it.
- **Relationship to the Card header toolbar**: `specs/card.md`'s
  collapse control toggles an entire card and is specified there.
  This component's Collapse toggles a region *within* content. A
  card whose body is one collapsible region should use the card's
  own control rather than nesting a second collapse inside it.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.border` | accordion container border, section dividers, tab strip baseline |
| `color.neutral.light` | accordion header background, trigger hover |
| `color.surface.canvas` | panel background |
| `color.brand.primary` | active tab underline, pill fill, focus ring |
| `color.text.on-accent` | active pill label |
| `color.text.primary` | trigger labels, panel text |
| `color.text.secondary` | inactive tab labels, chevron glyphs |
| `radius.base` | accordion container corners |
| `radius.pill` | pill-variant trigger shape |
| `spacing.component.card-padding` | panel padding |
| `spacing.3` | trigger vertical padding |
| `spacing.4` | trigger horizontal padding |
| `font.size.sm` | trigger labels |
| `font.weight.medium` | active tab, accordion header label |

## Reference visual description

Three arrangements of the same idea. First, a lone blue text link
with a small chevron beside it; pressing it drops a block of text
into place beneath, pushing everything below it down, and the
chevron turns a quarter turn. Second, a bordered stack of four
light-gray strips, each with a short heading and a chevron at its
right end; one strip has opened to reveal white content beneath it,
and the others sit closed above and below. Third, a row of four
labels running along the top of a card body, the first one darker
and heavier than the rest with a blue line drawn under it that
merges into the white area below; the other three are gray and
unremarkable until hovered. In a card header elsewhere, the same row
appears instead as three small capsules, the active one solid blue
with white text.
