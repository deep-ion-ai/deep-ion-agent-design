// Photographs for the demo's covers. Demo scaffolding only — see
// ../../README.md and /AGENTS.md.
//
// WHERE THESE CAME FROM
//
// foundations/imagery.md says a template never supplies the pictures:
// an agent asks the user for them. That is exactly what happened here —
// this demo is the "user", and the photographs below are what it
// supplied. They are public-domain and CC0 files with a named
// photographer and a named licence for each; public/photos/CREDITS.md
// records every one, and ATTRIBUTION.md summarises the position.
//
// So the point of this file is not that these particular pictures
// matter. It is that the layout is built against REAL photographs,
// with real aspect ratios, real dark corners and real weight, rather
// than against a shape drawn to fit the layout perfectly.

const BASE = import.meta.env.BASE_URL;

export type Aspect = "16x9" | "21x9";

interface PhotoDef {
  /** Which crops exist on disk, and at which widths. The widths are
   *  what the source honestly supports — none is an upscale, which is
   *  why they differ per photograph rather than being one ladder. */
  crops: Partial<Record<Aspect, number[]>>;
  /** Shown to the reader nowhere in this demo; kept next to the asset
   *  so the credit cannot drift away from the file it belongs to. */
  credit: string;
  /** True when the photograph's own edges come close to a page
   *  background — foundations/imagery.md's one exception to "no
   *  border". See the hairline below for why one token covers both
   *  themes. */
  edgeBleeds?: true;
}

export const PHOTOS = {
  "deep-field": {
    crops: { "21x9": [500, 1000], "16x9": [500, 1000] },
    credit: "NASA, ESA, G. Illingworth, D. Magee, P. Oesch, R. Bouwens, HUDF09 Team — public domain",
    // Deep space is black to the frame's edge, and the dark canvas is
    // very nearly black too.
    edgeBleeds: true,
  },
  "launch-pad": {
    crops: { "16x9": [320, 640] },
    credit: "SpaceX — released into the public domain",
  },
  "brick-wall": {
    crops: { "16x9": [256, 512] },
    credit: "ambientCG (CC0)",
  },
  gravel: {
    crops: { "16x9": [256, 512] },
    credit: "ambientCG (CC0)",
  },
  espresso: {
    crops: { "16x9": [300, 600] },
    credit: "Rachel Michetti (CC0)",
  },
  "greek-coins": {
    crops: { "16x9": [240, 384] },
    credit: "Brooklyn Museum — no known copyright restrictions",
  },
  cat: {
    crops: { "16x9": [240, 451] },
    credit: "Stefan van der Walt (CC0)",
  },
} satisfies Record<string, PhotoDef>;

export type PhotoName = keyof typeof PHOTOS;

const RATIO: Record<Aspect, [number, number]> = {
  "16x9": [16, 9],
  "21x9": [21, 9],
};

export interface PhotoProps {
  name: PhotoName;
  aspect?: Aspect;
  /** Informative pictures say what they show. A cover beside its own
   *  headline is decorative — it takes alt="" so a screen reader is
   *  not read the same article twice (foundations/imagery.md). */
  alt?: string;
  /** The `sizes` attribute. Wrong `sizes` is worse than none: the
   *  browser picks the file from it, not from the rendered box. */
  sizes: string;
  /** The article cover is the page's largest contentful paint, and
   *  foundations/imagery.md forbids lazy-loading it. Everything else
   *  below the fold is lazy. */
  priority?: boolean;
  className?: string;
}

export function Photo({
  name,
  aspect = "16x9",
  alt,
  sizes,
  priority = false,
  className = "",
}: PhotoProps) {
  const def: PhotoDef = PHOTOS[name];
  const widths = def.crops[aspect];
  if (!widths) throw new Error(`photo "${name}" has no ${aspect} crop`);

  const [aw, ah] = RATIO[aspect];
  const largest = widths[widths.length - 1];
  const src = `${BASE}photos/${name}-${aspect}-${largest}.jpg`;
  const srcSet = widths.map((w) => `${BASE}photos/${name}-${aspect}-${w}.jpg ${w}w`).join(", ");

  return (
    // The box carries the ratio, so the space is reserved before the
    // file arrives and no paragraph is pushed down mid-read. The image
    // fills it with object-cover, which crops but never distorts.
    <div
      className={`w-full overflow-hidden bg-surface-sunken ${
        // The hairline is ONE rule for both themes, because the token
        // moves and the photograph does not: against the light canvas
        // a pale rule beside a black photograph is invisible, and
        // against the dark canvas the same token is lighter than the
        // page and separates. No dark: variant, no filter, no second
        // asset — foundations/imagery.md, Figures rule 3.
        def.edgeBleeds ? "border border-surface-rule" : ""
      } ${className}`}
      style={{ aspectRatio: `${aw} / ${ah}` }}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={largest}
        height={Math.round((largest * ah) / aw)}
        alt={alt ?? ""}
        // No filter, no dimming, no opacity — in either theme. That is
        // the one thing foundations/imagery.md says about photographs
        // and dark mode, and it is why this file has no theme logic.
        className="block h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // A cover that fails to load leaves the sunken box behind it,
        // never a broken-image glyph.
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />
    </div>
  );
}
