import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Phone } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import { notifyOwner } from "@/lib/notify-owner";

const TITLE = "Home Insurance Evaluation | The Discount Mortgage Store";
const DESC = "Paying too much for homeowners insurance? Send Warren Factor your current policy details for a free home insurance evaluation in South Florida.";

export const Route = createFileRoute("/home-insurance-evaluation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/home-insurance-evaluation` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/home-insurance-evaluation` }],
  }),
  component: InsurancePage,
});

const TIPS = [
  ["Raise your hurricane deductible", "Moving from 2% to 5% can noticeably lower your annual premium."],
  ["Get a wind mitigation inspection", "Roof straps, shutters and impact windows can earn Florida discounts."],
  ["Bundle home and auto", "Many carriers discount both policies when written together."],
  ["Shop at every renewal", "Florida premiums change fast — compare quotes every year."],
];

const field = "w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold";

function InsurancePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const ok = await notifyOwner("Home Insurance Evaluation request", data);
    setStatus(ok ? "sent" : "error");
    if (ok) e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-cream">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Free review</p>
            <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-tight text-foreground">
              Home Insurance <span className="italic text-gold">Evaluation</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
              Insurance is often the fastest-rising part of a Florida housing payment. Send your current policy details and Warren will review where you may be able to pay less.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl text-foreground">Ways homeowners save</h2>
            <ul className="mt-6 space-y-5">
              {TIPS.map(([t, b]) => (
                <li key={t} className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-gold mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{t}</p>
                    <p className="text-sm text-muted-foreground">{b}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href={`tel:${PHONE_TEL}`} className="mt-8 inline-flex items-center gap-2 bg-charcoal text-gold px-5 py-3 text-xs uppercase tracking-[0.15em]">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <p className="mt-6 text-xs text-muted-foreground">
              General information only. Coverage and pricing are set by licensed insurance carriers and agents.
            </p>
          </div>

          <form onSubmit={onSubmit} className="border border-border p-8 space-y-4">
            <h2 className="font-serif text-2xl text-foreground">Request your evaluation</h2>
            <input name="name" required placeholder="Full name" className={field} />
            <input name="phone" required type="tel" placeholder="Phone" className={field} />
            <input name="email" required type="email" placeholder="Email" className={field} />
            <input name="property_address" placeholder="Property address or ZIP" className={field} />
            <input name="current_carrier" placeholder="Current insurance company" className={field} />
            <input name="annual_premium" placeholder="Current annual premium ($)" className={field} />
            <input name="renewal_date" placeholder="Renewal date" className={field} />
            <textarea name="message" rows={3} placeholder="Anything else (roof age, home type, etc.)" className={field} />
            <button disabled={status === "sending"} className="w-full bg-gold text-gold-foreground py-3 text-xs uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Get my evaluation"}
            </button>
            {status === "sent" && <p className="text-sm text-gold">Thanks — Warren will be in touch shortly.</p>}
            {status === "error" && <p className="text-sm text-destructive">Something went wrong. Please call {PHONE_DISPLAY}.</p>}
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
