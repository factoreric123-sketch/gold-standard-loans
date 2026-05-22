import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";

const links = [
  { href: "#programs", label: "Programs" },
  { href: "#why", label: "Why Warren" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-gold/30">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl md:text-2xl tracking-tight">
          The Discount Mortgage Store
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest text-foreground/80">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden sm:inline-flex items-center gap-2 bg-gold text-gold-foreground px-5 py-3 text-xs uppercase tracking-widest hover:bg-gold/90 transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-gold/30 bg-background">
          <div className="px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-widest">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2">
                {l.label}
              </a>
            ))}
            <a href={`tel:${PHONE_TEL}`} className="bg-gold text-gold-foreground px-5 py-3 text-center">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
