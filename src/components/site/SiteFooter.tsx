import { ADDRESS, NMLS, COMPANY_NMLS, PHONE_DISPLAY, EMAIL } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-background/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-b border-gold/30 pb-10 mb-10">
          <div className="font-serif text-3xl text-background">The Discount Mortgage Store</div>
          <div className="mt-2 text-sm uppercase tracking-widest text-gold">
            Florida's Lowest Mortgage Rates · Since 1996
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-sm">
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-widest text-gold mb-3">Office</div>
            <div>{ADDRESS}</div>
            <div>{PHONE_DISPLAY}</div>
            <div>{EMAIL}</div>
            <div className="pt-2">{NMLS}</div>
            <div>{COMPANY_NMLS}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gold mb-3">Programs</div>
            <ul className="space-y-2">
              {["Conventional", "FHA", "VA", "DSCR", "Bank Statement", "Fix & Flip", "Bridge", "Commercial"].map(p => (
                <li key={p}><a href="#programs" className="hover:text-gold">{p}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gold mb-3">Company</div>
            <ul className="space-y-2">
              <li><a href="#why" className="hover:text-gold">Why Warren</a></li>
              <li><a href="#about" className="hover:text-gold">About</a></li>
              <li><a href="#contact" className="hover:text-gold">Contact</a></li>
              <li><a href="https://blink.mortgage" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Apply Online</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/30 grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <p className="text-xs text-background/55 leading-relaxed max-w-4xl">
            Warren M. Factor, {NMLS}. {COMPANY_NMLS}. Licensed mortgage broker serving 32 states.
            All loan products subject to credit approval and property appraisal. Interest rates and
            program terms are subject to change without notice. Not a commitment to lend. Equal
            Housing Lender.
          </p>
          <div className="flex items-center gap-3 border border-gold/40 px-4 py-3">
            <div className="w-8 h-8 border-2 border-gold flex items-center justify-center text-gold text-lg font-serif">=</div>
            <div className="text-[10px] uppercase tracking-widest text-background/80 leading-tight">
              Equal Housing<br/>Lender
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
