import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import {
  startChatSession,
  sendVisitorMessage,
  pollChatMessages,
  type ChatMessage,
} from "@/lib/chat.functions";

const STORAGE_KEY = "tdms-chat-session";

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<{
    sessionId: string;
    sessionToken: string;
  } | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // Intro form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstMsg, setFirstMsg] = useState("");
  const [introError, setIntroError] = useState("");
  const [starting, setStarting] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [sendError, setSendError] = useState("");
  const formShownAt = useRef<number>(Date.now());
  const lastSentAt = useRef<number>(0);


  const scrollRef = useRef<HTMLDivElement>(null);


  // Restore session from sessionStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sessionId && parsed.sessionToken) {
          setSession(parsed);
          setOpen(true);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Poll for new messages every 3s while a session is active
  useEffect(() => {
    if (!session) return;

    let cancelled = false;

    const doPoll = async () => {
      const result = await pollChatMessages({
        data: {
          sessionId: session.sessionId,
          sessionToken: session.sessionToken,
        },
      });
      if (!cancelled && result.messages) {
        setMessages(result.messages);
      }
    };

    doPoll();
    const interval = setInterval(doPoll, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [session]);

  async function handleStartChat(e: React.FormEvent) {
    e.preventDefault();
    setIntroError("");

    if (!name.trim() || !email.trim() || !phone.trim() || !firstMsg.trim()) {
      setIntroError("Please fill in all fields.");
      return;
    }

    // Honeypot — silently drop bot submissions.
    if (website.trim().length > 0) return;

    const elapsedMs = Date.now() - formShownAt.current;
    if (elapsedMs < 2500) {
      setIntroError("Please take a moment to complete the form.");
      return;
    }

    setStarting(true);
    const result = await startChatSession({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        firstMessage: firstMsg.trim(),
        website: "",
        elapsedMs,
      },
    });

    setStarting(false);

    if (result.error || !result.sessionId || !result.sessionToken) {
      setIntroError(result.error || "Something went wrong. Please try again.");
      return;
    }

    const newSession = {
      sessionId: result.sessionId,
      sessionToken: result.sessionToken,
    };
    setSession(newSession);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } catch {
      /* ignore */
    }

    // Fetch initial messages
    const pollResult = await pollChatMessages({ data: newSession });
    if (pollResult.messages) {
      setMessages(pollResult.messages);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !session || sending) return;

    // Client-side cooldown between sends.
    if (Date.now() - lastSentAt.current < 800) return;
    lastSentAt.current = Date.now();

    const content = input.trim();
    setInput("");
    setSending(true);
    setSendError("");


    // Optimistic update
    const optimistic: ChatMessage = {
      id: `temp-${Date.now()}`,
      sender: "visitor",
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    const result = await sendVisitorMessage({
      data: {
        sessionId: session.sessionId,
        sessionToken: session.sessionToken,
        content,
      },
    });

    setSending(false);

    if (result.error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setInput(content);
      return;
    }

    // Sync with server to replace the optimistic message
    const pollResult = await pollChatMessages({ data: session });
    if (pollResult.messages) {
      setMessages(pollResult.messages);
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6"
          aria-label="Chat with Warren"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col bg-background shadow-2xl md:bottom-6 md:right-4 md:h-[560px] md:w-[380px] md:border md:border-line">
          {/* Header */}
          <div className="flex items-center justify-between bg-charcoal px-5 py-4">
            <div>
              <p className="font-serif text-lg leading-tight text-background">
                Chat with Warren
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-background/55">
                Typically replies within minutes
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-background/70 transition-colors hover:text-gold"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          {!session ? (
            /* Intro form */
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="text-sm leading-relaxed text-foreground/70">
                Hi! I'm Warren Factor. Ask me anything about mortgages, rates, or
                your loan options.
              </p>
              <form onSubmit={handleStartChat} className="mt-5 space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  required
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  required
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  required
                />
                <textarea
                  value={firstMsg}
                  onChange={(e) => setFirstMsg(e.target.value)}
                  placeholder="How can I help you?"
                  rows={3}
                  className="w-full resize-none border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  required
                />
                {introError && (
                  <p className="text-xs text-destructive">{introError}</p>
                )}
                <button
                  type="submit"
                  disabled={starting}
                  className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-xs uppercase tracking-[0.2em] text-gold-foreground disabled:opacity-60"
                >
                  {starting ? (
                    "Starting…"
                  ) : (
                    <>
                      Start Chat <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Chat messages + input */
            <>
              <div
                ref={scrollRef}
                className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === "visitor"
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
                    Connecting…
                  </p>
                )}
              </div>

              <form
                onSubmit={handleSend}
                className="flex gap-2 border-t border-line p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message…"
                  className="flex-1 border border-line bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-gold text-gold-foreground disabled:opacity-60"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
