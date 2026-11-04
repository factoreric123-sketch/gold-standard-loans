import { Plus } from "lucide-react";
import { Reveal } from "@/components/site/motion";

const VA_FAQS: { q: string; a: string }[] = [
  {
    q: "Who is eligible for a VA loan?",
    a: "Eligibility is based on military service, not income alone. Qualified borrowers generally include veterans, active-duty service members, National Guard and Reserve members who meet minimum service requirements, and certain surviving spouses. You'll need a Certificate of Eligibility (COE), which Warren can help you obtain.",
  },
  {
    q: "What is the VA funding fee and how much is it?",
    a: "It's a one-time government fee that helps keep VA loans running without monthly mortgage insurance. For a cash-out refinance it's 2.15% of the loan amount on first use and 3.3% on subsequent use; purchase loans with less than 5% down use the same percentages, and larger down payments can reduce it. The fee can usually be financed into the loan.",
  },
  {
    q: "Who is exempt from the VA funding fee?",
    a: "The fee is waived for borrowers receiving VA compensation for a service-connected disability and for qualifying surviving spouses of veterans who died in service or from a service-connected disability. Other exemptions may apply. A disability rating alone doesn't establish the exemption — the lender verifies your status.",
  },
  {
    q: "How much can I take out with a VA cash-out refinance?",
    a: "VA guidelines allow cash-out up to 100% of your home's appraised value, though some lenders cap at 90% or 95%. Your cash at closing is the new loan amount minus your existing mortgage payoff, fees, and closing costs — not 100% of the home's value in cash. Warren can compare lenders that allow the full 100%.",
  },
  {
    q: "What are the closing costs on a VA loan?",
    a: "VA caps what you pay at the table and limits qualifying seller concessions to 4% of the home's reasonable value. On a purchase, third-party costs like appraisal, title, and escrow can't be financed into the loan, but lender credits or seller contributions can help cover them. On a cash-out refinance, closing costs can generally be financed within the lender's LTV limits.",
  },
  {
    q: "Do I need a down payment?",
    a: "No. VA purchase loans require no down payment for eligible borrowers, and there's no monthly PMI at any loan-to-value — two of the biggest savings over conventional financing.",
  },
  {
    q: "How soon can I refinance an existing VA loan?",
    a: "For a VA-to-VA refinance, seasoning rules generally require at least six consecutive monthly payments and at least 210 days from the due date of your first mortgage payment to the new loan's closing date. Requirements can differ when replacing a non-VA loan; the lender confirms which rules apply to your mortgage.",
  },
];

export function VaFaq() {
  return (
    <section id="va-faq" className="bg-off-white border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">FAQ</div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            VA loan questions, <span className="italic text-gold">answered.</span>
          </h2>
          <p className="mt-4 text-foreground/65 max-w-2xl leading-relaxed">
            Quick answers on eligibility, funding fees, exemptions, and closing costs. Call Warren
            for anything specific to your file.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 border-y border-line">
            {VA_FAQS.map((f) => (
              <details key={f.q} className="group border-b border-line last:border-b-0">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5">
                  <span className="font-serif text-xl">{f.q}</span>
                  <Plus className="w-5 h-5 text-gold shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="text-foreground/65 leading-relaxed pb-5 -mt-1 max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <p className="mt-8 text-xs text-foreground/45 leading-relaxed">
          Educational guidance only. Eligibility, fees, and costs depend on VA guidelines and the
          lender's underwriting of your complete file.
        </p>
      </div>
    </section>
  );
}
