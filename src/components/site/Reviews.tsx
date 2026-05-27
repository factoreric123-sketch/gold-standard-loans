import { Star } from "lucide-react";
import { REVIEWS, ZILLOW_URL } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

export function Reviews() {
  return (
    <section id="reviews" className="bg-off-white border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Reviews</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
              Trusted by Florida <span className="italic text-gold">borrowers.</span>
            </h2>
            <a
              href={ZILLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm tracking-wide text-gold border-b border-gold/60 pb-0.5 hover:border-gold transition-colors w-fit"
            >
              Read all reviews on Zillow →
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name + r.date} delay={i * 80} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-card shadow-soft p-7">
                <div className="flex gap-1 mb-5">
                  {[...Array(r.rating)].map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-gold"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <h3 className="font-serif text-xl mb-3">{r.title}</h3>
                <blockquote className="text-foreground/70 leading-relaxed flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-line">
                  <div className="text-sm font-medium text-foreground">{r.name}</div>
                  <div className="text-[11px] uppercase tracking-widest text-foreground/50 mt-1">
                    {r.location} · {r.loanType} · {r.date}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
