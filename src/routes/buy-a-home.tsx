import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Phone, ArrowRight, Mail, Home as HomeIcon } from "lucide-react";
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

export const Route = createFileRoute("/buy-a-home")({
  head: () => ({
    meta: [
      {
        title: "Buy a Home — Search Florida Homes on Zillow | The Discount Mortgage Store",
      },
      {
        name: "description",
        content:
          "Search homes for sale across Florida on Zillow, then get pre-approved with Warren Factor. Florida's lowest mortgage rates since 1996. FHA, VA, conventional & DSCR loans.",
      },
      {
        property: "og:title",
        content: "Buy a Home — Search Florida Homes on Zillow | The Discount Mortgage Store",
      },
      {
        property: "og:description",
        content:
          "Search homes for sale on Zillow and get pre-approved with Warren Factor. Florida's lowest mortgage rates since 1996.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/buy-a-home` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Buy a Home — Search Florida Homes on Zillow | The Discount Mortgage Store",
      },
      {
        name: "twitter:description",
        content: "Search homes for sale on Zillow and get pre-approved with Warren Factor.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/buy-a-home` }],
  }),
  component: BuyAHomePage,
});

const POPULAR_CITIES: { name: string; query: string }[] = [
  { name: "Boca Raton", query: "Boca-Raton-FL" },
  { name: "West Palm Beach", query: "West-Palm-Beach-FL" },
  { name: "Fort Lauderdale", query: "Fort-Lauderdale-FL" },
  { name: "Miami", query: "Miami-FL" },
  { name: "Port St. Lucie", query: "Port-St-Lucie-FL" },
  { name: "Orlando", query: "Orlando-FL" },
  { name: "Tampa", query: "Tampa-FL" },
  { name: "Jacksonville", query: "Jacksonville-FL" },
  { name: "Naples", query: "Naples-FL" },
  { name: "Sarasota", query: "Sarasota-FL" },
  { name: "Cape Coral", query: "Cape-Coral-FL" },
  { name: "Palm Bay", query: "Palm-Bay-FL" },
];

const STEPS = [
  {
    n: "01",
    title: "Find a home on Zillow",
    body: "Search listings across Florida by city, ZIP, or address. Save your favorites and watch new listings the moment they hit the market.",
  },
  {
    n: "02",
    title: "Get pre-approved with Warren",
    body: "A pre-approval letter shows sellers you're serious. Warren locks your rate and terms so you can move fast and bid with confidence.",
  },
  {
    n: "03",
    title: "Close with confidence",
    body: "From contract to closing, Warren manages your loan in-house. Direct lender pricing, fast underwriting, and no surprise fees.",
  },
];

function BuyAHomePage() {
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
                The Discount Mortgage Store · Since {SINCE_YEAR}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">
                Buy a home in Florida
              </h1>
              <p className="mt-6 max-w-xl text-background/70 text-lg leading-relaxed">
                Search live listings on Zillow, then get pre-approved with Warren Factor.
                Florida's lowest mortgage rates — FHA, VA, conventional, and DSCR loans.
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
                    placeholder="Enter a city, ZIP, or address in Florida"
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
                <span>Powered by Zillow — opens a new tab with live listings.</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Popular cities */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl">Browse popular Florida cities</h2>
              <p className="mt-3 text-foreground/60 max-w-xl">
                Jump straight into Zillow listings in Florida's most-searched markets.
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

        {/* How it works */}
        <section className="bg-accent/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                From search to keys
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                Three steps to your new front door
              </h2>
            </Reveal>
            <div className="mt-10 grid md:grid-cols-3 gap-px bg-line">
              {STEPS.map((s) => (
                <Reveal key={s.n}>
                  <div className="bg-background p-8 h-full">
                    <div className="font-serif text-4xl text-gold">{s.n}</div>
                    <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
                    <p className="mt-3 text-foreground/60 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
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
                    Get pre-approved before you bid
                  </h2>
                  <p className="mt-5 text-background/70 max-w-md leading-relaxed">
                    Sellers want to see a pre-approval, not a pre-qualification. Warren issues
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
                      "Direct lender pricing — no middleman markups",
                      "Pre-approval letters issued the same day",
                      "FHA, VA, conventional, bank statement & DSCR loans",
                      "Serving 32 states since 1996",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3 text-background/75">
                        <ArrowRight className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
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
              <h2 className="font-serif text-3xl md:text-4xl">Questions about buying?</h2>
              <p className="mt-3 text-foreground/60 max-w-xl">
                Found a home you love on Zillow? Call Warren for today's exact rate and a
                same-day pre-approval.
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
