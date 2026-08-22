import type { ReactNode } from "react";

// Visual reference implementation of templates/adminlte-classic/specs/card.md.
// This is demo scaffolding only — a real project should regenerate this
// component from the spec, idiomatic to its own framework/stack, not
// copy this file. See ../../README.md and /AGENTS.md.

type AccentColor = "primary" | "success" | "danger" | "warning" | "info";

const accentClassMap: Record<AccentColor, string> = {
  primary: "border-l-brand-primary",
  success: "border-l-status-success",
  danger: "border-l-status-danger",
  warning: "border-l-status-warning",
  info: "border-l-status-info",
};

export interface CardProps {
  title?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  accent?: AccentColor;
  clickableHref?: string;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  error?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  children?: ReactNode;
}

function CardShell({
  title,
  actions,
  footer,
  accent,
  clickableHref,
  children,
  busy,
}: CardProps & { busy?: boolean }) {
  const accentClasses = accent ? `border-l-4 ${accentClassMap[accent]}` : "";
  const baseClasses = `bg-surface-canvas border border-surface-border rounded shadow-card ${accentClasses} ${
    clickableHref ? "transition-shadow duration-150 hover:shadow-raised" : ""
  }`;

  const content = (
    <>
      {title !== undefined && (
        <div className="flex items-center justify-between border-b border-surface-border px-card-padding py-card-header-y">
          <h3 className="text-lg font-medium text-text-primary">{title}</h3>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-card-padding" aria-busy={busy || undefined}>
        {children}
      </div>
      {footer && (
        <div className="border-t border-surface-border px-card-padding py-card-header-y text-sm text-text-secondary">
          {footer}
        </div>
      )}
    </>
  );

  if (clickableHref) {
    return (
      <a
        href={clickableHref}
        className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${baseClasses}`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}

export function Card(props: CardProps) {
  if (props.loading) {
    return (
      <CardShell {...props} busy>
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-1/3 rounded bg-neutral-light" />
          <div className="h-4 w-2/3 rounded bg-neutral-light" />
          <div className="h-4 w-1/2 rounded bg-neutral-light" />
        </div>
      </CardShell>
    );
  }

  if (props.error) {
    return (
      <CardShell {...props}>
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <p className="text-sm text-status-danger">
            {props.errorMessage ?? "Something went wrong loading this card."}
          </p>
          {props.onRetry && (
            <button
              type="button"
              onClick={props.onRetry}
              className="text-sm font-medium text-brand-primary hover:underline"
            >
              Retry
            </button>
          )}
        </div>
      </CardShell>
    );
  }

  if (props.empty) {
    return (
      <CardShell {...props}>
        <p className="py-4 text-center text-sm text-text-secondary">
          {props.emptyMessage ?? "No items yet"}
        </p>
      </CardShell>
    );
  }

  return <CardShell {...props} />;
}

export interface MetricCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  accent?: AccentColor;
}

/** Summary/KPI card variant described in specs/card.md. */
export function MetricCard({ label, value, icon, accent }: MetricCardProps) {
  return (
    <Card accent={accent}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="text-xl font-semibold text-text-primary">{value}</p>
        </div>
        {icon && <div className="text-brand-primary">{icon}</div>}
      </div>
    </Card>
  );
}
