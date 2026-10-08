import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { SITE_URL } from "@/lib/site-data";

const TITLE = "Apply for a Mortgage | The Discount Mortgage Store";
const DESC = "Start your mortgage application with Warren Factor. Purchase, refinance, FHA, VA, bank statement, DSCR and foreign national loans in 32 states.";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/apply` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/apply` }],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-cream">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">About 5 minutes · No credit pull</p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight text-foreground">Mortgage Application</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
              Tell Warren about you, the loan and the property. He reviews every application personally and calls you to lock in the right program.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-6 py-14 md:py-16">
          <ApplicationForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
