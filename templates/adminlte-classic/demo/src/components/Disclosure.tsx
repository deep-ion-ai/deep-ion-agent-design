import { ChevronDown, ChevronRight, ICON_STROKE, iconSize } from "./icons";
import { useId, useRef, useState, type ReactNode } from "react";
import { focusRing } from "./accents";

// Visual reference implementation of specs/disclosure.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Collapse/Accordion and Tabs share a mechanism but NOT their semantics:
//  - disclosure: aria-expanded + aria-controls, Tab moves between triggers
//  - tabs:       tablist/tab/tabpanel, roving tabindex, arrows move
// Applying one model to the other is the usual failure here.

export interface CollapseProps {
  label: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function Collapse({ label, defaultOpen = false, children }: CollapseProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div>
      <button
        type="button"
        // The name stays constant; aria-expanded carries the state.
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 rounded px-2 py-1 text-sm font-medium text-text-accent-primary hover:bg-neutral-light ${focusRing}`}
      >
        <ChevronRight
          aria-hidden
          strokeWidth={ICON_STROKE}
          className={`transition-transform ${iconSize.sm} ${open ? "rotate-90" : ""}`}
        />
        {label}
      </button>
      {/* Unmounted when closed: clipping would leave focusable content
          reachable by Tab with nothing on screen. */}
      {open && (
        <div id={panelId} className="px-2 py-2 text-sm text-text-primary">
          {children}
        </div>
      )}
    </div>
  );
}

export interface AccordionSection {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  sections: AccordionSection[];
  /** Multi-open by default: closing a section the reader did not ask to
   *  close loses their place. */
  singleOpen?: boolean;
  defaultOpenIds?: string[];
  /** Heading level for the section headers, beneath the page's own. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export function Accordion({
  sections,
  singleOpen = false,
  defaultOpenIds = [],
  headingLevel = 3,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);
  const baseId = useId();
  const Heading = `h${headingLevel}` as "h3";

  function toggle(id: string) {
    setOpenIds((ids) =>
      ids.includes(id)
        ? ids.filter((x) => x !== id)
        : singleOpen
          ? [id]
          : [...ids, id],
    );
  }

  return (
    <div className="divide-y divide-surface-border overflow-hidden rounded border border-surface-border">
      {sections.map((s) => {
        const open = openIds.includes(s.id);
        const panelId = `${baseId}-${s.id}`;
        return (
          <div key={s.id}>
            {/* The heading provides structure; the button provides control. */}
            <Heading className="m-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(s.id)}
                className={`flex w-full items-center justify-between bg-neutral-light px-4 py-3 text-left text-sm font-medium text-text-primary hover:brightness-95 ${focusRing}`}
              >
                {s.title}
                <ChevronDown
                  aria-hidden
                  strokeWidth={ICON_STROKE}
                  className={`transition-transform ${iconSize.md} ${open ? "rotate-180" : ""}`}
                />
              </button>
            </Heading>
            {open && (
              <div id={panelId} className="bg-surface-canvas p-card-padding text-sm text-text-primary">
                {s.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export interface TabItem {
  id: string;
  label: string;
  badge?: ReactNode;
  /** Folded into the tab's accessible name, e.g. "Comments, 4". */
  badgeText?: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Purely presentational — behaviour and markup are identical. */
  appearance?: "tabs" | "pills";
  label: string;
  defaultId?: string;
}

export function Tabs({ items, appearance = "tabs", label, defaultId }: TabsProps) {
  const [selected, setSelected] = useState(defaultId ?? items[0].id);
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(e: React.KeyboardEvent) {
    const i = items.findIndex((t) => t.id === selected);
    let next: string | undefined;
    if (e.key === "ArrowRight") next = items[(i + 1) % items.length].id;
    else if (e.key === "ArrowLeft") next = items[(i - 1 + items.length) % items.length].id;
    else if (e.key === "Home") next = items[0].id;
    else if (e.key === "End") next = items[items.length - 1].id;
    if (next) {
      e.preventDefault();
      // Arrows select as they move: these panels are cheap to render.
      setSelected(next);
      tabRefs.current[next]?.focus();
    }
  }

  const current = items.find((t) => t.id === selected)!;

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={`flex gap-1 overflow-x-auto ${
          appearance === "tabs" ? "border-b border-surface-border" : ""
        }`}
      >
        {items.map((t) => {
          const active = t.id === selected;
          const shape =
            appearance === "pills"
              ? `rounded-pill px-3 py-1 ${active ? "bg-brand-primary text-text-on-accent" : "text-text-secondary hover:bg-neutral-light"}`
              : `-mb-px border-b-2 px-3 py-2 ${active ? "border-brand-primary font-medium text-text-primary" : "border-transparent text-text-secondary hover:text-text-primary"}`;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              ref={(el) => (tabRefs.current[t.id] = el)}
              aria-selected={active}
              aria-controls={`${baseId}-panel-${t.id}`}
              // Roving tabindex: Tab reaches the row, then leaves it.
              tabIndex={active ? 0 : -1}
              aria-label={t.badgeText ? `${t.label}, ${t.badgeText}` : undefined}
              onClick={() => setSelected(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm ${shape} ${focusRing}`}
            >
              {t.label}
              {t.badge}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="py-4 text-sm text-text-primary"
      >
        {current.content}
      </div>
    </div>
  );
}
