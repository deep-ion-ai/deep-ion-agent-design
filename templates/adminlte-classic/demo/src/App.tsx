import {
  ChartPie,
  Component,
  FileText,
  LayoutDashboard,
  ListChecks,
  Settings,
  ShoppingCart,
  Users,
  ICON_STROKE,
  iconSize,
} from "./components/icons";
import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { Badge } from "./components/Badge";
import { Dashboard } from "./pages/Dashboard";
import { UiElements } from "./pages/UiElements";
import { Forms } from "./pages/Forms";
import { Auth, type AuthVariant } from "./pages/Auth";
import { ErrorPage, type ErrorVariant } from "./pages/ErrorPage";
import { Profile } from "./pages/Profile";
import { Settings as SettingsPage } from "./pages/Settings";
import { ThemeToggle, useTheme } from "./components/ThemeToggle";
import { Wizard } from "./pages/Wizard";
import type { SidebarItem } from "./components/Sidebar";

/** patterns/auth.md renders with no shell — this is the one place that
 *  decides whether to mount AppShell at all, rather than a page-level
 *  choice, so the frame is never accidentally reachable with the sidebar
 *  merely hidden. */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

const icon = (Glyph: typeof LayoutDashboard) => (
  <Glyph strokeWidth={ICON_STROKE} className={iconSize.md} />
);

const NAV: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: icon(LayoutDashboard) },
  { id: "ui", label: "UI elements", icon: icon(Component) },
  { id: "forms", label: "Forms", icon: icon(FileText) },
  { id: "wizard", label: "Setup", icon: icon(ListChecks) },
  {
    id: "orders",
    label: "Orders",
    icon: icon(ShoppingCart),
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
  { id: "customers", label: "Customers", icon: icon(Users) },
  {
    id: "reports",
    label: "Reports",
    icon: icon(ChartPie),
    children: [{ id: "reports-sales", label: "Sales" }],
  },
  { id: "settings", label: "Settings", icon: icon(Settings) },
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
  forms: {
    title: "Forms",
    description: "The Forms primitive component set (#64), rendered from its specs.",
    crumbs: ["Home", "Design system", "Forms"],
  },
  profile: {
    title: "Profile",
    crumbs: ["Home", "Profile"],
  },
  settings: {
    title: "Settings",
    crumbs: ["Home", "Settings"],
  },
  wizard: {
    title: "Set up your workspace",
    description: "The multi-step form pattern, rendered from its spec.",
    crumbs: ["Home", "Setup"],
  },
};

const AUTH_VARIANT: Record<string, AuthVariant> = {
  "#auth": "login",
  "#auth/register": "register",
  "#auth/forgot": "forgot",
};

const ERROR_VARIANT: Record<string, ErrorVariant> = {
  "#error/404": "404",
  "#error/500": "500",
};

export default function App() {
  const [current, setCurrent] = useState("dashboard");
  const hash = useHashRoute();
  // Mounted above the shell/no-shell split so the theme survives a
  // trip through Auth or an Error page, both of which render without
  // the Navbar that holds the toggle.
  const { theme, setTheme } = useTheme();

  if (hash in AUTH_VARIANT) {
    return (
      <Auth
        variant={AUTH_VARIANT[hash]}
        onNavigate={(next) => {
          window.location.hash = next;
        }}
      />
    );
  }

  // patterns/error-page.md renders with no shell too — see ErrorPage.tsx.
  // Any hash under #error/ that isn't one of the two known variants also
  // lands on 404, the same way an unmatched application route would.
  if (hash.startsWith("#error/")) {
    return (
      <ErrorPage
        variant={ERROR_VARIANT[hash] ?? "404"}
        onNavigate={(next) => {
          window.location.hash = next;
        }}
      />
    );
  }

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
      themeToggle={<ThemeToggle theme={theme} onChange={setTheme} />}
      account={{
        name: "Jane Cooper",
        initials: "JC",
        items: [
          { id: "profile", label: "Profile", onSelect: () => setCurrent("profile") },
          { id: "prefs", label: "Preferences", onSelect: () => setCurrent("settings") },
          {
            id: "signout",
            label: "Sign out",
            onSelect: () => {
              window.location.hash = "#auth";
            },
          },
        ],
      }}
    >
      {current === "ui" ? (
        <UiElements />
      ) : current === "forms" ? (
        <Forms />
      ) : current === "profile" ? (
        <Profile onEditProfile={() => setCurrent("settings")} />
      ) : current === "settings" ? (
        <SettingsPage />
      ) : current === "wizard" ? (
        <Wizard onFinish={() => setCurrent("dashboard")} />
      ) : (
        <Dashboard />
      )}
    </AppShell>
  );
}
