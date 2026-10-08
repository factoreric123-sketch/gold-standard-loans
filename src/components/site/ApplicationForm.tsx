import { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { COMPANY_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";

const ACCESS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";
// T-Mobile email-to-text gateway for (561) 577-1882
const SMS_GATEWAY = "5615771882@tmomail.net";

const money = z.string().trim().max(20).optional().or(z.literal(""));
const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(80),
  lastName: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  purpose: z.string().min(1, "Select one"),
  loanProgram: z.string().min(1, "Select one"),
  propertyType: z.string().min(1, "Select one"),
  occupancy: z.string().min(1, "Select one"),
  propertyState: z.string().trim().min(2, "Required").max(40),
  propertyCity: z.string().trim().max(80).optional().or(z.literal("")),
  price: z.string().trim().min(1, "Required").max(20),
  loanAmount: z.string().trim().min(1, "Required").max(20),
  downPayment: money,
  credit: z.string().min(1, "Select one"),
  employment: z.string().min(1, "Select one"),
  income: money,
  citizenship: z.string().min(1, "Select one"),
  timeline: z.string().min(1, "Select one"),
  notes: z.string().trim().max(1500).optional().or(z.literal("")),
  consent: z.literal("on", { errorMap: () => ({ message: "Please agree to be contacted" }) }),
});
type Fields = z.infer<typeof schema>;
type Errs = Partial<Record<keyof Fields, string>>;

const SELECTS: Record<string, string[]> = {
  purpose: ["Purchase", "Refinance", "Cash-out refinance", "HELOC / second mortgage"],
  loanProgram: ["Not sure — recommend one", "Conventional", "FHA", "VA", "Bank Statement", "DSCR (investor)", "Foreign National", "Fix & Flip / Bridge", "Commercial / Hotel", "Jumbo"],
  propertyType: ["Single-family", "Condo / townhome", "2–4 unit", "Commercial / mixed use", "Land / other"],
  occupancy: ["Primary residence", "Second home", "Investment property"],
  credit: ["760+", "720–759", "680–719", "640–679", "580–639", "Below 580", "No U.S. credit"],
  employment: ["W-2 employee", "Self-employed", "Retired", "Investor / rental income", "Foreign income", "Other"],
  citizenship: ["U.S. citizen", "Permanent resident", "Non-permanent resident (visa)", "Foreign national", "ITIN holder"],
  timeline: ["Ready now / under contract", "Within 30 days", "1–3 months", "3–6 months", "Just exploring"],
};

const inputCls = "w-full border border-line bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none transition-colors";
const labelCls = "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5";

