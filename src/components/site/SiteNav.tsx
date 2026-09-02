import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, PROGRAMS } from "@/lib/site-data";
import { Logo } from "@/components/site/Logo";
import { TranslateButton } from "@/components/site/TranslateButton";

type NavLink = { href: string; label: string };
type NavItem = { label: string; href?: string; items?: NavLink[] };

const navItems: NavItem[] = [
  {
    label: "International Buyers",
    items: [
      { href: "/buying-usa-home", label: "Expats Buying a USA Home" },
      { href: "/buy-a-home", label: "USA Mortgage for Expats" },
    ],
  },
  {
    label: "Loan Programs",
    items: [
      ...PROGRAMS.map((p) => ({ href: `/programs/${p.slug}`, label: p.name })),
      { href: "/special-programs", label: "Grant Money" },
    ],
  },
  {
    label: "Rates",
    items: [
      { href: "/todays-rates", label: "Today's Rates" },
      { href: "/rate-news", label: "Rate Prediction" },
    ],
  },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const triggerClass =
  "inline-flex items-center gap-1 hover:text-foreground transition-colors focus:outline-none focus-visible:text-foreground";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

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
      <div className="mx-auto max-w-7xl px-6 min-h-[120px] lg:h-28 py-3 lg:py-0 flex items-center justify-between gap-3 lg:gap-4">
        <a href="/" aria-label="The Discount Mortgage Store — home" className="shrink-0">
          <Logo size="sm" />
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-[12px] uppercase tracking-[0.12em] text-foreground/70 ml-auto">
          {navItems.map((item) =>
            item.items ? (
              <div key={item.label} className="relative group">
                <button type="button" className={triggerClass} aria-haspopup="true">
                  {item.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block">
                  <div className="min-w-[240px] bg-background border border-line py-2 shadow-soft max-h-[70vh] overflow-y-auto">
                    {item.items.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="block px-5 py-2.5 text-foreground/75 hover:text-foreground hover:bg-accent transition-colors normal-case tracking-[0.08em]"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:inline-block">
            <TranslateButton />
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-4 py-3 text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="lg:hidden">Call</span>
            <span className="hidden lg:inline">Call Now</span>
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] bg-charcoal text-gold hover:opacity-90 transition-opacity"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-background max-h-[calc(100vh-7.5rem)] overflow-y-auto">
          <div className="px-6 py-4 flex flex-col text-sm uppercase tracking-[0.15em]">
            <TranslateButton className="mb-4 justify-center" />
            {navItems.map((item) =>
              item.items ? (
                <div key={item.label} className="border-b border-line/70">
                  <button
                    type="button"
                    onClick={() => setMobileOpen((v) => (v === item.label ? null : item.label))}
                    aria-expanded={mobileOpen === item.label}
                    className="w-full min-h-[44px] py-3 flex items-center justify-between text-foreground/80"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileOpen === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileOpen === item.label && (
                    <div className="pb-2 flex flex-col">
                      {item.items.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="pl-4 py-3 min-h-[44px] flex items-center normal-case tracking-[0.08em] text-foreground/70 hover:text-foreground"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 min-h-[44px] flex items-center border-b border-line/70 text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-4 bg-gold text-gold-foreground px-5 py-3 min-h-[44px] flex items-center justify-center"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
