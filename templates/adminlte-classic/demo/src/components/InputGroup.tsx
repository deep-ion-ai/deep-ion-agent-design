import type { ReactNode } from "react";

// Visual reference implementation of specs/input-group.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Unlike Card, a group is never subject to the ribbon/dropdown clipping
// conflict (specs/dropdown-menu.md §Composition rules, #52) — nothing
// inside it floats past its own edge — so clipping the group itself to get
// the outer-rounded / inner-square seam is safe here.

export interface InputGroupProps {
  /** A plain symbol/label, an icon, or a Button — see specs/input-group.md's Variants. */
  leading?: ReactNode;
  trailing?: ReactNode;
  /** One or more specs/text-input.md fields, laid out edge to edge. */
  children: ReactNode;
}

export function InputGroup({ leading, trailing, children }: InputGroupProps) {
  return (
    <div className="flex divide-x divide-surface-border overflow-hidden rounded border border-surface-border focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary [&_input]:rounded-none [&_input]:border-0 [&_input]:focus:outline-none [&_input]:focus:ring-0 [&_select]:rounded-none [&_select]:border-0 [&_select]:focus:outline-none [&_select]:focus:ring-0">
      {leading && (
        <span className="flex items-center bg-neutral-light px-3 text-sm text-text-secondary">
          {leading}
        </span>
      )}
      <div className="flex flex-1">{children}</div>
      {trailing && (
        <span className="flex items-center bg-neutral-light px-3 text-sm text-text-secondary [&_button]:rounded-none [&_button]:border-0">
          {trailing}
        </span>
      )}
    </div>
  );
}
