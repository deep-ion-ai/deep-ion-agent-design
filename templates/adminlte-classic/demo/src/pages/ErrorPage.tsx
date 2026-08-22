import { useEffect } from "react";
import { Button } from "../components/Button";

// Visual reference implementation of patterns/error-page.md. Deliberately
// NOT rendered inside AppShell — see that pattern's Purpose for why a 500
// in particular must not depend on the same chrome/data it exists to
// route around. Demo scaffolding only — see ../../README.md and /AGENTS.md.

export type ErrorVariant = "404" | "500";

const COPY: Record<
  ErrorVariant,
  { title: string; supporting: string; action: string; pageTitle: string }
> = {
  "404": {
    title: "We can't find that page",
    supporting: "The page may have been moved or deleted.",
    action: "Back to dashboard",
    pageTitle: "Page not found",
  },
  "500": {
    title: "Something went wrong on our end",
    supporting: "The team has been notified. Try again in a moment.",
    action: "Try again",
    pageTitle: "Something went wrong",
  },
};

export function ErrorPage({
  variant,
  onNavigate,
}: {
  variant: ErrorVariant;
  onNavigate: (hash: string) => void;
}) {
  const { title, supporting, action, pageTitle } = COPY[variant];

  // A reader with several tabs open can't tell two error pages apart by a
  // shared generic title — see the pattern's Accessibility rules.
  useEffect(() => {
    const previous = document.title;
    document.title = pageTitle;
    return () => {
      document.title = previous;
    };
  }, [pageTitle]);

  function handlePrimaryAction() {
    // 500: a reload, never a resubmission of whatever failed — the page
    // ships from static content alone, so a reload is always safe.
    if (variant === "500") {
      window.location.reload();
      return;
    }
    onNavigate("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4">
      <div className="w-full max-w-sm text-center">
        {/* Decorative mark, not content — the heading below states the
            problem in words, which is what a screen reader announces.
            font.heading.h1 is this template's largest size token; the
            pattern allows going larger, but staying within the token
            scale keeps this reference implementation token-only. */}
        <p aria-hidden className="text-h1 font-bold leading-tight text-text-secondary">
          {variant}
        </p>
        <h1 className="mt-2 text-h2 font-semibold text-text-primary">{title}</h1>
        <p className="mt-2 text-base text-text-secondary">{supporting}</p>
        <Button className="mt-6" onClick={handlePrimaryAction}>
          {action}
        </Button>
      </div>
    </div>
  );
}
