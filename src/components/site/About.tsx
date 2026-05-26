import portrait from "@/assets/warren-portrait.webp";
import {
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

export function About() {
  return (
    <section id="about" className="bg-off-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        <Reveal className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-soft-lg ring-1 ring-line">
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
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">About</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            The man behind <span className="italic text-gold">the lowest rate.</span>
          </h2>
          <div className="mt-9">
            <div className="font-serif text-3xl">{BROKER_NAME}</div>
            <div className="text-sm uppercase tracking-widest text-foreground/55 mt-1">
              Mortgage Broker · President
            </div>
          </div>
          <p className="mt-7 text-foreground/70 leading-relaxed text-lg">
            For nearly three decades, Warren Factor has helped Florida families and investors
            finance homes, rentals, and commercial properties at rates the big banks rarely match.
            As founder of The Discount Mortgage Store, he runs every file personally — from first
            call to closing — with the leverage of a 100+ lender network behind him.
          </p>

          <ul className="mt-9 space-y-2.5 text-sm text-foreground/70">
            {credentials.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-9 inline-flex items-center gap-2 text-sm tracking-wide border-b border-gold/60 pb-0.5 text-foreground hover:border-gold transition-colors"
          >
            Talk to Warren directly — {PHONE_DISPLAY}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
