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

const TERM_OPTIONS = [15, 20, 30] as const;

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (principal <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function ScenarioCalculator() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [termYears, setTermYears] = useState<number>(30);
  const [propTaxes, setPropTaxes] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [hoa, setHoa] = useState(0);

  const extras = propTaxes + insurance + hoa;

  const results = useMemo(
    () =>
      SCENARIOS.map((s) => {
        const monthly = monthlyPayment(loanAmount, s.rate, termYears);
        return {
          ...s,
          monthly,
          total: monthly + extras,
          totalInterest: monthly * termYears * 12 - loanAmount,
        };
      }),
    [loanAmount, termYears, extras]
  );

  const base = results[0];

  const label = "block text-[11px] uppercase tracking-widest text-foreground/55 mb-2";
  const field =
    "w-full border border-input bg-card px-4 py-3 text-base text-foreground focus:border-gold focus:outline-none";

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
          Enter a loan amount and pick a loan term to compare estimated monthly payments on a
          fixed-rate loan under each of the three trajectories above. Add your property taxes,
          insurance, and HOA to see total monthly housing cost instead of principal &amp; interest
          alone.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:max-w-lg">
          <div>
            <label htmlFor="scenario-loan-amount" className={label}>
              Loan amount
            </label>
            <input
              id="scenario-loan-amount"
              type="number"
              min={0}
              step={1000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Math.max(Number(e.target.value) || 0, 0))}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="scenario-term" className={label}>
              Loan term
            </label>
            <select
              id="scenario-term"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className={field}
            >
              {TERM_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}-year fixed
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 border border-line bg-card p-6">
          <div className="text-[11px] uppercase tracking-[0.2em] text-gold">
            Optional monthly costs
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Enter monthly amounts. Leave any field at 0 to compare principal &amp; interest only.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="scenario-taxes" className={label}>
                Property taxes / mo
              </label>
              <input
                id="scenario-taxes"
                type="number"
                min={0}
                step={10}
                value={propTaxes}
                onChange={(e) => setPropTaxes(Math.max(Number(e.target.value) || 0, 0))}
                className={field}
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="scenario-insurance" className={label}>
                Homeowners insurance / mo
              </label>
              <input
                id="scenario-insurance"
                type="number"
                min={0}
                step={10}
                value={insurance}
                onChange={(e) => setInsurance(Math.max(Number(e.target.value) || 0, 0))}
                className={field}
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="scenario-hoa" className={label}>
                HOA fees / mo
              </label>
              <input
                id="scenario-hoa"
                type="number"
                min={0}
                step={10}
                value={hoa}
                onChange={(e) => setHoa(Math.max(Number(e.target.value) || 0, 0))}
                className={field}
                placeholder="0"
              />
            </div>
          </div>
          {extras > 0 && (
            <div className="mt-5 pt-4 border-t border-line flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-widest text-foreground/55">
                Added to every scenario
              </span>
              <span className="font-serif text-xl">{usd(extras)}/mo</span>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-px bg-line border border-line md:grid-cols-3">
          {results.map((s) => {
            const diff = s.total - base.total;
            return (
              <div key={s.key} className="bg-background p-6">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  {s.label} · {s.range}
                </h3>
                <p className="mt-4 font-serif text-4xl leading-none">{usd2(s.total)}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  total monthly housing cost at a representative {s.rate.toFixed(1)}% rate
                </p>
                <p className="mt-3 text-sm">
                  Principal &amp; interest: {usd2(s.monthly)}
                  {extras > 0 && <span className="text-muted-foreground"> + {usd(extras)} costs</span>}
                </p>
                {s.key !== "base" && (
                  <p className="mt-3 text-sm">
                    {diff > 0 ? "+" : "−"}
                    {usd(Math.abs(diff))}/mo vs. Base Case
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Total interest over {termYears} years: {usd(Math.max(s.totalInterest, 0))}
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
            Estimates only. Each scenario uses a single representative rate within its supplied
            range, not a quote. Shorter terms typically price lower than 30-year rates, so 15- and
            20-year estimates here are conservative. Property taxes, insurance, and HOA use the
            monthly amounts you enter and are the same in every scenario; PMI is not included. Your
            actual rate and payment depend on credit, program, and approval.
          </p>
        </div>
      </div>
    </section>
  );
}
