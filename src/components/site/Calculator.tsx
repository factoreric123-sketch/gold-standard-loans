import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/motion";

const TERMS = [15, 20, 30];

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Calculator() {
  const [price, setPrice] = useState(450000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const { monthly, loanAmount, down } = useMemo(() => {
    const down = Math.round((price * downPct) / 100);
    const loanAmount = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly =
      r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { monthly, loanAmount, down };
  }, [price, downPct, rate, term]);

  const row = "flex items-center justify-between mb-2";
  const label = "text-[11px] uppercase tracking-widest text-foreground/55";
  const value = "font-serif text-xl text-foreground";
  const range = "w-full accent-gold cursor-pointer";

  return (
    <section id="calculator" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
            Payment Calculator
          </div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
            Estimate your monthly <span className="italic text-gold">payment.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Inputs */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-line bg-card shadow-soft p-7 md:p-9 space-y-7">
              <div>
                <div className={row}>
                  <span className={label}>Home price</span>
                  <span className={value}>{usd(price)}</span>
                </div>
                <input
                  type="range"
                  min={75000}
                  max={2000000}
                  step={5000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className={range}
                  aria-label="Home price"
                />
              </div>

              <div>
                <div className={row}>
                  <span className={label}>Down payment</span>
                  <span className={value}>
                    {usd(down)} <span className="text-sm text-foreground/50">({downPct}%)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  className={range}
                  aria-label="Down payment percent"
                />
              </div>

              <div>
                <div className={row}>
                  <span className={label}>Interest rate</span>
                  <span className={value}>{rate.toFixed(3)}%</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={10}
                  step={0.125}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className={range}
                  aria-label="Interest rate"
                />
              </div>

              <div>
                <div className={`${label} mb-2`}>Loan term</div>
                <div className="grid grid-cols-3 gap-2">
                  {TERMS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTerm(t)}
                      className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                        term === t
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-input bg-card text-foreground/70 hover:border-foreground/30"
                      }`}
                    >
                      {t} yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Result */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="h-full rounded-2xl bg-charcoal text-background shadow-soft-lg p-8 md:p-9 flex flex-col">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gold">
                Estimated Monthly Payment
              </div>
              <div className="mt-3 font-serif text-5xl md:text-6xl text-background leading-none">
                {usd(Math.round(monthly))}
              </div>
              <div className="text-xs text-background/55 mt-2">Principal &amp; interest</div>

              <div className="mt-8 pt-6 border-t border-background/15 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-background/60">Loan amount</span>
                  <span className="text-background">{usd(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-background/60">Down payment</span>
                  <span className="text-background">{usd(down)}</span>
                </div>
              </div>

              <a
                href="/#contact"
                className="mt-8 inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground rounded-full py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                Get my real rate <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-4 text-[11px] text-background/45 leading-relaxed">
                Estimate only. Excludes property taxes, insurance, HOA, and PMI. Your actual rate
                and payment depend on credit, program, and approval.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
