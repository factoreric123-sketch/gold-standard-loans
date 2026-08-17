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
              Mortgage Rate Prediction
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-3xl">
              Will mortgage rates go up or down in the next 12 months?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The short answer: most forecasters expect the 30-year fixed rate to
              hold roughly flat to slightly lower over the next 12 months —
              drifting in the mid-6% range rather than snapping back to the 3%
              era or spiking higher. Below is what the major housing-finance
              organizations project, quarter by quarter.
            </p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">
                  Forecast 30-year fixed mortgage rate by quarter, Fannie Mae vs MBA
                </caption>
                <thead>
                  <tr className="border-b border-line text-left">
                    <th scope="col" className="py-3 pr-4 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      Source
                    </th>
                    <th scope="col" className="py-3 px-2 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground text-right">
                      Q3 2026
                    </th>
                    <th scope="col" className="py-3 px-2 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground text-right">
                      Q4 2026
                    </th>
                    <th scope="col" className="py-3 px-2 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground text-right">
                      Q1 2027
                    </th>
                    <th scope="col" className="py-3 px-2 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground text-right">
                      Q2 2027
                    </th>
                    <th scope="col" className="py-3 px-2 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground text-right">
                      Q3 2027
                    </th>
                    <th scope="col" className="py-3 px-2 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground text-right">
                      Q4 2027
                    </th>
                    <th scope="col" className="py-3 pl-2 font-normal text-[11px] uppercase tracking-[0.15em] text-muted-foreground text-right">
                      2027 avg
                    </th>
                  </tr>
                </thead>
                <tbody className="font-serif">
                  <tr className="border-b border-line/60">
                    <th scope="row" className="py-4 pr-4 text-left text-base">
                      Fannie Mae
                    </th>
                    <td className="py-4 px-2 text-right text-lg">6.4%</td>
                    <td className="py-4 px-2 text-right text-lg">6.4%</td>
                    <td className="py-4 px-2 text-right text-lg text-gold">6.4%</td>
                    <td className="py-4 px-2 text-right text-lg text-gold">6.3%</td>
                    <td className="py-4 px-2 text-right text-lg text-gold">6.3%</td>
                    <td className="py-4 px-2 text-right text-lg text-gold">6.3%</td>
                    <td className="py-4 pl-2 text-right text-lg">6.3%</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-4 pr-4 text-left text-base">
                      Mortgage Bankers Association
                    </th>
                    <td className="py-4 px-2 text-right text-lg">6.5%</td>
                    <td className="py-4 px-2 text-right text-lg">6.5%</td>
                    <td className="py-4 px-2 text-right text-lg">6.5%</td>
                    <td className="py-4 px-2 text-right text-lg">6.5%</td>
                    <td className="py-4 px-2 text-right text-lg">6.5%</td>
                    <td className="py-4 px-2 text-right text-lg">6.5%</td>
                    <td className="py-4 pl-2 text-right text-lg">6.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="border-l-2 border-gold pl-4">
                <h3 className="font-serif text-lg mb-1">What could push rates down</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Further Fed rate cuts, cooling inflation, or softer employment
                  data would pull Treasury yields lower — and mortgage quotes
                  follow.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <h3 className="font-serif text-lg mb-1">What could push rates up</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sticky inflation, a stronger-than-expected labor market, or
                  renewed Treasury issuance could lift yields and push mortgage
                  rates back toward the upper-6% range.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <h3 className="font-serif text-lg mb-1">What it means for you</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Waiting for a return to 3% may cost you years of equity. If a
                  purchase or refi makes sense at today's rate, a free float-down
                  or refi later can capture any future drop.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs text-muted-foreground leading-relaxed max-w-3xl">
              Forecast figures are quarterly-average 30-year fixed rates from
              Fannie Mae's June 2026 Housing Forecast and the MBA May 2026
              Mortgage Finance Forecast. Forecasts are estimates by those
              organizations and are subject to change without notice; they are
              not a rate quote, a commitment to lend, or financial advice.
              Sources:{" "}
              <a
                className="text-gold hover:underline"
                href="https://www.fanniemae.com/media/57071/display"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fannie Mae
              </a>
              ,{" "}
              <a
                className="text-gold hover:underline"
                href="https://www.mba.org/docs/default-source/research-and-forecasts/forecasts/2026/mortgage-finance-forecast-may-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                MBA
              </a>
              .
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
