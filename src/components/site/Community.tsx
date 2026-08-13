import { useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Users } from "lucide-react";
import { COMPANY_NAME, FACEBOOK_GROUP_URL } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

const ACCESS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

export function Community() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const formShownAt = useRef<number>(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    if ((fd.get("website") as string)?.length) return;
    if (Date.now() - formShownAt.current < 3000) {
      toast.error("Please take a moment to complete the form.");
      return;
    }

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const question = String(fd.get("question") || "").trim();
    if (!name || !email || !question) {
      toast.error("Please fill in every field.");
      return;
    }

    setSubmitting(true);
    try {
      // 1) Full email notification to warrenfactor@gmail.com
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New community question — ${name}`,
          from_name: `${COMPANY_NAME} community`,
          replyto: email,
          name,
          email,
          question,
        }),
      });
      const json = (await res.json()) as { success?: boolean };

      // 2) Short SMS alert via the T-Mobile email-to-text gateway.
      //    Sent as a separate, trimmed message so it reads well on a phone.
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ccemail: SMS_GATEWAY,
          subject: `Question from ${name}`,
          from_name: "TDMS",
          message: `${name} (${email}): ${question.slice(0, 240)}`,
        }),
      }).catch(() => {
        /* SMS is best-effort; the email above is the source of truth */
      });

      if (json.success) {
        setDone(true);
        toast.success("Question sent — Warren will get back to you.");
      } else {
        toast.error("Could not send your question. Please call or email instead.");
      }

    } catch {
      toast.error("Could not send your question. Please call or email instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="community" className="bg-cream border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="text-[11px] uppercase tracking-widest text-gold">Community</div>
          <h2 className="mt-3 font-serif text-4xl leading-tight">
            Join the mortgage questions group
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70">
            Ask questions, follow rate updates, and see what other buyers and investors are working
            through — free, in our Facebook group.
          </p>
          <a
            href={FACEBOOK_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            <Users className="h-4 w-4" />
            Join the Facebook group
          </a>
        </Reveal>

        <Reveal>
          <div className="border border-line bg-background p-6">
            <div className="text-[11px] uppercase tracking-widest text-gold">Ask Warren</div>
            <p className="mt-2 text-sm text-foreground/70">
              Not on Facebook? Send your question here and it goes straight to Warren's inbox.
            </p>
            {done ? (
              <p className="mt-6 text-sm text-foreground/70">
                Thanks — your question is on its way. Warren replies personally.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 space-y-3">
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <input
                  name="name"
                  placeholder="Your name"
                  className="w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  required
                />
                <textarea
                  name="question"
                  rows={4}
                  placeholder="What's your mortgage question?"
                  className="w-full resize-none border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-xs uppercase tracking-[0.2em] text-gold-foreground disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Ask my question"}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
