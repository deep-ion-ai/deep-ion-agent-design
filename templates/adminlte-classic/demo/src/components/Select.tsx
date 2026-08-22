import { ChevronsUpDown, X, Check, ICON_STROKE, iconSize } from "./icons";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { fieldStateClasses, FieldMessage, RequiredMark, type FieldState } from "./FieldStatus";
import { focusRing } from "./accents";

// Visual reference implementation of specs/select.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface SelectOption {
  value: string;
  label: string;
}

export interface NativeSelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  state?: FieldState;
  message?: string;
  required?: boolean;
  disabled?: boolean;
}

/** The default, preferred variant — a real <select>, keyboard-operable and
 *  exposed to assistive tech with no extra markup. Reach for MultiSelect's
 *  custom listbox only for the gaps a native element can't cover. */
export function NativeSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select one…",
  state = "default",
  message,
  required,
  disabled,
}: NativeSelectProps) {
  const id = useId();
  const messageId = `${id}-message`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-text-primary">
        {label}
        {required && <RequiredMark />}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={state === "invalid" || undefined}
          aria-describedby={message ? messageId : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded border bg-surface-canvas px-3 py-2 pr-8 text-sm text-text-primary disabled:cursor-not-allowed disabled:bg-neutral-light disabled:text-text-secondary ${fieldStateClasses(state)}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronsUpDown
          aria-hidden
          strokeWidth={ICON_STROKE}
          className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary ${iconSize.sm}`}
        />
      </div>
      <FieldMessage id={messageId} state={state}>
        {message}
      </FieldMessage>
    </div>
  );
}

export interface MultiSelectProps {
  label: string;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

/**
 * A custom listbox storing a SET of values, shown as removable chips in the
 * trigger. Deliberately not the reference's scrolling native `<select
 * multiple>`, which hides most options with no signal more exist and gives
 * no way to see what's already chosen without scrolling back — see
 * specs/select.md's Variants.
 *
 * Borrows specs/dropdown-menu.md's floating-panel shape and keyboard model,
 * substituting listbox/option roles for menu/menuitem: this stores a
 * selection, it does not perform an action.
 */
export function MultiSelect({ label, options, value, onChange, placeholder = "Select…" }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const id = useId();

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    function onDocPointerDown(e: PointerEvent) {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [open]);

  function toggle(v: string) {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(options.length - 1);
    }
  }

  function onPanelKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        toggle(options[activeIndex].value);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
    }
  }

  return (
    <div>
      <label id={`${id}-label`} className="mb-1 block text-sm font-medium text-text-primary">
        {label}
      </label>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => (open ? close() : (setOpen(true), setActiveIndex(0)))}
        onKeyDown={onTriggerKeyDown}
        className={`flex min-h-[2.375rem] w-full flex-wrap items-center gap-1 rounded border border-surface-border bg-surface-canvas px-2 py-1 text-left text-sm ${focusRing}`}
      >
        {value.length === 0 && <span className="px-1 text-text-secondary">{placeholder}</span>}
        {value.map((v) => {
          const opt = options.find((o) => o.value === v);
          if (!opt) return null;
          return (
            <span
              key={v}
              className="inline-flex items-center gap-1 rounded-pill bg-brand-primary py-0.5 pl-2 pr-1 text-xs text-text-on-accent"
            >
              {opt.label}
              <span
                role="button"
                tabIndex={-1}
                aria-label={`Remove ${opt.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(v);
                }}
                className="rounded-pill hover:bg-overlay-accent-shade"
              >
                <X aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
              </span>
            </span>
          );
        })}
        <ChevronsUpDown
          aria-hidden
          strokeWidth={ICON_STROKE}
          className={`ml-auto shrink-0 text-text-secondary ${iconSize.sm}`}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={`${id}-label`}
          onKeyDown={onPanelKeyDown}
          className="relative z-30 mt-1 max-h-60 w-full overflow-auto rounded border border-surface-border bg-surface-canvas py-1 shadow-raised"
        >
          {options.map((o, i) => {
            const selected = value.includes(o.value);
            return (
              <div
                key={o.value}
                ref={(el) => (optionRefs.current[i] = el)}
                role="option"
                aria-selected={selected}
                tabIndex={i === activeIndex ? 0 : -1}
                onClick={() => toggle(o.value)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-text-primary hover:bg-neutral-light focus:bg-neutral-light focus:outline-none ${
                  i === activeIndex ? "bg-neutral-light" : ""
                }`}
              >
                {o.label}
                {selected && (
                  <Check aria-hidden strokeWidth={ICON_STROKE} className={`text-brand-primary ${iconSize.sm}`} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
