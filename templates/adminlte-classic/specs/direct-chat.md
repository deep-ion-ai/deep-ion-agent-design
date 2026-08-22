# Component: Direct Chat

## Purpose

A self-contained conversation inside a card: a thread of messages
and a field to add to it. On a dashboard it is the widget that says
"someone is waiting for you" — a support conversation, a channel of
alerts a person replies to, an operator's line to a customer.

It is a *widget*, not a messaging application. It holds one
conversation at a time, in a card-sized space, alongside other
content. A product whose main job is messaging needs a page, where
the thread can own the viewport, search its own history, and handle
attachments — none of which this component specifies.

## Anatomy

1. **Card** (required) — the component is a Card
   (`specs/card.md`); its header, footer and states apply.
2. **Header** (required) — the conversation's name, an unread-count
   Badge (`specs/badge.md`), and the Card's header toolbar. The
   toolbar carries a component-specific control — the contacts-pane
   toggle — in the leading position `specs/card.md` reserves for
   exactly this, alongside the generic collapse and remove controls.
3. **Message list** (required) — the thread, oldest at the top,
   scrolling within the card body, anchored to the newest message.
4. **Message** (required, 0..n) — an avatar, an author name, a
   timestamp, and a bubble containing the text. Messages from the
   reader align to the trailing edge with a `brand.primary` bubble
   and `text.on-accent` text; messages from others align to the
   leading edge with a `neutral.light` bubble and `text.primary`
   text.
5. **Day divider** (optional) — a small centred label separating
   messages sent on different days.
6. **Contacts pane** (optional) — a list overlaying the message
   list, each entry an avatar, a name, a timestamp and a one-line
   preview of the last message, used to switch conversations.
7. **Composer** (required) — the card footer: a single-line input
   with a placeholder, and a send control. Submits on the send
   control or on Enter.

## Variants

- **With / without the contacts pane** — without it, the card shows
  one fixed conversation and the toolbar drops the toggle.
- **Read-only** — the thread without a composer, for a feed of
  messages the reader cannot answer. The composer is removed
  entirely rather than disabled: a permanently disabled input
  invites the reader to work out why.
- **Compact** — reduced bubble padding and a smaller avatar, for a
  card sharing a row with others.

## States

