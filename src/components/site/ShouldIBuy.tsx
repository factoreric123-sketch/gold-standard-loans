import { useState } from "react";
import { ArrowRight, Check, Minus, Phone, RotateCcw } from "lucide-react";
import { APPLY_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

const BUY_REASONS = [
  "You plan to stay put for at least 3 years",
  "Your rent is close to what a mortgage payment would cost",
  "You have savings for a down payment, closing costs and a cushion",
  "You want a fixed housing payment instead of annual rent increases",
  "You'd rather build equity than pay a landlord's mortgage",
];

const RENT_REASONS = [
  "You may move for work within the next 1–2 years",
  "You need time to raise your credit score or clear debt",
  "Your savings can't cover a down payment plus closing costs",
  "You'd be buying the most expensive home in the neighborhood",
  "You're not ready for repairs, taxes and insurance being yours",
];

const QUESTIONS = [
  "Will you live in this area for at least 3 more years?",
  "Do you have savings for a down payment and closing costs, with cash left over?",
  "Could you pay a monthly housing payment comfortably each month?",
  "Is your income steady and likely to continue for the next few years?",
  "Would you rather own and build equity than keep renting?",
];

function verdict(yes: number) {
  if (yes >= 4) {
    return {
      label: "Leaning toward buying",
      body: "You look ready to start with a pre-approval. A pre-approval tells you your real price range and shows sellers you're serious.",
    };
  }
  if (yes === 3) {
    return {
      label: "A close call",
      body: "You're on the line. The deciding factor is usually the math — run your rent against a real payment at today's rates before you commit.",
    };
  }
  return {
    label: "Renting may be the smarter move right now",
    body: "That's not a no — it's a not yet. Most renters become buyers once credit, savings or job stability line up. A short review shows what to fix first.",
  };
}

export function ShouldIBuy() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );

  const answered = answers.filter((a) => a !== null).length;
  const complete = answered === QUESTIONS.length;
  const yesCount = answers.filter((a) => a === true).length;
  const result = verdict(yesCount);

  const setAnswer = (index: number, value: boolean) =>
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));

  return (
    <section id="should-i-buy" className="bg-cream border-y border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
            The Buy-vs-Rent Check
          </div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">
            Should I buy a home?{" "}
            <span className="italic text-gold">Or keep renting?</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-2xl leading-relaxed">
            Honest answer: it depends on how long you'll stay, what you've saved and what
            today's rates do to your monthly payment. Here's how Warren frames it with every
            buyer — then a 30-second check you can answer right here.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 lg:gap-10">
          <Reveal>
            <div className="border border-line bg-card p-7 md:p-8 h-full">
              <h3 className="font-serif text-2xl mb-5">
                Buying makes sense <span className="italic text-gold">when&hellip;</span>
              </h3>
              <ul className="space-y-3.5">
                {BUY_REASONS.map((r) => (
                  <li key={r} className="flex gap-3 items-start">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold/40 bg-gold/10">
                      <Check className="h-3 w-3 text-gold" strokeWidth={2.25} />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/75">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-line bg-card p-7 md:p-8 h-full">
              <h3 className="font-serif text-2xl mb-5">
                Renting still wins <span className="italic text-gold">when&hellip;</span>
              </h3>
              <ul className="space-y-3.5">
                {RENT_REASONS.map((r) => (
                  <li key={r} className="flex gap-3 items-start">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-line bg-accent">
                      <Minus className="h-3 w-3 text-foreground/45" strokeWidth={2.25} />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/75">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-6 border border-line bg-card shadow-soft-lg">
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <div className="p-7 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl md:text-3xl">
                    Answer five <span className="italic text-gold">quick</span> questions
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/45 shrink-0">
                    {answered}/{QUESTIONS.length}
                  </span>
                </div>
                <div className="mt-4 h-[3px] w-full bg-line">
                  <div
                    className="h-full bg-gold transition-all duration-500"
                    style={{ width: `${(answered / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <ol className="mt-7 space-y-5">
                  {QUESTIONS.map((q, i) => (
                    <li key={q} className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <span className="font-serif text-lg text-gold/45 w-6 shrink-0">
                        {i + 1}
                      </span>
                      <span className="flex-1 min-w-[200px] text-sm leading-relaxed text-foreground/80">
                        {q}
                      </span>
                      <span className="flex gap-2">
                        {[true, false].map((option) => {
                          const active = answers[i] === option;
                          return (
                            <button
                              key={String(option)}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setAnswer(i, option)}
                              className={`w-14 border px-3 py-1.5 text-xs tracking-wide transition-colors ${
                                active
                                  ? "border-gold bg-gold text-gold-foreground"
                                  : "border-line text-foreground/60 hover:border-foreground/40"
                              }`}
                            >
                              {option ? "Yes" : "No"}
                            </button>
                          );
                        })}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-6 py-3 text-sm tracking-wide hover:opacity-90 transition-opacity"
                  >
                    Get my rate <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm tracking-wide hover:border-foreground/50 hover:bg-accent transition-colors"
                  >
                    <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                  </a>
                  {answered > 0 && (
                    <button
                      type="button"
                      onClick={() => setAnswers(Array(QUESTIONS.length).fill(null))}
                      className="inline-flex items-center gap-2 px-3 py-3 text-xs uppercase tracking-widest text-foreground/45 hover:text-gold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Start over
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-charcoal text-white p-7 md:p-9 flex flex-col justify-between">
                {complete ? (
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-gold">
                      Your result
                    </div>
                    <div className="mt-3 font-serif text-3xl md:text-4xl leading-tight text-white">
                      {result.label}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">{result.body}</p>
                    <div className="mt-6 border-t border-white/15 pt-5 text-xs text-white/55">
                      <span className="font-serif text-xl text-gold">{yesCount}</span> of{" "}
                      {QUESTIONS.length} answered yes. Illustrative only — not financial advice.
                      Your actual numbers decide.
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-gold">
                      Your result
                    </div>
                    <div className="mt-3 font-serif text-3xl md:text-4xl leading-tight text-white/85">
                      Answer all five to see where you land.
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">
                      No email, no sign-up. Warren gives the same honest read on a live call —
                      sometimes the answer is "wait six months."
                    </p>
                  </div>
                )}

                <div className="mt-8 space-y-2 text-xs text-white/50">
                  <a
                    href="/todays-rates"
                    className="inline-flex items-center gap-2 text-gold hover:underline underline-offset-4"
                  >
                    See today's rates <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <p>
                    <a
                      href="#calculator"
                      className="text-white/70 hover:text-gold underline underline-offset-4 transition-colors"
                    >
                      Run the payment math
                    </a>{" "}
                    before you decide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
