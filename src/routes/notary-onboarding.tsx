import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_URL, PHONE_TEL, PHONE_DISPLAY, EMAIL, EMAIL_DISPLAY } from "@/lib/site-data";
import { COMPANY_TYPES, DOCS, submitVendorOnboarding } from "@/lib/vendor-onboarding.functions";

const TITLE = "Notary Vendor Onboarding for Lenders | The Discount Mortgage Store";
const DESC =
  "Lenders, title and escrow companies: request Warren M. Factor's commission, E&O insurance and references to onboard him as your South Florida signing agent.";

export const Route = createFileRoute("/notary-onboarding")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/notary-onboarding` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/notary-onboarding` }],
  }),
  component: OnboardingPage,
});

const input = "w-full border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold";
const label = "block text-xs uppercase tracking-[0.18em] text-foreground/60 mb-2";

function OnboardingPage() {
  const submit = useServerFn(submitVendorOnboarding);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "");
    setStatus("sending");
    setErr("");
    try {
      await submit({
        data: {
          company: s("company"),
          company_type: s("company_type") as (typeof COMPANY_TYPES)[number],
          contact_name: s("contact_name"),
          email: s("email"),
          phone: s("phone"),
          fee_offered: s("fee_offered"),
          payment_terms: s("payment_terms"),
          eo_min_coverage: s("eo_min_coverage"),
          requested_docs: f.getAll("requested_docs").map(String) as (typeof DOCS)[number][],
          references_needed: s("references_needed") ? Number(s("references_needed")) : undefined,
          portal_url: s("portal_url"),
          notes: s("notes"),
          website: s("website"),
        },
      });
      setStatus("done");
    } catch {
      setStatus("error");
      setErr("Please check the required fields (and that the portal link is a full https:// address).");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-6 pt-32 pb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">For lenders, title &amp; escrow</p>
            <h1 className="font-serif text-4xl md:text-6xl mb-5">Vendor onboarding</h1>
            <p className="text-foreground/60 leading-relaxed max-w-2xl">
              Add Warren M. Factor to your approved signing-agent panel for Palm Beach, Broward and
              Miami-Dade counties. Tell me your fee schedule, E&amp;O requirements and which documents you
              need — I&rsquo;ll send my commission details, E&amp;O insurance information and references,
              and complete your onboarding or vendor-credentialing process.
            </p>
          </div>
        </section>

        <section className="bg-off-white">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="border border-line bg-background p-8 md:p-12">
              {status === "done" ? (
                <div>
                  <h2 className="font-serif text-3xl mb-3">Request received</h2>
                  <p className="text-foreground/60">
                    Thank you. Warren will reply with the requested documents and complete your onboarding.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <h2 className="md:col-span-2 font-serif text-2xl">Your company</h2>
                  <div>
                    <label className={label} htmlFor="vo-co">Company name *</label>
                    <input id="vo-co" name="company" required maxLength={150} className={input} />
                  </div>
                  <div>
                    <label className={label} htmlFor="vo-type">Company type *</label>
                    <select id="vo-type" name="company_type" required defaultValue="" className={input}>
                      <option value="" disabled>Select</option>
                      {COMPANY_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={label} htmlFor="vo-name">Contact name *</label>
                    <input id="vo-name" name="contact_name" required maxLength={100} className={input} />
                  </div>
                  <div>
                    <label className={label} htmlFor="vo-phone">Phone *</label>
                    <input id="vo-phone" name="phone" type="tel" required maxLength={30} className={input} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={label} htmlFor="vo-email">Email *</label>
                    <input id="vo-email" name="email" type="email" required maxLength={255} className={input} />
                  </div>

                  <h2 className="md:col-span-2 font-serif text-2xl mt-4">Terms &amp; requirements</h2>
                  <div>
                    <label className={label} htmlFor="vo-fee">Fee offered per signing</label>
                    <input id="vo-fee" name="fee_offered" maxLength={200} placeholder="e.g. $150 refi / $200 purchase" className={input} />
                  </div>
                  <div>
                    <label className={label} htmlFor="vo-terms">Payment terms</label>
                    <input id="vo-terms" name="payment_terms" maxLength={200} placeholder="e.g. Net 30" className={input} />
                  </div>
                  <div>
                    <label className={label} htmlFor="vo-eo">Minimum E&amp;O coverage required</label>
                    <input id="vo-eo" name="eo_min_coverage" maxLength={100} placeholder="e.g. $100,000" className={input} />
                  </div>
                  <div>
                    <label className={label} htmlFor="vo-refs">References needed</label>
                    <input id="vo-refs" name="references_needed" type="number" min={0} max={10} className={input} />
                  </div>
                  <fieldset className="md:col-span-2">
                    <legend className={label}>Documents you need from me</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {DOCS.map((d) => (
                        <label key={d} className="flex items-center gap-3 border border-line px-4 py-3 text-sm cursor-pointer min-h-11">
                          <input type="checkbox" name="requested_docs" value={d} className="accent-gold" />
                          {d}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="md:col-span-2">
                    <label className={label} htmlFor="vo-portal">Onboarding / credentialing portal link</label>
                    <input id="vo-portal" name="portal_url" type="url" maxLength={500} placeholder="https://" className={input} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={label} htmlFor="vo-notes">Notes</label>
                    <textarea id="vo-notes" name="notes" rows={4} maxLength={2000} className={input} />
                  </div>
                  <div className="md:col-span-2 flex flex-wrap items-center gap-4">
                    <button type="submit" disabled={status === "sending"} className="bg-gold px-8 py-4 text-sm tracking-wide text-gold-foreground hover:bg-gold/90 disabled:opacity-60">
                      {status === "sending" ? "Sending…" : "Submit onboarding request"}
                    </button>
                    {status === "error" && <p className="text-sm text-destructive">{err}</p>}
                  </div>
                </form>
              )}
            </div>
            <p className="mt-8 text-sm text-foreground/60">
              Prefer to talk? Call <a href={`tel:${PHONE_TEL}`} className="text-gold hover:underline">{PHONE_DISPLAY}</a> or email{" "}
              <a href={`mailto:${EMAIL}`} className="text-gold hover:underline lowercase">{EMAIL_DISPLAY}</a>.{" "}
              <a href="/notary" className="text-gold hover:underline">Back to notary services</a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
