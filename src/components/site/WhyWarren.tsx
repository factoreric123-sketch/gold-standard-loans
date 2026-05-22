import { Star } from "lucide-react";

const stats = [
  { n: "28", l: "Years Licensed" },
  { n: "32", l: "States Served" },
  { n: "5★", l: "Zillow Rated" },
  { n: "100+", l: "Lender Network" },
];

export function WhyWarren() {
  return (
    <section id="why" className="bg-charcoal text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-16">
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Why Warren</div>
          <h2 className="font-serif text-4xl md:text-5xl text-background leading-tight">
            Not a bank. Not a call center. <span className="italic text-gold">Your broker.</span>
          </h2>

          <div className="mt-12 grid grid-cols-2 border-t border-l border-gold/30">
            {stats.map(s => (
              <div key={s.l} className="border-r border-b border-gold/30 p-8">
                <div className="font-serif text-5xl md:text-6xl text-gold">{s.n}</div>
                <div className="text-[11px] uppercase tracking-widest text-background/70 mt-3">{s.l}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-background/75 leading-relaxed max-w-lg">
            Banks offer one rate sheet — their own. As an independent broker, Warren shops 100+ lenders
            on every file, then hands you the lowest qualifying offer. No quotas, no upsell, no waiting
            in a call queue. Just a 28-year veteran negotiating on your behalf.
          </p>
        </div>

        <div className="self-start border border-gold/40 p-10 bg-charcoal">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold" fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="font-serif italic text-2xl md:text-3xl leading-snug text-background">
            "Very responsive, secured competitive rates, and went above and beyond to make sure
            everything was handled."
          </blockquote>
          <div className="mt-8 text-[11px] uppercase tracking-widest text-background/60">
            Verified Zillow Review
          </div>
          <a
            href="https://www.zillow.com/lender-profile/WarrenFactor/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm text-gold border-b border-gold pb-0.5 hover:opacity-80"
          >
            Read all reviews on Zillow →
          </a>
        </div>
      </div>
    </section>
  );
}
