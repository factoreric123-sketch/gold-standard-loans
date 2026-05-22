import { PROGRAMS } from "@/lib/site-data";

export function Programs() {
  return (
    <section id="programs" className="border-b border-gold/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Loan Programs</div>
        <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
          Every loan type. <span className="italic text-gold">One trusted broker.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-gold/30">
          {PROGRAMS.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="border-r border-b border-gold/30 p-8 group hover:bg-gold/5 transition-colors"
              >
                <Icon className="w-7 h-7 text-gold mb-6" strokeWidth={1.25} />
                <h3 className="font-serif text-2xl mb-2">{p.name}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
