import { useState, useRef } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { COMPANY_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";

const TOPIC_OPTIONS = [
  "Buying a home",
  "Refinancing",
  "Investment property",
  "Foreign national / expat loan",
  "Credit or qualification question",
  "Comparing lender offers",
  "General advice",
] as const;

const TIME_OPTIONS = [
  "Morning (8am – 12pm)",
  "Afternoon (12pm – 5pm)",
  "Evening (5pm – 8pm)",
] as const;

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(80),
  lastName: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  topic: z.string().min(1, "Select a topic"),
  bestTime: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please ask your question").max(1500),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const ACCESS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

async function emailWarren(data: Fields): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Free mortgage advice request — ${data.firstName} ${data.lastName}`,
        from_name: `${COMPANY_NAME} website`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        topic: data.topic,
        best_time: data.bestTime || "Anytime",
        message: data.message,
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
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      loan_type: "Free Mortgage Advice",
      message: `Topic: ${data.topic}\nBest time: ${data.bestTime || "Anytime"}\n\n${data.message}`,
    });
    return !error;
  } catch {
    return false;
  }
}

const inputCls =
  "w-full border border-line bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none transition-colors";
const labelCls =
  "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5";

export function AdviceForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const formShownAt = useRef<number>(Date.now());
  const lastSubmitAt = useRef<number>(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if ((fd.get("botcheck") as string)?.length) return;
    if ((fd.get("website") as string)?.length) return;

    if (Date.now() - formShownAt.current < 3000) {
      toast.error("Please take a moment to complete the form.");
      return;
    }

    if (Date.now() - lastSubmitAt.current < 15000) {
      toast.error("You just sent a request — please wait a moment.");
      return;
    }

    const parsed = schema.safeParse({
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      topic: fd.get("topic"),
      bestTime: fd.get("bestTime"),
      message: fd.get("message"),
    });

    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
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
      lastSubmitAt.current = Date.now();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Something went wrong — please try again or call Warren directly.");
    }
  }

  const err = (k: keyof Fields) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  if (done) {
    return (
      <div className="border border-gold bg-white px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
        <h2 className="font-serif text-3xl mb-3">Advice request sent</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Warren has your question and will reply personally, usually within one business
          day.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Need a faster answer? Call{" "}
          <a href={`tel:${PHONE_TEL}`} className="text-gold underline underline-offset-4">
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-line bg-white px-6 py-8 md:px-10 md:py-10">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="adv-firstName" className={labelCls}>
            First name
          </label>
          <input
            id="adv-firstName"
            name="firstName"
            className={inputCls}
            autoComplete="given-name"
            placeholder="First name"
          />
          {err("firstName")}
        </div>
        <div>
          <label htmlFor="adv-lastName" className={labelCls}>
            Last name
          </label>
          <input
            id="adv-lastName"
            name="lastName"
            className={inputCls}
            autoComplete="family-name"
            placeholder="Last name"
          />
          {err("lastName")}
        </div>
        <div>
          <label htmlFor="adv-email" className={labelCls}>
            Email
          </label>
          <input
            id="adv-email"
            name="email"
            type="email"
            className={inputCls}
            autoComplete="email"
            placeholder="you@email.com"
          />
          {err("email")}
        </div>
        <div>
          <label htmlFor="adv-phone" className={labelCls}>
            Phone
          </label>
          <input
            id="adv-phone"
            name="phone"
            type="tel"
            className={inputCls}
            autoComplete="tel"
            placeholder="(555) 123-4567"
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="adv-topic" className={labelCls}>
            What is this about?
          </label>
          <select id="adv-topic" name="topic" className={inputCls} defaultValue="">
            <option value="" disabled>
              Select a topic
            </option>
            {TOPIC_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {err("topic")}
        </div>
        <div>
          <label htmlFor="adv-time" className={labelCls}>
            Best time to call
          </label>
          <select id="adv-time" name="bestTime" className={inputCls} defaultValue="">
            <option value="">Anytime</option>
            {TIME_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="adv-message" className={labelCls}>
            Your mortgage question
          </label>
          <textarea
            id="adv-message"
            name="message"
            rows={5}
            className={inputCls}
            placeholder="Describe your situation and what you'd like to know..."
          />
          {err("message")}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-gold px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white hover:bg-foreground transition-colors disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Get Free Mortgage Advice"}
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-4 text-[11px] text-muted-foreground text-center leading-relaxed">
        No cost, no obligation. Your information goes directly to Warren and is never
        sold.
      </p>
    </form>
  );
}
