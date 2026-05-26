import { PROGRAMS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function Programs() {
  return (
    <section id="programs" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
            Loan Programs
          </div>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
            Every loan type. <span className="italic text-gold">One trusted broker.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-xl leading-relaxed">
            From first-time buyers to seasoned investors — purchase, refinance, or cash-out, there's
            a program built for your file.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PROGRAMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                key={p.name}
                delay={(i % 4) * 70}
                className="group rounded-xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-gold/40"
              >
                <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-gold/15">
                  <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl mb-1.5">{p.name}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{p.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
