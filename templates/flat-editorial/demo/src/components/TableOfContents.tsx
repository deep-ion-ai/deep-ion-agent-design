import { useEffect, useState } from "react";
import { focusRing } from "./focus";

// Visual reference implementation of specs/table-of-contents.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// It earns its place on a long or reference-shaped article and only
// there — that spec sets a threshold (roughly six headings) rather than
// leaving it to taste.

export interface TocEntry {
  id: string;
  label: string;
  level: 2 | 3;
}

export const TOC_HEADING_THRESHOLD = 6;

function activate(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Focus moves to the target heading, not just the scroll position.
  // Scrolling alone leaves a keyboard user's focus at the top of the
  // document, so their next Tab returns them to where they started —
  // the defect that makes most tables of contents useless by keyboard.
  el.focus({ preventScroll: true });
}

function List({ entries, currentId }: { entries: TocEntry[]; currentId?: string }) {
  return (
    <ul className="space-y-2">
      {entries.map((e) => {
        const current = e.id === currentId;
        return (
          <li key={e.id} className={e.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${e.id}`}
              onClick={(ev) => {
                ev.preventDefault();
                activate(e.id);
              }}
              className={`block border-l-2 py-0.5 pl-3 font-ui text-sm transition-colors duration-state ease-standard ${focusRing} ${
                current
                  ? "border-accent-base font-medium text-text-primary"
                  : "border-transparent text-text-secondary hover:text-accent-base"
              }`}
            >
              {/* Verbatim heading text: shortening it breaks the
                  correspondence the reader is relying on. */}
              {e.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** In the article flow, between the byline and the first paragraph.
 *  The default, and the only variant below breakpoint.lg. */
export function TableOfContentsInline({ entries }: { entries: TocEntry[] }) {
  if (entries.length < TOC_HEADING_THRESHOLD) return null;
  return (
    <nav
      aria-label="Contents"
      className="my-12 border-y border-surface-rule py-6 lg:hidden"
    >
      <h2 className="mb-3 font-ui text-xs uppercase tracking-wide text-text-secondary">Contents</h2>
      <List entries={entries} />
    </nav>
  );
}

/** In the margin beside the article, sticky, with the current section
 *  marked. Available only at breakpoint.lg and above — and the reading
 *  measure is NEVER reduced to make room for it. */
export function TableOfContentsSidebar({ entries }: { entries: TocEntry[] }) {
  const [currentId, setCurrentId] = useState<string | undefined>(entries[0]?.id);

  useEffect(() => {
    if (entries.length === 0) return;
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrentId(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    for (const e of entries) {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < TOC_HEADING_THRESHOLD) return null;

  return (
    // The marker is a pointer-user convenience and stays VISUAL: updating
    // a live region as the reader scrolls produces continuous chatter.
    <nav aria-label="Contents" className="sticky top-12">
      <h2 className="mb-3 font-ui text-xs uppercase tracking-wide text-text-secondary">Contents</h2>
      <List entries={entries} currentId={currentId} />
    </nav>
  );
}
