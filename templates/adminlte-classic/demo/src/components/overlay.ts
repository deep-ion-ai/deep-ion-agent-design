import { useEffect, useRef } from "react";

// Shared overlay behaviour for Modal and Offcanvas, mirroring the rules in
// specs/modal.md's Accessibility section (which specs/offcanvas.md refers
// to rather than restating). Demo scaffolding only.

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useOverlay({
  open,
  onClose,
  dismissible,
  containerRef,
  /** Where focus should land on open. Falls back to the container. */
  initialFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  dismissible: boolean;
  containerRef: React.RefObject<HTMLElement>;
  initialFocusRef?: React.RefObject<HTMLElement>;
}) {
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement | null;

    // Focus moves in — but never onto a destructive action, so callers pass
    // initialFocusRef at the dismissing action or the first field.
    const target =
      initialFocusRef?.current ??
      (containerRef.current?.querySelector(FOCUSABLE) as HTMLElement | null) ??
      containerRef.current;
    target?.focus();

    // The page behind does not scroll while the overlay is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && dismissible) {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Focus is trapped: Tab and Shift+Tab cycle within the overlay.
      const nodes = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      // Focus returns to whatever opened the overlay.
      returnTo.current?.focus();
    };
  }, [open, dismissible, onClose, containerRef, initialFocusRef]);
}
