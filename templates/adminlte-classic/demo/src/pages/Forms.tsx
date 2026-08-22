import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextInput, PasswordInput, Textarea } from "../components/TextInput";
import { NativeSelect, MultiSelect } from "../components/Select";
import { Checkbox, RadioGroup, Switch } from "../components/CheckboxRadioSwitch";
import { InputGroup } from "../components/InputGroup";
import { RangeSlider, ColorPicker, FileInput } from "../components/SpecializedInputs";
import { Search, Copy, ICON_STROKE, iconSize } from "../components/icons";

// Renders every component from the Forms primitive set (#64), each from its
// own merged spec. Demo scaffolding only — see ../../README.md and /AGENTS.md.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-grid-gap">
      <Card title={title} titleText={title.toLowerCase()} collapsible>
        {children}
      </Card>
    </section>
  );
}

const PLANS = [
  { value: "starter", label: "Starter" },
  { value: "growth", label: "Growth" },
  { value: "scale", label: "Scale" },
];

const TEAM = [
  { value: "ava", label: "Ava Torres" },
  { value: "liam", label: "Liam Chen" },
  { value: "sofia", label: "Sofia Rossi" },
  { value: "noah", label: "Noah Müller" },
];

export function Forms() {
  const [plan, setPlan] = useState("growth");
  const [reviewers, setReviewers] = useState<string[]>(["ava"]);
  const [selectAll, setSelectAll] = useState<boolean | "indeterminate">("indeterminate");
  const [frequency, setFrequency] = useState("weekly");
  const [notify, setNotify] = useState(true);
  const [volume, setVolume] = useState(67);
  const [color, setColor] = useState("#0d6efd");
  const [username, setUsername] = useState("");

  return (
    <>
      <Section title="Text input & textarea">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText="Letters, numbers and underscores only."
            state={username.length > 0 && username.length < 3 ? "invalid" : username.length >= 3 ? "valid" : "default"}
            message={
              username.length > 0 && username.length < 3
                ? "Must be at least 3 characters."
                : username.length >= 3
                  ? "Looks good!"
                  : undefined
            }
            required
          />
          <PasswordInput label="Password" autoComplete="new-password" />
          <TextInput label="Email address" type="email" autoComplete="email" placeholder="you@example.com" />
          <TextInput label="Read-only reference" value="INV-2026-0842" readOnly />
          <TextInput label="Disabled field" value="Locked by your plan" disabled />
          <div className="sm:col-span-2">
            <Textarea label="Notes" helperText="Visible to your team only." rows={3} />
          </div>
        </div>
      </Section>

      <Section title="Select">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NativeSelect label="Plan" options={PLANS} value={plan} onChange={setPlan} required />
          <MultiSelect label="Reviewers" options={TEAM} value={reviewers} onChange={setReviewers} />
        </div>
      </Section>

      <Section title="Checkbox, radio & switch">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Checkbox
              label="Select all"
              checked={selectAll === true}
              indeterminate={selectAll === "indeterminate"}
              onChange={(e) => setSelectAll(e.target.checked)}
            />
            <p className="pl-6 text-xs text-text-secondary">
              Indeterminate is set via the DOM property — see specs/checkbox-radio-switch.md.
            </p>
          </div>
          <RadioGroup
            legend="Notification frequency"
            name="frequency"
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "never", label: "Never" },
            ]}
            value={frequency}
            onChange={setFrequency}
          />
          <Switch label="Email notifications" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
        </div>
      </Section>

      <Section title="Input group">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="website" className="mb-1 block text-sm font-medium text-text-primary">
              Website
            </label>
            <InputGroup leading="https://">
              <TextInput id="website" label="Website" bare placeholder="example.com" />
            </InputGroup>
          </div>
          <div>
            <label htmlFor="search-contacts" className="mb-1 block text-sm font-medium text-text-primary">
              Search contacts
            </label>
            <InputGroup leading={<Search strokeWidth={ICON_STROKE} className={iconSize.sm} />}>
              <TextInput id="search-contacts" label="Search contacts" bare placeholder="Search…" />
            </InputGroup>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="invite-link" className="mb-1 block text-sm font-medium text-text-primary">
              Invite link
            </label>
            <InputGroup
              trailing={
                <Button size="sm" emphasis="link" leadingIcon={<Copy strokeWidth={ICON_STROKE} className={iconSize.sm} />}>
                  Copy
                </Button>
              }
            >
              <TextInput
                id="invite-link"
                label="Invite link"
                bare
                value="https://app.example.com/invite/8f2a1c"
                readOnly
              />
            </InputGroup>
          </div>
        </div>
      </Section>

      <Section title="Specialized inputs">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <RangeSlider label="Volume" min={0} max={100} value={volume} onChange={setVolume} valueText={`${volume} percent`} />
          <ColorPicker label="Accent colour" value={color} onChange={setColor} />
          <FileInput label="Attachment" />
        </div>
      </Section>
    </>
  );
}
