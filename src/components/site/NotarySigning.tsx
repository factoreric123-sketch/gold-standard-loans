import { BookOpenCheck, Stamp, FileCheck2, MapPin, Clock, ArrowRight } from "lucide-react";
import { PHONE_TEL, PHONE_DISPLAY, EMAIL, EMAIL_DISPLAY } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

const HANDLED = [
  "Complete closing and loan-signing packages",
  "Borrower identity verification",
  "Walking signers through each document",
  "Witnessing signatures and notarizing the executed set",
  "Signed, notarized, and returned as one complete package",
];

const SERVED = [
  "Title companies",
  "Escrow and closing officers",
  "Lenders and mortgage banks",
  "Closing attorneys",
  "Real estate agents",
];

const COVERAGE = [
  {
    icon: BookOpenCheck,
    title: "Deep Document Fluency",
    body: "I know mortgage packages inside and out — notes, deeds, CDs, TRID disclosures, and commercial loan documents — so signings are accurate and complete the first time, with no missed signatures or initials.",
  },
  {
    icon: Stamp,
    title: "Loan Package Closings",
    body: "I run closing packages end to end — set up the table, verify IDs, walk every signer through the documents, and notarize the executed set so nothing comes back incomplete.",
  },
  {
    icon: Clock,
    title: "Scheduled Around Your Closing",
    body: "Evening and weekend appointments, booked to the closing table rather than the other way around, so a signing never holds up a funding date.",
  },
  {
    icon: MapPin,
    title: "Boca Raton & South Florida",
    body: "Boca Raton, Deerfield Beach, Fort Lauderdale, Miami and the surrounding counties — at your office, the borrower's location, or ours.",
  },
];

export function NotarySigning() {
  return (
    <section id="notary" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
            Also Available
          </div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">
            Notary Signing Agent for <span className="italic text-gold">closing packages.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-2xl leading-relaxed">
            Alongside the brokerage, Warren Factor works as a notary signing agent handling loan
            closing packages across Boca Raton and South Florida. One point of contact from the
            package handoff to the returned, fully executed file.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
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
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
