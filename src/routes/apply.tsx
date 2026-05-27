import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PROGRAMS, PHONE_DISPLAY, PHONE_TEL, EMAIL, COMPANY_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: `Apply Online | ${COMPANY_NAME}` },
      {
        name: "description",
        content:
          "Start your mortgage application in minutes. A few quick questions and Warren will personally find your lowest qualifying rate.",
      },
    ],
  }),
  component: ApplyPage,
});

type FormState = {
  loanPurpose: string;
  propertyUse: string;
  loanProgram: string;
  state: string;
  propertyValue: string;
  loanAmount: string;
  creditScore: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  loanPurpose: "",
  propertyUse: "",
  loanProgram: "",
  state: "",
  propertyValue: "",
  loanAmount: "",
  creditScore: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const PURPOSES = ["Purchase", "Refinance", "Cash-Out Refinance"];
const USES = ["Primary Residence", "Second Home", "Investment Property"];
const CREDIT = ["Excellent (720+)", "Good (660–719)", "Fair (620–659)", "Below 620", "Not sure"];
const PROGRAM_OPTIONS = [...PROGRAMS.map((p) => p.name), "Not sure yet"];
const STEPS = ["Loan details", "Property & credit", "Your info"];

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildMailto(d: FormState) {
  const subject = `Loan application — ${d.firstName} ${d.lastName} (${d.loanPurpose})`;
  const body = [
    `Name: ${d.firstName} ${d.lastName}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    "",
    `Loan purpose: ${d.loanPurpose}`,
    `Property use: ${d.propertyUse}`,
    `Loan program: ${d.loanProgram}`,
    `State: ${d.state}`,
    `Property value/price: ${d.propertyValue}`,
    `Loan amount: ${d.loanAmount || "—"}`,
    `Estimated credit: ${d.creditScore}`,
    "",
    d.message || "(no message)",
  ].join("\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ApplyPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (field: keyof FormState, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateStep = (s: number) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!data.loanPurpose) e.loanPurpose = "Choose a loan purpose";
      if (!data.propertyUse) e.propertyUse = "Choose how you'll use the property";
      if (!data.loanProgram) e.loanProgram = "Select a program";
      if (!data.state.trim()) e.state = "Enter the property state";
    }
    if (s === 1) {
      if (!data.propertyValue.trim()) e.propertyValue = "Enter an estimated value";
      if (!data.creditScore) e.creditScore = "Select a credit range";
    }
    if (s === 2) {
      if (!data.firstName.trim()) e.firstName = "Required";
      if (!data.lastName.trim()) e.lastName = "Required";
      if (!emailRe.test(data.email.trim())) e.email = "Enter a valid email";
      if (data.phone.trim().length < 7) e.phone = "Enter a valid phone";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    if (!ACCESS_KEY) {
      window.location.href = buildMailto(data);
      toast.info("Opening your email app to send your application to Warren.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New loan application — ${data.firstName} ${data.lastName}`,
          from_name: `${COMPANY_NAME} website`,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          loan_purpose: data.loanPurpose,
          property_use: data.propertyUse,
          loan_program: data.loanProgram,
          state: data.state,
          property_value: data.propertyValue,
          loan_amount: data.loanAmount || "—",
          estimated_credit: data.creditScore,
          message: data.message || "(no message)",
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) setDone(true);
      else throw new Error("submit failed");
    } catch {
      toast.error("Couldn't send right now — opening your email app instead.");
      window.location.href = buildMailto(data);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-card border border-input px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-shadow";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main className="bg-gradient-to-b from-cream to-background">
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/60 bg-background/70 border border-line rounded-full px-3.5 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" strokeWidth={1.75} /> Secure · No
              obligation
            </div>
            <h1 className="mt-6 font-serif text-4xl md:text-5xl leading-tight tracking-tight">
              Apply in minutes
            </h1>
            <p className="mt-4 text-foreground/65 leading-relaxed">
              A few quick questions and Warren will personally find your lowest qualifying rate.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-card border border-line shadow-soft-lg p-6 md:p-9">
            {done ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto" strokeWidth={1.5} />
                <h2 className="font-serif text-3xl mt-5">Application received</h2>
                <p className="mt-3 text-foreground/65 leading-relaxed">
                  Thanks, {data.firstName || "there"} — Warren will review your details and reach
                  out shortly. Need a faster answer? Call{" "}
                  <a href={`tel:${PHONE_TEL}`} className="text-gold hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                  .
                </p>
                <Link
                  to="/"
                  className="mt-7 inline-flex items-center gap-2 text-sm tracking-wide border-b border-gold/60 pb-0.5 hover:border-gold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-foreground/55 mb-2">
                    <span className="text-gold">{STEPS[step]}</span>
                    <span>
                      Step {step + 1} of {STEPS.length}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-accent overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-500"
                      style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {step === 0 && (
                  <div className="space-y-6">
                    <Segmented
                      label="What are you looking to do?"
                      options={PURPOSES}
                      value={data.loanPurpose}
                      onChange={(v) => set("loanPurpose", v)}
                      error={errors.loanPurpose}
                    />
                    <Segmented
                      label="How will you use the property?"
                      options={USES}
                      value={data.propertyUse}
                      onChange={(v) => set("propertyUse", v)}
                      error={errors.propertyUse}
                    />
                    <Field label="Loan program" error={errors.loanProgram}>
                      <select
                        value={data.loanProgram}
                        onChange={(e) => set("loanProgram", e.target.value)}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select a program
                        </option>
                        {PROGRAM_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Property state" error={errors.state}>
                      <input
                        value={data.state}
                        onChange={(e) => set("state", e.target.value)}
                        placeholder="e.g., FL"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <Field
                      label="Estimated property value / purchase price"
                      error={errors.propertyValue}
                    >
                      <input
                        inputMode="numeric"
                        value={data.propertyValue}
                        onChange={(e) => set("propertyValue", e.target.value)}
                        placeholder="$450,000"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Desired loan amount (optional)">
                      <input
                        inputMode="numeric"
                        value={data.loanAmount}
                        onChange={(e) => set("loanAmount", e.target.value)}
                        placeholder="$360,000"
                        className={inputClass}
                      />
                    </Field>
                    <Segmented
                      label="Estimated credit score"
                      options={CREDIT}
                      value={data.creditScore}
                      onChange={(v) => set("creditScore", v)}
                      error={errors.creditScore}
                      cols2
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="First name" error={errors.firstName}>
                        <input
                          value={data.firstName}
                          onChange={(e) => set("firstName", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Last name" error={errors.lastName}>
                        <input
                          value={data.lastName}
                          onChange={(e) => set("lastName", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Anything else? (optional)">
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={data.message}
                        onChange={(e) => set("message", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex items-center gap-2 text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-7 py-3.5 text-sm tracking-wide hover:opacity-90 disabled:opacity-60 transition-opacity"
                    >
                      {submitting ? (
                        "Submitting…"
                      ) : (
                        <>
                          Submit application <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {!done && (
            <p className="mt-6 text-center text-[11px] text-foreground/45 leading-relaxed">
              Submitting is free and won't affect your credit. Prefer to talk? Call{" "}
              <a href={`tel:${PHONE_TEL}`} className="text-gold hover:underline">
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-foreground/55 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Segmented({
  label,
  options,
  value,
  onChange,
  error,
  cols2,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  cols2?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-foreground/55 mb-2">
        {label}
      </label>
      <div
        className={`grid gap-2 ${cols2 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-3"}`}
      >
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
                active
                  ? "border-gold bg-gold/10 text-foreground"
                  : "border-input bg-card text-foreground/70 hover:border-foreground/30"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
