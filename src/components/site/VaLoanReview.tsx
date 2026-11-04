import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";

const ACCESS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

const VA_RATES = [
  { label: "VA Cash-Out", rate: "Up to 100% LTV", note: "Same base rate as purchase" },
  { label: "30-Yr VA Fixed", rate: "6.375%", note: "Purchase or refinance" },
  { label: "VA IRRRL", rate: "Streamline", note: "Lower your existing VA rate" },
];

const ELIGIBILITY = [
  "Veterans with 90 consecutive days of active service in wartime, or 181 days in peacetime",
  "Active-duty service members after 90 continuous days of service",
  "National Guard and Reserve members with 6 years of service (or 90 days of qualifying active duty)",
  "Surviving spouses of service members who died in service or from a service-connected disability",
  "A Certificate of Eligibility (COE) — Warren can pull it for you",
  "Funding fee waived for veterans receiving VA compensation for a service-connected disability",
];

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  goal: z.string().min(1),
  homeValue: z.string().trim().max(30).optional(),
  balance: z.string().trim().max(30).optional(),
  currentRate: z.string().trim().max(15).optional(),
  disability: z.string().min(1),
  message: z.string().trim().max(1500).optional(),
});
type Fields = z.infer<typeof schema>;

const inputCls =
  "w-full border border-line bg-white px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none";
const labelCls = "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5";

export function VaLoanReview() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (raw.website) return; // honeypot
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setError("");
    setBusy(true);
    const d: Fields = parsed.data;
    const [first, ...rest] = d.name.split(" ");
    const summary = `Goal: ${d.goal}\nHome value: ${d.homeValue || "—"}\nMortgage balance: ${d.balance || "—"}\nCurrent rate: ${d.currentRate || "—"}\nService-connected disability rating: ${d.disability}\n\n${d.message || ""}`;
    const { error: dbErr } = await supabase.from("contact_submissions").insert({
      first_name: first,
      last_name: rest.join(" ") || "-",
      email: d.email,
      phone: d.phone,
      loan_type: "VA Loan Review",
      message: summary,
    });
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `VA loan review request — ${d.name}`,
        from_name: `${COMPANY_NAME} website`,
        name: d.name,
        email: d.email,
        phone: d.phone,
        message: summary,
      }),
    }).catch(() => {});
    setBusy(false);
    if (dbErr) setError(`Couldn't send — please call ${PHONE_DISPLAY}.`);
    else setDone(true);
  }

  return (
    <>
      <section className="bg-off-white border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Today's VA Rates</div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              VA pricing <span className="italic text-gold">at a glance.</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-3 gap-5">
            {VA_RATES.map((r) => (
              <div key={r.label} className="border border-line bg-card p-6">
                <div className="text-[11px] uppercase tracking-widest text-foreground/50">{r.label}</div>
                <div className="font-serif text-3xl text-gold mt-2">{r.rate}</div>
                <div className="text-sm text-foreground/60 mt-1">{r.note}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground/45">Rates change daily and depend on credit, loan amount and property. <a href="/todays-rates" className="text-gold underline">See all of today's rates</a>.</p>

          <h3 className="font-serif text-2xl md:text-3xl mt-14 mb-6">Who's eligible</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {ELIGIBILITY.map((e) => (
              <li key={e} className="flex gap-3 text-foreground/75 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" /> <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="va-review" className="bg-background border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">VA Loan Application</div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            Map out your <span className="italic text-gold">exact numbers.</span>
          </h2>
          <p className="mt-4 text-foreground/65 leading-relaxed">
            Share your home's value, current mortgage and disability rating — Warren will check your cash-out amount and funding-fee exemption.
          </p>
          {done ? (
            <div className="mt-8 border border-gold/40 bg-card p-8 flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-gold shrink-0" />
              <p className="text-foreground/75">Thank you — Warren will reach out shortly. Need it faster? Call <a className="text-gold" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid sm:grid-cols-2 gap-5" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="sm:col-span-2"><label className={labelCls} htmlFor="va-name">Full name</label><input id="va-name" name="name" className={inputCls} required /></div>
              <div><label className={labelCls} htmlFor="va-email">Email</label><input id="va-email" name="email" type="email" className={inputCls} required /></div>
              <div><label className={labelCls} htmlFor="va-phone">Phone</label><input id="va-phone" name="phone" type="tel" className={inputCls} required /></div>
              <div className="sm:col-span-2"><label className={labelCls} htmlFor="va-goal">Goal</label>
                <select id="va-goal" name="goal" className={inputCls} defaultValue="100% VA cash-out refinance">
                  <option>100% VA cash-out refinance</option><option>VA purchase</option><option>VA IRRRL (lower my rate)</option><option>Not sure yet</option>
                </select></div>
              <div><label className={labelCls} htmlFor="va-value">Estimated home value</label><input id="va-value" name="homeValue" inputMode="numeric" placeholder="$500,000" className={inputCls} /></div>
              <div><label className={labelCls} htmlFor="va-bal">Current mortgage balance</label><input id="va-bal" name="balance" inputMode="numeric" placeholder="$300,000" className={inputCls} /></div>
              <div><label className={labelCls} htmlFor="va-rate">Current interest rate</label><input id="va-rate" name="currentRate" placeholder="7.25%" className={inputCls} /></div>
              <div><label className={labelCls} htmlFor="va-dis">Service-connected disability rating?</label>
                <select id="va-dis" name="disability" className={inputCls} defaultValue="No">
                  <option>No</option><option>Yes — 10% or higher</option><option>Claim pending</option><option>Not sure</option>
                </select></div>
              <div className="sm:col-span-2"><label className={labelCls} htmlFor="va-msg">Anything else (optional)</label><textarea id="va-msg" name="message" rows={4} className={inputCls} /></div>
              {error && <p className="sm:col-span-2 text-sm text-destructive">{error}</p>}
              <button disabled={busy} className="sm:col-span-2 inline-flex justify-center items-center gap-2 bg-gold text-gold-foreground px-7 py-3.5 text-sm tracking-wide hover:opacity-90 disabled:opacity-60">
                {busy ? "Sending…" : "Send my VA review"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
