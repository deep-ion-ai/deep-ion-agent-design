import {
  Archive,
  Check,
  ChevronDown,
  Copy,
  CreditCard,
  Info,
  KeyRound,
  Pencil,
  RefreshCw,
  Trash2,
  TriangleAlert,
  UserRound,
  Users,
  ICON_STROKE,
  iconSize,
} from "../components/icons";
import { useRef, useState } from "react";
import { Card } from "../components/Card";
import { Button, ButtonGroup, IconButton, ToggleGroup } from "../components/Button";
import { Badge } from "../components/Badge";
import { Alert, DismissibleAlert } from "../components/Alert";
import { DropdownMenu } from "../components/DropdownMenu";
import { Modal } from "../components/Modal";
import { Offcanvas } from "../components/Offcanvas";
import { Accordion, Collapse, Tabs } from "../components/Disclosure";
import { ListGroup, NavListGroup, SelectListGroup } from "../components/ListGroup";
import { Timeline } from "../components/Timeline";
import { Pagination } from "../components/Pagination";
import { ProgressBar, ProgressBarInline } from "../components/ProgressBar";
import { Tooltip } from "../components/Tooltip";
import { ACCENTS } from "../components/accents";

// A gallery of the primitive components, so the demo shows what the
// template's specs describe. Demo scaffolding only — see /AGENTS.md.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-grid-gap">
      <Card title={title} titleText={title.toLowerCase()} collapsible>
        {children}
      </Card>
    </section>
  );
}

