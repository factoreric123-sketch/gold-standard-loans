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
  APPLY_URL,
  FACEBOOK_GROUP_URL,
} from "@/lib/site-data";
import { Logo } from "@/components/site/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-background/75">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-b border-background/15 pb-10 mb-10">
          <div className="font-serif text-3xl md:text-4xl leading-tight text-background">
            The Discount
            <span className="block tracking-[0.18em] text-[0.62em] uppercase text-gold mt-1">
              Mortgage Store
            </span>
          </div>
          <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-background/60">
            USA Lowest Rates. Proven, Not Promised.
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
          <div className="flex items-center gap-3 border border-background/20 px-4 py-3 md:justify-self-end">
            <svg
              viewBox="0 0 48 48"
              role="img"
              aria-label="Equal Housing Lender"
              className="h-9 w-9 shrink-0 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            >
              <path d="M6 22 24 8l18 14" />
              <path d="M11 22v18h26V22" />
              <path d="M18 28h12M18 34h12" />
            </svg>
            <div className="text-[10px] uppercase tracking-[0.18em] text-background/75 leading-[1.6]">
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
