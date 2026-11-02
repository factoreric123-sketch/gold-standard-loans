import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";

// Admin and sign-in screens stay clean — no marketing strip there.
const HIDE_ON = ["/lender-portal", "/auth"];

export function AnnouncementBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (HIDE_ON.some((p) => path.startsWith(p))) return null;

  return (
    <div className="bg-gold text-gold-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-[11px] uppercase tracking-[0.18em]">
        <Link
          to="/fix-and-flip-application"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-75"
        >
          <span>Fix &amp; flip financing up to 92.5% of purchase — apply online in 3 minutes</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        </Link>
        <a
          href={`tel:${PHONE_TEL}`}
          className="hidden shrink-0 items-center gap-1.5 border-l border-gold-foreground/30 pl-3 transition-opacity hover:opacity-75 sm:flex"
        >
          <Phone className="h-3 w-3" strokeWidth={2} />
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
