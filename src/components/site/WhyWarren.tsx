import { Star } from "lucide-react";
import portrait from "@/assets/warren-portrait.webp";
import {
  STATS,
  ZILLOW_URL,
  GOOGLE_REVIEWS_URL,
  REVIEWS,
  NMLS,
  COMPANY_NMLS,
  ADDRESS,
  BROKER_NAME,
  PHONE_TEL,
  PHONE_DISPLAY,
} from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

const credentials = [
  NMLS,
  COMPANY_NMLS,
  ADDRESS,
  "Licensed: Fannie Mae · Freddie Mac · FHA · VA · Commercial",
  "Serving 32 States",
];

export function WhyWarren() {
  const featured = REVIEWS[0];
  return (
    <section id="why" className="bg-charcoal text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        {/* Warren portrait + details at top */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center mb-20 md:mb-24">
          <Reveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-background/15">
              <img
                src={portrait}
                alt="Warren M. Factor, Mortgage Broker"
                width={1254}
                height={1254}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
              Why Warren
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-background leading-tight">
              The man behind <span className="italic text-gold">the lowest rate.</span>
            </h2>
            <div className="mt-9">
              <div className="font-serif text-3xl">{BROKER_NAME}</div>
              <div className="text-sm uppercase tracking-widest text-background/55 mt-1">
                Mortgage Broker · President
              </div>
            </div>
            <p className="mt-7 text-background/70 leading-relaxed text-lg">
              For nearly three decades, Warren Factor has helped Florida families and investors
              finance homes, rentals, and commercial properties at rates the big banks rarely
              match. As founder of The Discount Mortgage Store, he runs every file personally —
              from first call to closing — with the leverage of a deep lender network behind him.
            </p>

            <ul className="mt-9 space-y-2.5 text-sm text-background/70">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-9 inline-flex items-center gap-2 text-sm tracking-wide border-b border-gold/60 pb-0.5 text-background hover:border-gold transition-colors"
            >
              Talk to Warren directly — {PHONE_DISPLAY}
            </a>
          </Reveal>
        </div>

        {/* Stats + review */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-serif text-2xl md:text-3xl text-background/80 italic leading-snug">
              Not a bank. Not a call center. <span className="text-gold">Your broker.</span>
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
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
              Banks offer one rate sheet — their own. As an independent broker, Warren shops every
              file across multiple lenders, then hands you the lowest qualifying offer. No quotas,
              no upsell, no waiting in a call queue. Just a 28-year veteran negotiating on your
              behalf.
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
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={ZILLOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gold/60 text-gold rounded-full px-6 py-3 text-sm tracking-wide hover:bg-gold/10 transition-colors"
                >
                  Read all reviews on Zillow →
                </a>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gold/60 text-gold rounded-full px-6 py-3 text-sm tracking-wide hover:bg-gold/10 transition-colors"
                >
                  Read our Google reviews →
                </a>
              </div>
            </figure>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
