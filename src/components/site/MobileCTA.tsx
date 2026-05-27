import { Phone, ArrowRight } from "lucide-react";
import { PHONE_TEL } from "@/lib/site-data";

export function MobileCTA() {
  return (
    <>
      {/* spacer so the fixed bar never covers footer content on mobile */}
      <div aria-hidden className="h-[68px] md:hidden bg-charcoal" />
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 flex gap-3 border-t border-line bg-background/95 p-3 backdrop-blur shadow-[0_-6px_24px_-10px_rgba(0,0,0,0.25)]">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 py-3 text-sm tracking-wide"
        >
          <Phone className="w-4 h-4" /> Call
        </a>
        <a
          href="/#contact"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold text-gold-foreground py-3 text-sm tracking-wide"
        >
          Get my rate <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}
