import { useState, type ReactNode } from "react";
import { accentText, accentBorder, type Accent } from "./accents";
import { IconButton } from "./Button";

// Visual reference implementation of specs/alert.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type AlertSeverity = "success" | "danger" | "warning" | "info" | "neutral";

/**
 * How the alert arrived decides its role — and choosing wrong either says
 * nothing or interrupts:
 *  - "static": already on the page at load. No live role at all.
 *  - "status": inserted after something the user did. Polite.
 *  - "alert":  a time-sensitive failure. Assertive — interrupts. Rare.
 */
export type AlertLiveness = "static" | "status" | "alert";

// The icon SHAPE differs per severity: it is the non-colour carrier.
const severityGlyph: Record<AlertSeverity, string> = {
  success: "✓",
  danger: "✕",
  warning: "▲",
  info: "i",
  neutral: "•",
};

// Tailwind's `/10` opacity modifier cannot be applied to a colour that is
// itself a CSS custom property, so the wash is mixed explicitly. Kept light
// enough that body text on it stays above 4.5:1.
const washVar: Record<AlertSeverity, string> = {
  success: "--color-status-success",
  danger: "--color-status-danger",
  warning: "--color-status-warning",
  info: "--color-status-info",
  neutral: "--color-neutral-light",
};

function wash(severity: AlertSeverity) {
  const pct = severity === "neutral" ? 100 : 12;
  return {
    background: `color-mix(in srgb, var(${washVar[severity]}) ${pct}%, var(--color-surface-canvas))`,
  };
}

export interface AlertProps {
  severity?: AlertSeverity;
  liveness?: AlertLiveness;
  /** Short bold lead-in naming the situation. */
  title?: string;
  children: ReactNode;
  /** At most one. */
  action?: ReactNode;
  onDismiss?: () => void;
  /** Names what is being closed — "Dismiss import error", not "Close". */
  dismissLabel?: string;
  className?: string;
}

export function Alert({
  severity = "info",
  liveness = "static",
  title,
  children,
  action,
  onDismiss,
  dismissLabel = "Dismiss message",
  className = "",
}: AlertProps) {
  const accent = (severity === "neutral" ? "secondary" : severity) as Accent;
  const text = severity === "neutral" ? "text-text-secondary" : accentText[accent];
  const border =
    severity === "neutral" ? "border-surface-border" : accentBorder[accent];

  return (
    <div
      role={liveness === "static" ? undefined : liveness}
      style={wash(severity)}
      className={`flex items-start gap-2 rounded border p-4 ${border} ${className}`}
    >
      <span aria-hidden className={`mt-0.5 shrink-0 font-semibold ${text}`}>
        {severityGlyph[severity]}
      </span>
      <div className="flex-1 text-sm leading-base text-text-primary">
        {title && <span className="font-semibold">{title}. </span>}
        {children}
        {action && <span className="ml-1">{action}</span>}
      </div>
      {onDismiss && (
        <IconButton label={dismissLabel} icon="×" onClick={onDismiss} />
      )}
    </div>
  );
}

/** Convenience wrapper for the demo: a dismissible alert that removes itself. */
export function DismissibleAlert(props: AlertProps) {
  const [visible, setVisible] = useState(true);
  // Dismissed means removed from the DOM, not hidden: a hidden alert stays
  // in the accessibility tree and keeps being announced.
  if (!visible) return null;
  return <Alert {...props} onDismiss={() => setVisible(false)} />;
}
