import {
  ADDRESS,
  NMLS,
  COMPANY_NMLS,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  EMAIL_DISPLAY,
  COMPANY_NAME,
  BROKER_NAME,
  SINCE_YEAR,
  APPLY_URL,
  FACEBOOK_GROUP_URL,
} from "@/lib/site-data";
import { Logo } from "@/components/site/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-background/75">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-b border-background/15 pb-10 mb-10">
          <div className="inline-block rounded-2xl bg-background p-3 shadow-soft">
            <Logo size="lg" />
          </div>
          <div className="mt-4 text-sm uppercase tracking-widest text-gold">
            USA Lowest Rates. Proven, Not Promised
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-sm">
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-widest text-gold mb-3">Office</div>
            <div>{ADDRESS}</div>
            <div>
              <a href={`tel:${PHONE_TEL}`} className="hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <a href={`mailto:${EMAIL}`} className="hover:text-gold break-all">
                {EMAIL_DISPLAY}
              </a>
            </div>
            <div className="pt-2 text-background/55">{NMLS}</div>
            <div className="text-background/55">{COMPANY_NMLS}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gold mb-3">Mortgage Products</div>
            <ul className="space-y-2">
              {[
                { label: "Conventional", slug: "conventional" },
                { label: "FHA", slug: "fha" },
                { label: "VA", slug: "va" },
                { label: "DSCR", slug: "dscr" },
                { label: "Bank Statement", slug: "bank-statement" },
                { label: "Fix & Flip", slug: "fix-and-flip" },
                { label: "Bridge", slug: "bridge-loans" },
                { label: "Commercial", slug: "hotel-commercial" },
              ].map((p) => (
                <li key={p.slug}>
                  <a href={`/programs/${p.slug}`} className="hover:text-gold">
                    {p.label}
                  </a>
                </li>
              ))}

              <li>
                <a href="/buy-a-home" className="hover:text-gold">
                  Buy a Home
                </a>
              </li>
              <li>
                <a href="/special-programs" className="hover:text-gold">
                  Grant Money
                </a>
              </li>
              <li>
                <a href="/todays-rates" className="hover:text-gold">
                  Today's Rates
                </a>
              </li>
              <li>
                <a href="/rate-news" className="hover:text-gold">
                  Rate Prediction
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gold mb-3">Company</div>
            <ul className="space-y-2">
              <li>
                <a href="/#why" className="hover:text-gold">
                  Why Warren
                </a>
              </li>
              <li>
                <a href="/#why" className="hover:text-gold">
                  About
                </a>
              </li>
              <li>
                <a href="/free-mortgage-advice" className="hover:text-gold">
                  Free Advice
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-gold">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Facebook Group
                </a>
              </li>
              <li>
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Apply Online
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/15 grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <p className="text-xs text-background/50 leading-relaxed max-w-4xl">
            {BROKER_NAME}, {NMLS}. {COMPANY_NMLS}. Licensed mortgage broker serving 32 states. All
            loan products subject to credit approval and property appraisal. Interest rates and
            program terms are subject to change without notice. Not a commitment to lend. Equal
            Housing Lender. © {new Date().getFullYear()} {COMPANY_NAME}.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-background/20 px-4 py-3">
            <div className="w-8 h-8 rounded-md border-2 border-gold flex items-center justify-center text-gold text-lg font-serif">
              =
            </div>
            <div className="text-[10px] uppercase tracking-widest text-background/75 leading-tight">
              Equal Housing
              <br />
              Lender
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
