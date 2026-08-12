import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: `Admin Sign In | ${COMPANY_NAME}` },
      { name: "description", content: "Sign in to manage daily blog posts." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Admin Sign In | ${COMPANY_NAME}` },
      { property: "og:description", content: "Sign in to manage daily blog posts." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate({ to: "/admin", replace: true });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) setError(error.message);
      else setNotice("Account created. Sign in below (admin access must be granted once).");
    }
    setBusy(false);
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md border border-line bg-background p-8">
        <h1 className="font-serif text-3xl">Admin</h1>
        <p className="mt-2 text-sm text-foreground/60">
          {mode === "signin" ? "Sign in to post today's update." : "Create your admin account."}
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/60">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/60">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {notice && <p className="text-sm text-gold">{notice}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold-foreground disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-xs uppercase tracking-[0.2em] text-foreground/50 hover:text-gold"
        >
          {mode === "signin" ? "Need an account?" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
