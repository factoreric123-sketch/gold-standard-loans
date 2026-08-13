import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/live-chat")({
  head: () => ({
    meta: [
      { title: `Live Chat | ${COMPANY_NAME}` },
      { name: "description", content: "Manage live chat conversations with visitors." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Live Chat | ${COMPANY_NAME}` },
      { property: "og:description", content: "Manage live chat conversations with visitors." },
    ],
  }),
  component: LiveChatPage,
});

type ChatSession = {
  id: string;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_phone: string | null;
  status: string;
  created_at: string;
};

type ChatMessage = {
  id: string;
  sender: "visitor" | "broker";
  content: string;
  created_at: string;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function LiveChatPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (active) setIsAdmin(Boolean(data));
    })();
    return () => {
      active = false;
    };
  }, []);

  const sessionsQuery = useQuery({
    queryKey: ["chat-sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select(
          "id, visitor_name, visitor_email, visitor_phone, status, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as ChatSession[];
    },
    refetchInterval: 5000,
  });

  const messagesQuery = useQuery({
    queryKey: ["chat-messages", selectedId],
    queryFn: async () => {
      if (!selectedId) return [] as ChatMessage[];
      const { data, error } = await supabase
        .from("chat_messages")
        .select("id, sender, content, created_at")
        .eq("session_id", selectedId)
        .order("created_at", { ascending: true })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as ChatMessage[];
    },
    refetchInterval: 3000,
    enabled: !!selectedId,
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function handleSendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedId || !reply.trim() || sendingReply) return;
    setSendingReply(true);
    const { error } = await supabase.from("chat_messages").insert({
      session_id: selectedId,
      sender: "broker",
      content: reply.trim(),
    });
    setSendingReply(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setReply("");
    messagesQuery.refetch();
  }

  async function handleCloseSession(id: string) {
    const { error } = await supabase
      .from("chat_sessions")
      .update({ status: "closed" })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (selectedId === id) setSelectedId(null);
    toast.success("Session closed");
    sessionsQuery.refetch();
  }

  const sessions = sessionsQuery.data ?? [];
  const selectedSession = sessions.find((s) => s.id === selectedId);
  const messages = messagesQuery.data ?? [];

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <header className="border-b border-line bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="font-serif text-2xl">Live Chat</h1>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
            <Link to="/admin" className="text-foreground/60 hover:text-gold">
              Blog Admin
            </Link>
            <Link to="/blog" className="text-foreground/60 hover:text-gold">
              View blog
            </Link>
            <button onClick={handleSignOut} className="text-foreground/60 hover:text-gold">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        {isAdmin === false && (
          <div className="mb-6 border border-gold bg-background p-5 text-sm">
            This account doesn't have admin access yet.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          {/* Session list */}
          <div className="border border-line bg-background">
            <div className="border-b border-line px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                Conversations ({sessions.length})
              </p>
            </div>
            <ul className="max-h-[600px] overflow-y-auto">
              {sessions.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full border-b border-line px-4 py-3 text-left transition-colors ${
                      selectedId === s.id
                        ? "bg-cream"
                        : "hover:bg-cream/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">
                        {s.visitor_name || "Unknown"}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-foreground/40">
                        {timeAgo(s.created_at)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-foreground/50">
                      {s.visitor_email || s.visitor_phone || ""}
                    </p>
                    {s.status === "closed" && (
                      <span className="mt-1 inline-block text-[10px] uppercase tracking-wider text-foreground/40">
                        Closed
                      </span>
                    )}
                  </button>
                </li>
              ))}
              {sessions.length === 0 && (
                <li className="px-4 py-6 text-sm text-foreground/50">
                  No conversations yet.
                </li>
              )}
            </ul>
          </div>

          {/* Conversation panel */}
          <div className="border border-line bg-background">
            {!selectedSession ? (
              <div className="flex h-[600px] items-center justify-center text-sm text-foreground/40">
                Select a conversation to view messages.
              </div>
            ) : (
              <div className="flex h-[600px] flex-col">
                {/* Conversation header */}
                <div className="flex items-center justify-between border-b border-line px-5 py-3">
                  <div>
                    <p className="text-sm font-medium">
                      {selectedSession.visitor_name || "Unknown"}
                    </p>
                    <p className="text-xs text-foreground/50">
                      {selectedSession.visitor_email}
                      {selectedSession.visitor_phone
                        ? ` · ${selectedSession.visitor_phone}`
                        : ""}
                    </p>
                  </div>
                  {selectedSession.status === "active" && (
                    <button
                      onClick={() => handleCloseSession(selectedSession.id)}
                      className="text-xs uppercase tracking-[0.15em] text-foreground/50 hover:text-destructive"
                    >
                      Close
                    </button>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "broker" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
                          msg.sender === "broker"
                            ? "bg-gold text-gold-foreground"
                            : "border border-line bg-cream text-foreground"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-foreground/40">
                      No messages yet.
                    </p>
                  )}
                </div>

                {/* Reply input */}
                {selectedSession.status === "active" ? (
                  <form
                    onSubmit={handleSendReply}
                    className="flex gap-2 border-t border-line p-3"
                  >
                    <input
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your reply…"
                      className="flex-1 border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      disabled={sendingReply || !reply.trim()}
                      className="bg-gold px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold-foreground disabled:opacity-60"
                    >
                      {sendingReply ? "…" : "Send"}
                    </button>
                  </form>
                ) : (
                  <div className="border-t border-line px-5 py-4 text-center text-xs uppercase tracking-[0.15em] text-foreground/40">
                    This conversation is closed
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
