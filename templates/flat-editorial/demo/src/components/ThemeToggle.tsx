import { useEffect, useState } from "react";
import { Moon, Sun, ICON_STROKE, iconSize } from "./icons";
import { focusRing } from "./focus";

// Visual reference implementation of foundations/theming.md's theme
// switch. Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// A blog needs this more than most product surfaces: people read long
// articles at night, and a reader whose system is dark handed a
// full-brightness page of prose will usually leave.

export type Theme = "light" | "dark";

const STORAGE_KEY = "flat-editorial-demo:theme";

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function storedChoice(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    // A private window or blocked site data is not worth breaking the
    // page over — fall back to the system preference.
    return null;
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => storedChoice() ?? (systemPrefersDark() ? "dark" : "light"),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Follow the system only while it is still the thing deciding — i.e.
  // until the reader makes a choice of their own.
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
      // Not persisting is degraded, not broken.
    }
  }

  return { theme, setTheme };
}

export function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (t: Theme) => void }) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      // Says what it controls, not just "Dark" (foundations/theming.md).
      aria-label="Dark theme"
      onClick={() => onChange(dark ? "light" : "dark")}
      className={`inline-flex h-tap-target w-tap-target items-center justify-center rounded text-text-secondary transition-colors duration-state ease-standard hover:bg-accent-wash hover:text-accent-base ${focusRing}`}
    >
      {dark ? (
        <Sun aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
      ) : (
        <Moon aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
      )}
    </button>
  );
}
