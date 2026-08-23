// The focus ring specs/button.md, specs/prose.md and specs/tag.md all
// require: 2px color.accent.base, offset from the container so a border
// does not absorb it. Defined once so it cannot drift between components.
//
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
export const focusRing =
  "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-base";
