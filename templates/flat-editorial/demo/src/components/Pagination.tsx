import { ChevronLeft, ChevronRight, ICON_STROKE, iconSize } from "./icons";
import { focusRing } from "./focus";

// Visual reference implementation of specs/pagination.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Text, not bare arrows: a lone chevron is ambiguous about whether it
// means older or newer. On the first page "Previous" is OMITTED, not
// disabled — there is no state in which the reader could act on it.

export function Pagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (p: number) => void;
}) {
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(p);
  };
  const linkCls = `inline-flex items-center gap-1 rounded px-2 py-2 font-ui text-sm text-text-secondary transition-colors duration-state ease-standard hover:text-accent-base ${focusRing}`;

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-4">
      {page > 1 && (
        <a href={`?page=${page - 1}`} onClick={go(page - 1)} className={linkCls}>
          <ChevronLeft aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
          Previous
        </a>
      )}

      <ul className="flex items-center gap-1">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <a
              href={`?page=${p}`}
              onClick={go(p)}
              aria-current={p === page ? "page" : undefined}
              // "Page 3", not a bare "3", which announces as a stray digit.
              aria-label={`Page ${p}`}
              className={`tabular inline-flex h-tap-target min-w-tap-target items-center justify-center rounded px-2 font-ui text-sm transition-colors duration-state ease-standard ${focusRing} ${
                p === page
                  ? "font-semibold text-text-primary"
                  : "text-text-secondary hover:text-accent-base"
              }`}
            >
              {p}
            </a>
          </li>
        ))}
      </ul>

      {page < pageCount && (
        <a href={`?page=${page + 1}`} onClick={go(page + 1)} className={linkCls}>
          Next
          <ChevronRight aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
        </a>
      )}
    </nav>
  );
}
