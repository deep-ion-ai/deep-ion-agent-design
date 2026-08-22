import { useId, useRef, type ReactNode } from "react";
import { useOverlay } from "./overlay";
import { IconButton } from "./Button";

// Visual reference implementation of specs/modal.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Trailing-aligned action row. At most three. */
  footer?: ReactNode;
  /** Blocking modals ignore Escape and backdrop clicks. */
  blocking?: boolean;
  /** Disable backdrop dismissal when the dialog holds unsaved input. */
  dismissOnBackdrop?: boolean;
  /** Focus lands here on open — never on a destructive action. */
  initialFocusRef?: React.RefObject<HTMLElement>;
  describedBy?: string;
  size?: "default" | "wide";
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  blocking = false,
  dismissOnBackdrop = true,
  initialFocusRef,
  describedBy,
  size = "default",
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useOverlay({ open, onClose, dismissible: !blocking, containerRef: ref, initialFocusRef });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div
        className="fixed inset-0 bg-overlay-backdrop"
        onClick={!blocking && dismissOnBackdrop ? onClose : undefined}
        aria-hidden
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={describedBy}
        // Offset from the top rather than vertically centred, so the panel
        // does not jump as its content grows.
        className={`relative z-10 flex max-h-full w-full flex-col rounded-lg bg-surface-canvas shadow-raised sm:mt-16 sm:max-h-[calc(100%-8rem)] ${
          size === "wide" ? "sm:max-w-3xl" : "sm:max-w-lg"
        } max-sm:h-full max-sm:rounded-none`}
      >
        <div className="flex items-center gap-2 border-b border-surface-border px-card-padding py-card-header-y">
          <h2 id={titleId} className="text-lg font-medium text-text-primary">
            {title}
          </h2>
          {/* Required: Escape and the backdrop are invisible affordances. */}
          <IconButton
            className="ml-auto"
            label={`Close ${title}`}
            icon="×"
            onClick={onClose}
          />
        </div>

        {/* Scrollable body is the default for long content: a modal that
            grows past the viewport strands its own footer actions. */}
        <div className="flex-1 overflow-y-auto p-card-padding text-sm text-text-primary">
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
