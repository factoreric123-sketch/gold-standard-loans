import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Phone, ArrowRight, Mail, Home as HomeIcon, Globe2 } from "lucide-react";
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
        title: "Your USA Mortgage for Foreigners and Expats | The Discount Mortgage Store",
      },
      {
        name: "description",
        content:
          "Your USA Mortgage — expats and foreign nationals buy a home in the USA with Warren Factor. No US credit history? No problem. ITIN, foreign-income, and asset-based mortgages for buyers worldwide.",
      },
      {
        property: "og:title",
        content: "Your USA Mortgage for Foreigners and Expats | The Discount Mortgage Store",
      },
      {
        property: "og:description",
        content:
          "Buy a home in the USA as an expat or foreign national. Warren Factor offers ITIN, foreign-income, and asset-based mortgages for buyers worldwide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/buy-a-home` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Your USA Mortgage for Foreigners and Expats | The Discount Mortgage Store",
      },
      {
        name: "twitter:description",
        content: "Buy a home in the USA as an expat or foreign national. Mortgages for buyers worldwide.",
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
    title: "Find your US home",
    body: "Search live listings on Zillow by city, ZIP, or address — in any of the 50 states. Save your favorites and watch new properties the moment they hit the market.",
  },
  {
    n: "02",
    title: "Get pre-approved with Warren",
    body: "No US credit history? No problem. Warren pre-approves expats and foreign nationals using foreign income, assets, or an ITIN — so your offer is taken seriously.",
  },
  {
    n: "03",
    title: "Close from anywhere",
    body: "From contract to closing, Warren manages your loan remotely. Direct lender pricing, fast underwriting, and no surprise fees — even when you sign from abroad.",
  },
];

const PROGRAMS = [
  {
    title: "Foreign National Loans",
    body: "For buyers living outside the US with no US credit file. Warren can even close a foreign national loan without income verification documentation — qualifying you on assets, a valid passport, and a strong down payment. No Social Security number required.",
  },
  {
    title: "ITIN Mortgages",
    body: "An Individual Taxpayer Identification Number (ITIN) lets you finance a US home without a Social Security number. Warren walks you through obtaining one if you don't have it yet.",
  },
  {
    title: "Asset-Based & DSCR",
    body: "Qualify on the property's rental income or your liquid assets instead of traditional employment. Ideal for investors and self-employed expats.",
  },
  {
    title: "Conventional & FHA",
    body: "If you have established US credit and residency, Warren still offers conventional, FHA, and VA loans at the USA lowest rates.",
  },
];

const BENEFITS = [
  {
    title: "Higher approval odds",
    body: "Most US lenders decline international files outright. Warren knows the niche lenders that say yes to foreign income, ITIN, and asset-based borrowers.",
  },
  {
    title: "Cross-border expertise",
    body: "Foreign bank statements, overseas employer letters, and currency conversion are second nature — not a reason to deny your file.",
  },
  {
    title: "Remote, paperless closing",
    body: "Online notarization and consulate services let you sign from your home country. Warren coordinates every step across time zones.",
  },
  {
    title: "One broker, 32 states",
    body: "Your single point of contact from pre-approval to closing — no call-center handoffs, no lost paperwork, no surprise fees.",
  },
  {
    title: "Direct lender pricing",
    body: "Warren quotes true direct-lender rates, not marked-up broker quotes, so your international mortgage costs the same as a domestic one.",
  },
  {
    title: "Plain-English guidance",
    body: "Warren explains ITIN, source-of-funds, and US closing customs in clear terms — so a buyer in any country knows exactly what happens next.",
  },
];

