import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { ArrowRight, Phone, ShieldCheck, Mail, MapPin } from "lucide-react";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { Reveal } from "@/components/site/motion";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  EMAIL_DISPLAY,
  ADDRESS,
  NMLS,
  COMPANY_NMLS,
  COMPANY_NAME,
  BROKER_NAME,
  SINCE_YEAR,
  APPLY_URL,
} from "@/lib/site-data";
import heroImg from "@/assets/hometown-heroes.jpg";

export const Route = createFileRoute("/special-programs")({
  head: () => ({
    meta: [
      {
        title: "Hometown Heroes Florida — Up to $35,000 for Your First Home",
      },
      {
        name: "description",
        content:
          "Florida community heroes can get up to $35,000 for down payment and closing costs, making 100% financing possible on a first home.",
      },
      {
        property: "og:title",
        content: "Hometown Heroes Florida — Up to $35,000 for Your First Home",
      },
      {
        property: "og:description",
        content:
          "Up to $35,000 in down payment & closing-cost assistance for Florida's community heroes. 100% financing possible on your first home.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SpecialProgramsPage,
});

const stats = [
  { n: "$35K", label: "Down payment & closing costs" },
  { n: "Less", label: "Processing fee" },
  { n: "Fast", label: "Dedicated support" },
];

const qualifying = [
  {
    title: "Law Enforcement",
    body: "Police officers, sheriff's deputies, state troopers & 911 dispatchers",
  },
  {
    title: "Firefighters",
    body: "Career, volunteer & department staff",
  },
  {
    title: "First Responders",
    body: "Police officers, firefighters, EMTs & emergency personnel",
  },
  {
    title: "Healthcare Professionals",
    body: "Doctors, nurses, aides, EMTs, paramedics & hospital staff",
  },
  {
    title: "K-12 Educators & Staff",
    body: "Teachers, administrators, counselors & support staff",
  },
  {
    title: "Childcare Center Employees",
    body: "Daycare teachers, aides & early-learning center staff",
  },
  {
    title: "Public Safety, Court & Corrections",
    body: "Court officers, correctional officers & public-safety staff",
  },
  {
    title: "Military",
    body: "Active duty, veterans & National Guard members",
  },
];

const benefits = [
  {
    title: "Up to $35,000",
    body: "Use it toward your down payment and closing costs.",
  },
  {
    title: "Discounted Processing Fee",
    body: "We'll reduce your loan's processing fee.",
  },
  {
    title: "Dedicated Support",
    body: "A smooth process with a team that genuinely cares.",
  },
  {
    title: "Better Together",
    body: "Pair low rates with fast closings for even more value.",
  },
];

const grantPrograms = [
  {
    name: "Hometown Heroes",
    amount: "Up to $35,000",
    type: "Deferred 0% second mortgage (forgivable)",
    who: "Community heroes — law enforcement, firefighters, healthcare, educators, military & more",
    url: "https://www.floridahousing.org/programs/hometown-heroes",
  },
  {
    name: "HFA Preferred",
    amount: "3% of loan amount",
    type: "Forgivable grant — no repayment required",
    who: "First-time homebuyers meeting income & purchase-price limits",
    url: "https://www.floridahousing.org/programs/hfa-preferred",
  },
  {
    name: "HFA Preferred Plus",
    amount: "4% of loan amount",
    type: "Forgivable grant — no repayment required",
    who: "First-time buyers needing maximum down payment help",
    url: "https://www.floridahousing.org/programs/hfa-preferred-plus",
  },
  {
    name: "Florida Assist (FL Assist)",
    amount: "Up to $7,500",
    type: "Deferred 0% second mortgage",
    who: "First-time homebuyers at or below 80% area median income",
    url: "https://www.floridahousing.org/programs/fl-assist",
  },
  {
    name: "Salute Our Soldiers",
    amount: "Up to $10,000",
    type: "Deferred 0% second mortgage",
    who: "Active-duty military, veterans & surviving spouses",
    url: "https://www.floridahousing.org/programs/salute-our-soldiers",
  },
];

function SpecialProgramsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        {/* Grant Money overview */}
        <section className="bg-cream border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Florida grant money
              </div>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.04] tracking-tight max-w-3xl">
                Get grants for your{" "}
                <span className="italic text-gold">Florida mortgage.</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/70 max-w-2xl leading-relaxed">
                Florida offers real down-payment and closing-cost assistance — some of it a
                true grant you never have to repay. Below are the active programs administered
                by the Florida Housing Finance Corporation. Warren Factor will match you to
                the one that fits your file and handle the paperwork start to finish.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {grantPrograms.map((g, i) => (
                <Reveal key={g.name} delay={(i % 2) * 70} className="h-full">
                  <div className="group h-full flex flex-col rounded-xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-gold/40">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl">{g.name}</h3>
                      <span className="font-serif text-2xl text-gold whitespace-nowrap">
                        {g.amount}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-gold">
                      {g.type}
                    </p>
                    <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                      {g.who}
                    </p>
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-foreground/55 hover:text-gold transition-colors"
                    >
                      Official program <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 text-xs text-foreground/45 italic max-w-2xl leading-relaxed">
              Assistance amounts, eligibility, and program availability are set by the Florida
              Housing Finance Corporation and are subject to change. Not every applicant
              qualifies for every program. This is not a commitment to lend.
            </p>
          </div>
        </section>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-cream to-background">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60 bg-background/70 border border-line rounded-full px-3.5 py-1.5 mb-7">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" strokeWidth={1.75} />
                Florida first-time homebuyers
              </div>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.04] tracking-tight">
                Own a Home
                <br />
                With Little Money Down
              </h1>
              <p className="mt-5 font-serif italic text-2xl md:text-3xl text-gold">
                Hometown Heroes Florida
              </p>
              <p className="mt-6 text-lg text-foreground/70 max-w-xl leading-relaxed">
                Get up to $35,000 for your down payment and closing costs — little to no
                money needed to buy your dream home.
              </p>
              <p className="mt-4 text-base text-foreground/60 max-w-xl leading-relaxed">
                If you work in an eligible service field, this program can get you up to
                $35,000 in assistance and could help you reach 100% financing on your first
                home.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity shadow-soft"
                >
                  Get qualified <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 border border-foreground/20 rounded-full px-7 py-3.5 text-sm tracking-wide hover:border-foreground/50 hover:bg-accent transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <img
                  src={heroImg}
                  alt="A police officer, firefighter, nurse and soldier standing together"
                  width={1600}
                  height={912}
                  className="w-full h-[300px] md:h-[440px] object-cover rounded-2xl border border-line shadow-soft"
                />
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-line bg-card p-4 text-center"
                    >
                      <div className="font-serif text-2xl md:text-3xl text-gold">
                        {s.n}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-widest text-foreground/55 leading-tight">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Who qualifies */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Eligibility
              </div>
              <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-tight">
                Who qualifies?
              </h2>
              <p className="mt-4 text-foreground/60 max-w-xl leading-relaxed">
                If you serve your community in any of these fields, the Hometown Heroes
                program is built for you.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {qualifying.map((q, i) => (
                <Reveal key={q.title} delay={(i % 4) * 60} className="h-full">
                  <div className="group h-full flex flex-col rounded-xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-gold/40">
                    <h3 className="font-serif text-xl mb-2">{q.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{q.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusive benefits */}
        <section className="bg-off-white border-t border-line">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                What you get
              </div>
              <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-tight">
                Exclusive benefits
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={(i % 4) * 60} className="h-full">
                  <div className="h-full flex flex-col rounded-xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-gold/40">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                      <ShieldCheck className="w-5 h-5 text-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl mb-1.5">{b.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{b.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-charcoal text-background">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-24 text-center">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-5xl text-background leading-tight">
                Your Florida dream home could be{" "}
                <span className="italic text-gold">100% financed.</span>
              </h2>
              <p className="mt-4 text-background/70 max-w-xl mx-auto leading-relaxed">
                Talk to {BROKER_NAME}. Contact Warren directly to find out how to get
                qualified for the Hometown Heroes program.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-4 h-4" /> Call or Text {PHONE_DISPLAY}
                </a>
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-background/30 text-background rounded-full px-7 py-3.5 text-sm tracking-wide hover:bg-background/10 transition-colors"
                >
                  Get qualified <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Warren bio */}
        <section className="bg-background border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-24 grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <Reveal>
              <div className="w-20 h-20 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                <span className="font-serif text-2xl text-gold">WF</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-3">
                Your broker
              </div>
              <h3 className="font-serif text-2xl md:text-3xl">{BROKER_NAME}</h3>
              <div className="text-sm uppercase tracking-widest text-foreground/50 mt-1 mb-5">
                Mortgage Broker · President
              </div>
              <p className="text-foreground/70 leading-relaxed max-w-2xl">
                For nearly three decades, Warren has helped Florida families and investors
                finance homes, rentals, and commercial properties at rates the big banks
                rarely match. As founder of {COMPANY_NAME}, he runs every file personally —
                from first call to closing — with the leverage of a deep lender network
                behind him.
              </p>

              <div className="mt-7 grid sm:grid-cols-2 gap-4 text-sm">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2.5 text-foreground/75 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" /> {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2.5 text-foreground/75 hover:text-gold transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0" /> {EMAIL_DISPLAY}
                </a>
                <div className="inline-flex items-center gap-2.5 text-foreground/75 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-gold shrink-0" /> {ADDRESS}
                </div>
              </div>

              <div className="mt-6 text-xs text-foreground/45 leading-relaxed max-w-2xl">
                {COMPANY_NMLS}. Licensed: Fannie Mae · Freddie Mac · FHA · VA · Commercial.
                Serving 32 States. Since {SINCE_YEAR}.
                <br />
                {NMLS}. Equal Housing Lender. This is not a commitment to lend. Terms and
                conditions apply. Program subject to change or cancellation without notice.
                Other restrictions may apply.
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
