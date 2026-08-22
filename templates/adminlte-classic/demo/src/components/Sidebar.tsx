import { useId, useState, type ReactNode } from "react";

// Visual reference implementation of specs/sidebar.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: ReactNode;
  children?: { id: string; label: string }[];
}

export interface SidebarProps {
  items: SidebarItem[];
  currentId: string;
  onNavigate: (id: string) => void;
  brand?: { name: string; mark: ReactNode };
  footerLink?: { label: string; href: string };
  /** Shown once the menu is long enough to warrant it. */
  filterable?: boolean;
  /** Fills its container instead of using the fixed sidebar width. */
  fluid?: boolean;
}

export function Sidebar({
  items,
  currentId,
  onNavigate,
  brand = { name: "Classic Admin", mark: "◆" },
  footerLink = { label: "Documentation", href: "#documentation" },
  filterable = false,
  fluid = false,
}: SidebarProps) {
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<string[]>(() =>
    items.filter((i) => i.children?.some((c) => c.id === currentId)).map((i) => i.id),
  );
  const filterId = useId();

  const q = query.trim().toLowerCase();
  const visible = q
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(q) ||
          i.id === currentId ||
          i.children?.some((c) => c.label.toLowerCase().includes(q)),
      )
    : items;

  const itemBase =
    "flex w-full items-center gap-2 rounded px-sidebar-x py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-chrome-sidebar-text-active";

  return (
    // Named, because a page with two <nav> landmarks needs both named.
    <nav
      aria-label="Main navigation"
      className={`flex h-full shrink-0 flex-col bg-chrome-sidebar-bg ${fluid ? "w-full" : "w-sidebar-w"}`}
    >
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(items[0].id);
        }}
        className="flex items-center gap-2 border-b border-white/10 px-sidebar-x py-4 text-chrome-sidebar-text-active"
      >
        <span aria-hidden className="text-lg">
          {brand.mark}
        </span>
        <span className="text-sm font-medium">{brand.name}</span>
      </a>

      {filterable && (
        <div className="px-sidebar-x py-3">
          <label htmlFor={filterId} className="sr-only">
            Filter navigation
          </label>
          <input
            id={filterId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter menu"
            className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-sm text-chrome-sidebar-text-active placeholder:text-chrome-sidebar-text focus:outline-none focus-visible:ring-2 focus-visible:ring-chrome-sidebar-text-active"
          />
          <p aria-live="polite" className="sr-only">
            {q ? `${visible.length} items match` : ""}
          </p>
        </div>
      )}

      <ul className="m-0 flex-1 list-none space-y-1 overflow-y-auto p-sidebar-x">
        {visible.length === 0 && (
          <li className="px-sidebar-x py-2 text-sm text-chrome-sidebar-text">
            No matching items
          </li>
        )}
        {visible.map((item) => {
          const groupOpen = openGroups.includes(item.id);
          const childActive = item.children?.some((c) => c.id === currentId);
          const active = item.id === currentId;
          return (
            <li key={item.id}>
              <div className="flex items-center">
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className={`${itemBase} flex-1 ${
                    active
                      ? // hover and active share a token value, so the current
                        // item needs a second signal: an accent bar + weight.
                        "border-l-2 border-l-brand-primary bg-chrome-sidebar-item-active-bg font-medium text-chrome-sidebar-text-active"
                      : childActive
                        ? "text-chrome-sidebar-text-active"
                        : "text-chrome-sidebar-text hover:bg-chrome-sidebar-item-hover-bg hover:text-chrome-sidebar-text-active"
                  }`}
                >
                  <span aria-hidden>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge}
                </a>
                {item.children && (
                  // An item that both navigates and has children is split:
                  // the label is a link, the chevron its own toggle.
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={groupOpen}
                    aria-controls={`submenu-${item.id}`}
                    onClick={() =>
                      setOpenGroups((g) =>
                        g.includes(item.id) ? g.filter((x) => x !== item.id) : [...g, item.id],
                      )
                    }
                    className="mr-1 rounded p-1 text-chrome-sidebar-text hover:bg-chrome-sidebar-item-hover-bg hover:text-chrome-sidebar-text-active focus:outline-none focus-visible:ring-2 focus-visible:ring-chrome-sidebar-text-active"
                  >
                    <span aria-hidden className={groupOpen ? "inline-block rotate-180" : "inline-block"}>
                      ⌄
                    </span>
                  </button>
                )}
              </div>

              {item.children && groupOpen && (
                <ul id={`submenu-${item.id}`} className="m-0 list-none space-y-1 py-1 pl-4">
                  {item.children.map((child) => {
                    const childCurrent = child.id === currentId;
                    return (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          aria-current={childCurrent ? "page" : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(child.id);
                          }}
                          className={`${itemBase} ${
                            childCurrent
                              ? "border-l-2 border-l-brand-primary bg-chrome-sidebar-item-active-bg font-medium text-chrome-sidebar-text-active"
                              : "text-chrome-sidebar-text hover:bg-chrome-sidebar-item-hover-bg hover:text-chrome-sidebar-text-active"
                          }`}
                        >
                          {child.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <div className="border-t border-white/10 p-sidebar-x">
        <a
          href={footerLink.href}
          className={`${itemBase} text-chrome-sidebar-text hover:bg-chrome-sidebar-item-hover-bg hover:text-chrome-sidebar-text-active`}
        >
          <span aria-hidden>?</span>
          {footerLink.label}
        </a>
      </div>
    </nav>
  );
}
