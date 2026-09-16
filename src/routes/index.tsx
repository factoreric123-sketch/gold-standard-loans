import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { Programs } from "@/components/site/Programs";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Calculator } from "@/components/site/Calculator";
import { Insights } from "@/components/site/Insights";
import { WhyWarren } from "@/components/site/WhyWarren";
import { BookBanner } from "@/components/site/BookBanner";
import { Reviews } from "@/components/site/Reviews";

import { FAQ } from "@/components/site/FAQ";
import { Community } from "@/components/site/Community";
import { QA } from "@/components/site/QA";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { SITE_URL } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "USA Lowest Mortgage Rates | The Discount Mortgage Store" },
      {
        name: "description",
        content:
          "USA lowest mortgage rates: proven, not promised. Warren Factor shops 32 states for your lowest qualifying rate. Free quote, call (561) 577-1882.",
      },
      {
        name: "google-site-verification",
        content: "oYtka2iVJ40l1yOcu5Yz04oi2ZcB175ebBKri4byWj8",
      },
      {
        property: "og:title",
        content: "Proven Low Mortgage Rates, Not Promised | Warren Factor",
      },
      {
        property: "og:description",
        content:
          "See today's live rates and get a same-day quote from a broker licensed in 32 states for 28 years.",
      },

      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og.png` },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;700&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        <Hero />
        <Programs />
        <HowItWorks />
        <Calculator />
        <Insights />
        <WhyWarren />
        <BookBanner />
        <Reviews />
        <QA />
        <Community />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCTA />
      <Toaster />
    </div>
  );
}
