import portrait from "@/assets/warren-portrait.webp";
import { NMLS, COMPANY_NMLS, ADDRESS } from "@/lib/site-data";

export function About() {
  return (
    <section id="about" className="bg-off-white border-b border-gold/30">
      <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="aspect-[3/4] bg-charcoal overflow-hidden">
            <img
              src={portrait}
              alt="Warren M. Factor, Mortgage Broker"
              width={1254}
              height={1254}
              loading="lazy"
              className="w-full h-full object-cover object-top grayscale-[20%]"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">About</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            The man behind <span className="italic text-gold">the lowest rate.</span>
          </h2>
          <div className="mt-10">
            <div className="font-serif text-3xl">Warren M. Factor</div>
            <div className="text-sm uppercase tracking-widest text-foreground/60 mt-1">
              Mortgage Broker · President
            </div>
          </div>
          <p className="mt-8 text-foreground/75 leading-relaxed text-lg">
            For nearly three decades, Warren Factor has helped Florida families and investors finance
            homes, rentals, and commercial properties at rates the big banks rarely match. As founder of
            The Discount Mortgage Store, he runs every file personally — from first call to closing —
            with the leverage of a 100+ lender network behind him.
          </p>
          <div className="mt-10 border-l-2 border-gold pl-6 space-y-2 text-sm text-foreground/75">
            <div>{NMLS}</div>
            <div>{COMPANY_NMLS}</div>
            <div>{ADDRESS}</div>
            <div>Licensed: Fannie Mae · Freddie Mac · FHA · VA · Commercial</div>
            <div>Serving 32 States</div>
          </div>
        </div>
      </div>
    </section>
  );
}
