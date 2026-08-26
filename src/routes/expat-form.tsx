import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ExpatInquiryForm } from "@/components/site/ExpatInquiryForm";
import { SITE_URL } from "@/lib/site-data";

export const Route = createFileRoute("/expat-form")({
  head: () => ({
    meta: [
      { title: "Expat & Foreign National Mortgage Inquiry | The Discount Mortgage Store" },
      {
        name: "description",
        content:
          "Complete this short form and Warren Factor will personally tell you what US mortgage you qualify for as an expat or foreign national — including no-income-verification options.",
      },
      { property: "og:title", content: "Expat & Foreign National Mortgage Inquiry | The Discount Mortgage Store" },
      {
        property: "og:description",
        content:
          "Tell us about your situation and find out exactly what US mortgage programs you qualify for as a foreign national or US expat.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/expat-form` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/expat-form` }],
  }),
  component: ExpatFormPage,
});

function ExpatFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Expat &amp; Foreign National Mortgages
            </p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-medium text-foreground">
              Find Out What You Qualify For
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
              Complete the short form below and Warren Factor — a licensed broker with nearly
              30 years of experience — will personally review your answers and tell you exactly
              which loan programs fit your situation, including options with{" "}
              <span className="text-foreground font-medium">no US income verification</span>.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-14 md:py-16">
          <ExpatInquiryForm />

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Still researching?{" "}
              <Link to="/buy-a-home" className="text-primary underline underline-offset-4 hover:text-gold-dark">
                Learn more about expat &amp; foreign national mortgages
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
