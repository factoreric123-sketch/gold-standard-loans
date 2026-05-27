import { Plus } from "lucide-react";
import { FAQS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function FAQ() {
  return (
    <section id="faq" className="bg-off-white">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">FAQ</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            Questions, <span className="italic text-gold">answered.</span>
          </h2>
        </Reveal>

        <div className="mt-12 border-y border-line">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 5) * 50}>
              <details className="group border-b border-line last:border-b-0">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5">
                  <span className="font-serif text-xl">{f.q}</span>
                  <Plus className="w-5 h-5 text-gold shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="text-foreground/65 leading-relaxed pb-5 -mt-1 max-w-2xl">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
