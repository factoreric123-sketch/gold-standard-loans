import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, NMLS, PROGRAMS } from "@/lib/site-data";

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(80),
  lastName: z.string().trim().min(1, "Required").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  email: z.string().trim().email("Enter a valid email").max(200),
  loanType: z.string().min(1, "Select a loan type"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const loanOptions = [...PROGRAMS.map(p => p.name), "Not Sure"];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks — Warren will reach out shortly.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 400);
  };

  const inputClass =
    "w-full bg-transparent border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors";

  return (
    <section id="contact" className="bg-cream border-b border-gold/30">
      <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-16">
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Contact</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            One call. <span className="italic text-gold">Your lowest rate.</span>
          </h2>

          <a
            href={`tel:${PHONE_TEL}`}
            className="block mt-12 font-serif text-5xl md:text-6xl text-charcoal hover:text-gold transition-colors"
          >
            {PHONE_DISPLAY}
          </a>

          <div className="mt-10 space-y-4 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/60 mb-1">Email</div>
              <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/60 mb-1">Office</div>
              <div>{ADDRESS}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/60 mb-1">Licensing</div>
              <div>{NMLS}</div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-background border border-gold/40 p-8 md:p-10 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" className={inputClass} required />
            <input name="lastName" placeholder="Last Name" className={inputClass} required />
          </div>
          <input name="phone" type="tel" placeholder="Phone" className={inputClass} required />
          <input name="email" type="email" placeholder="Email" className={inputClass} required />
          <select name="loanType" defaultValue="" className={inputClass} required>
            <option value="" disabled>Loan Type</option>
            {loanOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <textarea name="message" placeholder="Message (optional)" rows={4} className={inputClass} maxLength={1000} />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-gold-foreground py-4 text-sm uppercase tracking-widest hover:bg-gold/90 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Sending…" : "Request My Rate"}
          </button>
        </form>
      </div>
    </section>
  );
}
