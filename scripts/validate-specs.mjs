// Checks the parts of a spec that are facts rather than judgment:
// every token path resolves, every cross-reference exists and points
// back, and the catalog lists what the folder holds.
//
// Prose cannot be checked. This is exactly why the checkable facts
// should live somewhere a machine can read them.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const problems = [];
const fail = (file, msg) => problems.push({ file, msg });

const TOKEN_ROOTS = [
  "color",
  "spacing",
  "radius",
  "shadow",
  "font",
  "breakpoint",
  "duration",
  "easing",
];

// Front matter is a deliberately small YAML subset — scalars, inline
// lists, and maps nested two deep — so this repository needs no
// dependency to read its own specs. CONTRIBUTING.md documents the
// subset; anything outside it is a parse error rather than a surprise.
const FRONT_MATTER_KEYS = new Set([
  "component",
  "pattern",
  "foundation",
  "requires",
  "references",
]);

function parseFrontMatter(text, rel) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) {
    fail(rel, "front matter opens with --- but never closes");
    return null;
  }
  const body = text.slice(4, end);
  const out = {};
  let key = null;
  for (const raw of body.split("\n")) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indented = /^\s{2}\S/.test(raw);
    const line = raw.trim();
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) {
      fail(rel, `front matter line is outside the supported subset: "${line}"`);
      continue;
    }
    const [, name, value] = m;
    const parsed = value === "" ? {} : value.startsWith("[")
      ? value.slice(1, -1).split(",").map((v) => v.trim()).filter(Boolean)
      : value;
    if (indented) {
      if (!key) {
        fail(rel, `nested key "${name}" has no parent`);
        continue;
      }
      out[key][name] = parsed;
    } else {
      out[name] = parsed;
      key = name;
    }
  }
  return out;
}

async function loadTokens(templateDir) {
  const dir = path.join(templateDir, "tokens");
  const paths = new Set();
  const groups = new Set();
  for (const file of await readdir(dir)) {
    if (!file.endsWith(".json")) continue;
    const json = JSON.parse(await readFile(path.join(dir, file), "utf8"));
    const walk = (node, prefix) => {
      for (const [key, value] of Object.entries(node)) {
        if (key.startsWith("$") || !value || typeof value !== "object") continue;
        const full = prefix ? `${prefix}.${key}` : key;
        if ("$value" in value) paths.add(full);
        else {
          groups.add(full);
          walk(value, full);
        }
      }
    };
    walk(json, "");
  }
  return { paths, groups };
}

function tokenRefs(text) {
  // `color.brand.primary`, `spacing.component.card-padding`, `color.status.*`
  const refs = new Set();
  for (const m of text.matchAll(/`([a-z]+(?:\.[a-z0-9-]+|\.\*)+)`/g)) {
    const ref = m[1];
    if (TOKEN_ROOTS.includes(ref.split(".")[0])) refs.add(ref);
  }
  return refs;
}

function specRefs(text) {
  return new Set(
    [...text.matchAll(/`((?:specs|patterns|foundations)\/[a-z0-9-]+\.md)`/g)].map((m) => m[1]),
  );
}