export function ApplicationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errs>({});
  const shownAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if ((fd.get("website") as string)?.length) return;
    if (Date.now() - shownAt.current < 4000) {
      toast.error("Please take a moment to complete the application.");
      return;
    }
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Errs = {};
      for (const i of parsed.error.issues) {
        const k = i.path[0] as keyof Fields;
        if (!errs[k]) errs[k] = i.message;
      }
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    const d = parsed.data;
    const name = `${d.firstName} ${d.lastName}`;
    const summary = [
      `Purpose: ${d.purpose}`, `Program: ${d.loanProgram}`,
      `Property: ${d.propertyType}, ${d.occupancy}, ${d.propertyCity ? d.propertyCity + ", " : ""}${d.propertyState}`,
      `Price/value: ${d.price}`, `Loan amount: ${d.loanAmount}`, `Down payment: ${d.downPayment || "—"}`,
      `Credit: ${d.credit}`, `Employment: ${d.employment}`, `Annual income: ${d.income || "—"}`,
      `Citizenship: ${d.citizenship}`, `Timeline: ${d.timeline}`, `Notes: ${d.notes || "—"}`,
    ].join("\n");

    setSubmitting(true);
    const post = (body: object) =>
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: ACCESS_KEY, ...body }),
      }).then((r) => r.json() as Promise<{ success?: boolean }>).then((j) => j.success === true).catch(() => false);

    const [saved, emailed] = await Promise.all([
      supabase.from("contact_submissions").insert({
        first_name: d.firstName, last_name: d.lastName, phone: d.phone, email: d.email,
        loan_type: `Mortgage Application — ${d.loanProgram}`, message: summary,
      }).then(({ error }) => !error, () => false),
      post({ subject: `NEW MORTGAGE APPLICATION — ${name}`, from_name: `${COMPANY_NAME} website`, replyto: d.email, name, email: d.email, phone: d.phone, application: summary }),
      post({ ccemail: SMS_GATEWAY, subject: `Application: ${name}`, from_name: "TDMS",
        message: `New app: ${name} ${d.phone} | ${d.purpose} ${d.loanProgram} | ${d.loanAmount} | ${d.propertyState} | credit ${d.credit} | ${d.timeline}`.slice(0, 300) }),
    ]);
    setSubmitting(false);
    if (saved || emailed) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error(`Something went wrong — please call ${PHONE_DISPLAY}.`);
    }
  }

  const err = (k: keyof Fields) => (errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null);
  const text = (k: keyof Fields, label: string, ph = "", type = "text", ac?: string) => (
    <div>
      <label htmlFor={`app-${k}`} className={labelCls}>{label}</label>
      <input id={`app-${k}`} name={k} type={type} autoComplete={ac} placeholder={ph} className={inputCls} />
      {err(k)}
    </div>
  );
  const select = (k: keyof Fields, label: string) => (
    <div>
      <label htmlFor={`app-${k}`} className={labelCls}>{label}</label>
      <select id={`app-${k}`} name={k} defaultValue="" className={inputCls}>
        <option value="" disabled>Select…</option>
        {SELECTS[k].map((o) => <option key={o}>{o}</option>)}
      </select>
      {err(k)}
    </div>
  );
  const heading = (n: string, t: string) => (
    <h2 className="md:col-span-2 mt-4 border-b border-line pb-2 font-serif text-2xl"><span className="text-gold mr-2">{n}</span>{t}</h2>
  );

  if (done) {
    return (
      <div className="border border-gold bg-white px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
        <h2 className="font-serif text-3xl mb-3">Application received</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Warren has your application and will call you personally, usually the same business day, to review options and next steps.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Can't wait? Call <a href={`tel:${PHONE_TEL}`} className="text-gold underline underline-offset-4">{PHONE_DISPLAY}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-white px-6 py-8 md:px-10 md:py-10">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {heading("01", "About you")}
        {text("firstName", "First name", "", "text", "given-name")}
        {text("lastName", "Last name", "", "text", "family-name")}
        {text("email", "Email", "you@email.com", "email", "email")}
        {text("phone", "Phone", "(555) 555-5555", "tel", "tel")}
        {select("citizenship", "Citizenship / residency")}
        {select("timeline", "Timeline")}

        {heading("02", "The loan")}
        {select("purpose", "Loan purpose")}
        {select("loanProgram", "Loan program")}
        {text("price", "Purchase price / home value", "$450,000")}
        {text("loanAmount", "Loan amount requested", "$360,000")}
        {text("downPayment", "Down payment (optional)", "$90,000")}

        {heading("03", "The property")}
        {select("propertyType", "Property type")}
        {select("occupancy", "Occupancy")}
        {text("propertyState", "State", "Florida")}
        {text("propertyCity", "City (optional)", "Boca Raton")}

        {heading("04", "Finances")}
        {select("credit", "Estimated credit score")}
        {select("employment", "Employment / income type")}
        {text("income", "Annual income (optional)", "$120,000")}

        <div className="md:col-span-2">
          <label htmlFor="app-notes" className={labelCls}>Anything else Warren should know? (optional)</label>
          <textarea id="app-notes" name="notes" rows={4} maxLength={1500} className={inputCls} />
        </div>
        <label className="md:col-span-2 flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[var(--color-gold)]" />
          <span>I agree to be contacted by phone, text or email by {COMPANY_NAME} about this application. This is not a commitment to lend.</span>
        </label>
        {err("consent")}
      </div>
      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5 text-gold" /> Never enter your Social Security number here — Warren collects it securely by phone.
      </p>
      <button type="submit" disabled={submitting} className="mt-6 inline-flex w-full md:w-auto items-center justify-center gap-2 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-gold/90 disabled:opacity-60">
        {submitting ? "Sending…" : "Submit application"} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
