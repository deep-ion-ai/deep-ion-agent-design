import { useId, useRef, type ReactNode } from "react";
import { useOverlay } from "./overlay";
import { IconButton } from "./Button";

// Visual reference implementation of specs/offcanvas.md.
// Shared overlay behaviour comes from specs/modal.md via ./overlay.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface OffcanvasProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Pinned action row — stays in view while the body scrolls. */
  footer?: ReactNode;
  /**
   * Blocking (default) renders a backdrop, locks page scroll and traps
   * focus. Non-blocking does none of those AND drops aria-modal, since
   * declaring it without a trap tells assistive tech the page is
   * unavailable when it is not.
   */
  blocking?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Removes body padding — for a panel whose content is its own surface. */
  flushBody?: boolean;
}

export function Offcanvas({
  open,
  onClose,
  title,
  children,
  footer,
  blocking = true,
  initialFocusRef,
  flushBody,
}: OffcanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useOverlay({
    open: open && blocking,
    onClose,
    dismissible: true,
    containerRef: ref,
    initialFocusRef,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {blocking && (
        <div className="absolute inset-0 bg-overlay-backdrop" onClick={onClose} aria-hidden />
      )}
      <div
        ref={ref}
        role="dialog"
        aria-modal={blocking ? "true" : undefined}
        aria-labelledby={titleId}
        // Anchored to the inline end, square along that edge.
        className="absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col rounded-l-lg bg-surface-canvas shadow-raised sm:max-w-[22rem]"
      >
        <div className="flex items-center gap-2 border-b border-surface-border px-card-padding py-card-header-y">
          <h2 id={titleId} className="text-lg font-medium text-text-primary">
            {title}
          </h2>
          <IconButton className="ml-auto" label={`Close ${title}`} icon="×" onClick={onClose} />
        </div>

        <div
          className={`flex-1 overflow-y-auto text-sm text-text-primary ${flushBody ? "" : "p-card-padding"}`}
        >
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-surface-border px-card-padding py-card-header-y">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