export function UiElements() {
  const [modalOpen, setModalOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [selected, setSelected] = useState("weekly");
  const [page, setPage] = useState(3);
  const [busy, setBusy] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Section title="Buttons">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {ACCENTS.map((a) => (
              <Button key={a} accent={a}>
                {a}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ACCENTS.map((a) => (
              <Button key={a} accent={a} emphasis="outline">
                {a}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="lg">Large</Button>
            <Button>Default</Button>
            <Button size="sm">Small</Button>
            <Button disabled>Disabled</Button>
            <Button
              loading={busy}
              onClick={() => {
                setBusy(true);
                window.setTimeout(() => setBusy(false), 1800);
              }}
            >
              Save changes
            </Button>
            <Button emphasis="link" accent="secondary">
              Cancel
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonGroup label="Record actions">
              <Button emphasis="outline" accent="secondary">
                Edit
              </Button>
              <Button emphasis="outline" accent="secondary">
                Duplicate
              </Button>
              <Button emphasis="outline" accent="secondary">
                Archive
              </Button>
            </ButtonGroup>

            <ToggleGroup
              label="Table density"
              value={density}
              onChange={setDensity}
              options={[
                { value: "comfortable", label: "Comfortable" },
                { value: "compact", label: "Compact" },
              ]}
            />

            {/* The tooltip's text matches the icon-only button's aria-label —
                a sighted mouse user gets the same information a screen
                reader already has, per specs/tooltip.md's composition rule. */}
            <Tooltip text="Delete order #1029">
              <IconButton
                label="Delete order #1029"
                icon={<Trash2 strokeWidth={ICON_STROKE} className={iconSize.md} />}
              />
            </Tooltip>
          </div>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((a) => (
            <Badge key={a} accent={a}>
              {a}
            </Badge>
          ))}
          <Badge accent="success" shape="pill">
            Active
          </Badge>
          <Badge accent="warning" subtle shape="pill">
            Pending
          </Badge>
          <Badge accent="neutral" subtle shape="pill">
            Inactive
          </Badge>
        </div>
      </Section>

      <Section title="Alerts">
        <div className="space-y-3">
          <Alert severity="success" title="Settings saved" liveness="status" onDismiss={() => {}}>
            Your changes are live.
          </Alert>
          <Alert
            severity="danger"
            title="Import failed"
            liveness="alert"
            action={
              // On a tinted wash the colour cannot carry the link —
              // text.link measures 3.79:1 there — so the underline does.
              <a href="#retry" className="font-medium text-text-primary underline">
                Retry import
              </a>
            }
          >
            Three rows could not be read.
          </Alert>
          <DismissibleAlert severity="warning">
            Your trial ends in four days.
          </DismissibleAlert>
          <Alert severity="info">Nightly imports run at 02:00 UTC.</Alert>
        </div>
      </Section>

      <Section title="Dropdown menu">
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu
            id="demo-menu"
            items={[
              {
                id: "edit",
                label: "Edit order",
                icon: <Pencil strokeWidth={ICON_STROKE} className={iconSize.sm} />,
              },
              {
                id: "dup",
                label: "Duplicate",
                icon: <Copy strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                hint: "⌘D",
              },
              {
                id: "archive",
                label: "Archive",
                icon: <Archive strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                disabled: true,
              },
              {
                id: "delete",
                label: "Delete order #1029",
                icon: <Trash2 strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                destructive: true,
              },
            ]}
            renderTrigger={(p) => (
              <button
                {...p}
                type="button"
                className="inline-flex items-center gap-2 rounded border border-surface-border bg-surface-canvas px-4 py-2 text-sm font-medium text-text-primary hover:bg-neutral-light"
              >
                Order actions
                <ChevronDown aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
              </button>
            )}
          />
          <p className="text-sm text-text-secondary">
            Arrow keys move between items, Escape closes, focus returns to the trigger.
          </p>
        </div>
      </Section>

      <Section title="Overlays">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button emphasis="outline" onClick={() => setPanelOpen(true)}>
            Open filter panel
          </Button>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete order #1029?"
          initialFocusRef={cancelRef}
          footer={
            <>
              <Button
                ref={cancelRef}
                emphasis="outline"
                accent="secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button accent="danger" onClick={() => setModalOpen(false)}>
                Delete order
              </Button>
            </>
          }
        >
          This removes the order and its payment record. It cannot be undone.
        </Modal>

        <Offcanvas
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          title="Filter orders"
          footer={
            <>
              <Button emphasis="outline" accent="secondary" onClick={() => setPanelOpen(false)}>
                Reset
              </Button>
              <Button onClick={() => setPanelOpen(false)}>Apply filters</Button>
            </>
          }
        >
          <SelectListGroup
            label="Period"
            value={selected}
            onChange={setSelected}
            items={[
              { id: "daily", primary: "Today" },
              { id: "weekly", primary: "This week" },
              { id: "monthly", primary: "This month" },
            ]}
          />
        </Offcanvas>
      </Section>

      <Section title="Disclosure">
        <div className="space-y-6">
          <Tabs
            label="Order details"
            items={[
              { id: "details", label: "Details", content: <p>Order placed 21 August 2026.</p> },
              {
                id: "comments",
                label: "Comments",
                badgeText: "4",
                badge: <Badge accent="secondary" shape="pill">4</Badge>,
                content: <p>Four comments on this order.</p>,
              },
              { id: "history", label: "History", content: <p>Six events recorded.</p> },
            ]}
          />

          <Tabs
            label="Report period"
            appearance="pills"
            items={[
              { id: "d", label: "Day", content: <p>Daily figures.</p> },
              { id: "w", label: "Week", content: <p>Weekly figures.</p> },
              { id: "m", label: "Month", content: <p>Monthly figures.</p> },
            ]}
          />

          <Accordion
            defaultOpenIds={["shipping"]}
            sections={[
              { id: "shipping", title: "Shipping", content: <p>Ships in 2–3 working days.</p> },
              { id: "returns", title: "Returns", content: <p>30 days, unused items only.</p> },
              { id: "support", title: "Support", content: <p>Weekdays, 09:00–18:00.</p> },
            ]}
          />

          <Collapse label="Advanced options">
            <p>Nothing here needs changing in most cases.</p>
          </Collapse>
        </div>
      </Section>

      <Section title="Lists">
        <div className="grid grid-cols-1 gap-grid-gap md:grid-cols-3">
          <div>
            <p className="mb-2 text-sm font-medium text-text-primary">Static</p>
            <ListGroup
              items={[
                {
                  id: "1",
                  primary: "Plan",
                  secondary: "Business",
                  leading: <CreditCard strokeWidth={ICON_STROKE} className={iconSize.md} />,
                },
                {
                  id: "2",
                  primary: "Seats",
                  secondary: "12 of 20 used",
                  leading: <Users strokeWidth={ICON_STROKE} className={iconSize.md} />,
                },
                {
                  id: "3",
                  primary: "Renews",
                  secondary: "1 September 2026",
                  leading: <RefreshCw strokeWidth={ICON_STROKE} className={iconSize.md} />,
                },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-text-primary">Navigational</p>
            <NavListGroup
              navLabel="Settings sections"
              currentId="billing"
              items={[
                {
                  id: "profile",
                  primary: "Profile",
                  leading: <UserRound strokeWidth={ICON_STROKE} className={iconSize.md} />,
                },
                {
                  id: "billing",
                  primary: "Billing",
                  leading: <CreditCard strokeWidth={ICON_STROKE} className={iconSize.md} />,
                  trailing: <Badge accent="danger" shape="pill">3</Badge>,
                },
                {
                  id: "api",
                  primary: "API keys",
                  leading: <KeyRound strokeWidth={ICON_STROKE} className={iconSize.md} />,
                  disabled: true,
                },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-text-primary">Selectable</p>
            <SelectListGroup
              label="Report period"
              value={selected}
              onChange={setSelected}
              items={[
                { id: "daily", primary: "Daily" },
                { id: "weekly", primary: "Weekly" },
                { id: "monthly", primary: "Monthly" },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title="Timeline">
        <Timeline
          direction="oldest-first"
          label="Order history"
          groups={[
            {
              id: "d1",
              label: "20 August",
              entries: [
                {
                  id: "e1",
                  dateTime: "2026-08-20T09:02",
                  timeLabel: "09:02",
                  accent: "info",
                  glyph: <Info strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                  heading: "Order placed",
                  body: "Paid by card ending 4242.",
                },
                {
                  id: "e2",
                  dateTime: "2026-08-20T14:31",
                  timeLabel: "14:31",
                  accent: "warning",
                  glyph: <TriangleAlert strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                  heading: "Address needs confirming",
                  body: "The courier could not match the postcode.",
                  actions: (
                    <Button size="sm" emphasis="outline">
                      Confirm address for order #1029
                    </Button>
                  ),
                },
              ],
            },
            {
              id: "d2",
              label: "21 August",
              entries: [
                {
                  id: "e3",
                  dateTime: "2026-08-21T09:41",
                  timeLabel: "09:41",
                  accent: "success",
                  glyph: <Check strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                  heading: "Shipped",
                },
              ],
            },
          ]}
        />
      </Section>

      <Section title="Pagination">
        <div className="space-y-4">
          <Pagination
            page={page}
            pageCount={24}
            onPageChange={setPage}
            totalCount={192}
            pageSize={8}
            label="Example pagination"
          />
          <Pagination
            page={page}
            pageCount={24}
            onPageChange={setPage}
            variant="compact"
            label="Example compact pagination"
          />
        </div>
      </Section>

      <Section title="Progress bar">
        <div className="max-w-md space-y-4">
          <ProgressBar label="Photo upload" value={68} />
          <ProgressBar label="Storage used" value={92} accent="danger" />
          <div className="max-w-xs">
            <ProgressBarInline label="Profile completeness" value={40} accent="info" />
          </div>
          <ProgressBar label="Preparing report" indeterminate statusText="Preparing report…" />
          <div>
            <p className="mb-1 text-sm font-medium text-text-primary">Onboarding, step 2 of 4</p>
            <ProgressBar label="Onboarding progress" value={50} segments={4} showLabel={false} accent="success" />
          </div>
        </div>
      </Section>

      <Section title="Tooltip">
        <div className="flex flex-wrap items-center gap-8 py-6">
          <Tooltip text="Opens above the trigger" placement="top">
            <Button emphasis="outline" accent="secondary">Top</Button>
          </Tooltip>
          <Tooltip text="Opens below the trigger" placement="bottom">
            <Button emphasis="outline" accent="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip text="Opens to the left" placement="left">
            <Button emphasis="outline" accent="secondary">Left</Button>
          </Tooltip>
          <Tooltip text="Opens to the right" placement="right">
            <Button emphasis="outline" accent="secondary">Right</Button>
          </Tooltip>
        </div>
        <p className="text-sm text-text-secondary">
          Hover shows after a short delay; keyboard focus shows immediately. Escape dismisses without leaving the trigger.
        </p>
      </Section>

      <Section title="Ribbons">
        <div className="grid grid-cols-1 gap-grid-gap sm:grid-cols-3">
          <Card
            title="Quarterly report"
            titleText="Quarterly report"
            ribbon={{ label: "Draft", accent: "warning" }}
          >
            <p className="text-sm text-text-secondary">
              The card is named “Quarterly report (Draft)”.
            </p>
          </Card>
          <Card title="Payouts" titleText="Payouts" ribbon={{ label: "New" }}>
            <p className="text-sm text-text-secondary">Top-start corner, default size.</p>
          </Card>
          <Card
            title="Forecasting"
            titleText="Forecasting"
            ribbon={{ label: "Beta", accent: "info", corner: "top-start" }}
            menuItems={[
              {
                id: "refresh",
                label: "Refresh forecast",
                icon: <RefreshCw strokeWidth={ICON_STROKE} className={iconSize.sm} />,
              },
              {
                id: "edit",
                label: "Edit assumptions",
                icon: <Pencil strokeWidth={ICON_STROKE} className={iconSize.sm} />,
              },
            ]}
          >
            <p className="text-sm text-text-secondary">
              A ribbon and a header overflow menu, together on one card —
              the ribbon clips its own corner box now, so the menu panel
              still opens unclipped instead of the whole card hiding it.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Page patterns">
        <p className="mb-3 text-sm text-text-secondary">
          Two page-composition patterns render outside this shell entirely —
          see <code>patterns/auth.md</code> and <code>patterns/error-page.md</code>.
          Sign out (account menu, top right) reaches the Auth pattern; these
          links reach the Error page pattern's two variants.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            emphasis="outline"
            accent="secondary"
            onClick={() => {
              window.location.hash = "#error/404";
            }}
          >
            View 404 page
          </Button>
          <Button
            emphasis="outline"
            accent="secondary"
            onClick={() => {
              window.location.hash = "#error/500";
            }}
          >
            View 500 page
          </Button>
        </div>
      </Section>
    </>
  );
}
