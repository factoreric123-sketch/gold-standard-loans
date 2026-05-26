import { Phone, MapPin } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, NMLS } from "@/lib/site-data";

export function RateTicker() {
  return (
    <div className="hidden sm:block bg-charcoal text-background/80">
      <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-2 text-background/70">
          <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
          <span>Boca Raton, FL · {NMLS}</span>
        </div>
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center gap-2 text-gold hover:text-background transition-colors"
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{PHONE_DISPLAY}</span>
        </a>
      </div>
    </div>
  );
}
