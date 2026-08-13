import { ArrowRight, MessageCircle } from "lucide-react";
import { APPLY_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site-data";

/**
 * Lead-capture call-to-action rendered at the bottom of every blog post.
 * "Get my rate" sends the reader to the contact form; "Chat with Warren"
 * opens the floating chat widget via a custom event the ChatWidget listens for.
 */
export function BlogCTA() {
  return (
    <div className="mt-14 border-t border-line pt-10">
      <div className="rounded-none bg-charcoal px-8 py-10 md:px-12 md:py-12">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gold">
          Ready to move forward?
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight text-background">
          Get your lowest rate today.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-background/65">
          One call to Warren Factor gets you a rate most banks simply won't
          offer. Prefer to chat first? Send a message and Warren will reply
          directly — no bots, no call centers.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm tracking-wide text-gold-foreground transition-opacity hover:opacity-90"
          >
            Get my rate <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 border border-background/25 px-7 py-3.5 text-sm tracking-wide text-background transition-colors hover:border-gold hover:text-gold"
          >
            Call {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("tdms-open-chat"))
            }
            className="inline-flex items-center gap-2 border border-background/25 px-7 py-3.5 text-sm tracking-wide text-background transition-colors hover:border-gold hover:text-gold"
          >
            <MessageCircle className="h-4 w-4" /> Chat with Warren
          </button>
        </div>
      </div>
    </div>
  );
}
