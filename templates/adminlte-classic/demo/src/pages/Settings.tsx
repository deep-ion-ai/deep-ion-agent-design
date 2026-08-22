import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { NavListGroup } from "../components/ListGroup";
import { TextInput } from "../components/TextInput";
import { NativeSelect } from "../components/Select";
import { Switch } from "../components/CheckboxRadioSwitch";

// Visual reference implementation of patterns/settings.md. Renders inside
// AppShell, like Profile.tsx. Demo scaffolding only — see ../../README.md
// and /AGENTS.md.

const SECTIONS = [
  { id: "settings-profile", primary: "Profile" },
  { id: "settings-notifications", primary: "Notifications" },
  { id: "settings-security", primary: "Security" },
];

/** One settings group: its own form, its own Save button, its own
 *  save-confirmation — never a page-wide form with a single save button.
 *  See patterns/settings.md's Composition rules. */
function SettingsCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Card
      title={title}
      titleText={title}
      footer={
        <div className="flex items-center justify-between">
          {/* Announced near the Card it applies to, not as a page-level
              interruption — patterns/settings.md's Accessibility rules. */}
          <span role="status" className="text-sm text-text-accent-success">
            {saved ? `${title} saved.` : ""}
          </span>
          <Button type="submit" form={id} size="sm">
            Save changes
          </Button>
        </div>
      }
    >
      <form id={id} onSubmit={handleSave} className="space-y-4">
        {children}
      </form>
    </Card>
  );
}

export function Settings() {
  const [current, setCurrent] = useState("settings-profile");
  const [displayName, setDisplayName] = useState("Jane Cooper");
  const [timezone, setTimezone] = useState("europe-lisbon");
  const [productEmails, setProductEmails] = useState(true);
  const [securityEmails, setSecurityEmails] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      {/* A click-driven proxy for "current" rather than real scroll-spy —
          the same kind of simplification DropdownMenu.tsx's static
          placement makes elsewhere in this demo. */}
      <div
        className="shrink-0 md:w-48"
        onClick={(e) => {
          const link = (e.target as HTMLElement).closest("a[href^='#']");
          if (link) setCurrent(link.getAttribute("href")!.slice(1));
        }}
      >
        <NavListGroup
          navLabel="Settings sections"
          currentId={current}
          items={SECTIONS.map((s) => ({ ...s, href: `#${s.id}` }))}
        />
      </div>

      <div className="min-w-0 flex-1 space-y-6">
        <div id="settings-profile">
          <SettingsCard id="settings-profile-form" title="Profile">
            <TextInput
              label="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <NativeSelect
              label="Time zone"
              value={timezone}
              onChange={setTimezone}
              options={[
                { value: "europe-lisbon", label: "Europe/Lisbon (WEST)" },
                { value: "america-new_york", label: "America/New_York (EDT)" },
                { value: "asia-tokyo", label: "Asia/Tokyo (JST)" },
              ]}
            />
          </SettingsCard>
        </div>

        <div id="settings-notifications">
          <SettingsCard id="settings-notifications-form" title="Notifications">
            <div className="flex flex-col gap-3">
              <Switch
                label="Product email updates"
                checked={productEmails}
                onChange={(e) => setProductEmails(e.target.checked)}
              />
              <Switch
                label="Security alerts"
                checked={securityEmails}
                onChange={(e) => setSecurityEmails(e.target.checked)}
              />
              <Switch
                label="Weekly digest"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
              />
            </div>
          </SettingsCard>
        </div>

        <div id="settings-security">
          <SettingsCard id="settings-security-form" title="Security">
            <TextInput label="Email address" type="email" defaultValue="jane.cooper@example.com" />
            <Switch label="Require a second step when signing in" defaultChecked />
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}
