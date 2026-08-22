---
pattern: settings
references: [specs/list-group.md, specs/card.md, specs/text-input.md, specs/checkbox-radio-switch.md, specs/select.md, specs/button.md, specs/form-validation.md, specs/disclosure.md, patterns/profile.md]
---

# Pattern: Settings Page

## Purpose

Describes the page where a reader changes values that persist —
account preferences, notification toggles, security options. This
template's Sidebar already has a top-level "Settings" nav item and
the Navbar account menu a "Preferences" item, both currently leading
nowhere documented; this is that page.

**This pattern renders inside `patterns/app-shell.md`**, the same as
`patterns/profile.md` and unlike `patterns/auth.md`/`patterns/error-page.md`
— a settings page assumes the same signed-in identity the shell does.

The distinction from its closest neighbour, `patterns/profile.md`:
that pattern is mostly **read-only** — it presents who someone is.
This pattern is where reading stops and **editing** starts: forms,
save actions, validation. A field a reader can change belongs here,
never on the Profile page; a fact that only ever gets displayed
belongs there, never here.

## Page structure

1. **Page header** — provided by the shell (`patterns/app-shell.md`):
   the page title ("Settings") and breadcrumb. This pattern adds
   nothing to it.
2. **Section navigation** — a `specs/list-group.md` Navigational
   variant, in a `<nav>`, listing the settings groups on the page
   ("Profile", "Notifications", "Security"). See Composition rules
   for why this is a List Group and not a `specs/disclosure.md` Tabs
   row, which would be the other plausible choice.
3. **Section content** — one `specs/card.md` per group, stacked
   vertically, each with the group's name as its header title and a
   small form of Forms-primitive fields
   (`specs/text-input.md`, `specs/checkbox-radio-switch.md`,
   `specs/select.md`, and the rest of that set as needed) in its
   body, and its **own** Save Button (`specs/button.md`, solid) in
   its footer.

## Composition rules

- **List Group over Tabs, for the section navigation.** A settings
  page's groups are exactly the case `specs/disclosure.md` itself
  says does not want Tabs: "where each panel needs to be linkable or
  bookmarkable, the correct pattern is a set of pages with a
  navigation row that looks like tabs — `<a>` elements in a `<nav>`,
  without any tab roles at all." Each settings group is independently
  useful to link to (a support article linking straight to "Security",
  a deep link into a validation error), and every group is visible on
  the page at once — scrolled to, not swapped for — rather than one
  panel replacing another. That is List Group's Navigational variant,
  not Tabs.
- **One Card, one form, one Save Button — never a single page-wide
  form with one save button at the bottom.** A giant form loses the
  reader's place on a long page and cannot tell them which group of
  fields actually changed when it reports success. Each Card's Save
  Button submits only that Card's fields.
- Each Card's invalid/valid field presentation is
  `specs/form-validation.md`'s, not redefined here. A Card-level
  submission failure that isn't tied to one field (e.g. a server
  error saving the group) renders as that spec's Form-level summary
  Alert, scoped to the Card it failed in — never a page-level banner
  naming a section the reader has to go find.
- Must not contain a Data Table, a `specs/timeline.md`, or any other
  component belonging to `patterns/profile.md` — a fact with nothing
  to edit belongs there, not here.
- Must not nest a Tabs or Accordion inside a settings Card as a
  substitute for splitting the group into two Cards — a group large
  enough to want internal disclosure is two groups.

## Accessibility rules

- The section navigation is a real `<nav>` with an accessible name
  ("Settings sections") and `aria-current="page"` on the item
  matching the section currently in view or linked to, per
  `specs/list-group.md`'s own rule for its Navigational variant.
- Each Card's header title is a real heading, its level descending
  from the shell's page title without skipping — a Card sitting
  directly in the content region is an `h2`, per `specs/card.md`'s
  own heading-level rule; this pattern does not override it.
- **On a failed save, focus moves to the first invalid field within
  that Card**, per `specs/form-validation.md`'s general rule — scoped
  to the Card that failed, never to the page's first Card regardless
  of which one was submitted.
- A successful save is announced near the Card it applies to (e.g.
  a brief `role="status"` confirmation inside that Card, or beside
  its Save Button) rather than as a page-level interruption — the
  reader's attention is already on that Card, having just pressed its
  button.

## Responsive behavior

- **At or above `breakpoint.md`**: the section navigation is a fixed-
  width column at the leading edge; the section content column fills
  the remaining width beside it.
- **Below `breakpoint.md`**: the section navigation collapses above
  the content column, full width, the same stacking
  `patterns/app-shell.md`'s own Sidebar takes at this breakpoint.

## Tokens used

| Token | Usage |
|---|---|
| `color.surface.canvas` | section Card backgrounds |
| `color.text.secondary` | section navigation item labels, at rest |
| `spacing.component.grid-gap` | gap between the section navigation and content column, and between stacked section Cards |
| `breakpoint.md` | the one layout threshold above |

## Reference visual description

Beneath the shell's own "Settings" title, a narrow column at the
left lists three plain gray labels stacked vertically — "Profile",
"Notifications", "Security" — the first rendered in dark bold type
with a thin blue bar at its leading edge, marking it current. Beside
that column, a wide white card headed "Profile", holding a short
form of labelled fields, and at its bottom-right corner a solid blue
"Save changes" button. Below it, a second white card headed
"Notifications" with a column of toggle switches, its own "Save
changes" button beneath them — visually identical in shape to the
first card but entirely independent of it.
