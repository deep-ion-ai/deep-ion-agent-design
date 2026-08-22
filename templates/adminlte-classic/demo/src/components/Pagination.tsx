import { ChevronLeft, ChevronRight, ICON_STROKE, iconSize } from "./icons";
import { focusRing } from "./accents";

// Visual reference implementation of specs/pagination.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Enables the results summary at the leading edge. */
  totalCount?: number;
  pageSize?: number;
  /** Names the set when a page holds more than one paginated list. */
  label?: string;
  /** Below this many pages, every number is shown. */
  truncateFrom?: number;
  variant?: "full" | "compact";
}

/**
 * First, last, current and one either side; each remaining run becomes a
 * single ellipsis. Below `truncateFrom` pages, show everything —
 * truncating a short range costs a click and gains nothing.
 */
export function pageItems(
  page: number,
  pageCount: number,
  truncateFrom = 9,
): (number | "ellipsis")[] {
  if (pageCount <= truncateFrom) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const keep = new Set([1, pageCount, page, page - 1, page + 1]);
  const out: (number | "ellipsis")[] = [];
  let gap = false;
  for (let p = 1; p <= pageCount; p++) {
    if (keep.has(p)) {
      out.push(p);
      gap = false;
    } else if (!gap) {
      out.push("ellipsis");
      gap = true;
    }
  }
  return out;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  totalCount,
  pageSize,
  label = "Pagination",
  truncateFrom = 9,
  variant = "full",
}: PaginationProps) {
  // A bar with one page button is noise; the summary alone remains.
  const showControls = pageCount > 1;
  const summary =
    totalCount !== undefined && pageSize !== undefined && totalCount > 0
      ? `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalCount)} of ${totalCount} entries`
      : undefined;

  if (totalCount === 0) return null;

  const stepper =
    "inline-flex h-8 min-w-8 items-center justify-center rounded border border-surface-border px-2 text-sm text-text-primary hover:bg-neutral-light disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      {summary && <span className="text-sm text-text-secondary">{summary}</span>}
      {showControls && (
        <nav aria-label={label} className="ml-auto">
          <ol className="flex items-center gap-1">
            <li>
              <button
                type="button"
                aria-label="Previous page"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className={`${stepper} ${focusRing}`}
              >
                <ChevronLeft aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
              </button>
            </li>

            {variant === "compact" ? (
              <li className="px-2 text-sm text-text-secondary">
                Page {page} of {pageCount}
              </li>
            ) : (
              pageItems(page, pageCount, truncateFrom).map((item, i) =>
                item === "ellipsis" ? (
                  <li
                    key={`gap-${i}`}
                    aria-hidden
                    className="px-1 text-sm text-text-secondary"
                  >
                    …
                  </li>
                ) : (
                  <li key={item}>
                    <button
                      type="button"
                      // Names its destination: a bare "3" reads as an
                      // unexplained digit in an element list.
                      aria-label={`Page ${item}`}
                      aria-current={item === page ? "page" : undefined}
                      onClick={() => onPageChange(item)}
                      className={`${stepper} ${focusRing} ${
                        item === page
                          ? "border-transparent bg-brand-primary font-medium text-text-on-accent hover:brightness-95"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ),
              )
            )}

            <li>
              <button
                type="button"
                aria-label="Next page"
                disabled={page >= pageCount}
                onClick={() => onPageChange(page + 1)}
                className={`${stepper} ${focusRing}`}
              >
                <ChevronRight aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
              </button>
            </li>
          </ol>
        </nav>
      )}
    </div>
  );
}
