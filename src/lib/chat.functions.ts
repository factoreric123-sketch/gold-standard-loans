import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type ChatMessage = {
  id: string;
  sender: "visitor" | "broker";
  content: string;
  created_at: string;
};

const WEB3FORMS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

async function notifyWarren(
  name: string,
  email: string,
  phone: string,
  message: string,
) {
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New live chat — ${name}`,
        from_name: "The Discount Mortgage Store website",
        name,
        email,
        phone,
        message,
      }),
    });
  } catch {
    // non-fatal — chat still works without the email
  }
}

/** Minimum time a real human takes to fill in the intro form. */
const MIN_FORM_MS = 2500;
/** Hard ceiling on visitor messages in one session. */
const MAX_MESSAGES_PER_SESSION = 100;
/** Minimum gap between two visitor messages. */
const MIN_MESSAGE_GAP_MS = 800;

export const startChatSession = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({
      name: z.string().trim().min(1, "Name is required").max(80),
      email: z.string().trim().email("Valid email is required").max(200),
      phone: z.string().trim().min(7, "Valid phone is required").max(30),
      firstMessage: z.string().trim().min(1, "Message is required").max(2000),
      // Bot protection — hidden field, must stay empty.
      website: z.string().max(200).optional().default(""),
      // Milliseconds between the form rendering and submitting.
      elapsedMs: z.number().int().nonnegative().max(86_400_000).default(0),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    // Honeypot / speed checks: bots fill hidden fields and submit instantly.
    if (data.website.trim().length > 0 || data.elapsedMs < MIN_FORM_MS) {
      return {
        sessionId: null as string | null,
        sessionToken: null as string | null,
        error: "Could not start chat. Please try again." as string | null,
      };
    }


    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: session, error: sessionError } = await supabaseAdmin
      .from("chat_sessions")
      .insert({
        visitor_name: data.name,
        visitor_email: data.email,
        visitor_phone: data.phone,
        status: "active",
      })
      .select("id, session_token")
      .single();

    if (sessionError || !session) {
      return {
        sessionId: null as string | null,
        sessionToken: null as string | null,
        error: "Could not start chat. Please try again." as string | null,
      };
    }

    const { error: msgError } = await supabaseAdmin
      .from("chat_messages")
      .insert([
        {
          session_id: session.id,
          sender: "broker",
          content:
            "Hi! Thanks for reaching out — I'll review your message and get back to you shortly. — Warren",
        },
        {
          session_id: session.id,
          sender: "visitor",
          content: data.firstMessage,
        },
      ]);

    if (msgError) {
      return {
        sessionId: null as string | null,
        sessionToken: null as string | null,
        error: "Could not send your message. Please try again." as string | null,
      };
    }

    // Email Warren about the new chat (non-fatal)
    await notifyWarren(data.name, data.email, data.phone, data.firstMessage);

    return {
      sessionId: session.id as string,
      sessionToken: session.session_token as string,
      error: null as string | null,
    };
  });

export const sendVisitorMessage = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({
      sessionId: z.string().uuid(),
      sessionToken: z.string().uuid(),
      content: z.string().trim().min(1).max(2000),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Validate session token before writing
    const { data: sessionRow } = await supabaseAdmin
      .from("chat_sessions")
      .select("id")
      .eq("id", data.sessionId)
      .eq("session_token", data.sessionToken)
      .maybeSingle();

    if (!sessionRow) {
      return { error: "Invalid session" as string | null };
    }

    const { error } = await supabaseAdmin
      .from("chat_messages")
      .insert({
        session_id: data.sessionId,
        sender: "visitor",
        content: data.content,
      });

    if (error) {
      return { error: "Could not send message" as string | null };
    }

    return { error: null as string | null };
  });

export const pollChatMessages = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({
      sessionId: z.string().uuid(),
      sessionToken: z.string().uuid(),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Validate session token
    const { data: sessionRow } = await supabaseAdmin
      .from("chat_sessions")
      .select("id")
      .eq("id", data.sessionId)
      .eq("session_token", data.sessionToken)
      .maybeSingle();

    if (!sessionRow) {
      return { messages: [] as ChatMessage[], error: "Invalid session" as string | null };
    }

    const { data: messages, error } = await supabaseAdmin
      .from("chat_messages")
      .select("id, sender, content, created_at")
      .eq("session_id", data.sessionId)
      .order("created_at", { ascending: true })
      .limit(200);

    if (error) {
      return { messages: [] as ChatMessage[], error: "Could not load messages" as string | null };
    }

    return { messages: (messages ?? []) as ChatMessage[], error: null as string | null };
  });
