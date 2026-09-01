import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AdviceForm } from "@/components/site/AdviceForm";
import { Reveal } from "@/components/site/motion";
import { SITE_URL } from "@/lib/site-data";

export const Route = createFileRoute("/free-mortgage-advice")({
  head: () => ({
    meta: [
      { title: "Free Mortgage Advice | The Discount Mortgage Store" },
      {
        name: "description",
        content:
          "Ask Warren Factor a mortgage question. Free, personal advice from a licensed broker with nearly 30 years of experience across 32 states.",
      },
      {
        property: "og:title",
        content: "Free Mortgage Advice | The Discount Mortgage Store",
      },
      {
        property: "og:description",
        content:
          "Get free, personal mortgage advice from Warren Factor — licensed broker, 28+ years helping buyers and homeowners across the USA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/free-mortgage-advice` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/free-mortgage-advice` }],
  }),
  component: FreeMortgageAdvicePage,
});

function FreeMortgageAdvicePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-cream">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              No Cost · No Obligation
            </p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight text-foreground">
              Free Mortgage Advice
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
              Ask Warren Factor anything about buying, refinancing, qualifying, or
              comparing offers. He reviews every question personally and replies with
              clear guidance you can act on.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-14 md:py-16">
          <Reveal>
            <AdviceForm />
          </Reveal>

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Want to compare today's lowest rates?{" "}
              <Link
                to="/todays-rates"
                className="text-gold underline underline-offset-4 hover:text-foreground"
              >
                View today's mortgage rates
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
