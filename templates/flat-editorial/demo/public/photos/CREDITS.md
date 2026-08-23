# Photograph credits

Every file in this directory is a **real photograph**, in the public
domain or released under CC0 by a named photographer. Nothing here is
generated, and nothing is hotlinked at runtime.

They exist because `foundations/imagery.md` says a template never
supplies the pictures — an agent asks the user for them. This demo is
the user in that exchange, and these are what it supplied. They carry
no meaning about the articles they illustrate: they are stand-in
editorial photography, chosen for licence clarity, not for subject.

## The files

| Stem | Subject | Source | Licence |
|---|---|---|---|
| `deep-field` | Hubble eXtreme Deep Field | NASA / ESA, [HubbleSite](https://hubblesite.org/contents/media/images/2012/37/3097-Image.html) | Public domain — NASA imagery |
| `launch-pad` | Falcon 9 carrying DSCOVR, on the pad at Cape Canaveral | [SpaceX Photos](https://www.flickr.com/photos/spacexphotos/16511594820/) | Released into the public domain by SpaceX |
| `espresso` | A cup of espresso on a wooden table | Rachel Michetti, courtesy of Pikolo Espresso Bar | CC0 |
| `cat` | A cat, close up | Stefan van der Walt | CC0 |
| `greek-coins` | Greek coins from Pompeii | [Brooklyn Museum Collection](https://www.brooklynmuseum.org/opencollection/archives/image/51611) | No known copyright restrictions |
| `brick-wall` | A section of a brick wall | ambientCG (formerly CC0Textures), `Bricks25` | CC0 |
| `gravel` | Gravel | ambientCG (formerly CC0Textures), `Gravel04` | CC0 |

All seven reached this repository via the sample-data set bundled with
[scikit-image](https://scikit-image.org/) 0.24.0, whose
`skimage/data/_fetchers.py` records the photographer, the licence and
the original URL for each one — which is why these and not others:
the provenance is written down at the source rather than asserted
here. `brick-wall` and `gravel` had already been cropped, converted to
greyscale and rescaled by that project; the rest are unmodified
originals.

## What was done to them here

Each was centre-cropped to an aspect ratio, resized **down** to two
widths, and saved as progressive JPEG at quality 80. Nothing was
upscaled, so the widths differ per photograph — the larger of each
pair is the most the original honestly supports at that crop:

```
<stem>-<aspect>-<width>.jpg
```

Colour, contrast and framing are otherwise untouched, and no file has
a light or dark variant: `foundations/imagery.md` is explicit that a
photograph is not adjusted between themes.

## For a project using this template

These are demo assets and carry no permission beyond their own
licences. A real publication ships its own photographs and is
responsible for their licensing; see `../../../ATTRIBUTION.md`.
