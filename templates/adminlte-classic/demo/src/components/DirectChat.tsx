import { useRef, useState, type FormEvent } from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { IconButton, Button } from "./Button";
import { focusRing } from "./accents";

// Visual reference implementation of specs/direct-chat.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface ChatMessage {
  id: string;
  author: string;
  own?: boolean;
  dateTime: string;
  timeLabel: string;
  text: string;
  status?: "pending" | "failed";
}

export interface ChatContact {
  id: string;
  name: string;
  timeLabel: string;
  preview: string;
  unread?: number;
}

export interface DirectChatProps {
  title: string;
  messages: ChatMessage[];
  contacts?: ChatContact[];
  unreadCount?: number;
  onSend?: (text: string) => void;
  readOnly?: boolean;
}

export function DirectChat({
  title,
  messages,
  contacts = [],
  unreadCount = 0,
  onSend,
  readOnly,
}: DirectChatProps) {
  const [draft, setDraft] = useState("");
  const [paneOpen, setPaneOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend?.(draft.trim());
    // The composer clears but is never disabled: someone typing the next
    // message must not be interrupted.
    setDraft("");
  }

  return (
    <Card
      title={title}
      titleText={title}
      headerBadge={
        unreadCount > 0 ? (
          <Badge accent="danger" shape="pill">
            {unreadCount} unread
          </Badge>
        ) : undefined
      }
      // A component-specific control, at the LEADING end of the toolbar.
      toolbarExtras={
        contacts.length > 0 ? (
          <IconButton
            label={`${paneOpen ? "Hide" : "Show"} contacts for ${title}`}
            icon="👥"
            aria-expanded={paneOpen}
            onClick={() => setPaneOpen((p) => !p)}
          />
        ) : undefined
      }
      collapsible
      removable
      flushBody
      footer={
        readOnly ? undefined : (
          <form onSubmit={submit} className="flex items-center gap-2">
            <label htmlFor="chat-composer" className="sr-only">
              Message {title}
            </label>
            <input
              id="chat-composer"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message"
              className={`flex-1 rounded border border-surface-border px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary ${focusRing}`}
            />
            {/* A real button, operable by keyboard even though Enter also sends. */}
            <Button type="submit" size="sm" aria-label={`Send message to ${title}`}>
              Send
            </Button>
          </form>
        )
      }
    >
      <div className="relative h-72">
        <ol
          ref={listRef}
          // Polite and additions-only: assertive would interrupt on every
          // message, and re-announcing the thread is worse than nothing.
          aria-live="polite"
          aria-relevant="additions"
          className="m-0 h-full list-none space-y-4 overflow-y-auto p-card-padding"
        >
          {messages.length === 0 && (
            <li className="text-center text-sm text-text-secondary">No messages yet</li>
          )}
          {messages.map((m) => (
            <li key={m.id} className={m.own ? "flex flex-col items-end" : "flex flex-col items-start"}>
              {/* Announced as one unit: author, time and text together. */}
              <p className="mb-1 text-xs text-text-secondary">
                {m.author} ·{" "}
                <time dateTime={m.dateTime}>{m.timeLabel}</time>
                {m.status === "pending" && " · sending"}
                {m.status === "failed" && " · not sent"}
              </p>
              <p
                className={`max-w-[80%] rounded px-2 py-2 text-sm ${
                  m.own
                    ? "bg-brand-primary text-text-on-accent"
                    : "bg-neutral-light text-text-primary"
                } ${m.status === "pending" ? "opacity-60" : ""}`}
              >
                {m.text}
              </p>
              {m.status === "failed" && (
                // The text stays recoverable: a message that vanishes on
                // failure loses what the person wrote.
                <p className="mt-1 text-xs text-text-accent-danger">
                  Couldn’t send.{" "}
                  <button type="button" className="font-medium underline">
                    Retry
                  </button>
                </p>
              )}
            </li>
          ))}
        </ol>

        {paneOpen && contacts.length > 0 && (
          <div className="absolute inset-0 overflow-y-auto border-l border-surface-border bg-surface-canvas">
            <ul className="m-0 list-none divide-y divide-surface-border p-0">
              {contacts.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-label={`${c.name}${c.unread ? `, ${c.unread} unread` : ""}`}
                    className={`flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-neutral-light ${focusRing}`}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-neutral-light text-xs"
                    >
                      {c.name.slice(0, 2)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-text-primary">{c.name}</span>
                      <span className="block truncate text-xs text-text-secondary">
                        {c.preview}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-text-secondary">{c.timeLabel}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
