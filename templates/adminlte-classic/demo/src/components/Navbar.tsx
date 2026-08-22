import { Avatar } from "./Avatar";
import { Bell, Menu, Search, ICON_STROKE, iconSize } from "./icons";
import { useId, type ReactNode } from "react";
import { DropdownMenu, type MenuItem } from "./DropdownMenu";
import { CountBadge } from "./Badge";
import { focusRing } from "./accents";

// Visual reference implementation of specs/navbar.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The sidebar navigates the product; this bar acts on the session.
// Page-level actions belong to neither — they sit beside the page title.

export interface NavbarProps {
  /** Reflects the SIDEBAR's state, not the toggle's own. */
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  sidebarId: string;
  notifications?: MenuItem[];
  unreadCount?: number;
  account: { name: string; initials: string; items: MenuItem[] };
  search?: boolean;
  pageContext?: ReactNode;
}

const triggerClasses =
  "relative inline-flex h-9 w-9 items-center justify-center rounded text-text-secondary hover:bg-neutral-light hover:text-text-primary";

export function Navbar({
  sidebarOpen,
  onToggleSidebar,
  sidebarId,
  notifications = [],
  unreadCount = 0,
  account,
  search = false,
  pageContext,
}: NavbarProps) {
  const searchId = useId();
  const notifId = useId();
  const accountId = useId();

  return (
    <header className="flex items-center gap-2 border-b border-surface-border bg-chrome-topbar-bg px-4 py-3">
      <button
        type="button"
        // Constant name; aria-expanded carries the state.
        aria-label="Toggle navigation"
        aria-expanded={sidebarOpen}
        aria-controls={sidebarId}
        onClick={onToggleSidebar}
        className={`${triggerClasses} ${focusRing}`}
      >
        <Menu aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
      </button>

      {pageContext && (
        <span className="hidden text-sm text-text-primary sm:inline">{pageContext}</span>
      )}

      {search && (
        <div role="search" className="ml-2 hidden flex-1 md:block">
          <label htmlFor={searchId} className="sr-only">
            Search orders and customers
          </label>
          <div className="relative max-w-sm">
            <Search
              aria-hidden
              strokeWidth={ICON_STROKE}
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary ${iconSize.sm}`}
            />
            <input
              id={searchId}
              type="search"
              placeholder="Search orders and customers"
              className={`w-full rounded border border-surface-border py-1.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary ${focusRing}`}
            />
          </div>
        </div>
      )}

      <nav aria-label="Account and notifications" className="ml-auto flex items-center gap-2">
        {notifications.length >= 0 && (
          <DropdownMenu
            id={notifId}
            align="end"
            // A notification menu with nothing in it OPENS and says so —
            // the reader is checking whether anything arrived.
            items={
              notifications.length > 0
                ? notifications
                : [{ id: "none", label: "No new notifications", disabled: true }]
            }
            renderTrigger={(p) => (
              <button
                {...p}
                type="button"
                // The count lives in the trigger's name; the badge is
                // aria-hidden, so it is never announced twice.
                aria-label={
                  unreadCount > 0
                    ? `Notifications, ${unreadCount} unread`
                    : "Notifications"
                }
                className={`${triggerClasses} ${focusRing}`}
              >
                <Bell aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
                <CountBadge count={unreadCount} />
              </button>
            )}
          />
        )}

        <DropdownMenu
          id={accountId}
          align="end"
          items={account.items}
          renderTrigger={(p) => (
            <button
              {...p}
              type="button"
              aria-label="Account menu"
              className={`inline-flex items-center gap-2 rounded px-2 py-1 hover:bg-neutral-light ${focusRing}`}
            >
              <Avatar name={account.name} size="md" />
              <span className="hidden text-sm text-text-primary sm:inline">
                {account.name}
              </span>
            </button>
          )}
        />
      </nav>
    </header>
  );
}
