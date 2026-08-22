import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { Badge } from "./components/Badge";
import { Dashboard } from "./pages/Dashboard";
import { UiElements } from "./pages/UiElements";
import type { SidebarItem } from "./components/Sidebar";

const NAV: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "ui", label: "UI elements", icon: "◧" },
  {
    id: "orders",
    label: "Orders",
    icon: "▤",
    badge: (
      <Badge accent="danger" shape="pill">
        3
      </Badge>
    ),
    children: [
      { id: "orders-open", label: "Open" },
      { id: "orders-archive", label: "Archive" },
    ],
  },
  { id: "customers", label: "Customers", icon: "☺" },
  { id: "reports", label: "Reports", icon: "◔", children: [{ id: "reports-sales", label: "Sales" }] },
  { id: "settings", label: "Settings", icon: "⚙" },
];

const PAGES: Record<string, { title: string; description?: string; crumbs: string[] }> = {
  dashboard: {
    title: "Overview",
    description: "Key metrics and recent activity for today.",
    crumbs: ["Home", "Overview"],
  },
  ui: {
    title: "UI elements",
    description: "Every primitive the template specifies, rendered from its spec.",
    crumbs: ["Home", "Design system", "UI elements"],
  },
};

export default function App() {
  const [current, setCurrent] = useState("dashboard");
  const page = PAGES[current] ?? {
    title: NAV.flatMap((n) => [n, ...(n.children ?? [])]).find((n) => n.id === current)?.label ?? "Page",
    description: "This section is not part of the demo.",
    crumbs: ["Home", "Section"],
  };

  return (
    <AppShell
      navItems={NAV}
      currentId={current}
      onNavigate={setCurrent}
      title={page.title}
      description={page.description}
      breadcrumb={page.crumbs.map((c, i) => ({
        label: c,
        href: i === 0 ? "#home" : undefined,
      }))}
      unreadCount={3}
      notifications={[
        { id: "n1", label: "Payment failed for order #1029" },
        { id: "n2", label: "Nightly import completed" },
        { id: "n3", label: "Ava Torres replied in support chat" },
      ]}
      account={{
        name: "Jane Cooper",
        initials: "JC",
        items: [
          { id: "profile", label: "Profile" },
          { id: "prefs", label: "Preferences" },
          { id: "signout", label: "Sign out" },
        ],
      }}
    >
      {current === "ui" ? <UiElements /> : <Dashboard />}
    </AppShell>
  );
}
