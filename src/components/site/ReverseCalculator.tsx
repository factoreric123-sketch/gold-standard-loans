import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/motion";
import { estimateReverse, HECM_LIMIT } from "@/lib/reverse-calc";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const inputCls =
  "w-full border border-line bg-white px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none";
const labelCls = "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5";

export function ReverseCalculator() {
  const [homeValue, setHomeValue] = useState(750000);
  const [age, setAge] = useState(68);
  const [balance, setBalance] = useState(150000);
  const [focus, setFocus] = useState<"both" | "hecm" | "homesafe">("both");

  const r = useMemo(() => estimateReverse({ homeValue, age, balance }), [homeValue, age, balance]);

  const cards = [
    { key: "hecm" as const, title: "HECM (FHA)", res: r.hecm, note: `Based on the lesser of value or ${fmt(HECM_LIMIT)}` },
    { key: "homesafe" as const, title: "HomeSafe First", res: r.homesafe, note: "Based on full home value — no FHA cap" },
  ].filter((c) => focus === "both" || focus === c.key);

  return (
    <section id="reverse-calculator" className="bg-off-white border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Reverse Mortgage Calculator</div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            HECM vs. HomeSafe First — <span className="italic text-gold">estimated payout.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-[1fr_1.4fr] gap-8">
          <div className="border border-line bg-card p-6 space-y-5">
            <div>
              <label className={labelCls} htmlFor="rc-value">Home value</label>
              <input id="rc-value" type="number" min={0} step={10000} className={inputCls} value={homeValue}
                onChange={(e) => setHomeValue(Math.max(0, Number(e.target.value) || 0))} />
            </div>
            <div>
              <label className={labelCls} htmlFor="rc-age">Youngest borrower's age</label>
              <input id="rc-age" type="number" min={55} max={99} className={inputCls} value={age}
                onChange={(e) => setAge(Number(e.target.value) || 0)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="rc-bal">Current mortgage balance</label>
              <input id="rc-bal" type="number" min={0} step={5000} className={inputCls} value={balance}
                onChange={(e) => setBalance(Math.max(0, Number(e.target.value) || 0))} />
            </div>
            <div>
              <span className={labelCls}>Loan type</span>
              <div className="grid grid-cols-3 border border-line">
                {(["both", "hecm", "homesafe"] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setFocus(k)}
                    className={`py-2.5 text-xs tracking-wide ${focus === k ? "bg-gold text-gold-foreground" : "bg-white text-foreground/70 hover:bg-accent"}`}>
                    {k === "both" ? "Compare" : k === "hecm" ? "HECM" : "HomeSafe"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 content-start">
            {cards.map((c) => (
              <div key={c.key} className="border border-line bg-card p-6">
                <div className="font-serif text-xl">{c.title}</div>
                <div className="text-[11px] uppercase tracking-widest text-foreground/45 mt-1">{c.note}</div>
                {c.res.eligible ? (
                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-3"><dt className="text-foreground/60">Gross available</dt><dd>{fmt(c.res.gross)}</dd></div>
                    <div className="flex justify-between gap-3"><dt className="text-foreground/60">Pays off mortgage</dt><dd>−{fmt(Math.min(balance, c.res.gross))}</dd></div>
                    <div className="flex justify-between gap-3 border-t border-line pt-3"><dt className="font-medium">Est. cash to you</dt><dd className="font-serif text-2xl text-gold">{fmt(c.res.net)}</dd></div>
                    {c.res.net === 0 && <p className="text-xs text-foreground/55">Mortgage balance exceeds the estimated limit — a cash payoff at closing may be needed.</p>}
                  </dl>
                ) : (
                  <p className="mt-5 text-sm text-foreground/65">{c.res.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-foreground/45 leading-relaxed max-w-3xl">
          Rough illustration only, using approximate age-based lending percentages. Actual amounts depend on
          current rates, closing costs, appraisal, and lender approval. Call Warren for an exact quote.
        </p>
      </div>
    </section>
  );
}
