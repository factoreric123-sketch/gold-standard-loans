import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { Calculator } from "@/components/site/Calculator";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { SITE_URL } from "@/lib/site-data";

// U.S. Treasury yields from CNBC, updated 2026-10-08 (12:15 PM ET).
// Source: https://www.cnbc.com/markets/bonds/
type TRate = { label: string; yield: number };
const TREASURY_RATES: TRate[] = [
  { label: "3-Mo", yield: 4.151 },
  { label: "6-Mo", yield: 4.313 },
  { label: "1-Yr", yield: 4.453 },
  { label: "2-Yr", yield: 4.808 },
  { label: "5-Yr", yield: 5.072 },
  { label: "10-Yr", yield: 5.326 },
  { label: "30-Yr", yield: 5.696 },
];
const TREASURY_ASOF = "Oct 8, 2026, 12:15 PM ET";

// National average mortgage rates from Bankrate, updated 2026-08-17.
// Source: https://www.bankrate.com/mortgages/mortgage-rates/
const BANKRATE_AVERAGES = [
  { label: "30-Yr Fixed", rate: "7.98%" },
  { label: "15-Yr Fixed", rate: "7.23%" },
  { label: "30-Yr FHA", rate: "7.605%" },
  { label: "30-Yr VA", rate: "7.48%" },
];
const BANKRATE_ASOF = "Oct 8, 2026, 12:15 PM ET";

export const Route = createFileRoute("/todays-rates")({
  head: () => ({
    meta: [
      {
        title: "Today's Mortgage Rates & Treasury Yields — The Discount Mortgage Store",
      },
      {
        name: "description",
        content:
          "See today's U.S. Treasury yields and the USA lowest mortgage rates from Warren Factor. Live benchmarks, a payment calculator, and current FHA, conventional, and ARM rates. Since 1996.",
      },
      {
        property: "og:title",
        content: "Today's Mortgage Rates & Treasury Yields — The Discount Mortgage Store",
      },
      {
        property: "og:description",
        content:
          "Live U.S. Treasury yields and the USA lowest mortgage rates. Estimate your payment and call Warren for today's exact quote.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/todays-rates` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Today's Mortgage Rates & Treasury Yields — The Discount Mortgage Store",
      },
      {
        name: "twitter:description",
        content:
          "Live Treasury yields and the USA lowest mortgage rates. Since 1996.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/todays-rates` }],
  }),
  component: TodaysRatesPage,
});

function TodaysRatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        <section className="bg-cream border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
              Today's Mortgage Rates
            </h1>
            <p className="mt-3 max-w-2xl text-foreground/70">
              Live U.S. Treasury yields, national average mortgage rates, and a
              payment calculator — then call Warren for today's exact quote.
            </p>
          </div>
        </section>
        {/* National average mortgage rates — Bankrate. */}
        <section className="bg-cream border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-6">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                National average mortgage rates
              </h2>
              <span className="text-[11px] uppercase tracking-[0.15em] text-foreground/50">
                Source: Bankrate · as of {BANKRATE_ASOF}
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
              {BANKRATE_AVERAGES.map((r, i) => (
                <div
                  key={r.label}
                  className={`bg-card px-5 py-6 text-center ${i === 0 ? "ring-1 ring-gold ring-inset" : ""}`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-[0.15em] ${i === 0 ? "text-gold" : "text-foreground/55"}`}
                  >
                    {r.label}
                  </div>
                  <div className="font-serif text-3xl mt-1">{r.rate}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-foreground/50">
              The national average <span className="text-gold">30-year fixed</span> rate is what
              most banks advertise. Warren's clients routinely beat it — call for today's exact
              quote.
            </p>
          </div>
        </section>
        <Calculator />
        <Contact />
        {/* Today's U.S. Treasury yield curve — CNBC, Oct 8, 2026. */}
        <section className="bg-charcoal text-background">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-6">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-gold">
                Today's U.S. Treasury Yields
              </h2>
              <span className="text-[11px] uppercase tracking-[0.15em] text-background/50">
                Source: CNBC · as of {TREASURY_ASOF}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-background/10">
              {TREASURY_RATES.map((r) => {
                const isFive = r.label === "5-Yr";
                return (
                  <div
                    key={r.label}
                    className={`bg-charcoal px-3 py-5 text-center ${
                      isFive ? "ring-1 ring-gold ring-inset" : ""
                    }`}
                  >
                    <div
                      className={`text-[10px] uppercase tracking-[0.15em] ${
                        isFive ? "text-gold" : "text-background/55"
                      }`}
                    >
                      {r.label}
                    </div>
                    <div className="font-serif text-2xl text-background mt-1">
                      {r.yield.toFixed(3)}
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-background/55 normal-case tracking-normal">
              The <span className="text-gold">5-Year</span> Treasury is the index
              many 5/1 ARM rates follow. Mortgage rates are priced as a margin
              above these benchmarks — call Warren for today's exact quote.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />
      <Toaster />
    </div>
  );
}
