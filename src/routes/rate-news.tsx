import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { SITE_URL } from "@/lib/site-data";
import { getRateNews } from "@/lib/news.functions";

const TITLE = "Bond & Mortgage Rate News — The Discount Mortgage Store";
const DESC =
  "Live bond market and mortgage rate news headlines, updated daily. Track Treasury yields, Fed moves, and what they mean for Florida mortgage rates.";

export const Route = createFileRoute("/rate-news")({
  loader: async () => await getRateNews(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/rate-news` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/rate-news` }],
  }),
  component: RateNewsPage,
});

function when(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

function RateNewsPage() {
  const { items, error } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        <section className="bg-charcoal text-background">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
              Market Watch
            </div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight max-w-3xl">
              Latest Bond &amp; Mortgage Rate News
            </h1>
            <p className="mt-4 max-w-2xl text-background/60 text-sm leading-relaxed">
              Headlines pulled live from Mortgage News Daily, CNBC Economy,
              HousingWire, and MarketWatch. Mortgage rates follow the bond market — when Treasury
              yields move, your quote moves with them.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8 border-b border-line pb-4">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-gold">
              Today's Headlines
            </h2>
            <a
              href="/todays-rates"
              className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-gold"
            >
              See today's rates &amp; Treasury yields →
            </a>
          </div>

          {error ? (
            <p className="text-sm text-muted-foreground">{error}</p>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <li key={item.link} className="py-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    <span className="text-gold">{item.source}</span>
                    {item.publishedAt ? <span>{when(item.publishedAt)}</span> : null}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl md:text-2xl leading-snug hover:text-gold"
                  >
                    {item.title}
                  </a>
                  {item.summary ? (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                      {item.summary}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-6 text-xs text-muted-foreground">
            Headlines link to their original publishers. News is informational
            only and is not a rate quote or a commitment to lend.
          </p>
        </section>

        <Contact />
      </main>
      <SiteFooter />
      <MobileCTA />
      <Toaster />
    </div>
  );
}
