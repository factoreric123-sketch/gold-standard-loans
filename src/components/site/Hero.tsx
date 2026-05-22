import { Phone, ArrowRight } from "lucide-react";
import { RATES, PHONE_DISPLAY, PHONE_TEL, NMLS } from "@/lib/site-data";

export function Hero() {
  return (
    <section id="top" className="border-b border-gold/30">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block text-[11px] uppercase tracking-[0.25em] text-gold border border-gold/50 px-3 py-1.5 mb-8">
            28 Years Licensed · {NMLS}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight">
            Florida's Lowest <br />
            Mortgage Rates. <span className="italic text-gold">Proven.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
            Warren Factor closes loans in 32 states. One call gets you a rate most banks won't offer.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://blink.mortgage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-7 py-4 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 border border-foreground/80 text-foreground px-7 py-4 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div>
          <div className="bg-background border border-gold/40 p-8">
            <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Today's Rates</div>
            <table className="w-full text-left">
              <tbody>
                {RATES.map((r, i) => (
                  <tr key={r.name} className={i < RATES.length - 1 ? "border-b border-gold/20" : ""}>
                    <td className="py-4 text-sm uppercase tracking-wider text-foreground/80">{r.name}</td>
                    <td className="py-4 font-serif text-2xl text-right text-charcoal">{r.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-foreground/50 italic">Rates updated daily. Subject to change.</p>
          </div>
          <div className="mt-6 grid grid-cols-3 text-center border-t border-gold/30">
            {[
              { n: "28", l: "Years Licensed" },
              { n: "32", l: "States" },
              { n: "5★", l: "Zillow" },
            ].map((s, i) => (
              <div key={s.l} className={i < 2 ? "border-r border-gold/30 py-5" : "py-5"}>
                <div className="font-serif text-3xl text-gold">{s.n}</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
