import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT, WEB3FORMS_ACCESS_KEY } from "@/lib/site-data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  citizenship: string;
  hasItin: string;
  downPayment: string;
  propertyUse: string;
  timeline: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  citizenship: "",
  hasItin: "",
  downPayment: "",
  propertyUse: "",
  timeline: "",
  message: "",
};

const inputClass =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary";

const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2";

export function ExpatInquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        interest: "Foreign National / Expat Mortgage",
        message: [
          `Country of residence: ${form.country}`,
          `Citizenship / residency: ${form.citizenship}`,
          `ITIN: ${form.hasItin}`,
          `Estimated down payment: ${form.downPayment}`,
          `Property use: ${form.propertyUse}`,
          `Timeline: ${form.timeline}`,
          form.message ? `Notes: ${form.message}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      });
      if (error) throw error;

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Expat / Foreign National Inquiry — ${form.name}`,
          from_name: "The Discount Mortgage Store Website",
          name: form.name,
          email: form.email,
          phone: form.phone,
          country_of_residence: form.country,
          citizenship_status: form.citizenship,
          has_itin: form.hasItin,
          estimated_down_payment: form.downPayment,
          property_use: form.propertyUse,
          timeline: form.timeline,
          message: form.message,
        }),
      });

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-primary/40 bg-primary/5 p-10 text-center">
        <p className="font-display text-3xl font-medium text-foreground">Thank you, {form.name.split(" ")[0]}.</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your information has been sent directly to Warren. He will personally review your
          situation and reach out within one business day to tell you exactly what you qualify for.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Need a faster answer? Call{" "}
          <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="text-primary underline underline-offset-4">
            {CONTACT.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="exp-name" className={labelClass}>Full Name *</label>
          <input id="exp-name" required value={form.name} onChange={set("name")} className={inputClass} placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="exp-email" className={labelClass}>Email *</label>
          <input id="exp-email" type="email" required value={form.email} onChange={set("email")} className={inputClass} placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="exp-phone" className={labelClass}>Phone / WhatsApp</label>
          <input id="exp-phone" type="tel" value={form.phone} onChange={set("phone")} className={inputClass} placeholder="+44 ..." />
        </div>
        <div>
          <label htmlFor="exp-country" className={labelClass}>Country of Residence *</label>
          <input id="exp-country" required value={form.country} onChange={set("country")} className={inputClass} placeholder="e.g. United Kingdom, Brazil, Israel" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="exp-citizenship" className={labelClass}>Citizenship / Residency Status *</label>
          <select id="exp-citizenship" required value={form.citizenship} onChange={set("citizenship")} className={inputClass}>
            <option value="">Select…</option>
            <option>Foreign National (no US residency)</option>
            <option>US Citizen living abroad (Expat)</option>
            <option>Permanent Resident (Green Card)</option>
            <option>Visa Holder (H-1B, L-1, E-2, etc.)</option>
            <option>ITIN Holder</option>
            <option>Other / Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="exp-itin" className={labelClass}>Do you have a US ITIN or SSN?</label>
          <select id="exp-itin" value={form.hasItin} onChange={set("hasItin")} className={inputClass}>
            <option value="">Select…</option>
            <option>Yes — SSN</option>
            <option>Yes — ITIN</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="exp-down" className={labelClass}>Estimated Down Payment</label>
          <select id="exp-down" value={form.downPayment} onChange={set("downPayment")} className={inputClass}>
            <option value="">Select…</option>
            <option>Under $50,000</option>
            <option>$50,000 – $100,000</option>
            <option>$100,000 – $250,000</option>
            <option>$250,000 – $500,000</option>
            <option>Over $500,000</option>
          </select>
        </div>
        <div>
          <label htmlFor="exp-use" className={labelClass}>Property Use</label>
          <select id="exp-use" value={form.propertyUse} onChange={set("propertyUse")} className={inputClass}>
            <option value="">Select…</option>
            <option>Investment / Rental</option>
            <option>Vacation / Second Home</option>
            <option>Primary Residence</option>
            <option>Mixed / Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="exp-timeline" className={labelClass}>When are you looking to buy?</label>
        <select id="exp-timeline" value={form.timeline} onChange={set("timeline")} className={inputClass}>
          <option value="">Select…</option>
          <option>Immediately — I found a property</option>
          <option>Within 1–3 months</option>
          <option>Within 3–6 months</option>
          <option>6+ months / just researching</option>
        </select>
      </div>

      <div>
        <label htmlFor="exp-message" className={labelClass}>Anything else Warren should know?</label>
        <textarea
          id="exp-message"
          rows={4}
          value={form.message}
          onChange={set("message")}
          className={inputClass}
          placeholder="Target cities, price range, income situation, questions…"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong sending your form. Please try again or call {CONTACT.phone}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit — Find Out What I Qualify For"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        No obligation. Your information goes directly to Warren Factor and is never sold.
      </p>
    </form>
  );
}