async function main() {
  const templatesDir = path.join(ROOT, "templates");
  const catalog = JSON.parse(await readFile(path.join(ROOT, "catalog.json"), "utf8"));

  for (const id of await readdir(templatesDir)) {
    const templateDir = path.join(templatesDir, id);
    const { paths, groups } = await loadTokens(templateDir);
    const entry = catalog.templates.find((t) => t.id === id);
    if (!entry) fail("catalog.json", `template "${id}" exists on disk but is not in the catalog`);

    const docs = [];
    for (const kind of ["specs", "patterns", "foundations"]) {
      let files = [];
      try {
        files = await readdir(path.join(templateDir, kind));
      } catch {
        continue;
      }
      for (const file of files.filter((f) => f.endsWith(".md"))) {
        docs.push({
          kind,
          rel: `${kind}/${file}`,
          file: path.join(templateDir, kind, file),
          text: await readFile(path.join(templateDir, kind, file), "utf8"),
        });
      }
    }

    const known = new Set(docs.map((d) => d.rel));
    const meta = new Map();

    for (const doc of docs) {
      // 0. front matter, where a doc carries it
      const fm = parseFrontMatter(doc.text, doc.rel);
      if (!fm) fail(doc.rel, "has no front matter — every document opens with its dependency graph");
      if (fm) {
        meta.set(doc.rel, fm);
        for (const key of Object.keys(fm)) {
          if (!FRONT_MATTER_KEYS.has(key)) fail(doc.rel, `unknown front matter key "${key}"`);
        }
        const name = path.basename(doc.rel, ".md");
        const declared = fm.component ?? fm.pattern ?? fm.foundation;
        if (declared !== name) {
          fail(doc.rel, `front matter names "${declared}" but the file is ${name}.md`);
        }
        for (const ref of [...(fm.requires ?? []), ...(fm.references ?? [])]) {
          if (!known.has(ref)) fail(doc.rel, `front matter points at \`${ref}\`, which does not exist`);
        }
      }

      // 1. every token path resolves
      for (const ref of tokenRefs(doc.text)) {
        const base = ref.endsWith(".*") ? ref.slice(0, -2) : ref;
        const ok = ref.endsWith(".*") ? groups.has(base) : paths.has(base) || groups.has(base);
        if (!ok) fail(doc.rel, `token \`${ref}\` does not exist in tokens/*.json`);
      }

      // 2. every referenced doc exists
      for (const ref of specRefs(doc.text)) {
        if (!known.has(ref)) fail(doc.rel, `references \`${ref}\`, which does not exist`);
      }

      // 3. no emoji or box-drawing characters standing in for icons
      const glyphs = doc.text.match(/[\u{1F300}-\u{1FAFF}\u{25A0}-\u{25FF}]/gu);
      if (glyphs && !doc.text.includes("lint-allow-glyphs")) {
        fail(doc.rel, `contains glyphs used as icons: ${[...new Set(glyphs)].join(" ")}`);
      }
    }

    // 4. prose that claims to be referenced must match the graph.
    //    The inverse itself is derived, never stored — a stored inverse
    //    is a second copy of a fact, which is what drifts.
    const inverse = new Map();
    for (const [rel, fm] of meta) {
      for (const target of [...(fm.requires ?? []), ...(fm.references ?? [])]) {
        if (!inverse.has(target)) inverse.set(target, new Set());
        inverse.get(target).add(rel);
      }
    }
    if (process.argv.includes("--graph")) {
      console.log(`\n${id} — who depends on what (derived; nothing below is stored)\n`);
      for (const rel of [...meta.keys()].sort()) {
        const dependents = [...(inverse.get(rel) ?? [])].sort();
        console.log(`  ${rel}`);
        console.log(
          dependents.length
            ? `    ← ${dependents.join(", ")}`
            : "    ← nothing depends on this yet",
        );
      }
      console.log("");
    }

    for (const doc of docs) {
      const claimed = doc.text
        .split("**Referenced by**")
        .slice(1)
        .join(" ")
        .split("\n- ")[0];
      for (const m of claimed.matchAll(/`((?:specs|patterns|foundations)\/[a-z0-9-]+\.md)`/g)) {
        const other = m[1];
        if (!meta.has(other)) continue;
        if (!(inverse.get(doc.rel) ?? new Set()).has(other)) {
          fail(
            doc.rel,
            `prose says \`${other}\` references it, but that file's front matter does not`,
          );
        }
      }
    }

    // 5. the catalog lists what the folder holds
    if (entry) {
      const onDisk = docs.filter((d) => d.kind === "specs").map((d) => path.basename(d.rel, ".md"));
      for (const c of entry.components ?? []) {
        if (!onDisk.includes(c)) fail("catalog.json", `lists component "${c}" with no specs/${c}.md`);
      }
      for (const c of onDisk) {
        if (!(entry.components ?? []).includes(c)) {
          fail("catalog.json", `specs/${c}.md exists but the catalog does not list it`);
        }
      }
    }
  }


  if (problems.length === 0) {
    console.log("specs: all token paths, cross-references and catalog entries check out");
    return;
  }
  for (const p of problems) console.log(`  ${p.file}: ${p.msg}`);
  console.log(`\n${problems.length} problem(s)`);
  process.exitCode = 1;
}

await main();
