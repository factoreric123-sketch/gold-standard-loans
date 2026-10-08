import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Loader2 } from "lucide-react";
import { getRateGuidance } from "@/lib/rate-guidance.functions";

const TIMELINES = ["Within 30 days", "1–3 months", "3–6 months", "6–12 months", "Just exploring"];

export function RateGuidance() {
  const run = useServerFn(getRateGuidance);
  const [loanAmount, setLoanAmount] = useState("400000");
  const [scenario, setScenario] = useState("base");
  const [goal, setGoal] = useState("buying");
  const [timeline, setTimeline] = useState(TIMELINES[1]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setText("");
    try {
      const res = await run({
        data: { loanAmount: Number(loanAmount.replace(/[^0-9.]/g, "")), scenario, goal, timeline, notes },
      });
      if (res.ok) setText(res.text);
      else setError(res.error);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const field = "w-full border border-line bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none";
  const label = "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2";

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">AI-Powered Guidance</p>
      <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
        What Do These Rate Paths Mean for You?
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-8">
        Tell us about your plans and get personalized guidance on how the Base, Bear and Bull scenarios could affect
        your decision.
      </p>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <form onSubmit={submit} className="space-y-5 border border-line p-6">
          <div>
            <label className={label} htmlFor="rg-amount">Loan amount</label>
            <input id="rg-amount" inputMode="numeric" className={field} value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required />
          </div>
          <div>
            <label className={label} htmlFor="rg-goal">I'm</label>
            <select id="rg-goal" className={field} value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="buying">Buying a home</option>
              <option value="refinancing">Refinancing</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="rg-scenario">Scenario I expect</label>
            <select id="rg-scenario" className={field} value={scenario} onChange={(e) => setScenario(e.target.value)}>
              <option value="base">Base Case (6.7%–7.3%)</option>
              <option value="bear">Bear Case (toward 8.0%)</option>
              <option value="bull">Bull Case (below 6.0%)</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="rg-timeline">Timeline</label>
            <select id="rg-timeline" className={field} value={timeline} onChange={(e) => setTimeline(e.target.value)}>
              {TIMELINES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="rg-notes">Anything else? (optional)</label>
            <textarea id="rg-notes" rows={3} maxLength={500} className={field} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. first-time buyer, current rate 3.5%" />
          </div>
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 bg-gold px-7 py-3.5 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <>Get my guidance <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
        <div className="border border-line border-t-2 border-t-gold p-6 min-h-[280px]" aria-live="polite">
          {error && <p className="text-destructive text-sm">{error}</p>}
          {!error && !text && !loading && (
            <p className="text-muted-foreground text-sm">Your personalized guidance will appear here.</p>
          )}
          {loading && <p className="text-muted-foreground text-sm">Analyzing your scenario… this can take a few seconds.</p>}
          {text && (
            <div className="space-y-3 text-sm leading-relaxed text-foreground">
              {text.split(/\n+/).filter(Boolean).map((p, i) => (
                <p key={i} className={p.trim().startsWith("- ") ? "pl-4 border-l border-gold" : ""}>
                  {p.replace(/^\s*-\s+/, "").replace(/\*\*/g, "")}
                </p>
              ))}
              <p className="pt-3 text-xs text-muted-foreground border-t border-line">
                AI-generated estimate for education only — not a loan offer or rate guarantee.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
