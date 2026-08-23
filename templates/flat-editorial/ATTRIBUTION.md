# Attribution — "flat-editorial" template ("Flat Editorial")

## This identity is original

**Nothing in this template was derived from another project's visual
identity.** The palette, the type scale, the spacing scale and every
component specification here were designed for this repository.

This is a different situation from the sibling `adminlte-classic`
template, whose identity *was* reverse-engineered by observing the
public look and feel of AdminLTE and which therefore carries a
provenance record in its own `ATTRIBUTION.md`. This file exists to
state plainly that no equivalent record is needed here — an absent
`ATTRIBUTION.md` would leave a reader unsure whether provenance had
been checked or merely skipped.

There is consequently no third-party licence to reproduce, no
upstream project to credit, and no name that must be kept out of
user-facing copy. All content in this directory is original work by
deep-ion-ai, licensed under MIT along with the rest of this
repository — see `/LICENSE`.

## On the influences that exist anyway

No visual identity is made in a vacuum, and this one sits in a
well-populated tradition: the serif-body/sans-chrome pairing, a
capped reading measure, and flat surfaces separated by hairlines are
long-standing conventions of editorial and web typography rather than
anyone's property. Conventions are not assets. What is protectable —
a specific set of values, a specific arrangement, a specific
wording — was authored here.

## Fonts are named, not bundled

`tokens/typography.json` names three type families as the intended
faces:

- **Source Serif 4** — SIL Open Font License 1.1
- **Inter** — SIL Open Font License 1.1
- **JetBrains Mono** — SIL Open Font License 1.1

All three are open source and were chosen partly for that reason.
**No font binary is included in this repository.** The token file
records the family names and a fallback stack; a consuming project
installs the fonts itself, and `foundations/libraries.md` suggests
how. That project is responsible for complying with the licence of
whatever it installs — including the OFL's requirements if it
redistributes the font files, and any different terms if it
substitutes a different family.

The fallback stacks additionally name system and licensed faces
(Charter, Georgia, Segoe UI, Consolas and others) purely as CSS
fallbacks. Naming a font in a fallback stack neither copies nor
redistributes it.

## No third-party assets in the template itself

No icon, image, illustration or other asset from a third party is
included in the specification side of this template — `tokens/`,
`foundations/`, `specs/` and `patterns/` bundle nothing.
`foundations/iconography.md` and `foundations/libraries.md` suggest
icon libraries by name without shipping any of them, and each carries
its own licence — most commonly MIT or ISC — which a consuming project
should check before adopting.

The template **specifies no photograph and supplies none**.
`foundations/imagery.md` is explicit that the pictures belong to the
publication and that an agent asks the user for them; a project using
this template for a real publication ships its own and is responsible
for their licensing.

### The demo bundles photographs, and they are credited

`demo/public/photos/` holds sixteen JPEG files — seven photographs at
two widths each, plus a second crop of one of them at two widths. They are there because
the demo is the "user" in the exchange `foundations/imagery.md`
describes, and a visual reference app built against drawings would not
show what this identity does with a real picture.

**Every one is in the public domain or released under CC0**, with a
named photographer or issuing body:

- **NASA / ESA** and **SpaceX** — released into the public domain.
- **Rachel Michetti**, **Stefan van der Walt**, and **ambientCG**
  (two textures) — CC0.
- **Brooklyn Museum** — no known copyright restrictions.

All seven reached this repository through the sample-data set bundled
with scikit-image, whose source records the photographer, the licence
and the original URL for each — the provenance is written down at the
source rather than asserted here.
`demo/public/photos/CREDITS.md` carries the full table, the original
links, and exactly what was done to each file (a centre crop, a
downscale, and a JPEG encode; no upscaling, no colour work).

These are demo assets and carry no permission beyond their own
licences. They are not part of the template, and a project adopting
the template does not inherit them.

### The demo's one drawing is original

`demo/src/components/Diagram.tsx` is **original work**, authored here
as inline SVG and licensed under MIT with the rest of the repository.
It stays a drawing because its content is diagrammatic, which is what
`foundations/imagery.md` prescribes for that case — so the demo
demonstrates the rule rather than only stating it.

Should it become necessary to bundle any further third-party asset,
that requires a separate licence check and an update to this file.
