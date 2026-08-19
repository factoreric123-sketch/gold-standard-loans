import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { COMPANY_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";

const CITIZENSHIP_OPTIONS = [
  "US Citizen",
  "Permanent Resident (Green Card)",
  "Visa Holder (H-1B, L-1, E-2, etc.)",
  "Foreign National (living abroad)",
  "Prefer not to say",
] as const;

const ITIN_OPTIONS = [
  "Yes — I have an ITIN",
  "No — I don't have one",
  "Not sure",
] as const;

const DOWN_PAYMENT_OPTIONS = [
  "15–20% down",
  "20–25% down",
  "25–30% down",
  "30%+ down",
  "Not sure yet",
] as const;

const PROPERTY_USE_OPTIONS = [
  "Primary residence",
  "Second / vacation home",
  "Investment property",
] as const;

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(80),
  lastName: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  country: z.string().trim().min(1, "Required").max(80),
  citizenshipStatus: z.string().min(1, "Select one"),
  hasItin: z.string().min(1, "Select one"),
  downPayment: z.string().min(1, "Select one"),
  propertyUse: z.string().min(1, "Select one"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

// Same Web3Forms key as the main contact form — emails warrenfactor@gmail.com.
const ACCESS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

async function emailWarren(data: Fields): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Foreign national inquiry — ${data.firstName} ${data.lastName} (${data.country})`,
        from_name: `${COMPANY_NAME} website`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        country_of_residence: data.country,
        citizenship_status: data.citizenshipStatus,
        has_itin: data.hasItin,
        down_payment: data.downPayment,
        property_use: data.propertyUse,
        message: data.message || "(no message)",
      }),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

async function saveToDb(data: Fields): Promise<boolean> {
  try {
    const details = [
      `Country of residence: ${data.country}`,
      `Down payment: ${data.downPayment}`,
      `Property use: ${data.propertyUse}`,
      "",
      data.message || "",
    ]
      .join("\n")
      .trim();
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      citizenship_status: data.citizenshipStatus,
      has_itin: data.hasItin,
      loan_type: "Foreign National",
      message: details || null,
    });
    return !error;
  } catch {
    return false;
  }
}

const inputCls =
  "w-full border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none transition-colors";
const labelCls =
  "block text-[11px] uppercase tracking-[0.2em] text-muted mb-1.5";

export function ExpatInquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      phone: form.get("phone"),
      country: form.get("country"),
      citizenshipStatus: form.get("citizenshipStatus"),
      hasItin: form.get("hasItin"),
      downPayment: form.get("downPayment"),
      propertyUse: form.get("propertyUse"),
      message: form.get("message") || "",
    });
    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const [emailed, saved] = await Promise.all([
      emailWarren(parsed.data),
      saveToDb(parsed.data),
    ]);
    setSubmitting(false);
    if (emailed || saved) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Something went wrong — please try again or call Warren directly.");
    }
  }

  const err = (k: keyof Fields) =>
    errors[k] ? <p className="mt-1 text-xs text-red-700">{errors[k]}</p> : null;

  if (done) {
    return (
      <div className="border border-gold bg-white px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold mx-auto mb-4" />
        <h2 className="font-serif text-3xl mb-3">Request received</h2>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          Thank you — Warren has your details and will personally review your
          situation and reply with the programs you qualify for, usually within
          one business day.
        </p>
        <p className="mt-6 text-sm text-muted">
          Need a faster answer? Call{" "}
          <a
            href={`tel:${PHONE_TEL}`}
            className="text-gold underline underline-offset-4"
          >
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-line bg-white px-6 py-8 md:px-10 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fn-firstName" className={labelCls}>First name</label>
          <input id="fn-firstName" name="firstName" className={inputCls} autoComplete="given-name" />
          {err("firstName")}
        </div>
        <div>
          <label htmlFor="fn-lastName" className={labelCls}>Last name</label>
          <input id="fn-lastName" name="lastName" className={inputCls} autoComplete="family-name" />
          {err("lastName")}
        </div>
        <div>
          <label htmlFor="fn-email" className={labelCls}>Email</label>
          <input id="fn-email" name="email" type="email" className={inputCls} autoComplete="email" />
          {err("email")}
        </div>
        <div>
          <label htmlFor="fn-phone" className={labelCls}>Phone / WhatsApp</label>
          <input id="fn-phone" name="phone" type="tel" placeholder="Include country code" className={inputCls} autoComplete="tel" />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="fn-country" className={labelCls}>Country of residence</label>
          <input id="fn-country" name="country" placeholder="e.g. United Kingdom" className={inputCls} />
          {err("country")}
        </div>
        <div>
          <label htmlFor="fn-citizenship" className={labelCls}>Citizenship / residency status</label>
          <select id="fn-citizenship" name="citizenshipStatus" className={inputCls} defaultValue="">
            <option value="" disabled>Select…</option>
            {CITIZENSHIP_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {err("citizenshipStatus")}
        </div>
        <div>
          <label htmlFor="fn-itin" className={labelCls}>Do you have an ITIN?</label>
          <select id="fn-itin" name="hasItin" className={inputCls} defaultValue="">
            <option value="" disabled>Select…</option>
            {ITIN_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {err("hasItin")}
        </div>
        <div>
          <label htmlFor="fn-down" className={labelCls}>Estimated down payment</label>
          <select id="fn-down" name="downPayment" className={inputCls} defaultValue="">
            <option value="" disabled>Select…</option>
            {DOWN_PAYMENT_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {err("downPayment")}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="fn-use" className={labelCls}>Property use</label>
          <select id="fn-use" name="propertyUse" className={inputCls} defaultValue="">
            <option value="" disabled>Select…</option>
            {PROPERTY_USE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {err("propertyUse")}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="fn-message" className={labelCls}>Anything else Warren should know? (optional)</label>
          <textarea id="fn-message" name="message" rows={4} className={inputCls} placeholder="Target cities, price range, income situation, questions…" />
          {err("message")}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-gold px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white hover:bg-ink transition-colors disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send to Warren — Find Out What I Qualify For"}
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-4 text-[11px] text-muted text-center leading-relaxed">
        No income verification documentation may be required — Warren can often
        qualify foreign nationals on assets and a passport alone. Your
        information goes directly to Warren and is never sold.
      </p>
    </form>
  );
}
