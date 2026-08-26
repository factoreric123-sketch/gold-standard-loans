import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Phone, Users } from "lucide-react";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { ProgramExtras } from "@/components/site/ProgramExtras";
import { Reveal } from "@/components/site/motion";
import {
  PROGRAMS,
  programBySlug,
  PHONE_DISPLAY,
  PHONE_TEL,
  COMPANY_NAME,
  APPLY_URL,
} from "@/lib/site-data";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    if (!programBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const program = programBySlug(params.slug);
    if (!program) return {};
    return {
      meta: [
        { title: `${program.name} Loans | ${COMPANY_NAME}` },
        { name: "description", content: program.tagline },
        { property: "og:title", content: `${program.name} Loans | ${COMPANY_NAME}` },
        { property: "og:description", content: program.tagline },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/programs/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/programs/${params.slug}` }],
    };
  },
  component: ProgramPage,
});

function ProgramPage() {
  const { slug } = Route.useParams();
  const program = programBySlug(slug)!;
  const Icon = program.icon;
  const others = PROGRAMS.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-cream to-background border-b border-line">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <Reveal>
              <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-foreground/45">
                <Link to="/" className="hover:text-gold">
                  Home
                </Link>
                <span>/</span>
                <a href="/#programs" className="hover:text-gold">
                  Mortgage Products
                </a>
                <span>/</span>
                <span className="text-foreground/70">{program.name}</span>
              </nav>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold">
                  Loan Program
                </div>
              </div>

              <h1 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
                {program.name}
              </h1>
              <p className="mt-4 font-serif italic text-2xl md:text-3xl text-gold">
                {program.tagline}
              </p>
              <p className="mt-7 text-lg text-foreground/70 leading-relaxed max-w-2xl">
                {program.overview}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity shadow-soft"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 border border-foreground/20 rounded-full px-7 py-3.5 text-sm tracking-wide hover:border-foreground/50 hover:bg-accent transition-colors"
                >
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Details */}
        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 lg:gap-16">
            <Reveal>
              <h2 className="font-serif text-3xl mb-7">Key highlights</h2>
              <ul className="space-y-4">
                {program.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-gold/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                    </span>
                    <span className="text-foreground/75 leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-card shadow-soft p-8">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold mb-6">
                  <Users className="w-4 h-4" /> Who it's for
                </div>
                <ul className="space-y-4">
                  {program.idealFor.map((who) => (
                    <li key={who} className="flex gap-3 text-foreground/75 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{who}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Generic rich extras (paragraphs, numbered, cards, lists, formulas) for programs that ship them */}
        {program.extras && <ProgramExtras sections={program.extras} />}

        {/* Credit-score guide — rendered only for programs that ship this content (e.g. low-credit-score) */}
        {program.creditTiers && (
          <section className="bg-off-white border-t border-line">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
              <Reveal>
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                  Credit Score Guide
                </div>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  Where you stand — and your <span className="italic text-gold">best path.</span>
                </h2>
                <p className="mt-4 text-foreground/65 max-w-2xl leading-relaxed">
                  A lower credit score doesn't have to end your homeownership plans. Here's the
                  clean breakdown of options by loan type, what lenders weigh beyond your score, and
                  ways to improve it quickly.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h3 className="font-serif text-2xl mt-12 mb-6">
                  Minimum credit scores by loan type
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {program.creditTiers.map((t) => (
                    <div key={t.name} className="rounded-2xl border border-line bg-card p-7">
                      <div className="font-serif text-xl mb-1.5">{t.name}</div>
                      <div className="text-[11px] uppercase tracking-widest text-gold mb-4">
                        {t.score}
                      </div>
                      <ul className="space-y-2 text-sm text-foreground/70">
                        {t.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>

              {program.lowScoreOptions && (
                <Reveal delay={80}>
                  <div className="mt-12 rounded-2xl border border-line bg-card p-7 md:p-8">
                    <h3 className="font-serif text-2xl mb-5">
                      If your score is really low (500–580)
                    </h3>
                    <ul className="space-y-3">
                      {program.lowScoreOptions.map((o) => (
                        <li key={o} className="flex gap-3 text-foreground/75 leading-relaxed">
                          <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" strokeWidth={2.25} />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {(program.lenderConsiderations || program.improvementTips) && (
                <div className="mt-10 grid md:grid-cols-2 gap-5">
                  {program.lenderConsiderations && (
                    <Reveal>
                      <div className="h-full rounded-2xl border border-line bg-card p-7">
                        <h3 className="font-serif text-xl mb-4">What lenders also weigh</h3>
                        <ul className="space-y-3 text-sm text-foreground/70">
                          {program.lenderConsiderations.map((l) => (
                            <li key={l} className="flex gap-2.5">
                              <Check
                                className="w-4 h-4 text-gold shrink-0 mt-0.5"
                                strokeWidth={2.5}
                              />
                              <span>{l}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  )}
                  {program.improvementTips && (
                    <Reveal delay={80}>
                      <div className="h-full rounded-2xl border border-line bg-card p-7">
                        <h3 className="font-serif text-xl mb-4">
                          Fast credit improvement (30–90 days)
                        </h3>
                        <ul className="space-y-3 text-sm text-foreground/70">
                          {program.improvementTips.map((t) => (
                            <li key={t} className="flex gap-2.5">
                              <Check
                                className="w-4 h-4 text-gold shrink-0 mt-0.5"
                                strokeWidth={2.5}
                              />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  )}
                </div>
              )}

              {program.bottomLine && (
                <Reveal>
                  <div className="mt-10 rounded-2xl bg-charcoal text-background p-7 md:p-8">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                      Bottom line
                    </div>
                    <ul className="space-y-3">
                      {program.bottomLine.map((b) => (
                        <li key={b} className="flex gap-3 text-background/85 leading-relaxed">
                          <ArrowRight className="w-4 h-4 text-gold shrink-0 mt-1.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              <p className="mt-8 text-xs text-foreground/45 leading-relaxed max-w-3xl">
                Educational guidance only. Final eligibility, terms, and rate depend on the lender's
                underwriting, program guidelines, and your complete file.
              </p>
            </div>
          </section>
        )}

        {/* CTA band */}
        <section className="bg-charcoal text-background">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 text-center">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl text-background leading-tight">
                Ready to explore a <span className="italic text-gold">{program.name}</span> loan?
              </h2>
              <p className="mt-4 text-background/70 max-w-xl mx-auto leading-relaxed">
                One quick call with Warren and you'll know exactly what you qualify for — no
                obligation, no call center.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-background/30 text-background rounded-full px-7 py-3.5 text-sm tracking-wide hover:bg-background/10 transition-colors"
                >
                  Request my rate <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Other programs */}
        <section className="bg-off-white border-t border-line">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <Reveal>
              <div className="flex items-end justify-between gap-4 mb-10">
                <h2 className="font-serif text-3xl md:text-4xl">Explore other mortgage products</h2>
                <a
                  href="/#programs"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm tracking-wide text-gold border-b border-gold/60 pb-0.5 hover:border-gold transition-colors"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {others.map((p, i) => {
                const OtherIcon = p.icon;
                return (
                  <Reveal key={p.slug} delay={(i % 4) * 60} className="h-full">
                    <Link
                      to="/programs/$slug"
                      params={{ slug: p.slug }}
                      className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-gold/40"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                        <OtherIcon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-lg mb-1">{p.name}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{p.description}</p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-foreground/70 hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