- **Empty thread** — a short message in the list area ("No messages
  yet") and an enabled composer. The composer stays: an empty thread
  is where a first message is most likely to be written.
- **Loading history** — skeleton bubbles in the list area at varied
  widths, with `aria-busy="true"` on the list.
- **Loading older messages** — when scrolling up loads more, the
  new messages are inserted **without moving the reader's current
  position**. A thread that jumps while older content loads above
  is unusable.
- **Sending** — the message appears in the thread immediately in a
  pending treatment (reduced opacity, no timestamp yet) and the
  composer clears. The input is not disabled while sending; a
  person typing the next message must not be interrupted.
- **Send failed** — the pending message stays in place, marked
  failed, with a retry control and its text still recoverable. A
  message that vanishes on failure loses what the person wrote,
  which is the worst outcome available here.
- **New message arrived** — the message is appended. If the reader
  is scrolled to the bottom, the view follows it; if they have
  scrolled up to read history, it does **not** — instead a "new
  messages" control appears, which scrolls down when pressed.
  Yanking the viewport away from what someone is reading is a
  common and avoidable failure.
- **Unread count** — the header Badge shows the number of unread
  messages, and disappears at zero, per `specs/badge.md`.
- **Contacts pane open / closed** — the pane slides over the message
  list; the toggle reflects its state.
- **Error** — the Card's error state, for a thread that fails to
  load.

## Accessibility rules

- **The message list is a live region** (`aria-live="polite"`,
  `aria-relevant="additions"`) so an arriving message is announced
  without stealing focus. Polite, never assertive: an assertive
  region interrupts whatever the reader is doing on every message.
- **Only additions are announced.** A live region that re-announces
  the whole thread whenever anything changes is worse than none.
- **The list is a list**, one item per message, so its size and
  position are announced and a reader can move through it item by
  item.
- **Each message is announced as one unit** — author, time and text
  together. Three separate fragments per message make a thread
  incomprehensible aloud. The timestamp is a `<time>` with a full
  machine-readable value, and its visible text may be relative
  ("5 min ago") while its accessible form is absolute.
- **The composer needs a real label.** It has no visible one, so a
  visually-hidden `<label>` or an `aria-label` naming the
  conversation ("Message Jane Cooper"). Placeholder text is not a
  label — it disappears at the first keystroke.
- **Enter sends and Shift+Enter inserts a line break**, where the
  composer accepts multiple lines. Whichever binding is chosen must
  be discoverable: a hint beside the composer, not folklore.
- **The send control is a real `<button>`** with an accessible name,
  and remains operable by keyboard even when Enter also sends —
  Enter-only sending is unreachable for readers using assistive tech
  that intercepts it.
- **Avatars are decorative** when the author's name is beside them:
  `alt=""`, so the name is not announced twice. An avatar that is
  the *only* identification of an author needs the name as its
  alternative text.
- **A failed send must be announced**, not only marked visually —
  its status belongs in the live region.
- **Contacts-pane entries are real controls** (`<button>` or `<a>`),
  each with an accessible name including the contact and, where
  shown, the unread state. A preview line alone is not a name.
- **The unread badge follows `specs/badge.md`**: the header's
  accessible name carries the count, or the badge carries hidden
  text — never both.
- **Bubble contrast**: own messages use `text.on-accent` on
  `brand.primary` (4.50:1 — clears AA, fails AAA, so do not tint the
  bubble); others use `text.primary` on `neutral.light`. Alignment
  and colour together indicate the author, but neither replaces the
  author's name, which is required on every message or, at minimum,
  on the first of each consecutive run by one author.
- **Timestamps must not be the only separator** between messages
  sent far apart; the day divider carries that, and is announced.

## Composition rules

- **Glyphs**: every icon this spec names is drawn from the icon set
  defined in `foundations/iconography.md` — never an emoji or a
  Unicode character — and sized from the scale there.
- **Images**: avatars and other imagery follow
  `foundations/imagery.md`, including the required initials fallback.
- **Is a**: Card, with a scrolling body and a composer in the
  footer.
- **May contain**: messages, day dividers, a contacts pane, and a
  composer. Message text may include links.
- **Must not contain**: attachments, message-level action menus,
  rich text editing, threading within the thread, or a second
  conversation shown at the same time. Each of those is the point at
  which the product needs a messaging page rather than a widget.
- **Uses**: `specs/card.md` (container, header toolbar),
  `specs/badge.md` (unread count), `specs/button.md` (send control,
  toolbar controls), `specs/dropdown-menu.md` (card toolbar menu).
- **Placement**: in the content region of `patterns/app-shell.md`,
  typically in a column beside wider content rather than spanning
  the full width — a very wide chat card leaves message bubbles
  stranded across a long line.
- **Height**: fixed, so the card does not grow with the
  conversation. The message list scrolls inside it; the card does
  not.
- **Standalone**: it composes with nothing else. It does not nest
  inside another widget and nothing nests inside it.

## Tokens used

| Token | Usage |
|---|---|
| `color.brand.primary` | own-message bubble fill |
| `color.text.on-accent` | own-message text |
| `color.neutral.light` | other-message bubble fill, contacts-pane hover |
| `color.text.primary` | other-message text, author names |
| `color.text.secondary` | timestamps, day dividers, preview lines, placeholder |
| `color.status.danger` | failed-send marker |
| `color.surface.canvas` | card and contacts-pane background |
| `color.surface.border` | composer divider, contacts-pane separators |
| `radius.base` | message bubbles |
| `radius.pill` | avatars, send control |
| `spacing.2` | bubble padding, gap between messages |
| `spacing.3` | composer padding |
| `font.size.sm` | message text, composer text |
| `font.size.xs` | timestamps, day dividers |
| `font.weight.medium` | author names |
| (card anatomy) | see `specs/card.md` |

## Reference visual description

A white card of fixed height headed "Support chat", with a small red
circle carrying a "3" beside the title and three faint glyphs at the
header's right end. Its body is a column of message bubbles: on the
left, gray rounded rectangles each preceded by a small circular
photograph, with a name and a faint time above them; on the right,
blue rectangles with white text and no photograph. Between two runs
of them, a small centred gray word: "Yesterday". The column is
scrolled to its foot. Across the bottom of the card, separated by a
hairline, a single-line field reading "Type a message" with a small
round blue send button at its right end.
