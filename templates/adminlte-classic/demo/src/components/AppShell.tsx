import { useEffect, useState, type ReactNode } from "react";
import { Sidebar, type SidebarItem } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Offcanvas } from "./Offcanvas";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import type { MenuItem } from "./DropdownMenu";

// Visual reference implementation of patterns/app-shell.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The shell owns the frame; a page pattern owns the content region and
// nothing else.

const SIDEBAR_ID = "app-sidebar";
const LG_BREAKPOINT = "(min-width: 992px)"; // breakpoint.lg

export interface AppShellProps {
  navItems: SidebarItem[];
  currentId: string;
  onNavigate: (id: string) => void;
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  pageActions?: ReactNode;
  notifications?: MenuItem[];
  unreadCount?: number;
  account: { name: string; initials: string; items: MenuItem[] };
  children: ReactNode;
}

export function AppShell({
  navItems,
  currentId,
  onNavigate,
  title,
  description,
  breadcrumb,
  pageActions,
  notifications,
  unreadCount,
  account,
  children,
}: AppShellProps) {
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia(LG_BREAKPOINT).matches,
  );
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LG_BREAKPOINT);
    const onChange = () => {
      setWide(mq.matches);
      if (mq.matches) setOffcanvasOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function navigate(id: string) {
    onNavigate(id);
    setOffcanvasOpen(false);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-muted">
      {/* Required: without it a keyboard user tabs the whole menu on
          every page before reaching the content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface-canvas focus:px-3 focus:py-2 focus:text-sm focus:shadow-raised"
      >
        Skip to content
      </a>

      {wide && (
        <div id={SIDEBAR_ID} className="h-full">
          <Sidebar
            items={navItems}
            currentId={currentId}
            onNavigate={navigate}
            filterable
          />
        </div>
      )}

      {/* Below breakpoint.lg the sidebar is the BLOCKING variant of
          Offcanvas — the same component, not a second implementation. */}
      {!wide && (
        <Offcanvas
          open={offcanvasOpen}
          onClose={() => setOffcanvasOpen(false)}
          title="Navigation"
          flushBody
        >
          <Sidebar
            items={navItems}
            currentId={currentId}
            onNavigate={navigate}
            filterable
            fluid
          />
        </Offcanvas>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          sidebarId={SIDEBAR_ID}
          sidebarOpen={wide ? true : offcanvasOpen}
          onToggleSidebar={() => setOffcanvasOpen((o) => !o)}
          notifications={notifications}
          unreadCount={unreadCount}
          account={account}
          search
        />

        {/* Only the content region scrolls: the shell stays reachable. */}
        <main id="main-content" className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <header className="mb-6 flex flex-wrap items-end gap-4">
            <div className="min-w-0 flex-1">
              {breadcrumb && breadcrumb.length > 1 && (
                <div className="mb-2">
                  <Breadcrumb items={breadcrumb} />
                </div>
              )}
              <h1 className="text-h2 font-semibold text-text-primary">{title}</h1>
              {description && (
                <p className="text-sm text-text-secondary">{description}</p>
              )}
            </div>
            {pageActions && <div className="flex items-center gap-2">{pageActions}</div>}
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
