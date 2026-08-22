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

function walk(node, prefixParts, lines) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (!value || typeof value !== "object") continue;

    const parts = [...prefixParts, toKebab(key)];
    if (isTokenLeaf(value)) {
      lines.push(`  --${parts.join("-")}: ${tokenValueToCss(value)};`);
    } else {
      walk(value, parts, lines);
    }
  }
}

async function main() {
  const files = (await readdir(tokensDir)).filter((f) => f.endsWith(".json"));
  const lines = [];

  for (const file of files) {
    const raw = await readFile(path.join(tokensDir, file), "utf8");
    const json = JSON.parse(raw);
    walk(json, [], lines);
  }

  const css = [
    "/* GENERATED FILE — do not edit by hand.",
    " * Produced by scripts/build-tokens.mjs from ../../tokens/*.json.",
    " * Run `npm run build-tokens` after changing the source token files. */",
    ":root {",
    ...lines,
    "}",
    "",
  ].join("\n");

  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, css, "utf8");
  console.log(`Wrote ${lines.length} CSS custom properties to ${path.relative(process.cwd(), outFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
