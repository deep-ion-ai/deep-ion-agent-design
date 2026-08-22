import {
  Check,
  CreditCard,
  Download,
  Info,
  ShoppingCart,
  Table2,
  Ticket,
  Trash2,
  UserPlus,
  X,
  ICON_STROKE,
  iconSize,
} from "../components/icons";
import { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { StatCallout } from "../components/StatCallout";
import { DataTable, StatusBadge, TruncatedCell, type Column, type SortDirection } from "../components/DataTable";
import { TrendChartCard } from "../components/TrendChartCard";
import { GeoMapCard } from "../components/GeoMapCard";
import { SparklineStrip } from "../components/SparklineStrip";
import { DirectChat } from "../components/DirectChat";
import { Timeline } from "../components/Timeline";
import { Button } from "../components/Button";

// Visual reference implementation of patterns/dashboard.md — the CONTENT
// REGION only. The frame around it is patterns/app-shell.md, rendered by
// AppShell in App.tsx. Demo scaffolding only — see /AGENTS.md.

interface Order {
  id: number;
  customer: string;
  total: string;
  status: "active" | "inactive" | "pending";
  placedAt: string;
  notes: string;
}

const NOTES = [
  "Gift wrap requested, deliver after 5pm on weekdays only",
  "Repeat customer",
  "Address confirmed by phone, courier has building access code",
  "",
  "Split into two packages due to size",
  "Awaiting customs clearance, may be delayed past estimate",
];

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
  notes: NOTES[i % NOTES.length],
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
  {
    key: "notes",
    label: "Notes",
    render: (r) => (r.notes ? <TruncatedCell text={r.notes} /> : null),
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Values by country name, as they appear in the bundled Natural Earth
// geography (world-atlas). Everything not listed renders as "no data".
const SALES_BY_COUNTRY: Record<string, number> = {
  "United States of America": 4820,
  Brazil: 2140,
  Germany: 5310,
  "United Kingdom": 3180,
  France: 2760,
  Spain: 1490,
  Nigeria: 940,
  India: 6180,
  Japan: 3260,
  Australia: 1870,
  Canada: 2240,
  Mexico: 1320,
};

export function Dashboard() {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>("placedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("descending");
  const [mapError, setMapError] = useState(false);

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDirection((d) => (d === "ascending" ? "descending" : "ascending"));
    } else {
      setSortKey(key);
      setSortDirection("ascending");
    }
    setPage(1);
  }

  const sortedOrders = useMemo(
    () =>
      [...ALL_ORDERS].sort((a, b) => {
        const av = a[sortKey as keyof Order] as string | number;
        const bv = b[sortKey as keyof Order] as string | number;
        if (av < bv) return sortDirection === "ascending" ? -1 : 1;
        if (av > bv) return sortDirection === "ascending" ? 1 : -1;
        return 0;
      }),
    [sortKey, sortDirection],
  );

  const pageCount = Math.ceil(sortedOrders.length / PAGE_SIZE);
  const pageRows = sortedOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* Metrics row: either KPI Cards or Stat Callouts, never a mix. */}
      <section
        aria-label="Key metrics"
        className="mb-grid-gap grid grid-cols-1 gap-grid-gap sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCallout
          value="1,204"
          label="Orders today"
          accent="primary"
          glyph={<ShoppingCart strokeWidth={1.5} className="h-20 w-20" />}
          trend={{ text: "up 12% versus last week", direction: "up" }}
          href="#orders"
        />
        <StatCallout
          value="$38,920"
          label="Revenue"
          accent="success"
          glyph={<CreditCard strokeWidth={1.5} className="h-20 w-20" />}
          trend={{ text: "up 4% versus last week", direction: "up" }}
          href="#revenue"
        />
        <StatCallout
          value="17"
          label="Open tickets"
          accent="warning"
          glyph={<Ticket strokeWidth={1.5} className="h-20 w-20" />}
          trend={{ text: "down 8% versus last week", direction: "down" }}
          href="#tickets"
        />
        <StatCallout
          value="312"
          label="New users"
          accent="info"
          glyph={<UserPlus strokeWidth={1.5} className="h-20 w-20" />}
          progress={62}
          href="#users"
        />
      </section>

      <section
        aria-label="Trends"
        className="mb-grid-gap grid grid-cols-1 gap-grid-gap lg:grid-cols-2"
      >
        <TrendChartCard
          title="Sales, last 12 months"
          labels={MONTHS}
          series={[
            {
              id: "online",
              name: "Online",
              mark: "circle",
              colorVar: "--color-chart-series-1",
              values: [1200, 1480, 1390, 1810, 2040, 2360, 2210, 2790, 3110, 4600, 3980, 4050],
            },
            {
              id: "retail",
              name: "Retail",
              mark: "square",
              colorVar: "--color-chart-series-2",
              values: [900, 1010, 1180, 1120, 1340, 1290, 1520, 1610, 1580, 1900, 2010, 2140],
            },
          ]}
        />

        <div>
          <GeoMapCard
            title="Sales by country, last 30 days"
            values={SALES_BY_COUNTRY}
            error={mapError}
            onRetry={() => setMapError(false)}
          />
          <div className="mt-2 text-right">
            <Button
              size="sm"
              emphasis="link"
              accent="secondary"
              onClick={() => setMapError((e) => !e)}
            >
              {mapError ? "Restore the map" : "Simulate a map failure"}
            </Button>
          </div>
        </div>
      </section>

      <section
        aria-label="Activity"
        className="mb-grid-gap grid grid-cols-1 gap-grid-gap lg:grid-cols-3"
      >
        <Card
          title="This week"
          titleText="this week"
          collapsible
          flushBody
          footer="Updated 5 minutes ago"
        >
          <SparklineStrip
            items={[
              {
                id: "visitors",
                label: "Visitors",
                value: "4,050",
                period: "this week",
                values: [12, 18, 14, 22, 26, 24, 31],
                delta: { text: "8% this week", direction: "up" },
              },
              {
                id: "signups",
                label: "Signups",
                value: "312",
                period: "this week",
                values: [8, 9, 7, 11, 10, 13, 12],
                delta: { text: "3% this week", direction: "up" },
              },
              {
                id: "refunds",
                label: "Refunds",
                value: "27",
                period: "this week",
                values: [6, 5, 7, 4, 5, 3, 2],
                delta: { text: "5% this week", direction: "down" },
              },
            ]}
          />
        </Card>

        <DirectChat
          title="Support chat"
          unreadCount={3}
          contacts={[
            { id: "c1", name: "Ava Torres", timeLabel: "09:12", preview: "The refund went through" },
            { id: "c2", name: "Liam Chen", timeLabel: "Yesterday", preview: "Thanks for the update" },
          ]}
          messages={[
            {
              id: "m1",
              author: "Ava Torres",
              dateTime: "2026-08-20T15:04",
              timeLabel: "Yesterday 15:04",
              text: "Order #1029 hasn’t arrived yet.",
            },
            {
              id: "m2",
              author: "You",
              own: true,
              dateTime: "2026-08-20T15:09",
              timeLabel: "Yesterday 15:09",
              text: "Checking with the courier now.",
            },
            {
              id: "m3",
              author: "You",
              own: true,
              dateTime: "2026-08-21T09:10",
              timeLabel: "09:10",
              text: "Refund issued — sorry about that.",
              status: "failed",
            },
          ]}
        />

        <Card title="Recent activity" titleText="recent activity" collapsible>
          <Timeline
            direction="newest-first"
            label="Recent activity"
            condensed
            groups={[
              {
                id: "today",
                label: "Today",
                entries: [
                  {
                    id: "t1",
                    dateTime: "2026-08-21T09:41",
                    timeLabel: "09:41",
                    accent: "success",
                    glyph: <Check strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                    heading: "Order #1041 shipped",
                  },
                  {
                    id: "t2",
                    dateTime: "2026-08-21T08:12",
                    timeLabel: "08:12",
                    accent: "danger",
                    glyph: <X strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                    heading: "Payment failed for order #1029",
                  },
                ],
              },
              {
                id: "yesterday",
                label: "Yesterday",
                entries: [
                  {
                    id: "y1",
                    dateTime: "2026-08-20T17:02",
                    timeLabel: "17:02",
                    accent: "info",
                    glyph: <Info strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                    heading: "Nightly import completed",
                  },
                ],
              },
            ]}
          />
        </Card>
      </section>

      <section aria-label="Recent orders">
        <Card
          title="Recent orders"
          titleText="recent orders"
          flushBody
          collapsible
          removable
          menuItems={[
            {
              id: "export",
              label: "Export as CSV",
              icon: <Download strokeWidth={ICON_STROKE} className={iconSize.sm} />,
            },
            {
              id: "columns",
              label: "Choose columns",
              icon: <Table2 strokeWidth={ICON_STROKE} className={iconSize.sm} />,
            },
            {
              id: "clear",
              label: "Clear filters",
              icon: <Trash2 strokeWidth={ICON_STROKE} className={iconSize.sm} />,
              destructive: true,
            },
          ]}
        >
          <div className="p-card-padding">
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
              paginationLabel="Orders pagination"
            />
          </div>
        </Card>
      </section>
    </>
  );
}
