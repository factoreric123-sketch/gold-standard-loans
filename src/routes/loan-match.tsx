import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2 } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_URL, PROGRAMS } from "@/lib/site-data";
import { getLoanMatch, PURPOSES, OCCUPANCY, CREDIT, INCOME, TIMELINES } from "@/lib/loan-match.functions";

const TITLE = "Florida Loan Program Finder | The Discount Mortgage Store";
const DESC =
  "Tell us your Florida home purchase plans, credit and goals, and get AI-matched loan programs plus a personalized list of next steps.";

export const Route = createFileRoute("/loan-match")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/loan-match` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/loan-match` }],
  }),
  component: LoanMatchPage,
});

type Result = { summary: string; programs: { slug: string; reason: string }[]; steps: string[] };

function programInfo(slug: string) {
  if (slug === "special-programs") return { title: "Florida Grant Money Programs", href: "/special-programs" };
  const p = (PROGRAMS as unknown as { slug: string; title?: string; name?: string }[]).find((x) => x.slug === slug);
  return { title: p?.title ?? p?.name ?? slug, href: `/programs/${slug}` };
}

function LoanMatchPage() {
  const run = useServerFn(getLoanMatch);
  const [f, setF] = useState({
    purpose: PURPOSES[0], price: "450000", downPayment: "45000", location: "", occupancy: OCCUPANCY[0],
    credit: CREDIT[2], income: INCOME[0], firstTime: true, veteran: false, timeline: TIMELINES[1], goals: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const set = (k: keyof typeof f, v: string | boolean) => setF((s) => ({ ...s, [k]: v }));
  const n = (s: string) => Number(s.replace(/[^0-9.]/g, ""));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await run({ data: { ...f, price: n(f.price), downPayment: n(f.downPayment) } });
      if (res.ok) setResult(res.result); else setError(res.error);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const field = "w-full border border-line bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none";
  const label = "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2";
  const sel = (id: keyof typeof f, text: string, opts: string[]) => (
    <div>
      <label className={label} htmlFor={`lm-${id}`}>{text}</label>
      <select id={`lm-${id}`} className={field} value={String(f[id])} onChange={(e) => set(id, e.target.value)}>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-cream">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">AI-Powered · Florida Homebuyers</p>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">Find Your Loan Program</h1>
            <p className="text-muted-foreground max-w-2xl">
              Share your purchase plans, estimated credit and goals. We'll match you with the programs that fit and a
              personalized list of next steps.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <form onSubmit={submit} className="space-y-5 border border-line p-6">
              {sel("purpose", "Purchase plan", PURPOSES)}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="lm-price">Target price</label>
                  <input id="lm-price" inputMode="numeric" className={field} value={f.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div>
                  <label className={label} htmlFor="lm-down">Down payment</label>
                  <input id="lm-down" inputMode="numeric" className={field} value={f.downPayment} onChange={(e) => set("downPayment", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="lm-loc">Florida city or county (optional)</label>
                <input id="lm-loc" maxLength={80} className={field} value={f.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Boca Raton, Palm Beach County" />
              </div>
              {sel("occupancy", "Occupancy", OCCUPANCY)}
              <div className="grid gap-5 sm:grid-cols-2">
                {sel("credit", "Estimated credit score", CREDIT)}
                {sel("income", "Income type", INCOME)}
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-foreground">
                <label className="flex items-center gap-2"><input type="checkbox" checked={f.firstTime} onChange={(e) => set("firstTime", e.target.checked)} /> First-time buyer</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={f.veteran} onChange={(e) => set("veteran", e.target.checked)} /> Veteran / military</label>
              </div>
              {sel("timeline", "Timeline", TIMELINES)}
              <div>
                <label className={label} htmlFor="lm-goals">Financial goals (optional)</label>
                <textarea id="lm-goals" rows={3} maxLength={600} className={field} value={f.goals} onChange={(e) => set("goals", e.target.value)} placeholder="e.g. keep payment under $3,000, minimize cash to close" />
              </div>
              <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 bg-gold px-7 py-3.5 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Matching…</> : <>Match my programs <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
            <div className="border border-line border-t-2 border-t-gold p-6 min-h-[320px]" aria-live="polite">
              {error && <p className="text-destructive text-sm">{error}</p>}
              {!error && !result && !loading && <p className="text-muted-foreground text-sm">Your recommended programs and next steps will appear here.</p>}
              {loading && <p className="text-muted-foreground text-sm">Reviewing your profile… this can take a few seconds.</p>}
              {result && (
                <div className="space-y-8">
                  {result.summary && <p className="text-foreground leading-relaxed">{result.summary}</p>}
                  {result.programs.length > 0 && (
                    <div>
                      <h2 className="font-display text-2xl text-foreground mb-4">Recommended Programs</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {result.programs.map((p) => {
                          const info = programInfo(p.slug);
                          return (
                            <a key={p.slug} href={info.href} className="block border border-line p-4 hover:border-gold">
                              <p className="font-display text-xl text-foreground mb-1">{info.title}</p>
                              <p className="text-sm text-muted-foreground mb-3">{p.reason}</p>
                              <span className="text-xs uppercase tracking-[0.2em] text-gold">View program →</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {result.steps.length > 0 && (
                    <div>
                      <h2 className="font-display text-2xl text-foreground mb-4">Your Next Steps</h2>
                      <ol className="space-y-3">
                        {result.steps.map((s, i) => (
                          <li key={i} className="flex gap-3 text-sm text-foreground">
                            <span className="font-display text-gold text-lg leading-none">{i + 1}</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <a href="/#contact" className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm text-primary-foreground">Get my real rate <ArrowRight className="h-4 w-4" /></a>
                    <a href="tel:5615771882" className="inline-flex items-center gap-2 border border-gold px-6 py-3 text-sm text-foreground">Call (561) 577-1882</a>
                  </div>
                  <p className="pt-3 text-xs text-muted-foreground border-t border-line">
                    AI-generated suggestions for education only — not a loan offer, approval or rate guarantee. Eligibility is confirmed only after a full application.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
