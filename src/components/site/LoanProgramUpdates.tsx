import { Link } from "@tanstack/react-router";
import { ArrowRight, Construction, Hammer, KeyRound, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

type Spec = { k: string; v: string; accent?: boolean };

type Update = {
  slug: string;
  name: string;
  icon: typeof Hammer;
  lead: string;
  specs: Spec[];
};

const UPDATES: Update[] = [
  {
    slug: "fix-and-flip",
    name: "Fix & Flip, Bridge",
    icon: Hammer,
    lead: "Short-term rehab capital — purchase and renovation funded together.",
    specs: [
      { k: "Purchase", v: "Up to 92.5% of purchase" },
      { k: "Rehab", v: "100% of rehab financed" },
      { k: "Rate", v: "From 9.99%" },
      { k: "Property types", v: "SFR, multi-family, mixed use", accent: true },
      { k: "Experience", v: "No experience OK" },
      { k: "ARV LTV", v: "Up to 75%" },
      { k: "Loan amounts", v: "$75K – $10MM" },
      { k: "Purpose", v: "Refi or purchase" },
      { k: "Credit", v: "600+" },
    ],
  },
  {
    slug: "ground-up-construction",
    name: "Ground-Up Construction",
    icon: Construction,
    lead: "Land and build funded for new single-family, multi-family and mixed-use projects.",
    specs: [
      { k: "Leverage", v: "Up to 80% total LTC" },
      { k: "Construction", v: "Up to 100% financed" },
      { k: "Rate", v: "From 10.99%" },
      { k: "Property types", v: "SFR, multi-family, mixed use", accent: true },
      { k: "Experience", v: "1 ground-up completed" },
      { k: "Term", v: "12 – 24 months" },
      { k: "Loan amounts", v: "$75K – $10MM" },
      { k: "Purpose", v: "Refi or purchase" },
      { k: "Credit", v: "680+" },
    ],
  },
  {
    slug: "no-doc-rental",
    name: "No-Doc 30-Yr Rental",
    icon: KeyRound,
    lead: "Long-term rental financing that qualifies on the property, not your tax returns.",
    specs: [
      { k: "Purchase", v: "Up to 80% of purchase" },
      { k: "Refinance", v: "80% refi, 75% cash-out" },
      { k: "Rate", v: "From 5.5%" },
      { k: "Property types", v: "SFR, multi-family & portfolio", accent: true },
      { k: "Term", v: "30 years fixed" },
      { k: "DSCR", v: "No-DSCR option available" },
      { k: "Loan amounts", v: "$75K – $50MM+" },
      { k: "Purpose", v: "Refi or purchase" },
      { k: "Credit", v: "660+ (650 non-DSCR)" },
    ],
  },
];

export function LoanProgramUpdates() {
  return (
    <section id="loan-program-updates" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
            Loan Program Updates
          </div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
            Investor guidelines, <span className="italic text-gold">at a glance.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-xl leading-relaxed">
            Three programs for flippers, builders and buy-and-hold investors. Every figure below is
            live on the page — tap any program for the full guidelines.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {UPDATES.map((u, i) => {
            const Icon = u.icon;
            return (
              <Reveal key={u.slug} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col border border-line bg-card border-t-[3px] border-t-orange">
                  <div className="px-6 pt-6 pb-5 border-b border-line">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-orange-deep" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-2xl leading-tight">{u.name}</h3>
                    </div>
                    <p className="mt-3 text-sm text-foreground/60 leading-relaxed">{u.lead}</p>
                  </div>

                  <dl className="px-6 py-2 grow">
                    {u.specs.map((s) => (
                      <div
                        key={s.k}
                        className="flex items-baseline justify-between gap-4 py-2 border-b border-line last:border-b-0"
                      >
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 shrink-0">
                          {s.k}
                        </dt>
                        <dd
                          className={
                            s.accent
                              ? "text-right text-sm font-medium text-orange-deep leading-snug"
                              : "text-right text-sm text-foreground leading-snug"
                          }
                        >
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="px-6 pb-6 pt-4 border-t border-line">
                    <Link
                      to="/programs/$slug"
                      params={{ slug: u.slug }}
                      className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-gold transition-all hover:gap-2.5"
                    >
                      View more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/fix-and-flip-application"
              className="inline-flex items-center gap-2 bg-charcoal text-background px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Apply now <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 border border-line px-6 py-3.5 text-sm tracking-wide text-foreground/75 hover:border-gold hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4 text-gold" /> {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
