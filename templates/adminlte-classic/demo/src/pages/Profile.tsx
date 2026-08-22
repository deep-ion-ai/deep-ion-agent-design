import { Check, LogIn, Pencil, ShieldCheck, UserPlus, ICON_STROKE, iconSize } from "../components/icons";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ListGroup } from "../components/ListGroup";
import { Tabs } from "../components/Disclosure";
import { Timeline } from "../components/Timeline";

// Visual reference implementation of patterns/profile.md. Renders inside
// AppShell, unlike Auth/ErrorPage — this page assumes the same signed-in
// identity the shell does. Demo scaffolding only — see ../../README.md
// and /AGENTS.md.

export function Profile({ onEditProfile }: { onEditProfile: () => void }) {
  return (
    <>
      {/* Identity header: deliberately NOT a Card — see
          patterns/profile.md's Composition rules for why. */}
      <div className="mb-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        {/* Decorative: the name is already visible in text beside it —
            foundations/imagery.md's rule for an avatar paired with a
            visible name. */}
        <Avatar name="Jane Cooper" size="lg" />
        <div className="min-w-0 flex-1">
          <h2 className="text-h2 font-semibold text-text-primary">Jane Cooper</h2>
          <p className="text-sm text-text-secondary">Product Manager, Growth team</p>
        </div>
        <Button
          emphasis="outline"
          accent="secondary"
          leadingIcon={<Pencil aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />}
          onClick={onEditProfile}
        >
          Edit profile
        </Button>
      </div>

      <Tabs
        label="Profile sections"
        items={[
          {
            id: "about",
            label: "About",
            content: (
              <Card title="Details" titleText="Details">
                <ListGroup
                  bordered={false}
                  items={[
                    { id: "email", primary: "Email", secondary: "jane.cooper@example.com" },
                    { id: "dept", primary: "Department", secondary: "Growth" },
                    { id: "location", primary: "Location", secondary: "Lisbon, Portugal" },
                    { id: "joined", primary: "Joined", secondary: "14 March 2023" },
                  ]}
                />
              </Card>
            ),
          },
          {
            id: "activity",
            label: "Activity",
            content: (
              <Card title="Recent activity" titleText="Recent activity">
                <Timeline
                  direction="newest-first"
                  label="Jane Cooper's recent activity"
                  groups={[
                    {
                      id: "d1",
                      label: "This week",
                      entries: [
                        {
                          id: "e1",
                          dateTime: "2026-08-21T09:41",
                          timeLabel: "Friday, 09:41",
                          accent: "success",
                          glyph: <Check strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                          heading: "Approved order #1021 for shipping",
                        },
                        {
                          id: "e2",
                          dateTime: "2026-08-19T14:02",
                          timeLabel: "Wednesday, 14:02",
                          accent: "info",
                          glyph: <UserPlus strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                          heading: "Invited Yusuf Demir to the Growth team",
                        },
                      ],
                    },
                    {
                      id: "d2",
                      label: "Last week",
                      entries: [
                        {
                          id: "e3",
                          dateTime: "2026-08-14T11:15",
                          timeLabel: "Friday, 11:15",
                          accent: "secondary",
                          glyph: <ShieldCheck strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                          heading: "Turned on two-factor authentication",
                        },
                        {
                          id: "e4",
                          dateTime: "2026-08-11T08:30",
                          timeLabel: "Tuesday, 08:30",
                          accent: "secondary",
                          glyph: <LogIn strokeWidth={ICON_STROKE} className={iconSize.sm} />,
                          heading: "Signed in from a new device",
                        },
                      ],
                    },
                  ]}
                />
              </Card>
            ),
          },
        ]}
      />
    </>
  );
}
