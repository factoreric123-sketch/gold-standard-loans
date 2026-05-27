import { STATS, ZILLOW_URL } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function WhyWarren() {
  return (
    <section id="why" className="bg-charcoal text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Why Warren</div>
          <h2 className="font-serif text-4xl md:text-5xl text-background leading-tight">
            Not a bank. Not a call center. <span className="italic text-gold">Your broker.</span>
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-background/15 bg-background/[0.03] p-6"
              >
                <div className="font-serif text-5xl text-gold">
                  {s.value}
                  {s.suffix ?? ""}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-background/65 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-background/70 leading-relaxed max-w-lg">
            Banks offer one rate sheet — their own. As an independent broker, Warren shops 100+
            lenders on every file, then hands you the lowest qualifying offer. No quotas, no upsell,
            no waiting in a call queue. Just a 28-year veteran negotiating on your behalf.
          </p>
        </Reveal>

        <Reveal delay={120} className="lg:mt-4">
          <div className="rounded-2xl border border-background/15 bg-background/[0.04] p-9 md:p-10">
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
              Client Reviews
            </div>
            <p className="font-serif text-2xl md:text-3xl leading-snug text-background">
              Hear it straight from Warren's clients.
            </p>
            <p className="mt-5 text-background/65 leading-relaxed">
              Real reviews from borrowers Warren has helped finance and close are published on his
              Zillow lender profile.
            </p>
            <a
              href={ZILLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-gold/60 text-gold rounded-full px-6 py-3 text-sm tracking-wide hover:bg-gold/10 transition-colors"
            >
              Read reviews on Zillow →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
