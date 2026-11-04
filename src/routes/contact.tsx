import { createFileRoute } from "@tanstack/react-router";
import { Phone, Clock } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Contact } from "@/components/site/Contact";
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";

const TITLE = "Contact Warren Factor | The Discount Mortgage Store";
const DESC = "Call or message Warren Factor at The Discount Mortgage Store. Send an inquiry, see office hours, and get a personal reply about your mortgage.";

const HOURS = [
  ["Monday – Friday", "9:00 AM – 6:00 PM"],
  ["Saturday", "10:00 AM – 2:00 PM"],
  ["Sunday", "By appointment"],
] as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-cream">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Get in touch</p>
            <h1 className="mt-4 text-center font-serif text-4xl md:text-5xl leading-tight text-foreground">Contact Warren</h1>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="border border-border bg-background p-8">
                <Phone className="h-5 w-5 text-gold" />
                <h2 className="mt-3 font-serif text-2xl text-foreground">Call directly</h2>
                <a href={`tel:${PHONE_TEL}`} className="mt-2 block text-xl text-gold hover:underline">{PHONE_DISPLAY}</a>
                <p className="mt-2 text-sm text-muted-foreground">Warren answers personally — no call center.</p>
              </div>
              <div className="border border-border bg-background p-8">
                <Clock className="h-5 w-5 text-gold" />
                <h2 className="mt-3 font-serif text-2xl text-foreground">Office hours</h2>
                <dl className="mt-3 space-y-2 text-sm">
                  {HOURS.map(([d, h]) => (
                    <div key={d} className="flex justify-between gap-4 border-b border-border pb-2">
                      <dt className="text-foreground">{d}</dt>
                      <dd className="text-muted-foreground">{h}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">Eastern Time</p>
              </div>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
