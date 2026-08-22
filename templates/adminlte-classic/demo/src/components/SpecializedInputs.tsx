import { Upload, X, ICON_STROKE, iconSize } from "./icons";
import { useEffect, useId, useRef, useState } from "react";
import { IconButton } from "./Button";
import { focusRing } from "./accents";
import { ProgressBar } from "./ProgressBar";

// Visual reference implementation of specs/specialized-inputs.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  /** A human-readable form of the value, for aria-valuetext, where the raw
   *  number alone is ambiguous (a percentage, a currency amount). */
  valueText?: string;
}

export function RangeSlider({ label, min, max, value, onChange, valueText }: RangeSliderProps) {
  const id = useId();
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
        <span className="text-sm text-text-primary">{valueText ?? value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-2 w-full cursor-pointer appearance-none rounded-pill bg-surface-border accent-brand-primary ${focusRing}`}
      />
    </div>
  );
}

export interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-8 w-8 cursor-pointer rounded border border-surface-border bg-transparent p-0.5 ${focusRing}`}
        />
        {/* A genuine, readable, selectable text alternative — native colour
            input accessibility is inconsistent across platforms, so this is
            required, not decorative. See specs/specialized-inputs.md. */}
        <span className="font-mono text-sm text-text-primary">{value}</span>
      </div>
    </div>
  );
}

export interface FileInputProps {
  label: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  /** Demo-only: simulates a transfer so the Uploading state is visible.
   *  A real project drives `uploadProgress` from its actual transfer. */
  simulateUpload?: boolean;
}

export function FileInput({ label, multiple, onChange, simulateUpload }: FileInputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [names, setNames] = useState<string[]>([]);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (progress === null || progress >= 100) return;
    const t = window.setTimeout(() => setProgress((p) => Math.min(100, (p ?? 0) + 20)), 300);
    return () => window.clearTimeout(t);
  }, [progress]);

  function handleChange(files: FileList | null) {
    setNames(files ? Array.from(files).map((f) => f.name) : []);
    onChange?.(files);
    setProgress(files && files.length && simulateUpload ? 0 : null);
  }

  function clear() {
    if (inputRef.current) inputRef.current.value = "";
    handleChange(null);
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-text-primary" id={`${id}-label`}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        {/* The label wraps the visually-hidden native input, so clicking the
            styled trigger activates the real OS file picker with no script —
            never a fake button standing in for it. See
            specs/specialized-inputs.md's Accessibility rules. */}
        <label
          htmlFor={id}
          className={`inline-flex cursor-pointer items-center gap-2 rounded border border-surface-border bg-surface-canvas px-4 py-2 text-sm font-medium text-text-primary hover:bg-neutral-light ${focusRing}`}
        >
          <Upload aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
          {multiple ? "Choose files" : "Choose file"}
        </label>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple={multiple}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-readout`}
          onChange={(e) => handleChange(e.target.files)}
          className="sr-only"
        />
        <span id={`${id}-readout`} className="text-sm text-text-secondary">
          {names.length === 0
            ? "No file chosen"
            : names.length === 1
              ? names[0]
              : `${names.length} files selected`}
        </span>
        {names.length > 0 && (
          <IconButton label="Clear selection" icon={<X strokeWidth={ICON_STROKE} className={iconSize.sm} />} onClick={clear} />
        )}
      </div>
      {progress !== null && (
        <div className="mt-2 max-w-xs">
          <ProgressBar
            label={`Uploading ${names[0] ?? "file"}`}
            value={progress}
            size="sm"
            accent={progress >= 100 ? "success" : "primary"}
          />
        </div>
      )}
    </div>
  );
}
