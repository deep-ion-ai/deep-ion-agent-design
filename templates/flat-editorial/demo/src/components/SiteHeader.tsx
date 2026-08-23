import { useEffect, useRef, useState } from "react";
import { Menu, X, ICON_STROKE, iconSize } from "./icons";
import { IconButton } from "./Button";
import { ThemeToggle, type Theme } from "./ThemeToggle";
import { focusRing } from "./focus";

// Visual reference implementation of specs/site-header.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Its design brief is to be forgettable: on an article page the header
// is the thing between the reader and the article. Static by default —
// it scrolls away and does not come back.

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export function SiteHeader({
  nav,
  currentId,
  onNavigate,
  theme,
  onThemeChange,
}: {
  nav: NavItem[];
  currentId?: string;
  onNavigate: (href: string) => void;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  // Not a modal: Escape closes it and focus returns to the trigger.
  // Trapping focus in a site menu strands a reader who only wanted to
  // glance at it (specs/site-header.md).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const link = (item: NavItem, block = false) => (
    <a
      key={item.id}
      href={item.href}
      aria-current={item.id === currentId ? "page" : undefined}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.href);
        setOpen(false);
      }}
      className={`font-ui text-sm transition-colors duration-state ease-standard ${focusRing} ${
        block ? "block px-4 py-3" : ""
      } ${
        item.id === currentId
          ? "font-semibold text-text-primary"
          : "text-text-secondary hover:text-accent-base"
      }`}
    >
      {item.label}
    </a>
  );

  return (
    <header className="relative border-b border-surface-rule bg-chrome-header-bg">
      {/* Required, first in the tab order. On a site whose pages are long
          articles, a reader will use this constantly. */}
      <a
        href="#main"
        className="sr-only left-4 top-4 z-20 rounded bg-accent-base px-4 py-3 font-ui text-sm text-text-on-accent focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-header-height max-w-page items-center gap-6 px-4">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/");
          }}
          className={`font-ui text-h4 font-bold tracking-tight text-text-primary ${focusRing}`}
        >
          The Measure
        </a>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-6 md:flex">
          {nav.map((i) => link(i))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ThemeToggle theme={theme} onChange={onThemeChange} />
          <span className="md:hidden">
            <IconButton
              ref={menuRef}
              label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="site-nav-panel"
              onClick={() => setOpen((o) => !o)}
              icon={
                open ? (
                  <X strokeWidth={ICON_STROKE} className={iconSize.md} />
                ) : (
                  <Menu strokeWidth={ICON_STROKE} className={iconSize.md} />
                )
              }
            />
          </span>
        </div>
      </div>

      {/* The ONLY shadow in this template — a panel that floats over
          content and shares its background, where a rule cannot do the
          job because the panel moves (tokens/shadows.json). */}
      {open && (
        <div
          id="site-nav-panel"
          className="absolute right-4 top-header-height z-10 w-56 rounded-lg border border-surface-rule bg-surface-canvas py-2 shadow-overlay md:hidden"
        >
          <nav aria-label="Main">{nav.map((i) => link(i, true))}</nav>
        </div>
      )}
    </header>
  );
}
