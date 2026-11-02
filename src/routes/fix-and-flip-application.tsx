import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FixFlipApplicationForm } from "@/components/site/FixFlipApplicationForm";
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";

const TITLE = "Fix & Flip Loan Application | The Discount Mortgage Store";
const DESC =
  "Apply online for fix-and-flip and bridge financing: up to 92.5% of purchase, 100% of rehab, up to 75% ARV, $75K to $10MM, 600+ credit. No flip experience required.";

export const Route = createFileRoute("/fix-and-flip-application")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/fix-and-flip-application` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/fix-and-flip-application` }],
  }),
  component: FixFlipApplicationPage,
});

const SPECS = [
  { value: "92.5%", label: "Of purchase" },
  { value: "100%", label: "Of rehab" },
  { value: "75%", label: "ARV LTV" },
  { value: "$10MM", label: "Loan size" },
];

function FixFlipApplicationPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-cream">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              About 3 minutes · No credit pull
            </p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight text-foreground">
              Fix &amp; Flip Loan Application
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
              Tell Warren about the deal. He reviews every application personally and calls you back
              with terms, usually the same business day.
            </p>
            <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-2 divide-x divide-y divide-line border border-line bg-white sm:grid-cols-4 sm:divide-y-0">
              {SPECS.map((s) => (
                <div key={s.label} className="px-4 py-4">
                  <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-gold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-14 md:py-16">
          <FixFlipApplicationForm />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Prefer to talk it through? Call{" "}
            <a href={`tel:${PHONE_TEL}`} className="text-gold underline underline-offset-4">
              {PHONE_DISPLAY}
            </a>{" "}
            or read the{" "}
            <Link
              to="/programs/$slug"
              params={{ slug: "fix-and-flip" }}
              className="text-gold underline underline-offset-4"
            >
              full fix &amp; flip guidelines
            </Link>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
