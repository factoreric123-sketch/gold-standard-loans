import { Check, TrendingUp } from "lucide-react";
import { RATE_DRIVERS, RATE_DAILY, RATE_WEEKLY, BROKER_REASONS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function Insights() {
  return (
    <section id="insights" className="bg-off-white border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 space-y-20">
        {/* PART A — What moves your rate */}
        <div>
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Insights</div>
            <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
              Know what <span className="italic text-gold">actually moves your rate.</span>
            </h2>
            <p className="mt-5 text-foreground/65 max-w-2xl leading-relaxed">
              "Interest rates" isn't just one thing. These are the levers worth watching:
            </p>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {RATE_DRIVERS.map((d, i) => (
              <Reveal key={d.name} delay={(i % 2) * 60}>
                <div className="rounded-2xl border border-line bg-card p-6">
                  <div className="font-serif text-xl mb-1.5">{d.name}</div>
                  <div className="text-sm text-foreground/65 leading-relaxed">{d.note}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 inline-flex items-start gap-3 rounded-xl bg-gold/10 border border-gold/30 px-5 py-4 text-sm text-foreground/80">
              <TrendingUp className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={2} />
              <span>
                Watching mortgage or bridge loans? Focus on the{" "}
                <span className="font-medium text-foreground">
                  10-Year Treasury and MBS spreads.
                </span>
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-card shadow-soft p-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
                  Daily — 5 minutes
                </div>
                <h3 className="font-serif text-2xl mb-4">A simple, effective habit</h3>
                <ul className="space-y-3">
                  {RATE_DAILY.map((it) => (
                    <li key={it} className="flex gap-3 text-foreground/75 text-sm">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-1" strokeWidth={2.5} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-foreground/55 italic">
                  You'll quickly learn the "normal range" and spot trends.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-line bg-card shadow-soft p-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
                  Weekly — what pros do
                </div>
                <h3 className="font-serif text-2xl mb-4">Once a week, look at</h3>
                <ul className="space-y-3">
                  {RATE_WEEKLY.map((it) => (
                    <li key={it} className="flex gap-3 text-foreground/75 text-sm">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-1" strokeWidth={2.5} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-foreground/55 italic">
                  Rates usually move before the headlines hit mainstream news.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* PART B — Why a broker beats a retail bank */}
        <div>
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
              Smart Shopping
            </div>
            <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
              Why a broker beats <span className="italic text-gold">a retail bank.</span>
            </h2>
            <p className="mt-5 text-foreground/65 max-w-3xl leading-relaxed">
              When financing a home, many borrowers assume their local bank or a large national
              lender will automatically deliver the best deal. In reality, mortgage brokers
              frequently deliver more competitive rates, better loan structures, and a higher level
              of personal service — because brokers work for the homeowner, not for a single
              institution.
            </p>
          </Reveal>

          <ol className="mt-10 grid md:grid-cols-2 gap-5">
            {BROKER_REASONS.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 60}>
                <li className="h-full rounded-2xl border border-line bg-card p-6 flex gap-5">
                  <span className="font-serif text-3xl text-gold/40 leading-none mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-serif text-lg mb-1.5">{r.title}</div>
                    <p className="text-foreground/70 leading-relaxed text-sm">{r.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
