import { Check } from "lucide-react";
import type { ProgramSection } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function ProgramExtras({ sections }: { sections: ProgramSection[] }) {
  return (
    <section className="bg-background border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20 space-y-12">
        {sections.map((s, i) => (
          <Reveal key={i} delay={Math.min(i, 6) * 40}>
            <Section section={s} />
          </Reveal>
        ))}
        <p className="pt-2 text-xs text-foreground/45 leading-relaxed">
          Educational guidance only. Loan terms, eligibility, and pricing are subject to lender
          underwriting, program guidelines, and approval.
        </p>
      </div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-serif text-2xl md:text-3xl mb-4 leading-tight">{children}</h3>;
}

function Section({ section }: { section: ProgramSection }) {
  switch (section.kind) {
    case "paragraphs":
      return (
        <div>
          {section.title && <H3>{section.title}</H3>}
          <div className="space-y-4 text-foreground/75 leading-relaxed">
            {section.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      );

    case "numbered":
      return (
        <div>
          <H3>{section.title}</H3>
          {section.intro && (
            <p className="text-foreground/70 leading-relaxed mb-6">{section.intro}</p>
          )}
          <ol className="space-y-4">
            {section.items.map((item, i) => (
              <li
                key={item.title}
                className="rounded-2xl border border-line bg-card p-6 flex gap-5"
              >
                <span className="font-serif text-3xl text-gold/40 leading-none mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-serif text-lg mb-1">{item.title}</div>
                  <p className="text-foreground/70 leading-relaxed text-sm">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );

    case "cards":
      return (
        <div>
          <H3>{section.title}</H3>
          {section.intro && (
            <p className="text-foreground/70 leading-relaxed mb-6">{section.intro}</p>
          )}
          <div className="grid sm:grid-cols-2 gap-5">
            {section.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-card p-6">
                <div className="font-serif text-xl mb-2">{item.title}</div>
                <p className="text-foreground/70 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "list":
      return (
        <div>
          {section.title && <H3>{section.title}</H3>}
          {section.intro && (
            <p className="text-foreground/70 leading-relaxed mb-5">{section.intro}</p>
          )}
          <ul className="space-y-3">
            {section.items.map((it) => (
              <li key={it} className="flex gap-3 text-foreground/75 leading-relaxed">
                <Check className="w-4 h-4 text-gold shrink-0 mt-1.5" strokeWidth={2.5} />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "definedList":
      return (
        <div>
          {section.title && <H3>{section.title}</H3>}
          <dl className="space-y-4">
            {section.items.map((it) => (
              <div key={it.term} className="border-l-2 border-gold/60 pl-5">
                <dt className="font-serif text-lg">{it.term}</dt>
                <dd className="text-foreground/70 leading-relaxed text-sm mt-1">{it.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case "formula":
      return (
        <div>
          {section.title && <H3>{section.title}</H3>}
          <div className="rounded-2xl bg-charcoal text-background p-7 md:p-8 text-center">
            <div className="font-serif text-2xl md:text-3xl text-gold tracking-wide">
              {section.equation}
            </div>
            {section.example && (
              <div className="mt-4 text-background/75 text-sm">{section.example}</div>
            )}
            {section.note && (
              <p className="mt-5 pt-5 border-t border-background/15 text-sm text-background/70 leading-relaxed">
                {section.note}
              </p>
            )}
          </div>
        </div>
      );
  }
}
