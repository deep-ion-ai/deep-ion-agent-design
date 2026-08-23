import { focusRing } from "./focus";

// Visual reference implementation of specs/tag.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// A tag is always a link, and every tag is the same colour: per that
// spec, per-topic colour coding teaches readers the colours mean
// something when they only mean "different topic".

export interface TagProps {
  label: string;
  href: string;
  /** The tag whose archive the reader is currently on. */
  active?: boolean;
  /** Article count — archive index only, never in a byline. */
  count?: number;
}

export function Tag({ label, href, active, count }: TagProps) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      // In a screen reader's link list a bare "Design" is ambiguous.
      aria-label={`Topic: ${label}`}
      className={`inline-flex items-center gap-1 rounded-pill px-2 py-1 font-ui text-xs font-medium transition-colors duration-state ease-standard ${focusRing} ${
        active
          ? "bg-accent-base text-text-on-accent"
          : "bg-surface-sunken text-text-secondary hover:bg-accent-wash hover:text-accent-base"
      }`}
    >
      {label}
      {count !== undefined && <span className="tabular opacity-70">{count}</span>}
    </a>
  );
}

/** A row of tags is a LIST, so assistive tech announces how many there
 *  are, and it carries an accessible name so they are not announced as
 *  an unexplained set of links (specs/tag.md). */
export function TagRow({ tags, label = "Topics" }: { tags: TagProps[]; label?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t.href}>
          <Tag {...t} />
        </li>
      ))}
    </ul>
  );
}
