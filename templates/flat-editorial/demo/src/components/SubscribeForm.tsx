import { useId, useRef, useState } from "react";
import { Button } from "./Button";
import { focusRing } from "./focus";

// Visual reference implementation of specs/subscribe-form.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The description states FREQUENCY AND CONTENT — that spec calls it the
// sentence that decides whether a reader subscribes, and the one most
// often left out.

export function SubscribeForm({ inline = false }: { inline?: boolean }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "error" | "done">("idle");
  const doneRef = useRef<HTMLParagraphElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setState("error");
      return;
    }
    setState("busy");
    // No backend in this demo; the delay only exists so the loading
    // state specs/button.md defines is visible.
    window.setTimeout(() => {
      setState("done");
      // Moving focus is what tells a screen reader user the form is gone
      // and the action succeeded.
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 700);
  }

  // REPLACED rather than cleared: a form that empties itself looks like
  // it failed.
  if (state === "done") {
    return (
      <div className="rounded bg-surface-muted p-8">
        <p
          ref={doneRef}
          tabIndex={-1}
          role="status"
          className="font-ui text-base font-medium text-status-success outline-none"
        >
          Thanks — check your inbox to confirm.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded bg-surface-muted p-8">
      <h2 className="font-ui text-h4 font-semibold text-text-primary">Get new posts by email</h2>
      <p className="mt-2 font-ui text-sm text-text-secondary">
        About one email a month. No spam.
      </p>

      <form onSubmit={submit} className={`mt-6 ${inline ? "sm:flex sm:items-end sm:gap-3" : ""}`}>
        <div className={inline ? "sm:flex-1" : ""}>
          {/* A real, visible label — not a placeholder standing in for
              one. That substitution is the single most common defect in
              newsletter forms (specs/subscribe-form.md). */}
          <label htmlFor={id} className="mb-2 block font-ui text-sm font-medium text-text-primary">
            Email address
          </label>
          <input
            id={id}
            type="email"
            autoComplete="email"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (state === "error") setState("idle");
            }}
            aria-invalid={state === "error" || undefined}
            aria-describedby={state === "error" ? `${id}-msg` : undefined}
            className={`w-full rounded border bg-surface-canvas px-3 py-3 font-ui text-base text-text-primary ${focusRing} ${
              state === "error" ? "border-status-danger" : "border-surface-rule"
            }`}
          />
        </div>
        <Button type="submit" loading={state === "busy"} className={inline ? "mt-3 sm:mt-0" : "mt-3"}>
          Subscribe
        </Button>
      </form>

      {/* Polite live region, and the wording says what to DO. */}
      <p id={`${id}-msg`} role="status" aria-live="polite" className="mt-2 font-ui text-sm text-status-danger">
        {state === "error" ? "Enter a valid email address." : ""}
      </p>
    </div>
  );
}
