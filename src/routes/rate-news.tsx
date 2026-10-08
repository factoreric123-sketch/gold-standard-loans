import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { SITE_URL } from "@/lib/site-data";
import { getRateNews } from "@/lib/news.functions";

const TITLE = "Rate Prediction Over Next 12 Months — The Discount Mortgage Store";
const DESC =
  "Mortgage rate forecast over the next 12 months with Fannie Mae and Mortgage Bankers Association projections, plus live bond market news driving Florida mortgage rates.";

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
              Rate Prediction Over Next 12 Months
            </h1>
            <p className="mt-4 max-w-2xl text-background/60 text-sm leading-relaxed">
              Headlines pulled live from Mortgage News Daily, CNBC Economy,
              HousingWire, and MarketWatch. Mortgage rates follow the bond market — when Treasury
              yields move, your quote moves with them.
            </p>
          </div>
        </section>

        {/* ===== Rate Outlook / 12-month forecast ===== */}
        <section className="bg-background border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
              Mortgage Rate Prediction · October 2026 Outlook
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-3xl">
              Current Market Reality &amp; Forecasts
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The supplied October 2026 market update reports that 30-year fixed
              mortgage rates recently reached 7.28%–7.5%, described as their
              highest levels in nearly three years. Its outlook through late 2027
              contrasts lower annual-average forecasts with a more cautious
              mortgage-industry executive sentiment.
            </p>

            <div className="mt-8 grid gap-px bg-line border border-line md:grid-cols-2">
              {[
                { source: "Fannie Mae", detail: "Projected 2027 average", rate: "6.7%" },
                { source: "Mortgage Bankers Association", detail: "Projected average over the next year", rate: "6.7%" },
              ].map((forecast) => (
                <div key={forecast.source} className="bg-background p-6">
                  <h3 className="font-serif text-xl">{forecast.source}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{forecast.detail}</p>
                  <p className="mt-3 font-serif text-4xl text-gold">{forecast.rate}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-l-2 border-gold pl-4">
              <h3 className="font-serif text-xl">Mortgage Industry Executive Outlook</h3>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground leading-relaxed">
                The supplied update also cites an October 2026 live poll in which
                70% of mortgage executives expected rates to remain at 7.5% or
                higher well into 2027. This is sentiment from a reported poll,
                not an annual-average forecast or a guaranteed future rate.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="border-l-2 border-gold pl-4">
                <h3 className="font-serif text-lg mb-1">What could push rates down</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cooling inflation, softer employment data, and lower Treasury
                  yields could help bring mortgage rates down.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <h3 className="font-serif text-lg mb-1">What could keep rates elevated</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Persistent inflation, strong employment, or higher Treasury
                  yields could keep mortgage rates elevated into 2027.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <h3 className="font-serif text-lg mb-1">What it means for you</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Plan around a payment you can afford at your actual quoted
                  rate, rather than counting on a future decline. Ask Warren
                  about available options for your purchase or refinance.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs text-muted-foreground leading-relaxed max-w-3xl">
              Source note: this outlook reflects an October 2026 market summary
              supplied to The Discount Mortgage Store. Original forecast reports
              and the executive poll source were not provided, so these figures
              have not been independently verified. No quarterly projections are
              implied. Forecasts and poll results are subject to change and are
              not a rate quote, a commitment to lend, or financial advice.
            </p>
          </div>
        </section>

        <section className="bg-background border-b border-line" aria-labelledby="rate-drivers-heading">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
              Behind the Rates
            </div>
            <h2 id="rate-drivers-heading" className="font-serif text-3xl md:text-4xl leading-tight">
              What Is Driving Rates Up?
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Mortgage rates do not move in a vacuum. They generally track the
              10-year U.S. Treasury yield and respond to inflation, energy prices,
              and broader economic pressures. The supplied October 2026 update
              highlights three forces behind higher borrowing costs.
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="border-t-2 border-gold pt-5">
                <h3 className="font-serif text-xl">Persistent Inflation</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The supplied update reports consumer inflation back above 3%
                  and recent Federal Reserve interest rate hikes rather than
                  the cuts markets had anticipated. Persistent inflation can
                  keep bond yields and mortgage rates elevated; Fed policy
                  does not set mortgage rates directly.
                </p>
              </div>
              <div className="border-t-2 border-gold pt-5">
                <h3 className="font-serif text-xl">Geopolitical and Energy Pressures</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The supplied update attributes higher fuel and oil prices to
                  ongoing global conflicts, particularly a war involving Iran.
                  Higher energy costs can add inflationary pressure to the U.S.
                  economy and make it harder for borrowing costs to ease.
                </p>
              </div>
              <div className="border-t-2 border-gold pt-5">
                <h3 className="font-serif text-xl">Surging Treasury Yields</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The supplied update reports the 10-year U.S. Treasury yield
                  above 5.3%. When Treasury yields rise, investors generally
                  seek higher returns on mortgage-backed securities too,
                  putting upward pressure on mortgage borrowing costs.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
              Source note: the inflation figure, recent Fed hikes, conflict
              claims, and Treasury yield above are from a supplied October 2026
              summary and have not been independently verified. Its citation
              markers did not include original sources. This is market
              commentary, not a live Treasury quote or a mortgage rate offer.
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
              See today's rates & Treasury yields →
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
