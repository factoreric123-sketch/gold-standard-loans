import { BookOpenCheck, FileCheck2, ShieldCheck, Building2, MapPin, ArrowRight } from "lucide-react";
import { PHONE_TEL, PHONE_DISPLAY, EMAIL, EMAIL_DISPLAY } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export const COVERAGE = [
  {
    icon: BookOpenCheck,
    title: "Deep Document Fluency",
    body: "I know mortgage packages inside and out — notes, deeds, CDs, TRID disclosures, and commercial loan documents — so signings are accurate and complete the first time, with no missed signatures or initials.",
  },
  {
    icon: FileCheck2,
    title: "Fewer Trailing Documents",
    body: "A lending background means fewer callback appointments and a faster, cleaner return of the executed package.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability and Professionalism",
    body: "Punctual, bonded, and experienced working directly with borrowers, attorneys, title agents and escrow officers.",
  },
  {
    icon: Building2,
    title: "Residential and Commercial",
    body: "From standard residential refinance and purchase packages to complex commercial transactions — comfortable in either setting.",
  },
  {
    icon: MapPin,
    title: "Local Coverage",
    body: "Based in Boca Raton, serving Palm Beach, Broward and Miami-Dade counties with flexible scheduling, including evenings and weekends.",
  },
];

export const SERVED = [
  "Title companies",
  "Escrow officers",
  "Closing attorneys",
  "Lenders and mortgage banks",
  "Borrowers directly",
];

export const HANDLED = [
  "Walk each signer through every document",
  "Verify borrower identity",
  "Witness signatures and notarize the executed set",
  "Return the package complete, with fewer trailing documents",
];

export function NotarySigning() {
  return (
    <section id="notary" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Also Available</div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">
            Notary Signing Agent for <span className="italic text-gold">closing packages.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-2xl leading-relaxed">
            Alongside the brokerage, Warren Factor handles closing loan packages across Boca Raton and
            South Florida — 28+ years in mortgage lending and roughly 1,000 closed residential and
            commercial transactions behind every signing.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {COVERAGE.map((c, i) => {
              const Icon = c.icon;
              const isLast = i === COVERAGE.length - 1;
              return (
                <Reveal
                  key={c.title}
                  delay={i * 80}
                  className={`h-full${isLast ? " sm:col-span-2" : ""}`}
                >
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

          <Reveal delay={120} className="lg:col-span-4">
            <div className="h-full border border-line bg-off-white p-8">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <FileCheck2 className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/70">
                  Who this serves
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground/70">
                {SERVED.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">
                  Every signing includes
                </div>
                <ul className="space-y-2.5 text-sm text-foreground/70">
                  {HANDLED.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-between gap-2 bg-gold text-gold-foreground px-6 py-4 text-sm tracking-wide hover:bg-gold/90 transition-colors"
                >
                  Call {PHONE_DISPLAY}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-between gap-2 border border-gold/60 px-6 py-4 text-sm tracking-wide text-foreground hover:bg-gold/10 transition-colors"
                >
                  Email a package
                  <span className="text-foreground/60 lowercase">{EMAIL_DISPLAY}</span>
                </a>
                <a
                  href="/notary"
                  className="inline-flex items-center justify-center gap-2 py-2 text-sm tracking-wide text-gold hover:underline"
                >
                  Full service details
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="pt-2 text-xs text-foreground/50 leading-relaxed">
                  Commission details, E&amp;O insurance information and references available on request.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
