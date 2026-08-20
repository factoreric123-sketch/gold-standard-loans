import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Phone, ArrowRight, Mail, Home as HomeIcon, KeyRound, FileSignature, HandCoins } from "lucide-react";
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
  SITE_URL,
} from "@/lib/site-data";

export const Route = createFileRoute("/buying-usa-home")({
  head: () => ({
    meta: [
      {
        title: "Expats Buying a USA Home | The Discount Mortgage Store",
      },
      {
        name: "description",
        content:
          "A step-by-step guide to buying a USA home — search listings in all 50 states, get pre-approved, and close with Warren Factor, licensed in 32 states since 1996.",
      },
      {
        property: "og:title",
        content: "Expats Buying a USA Home | The Discount Mortgage Store",
      },
      {
        property: "og:description",
        content:
          "Search US listings in all 50 states, get pre-approved, and close your home purchase with Warren Factor — direct lender pricing and 32-state coverage.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/buying-usa-home` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Expats Buying a USA Home | The Discount Mortgage Store",
      },
      {
        name: "twitter:description",
        content: "Search listings, get pre-approved, and close with Warren Factor — licensed in 32 states.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/buying-usa-home` }],
  }),
  component: BuyingUSAHomePage,
});

const POPULAR_CITIES: { name: string; query: string }[] = [
  { name: "Boca Raton", query: "Boca-Raton-FL" },
  { name: "West Palm Beach", query: "West-Palm-Beach-FL" },
  { name: "Fort Lauderdale", query: "Fort-Lauderdale-FL" },
  { name: "Miami", query: "Miami-FL" },
  { name: "Orlando", query: "Orlando-FL" },
  { name: "Tampa", query: "Tampa-FL" },
  { name: "Jacksonville", query: "Jacksonville-FL" },
  { name: "Naples", query: "Naples-FL" },
  { name: "Sarasota", query: "Sarasota-FL" },
  { name: "Cape Coral", query: "Cape-Coral-FL" },
  { name: "Austin", query: "Austin-TX" },
  { name: "Nashville", query: "Nashville-TN" },
  { name: "Phoenix", query: "Phoenix-AZ" },
  { name: "Charlotte", query: "Charlotte-NC" },
  { name: "Atlanta", query: "Atlanta-GA" },
  { name: "Dallas", query: "Dallas-TX" },
];

const US_STATES: { name: string; query: string }[] = [
  { name: "Alabama", query: "AL" },
  { name: "Alaska", query: "AK" },
  { name: "Arizona", query: "AZ" },
  { name: "Arkansas", query: "AR" },
  { name: "California", query: "CA" },
  { name: "Colorado", query: "CO" },
  { name: "Connecticut", query: "CT" },
  { name: "Delaware", query: "DE" },
  { name: "Florida", query: "FL" },
  { name: "Georgia", query: "GA" },
  { name: "Hawaii", query: "HI" },
  { name: "Idaho", query: "ID" },
  { name: "Illinois", query: "IL" },
  { name: "Indiana", query: "IN" },
  { name: "Iowa", query: "IA" },
  { name: "Kansas", query: "KS" },
  { name: "Kentucky", query: "KY" },
  { name: "Louisiana", query: "LA" },
  { name: "Maine", query: "ME" },
  { name: "Maryland", query: "MD" },
  { name: "Massachusetts", query: "MA" },
  { name: "Michigan", query: "MI" },
  { name: "Minnesota", query: "MN" },
  { name: "Mississippi", query: "MS" },
  { name: "Missouri", query: "MO" },
  { name: "Montana", query: "MT" },
  { name: "Nebraska", query: "NE" },
  { name: "Nevada", query: "NV" },
  { name: "New Hampshire", query: "NH" },
  { name: "New Jersey", query: "NJ" },
  { name: "New Mexico", query: "NM" },
  { name: "New York", query: "NY" },
  { name: "North Carolina", query: "NC" },
  { name: "North Dakota", query: "ND" },
  { name: "Ohio", query: "OH" },
  { name: "Oklahoma", query: "OK" },
  { name: "Oregon", query: "OR" },
  { name: "Pennsylvania", query: "PA" },
  { name: "Rhode Island", query: "RI" },
  { name: "South Carolina", query: "SC" },
  { name: "South Dakota", query: "SD" },
  { name: "Tennessee", query: "TN" },
  { name: "Texas", query: "TX" },
  { name: "Utah", query: "UT" },
  { name: "Vermont", query: "VT" },
  { name: "Virginia", query: "VA" },
  { name: "Washington", query: "WA" },
  { name: "West Virginia", query: "WV" },
  { name: "Wisconsin", query: "WI" },
  { name: "Wyoming", query: "WY" },
];

const STEPS = [
  {
    n: "01",
    icon: KeyRound,
    title: "Get pre-approved",
    body: "Start with a verified pre-approval — not a pre-qualification. Warren reviews your income, assets, and credit, then issues a direct-lender pre-approval letter that tells sellers you're serious and locks in your buying power.",
    detail: "Typically 1 business day",
  },
  {
    n: "02",
    icon: Search,
    title: "Find your home",
    body: "Search live Zillow listings in any of the 50 states by city, ZIP, or address. With your pre-approval in hand, you know your exact budget and can move the moment the right home hits the market.",
    detail: "On your timeline",
  },
  {
    n: "03",
    icon: FileSignature,
    title: "Make an offer",
    body: "Once you've found the home, Warren helps you structure a clean, competitive offer. Direct-lender pricing means no middleman markups, and your pre-approval backs your offer with real financing.",
    detail: "Same day",
  },
  {
    n: "04",
    icon: FileSignature,
    title: "Underwriting & appraisal",
    body: "After your offer is accepted, Warren's in-house underwriting takes over — ordering the appraisal, verifying your documents, and clearing conditions. One broker, one point of contact, no call-center handoffs.",
    detail: "2–3 weeks",
  },
  {
    n: "05",
    icon: HandCoins,
    title: "Close & get the keys",
    body: "Warren coordinates your final signing, wire, and funding. No surprise fees, no last-minute surprises — just a clear closing statement and the keys to your new US home.",
    detail: "30–45 days total",
  },
];

const TIPS = [
  {
    title: "Start with pre-approval, not the listing",
    body: "Knowing your budget before you search keeps you focused on homes you can actually finance — and lets you move the moment the right one appears.",
  },
  {
    title: "Lock your rate early",
    body: "Rates move daily. Warren locks your rate at the right moment so a market swing between offer and closing doesn't raise your payment.",
  },
  {
    title: "Budget for closing costs",
    body: "Beyond the down payment, plan for title, escrow, taxes, and insurance — typically 2–5% of the purchase price. Warren lays out every cost upfront.",
  },
  {
    title: "Pick the right loan program",
    body: "Conventional, FHA, VA, jumbo, or asset-based — the best fit depends on your credit, down payment, and goals. Warren matches you to the lowest-cost option.",
  },
  {
    title: "Inspect before you commit",
    body: "A professional home inspection protects you from costly surprises. Warren coordinates timing so your loan and your inspection stay in sync.",
  },
  {
    title: "One broker, 32 states",
    body: "Your single point of contact from pre-approval to closing — no call-center handoffs, no lost paperwork, no surprise fees.",
  },
];

const FAQ = [
  {
    q: "How much do I need for a down payment?",
    a: "It depends on the loan. Conventional loans can require as little as 3% down, FHA as little as 3.5%, and VA loans can be 0% down. Warren will quote your exact minimum once he reviews your file.",
  },
  {
    q: "What credit score do I need to buy a home in the USA?",
    a: "Conventional loans typically want 620+, FHA accepts lower scores, and asset-based or foreign national programs can qualify you without a US credit file at all. Warren finds the program that fits your profile.",
  },
  {
    q: "How long does the home-buying process take?",
    a: "From pre-approval to closing, most purchases close in 30–45 days. Warren's direct-lender underwriting keeps timelines tight and predictable.",
  },
  {
    q: "Can I buy a home in the USA if I live abroad or am not a US citizen?",
    a: "Yes. Warren closes foreign national, ITIN, and asset-based loans for international buyers. If that's your situation, visit our Mortgages for Expats page for tailored guidance.",
  },
  {
    q: "What's the difference between pre-qualification and pre-approval?",
    a: "A pre-qualification is a quick estimate. A pre-approval is a verified commitment from a lender — and it's what sellers expect to see with a serious offer. Warren issues real pre-approvals.",
  },
];

function BuyingUSAHomePage() {
  const [query, setQuery] = useState("");

  const zillowSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = query.trim().replace(/,/g, "").replace(/\s+/g, "-");
    const url = term
      ? `https://www.zillow.com/homes/for_sale/${encodeURIComponent(term)}_rb/`
      : "https://www.zillow.com/homes/for_sale/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />

      <main>
        {/* Hero + Zillow search */}
        <section className="relative overflow-hidden bg-charcoal text-background">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-5">
                {COMPANY_NAME} · Since {SINCE_YEAR}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">
                Expats Buying a USA Home
              </h1>
              <p className="mt-6 max-w-xl text-background/70 text-lg leading-relaxed">
                Search listings in all 50 states, get pre-approved, and close with{" "}
                {BROKER_NAME} — direct lender pricing, fast underwriting, and a single
                broker from your first search to the day you get the keys.
              </p>
            </Reveal>

            <Reveal>
              <form
                onSubmit={zillowSearch}
                className="mt-10 max-w-2xl bg-background text-foreground p-2 flex items-stretch gap-2"
              >
                <div className="flex items-center gap-3 flex-1 pl-4">
                  <Search className="w-5 h-5 text-gold shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search US homes by city, ZIP, or address"
                    aria-label="Search homes for sale"
                    className="w-full bg-transparent py-3.5 text-base outline-none placeholder:text-foreground/40"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground px-6 md:px-8 text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                >
                  Search
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </Reveal>

            <Reveal>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-background/55">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Powered by Zillow — opens a new tab with live US listings.</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Intro */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Your path to a US home
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                One broker from your first search to the keys
              </h2>
              <p className="mt-5 text-foreground/65 max-w-2xl leading-relaxed">
                Buying a home in the USA should feel straightforward — not overwhelming.
                For nearly 30 years, {BROKER_NAME} has helped buyers across {`32 states`}
                search, finance, and close on the right home. You find the property; Warren
                handles the loan, the rate, and the closing — with direct lender pricing and
                no middleman markups.
              </p>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-accent/40 border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                How It Works
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                From pre-approval to closing
              </h2>
              <p className="mt-5 text-foreground/60 max-w-xl leading-relaxed">
                Five clear steps — and one broker with you at every one of them. No call
                centers, no runaround, no surprise fees.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-px bg-line">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.n} delay={Math.min(i, 4) * 70}>
                    <div className="bg-background p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex items-center gap-5 md:w-64 md:shrink-0">
                        <div className="flex items-center justify-center w-14 h-14 border border-gold/40 shrink-0">
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                        <span className="font-serif text-4xl text-gold/30">{s.n}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl">{s.title}</h3>
                        <p className="mt-2 text-foreground/65 text-sm leading-relaxed max-w-2xl">
                          {s.body}
                        </p>
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-gold md:text-right md:w-40 md:shrink-0">
                        {s.detail}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Before you buy
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                Smart moves for US home buyers
              </h2>
            </Reveal>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
              {TIPS.map((t) => (
                <Reveal key={t.title}>
                  <div className="bg-background p-8 h-full">
                    <ArrowRight className="w-6 h-6 text-gold" />
                    <h3 className="mt-4 font-serif text-xl">{t.title}</h3>
                    <p className="mt-2 text-foreground/60 text-sm leading-relaxed">{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Popular cities */}
        <section className="bg-accent/40 border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl">Browse popular US markets</h2>
              <p className="mt-3 text-foreground/60 max-w-xl">
                Jump straight into Zillow listings in the country's most-searched markets —
                or pick any US state below.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-line">
              {POPULAR_CITIES.map((c) => (
                <a
                  key={c.name}
                  href={`https://www.zillow.com/homes/for_sale/${c.query}_rb/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-background p-5 flex items-center justify-between hover:bg-accent transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-sm uppercase tracking-[0.12em]">{c.name}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by state */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Search nationwide
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Browse homes by state</h2>
              <p className="mt-3 text-foreground/60 max-w-xl">
                Warren is licensed in 32 states. Pick any state below to open live Zillow
                listings — then call Warren to finance your purchase.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-line">
              {US_STATES.map((s) => (
                <a
                  key={s.name}
                  href={`https://www.zillow.com/homes/for_sale/${s.query}_rb/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-background p-3.5 flex items-center justify-between hover:bg-accent transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="text-xs uppercase tracking-[0.1em]">{s.name}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-foreground/30 group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-accent/40 border-b border-line">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Buying questions
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Answers for US home buyers</h2>
            </Reveal>
            <div className="mt-8 divide-y divide-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-serif text-lg pr-4">{f.q}</span>
                    <span className="text-gold text-2xl leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-foreground/60 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-approval CTA */}
        <section className="bg-charcoal text-background">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                    Ready to make an offer?
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">
                    Get pre-approved today
                  </h2>
                  <p className="mt-5 text-background/70 max-w-md leading-relaxed">
                    Sellers want a pre-approval, not a pre-qualification. Warren issues
                    direct-lender pre-approvals so your offer stands out — and your rate is
                    locked the moment you find the right home.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-7 py-3.5 text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                    >
                      Apply now <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="inline-flex items-center gap-2 border border-background/25 px-7 py-3.5 text-xs uppercase tracking-[0.15em] hover:border-gold hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
                <div className="border border-background/15 p-8">
                  <HomeIcon className="w-8 h-8 text-gold" />
                  <ul className="mt-6 space-y-4 text-sm">
                    {[
                      "Conventional, FHA, VA & jumbo loans",
                      "Direct lender pricing — no middleman markups",
                      "Pre-approvals that sellers take seriously",
                      "Fast underwriting and predictable timelines",
                      "Serving 32 states since 1996",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3 text-background/75">
                        <ArrowRight className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/buy-a-home"
                    className="mt-6 inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.15em] hover:opacity-80 transition-opacity"
                  >
                    Buying from abroad? See Mortgages for Expats <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Talk to Warren
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Ready to buy in the USA?</h2>
              <p className="mt-3 text-foreground/60 max-w-xl">
                Call Warren for today's exact rate and a pre-approval built around your
                purchase — wherever you're buying.
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
