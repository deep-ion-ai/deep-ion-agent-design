import type { ReactNode } from "react";

// Visual reference implementation of templates/adminlte-classic/specs/data-table.md.
// This is demo scaffolding only — a real project should regenerate this
// component from the spec, idiomatic to its own framework/stack, not
// copy this file. See ../../README.md and /AGENTS.md.

export type SortDirection = "ascending" | "descending" | "none";

export interface Column<Row> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: Row) => ReactNode;
}

export interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  getRowId: (row: Row) => string | number;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  page: number;
  pageCount: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "ascending") return <span aria-hidden>▲</span>;
  if (direction === "descending") return <span aria-hidden>▼</span>;
  return <span aria-hidden className="opacity-0 group-hover:opacity-40">▲</span>;
}

export function DataTable<Row>({
  columns,
  rows,
  getRowId,
  sortKey,
  sortDirection = "none",
  onSort,
  page,
  pageCount,
  totalCount,
  pageSize,
  onPageChange,
  loading,
  error,
  onRetry,
}: DataTableProps<Row>) {
  const firstItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, totalCount);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-light">
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const ariaSort = col.sortable
                  ? isSorted
                    ? sortDirection
                    : "none"
                  : undefined;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSort as "ascending" | "descending" | "none" | undefined}
                    className="px-cell-x py-cell-y text-left"
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => onSort?.(col.key)}
                        className={`group inline-flex items-center gap-1 ${
                          isSorted ? "font-medium text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        {col.label}
                        <SortIcon direction={isSorted ? sortDirection : "none"} />
                      </button>
                    ) : (
                      <span className="text-text-secondary">{col.label}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody aria-busy={loading || undefined}>
            {loading &&
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-t border-surface-border">
                  {columns.map((col) => (
                    <td key={col.key} className="px-cell-x py-cell-y">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-light" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && error && (
              <tr>
                <td colSpan={columns.length} className="px-cell-x py-6 text-center">
                  <p className="text-sm text-status-danger">
                    Something went wrong loading this table.
                  </p>
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="mt-1 text-sm font-medium text-brand-primary hover:underline"
                    >
                      Retry
                    </button>
                  )}
                </td>
              </tr>
            )}

            {!loading && !error && rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-cell-x py-6 text-center text-sm text-text-secondary">
                  No records found
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              rows.map((row) => (
                <tr
                  key={getRowId(row)}
                  className="border-t border-surface-border hover:bg-neutral-light"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-cell-x py-cell-y leading-dense text-text-primary">
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!loading && !error && totalCount > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
          <span>
            Showing {firstItem}–{lastItem} of {totalCount} entries
          </span>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="rounded px-2 py-1 hover:bg-neutral-light disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                aria-current={p === page ? "page" : undefined}
                onClick={() => onPageChange(p)}
                className={`rounded px-3 py-1 ${
                  p === page
                    ? "bg-brand-primary text-text-inverse"
                    : "hover:bg-neutral-light"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              disabled={page >= pageCount}
              onClick={() => onPageChange(page + 1)}
              className="rounded px-2 py-1 hover:bg-neutral-light disabled:opacity-40"
            >
              ›
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: "active" | "inactive" | "pending" }) {
  const styles: Record<typeof status, string> = {
    active: "bg-status-success/10 text-status-success",
    inactive: "bg-neutral-light text-text-secondary",
    pending: "bg-status-warning/10 text-status-warning",
  };
  return (
    <span className={`inline-block rounded-pill px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
