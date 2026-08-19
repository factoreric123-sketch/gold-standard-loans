import { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  EMAIL_DISPLAY,
  ADDRESS,
  NMLS,
  PROGRAMS,
  COMPANY_NAME,
  LINKEDIN_URL,
  FACEBOOK_PAGE_URL,
  FACEBOOK_PROFILE_URL,
} from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";
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

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(80),
  lastName: z.string().trim().min(1, "Required").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  email: z.string().trim().email("Enter a valid email").max(200),
  citizenshipStatus: z.string().trim().max(80).optional().or(z.literal("")),
  hasItin: z.string().trim().max(80).optional().or(z.literal("")),
  loanType: z.string().min(1, "Select a loan type"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const loanOptions = [...PROGRAMS.map((p) => p.name), "Not Sure"];

// Tailor recommended programs to the borrower's residency / ITIN situation.
function recommendedPrograms(citizenship: string, itin: string): string[] {
  if (citizenship === "Foreign National (living abroad)") {
    return ["Foreign National", "Asset-Based", "DSCR", "Bank Statement"];
  }
  if (citizenship === "Visa Holder (H-1B, L-1, E-2, etc.)") {
    return ["Conventional", "FHA", "Bank Statement", "Foreign National"];
  }
  if (itin.startsWith("Yes")) {
    return ["Bank Statement", "Foreign National", "Asset-Based", "DSCR"];
  }
  if (
    citizenship === "US Citizen" ||
    citizenship === "Permanent Resident (Green Card)"
  ) {
    return ["Conventional", "FHA", "VA", "0% Down"];
  }
  return [];
}

// Web3Forms access key (created with warrenfactor@gmail.com as the recipient).
// Submissions get emailed to that address as soon as the key is set in env.
const ACCESS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

async function emailWarren(data: Fields): Promise<boolean> {
  if (!ACCESS_KEY) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `New rate request — ${data.firstName} ${data.lastName} (${data.loanType})`,
        from_name: `${COMPANY_NAME} website`,
        // Web3Forms relays this submission to the email tied to the access key.
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        email: data.email,
        citizenship_status: data.citizenshipStatus || "(not provided)",
        has_itin: data.hasItin || "(not provided)",
        loan_type: data.loanType,
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
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      citizenship_status: data.citizenshipStatus || null,
      has_itin: data.hasItin || null,
      loan_type: data.loanType,
      message: data.message || null,
    });
    return !error;
  } catch {
    return false;
  }
}

function buildMailto(data: Fields) {
  const subject = `Rate request — ${data.firstName} ${data.lastName} (${data.loanType})`;
  const body = [
    `Name: ${data.firstName} ${data.lastName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Citizenship / residency: ${data.citizenshipStatus || "(not provided)"}`,
    `Has ITIN: ${data.hasItin || "(not provided)"}`,
    `Loan type: ${data.loanType}`,
    "",
    data.message || "(no message)",
  ].join("\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [citizenship, setCitizenship] = useState("");
  const [itin, setItin] = useState("");
  const formShownAt = useRef<number>(Date.now());
  const lastSubmitAt = useRef<number>(0);

  const recommended = recommendedPrograms(citizenship, itin);
  const recommendedSet = new Set(recommended);
  const otherOptions = loanOptions.filter((o) => !recommendedSet.has(o));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Spam honeypot — bots fill hidden fields.
    if ((fd.get("botcheck") as string)?.length) return;
    if ((fd.get("website") as string)?.length) return;

    // Speed trap — humans don't complete this form in under 3 seconds.
    if (Date.now() - formShownAt.current < 3000) {
      toast.error("Please take a moment to complete the form.");
      return;
    }

    // Cooldown between submissions from the same browser.
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
      // Fire both in parallel: email to Warren + DB record.
      // Success if EITHER reaches Warren (email) or the database.
      const [emailOk, dbOk] = await Promise.all([emailWarren(data), saveToDb(data)]);
      if (emailOk || dbOk) {
        if (!emailOk) {
          // Stored, but no email was relayed — silent so visitor still sees success.
          console.warn(
            "Contact: submission saved to DB but Web3Forms email was not sent (VITE_WEB3FORMS_KEY missing or relay failed).",
          );
        }
        lastSubmitAt.current = Date.now();
        setDone(true);
        form.reset();

      } else {
        throw new Error("Both email and DB submissions failed");
      }
    } catch (err) {
      console.error("Contact submission failed:", err);
      toast.error("Couldn't send right now — opening your email app instead.");
      window.location.href = buildMailto(data);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-card border border-input px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-shadow";

  return (
    <section id="contact" className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Contact</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            One call. <span className="italic text-gold">Your lowest rate.</span>
          </h2>

          <a
            href={`tel:${PHONE_TEL}`}
            className="block mt-10 font-serif text-5xl md:text-6xl text-foreground hover:text-gold transition-colors"
          >
            {PHONE_DISPLAY}
          </a>

          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/50 mb-1.5">
                Email
              </div>
              <a href={`mailto:${EMAIL}`} className="hover:text-gold break-all">
                {EMAIL_DISPLAY}
              </a>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/50 mb-1.5">
                Office
              </div>
              <div className="text-foreground/75">{ADDRESS}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/50 mb-1.5">
                Licensing
              </div>
              <div className="text-foreground/75">{NMLS}</div>
              <div className="mt-2 flex items-center gap-4">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href={FACEBOOK_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z" />
                  </svg>
                  Warren's FB
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {done ? (
            <div className="rounded-2xl bg-card border border-line shadow-soft p-10 text-center">
              <CheckCircle2 className="w-12 h-12 text-gold mx-auto" strokeWidth={1.5} />
              <h3 className="font-serif text-3xl mt-5">Request received</h3>
              <p className="mt-3 text-foreground/65 leading-relaxed">
                Thanks — Warren will reach out shortly. Need a faster answer? Call{" "}
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
                className="mt-7 text-sm tracking-wide border-b border-gold/60 pb-0.5 hover:border-gold transition-colors"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl bg-card border border-line shadow-soft p-7 md:p-9 space-y-4"
            >
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              {/* Secondary honeypot — hidden text field bots tend to autofill */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />


              <div className="grid grid-cols-2 gap-4">
                <Field
                  name="firstName"
                  placeholder="First Name"
                  error={errors.firstName}
                  className={inputClass}
                />
                <Field
                  name="lastName"
                  placeholder="Last Name"
                  error={errors.lastName}
                  className={inputClass}
                />
              </div>
              <Field
                name="phone"
                type="tel"
                placeholder="Phone"
                error={errors.phone}
                className={inputClass}
              />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                error={errors.email}
                className={inputClass}
              />

              <div>
                <select
                  name="loanType"
                  defaultValue=""
                  aria-label="Loan type"
                  className={inputClass}
                  required
                >
                  <option value="" disabled>
                    Loan Type
                  </option>
                  {loanOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.loanType && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.loanType}</p>
                )}
              </div>

              <textarea
                name="message"
                placeholder="Message (optional)"
                rows={4}
                maxLength={1000}
                aria-label="Message"
                className={inputClass}
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground rounded-full py-4 text-sm tracking-wide hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {submitting ? (
                  "Sending…"
                ) : (
                  <>
                    Request My Rate <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-foreground/45 text-center leading-relaxed">
                By submitting you agree to be contacted about your inquiry. No spam, ever.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
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
