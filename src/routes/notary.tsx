import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/motion";
import { SITE_URL, PHONE_TEL, PHONE_DISPLAY, EMAIL, EMAIL_DISPLAY } from "@/lib/site-data";
import { COVERAGE, HANDLED, SERVED } from "@/components/site/NotarySigning";

const TITLE = "Notary Signing Agent | The Discount Mortgage Store";
const DESC =
  "Warren M. Factor, notary signing agent in Boca Raton serving Palm Beach, Broward and Miami-Dade counties. Residential and commercial closings.";

export const Route = createFileRoute("/notary")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/notary` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/notary` }],
  }),
  component: NotaryPage,
});

const CREDENTIALS = [
  { figure: "28+", label: "years in mortgage lending" },
  { figure: "~1,000", label: "closed residential and commercial loans" },
  { figure: "Bonded", label: "E&O insurance available on request" },
  { figure: "Evenings", label: "and weekend scheduling" },
];

const BACKGROUND = [
  {
    role: "Owner and loan officer",
    org: "CRE Capital and Equity",
    body: "Commercial and residential lending, Boca Raton, Florida.",
  },
  {
    role: "Former loan officer and processor",
    org: "i3 Lending",
    body: "Handled loans from application through the closing table.",
  },
];

const EXPERIENCE = ["Originated", "Processed", "Underwritten", "Closed"];

const FAQ = [
  {
    q: "What areas do you cover?",
    a: "Based in Boca Raton, I serve Palm Beach, Broward and Miami-Dade counties.",
  },
  {
    q: "When are you available?",
    a: "Flexible scheduling, including evenings and weekends, so the signing fits the closing date rather than the other way around.",
  },
  {
    q: "Do you handle commercial packages?",
    a: "Yes — from standard residential refinance and purchase packages to complex commercial transactions.",
  },
  {
    q: "Can I see your credentials?",
    a: "Commission details, E&O insurance information and references are available on request, and I am happy to complete your onboarding or vendor-credentialing process.",
  },
];

function NotaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-line bg-cream">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
              Boca Raton &middot; Palm Beach, Broward &amp; Miami-Dade
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl">
              Notary Signing Agent for{" "}
              <span className="italic text-gold">closing packages.</span>
            </h1>
            <p className="mt-6 text-foreground/60 max-w-2xl leading-relaxed">
              I handle closing loan packages end to end — from the package handoff to the returned,
              fully executed file. With 28+ years in mortgage lending and approximately 1,000 closed
              residential and commercial transactions, I bring a familiarity with closing documents
              that goes well beyond standard notary service.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-sm tracking-wide text-gold-foreground transition-colors hover:bg-gold/90"
              >
                <Phone className="w-4 h-4" />
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 border border-gold/60 px-6 py-3.5 text-sm tracking-wide text-foreground transition-colors hover:bg-gold/10"
              >
                <Mail className="w-4 h-4 text-gold" />
                Email a package
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 divide-y divide-line sm:divide-y-0 sm:divide-x">
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c.figure} delay={i * 70}>
                <div className="px-2 py-10 lg:px-8">
                  <div className="font-serif text-4xl text-gold leading-none">{c.figure}</div>
                  <div className="mt-3 text-sm text-foreground/60 leading-snug">{c.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal>
            <blockquote className="max-w-4xl border-l-2 border-gold pl-6 md:pl-8">
              <p className="font-serif text-2xl md:text-3xl italic leading-snug text-foreground">
                &ldquo;I know mortgage packages inside and out — notes, deeds, CDs, TRID disclosures,
                and commercial loan documents — so signings are accurate and complete the first
                time.&rdquo;
              </p>
              <footer className="mt-4 text-[11px] uppercase tracking-[0.25em] text-gold">
                Warren M. Factor, CRE Capital and Equity
              </footer>
            </blockquote>
          </Reveal>
        </section>

        <section className="border-t border-line bg-off-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">What I offer</h2>
              <p className="text-foreground/60 max-w-2xl mb-12">
                Five things that decide whether a closing file comes back clean or comes back with
                questions.
              </p>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {COVERAGE.map((c, i) => {
                const Icon = c.icon;
                const span = `${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}${
                  i === COVERAGE.length - 1 ? " md:col-span-2" : ""
                }`;
                return (
                  <Reveal key={c.title} delay={i * 70} className={`h-full ${span}`}>
                    <div className="h-full border border-line bg-background p-6">
                      <div className="w-11 h-11 bg-gold/10 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-xl mb-2">{c.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{c.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-5">
                Why the lending background matters
              </h2>
              <p className="text-foreground/60 leading-relaxed mb-6">
                I have personally originated, processed, underwritten and closed loans — so I
                understand exactly what lenders need at the closing table, and what a file needs
                before it leaves the table.
              </p>
              <div className="flex flex-wrap gap-3">
                {EXPERIENCE.map((e) => (
                  <span
                    key={e}
                    className="border border-gold/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-gold"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-4">
                {BACKGROUND.map((b) => (
                  <div key={b.org} className="border border-line bg-card p-6">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
                      {b.role}
                    </div>
                    <div className="font-serif text-2xl mb-2">{b.org}</div>
                    <p className="text-sm text-foreground/60 leading-relaxed">{b.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line bg-charcoal">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal>
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-6">
                  Who this serves
                </div>
                <ul className="space-y-3 text-background/80">
                  {SERVED.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120}>
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-6">
                  Every signing includes
                </div>
                <ul className="space-y-3 text-background/80">
                  {HANDLED.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl mb-10">Common questions</h2>
          </Reveal>
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <div className="border-t border-line pt-5">
                  <h3 className="font-serif text-xl mb-2">{f.q}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-line bg-off-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="border border-line bg-background p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl mb-3">Book a signing</h2>
                  <p className="text-foreground/60 max-w-xl leading-relaxed">
                    Send the loan type, the number of signers and the closing date. Commission
                    details, E&amp;O insurance information and references are available on request, and
                    I am happy to complete your onboarding or vendor-credentialing process.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center justify-between gap-3 bg-gold px-6 py-4 text-sm tracking-wide text-gold-foreground transition-colors hover:bg-gold/90"
                  >
                    Call {PHONE_DISPLAY}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center justify-between gap-3 border border-gold/60 px-6 py-4 text-sm tracking-wide text-foreground transition-colors hover:bg-gold/10"
                  >
                    Email a package
                    <span className="text-foreground/60 lowercase">{EMAIL_DISPLAY}</span>
                  </a>
                </div>
              </div>
              <div className="mt-10 border-t border-line pt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <a href="/todays-rates" className="text-gold hover:underline">
                  Today&rsquo;s mortgage rates
                </a>
                <a href="/loan-match" className="text-gold hover:underline">
                  Find your loan program
                </a>
                <a href="/apply" className="text-gold hover:underline">
                  Apply for a loan
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
