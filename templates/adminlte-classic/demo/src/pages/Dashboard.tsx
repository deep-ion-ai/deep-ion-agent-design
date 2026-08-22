import { useMemo, useState } from "react";
import { Card, MetricCard } from "../components/Card";
import { DataTable, StatusBadge, type Column, type SortDirection } from "../components/DataTable";

// Visual reference implementation of templates/adminlte-classic/patterns/dashboard.md,
// composing the Card and DataTable components. Demo scaffolding only —
// see ../../README.md and /AGENTS.md.

interface Order {
  id: number;
  customer: string;
  total: string;
  status: "active" | "inactive" | "pending";
  placedAt: string;
}

const ALL_ORDERS: Order[] = Array.from({ length: 42 }, (_, i) => ({
  id: 1000 + i,
  customer: [
    "Ava Torres",
    "Liam Chen",
    "Sofia Rossi",
    "Noah Müller",
    "Mia Andersen",
    "Yusuf Demir",
  ][i % 6],
  total: `$${(20 + i * 7.35).toFixed(2)}`,
  status: (["active", "pending", "inactive"] as const)[i % 3],
  placedAt: `2026-08-${String((i % 28) + 1).padStart(2, "0")}`,
}));

const PAGE_SIZE = 8;

const columns: Column<Order>[] = [
  { key: "id", label: "Order", sortable: true, render: (r) => `#${r.id}` },
  { key: "customer", label: "Customer", sortable: true },
  { key: "total", label: "Total", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (r) => <StatusBadge status={r.status} />,
  },
  { key: "placedAt", label: "Placed", sortable: true },
];

export function Dashboard() {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>("placedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("descending");

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDirection((d) => (d === "ascending" ? "descending" : "ascending"));
    } else {
      setSortKey(key);
      setSortDirection("ascending");
    }
    setPage(1);
  }

  const sortedOrders = useMemo(() => {
    const sorted = [...ALL_ORDERS].sort((a, b) => {
      const av = a[sortKey as keyof Order];
      const bv = b[sortKey as keyof Order];
      if (av < bv) return sortDirection === "ascending" ? -1 : 1;
      if (av > bv) return sortDirection === "ascending" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [sortKey, sortDirection]);

  const pageCount = Math.ceil(sortedOrders.length / PAGE_SIZE);
  const pageRows = sortedOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <header className="mb-6">
          <h1 className="text-h2 font-semibold text-text-primary">Overview</h1>
          <p className="text-sm text-text-secondary">
            Key metrics and recent activity for today.
          </p>
        </header>

        <section
          aria-label="Key metrics"
          className="mb-grid-gap grid grid-cols-1 gap-grid-gap sm:grid-cols-2 lg:grid-cols-4"
        >
          <MetricCard label="Orders today" value="1,204" accent="primary" />
          <MetricCard label="Revenue" value="$38,920" accent="success" />
          <MetricCard label="New users" value="312" accent="info" />
          <MetricCard label="Open tickets" value="17" accent="warning" />
        </section>

        <section aria-label="Recent orders">
          <Card
            title="Recent orders"
            actions={
              <button type="button" className="text-sm font-medium text-brand-primary hover:underline">
                View all
              </button>
            }
          >
            <DataTable
              columns={columns}
              rows={pageRows}
              getRowId={(r) => r.id}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
              page={page}
              pageCount={pageCount}
              totalCount={sortedOrders.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </Card>
        </section>
      </div>
    </div>
  );
}
