import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import flipBanner from "@/assets/flip-banner-no-billion.png";

const SPECS = [
  { value: "92.5%", label: "Of purchase" },
  { value: "100%", label: "Of rehab" },
  { value: "75%", label: "ARV LTV" },
];

export function FlipBanner() {
  return (
    <section
      aria-label="Fix and flip financing up to 92.5 percent of purchase"
      className="bg-card border-t-[3px] border-orange"
    >
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-11">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-9 lg:gap-14 items-center">
          <Link
            to="/programs/$slug"
            params={{ slug: "fix-and-flip" }}
            aria-label="See fix and flip loan program"
          >
            <img
              src={flipBanner}
              alt="The best lender for fix-and-flip and rental loans"
              width={1600}
              height={944}
              loading="eager"
              className="block h-auto w-full max-w-[600px] hover:opacity-90 transition-opacity"
            />
          </Link>

          <div>
            <div className="flex items-end gap-4">
              <span className="font-serif text-6xl md:text-7xl leading-[0.85] text-orange-deep">
                92.5<span className="text-4xl md:text-5xl align-baseline">%</span>
              </span>
              <span className="pb-1 text-[11px] uppercase tracking-[0.2em] text-foreground/55 leading-relaxed">
                of purchase
                <br />
                financed
              </span>
            </div>

            <p className="mt-5 text-sm text-foreground/65 leading-relaxed max-w-md">
              Fix &amp; flip and bridge financing for investors — up to 92.5% of the purchase price
              and 100% of the rehab budget. Single-family, multi-family and mixed-use, $75K to
              $10MM, 600+ credit. No flip experience required.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/programs/$slug"
                params={{ slug: "fix-and-flip" }}
                className="inline-flex items-center gap-2 bg-orange-deep text-background px-6 py-3 text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                See Fix &amp; Flip <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm tracking-wide hover:border-orange-deep hover:text-orange-deep transition-colors"
              >
                <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
              </a>
            </div>

            <dl className="mt-7 grid grid-cols-3 divide-x divide-line border border-line bg-card">
              {SPECS.map((s) => (
                <div key={s.label} className="px-4 py-4">
                  <dt className="text-[10px] uppercase tracking-widest text-foreground/50">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-orange-deep">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
