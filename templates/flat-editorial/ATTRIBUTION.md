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

## No third-party assets

No icon, image, illustration or other asset from a third party is
included in this template. `foundations/iconography.md` and
`foundations/libraries.md` suggest icon libraries by name without
bundling any of them, and each carries its own licence — most
commonly MIT or ISC — which a consuming project should check before
adopting.

### The demo's artwork is original

`demo/src/components/Artwork.tsx` contains illustrations — the
specimen pieces used as article covers and figures in the visual
reference app. They are **original work**, authored here as inline SVG
and licensed under MIT with the rest of the repository. No stock
photograph, no third-party illustration set, and no binary image file
is bundled anywhere in this template.

They are drawn from `currentColor` and the accent tokens rather than
shipped as raster images, which is what `foundations/imagery.md`
prescribes for diagrammatic imagery — so the demo demonstrates that
rule rather than only stating it.

A project using this template for a real publication will ship
photographs of its own and is responsible for their licensing. This
template neither supplies nor requires any.

Should it become necessary to include any binary asset in this
template in future, that requires a separate licence check and an
update to this file.
