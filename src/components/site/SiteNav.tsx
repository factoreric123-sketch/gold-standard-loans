import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";
import { Logo } from "@/components/site/Logo";

const links = [
  { href: "/buy-a-home", label: "Buy a Home" },
  { href: "/#programs", label: "Programs" },
  { href: "/special-programs", label: "Special Programs" },
  { href: "/todays-rates", label: "Today's Rates" },
  { href: "/rate-news", label: "Rate News" },
  { href: "/#why", label: "Why Warren" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-background border-b border-line ${
        scrolled ? "shadow-soft" : ""
      }`}
    >

      <div className="mx-auto max-w-7xl px-6 h-24 md:h-28 flex items-center justify-between">
        <a href="/" aria-label="The Discount Mortgage Store — home">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.15em] text-foreground/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden sm:inline-flex items-center gap-2 bg-gold text-gold-foreground rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
          >
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
          <button
            className="md:hidden p-2 text-foreground rounded-md hover:bg-accent transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-background">
          <div className="px-6 py-4 flex flex-col gap-1 text-sm uppercase tracking-[0.15em]">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-line/70 text-foreground/80 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-3 bg-gold text-gold-foreground rounded-full px-5 py-3 text-center"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
