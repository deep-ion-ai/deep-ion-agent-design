import { useRef, useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { TextInput } from "../components/TextInput";
import { NativeSelect } from "../components/Select";
import { Checkbox } from "../components/CheckboxRadioSwitch";

// Visual reference implementation of patterns/wizard.md. Renders inside
// AppShell. Demo scaffolding only — see ../../README.md and /AGENTS.md.

interface Values {
  company: string;
  size: string;
  contact: string;
  email: string;
  plan: string;
  agreed: boolean;
}

const STEPS = ["Organisation", "Your details", "Plan", "Review"] as const;

const EMPTY: Values = {
  company: "",
  size: "1-10",
  contact: "",
  email: "",
  plan: "growth",
  agreed: false,
};

/** Per-step validation, run on ADVANCING — the rules are
 *  specs/form-validation.md's; what the pattern adds is when. */
function validate(step: number, v: Values): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 0 && v.company.trim().length < 2) {
    errors.company = "Enter your organisation's name.";
  }
  if (step === 1) {
    if (v.contact.trim().length < 2) errors.contact = "Enter a contact name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) {
      errors.email = "Enter a valid email address.";
    }
  }
  if (step === 3 && !v.agreed) {
    errors.agreed = "You need to accept the terms before finishing.";
  }
  return errors;
}

export function Wizard({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const last = step === STEPS.length - 1;
  const set = <K extends keyof Values>(k: K, val: Values[K]) =>
    setValues((v) => ({ ...v, [k]: val }));

  function focusFirstInvalid(found: Record<string, string>) {
    const first = Object.keys(found)[0];
    const el = panelRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  }

  function advance() {
    const found = validate(step, values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Failed advance: focus the first invalid field, step unchanged.
      focusFirstInvalid(found);
      return;
    }
    if (last) {
      onFinish();
      return;
    }
    setStep((s) => s + 1);
    // Successful advance: focus moves to the new step's heading, never
    // left on Next — see patterns/wizard.md's Accessibility rules.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function back() {
    setErrors({});
    // Values are kept, not cleared: Back never loses entered data.
    setStep((s) => Math.max(0, s - 1));
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  const fieldState = (k: string) => (errors[k] ? ("invalid" as const) : ("default" as const));

  return (
    <>
      {/* Step indicator: a Segmented Progress Bar, not a row of
          clickable step labels — see the pattern's Composition rules. */}
      <div className="mb-grid-gap">
        <ProgressBar
          label={`Setup progress, step ${step + 1} of ${STEPS.length}`}
          value={((step + 1) / STEPS.length) * 100}
          segments={STEPS.length}
          showLabel={false}
        />
        <p className="mt-2 text-sm text-text-secondary">
          Step {step + 1} of {STEPS.length}
          {/* Step names drop below breakpoint.md — four labelled steps
              will not fit, and the count says more than truncations. */}
          <span className="ml-2 hidden font-medium text-text-primary md:inline">
            {STEPS[step]}
          </span>
        </p>
      </div>

      <Card
        title={
          <span ref={headingRef} tabIndex={-1} className="outline-none">
            {STEPS[step]}
          </span>
        }
        titleText={STEPS[step]}
        footer={
          <div className="flex items-center justify-between">
            {/* Absent, not disabled, on the first step. */}
            {step > 0 ? (
              <Button emphasis="outline" accent="secondary" onClick={back}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {/* Finish is labelled for what it does, so a reader can tell
                this press is the irreversible one. */}
            <Button onClick={advance}>{last ? "Create workspace" : "Next"}</Button>
          </div>
        }
      >
        <div ref={panelRef} className="space-y-4">
          {step === 0 && (
            <>
              <TextInput
                name="company"
                label="Organisation name"
                required
                value={values.company}
                onChange={(e) => set("company", e.target.value)}
                state={fieldState("company")}
                message={errors.company}
              />
              <NativeSelect
                label="Number of people"
                value={values.size}
                onChange={(v) => set("size", v)}
                options={[
                  { value: "1-10", label: "1–10" },
                  { value: "11-50", label: "11–50" },
                  { value: "51-200", label: "51–200" },
                  { value: "200+", label: "More than 200" },
                ]}
              />
            </>
          )}

          {step === 1 && (
            <>
              <TextInput
                name="contact"
                label="Contact name"
                required
                value={values.contact}
                onChange={(e) => set("contact", e.target.value)}
                state={fieldState("contact")}
                message={errors.contact}
              />
              <TextInput
                name="email"
                label="Email address"
                type="email"
                required
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                state={fieldState("email")}
                message={errors.email}
              />
            </>
          )}

          {step === 2 && (
            <NativeSelect
              label="Plan"
              value={values.plan}
              onChange={(v) => set("plan", v)}
              options={[
                { value: "starter", label: "Starter — $0" },
                { value: "growth", label: "Growth — $49/month" },
                { value: "scale", label: "Scale — $199/month" },
              ]}
            />
          )}

          {step === 3 && (
            <>
              <dl className="divide-y divide-surface-border text-sm">
                {[
                  ["Organisation", values.company],
                  ["People", values.size],
                  ["Contact", values.contact],
                  ["Email", values.email],
                  ["Plan", values.plan],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2">
                    <dt className="text-text-secondary">{k}</dt>
                    <dd className="text-text-primary">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
              <Checkbox
                name="agreed"
                label="I accept the Terms of Service"
                checked={values.agreed}
                onChange={(e) => set("agreed", e.target.checked)}
                required
              />
              {errors.agreed && (
                <p className="text-xs text-text-accent-danger">{errors.agreed}</p>
              )}
            </>
          )}
        </div>
      </Card>
    </>
  );
}
