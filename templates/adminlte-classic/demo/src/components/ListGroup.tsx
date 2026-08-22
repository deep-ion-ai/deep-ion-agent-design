import { ChevronRight, ICON_STROKE, iconSize } from "./icons";
import type { ReactNode } from "react";
import { focusRing } from "./accents";

// Visual reference implementation of specs/list-group.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The three variants take DIFFERENT markup and are not interchangeable:
// static is a plain list, navigational is a list of links spanning the
// row, and selectable is a listbox — a row of links where one merely
// looks different is not perceivable as a choice.

export interface ListItem {
  id: string;
  primary: string;
  secondary?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  href?: string;
  disabled?: boolean;
}

const rowClasses =
  "flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-text-primary";

function RowContent({ item }: { item: ListItem }) {
  return (
    <>
      {item.leading && (
        <span aria-hidden className="shrink-0 text-text-secondary">
          {item.leading}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate">{item.primary}</span>
        {item.secondary && (
          <span className="block truncate text-xs text-text-secondary">
            {item.secondary}
          </span>
        )}
      </span>
      {item.trailing && <span className="shrink-0">{item.trailing}</span>}
    </>
  );
}

export interface ListGroupProps {
  items: ListItem[];
  /** Standalone lists draw their own outline; inside a Card they do not. */
  bordered?: boolean;
  emptyMessage?: string;
  className?: string;
}

/** Static: items that are read, not activated. */
export function ListGroup({
  items,
  bordered = true,
  emptyMessage = "Nothing here yet",
  className = "",
}: ListGroupProps) {
  return (
    <ul
      className={`divide-y divide-surface-border ${bordered ? "rounded border border-surface-border" : ""} ${className}`}
    >
      {items.length === 0 && (
        <li className="px-4 py-3 text-sm text-text-secondary">{emptyMessage}</li>
      )}
      {items.map((item) => (
        <li key={item.id} className={rowClasses}>
          <RowContent item={item} />
        </li>
      ))}
    </ul>
  );
}

export interface NavListGroupProps extends ListGroupProps {
  /** The item matching the current page gets aria-current="page". */
  currentId?: string;
  navLabel?: string;
}

/** Navigational: one real <a> per row, spanning the whole item. */
export function NavListGroup({
  items,
  bordered = true,
  currentId,
  navLabel,
  className = "",
}: NavListGroupProps) {
  const list = (
    <ul
      className={`divide-y divide-surface-border ${bordered ? "rounded border border-surface-border" : ""} ${className}`}
    >
      {items.map((item) => {
        const current = item.id === currentId;
        return (
          <li key={item.id}>
            <a
              href={item.href ?? "#"}
              aria-current={current ? "page" : undefined}
              aria-disabled={item.disabled || undefined}
              className={`${rowClasses} ${focusRing} ${
                item.disabled
                  ? "cursor-not-allowed text-text-secondary opacity-60"
                  : "hover:bg-neutral-light"
              } ${current ? "border-l-4 border-l-brand-primary pl-3 font-medium" : ""}`}
            >
              <RowContent item={item} />
              <ChevronRight
                aria-hidden
                strokeWidth={ICON_STROKE}
                className={`text-text-secondary ${iconSize.sm}`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
  return navLabel ? <nav aria-label={navLabel}>{list}</nav> : list;
}

export interface SelectListGroupProps {
  /** Required: says what is being chosen. */
  label: string;
  items: ListItem[];
  value: string;
  onChange: (id: string) => void;
  bordered?: boolean;
  className?: string;
}

/** Selectable: listbox semantics, arrow keys, one option in the tab order. */
export function SelectListGroup({
  label,
  items,
  value,
  onChange,
  bordered = true,
  className = "",
}: SelectListGroupProps) {
  const enabled = items.filter((i) => !i.disabled);

  function onKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const i = enabled.findIndex((o) => o.id === value);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onChange(enabled[(i + 1) % enabled.length].id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onChange(enabled[(i - 1 + enabled.length) % enabled.length].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(enabled[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(enabled[enabled.length - 1].id);
    }
  }

  return (
    <ul
      role="listbox"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`divide-y divide-surface-border ${bordered ? "rounded border border-surface-border" : ""} ${className}`}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <li
            key={item.id}
            role="option"
            aria-selected={selected}
            aria-disabled={item.disabled || undefined}
            tabIndex={selected ? 0 : -1}
            onClick={() => !item.disabled && onChange(item.id)}
            className={`${rowClasses} cursor-pointer ${focusRing} ${
              item.disabled
                ? "cursor-not-allowed text-text-secondary opacity-60"
                : "hover:bg-neutral-light"
            } ${selected ? "border-l-4 border-l-brand-primary pl-3 font-medium" : ""}`}
          >
            <RowContent item={item} />
          </li>
        );
      })}
    </ul>
  );
}
