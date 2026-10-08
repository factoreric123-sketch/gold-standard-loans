import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

const usd2 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Representative rate per scenario, drawn from the supplied October 2026
// outlook: Base midpoint of 6.7%–7.3%, Bear at 8.0%, Bull just under 6.0%.
const SCENARIOS = [
  {
    key: "base",
    label: "Base Case",
    range: "6.7% – 7.3%",
    rate: 7.0,
    note: "Inflation stays sticky; rates hold in a tight band.",
  },
  {
    key: "bear",
    label: "Bear Case",
    range: "Toward 8.0%",
    rate: 8.0,
    note: "Energy shock or escalation pushes rates higher.",
  },
  {
    key: "bull",
    label: "Bull Case",
    range: "Below 6.0%",
    rate: 5.9,
    note: "Drastic economic shift pulls rates down.",
  },
] as const;

const TERM_YEARS = 30;

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (principal <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function ScenarioCalculator() {
  const [loanAmount, setLoanAmount] = useState(400000);

  const results = useMemo(
    () =>
      SCENARIOS.map((s) => {
        const monthly = monthlyPayment(loanAmount, s.rate, TERM_YEARS);
        return { ...s, monthly, totalInterest: monthly * TERM_YEARS * 12 - loanAmount };
      }),
    [loanAmount]
  );

  const base = results[0];

  return (
    <section className="bg-background border-b border-line" aria-labelledby="scenario-calc-heading">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
          Compare the Scenarios
        </div>
        <h2 id="scenario-calc-heading" className="font-serif text-3xl md:text-4xl leading-tight">
          What Would Each Rate Path Mean for Your Payment?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Enter a loan amount to compare estimated monthly principal &amp; interest
          payments on a {TERM_YEARS}-year fixed loan under each of the three
          trajectories above.
        </p>

        <div className="mt-8 max-w-md">
          <label
            htmlFor="scenario-loan-amount"
            className="block text-[11px] uppercase tracking-widest text-foreground/55 mb-2"
          >
            Loan amount
          </label>
          <input
            id="scenario-loan-amount"
            type="number"
            min={0}
            step={1000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Math.max(Number(e.target.value) || 0, 0))}
            className="w-full border border-input bg-card px-4 py-3 text-base text-foreground focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mt-8 grid gap-px bg-line border border-line md:grid-cols-3">
          {results.map((s) => {
            const diff = s.monthly - base.monthly;
            return (
              <div key={s.key} className="bg-background p-6">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  {s.label} · {s.range}
                </h3>
                <p className="mt-4 font-serif text-4xl leading-none">{usd2(s.monthly)}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  per month at a representative {s.rate.toFixed(1)}% rate
                </p>
                {s.key !== "base" && (
                  <p className="mt-3 text-sm">
                    {diff > 0 ? "+" : "−"}
                    {usd(Math.abs(diff))}/mo vs. Base Case
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Total interest over {TERM_YEARS} years: {usd(Math.max(s.totalInterest, 0))}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm tracking-wide text-gold-foreground transition-opacity hover:opacity-90"
          >
            Get my real rate <ArrowRight className="h-4 w-4" />
          </a>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Estimates only. Each scenario uses a single representative rate within
            its supplied range, not a quote. Payments exclude property taxes,
            insurance, HOA, and PMI. Your actual rate and payment depend on
            credit, program, and approval.
          </p>
        </div>
      </div>
    </section>
  );
}
