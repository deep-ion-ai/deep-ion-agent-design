import { cloneElement, useId, useRef, useState, type ReactElement } from "react";

// Visual reference implementation of specs/tooltip.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// Hover shows after a short delay; focus shows immediately — a keyboard
// user has already committed to the trigger by tabbing to it. Escape
// dismisses without moving focus off the trigger. Placement is a static
// per-usage choice here rather than runtime collision detection, the same
// simplification DropdownMenu.tsx already makes for its panel.

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

const HOVER_DELAY_MS = 400;

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export interface TooltipProps {
  /** Plain text only — no interactive content. See specs/tooltip.md. */
  text: string;
  placement?: TooltipPlacement;
  /** The single focusable/hoverable trigger. Its ref and aria-describedby are wired automatically. */
  children: ReactElement<Record<string, unknown>>;
}

export function Tooltip({ text, placement = "top", children }: TooltipProps) {
  const [shown, setShown] = useState(false);
  const id = useId();
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();

  function showNow() {
    clearTimeout(hoverTimer.current);
    setShown(true);
  }
  function hideNow() {
    clearTimeout(hoverTimer.current);
    setShown(false);
  }
  function showAfterDelay() {
    hoverTimer.current = setTimeout(() => setShown(true), HOVER_DELAY_MS);
  }

  const trigger = cloneElement(children, {
    "aria-describedby": shown ? id : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      showAfterDelay();
      (children.props.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideNow();
      (children.props.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      showNow();
      (children.props.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hideNow();
      (children.props.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      // Escape dismisses without moving focus off the trigger.
      if (e.key === "Escape" && shown) hideNow();
      (children.props.onKeyDown as ((e: React.KeyboardEvent) => void) | undefined)?.(e);
    },
  });

  return (
    <span className="relative inline-flex">
      {trigger}
      {shown && (
        <span
          role="tooltip"
          id={id}
          className={`pointer-events-none absolute z-10 max-w-[16rem] whitespace-nowrap rounded-sm bg-neutral-dark px-2 py-1 text-xs text-text-inverse shadow-raised ${placementClasses[placement]}`}
        >
          {text}
        </span>
      )}
    </span>
  );
}
