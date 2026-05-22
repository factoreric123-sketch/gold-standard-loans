import { RATES, PHONE_DISPLAY } from "@/lib/site-data";

export function RateTicker() {
  const text = `${RATES.map(r => `${r.name} ${r.rate}`).join("  |  ")}  —  Rates updated daily  ·  Call ${PHONE_DISPLAY}`;
  return (
    <div className="bg-charcoal text-gold border-b border-gold/30 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-2 text-xs tracking-widest uppercase">
        <span className="px-8">{text}</span>
        <span className="px-8">{text}</span>
        <span className="px-8">{text}</span>
        <span className="px-8">{text}</span>
      </div>
    </div>
  );
}
