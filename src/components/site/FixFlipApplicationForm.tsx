import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { notifyOwner } from "@/lib/notify-owner";
import {
  CREDIT_BANDS,
  FLIP_EXPERIENCE,
  LOAN_PURPOSES,
  PROPERTIES_OWNED,
  TIMELINES,
  submitFixFlipApplication,
} from "@/lib/fix-flip.functions";
import { COMPANY_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";

const inputCls =
  "w-full border border-line bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none transition-colors";
const labelCls = "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5";

type Fields =
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "company"
  | "property_city"
  | "property_state"
  | "purchase_price"
  | "rehab_budget"
  | "arv"
  | "loan_purpose"
  | "timeline"
  | "flip_experience"
  | "properties_owned"
  | "credit_score"
  | "notes";

type Errs = Partial<Record<Fields, string>>;

export function FixFlipApplicationForm() {
  const submit = useServerFn(submitFixFlipApplication);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errs, setErrs] = useState<Errs>({});
  const [serverErr, setServerErr] = useState("");
  const shownAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if ((fd.get("website") as string)?.length) return;
    if (Date.now() - shownAt.current < 4000) {
      setServerErr("Please take a moment to complete the application.");
      return;
    }
    const s = (k: Fields) => String(fd.get(k) ?? "");
    const data = {
      first_name: s("first_name"),
      last_name: s("last_name"),
      email: s("email"),
      phone: s("phone"),
      company: s("company"),
      property_city: s("property_city"),
      property_state: s("property_state"),
      purchase_price: s("purchase_price"),
      rehab_budget: s("rehab_budget"),
      arv: s("arv"),
      loan_purpose: s("loan_purpose"),
      timeline: s("timeline"),
      flip_experience: s("flip_experience"),
      properties_owned: s("properties_owned"),
      credit_score: s("credit_score"),
      notes: s("notes"),
      website: s("company") && false ? "" : String(fd.get("website") ?? ""),
    };

    setServerErr("");
    setStatus("sending");
    try {
      await submit({ data });
      setStatus("done");
      const name = `${data.first_name} ${data.last_name}`;
      void notifyOwner(`NEW FIX & FLIP APPLICATION — ${name}`, {
        name,
        email: data.email,
        phone: data.phone,
        company: data.company || "—",
        deal: `${data.loan_purpose} | ${data.property_city ? data.property_city + ", " : ""}${data.property_state} | price ${data.purchase_price || "—"} | rehab ${data.rehab_budget || "—"} | ARV ${data.arv || "—"}`,
        experience: `${data.flip_experience} | properties ${data.properties_owned} | credit ${data.credit_score}`,
        timeline: data.timeline,
        notes: data.notes || "—",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (x) {
      setStatus("error");
      setServerErr(
        x instanceof Error && x.message.length < 140
          ? x.message
          : "Something went wrong — please call " + PHONE_DISPLAY + ".",
      );
    }
  }

  const err = (k: Fields) => (errs[k] ? <p className="mt-1 text-xs text-destructive">{errs[k]}</p> : null);
  const text = (k: Fields, label: string, ph = "", type = "text", ac?: string) => (
    <div>
      <label htmlFor={`ff-${k}`} className={labelCls}>{label}</label>
      <input id={`ff-${k}`} name={k} type={type} autoComplete={ac} placeholder={ph} className={inputCls} />
      {err(k)}
    </div>
  );
  const select = (k: Fields, label: string, opts: readonly string[]) => (
    <div>
      <label htmlFor={`ff-${k}`} className={labelCls}>{label}</label>
      <select id={`ff-${k}`} name={k} defaultValue="" className={inputCls}>
        <option value="" disabled>Select…</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
      {err(k)}
    </div>
  );
  const heading = (n: string, t: string) => (
    <h2 className="md:col-span-2 mt-4 border-b border-line pb-2 font-serif text-2xl">
      <span className="text-gold mr-2">{n}</span>{t}
    </h2>
  );

  if (status === "done") {
    return (
      <div className="border border-gold bg-white px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
        <h2 className="font-serif text-3xl mb-3">Application received</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Warren has your deal and will call you personally, usually the same business day, with
          terms and the documents he needs.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Can't wait? Call{" "}
          <a href={`tel:${PHONE_TEL}`} className="text-gold underline underline-offset-4">
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-white px-6 py-8 md:px-10 md:py-10">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {heading("01", "About you")}
        {text("first_name", "First name", "", "text", "given-name")}
        {text("last_name", "Last name", "", "text", "family-name")}
        {text("email", "Email", "you@email.com", "email", "email")}
        {text("phone", "Phone", "(555) 555-5555", "tel", "tel")}
        {text("company", "LLC / entity name (optional)", "Sunrise Holdings LLC")}

        {heading("02", "The deal")}
        {text("property_city", "Property city", "Boca Raton")}
        {text("property_state", "State", "Florida")}
        {text("purchase_price", "Purchase price", "$350,000")}
        {text("rehab_budget", "Rehab budget", "$80,000")}
        {text("arv", "After-repair value (optional)", "$560,000")}
        {select("loan_purpose", "Loan purpose", LOAN_PURPOSES)}
        {select("timeline", "Timeline", TIMELINES)}

        {heading("03", "Your experience")}
        {select("flip_experience", "Completed flips", FLIP_EXPERIENCE)}
        {select("properties_owned", "Properties you own", PROPERTIES_OWNED)}
        {select("credit_score", "Estimated credit score", CREDIT_BANDS)}

        <div className="md:col-span-2">
          <label htmlFor="ff-notes" className={labelCls}>
            Anything else about the deal? (optional)
          </label>
          <textarea id="ff-notes" name="notes" rows={4} maxLength={1500} className={inputCls} />
        </div>
      </div>
      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5 text-gold" /> Never enter your Social Security number here —
        Warren collects it securely by phone.
      </p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full md:w-auto items-center justify-center gap-2 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-foreground hover:bg-gold/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit application"} <ArrowRight className="h-4 w-4" />
      </button>
      {status === "error" && serverErr && (
        <p className="mt-4 text-sm text-destructive">{serverErr}</p>
      )}
      {serverErr && status !== "error" && (
        <p className="mt-4 text-sm text-destructive">{serverErr}</p>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        Submitting this form is not a commitment to lend. {COMPANY_NAME} reviews every deal
        personally.
      </p>
    </form>
  );
}
