# Live Chat Widget — Build Plan

A floating chat widget on every page where visitors can message Warren about mortgages. Warren replies from a dedicated admin page. Each visit starts a fresh conversation (sessionStorage, no login required).

## How It Works

```text
Visitor (anon)                    Server (Lovable Cloud)           Warren (admin)
─────────────                     ────────────────────             ──────────────
Opens chat bubble          ──►    startChatSession()        ──►    Sees new session
Enters name/email/phone           ↓ inserts session + msg          in /live-chat
Sends a message            ──►    sendVisitorMessage()      ──►    Email notification
                                  ↓ inserts msg                    to warrenfactor@
Chat panel polls every 3s  ──►    pollChatMessages()
                                  ↓ returns new msgs       ◄──   Warren types reply
Sees Warren's reply ◄────────────────────────────────────────    (inserts via admin RLS)
```

## 1. Database Migration

Two new tables with GRANT + RLS:

**`chat_sessions`**
- `id` uuid PK, `session_token` uuid (random, validates anonymous access), `visitor_name` text, `visitor_email` text, `visitor_phone` text, `status` text default `'active'`, `created_at` timestamptz
- RLS: admins can SELECT/UPDATE all (via `has_role`); anon has no direct access (server functions handle it)

**`chat_messages`**
- `id` uuid PK, `session_id` uuid FK → chat_sessions, `sender` text (`'visitor'` | `'broker'`), `content` text, `created_at` timestamptz
- RLS: admins can SELECT/INSERT all; anon has no direct access

Both tables: `GRANT` to `authenticated` + `service_role`, `ENABLE ROW LEVEL SECURITY`, admin policies via `has_role(auth.uid(), 'admin')`.

## 2. Server Functions (`src/lib/chat.functions.ts`)

Uses `supabaseAdmin` (service role, bypasses RLS) loaded inside each handler with `await import`. The server function validates the `session_token` before any read/write — this is the security boundary since the visitor is anonymous.

- `startChatSession({ name, email, phone, firstMessage })` → creates session with random token, inserts first message, emails Warren via Web3Forms (reusing the existing access key), returns `{ sessionId, sessionToken }`
- `sendVisitorMessage({ sessionId, sessionToken, content })` → validates token, inserts message, returns success
- `pollChatMessages({ sessionId, sessionToken, afterId })` → validates token, returns messages with id > afterId (for incremental polling)
- `getActiveChatSessions()` → `.middleware([requireSupabaseAuth])` → returns active sessions with last message preview (admin only)

Warren's replies: inserted directly from the admin page via the authenticated `supabase` client (RLS allows admin INSERT on chat_messages).

## 3. Floating Chat Widget (`src/components/site/ChatWidget.tsx`)

Client-only component (uses `useEffect` for all browser logic — no SSR state):

- **Closed state**: gold chat bubble fixed bottom-right (`bottom-20 md:bottom-6 right-4` to clear the mobile CTA bar)
- **Open state**: panel (~360px wide, full height on mobile) with:
  - Header: "Chat with Warren" + close button
  - Intro form (shown first): name, email, phone — then unlocks chat
  - Message list: visitor messages right-aligned (gold bubble), Warren messages left-aligned (white/cream bubble)
  - Input box + send button at bottom
- **Session management**: sessionStorage stores `{ sessionId, sessionToken }`. Fresh each tab open.
- **Polling**: `setInterval` every 3 seconds calling `pollChatMessages` with the last seen message ID
- **Auto-scroll** to bottom on new messages

## 4. Mount in Root Layout (`src/routes/__root.tsx`)

Add `<ChatWidget />` as a sibling of `<Outlet />` inside `RootComponent` (outside the router outlet so it persists across page navigations). Wrapped in `<ClientOnly>` or guarded with `typeof window` check to avoid SSR issues.

## 5. Admin Live Chat Page (`src/routes/_authenticated/live-chat.tsx`)

Route: `/live-chat` (under the authenticated layout). Warren accesses this from the admin header.

- **Left panel**: list of active sessions (visitor name, last message preview, time ago, unread indicator). Polls every 5s for new sessions/messages.
- **Right panel**: selected session's full conversation + reply input box.
- **Reply**: inserts via `supabase.from("chat_messages").insert({ session_id, sender: "broker", content })` — RLS allows admin INSERT.
- Header link: "Blog Admin" | "Live Chat" | "Sign out"

## 6. Admin Header Update (`src/routes/_authenticated/admin.tsx`)

Add a "Live Chat" link in the admin header next to "View blog" so Warren can navigate between the two admin pages.

## Out of Scope

- No AI/chatbot — Warren responds manually
- No typing indicators or presence status
- No chat history across visits (sessionStorage clears on tab close)
- No realtime/WebSocket — polling is sufficient for a mortgage broker site
