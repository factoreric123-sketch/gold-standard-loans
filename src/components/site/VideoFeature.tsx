import { Reveal } from "@/components/site/motion";

export function VideoFeature() {
  return (
    <section id="story" className="bg-charcoal text-background">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Watch</div>
          <h2 className="font-serif text-4xl md:text-5xl text-background leading-tight max-w-2xl">
            USA's lowest rates — <span className="italic text-gold">in 60 seconds.</span>
          </h2>
          <p className="mt-5 text-background/70 max-w-xl leading-relaxed">
            A quick look at why borrowers choose Warren Factor — and how a single call gets you a
            rate most banks won't offer.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-background/15 shadow-soft-lg bg-black">
            <video
              src="/intro.mp4"
              poster="/og.png"
              controls
              playsInline
              preload="metadata"
              className="block w-full h-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
