import { Eye, EyeOff, ICON_STROKE, iconSize } from "./icons";
import { useId, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { fieldStateClasses, FieldMessage, RequiredMark, type FieldState } from "./FieldStatus";

// Visual reference implementation of specs/text-input.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

interface SharedFieldProps {
  label: string;
  helperText?: string;
  state?: FieldState;
  message?: string;
  required?: boolean;
  /** Renders like static text, with no border/background — a display-only field, still focusable. */
  plaintext?: boolean;
  /** Renders only the `<input>`, with no label/helper/message wrapper — for
   *  composing inside specs/input-group.md, whose own consumer renders the
   *  label once, above the whole group. The field still needs an
   *  accessible name: pass `id` and render a real `<label htmlFor>`
   *  alongside the group, or pass `aria-label` directly. */
  bare?: boolean;
}

export interface TextInputProps
  extends SharedFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "label"> {}

const fieldBase =
  "w-full rounded border bg-surface-canvas px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary disabled:cursor-not-allowed disabled:bg-neutral-light disabled:text-text-secondary";

export function TextInput({
  label,
  helperText,
  state = "default",
  message,
  required,
  plaintext,
  bare,
  className = "",
  id: idProp,
  ...rest
}: TextInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = `${id}-helper`;
  const messageId = `${id}-message`;
  const describedBy = [helperText ? helperId : null, message ? messageId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  const input = (
    <input
      id={id}
      {...rest}
      required={required}
      aria-required={required || undefined}
      aria-invalid={state === "invalid" || undefined}
      aria-describedby={describedBy}
      className={
        plaintext
          ? `w-full border-0 bg-transparent px-0 py-2 text-sm text-text-primary ${className}`
          : `${fieldBase} ${fieldStateClasses(state)} ${className}`
      }
    />
  );

  if (bare) return input;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-text-primary">
        {label}
        {required && <RequiredMark />}
      </label>
      {input}
      {helperText && !message && (
        <p id={helperId} className="mt-1 text-xs text-text-secondary">
          {helperText}
        </p>
      )}
      <FieldMessage id={messageId} state={state}>
        {message}
      </FieldMessage>
    </div>
  );
}

/** The password variant with a show/hide toggle — not in the AdminLTE reference,
 *  added because a password field with no way to check what was typed is a
 *  usability defect this template does not reproduce. See specs/text-input.md. */
export function PasswordInput(props: Omit<TextInputProps, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <TextInput {...props} type={visible ? "text" : "password"} className="pr-10" />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2 top-[2.125rem] inline-flex h-5 w-5 items-center justify-center text-text-secondary hover:text-text-primary"
      >
        {visible ? (
          <EyeOff aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
        ) : (
          <Eye aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
        )}
      </button>
    </div>
  );
}

export interface TextareaProps
  extends SharedFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {}

export function Textarea({
  label,
  helperText,
  state = "default",
  message,
  required,
  className = "",
  rows = 4,
  ...rest
}: TextareaProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const messageId = `${id}-message`;
  const describedBy = [helperText ? helperId : null, message ? messageId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-text-primary">
        {label}
        {required && <RequiredMark />}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...rest}
        required={required}
        aria-required={required || undefined}
        aria-invalid={state === "invalid" || undefined}
        aria-describedby={describedBy}
        className={`${fieldBase} resize-y leading-base ${fieldStateClasses(state)} ${className}`}
      />
      {helperText && !message && (
        <p id={helperId} className="mt-1 text-xs text-text-secondary">
          {helperText}
        </p>
      )}
      <FieldMessage id={messageId} state={state}>
        {message}
      </FieldMessage>
    </div>
  );
}
