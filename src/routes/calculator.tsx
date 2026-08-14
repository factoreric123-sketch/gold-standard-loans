import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { Calculator } from "@/components/site/Calculator";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { SITE_URL } from "@/lib/site-data";

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
        <Calculator />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCTA />
      <Toaster />
    </div>
  );
}
