# Classic Admin (`adminlte-classic`)

## What this is

A visual identity template for AI-generated admin dashboards. It
defines the palette, typography, spacing, and component behavior for
a dense, data-forward "back office" look — the kind of interface
built for internal tools, admin panels, and analytics dashboards
where information density matters more than marketing polish.

`adminlte-classic` is this template's technical folder identifier.
When talking to a user, refer to it by its display name, **"Classic
Admin."**

## Personality

- **Dense but calm.** Content is packed (compact table rows, tight
  card padding) without feeling cluttered — achieved through
  restrained shadows and a muted page background that keeps white
  cards as the clear focal surfaces.
- **Confident, not decorative.** One primary blue drives every call
  to action and active state; status colors (green/red/yellow/cyan)
  are used sparingly and only to carry meaning, never as decoration.
- **Businesslike typography.** A humanist sans-serif at a moderate
  size scale — no oversized display type, no ultra-light weights.
  Everything reads like it was built to be scanned quickly by
  someone doing their job, not admired.
- **Structural, not skeuomorphic.** Elevation is a hint (a nearly
  imperceptible shadow), not a design statement. Corners are
  discreetly rounded, never pill-shaped, except for badges.
- **Dark chrome, light content.** A dark side-navigation frame with a
  light, white-and-gray content area is the template's most
  recognizable structural signature.

## When to use it

Use "Classic Admin" for:

- Internal admin panels and back-office tools.
- Analytics/reporting dashboards with metric summaries and record
  listings.
- Any product surface where the primary user is staff, not an
  end-customer, and where scanning many records quickly matters more
  than a distinctive brand statement.

It is probably not the right choice for a consumer-facing marketing
site, a highly branded product experience, or a mobile-first
consumer app — its density and neutrality are built for operational
UIs.

## What's included in this POC

- `tokens/` — colors, typography, spacing, border radii, shadows,
  and breakpoints, in W3C Design Tokens format.
- `specs/card.md` — the Card (list item / summary card) component.
- `specs/data-table.md` — the Data Table component (sorting,
  pagination, states).
- `patterns/dashboard.md` — how Card and Data Table compose into a
  single overview page.
- `demo/` — a React + Tailwind app rendering the above, for human
  visual reference only (see `demo/README.md`).
- `ATTRIBUTION.md` — provenance and licensing notes.

This is a proof of concept scoped to exactly these two components
and one page pattern — it is not a complete component library.

## How to use this with an AI coding agent

Point your agent (e.g. Claude Code) at this repository and ask it to
build using the "adminlte-classic" template — it will discover this
template via `/catalog.json` and read `tokens/`, `specs/`, and
`patterns/` on its own, per the rules in `/AGENTS.md`. You should not
need to paste the contents of these files into your prompt.
