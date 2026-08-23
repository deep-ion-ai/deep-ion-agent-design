import { useEffect, useState } from "react";
import { Moon, Sun, ICON_STROKE, iconSize } from "./icons";
import { focusRing } from "./accents";

// Visual reference implementation of foundations/theming.md's theme
// switch. Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type Theme = "light" | "dark";

const STORAGE_KEY = "adminlte-classic-demo:theme";

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function storedChoice(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    // A private window or blocked site data is not an error worth
    // breaking the page over — fall back to the system preference.
    return null;
  }
}

/**
 * The two rules foundations/theming.md requires of a theme switch:
 * honour the system preference on first load, and let an explicit
 * choice override it — in BOTH directions, so someone who picks light
 * on a dark-set machine keeps light.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => storedChoice() ?? (systemPrefersDark() ? "dark" : "light"),
  );

  // The generated CSS keys the dark block off [data-theme], and falls
  // back to prefers-color-scheme when the attribute is absent. Setting
  // it explicitly here means an override wins either way.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Follow the system preference while it is still the thing deciding —
  // i.e. only until the reader makes a choice of their own.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (storedChoice() === null) setThemeState(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisting is a degraded experience, not a broken one.
    }
  }

  return { theme, setTheme };
}

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
}) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      // Applies immediately and has no Save step, so it is a switch, not
      // a form control — but it is rendered as an icon button here since
      // the navbar has no room for a labelled track. The accessible name
      // states what it controls, not just "Dark".
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={() => onChange(dark ? "light" : "dark")}
      className={`inline-flex h-9 w-9 items-center justify-center rounded text-text-secondary hover:bg-neutral-light hover:text-text-primary ${focusRing}`}
    >
      {dark ? (
        <Sun aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
      ) : (
        <Moon aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
      )}
    </button>
  );
}
