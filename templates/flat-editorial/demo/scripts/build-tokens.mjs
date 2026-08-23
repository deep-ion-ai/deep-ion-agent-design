// Reads the template's tokens/*.json (W3C Design Tokens format) and
// generates CSS custom properties for the demo to consume.
//
// This script exists ONLY so the demo can render using the same
// values defined in ../../tokens/*.json, for visual reference. It is
// not part of the template specification itself — an agent generating
// code for a real project should read the token JSON files directly,
// not this script or its output.
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensDir = path.resolve(__dirname, "../../tokens");
const outFile = path.resolve(__dirname, "../src/tokens.generated.css");

function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function shadowLayerToCss(layer) {
  return `${layer.offsetX} ${layer.offsetY} ${layer.blur} ${layer.spread} ${layer.color}`;
}

function tokenValueToCss(node) {
  if (node.$type === "shadow" && Array.isArray(node.$value)) {
    return node.$value.map(shadowLayerToCss).join(", ");
  }
  return String(node.$value);
}

function isTokenLeaf(node) {
  return node && typeof node === "object" && "$value" in node;
}

// tokens/colors-dark.json and shadows.json's `dark` group hold the dark
// theme as a mirror at color.dark.<path> / shadow.dark.<path> (see
// foundations/theming.md). Both themes must drive the SAME custom
// property, so the `dark` segment is stripped and the value routed to a
// separate block — `color.dark.surface.canvas` and
// `color.surface.canvas` both become `--color-surface-canvas`.
//
// Only position 1 counts: `color.neutral.dark` is a light-theme token
// that happens to be named "dark", and stays where it is.
function isDarkThemeToken(parts) {
  return parts.length > 2 && parts[1] === "dark" && (parts[0] === "color" || parts[0] === "shadow");
}

function walk(node, prefixParts, lines, darkLines) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (!value || typeof value !== "object") continue;

    const parts = [...prefixParts, toKebab(key)];
    if (isTokenLeaf(value)) {
      const dark = isDarkThemeToken(parts);
      const name = dark ? [parts[0], ...parts.slice(2)] : parts;
      (dark ? darkLines : lines).push(`  --${name.join("-")}: ${tokenValueToCss(value)};`);
    } else {
      walk(value, parts, lines, darkLines);
    }
  }
}

async function main() {
  const files = (await readdir(tokensDir)).filter((f) => f.endsWith(".json"));
  const lines = [];
  const darkLines = [];

  for (const file of files) {
    const raw = await readFile(path.join(tokensDir, file), "utf8");
    const json = JSON.parse(raw);
    walk(json, [], lines, darkLines);
  }

  const css = [
    "/* GENERATED FILE — do not edit by hand.",
    " * Produced by scripts/build-tokens.mjs from ../../tokens/*.json.",
    " * Run `npm run build-tokens` after changing the source token files. */",
    ":root {",
    "  color-scheme: light;",
    ...lines,
    "}",
    "",
    "/* The dark theme, per foundations/theming.md: an explicit choice wins",
    " * in BOTH directions, and the system preference applies when no",
    " * explicit choice has been made. */",
    '[data-theme="dark"] {',
    "  color-scheme: dark;",
    ...darkLines,
    "}",
    "",
    "@media (prefers-color-scheme: dark) {",
    '  :root:not([data-theme="light"]) {',
    "    color-scheme: dark;",
    ...darkLines.map((l) => `  ${l}`),
    "  }",
    "}",
    "",
  ].join("\n");

  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, css, "utf8");
  console.log(
    `Wrote ${lines.length} light + ${darkLines.length} dark CSS custom properties to ${path.relative(process.cwd(), outFile)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
