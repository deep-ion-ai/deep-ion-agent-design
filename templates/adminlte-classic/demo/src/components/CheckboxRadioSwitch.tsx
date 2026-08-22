import { Check, Minus, ICON_STROKE, iconSize } from "./icons";
import { useEffect, useId, useRef, type InputHTMLAttributes } from "react";
import { FieldMessage, type FieldState } from "./FieldStatus";

// Visual reference implementation of specs/checkbox-radio-switch.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  label: string;
  /** Set via the DOM property, never an HTML attribute — see specs/checkbox-radio-switch.md. */
  indeterminate?: boolean;
}

export function Checkbox({ label, indeterminate, className = "", ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:text-text-secondary">
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          {...rest}
          className={`peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-surface-border bg-surface-canvas checked:border-brand-primary checked:bg-brand-primary indeterminate:border-brand-primary indeterminate:bg-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        />
        {indeterminate ? (
          <Minus
            aria-hidden
            strokeWidth={ICON_STROKE}
            className="pointer-events-none absolute h-3 w-3 text-text-on-accent opacity-0 peer-indeterminate:opacity-100"
          />
        ) : (
          <Check
            aria-hidden
            strokeWidth={ICON_STROKE}
            className="pointer-events-none absolute h-3 w-3 text-text-on-accent opacity-0 peer-checked:opacity-100"
          />
        )}
      </span>
      {label}
    </label>
  );
}

export interface RadioGroupProps {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  state?: FieldState;
  message?: string;
}

export function RadioGroup({ legend, name, options, value, onChange, state = "default", message }: RadioGroupProps) {
  const messageId = useId();
  return (
    <fieldset aria-describedby={message ? messageId : undefined}>
      <legend className="mb-1 text-sm font-medium text-text-primary">{legend}</legend>
      <div className="space-y-2">
        {options.map((o) => (
          <label key={o.value} className="inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="h-4 w-4 appearance-none rounded-pill border border-surface-border bg-surface-canvas bg-[length:0.5rem_0.5rem] bg-center bg-no-repeat checked:border-2 checked:border-brand-primary checked:bg-brand-primary checked:[background-image:radial-gradient(circle,white_40%,transparent_40%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            />
            {o.label}
          </label>
        ))}
      </div>
      <FieldMessage id={messageId} state={state}>
        {message}
      </FieldMessage>
    </fieldset>
  );
}

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  label: string;
}

/** A native checkbox styled as a track-and-thumb — functionally a
 *  Checkbox, per specs/checkbox-radio-switch.md, so it keeps full native
 *  accessibility with no extra ARIA. */
export function Switch({ label, className = "", ...rest }: SwitchProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-text-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:text-text-secondary">
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input
          type="checkbox"
          {...rest}
          className={`peer h-5 w-9 shrink-0 appearance-none rounded-pill border border-surface-border bg-neutral-light transition-colors checked:border-brand-primary checked:bg-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        />
        <span className="pointer-events-none absolute left-0.5 h-4 w-4 rounded-pill bg-surface-canvas shadow-card transition-transform peer-checked:translate-x-4" />
      </span>
      {label}
    </label>
  );
}
