import type { ReactNode } from "react";
import { Pagination } from "./Pagination";
import { Badge } from "./Badge";

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
  /** Names the paginated set — a page may hold more than one. */
  paginationLabel?: string;
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
  paginationLabel = "Pagination",
}: DataTableProps<Row>) {
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
                  <p className="text-sm text-text-accent-danger">
                    Something went wrong loading this table.
                  </p>
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="mt-1 text-sm font-medium text-text-accent-primary hover:underline"
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

      {!loading && !error && (
        <div className="mt-4">
          {/* The footer bar is specs/pagination.md — the same component a
              List Group or a card grid uses. */}
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={onPageChange}
            totalCount={totalCount}
            pageSize={pageSize}
            label={paginationLabel}
          />
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: "active" | "inactive" | "pending" }) {
  // Subtle variant: a column of solid badges out-shouts the data around it.
  const accent = status === "active" ? "success" : status === "pending" ? "warning" : "neutral";
  return (
    <Badge accent={accent} shape="pill" subtle>
      {status}
    </Badge>
  );
}
