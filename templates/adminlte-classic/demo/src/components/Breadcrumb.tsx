import { ChevronRight, ICON_STROKE, iconSize } from "./icons";
import { focusRing } from "./accents";

// Visual reference implementation of specs/breadcrumb.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Orientation, not navigation. Only worth rendering where pages nest at
 * least two levels below home — "Home / Dashboard" on every page is a line
 * of vertical space spent on nothing.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="m-0 flex list-none flex-wrap items-center p-0 text-sm leading-dense">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center">
              {i > 0 && (
                // Separators are drawn, never placed in the DOM as text —
                // otherwise a screen reader says "Home slash Orders".
                <ChevronRight
                  aria-hidden
                  strokeWidth={ICON_STROKE}
                  className={`mx-1 text-text-secondary ${iconSize.sm}`}
                />
              )}
              {last ? (
                // Not a link: a link to the page already showing does nothing.
                <span aria-current="page" className="text-text-primary">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? "#"}
                  className={`rounded py-1 text-text-secondary hover:text-text-link hover:underline ${focusRing}`}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
