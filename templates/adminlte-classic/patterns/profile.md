---
pattern: profile
references: [specs/disclosure.md, specs/list-group.md, specs/timeline.md, specs/card.md, specs/button.md, foundations/imagery.md, patterns/settings.md]
---

# Pattern: Profile Page

## Purpose

Describes the page a signed-in person's own account opens onto — the
destination `specs/navbar.md`'s account menu "Profile" item currently
has nowhere documented to lead. It composes `foundations/imagery.md`'s
large avatar treatment, a `specs/disclosure.md` Tabs row, and whichever
existing components each tab's content calls for (a `specs/list-group.md`
of details, a `specs/timeline.md` of activity).

**This pattern renders inside `patterns/app-shell.md`.** Unlike
`patterns/auth.md` and `patterns/error-page.md`, a profile page assumes
exactly the identity the shell already has — there is nothing to route
around here, and the Sidebar, Navbar and page header all apply as they
do to any other content-region page.

The distinction from its two closest neighbours:

- **`patterns/dashboard.md`** leads with numbers — several small
  metrics, then one detail table. A Profile page leads with **one
  person's identity** and organizes everything about them, which is a
  fundamentally different reading order (a name and a face first, not
  a row of stats).
- **`patterns/settings.md`** (a sibling pattern) is where the reader
  *changes* values — forms, save buttons, one group per Card. A
  Profile page is mostly read-only: it presents who someone is and
  what they have done, not fields to edit. A project that wants an
  editable profile field puts that editing inside Settings, not here;
  where a project genuinely needs one edit action *from* this page
  (an "Edit profile" Button), it is a single button that navigates to
  Settings, not a form embedded in this pattern.

## Page structure

1. **Page header** — provided by the shell (`patterns/app-shell.md`):
   the page title ("Profile") and breadcrumb. This pattern adds
   nothing to it.
2. **Identity header** — sits directly on the content region's
   `color.surface.muted` background, **not** inside a Card. A large
   avatar
   (`spacing.component.avatar-lg`, per `foundations/imagery.md`'s
   Avatars rules), the person's name in `font.heading.h2`, and a
   short role/bio line beneath it in `text.secondary`. An optional
   "Edit profile" Button (`specs/button.md`, outline emphasis) sits
   at the trailing edge of this block, navigating to
   `patterns/settings.md` rather than opening an inline form here.
   See Composition rules for why this block is not a Card.
3. **Tabs** — immediately below the identity header, a
   `specs/disclosure.md` Tabs row (not Pills — this sits directly in
   page content, not inside a Card header, which is exactly the
   placement that spec's Tabs-vs-Pills guidance calls for). At
   minimum an **About** tab and an **Activity** tab; a project adds
   others as needed (e.g. a read-only "Security" summary — never a
   password-change form, which belongs in Settings).
4. **Tab panels**:
   - **About** — a `specs/list-group.md` of label/value pairs (email,
     department, joined date, and similar static facts), composed
     inside a default-variant Card per `specs/card.md`'s List
     variant.
   - **Activity** — a `specs/timeline.md` of the person's recent
     actions, composed inside a Card the same way `patterns/dashboard.md`
     composes its own detail section.

## Composition rules

- The identity header is deliberately **not** a Card: a Card's header
  border and shadow would visually compete with the Tabs row directly
  beneath it, and nothing about the header needs a Card's affordances
  (no toolbar, no collapse, no footer link). Compare
  `patterns/dashboard.md`'s metrics row, which *is* Cards/Stat
  Callouts, because each metric there is an independent, boxed unit;
  this header is one continuous block, not several.
- Each tab panel's content composes inside its own Card — the Tabs
  row itself does not draw a container around the panels, per
  `specs/disclosure.md`'s anatomy.
- Must not contain a Data Table, a multi-field form, or any other
  component belonging to `patterns/settings.md` — an editable field
  found on this page is a sign the content belongs on that page
  instead, reached via the "Edit profile" Button.
- Must not nest a second Tabs or Accordion inside a tab panel, per
  `specs/disclosure.md`'s own rule against nesting disclosure inside
  disclosure.

## Accessibility rules

- The identity header's name is **not** a second `h1` — the shell
  already provides the page's `h1` ("Profile"). The name renders at
  `font.heading.h2` visually but is not itself a heading element;
  where a project wants it to be one for screen-reader navigation,
  it is an `h2`, matching the level a card sitting directly in the
  content region would take per `specs/card.md`'s heading-level rule
  — the identity header is a peer of the Tabs section, not nested
  inside it.
- Each tab panel's Card follows `specs/card.md`'s own heading-level
  rule for its header title, descending from whatever level the tab
  structure itself uses.
- The Tabs row's accessibility — `role="tablist"`, roving tabindex,
  arrow-key navigation — is entirely `specs/disclosure.md`'s and is
  not restated here.
- The avatar in the identity header is decorative when the name is
  already visible in text beside it, per `foundations/imagery.md`'s
  rule for avatars paired with a visible name.

## Responsive behavior

- **At or above `breakpoint.md`**: the identity header lays out
  avatar, name/bio, and the Edit-profile Button in a single row.
- **Below `breakpoint.md`**: the identity header stacks vertically —
  avatar, then name/bio, then the Button — centered, so a narrow
  viewport never truncates the name or button label.
- The Tabs row follows `specs/disclosure.md`'s own responsive rule
  (horizontal scroll on overflow, never wrapping to a second row) at
  every width.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.muted` | content region background behind the identity header |
| `spacing.component.avatar-lg` | identity header avatar |
| `font.heading.h2` | name |
| `color.text.secondary` | role/bio line |
| `spacing.6` | gap between the identity header and the Tabs row |
| `spacing.component.grid-gap` | gap between the Tabs row and its panel Card |
| `breakpoint.md` | the one layout threshold above |

## Reference visual description

Beneath the shell's own "Profile" title, a wide circular portrait
sits at the left of a plain block on the page's soft blue-gray
background — no card edge around it. Beside the portrait, a name in
large dark semi-bold type, a short gray line of role text beneath it,
and, at the far right of the same row, a thin outlined button reading
"Edit profile". Below that block, a row of two tab labels, "About"
underlined in blue as the active one, "Activity" in gray beside it.
Beneath the tabs, a white card holding a short list of labelled
facts, each row divided from the next by a hairline.
