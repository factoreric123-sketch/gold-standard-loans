import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/motion";
import { SITE_URL, PHONE_TEL, PHONE_DISPLAY, EMAIL, EMAIL_DISPLAY } from "@/lib/site-data";
import { COVERAGE, HANDLED, SERVED } from "@/components/site/NotarySigning";

const TITLE = "Notary Signing Agent | The Discount Mortgage Store";
const DESC =
  "Warren Factor is a notary signing agent handling closing loan packages in Boca Raton and South Florida — accurate, complete signings, returned as one file.";

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

const STEPS = [
  {
    title: "Package handoff",
    body: "Send the closing package and signing instructions ahead of the appointment, or tell me where the file is queued.",
  },
  {
    title: "Time and place",
    body: "The signing is booked around the closing table — your office, the borrower's location, or ours.",
  },
  {
    title: "Identity verification",
    body: "Borrower identification is checked and the notarial record is completed for every signature.",
  },
  {
    title: "Document walkthrough",
    body: "Each signer is taken through every page — notes, deeds, closing disclosures, TRID disclosures — before anything is signed.",
  },
  {
    title: "Notarization",
    body: "Signatures and initials are witnessed and notarized, and seals are applied to the executed set.",
  },
  {
    title: "File returned",
    body: "The signed, notarized package comes back as one complete set, ready to fund.",
  },
];

const FAQ = [
  {
    q: "What areas do you cover?",
    a: "Boca Raton and the surrounding South Florida counties — Deerfield Beach, Fort Lauderdale, Miami and the areas between.",
  },
  {
    q: "Where does the signing take place?",
    a: "At your office, the borrower's location, or ours — whichever is booked for the closing.",
  },
  {
    q: "What document types do you handle?",
    a: "Residential and commercial mortgage packages: notes, deeds, closing disclosures, TRID disclosures and the related loan documents.",
  },
  {
    q: "How do I get a quote?",
    a: "Call or email with the loan type, the number of signers and the location. Fees depend on the package.",
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
              Boca Raton &amp; South Florida
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl">
              Notary Signing Agent for{" "}
              <span className="italic text-gold">closing packages.</span>
            </h1>
            <p className="mt-6 text-foreground/60 max-w-2xl leading-relaxed">
              Warren Factor handles loan closing packages end to end — from the package handoff to
              the returned, fully executed file — so a signing never comes back incomplete and never
              holds up a funding date.
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

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal>
            <blockquote className="max-w-4xl border-l-2 border-gold pl-6 md:pl-8">
              <p className="font-serif text-2xl md:text-3xl italic leading-snug text-foreground">
                &ldquo;I know mortgage packages inside and out — notes, deeds, CDs, TRID disclosures,
                and commercial loan documents — so signings are accurate and complete the first
                time.&rdquo;
              </p>
              <footer className="mt-4 text-[11px] uppercase tracking-[0.25em] text-gold">
                Warren Factor, Notary Signing Agent
              </footer>
            </blockquote>
          </Reveal>
        </section>

        <section className="border-t border-line bg-off-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">How a signing runs</h2>
              <p className="text-foreground/60 max-w-2xl mb-12">
                Six steps, in the same order every time, so everyone at the closing table knows what
                happens and when.
              </p>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 70} className="h-full">
                  <div className="h-full border border-line bg-background p-6">
                    <div className="font-serif text-3xl text-gold leading-none mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-serif text-xl mb-2">{s.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl mb-12">What each signing covers</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {COVERAGE.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 80} className="h-full">
                  <div className="h-full border border-line bg-card p-6">
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
        </section>

        <section className="border-t border-line bg-charcoal">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal>
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-6">
                  Who this serves
                </div>
                <ul className="space-y-3 text-foreground/80">
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
                <ul className="space-y-3 text-foreground/80">
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
                    Send the package details and the closing date. Warren will confirm the time,
                    place and fee the same day.
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
