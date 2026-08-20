import { useState, useRef } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { MobileCTA } from "@/components/site/MobileCTA";
import { supabase } from "@/integrations/supabase/client";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  NMLS,
  COMPANY_NAME,
  COMPANY_NMLS,
  BROKER_NAME,
  SINCE_YEAR,
  RATES,
  STATS,
  PROGRAMS,
  SITE_URL,
} from "@/lib/site-data";

const ACCESS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  email: z.string().trim().email("Enter a valid email").max(200),
  loanType: z.string().min(1, "Select a loan type"),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const loanOptions = [...PROGRAMS.map((p) => p.name), "Not Sure"];

export const Route = createFileRoute("/landing/low-rates")({
  head: () => ({
    meta: [
      { title: "Low Mortgage Rates in Florida | Get Your Rate — The Discount Mortgage Store" },
      {
        name: "description",
        content:
          "USA lowest mortgage rates. Conventional, FHA, VA, DSCR & bank statement loans. 28 years licensed, 32 states. Get your rate in one call — (561) 577-1882.",
      },
      { property: "og:title", content: "Low Mortgage Rates in Florida | Get Your Rate" },
      {
        property: "og:description",
        content:
          "USA lowest mortgage rates. 28 years licensed, 32 states. Get your rate in one call.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/landing/low-rates` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/landing/low-rates` }],
  }),
  component: LowRatesLanding,
});

function LowRatesLanding() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <MinimalHeader />
      <Hero />
      <TrustStrip />
      <MinimalFooter />
      <MobileCTA />
    </div>
  );
}

function MinimalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label={COMPANY_NAME}>
          <Logo size="md" className="h-12 md:h-16" />
        </Link>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-2.5 text-sm tracking-wide hover:border-gold hover:text-gold transition-colors"
        >
          <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-cream to-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Left: headline + benefits */}
        <div>
          <div className="inline-flex items-center gap-2 border border-line bg-background px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
            {SINCE_YEAR ? `Licensed since ${SINCE_YEAR}` : "28 Years Licensed"} · {NMLS}
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            USA lowest
            <br />
            mortgage rates.
            <span className="block text-gold italic">Get yours today.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/65">
            Warren Factor shops every file and closes loans in 32 states. One
            call gets you a rate most banks simply won't offer.
          </p>

          <ul className="mt-7 space-y-3 text-sm text-foreground/75">
            {RATES.map((r) => (
              <li key={r.name} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2">
                <span className="tracking-wide">{r.name}</span>
                <span className="flex items-baseline gap-3">
                  {r.note && (
                    <span className="text-[10px] uppercase tracking-widest text-gold">{r.note}</span>
                  )}
                  <span className="font-serif text-xl text-foreground">{r.rate}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center gap-1 text-gold">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-gold" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-foreground/65">5-star rated on Zillow</span>
          </div>
        </div>

        {/* Right: lead form */}
        <div className="lg:pl-4">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const formShownAt = useRef<number>(Date.now());
  const lastSubmitAt = useRef<number>(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypots
    if ((fd.get("botcheck") as string)?.length) return;
    if ((fd.get("website") as string)?.length) return;

    // Speed trap
    if (Date.now() - formShownAt.current < 3000) {
      toast.error("Please take a moment to complete the form.");
      return;
    }
    // Cooldown
    if (Date.now() - lastSubmitAt.current < 15000) {
      toast.error("You just sent a request — please wait a moment.");
      return;
    }

    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    const data = parsed.data;
    setSubmitting(true);
    try {
      const [emailOk, dbOk] = await Promise.all([emailWarren(data), saveToDb(data)]);
      if (emailOk || dbOk) {
        if (!emailOk) {
          console.warn(
            "Landing: submission saved to DB but Web3Forms email was not relayed.",
          );
        }
        lastSubmitAt.current = Date.now();
        setDone(true);
        form.reset();
      } else {
        throw new Error("Both email and DB submissions failed");
      }
    } catch (err) {
      console.error("Landing submission failed:", err);
      toast.error("Couldn't send right now — please call us instead.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-input bg-card px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-shadow";

  if (done) {
    return (
      <div className="border border-line bg-card p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" strokeWidth={1.5} />
        <h2 className="mt-5 font-serif text-3xl">Request received</h2>
        <p className="mt-3 leading-relaxed text-foreground/65">
          Thanks — Warren will reach out shortly. For a faster answer, call{" "}
          <a href={`tel:${PHONE_TEL}`} className="text-gold hover:underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
        <button
          onClick={() => {
            formShownAt.current = Date.now();
            setDone(false);
          }}
          className="mt-7 border-b border-gold/60 pb-0.5 text-sm tracking-wide hover:border-gold transition-colors"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-line bg-card p-7 shadow-soft-lg md:p-8"
    >
      <h2 className="font-serif text-3xl">Get your rate now</h2>
      <p className="mt-2 text-sm text-foreground/60">
        Free, no obligation. Warren calls you back — usually the same day.
      </p>

      {/* Honeypots */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 space-y-4">
        <Field name="name" placeholder="Full Name" error={errors.name} className={inputClass} />
        <Field name="phone" type="tel" placeholder="Phone" error={errors.phone} className={inputClass} />
        <Field name="email" type="email" placeholder="Email" error={errors.email} className={inputClass} />
        <div>
          <select
            name="loanType"
            defaultValue=""
            aria-label="Loan type"
            className={inputClass}
            required
          >
            <option value="" disabled>Loan Type</option>
            {loanOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.loanType && (
            <p className="mt-1.5 text-xs text-destructive">{errors.loanType}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-gold py-4 text-sm tracking-wide text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : (
          <>Get My Rate <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-foreground/45">
        By submitting you agree to be contacted about your inquiry. No spam, ever.
      </p>
    </form>
  );
}

function Field({
  name,
  placeholder,
  type = "text",
  error,
  className,
}: {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
  className: string;
}) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-invalid={error ? true : undefined}
        className={`${className} ${error ? "border-destructive focus:ring-destructive/30" : ""}`}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-line bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-line px-6">
        {STATS.map((s) => (
          <div key={s.label} className="py-8 text-center">
            <div className="font-serif text-3xl text-gold md:text-4xl">
              {s.value}
              {s.suffix ?? ""}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-foreground/55">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MinimalFooter() {
  return (
    <footer className="bg-charcoal text-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-serif text-xl">{COMPANY_NAME}</div>
            <p className="mt-2 text-sm text-background/55">
              USA Lowest Rates. Proven, Not Promised
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-3 inline-block text-gold hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-1 text-sm text-background/55">
              <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL.toLowerCase()}</a>
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-background/50">Licensing</div>
            <p className="mt-2 text-sm text-background/65">{BROKER_NAME} — {NMLS}</p>
            <p className="text-sm text-background/65">{COMPANY_NMLS}</p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-background/50">Explore</div>
            <div className="mt-2 flex flex-col gap-1.5 text-sm">
              <Link to="/" className="text-background/65 hover:text-gold transition-colors">Home</Link>
              <Link to="/blog" className="text-background/65 hover:text-gold transition-colors">Mortgage Blog</Link>
              <Link to="/" hash="programs" className="text-background/65 hover:text-gold transition-colors">Mortgage Products</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-background/15 pt-6 text-[11px] leading-relaxed text-background/45">
          Equal Housing Lender. {BROKER_NAME}, {NMLS}. {COMPANY_NMLS}. Rates
          shown are illustrative and subject to change without notice. APR
          varies by credit score, loan amount, and program. This is not a
          commitment to lend. All loans subject to credit approval. Call for
          current rates and full disclosures.
        </div>
      </div>
    </footer>
  );
}

async function emailWarren(data: Fields): Promise<boolean> {
  if (!ACCESS_KEY) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Landing lead — ${data.name} (${data.loanType})`,
        from_name: `${COMPANY_NAME} website`,
        name: data.name,
        phone: data.phone,
        email: data.email,
        loan_type: data.loanType,
        message: "Submitted from the Google Ads low-rates landing page.",
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
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: data.name,
      last_name: "",
      phone: data.phone,
      email: data.email,
      loan_type: data.loanType,
      message: "Submitted from the Google Ads low-rates landing page.",
    });
    return !error;
  } catch {
    return false;
  }
}
