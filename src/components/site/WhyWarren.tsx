import { Star } from "lucide-react";
import { STATS, ZILLOW_URL, REVIEWS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function WhyWarren() {
  const featured = REVIEWS[0];
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
          <figure className="rounded-2xl border border-background/15 bg-background/[0.04] p-9 md:p-10">
            <div className="flex gap-1 mb-6">
              {[...Array(featured.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="font-serif italic text-2xl md:text-3xl leading-snug text-background">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm text-background/75">
              <span className="text-background">{featured.name}</span> · {featured.location}
              <span className="block text-[11px] uppercase tracking-widest text-background/55 mt-1.5">
                Verified Zillow Review · {featured.date}
              </span>
            </figcaption>
            <a
              href={ZILLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-gold/60 text-gold rounded-full px-6 py-3 text-sm tracking-wide hover:bg-gold/10 transition-colors"
            >
              Read all reviews on Zillow →
            </a>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
