import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { Calculator } from "@/components/site/Calculator";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { SITE_URL } from "@/lib/site-data";

// 5-Year Treasury Constant Maturity yield (FRED DGS5).
// Source: https://fred.stlouisfed.org/series/DGS5 — updated 2026-08-13.
const TREASURY_5Y = 4.38;

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      {
        title: "Mortgage Payment Calculator | Estimate Your Monthly Payment — The Discount Mortgage Store",
      },
      {
        name: "description",
        content:
          "Estimate your monthly mortgage payment with Warren Factor's free calculator. Adjust home price, down payment, rate, and term to see your principal & interest. Florida's lowest rates since 1996.",
      },
      {
        property: "og:title",
        content:
          "Mortgage Payment Calculator | Estimate Your Monthly Payment",
      },
      {
        property: "og:description",
        content:
          "Estimate your monthly mortgage payment. Adjust price, down payment, rate, and term. Florida's lowest rates since 1996.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/calculator` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Mortgage Payment Calculator | The Discount Mortgage Store",
      },
      {
        name: "twitter:description",
        content:
          "Estimate your monthly mortgage payment. Florida's lowest rates since 1996.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/calculator` }],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        {/* Live benchmark — 5-Year Treasury yield, the index many ARMs track. */}
        <section className="bg-charcoal text-background">
          <div className="mx-auto max-w-7xl px-6 py-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.15em]">
            <span className="text-background/55">Today's Benchmark</span>
            <span className="text-gold">5-Year Treasury</span>
            <span className="font-serif text-base text-background">{TREASURY_5Y.toFixed(2)}%</span>
            <span className="text-background/45 normal-case tracking-normal">
              · the index many 5/1 ARM rates follow
            </span>
          </div>
        </section>
        <Calculator />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCTA />
      <Toaster />
    </div>
  );
}
