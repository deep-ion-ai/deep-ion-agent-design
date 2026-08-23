import { useRef, useState } from "react";
import { Check, Copy, ICON_STROKE, iconSize } from "./icons";
import { IconButton } from "./Button";

// Visual reference implementation of specs/code-block.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// No syntax highlighting here: that spec defers the highlighter to
// foundations/libraries.md, which requires a build-time one themed from
// this template's own tokens. Shipping an unthemed highlighter to make
// the demo prettier would misrepresent the contract, so the demo renders
// plain code and the requirement stays visible.

export interface CodeBlockProps {
  code: string;
  /** Rendered in the label slot. Mutually exclusive with `filename`. */
  language?: string;
  /** Takes the label slot instead of the language — two labels is clutter. */
  filename?: string;
  /** 1-based line numbers to band with color.accent.wash. */
  highlightLines?: number[];
}

export function CodeBlock({ code, language, filename, highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const label = filename ?? language;
  const lines = code.replace(/\n$/, "").split("\n");

  function copy() {
    navigator.clipboard?.writeText(code).then(
      () => {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
      },
      () => {
        /* Clipboard denied — leave the control in its resting state
           rather than claiming a success that did not happen. */
      },
    );
  }

  return (
    <div className="group relative my-prose-block bg-chrome-code-bg">
      {label && (
        <span className="pointer-events-none absolute right-8 top-3 font-ui text-xs tracking-wide text-text-secondary">
          {label}
        </span>
      )}

      {/* Revealed on hover for pointer users, always present for keyboard
          users — a control that exists only on hover does not exist for a
          keyboard or touch reader (foundations/iconography.md). */}
      <div className="absolute right-2 top-8 opacity-0 transition-opacity duration-state ease-standard focus-within:opacity-100 group-hover:opacity-100">
        <IconButton
          label={copied ? "Code sample copied" : "Copy code sample"}
          onClick={copy}
          icon={
            copied ? (
              <Check strokeWidth={ICON_STROKE} className={iconSize.sm} />
            ) : (
              <Copy strokeWidth={ICON_STROKE} className={iconSize.sm} />
            )
          }
        />
      </div>

      {/* tabIndex + an accessible name: a horizontally scrolling block
          that only a pointer can reach hides code from a keyboard user. */}
      <pre
        tabIndex={0}
        aria-label={label ? `Code sample: ${label}` : "Code sample"}
        className={`overflow-x-auto p-8 font-mono text-sm leading-base text-text-primary ${
          label ? "pt-12" : ""
        }`}
      >
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={`block ${
                highlightLines.includes(i + 1) ? "-mx-8 bg-accent-wash px-8" : ""
              }`}
            >
              {line === "" ? " " : line}
            </span>
          ))}
        </code>
      </pre>

      {/* Announced, not shown only — specs/code-block.md. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Code sample copied to clipboard" : ""}
      </span>
    </div>
  );
}
