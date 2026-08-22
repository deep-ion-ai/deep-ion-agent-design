import { ChevronDown, ChevronUp, EllipsisVertical, X, ICON_STROKE, iconSize } from "./icons";
import { useId, useState, type ReactNode } from "react";
import { IconButton } from "./Button";
import { DropdownMenu, type MenuItem } from "./DropdownMenu";
import { Ribbon, type RibbonProps } from "./Ribbon";
import type { Accent } from "./accents";

// Visual reference implementation of templates/adminlte-classic/specs/card.md.
// This is demo scaffolding only — a real project should regenerate this
// component from the spec, idiomatic to its own framework/stack, not
// copy this file. See ../../README.md and /AGENTS.md.

const accentClassMap: Record<Accent, string> = {
  primary: "border-l-brand-primary",
  secondary: "border-l-brand-secondary",
  success: "border-l-status-success",
  danger: "border-l-status-danger",
  warning: "border-l-status-warning",
  info: "border-l-status-info",
};

export interface CardProps {
  title?: ReactNode;
  /** Plain-text form of the title, used for toolbar accessible names. */
  titleText?: string;
  /** A status Badge shown beside the title. */
  headerBadge?: ReactNode;
  /** Component-specific toolbar controls — they sit at the LEADING end. */
  toolbarExtras?: ReactNode;
  /** Contextual actions for the card, behind an overflow trigger. */
  menuItems?: MenuItem[];
  collapsible?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  actions?: ReactNode;
  footer?: ReactNode;
  accent?: Accent;
  ribbon?: RibbonProps;
  clickableHref?: string;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  error?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  /** Removes the body's default padding — for a table or list body. */
  flushBody?: boolean;
  className?: string;
  children?: ReactNode;
}

function CardBody({
  children,
  busy,
  flush,
}: {
  children: ReactNode;
  busy?: boolean;
  flush?: boolean;
}) {
  return (
    <div className={flush ? "" : "p-card-padding"} aria-busy={busy || undefined}>
      {children}
    </div>
  );
}

export function Card(props: CardProps) {
  const {
    title,
    titleText,
    headerBadge,
    toolbarExtras,
    menuItems,
    collapsible,
    removable,
    onRemove,
    actions,
    footer,
    accent,
    ribbon,
    clickableHref,
    flushBody,
    className = "",
    children,
  } = props;

  const bodyId = useId();
  const menuId = useId();
  const [collapsed, setCollapsed] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Removed means unmounted, not hidden: a hidden-but-present card stays in
  // the accessibility tree and keeps being announced.
  if (removed) return null;

  const name = titleText ?? (typeof title === "string" ? title : "this card");
  const accentClasses = accent ? `border-l-4 ${accentClassMap[accent]}` : "";
  // overflow-hidden ONLY when a ribbon needs clipping: the card must not
  // clip its own header dropdown panel, which floats outside the header.
  const shell = `relative ${ribbon ? "overflow-hidden" : ""} bg-surface-canvas border border-surface-border rounded shadow-card ${accentClasses} ${
    clickableHref ? "transition-shadow duration-150 hover:shadow-raised" : ""
  } ${className}`;

  const hasToolbar =
    Boolean(toolbarExtras) || Boolean(menuItems?.length) || collapsible || removable;

  let body: ReactNode = children;
  if (props.loading) {
    body = (
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-1/3 rounded bg-neutral-light" />
        <div className="h-4 w-2/3 rounded bg-neutral-light" />
        <div className="h-4 w-1/2 rounded bg-neutral-light" />
      </div>
    );
  } else if (props.error) {
    body = (
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <p className="text-sm text-text-accent-danger">
          {props.errorMessage ?? "Something went wrong loading this card."}
        </p>
        {props.onRetry && (
          <button
            type="button"
            onClick={props.onRetry}
            className="text-sm font-medium text-text-accent-primary hover:underline"
          >
            Retry
          </button>
        )}
      </div>
    );
  } else if (props.empty) {
    body = (
      <p className="py-4 text-center text-sm text-text-secondary">
        {props.emptyMessage ?? "No items yet"}
      </p>
    );
  }

  const content = (
    <>
      {/* The ribbon's word is carried by the card's aria-label below; the
          banner itself is aria-hidden. */}
      {ribbon && <Ribbon {...ribbon} />}

      {title !== undefined && (
        <div className="flex items-center gap-2 border-b border-surface-border px-card-padding py-card-header-y">
          <h3 className="min-w-0 truncate text-lg font-medium text-text-primary">
            {title}
          </h3>
          {headerBadge}
          <div className="ml-auto flex shrink-0 items-center gap-1">
            {actions}
            {hasToolbar && (
              <>
                {/* Component-specific actions lead, so the generic controls
                    stay where the reader expects them on every card. */}
                {toolbarExtras}
                {menuItems && menuItems.length > 0 && (
                  <DropdownMenu
                    id={menuId}
                    align="end"
                    items={menuItems}
                    renderTrigger={(p) => (
                      <button
                        {...p}
                        type="button"
                        aria-label={`Actions for ${name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded text-text-secondary hover:bg-neutral-light hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                      >
                        <EllipsisVertical aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
                      </button>
                    )}
                  />
                )}
                {collapsible && (
                  <button
                    type="button"
                    // The name stays constant across states; aria-expanded
                    // carries the state.
                    aria-label={`Collapse ${name}`}
                    aria-expanded={!collapsed}
                    aria-controls={bodyId}
                    onClick={() => setCollapsed((c) => !c)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded text-text-secondary hover:bg-neutral-light hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  >
                    {collapsed ? (
                      <ChevronDown aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
                    ) : (
                      <ChevronUp aria-hidden strokeWidth={ICON_STROKE} className={iconSize.md} />
                    )}
                  </button>
                )}
                {removable && (
                  // Last, at the trailing end, away from collapse.
                  <IconButton
                    label={`Remove ${name}`}
                    icon={<X strokeWidth={ICON_STROKE} className={iconSize.md} />}
                    onClick={() => {
                      setRemoved(true);
                      onRemove?.();
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Collapsed content is unmounted: clipping it visually would leave
          its focusable contents reachable by Tab with nothing on screen. */}
      {!collapsed && (
        <div id={bodyId}>
          <CardBody busy={props.loading} flush={flushBody}>
            {body}
          </CardBody>
          {footer && (
            <div className="border-t border-surface-border px-card-padding py-card-header-y text-sm text-text-secondary">
              {footer}
            </div>
          )}
        </div>
      )}
    </>
  );

  if (clickableHref) {
    return (
      <a
        href={clickableHref}
        aria-label={ribbon ? `${name} (${ribbon.label})` : undefined}
        className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${shell}`}
      >
        {content}
      </a>
    );
  }

  return (
    <section
      aria-label={ribbon ? `${name} (${ribbon.label})` : undefined}
      className={shell}
    >
      {content}
    </section>
  );
}

export interface MetricCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  accent?: Accent;
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
        {icon && <div aria-hidden className="text-brand-primary">{icon}</div>}
      </div>
    </Card>
  );
}
