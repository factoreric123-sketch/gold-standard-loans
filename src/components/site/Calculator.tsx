import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/motion";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const usd2 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type YearRow = {
  year: number;
  interest: number;
  principal: number;
  ending: number;
};

export function Calculator() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [years, setYears] = useState(30);
  const [months, setMonths] = useState(0);
  const [rate, setRate] = useState(6.69);
  const [startMonth, setStartMonth] = useState(new Date().getUTCMonth());
  const [startYear, setStartYear] = useState(new Date().getUTCFullYear());
  const [showSchedule, setShowSchedule] = useState(false);

  const { monthly, totalPayments, totalInterest, schedule, n } = useMemo(() => {
    const n = Math.max(years * 12 + months, 1);
    const r = rate / 100 / 12;
    const monthly =
      r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let balance = loanAmount;
    const byYear = new Map<number, YearRow>();
    for (let i = 0; i < n; i++) {
      const interest = balance * r;
      let principal = monthly - interest;
      if (i === n - 1) principal = balance;
      balance = Math.max(balance - principal, 0);
      const calYear = startYear + Math.floor((startMonth + i) / 12);
      const row = byYear.get(calYear) ?? {
        year: calYear,
        interest: 0,
        principal: 0,
        ending: balance,
      };
      row.interest += interest;
      row.principal += principal;
      row.ending = balance;
      byYear.set(calYear, row);
    }

    const totalPayments = monthly * n;
    return {
      monthly,
      totalPayments,
      totalInterest: totalPayments - loanAmount,
      schedule: Array.from(byYear.values()),
      n,
    };
  }, [loanAmount, years, months, rate, startMonth, startYear]);

  const payoff = useMemo(() => {
    const idx = startMonth + n - 1;
    return `${MONTHS[idx % 12]} ${startYear + Math.floor(idx / 12)}`;
  }, [startMonth, startYear, n]);

  const label = "block text-[11px] uppercase tracking-widest text-foreground/55 mb-2";
  const field =
    "w-full rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground focus:border-gold focus:outline-none";

  return (
    <section id="calculator" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
            Amortization Calculator
          </div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
            Payment, interest, and your full{" "}
            <span className="italic text-gold">amortization schedule.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Inputs */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-line bg-card shadow-soft p-7 md:p-9 space-y-6">
              <div>
                <label className={label} htmlFor="amt">
                  Loan amount
                </label>
                <input
                  id="amt"
                  type="number"
                  min={0}
                  step={1000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(Number(e.target.value) || 0, 0))}
                  className={field}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={label} htmlFor="years">
                    Loan term (years)
                  </label>
                  <input
                    id="years"
                    type="number"
                    min={0}
                    max={50}
                    value={years}
                    onChange={(e) => setYears(Math.max(Number(e.target.value) || 0, 0))}
                    className={field}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="months">
                    Additional months
                  </label>
                  <input
                    id="months"
                    type="number"
                    min={0}
                    max={11}
                    value={months}
                    onChange={(e) =>
                      setMonths(Math.min(Math.max(Number(e.target.value) || 0, 0), 11))
                    }
                    className={field}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className={label} htmlFor="rate">
                    Interest rate (%)
                  </label>
                  <input
                    id="rate"
                    type="number"
                    min={0}
                    max={25}
                    step={0.001}
                    value={rate}
                    onChange={(e) => setRate(Math.max(Number(e.target.value) || 0, 0))}
                    className={field}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="smonth">
                    Start month
                  </label>
                  <select
                    id="smonth"
                    value={startMonth}
                    onChange={(e) => setStartMonth(Number(e.target.value))}
                    className={field}
                  >
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="syear">
                    Start year
                  </label>
                  <input
                    id="syear"
                    type="number"
                    min={1990}
                    max={2100}
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value) || startYear)}
                    className={field}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-line">
                <div className="pt-4">
                  <div className="text-[11px] uppercase tracking-widest text-foreground/55">
                    Total of {n} payments
                  </div>
                  <div className="font-serif text-2xl mt-1">{usd(totalPayments)}</div>
                </div>
                <div className="pt-4">
                  <div className="text-[11px] uppercase tracking-widest text-foreground/55">
                    Total interest
                  </div>
                  <div className="font-serif text-2xl mt-1 text-gold">{usd(totalInterest)}</div>
                </div>
                <div className="pt-4">
                  <div className="text-[11px] uppercase tracking-widest text-foreground/55">
                    Payoff date
                  </div>
                  <div className="font-serif text-2xl mt-1">{payoff}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Result */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="h-full rounded-2xl bg-charcoal text-background shadow-soft-lg p-8 md:p-9 flex flex-col">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gold">
                Monthly Payment
              </div>
              <div className="mt-3 font-serif text-5xl md:text-6xl text-background leading-none">
                {usd2(monthly)}
              </div>
              <div className="text-xs text-background/55 mt-2">Principal &amp; interest</div>

              <div className="mt-8 pt-6 border-t border-background/15 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-background/60">Loan amount</span>
                  <span className="text-background">{usd(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-background/60">Total interest</span>
                  <span className="text-background">{usd(totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-background/60">Total cost</span>
                  <span className="text-background">{usd(totalPayments)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSchedule((s) => !s)}
                className="mt-6 border border-background/25 rounded-full py-3 text-sm tracking-wide hover:border-gold hover:text-gold transition-colors"
              >
                {showSchedule ? "Hide" : "View"} amortization schedule
              </button>

              <a
                href="/#contact"
                className="mt-3 inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground rounded-full py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity"
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

        {showSchedule && (
          <div className="mt-8 rounded-2xl border border-line bg-card shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-line text-[11px] uppercase tracking-[0.2em] text-foreground/55">
              Annual amortization schedule
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-widest text-foreground/55">
                    <th className="px-6 py-3 font-normal">Year</th>
                    <th className="px-6 py-3 font-normal text-right">Interest</th>
                    <th className="px-6 py-3 font-normal text-right">Principal</th>
                    <th className="px-6 py-3 font-normal text-right">Ending balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((r) => (
                    <tr key={r.year} className="border-t border-line">
                      <td className="px-6 py-3">{r.year}</td>
                      <td className="px-6 py-3 text-right text-foreground/70">{usd(r.interest)}</td>
                      <td className="px-6 py-3 text-right text-foreground/70">
                        {usd(r.principal)}
                      </td>
                      <td className="px-6 py-3 text-right">{usd(r.ending)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
