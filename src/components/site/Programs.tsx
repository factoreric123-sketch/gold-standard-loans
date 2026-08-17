import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PROGRAMS, RATES } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function Programs() {
  return (
    <section id="programs" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
            Mortgage Products
          </div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
            Every loan type. <span className="italic text-gold">One trusted broker.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-xl leading-relaxed">
            From first-time buyers to seasoned investors — purchase, refinance, or cash-out, there's
            a program built for your file.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 border border-line bg-card">
            <div className="flex items-center justify-between border-b border-line px-6 py-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/55">
                Today's Rates
              </span>
              <span className="text-[11px] uppercase tracking-widest text-gold">Live</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-line lg:divide-x">
              {RATES.map((r) => (
                <div key={r.name} className="px-6 py-5">
                  <div className="font-serif text-3xl text-foreground">{r.rate}</div>
                  <div className="mt-1 text-sm tracking-wide text-foreground/70">{r.name}</div>
                  {r.note && (
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-gold">
                      {r.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="border-t border-line px-6 py-3 text-xs text-foreground/45 italic">
              Rates updated daily · Subject to change. APR varies by credit &amp; program.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PROGRAMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name} delay={(i % 4) * 70} className="h-full">
                <Link
                  to="/programs/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-gold/40"
                >
                  <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-gold/15">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl mb-1.5">{p.name}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{p.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold transition-all group-hover:gap-2.5">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
