import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { focusRing } from "./accents";

// Visual reference implementation of specs/dropdown-menu.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The keyboard behaviour below is the substance of the spec: roving
// tabindex (arrows move between items, Tab leaves the menu), Escape
// closes without activating, and focus returns to the trigger on close.

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  hint?: string;
  disabled?: boolean;
  /** Destructive items sit last, below a divider, and name their object. */
  destructive?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps {
  /** Renders the trigger. `props` must be spread onto a real <button>. */
  renderTrigger: (props: {
    ref: (el: HTMLButtonElement | null) => void;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    "aria-haspopup": "menu";
    "aria-expanded": boolean;
    id: string;
  }) => ReactNode;
  items: MenuItem[];
  /** Where the panel's edge aligns to the trigger. */
  align?: "start" | "end";
  id: string;
}

export function DropdownMenu({
  renderTrigger,
  items,
  align = "start",
  id,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const typeahead = useRef({ buffer: "", at: 0 });

  const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);

  const close = useCallback(
    (returnFocus = true) => {
      setOpen(false);
      // Focus returns to the trigger — losing it to the body would drop a
      // keyboard user back at the top of the document.
      if (returnFocus) triggerRef.current?.focus();
    },
    [],
  );

  const openAt = useCallback(
    (where: "first" | "last") => {
      setOpen(true);
      setActiveIndex(where === "first" ? enabled[0] ?? 0 : enabled[enabled.length - 1] ?? 0);
    },
    [enabled],
  );

  useEffect(() => {
    if (open) itemRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    function onDocPointerDown(e: PointerEvent) {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      // Outside click closes without pulling focus back to the trigger.
      setOpen(false);
    }
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [open]);

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAt("first");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAt("last");
    }
  }

  function move(delta: number) {
    const pos = enabled.indexOf(activeIndex);
    const next = enabled[(pos + delta + enabled.length) % enabled.length];
    setActiveIndex(next);
  }

  function onPanelKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(-1);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(enabled[0]);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(enabled[enabled.length - 1]);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        // Tab closes the menu and moves on, rather than tabbing the items.
        close(false);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const now = Date.now();
          const buf = now - typeahead.current.at < 600 ? typeahead.current.buffer + e.key : e.key;
          typeahead.current = { buffer: buf.toLowerCase(), at: now };
          const match = enabled.find((i) =>
            items[i].label.toLowerCase().startsWith(typeahead.current.buffer),
          );
          if (match !== undefined) setActiveIndex(match);
        }
    }
  }

  function activate(item: MenuItem) {
    if (item.disabled) return;
    item.onSelect?.();
    close();
  }

  return (
    <div className="relative inline-block">
      {renderTrigger({
        ref: (el) => (triggerRef.current = el),
        onClick: () => (open ? close() : openAt("first")),
        onKeyDown: onTriggerKeyDown,
        "aria-haspopup": "menu",
        "aria-expanded": open,
        id: `${id}-trigger`,
      })}

      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-labelledby={`${id}-trigger`}
          onKeyDown={onPanelKeyDown}
          className={`absolute z-30 mt-1 min-w-[12rem] rounded border border-surface-border bg-surface-canvas py-1 shadow-raised ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, i) => (
            <div key={item.id}>
              {item.destructive && i > 0 && (
                <div role="separator" className="my-1 border-t border-surface-border" />
              )}
              <button
                type="button"
                role="menuitem"
                ref={(el) => (itemRefs.current[i] = el)}
                tabIndex={i === activeIndex ? 0 : -1}
                aria-disabled={item.disabled || undefined}
                onClick={() => activate(item)}
                onMouseEnter={() => !item.disabled && setActiveIndex(i)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${focusRing} ${
                  item.disabled
                    ? "cursor-not-allowed text-text-secondary opacity-60"
                    : item.destructive
                      ? "text-text-accent-danger hover:bg-neutral-light focus:bg-neutral-light"
                      : "text-text-primary hover:bg-neutral-light focus:bg-neutral-light"
                }`}
              >
                {item.icon && <span aria-hidden>{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.hint && (
                  <span className="text-xs text-text-secondary">{item.hint}</span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
