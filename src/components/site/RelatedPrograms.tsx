import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PROGRAMS, type Program } from "@/lib/site-data";

/**
 * Keyword map used to detect which mortgage programs an article mentions.
 * Keys are program slugs from site-data; values are lowercase phrases.
 */
const KEYWORDS: Record<string, string[]> = {
  "bank-statement": ["bank statement", "self-employed", "self employed", "1099"],
  heloc: ["heloc", "home equity line", "home equity"],
  dscr: ["dscr", "debt service coverage", "rental income", "investor loan"],
  conventional: [
    "cash-out refinance",
    "cash out refinance",
    "cash-out refi",
    "refinance",
    "conventional",
    "conforming",
  ],
  fha: ["fha"],
  va: ["va loan", "va mortgage", "veteran"],
  "foreign-national": ["foreign national", "expat", "itin", "non-resident", "foreign buyer"],
  "investment-loans": ["investment property", "rental property"],
  "fix-and-flip": ["fix and flip", "fix & flip", "flip"],
  "bridge-loans": ["bridge loan"],
  "hotel-commercial": ["hotel", "commercial property"],
  "asset-based": ["asset-based", "asset depletion"],
  "low-credit-score": ["credit score", "bad credit", "low credit"],
  "zero-down": ["zero down", "0% down", "no down payment"],
};

export function findMentionedPrograms(text: string, limit = 4): Program[] {
  const haystack = text.toLowerCase();
  const matched = PROGRAMS.filter((p) =>
    (KEYWORDS[p.slug] ?? []).some((k) => haystack.includes(k)),
  );
  const fallback = PROGRAMS.filter((p) =>
    ["bank-statement", "heloc", "dscr", "conventional"].includes(p.slug),
  );
  return (matched.length ? matched : fallback).slice(0, limit);
}

export function RelatedPrograms({ text }: { text: string }) {
  const programs = findMentionedPrograms(text);
  if (!programs.length) return null;

  return (
    <section className="mt-14 border-t border-line pt-10">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gold">
        Programs mentioned in this article
      </p>
      <h2 className="mt-3 font-serif text-3xl leading-tight">
        Ready to apply? Start with the right program.
      </h2>

      <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
        {programs.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.slug}
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col bg-background p-6 transition-colors hover:bg-gold/5"
            >
              <Icon className="h-5 w-5 text-gold" />
              <h3 className="mt-4 font-serif text-xl">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                {p.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
                Apply <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
