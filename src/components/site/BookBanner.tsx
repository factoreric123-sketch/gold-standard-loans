import { BookOpen, ExternalLink } from "lucide-react";
import { BOOK } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";
import bookCover from "@/assets/book-cover.jpg.asset.json";

export function BookBanner() {
  return (
    <section id="book" className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-14 lg:gap-20 items-center">
          {/* Cover */}
          <Reveal>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="overflow-hidden border border-line bg-card shadow-soft-lg">
                <img
                  src={bookCover.url}
                  alt={`Cover of "${BOOK.title}: ${BOOK.subtitle}" by ${BOOK.author}`}
                  className="block w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-3 -left-3 bg-gold text-gold-foreground text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 shadow-soft">
                New Release
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={120}>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold mb-5">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
              A Book by Warren Factor
            </div>
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight">
              The Life of Tony Factor
              <span className="block text-gold italic text-3xl md:text-4xl mt-2">
                Overcoming Life&rsquo;s Obstacles
              </span>
            </h2>
            <p className="mt-7 text-lg text-foreground/65 max-w-xl leading-relaxed">
              {BOOK.blurb}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={BOOK.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-7 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity shadow-soft"
              >
                Get it on Amazon <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-5 text-xs text-foreground/45 italic">
              Available in paperback on Amazon · ISBN 9798345211342
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