const FAQ = [
  {
    q: "Can I buy a home in the USA if I'm not a US citizen or resident?",
    a: "Yes. Warren Factor closes mortgages for expats, foreign nationals, and non-permanent residents every week. You do not need a Green Card or US credit history to qualify.",
  },
  {
    q: "Do I need a Social Security number?",
    a: "No. Foreign national and ITIN loan programs use your passport and an ITIN instead. If you don't have an ITIN yet, Warren will guide you through obtaining one.",
  },
  {
    q: "What documentation do I need from abroad?",
    a: "Typically: passport, proof of foreign income (bank statements, employer letters, or CPA-prepared financials), and source-of-funds documentation. Warren provides a tailored checklist after a short call.",
  },
  {
    q: "Can I close on the loan without flying to the United States?",
    a: "In most cases, yes. Remote online notarization and embassy/consulate services allow you to sign from your home country. Warren coordinates the entire closing remotely.",
  },
  {
    q: "What down payment is expected for foreign nationals?",
    a: "Foreign national programs typically require 20–25% down. ITIN and asset-based programs may allow as little as 15%. Warren will quote your exact terms once he reviews your file.",
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
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">
                Your USA Mortgage for Foreigners & Expats
              </h1>
              <p className="mt-6 max-w-xl text-background/70 text-lg leading-relaxed">
                Buy a home in the USA from anywhere in the world. Warren Factor closes
                mortgages for expats, foreign nationals, and ITIN borrowers — no US
                credit history required.
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

        {/* Intro / why expats */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Built for international buyers
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                Your US mortgage — handled from anywhere on earth
              </h2>
              <p className="mt-5 text-foreground/65 max-w-2xl leading-relaxed">
                For nearly 30 years, {BROKER_NAME} has helped expats, foreign nationals,
                and ITIN borrowers finance homes across the USA — licensed in 32 states. Most
                lenders turn international buyers away. Warren specializes in saying yes —
                structuring loans around foreign income, liquid assets, and rental cash
                flow instead of a US credit score.
              </p>
            </Reveal>
          </div>
        </section>

        {/* No-income-verification callout */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
            <Reveal>
              <div className="border border-gold bg-accent/30 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2">
                    A capability few lenders offer
                  </div>
                  <p className="font-serif text-2xl md:text-3xl leading-tight max-w-2xl">
                    Warren can even do a foreign national loan
                    <span className="text-gold"> without income verification documentation</span>.
                  </p>
                </div>
                <Link
                  to="/expat-form"
                  className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors whitespace-nowrap"
                >
                  <ArrowRight className="h-4 w-4" /> Ask Warren if you qualify
                </Link>
              </div>
            </Reveal>
          </div>
        </section>


        {/* What is an expat mortgage */}
        <section className="bg-accent/40 border-b border-line">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                The basics
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">What is an expat mortgage?</h2>
              <div className="mt-5 space-y-4 text-foreground/65 leading-relaxed">
                <p>
                  An expat mortgage is a home loan built for people who live outside the
                  United States — or who lack a US credit history — but want to buy or
                  refinance property in the USA. Where a standard US mortgage assumes a
                  Social Security number, a domestic income, and a years-long credit file,
                  an expat mortgage is underwritten around foreign income, liquid assets,
                  and the property's rental value.
                </p>
                <p>
                  Two paths cover most international buyers. A <strong>residential</strong>{" "}
                  expat mortgage is for buyers who will live in the home themselves — now
                  or after relocating. A <strong>buy-to-let</strong> (investment) mortgage
                  is for buyers who will rent the property out, qualifying on the rental
                  income the home produces rather than a personal pay stub.
                </p>
                <p>
                  Warren Factor structures both. He knows which lenders accept a foreign
              passport, how to underwrite overseas bank statements, and how to close a loan
              when the buyer is in a different time zone — skills most US brokers simply
              don't have.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Benefits of working with Warren */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Why use a broker
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                Benefits of working with an expat mortgage broker
              </h2>
              <p className="mt-4 text-foreground/60 max-w-2xl leading-relaxed">
                Navigating foreign-income documentation, ITIN rules, and cross-border
                closings on your own is where most international buyers give up. Warren
                handles it end to end.
              </p>
            </Reveal>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
              {BENEFITS.map((b) => (
                <Reveal key={b.title}>
                  <div className="bg-background p-8 h-full">
                    <ArrowRight className="w-6 h-6 text-gold" />
                    <h3 className="mt-4 font-serif text-xl">{b.title}</h3>
                    <p className="mt-2 text-foreground/60 text-sm leading-relaxed">{b.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Do's of buying as a foreigner */}
        <section id="dos-and-donts" className="border-b border-line">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                For foreign buyers
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                The Do's of buying property in the USA as a foreigner
              </h2>
              <p className="mt-5 text-foreground/65 max-w-2xl leading-relaxed">
                A few proven moves that make buying a US home from abroad smoother — and
                keep you from overpaying or getting denied.
              </p>
            </Reveal>

            <div className="mt-10 space-y-px bg-line">
              <Reveal>
                <div className="bg-background p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex items-center gap-4 md:w-16 md:shrink-0">
                    <span className="font-serif text-4xl text-gold/30">01</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl">Get pre-approved for a mortgage</h3>
                    <p className="mt-3 text-foreground/65 text-sm leading-relaxed max-w-2xl">
                      Before you start shopping for a property, it's essential to know how
                      much you can afford. Get pre-approved for a mortgage to determine your
                      budget and avoid falling in love with a property you can't afford.
                      Foreign nationals and non-residents may need to provide additional
                      documentation, such as bank statements and a credit report, to qualify
                      for a home loan.
                    </p>
                    <p className="mt-3 text-foreground/65 text-sm leading-relaxed max-w-2xl">
                      Higher down payments are often required for non-residents and foreign
                      nationals, especially when purchasing an investment or second home,
                      where down payments can range from{" "}
                      <span className="text-gold font-medium">30–35%</span>. It's important to
                      shop for a mortgage lender and consult with experienced mortgage
                      brokers to find the best home loan options for international buyers.
                    </p>
                    <Link
                      to="/expat-form"
                      className="mt-5 inline-flex items-center gap-2 border border-gold text-gold px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" /> Get pre-approved with Warren
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-background p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex items-center gap-4 md:w-16 md:shrink-0">
                    <span className="font-serif text-4xl text-gold/30">02</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl">
                      Close on your loan inside the USA
                    </h3>
                    <p className="mt-3 text-foreground/65 text-sm leading-relaxed max-w-2xl">
                      USA mortgages for expats and foreign nationals{" "}
                      <span className="text-gold font-medium">
                        must close in the USA
                      </span>{" "}
                      — you (or your spouse, if both are on the loan) need to be present
                      to sign the final closing documents on US soil.
                    </p>
                    <p className="mt-3 text-foreground/65 text-sm leading-relaxed max-w-2xl">
                      With one exception: with bank approval, a{" "}
                      <span className="text-gold font-medium">
                        non-USA citizen may sign at a US embassy
                      </span>{" "}
                      in any country. We coordinate with the lender to arrange an
                      embassy signing when you can't travel, so your closing date is
                      never missed.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-background p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex items-center gap-4 md:w-16 md:shrink-0">
                    <span className="font-serif text-4xl text-gold/30">03</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl">
                      Close remotely with paperless online notarization
                    </h3>
                    <p className="mt-3 text-foreground/65 text-sm leading-relaxed max-w-2xl">
                      You don't have to fly to the USA to close.{" "}
                      <span className="text-gold font-medium">
                        Remote online notarization (RON)
                      </span>{" "}
                      lets you sign and notarize your closing documents fully online and
                      paperless from anywhere in the world.{" "}
                      <span className="text-gold font-medium">
                        Warren coordinates every step across time zones
                      </span>{" "}
                      — booking the virtual notary session, liaising with the lender and
                      title company, and e-delivering documents so your closing never stalls.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Loan programs */}
        <section className="bg-accent/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Expat loan programs
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Programs for buyers worldwide</h2>
            </Reveal>
            <div className="mt-10 grid md:grid-cols-2 gap-px bg-line">
              {PROGRAMS.map((p) => (
                <Reveal key={p.title}>
                  <div className="bg-background p-8 h-full">
                    <Globe2 className="w-7 h-7 text-gold" />
                    <h3 className="mt-4 font-serif text-2xl">{p.title}</h3>
                    <p className="mt-3 text-foreground/60 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Popular cities */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl">Browse popular Florida markets</h2>
              <p className="mt-3 text-foreground/60 max-w-xl">
                Warren is Florida-based — jump straight into Zillow listings in the
                state's most-searched markets. Or pick any US state below.
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
        <section className="bg-accent/40 border-b border-line">
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

        {/* How it works */}
        <section className="bg-accent/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                From search to keys
              </div>
              <h2 className="font-serif text-3xl md:text-4xl max-w-2xl">
                Three steps to your new US front door
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

        {/* FAQ */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                Expat mortgage questions
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Answers for international buyers</h2>
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
                    Get pre-approved from anywhere
                  </h2>
                  <p className="mt-5 text-background/70 max-w-md leading-relaxed">
                    Sellers want a pre-approval, not a pre-qualification. Warren issues
                    direct-lender pre-approvals for expats and foreign nationals so your
                    offer stands out — and your rate is locked the moment you find the
                    right home.
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
                      "Foreign national, ITIN & asset-based loans",
                      "No US credit history required",
                      "Remote closing — sign from your home country",
                      "Direct lender pricing — no middleman markups",
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
              <h2 className="font-serif text-3xl md:text-4xl">Ready to buy in the USA?</h2>
              <p className="mt-3 text-foreground/60 max-w-xl">
                Wherever you are in the world, call Warren for today's exact rate and a
                pre-approval built for international buyers.
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
