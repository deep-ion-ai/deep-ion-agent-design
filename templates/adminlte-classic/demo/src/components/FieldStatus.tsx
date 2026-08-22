import { CircleCheck, TriangleAlert, ICON_STROKE, iconSize } from "./icons";

// Visual reference implementation of specs/form-validation.md — the shared
// invalid/valid contract every field-shaped component defers to, rather
// than restating. Not a component placed on a page directly; the field
// components below import it.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type FieldState = "default" | "invalid" | "valid";

/** Border/ring classes for a field's current validation state. */
export function fieldStateClasses(state: FieldState) {
  if (state === "invalid") {
    return "border-status-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-status-danger";
  }
  if (state === "valid") {
    return "border-status-success focus:outline-none focus-visible:ring-2 focus-visible:ring-status-success";
  }
  return "border-surface-border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary";
}

/**
 * The message + icon below a field. Associate its id with the field via
 * aria-describedby (in addition to any helper-text id already there, never
 * replacing it) and set aria-invalid="true" on the field only while
 * state === "invalid" — omitted entirely otherwise, not "false".
 */
export function FieldMessage({ id, state, children }: { id: string; state: FieldState; children: React.ReactNode }) {
  if (state === "default" || !children) return null;
  const Icon = state === "invalid" ? TriangleAlert : CircleCheck;
  const color = state === "invalid" ? "text-text-accent-danger" : "text-text-accent-success";
  return (
    <p id={id} className={`mt-1 flex items-center gap-1 text-xs ${color}`}>
      <Icon aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
      {children}
    </p>
  );
}

/** The required-field mark beside a label — never colour alone: aria-required carries it too. */
export function RequiredMark() {
  return (
    <span className="text-text-accent-danger" aria-hidden>
      {" "}
      *
    </span>
  );
}
