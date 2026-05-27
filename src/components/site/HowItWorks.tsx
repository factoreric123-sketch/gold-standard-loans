import { STEPS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-off-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">How It Works</div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
            From first call to <span className="italic text-gold">closing.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-xl leading-relaxed">
            No call centers, no runaround — just a straightforward path to your lowest rate.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-card p-8">
                <div className="font-serif text-5xl text-gold/30">0{i + 1}</div>
                <h3 className="font-serif text-2xl mt-4 mb-2">{s.title}</h3>
                <p className="text-foreground/65 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
