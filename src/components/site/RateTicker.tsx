import { Phone, MapPin } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, NMLS, RATES } from "@/lib/site-data";

const conv30 = RATES.find((r) => r.name.includes("Conventional 30yr"));
const fha30 = RATES.find((r) => r.name.includes("FHA 30yr"));

export function RateTicker() {
  return (
    <div className="hidden sm:block bg-charcoal text-background/80">
      <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between gap-4 text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-2 text-background/70 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
          <span>Boca Raton, FL · {NMLS}</span>
        </div>
        <div className="hidden lg:flex items-center gap-6 whitespace-nowrap">
          {conv30 && (
            <span className="flex items-baseline gap-1.5">
              <span className="text-background/70">30-Yr Fixed</span>
              <span className="text-gold font-medium">{conv30.rate}</span>
            </span>
          )}
          {fha30 && (
            <span className="flex items-baseline gap-1.5">
              <span className="text-background/70">FHA 30-Yr</span>
              <span className="text-gold font-medium">{fha30.rate}</span>
            </span>
          )}
        </div>
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center gap-2 text-gold hover:text-background transition-colors shrink-0"
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{PHONE_DISPLAY}</span>
        </a>
      </div>
    </div>
  );
}
