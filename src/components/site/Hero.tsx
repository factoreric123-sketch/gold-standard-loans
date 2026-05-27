import { Link } from "@tanstack/react-router";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { RATES, PHONE_DISPLAY, PHONE_TEL, NMLS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

const heroStats = [
  { n: "28", label: "Years Licensed" },
  { n: "32", label: "States" },
  { n: "5★", label: "Zillow" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60 bg-background/70 border border-line rounded-full px-3.5 py-1.5 mb-8">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" strokeWidth={1.75} />
            28 Years Licensed · {NMLS}
          </div>
          <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl leading-[1.04] tracking-tight">
            Florida's lowest
            <br />
            mortgage rates.
            <span className="block text-gold italic">Proven, not promised.</span>
          </h1>
          <p className="mt-7 text-lg text-foreground/65 max-w-lg leading-relaxed">
            Warren Factor shops 100+ lenders on every file and closes loans in 32 states. One call
            gets you a rate most banks simply won't offer.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity shadow-soft"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 border border-foreground/20 rounded-full px-7 py-3.5 text-sm tracking-wide hover:border-foreground/50 hover:bg-accent transition-colors"
            >
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl bg-card border border-line shadow-soft-lg p-7 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/55">
                Today's Rates
              </span>
              <span className="text-[11px] uppercase tracking-widest text-gold">Live</span>
            </div>
            <div className="divide-y divide-line">
              {RATES.map((r) => (
                <div key={r.name} className="flex items-center justify-between py-4">
                  <span className="text-sm tracking-wide text-foreground/70">{r.name}</span>
                  <span className="font-serif text-2xl text-foreground">{r.rate}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-foreground/45 italic">
              Rates updated daily · Subject to change. APR varies by credit & program.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-xl bg-card border border-line py-5 text-center">
                <div className="font-serif text-3xl text-gold">{s.n}</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/55 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
