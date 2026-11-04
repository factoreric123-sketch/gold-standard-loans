import { useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { estimateVaCashOut, type VaCashOutInput } from "@/lib/va-cash-out";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const initial: VaCashOutInput = {
  homeValue: 500000, payoff: 300000, closingCosts: 5000, ltv: 100,
  feeStatus: "first", financeFee: true, financeCosts: true,
  coe: "unknown", primary: "yes", currentLoan: "va", payments: 6, days: 210,
};

function Choice({ id, label, value, options, onChange }: {
  id: string; label: string; value: string; options: [string, string][]; onChange: (value: string) => void;
}) {
  return <div><label htmlFor={id} className="mb-2 block text-sm text-muted-foreground">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="h-11 rounded-none bg-background"><SelectValue /></SelectTrigger>
      <SelectContent className="rounded-none">{options.map(([key, title]) => <SelectItem className="rounded-none" key={key} value={key}>{title}</SelectItem>)}</SelectContent>
    </Select></div>;
}

export function VaCashOutEstimator() {
  const [input, setInput] = useState(initial);
  const [numbers, setNumbers] = useState({ homeValue: "500000", payoff: "300000", closingCosts: "5000", payments: "6", days: "210" });
  const set = <K extends keyof VaCashOutInput>(key: K, value: VaCashOutInput[K]) => setInput((old) => ({ ...old, [key]: value }));
  const r = estimateVaCashOut(input);
  const valid = r.valid && Object.values(numbers).every((v) => v.trim() !== "");
  const numeric = (key: keyof typeof numbers, label: string) => <div>
    <label htmlFor={`vc-${key}`} className="mb-2 block text-sm text-muted-foreground">{label}</label>
    <Input id={`vc-${key}`} type="number" min={key === "homeValue" ? 1 : 0} step={key === "days" || key === "payments" ? 1 : 1000}
      className="h-11 rounded-none bg-background" value={numbers[key]} onChange={(e) => {
        setNumbers((old) => ({ ...old, [key]: e.target.value })); set(key, Number(e.target.value));
      }} />
  </div>;
  return <section id="va-cash-out-estimator" className="border-t border-line bg-off-white">
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div className="mb-4 flex items-center gap-2 text-sm uppercase text-gold"><Calculator className="size-4" /> VA cash-out</div>
      <h2 className="font-serif text-3xl md:text-4xl">Estimate your cash at closing.</h2>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="grid content-start gap-5 sm:grid-cols-2">
          {numeric("homeValue", "Estimated home value ($)")}{numeric("payoff", "Mortgage payoff ($)")}
          {numeric("closingCosts", "Estimated closing costs ($)")}
          <Choice id="vc-ltv" label="Lender LTV limit" value={String(input.ltv)} options={[["100", "100%"], ["95", "95%"], ["90", "90%"]]} onChange={(v) => set("ltv", v === "90" ? 90 : v === "95" ? 95 : 100)} />
          <Choice id="vc-fee" label="VA funding fee status" value={input.feeStatus} options={[["first", "First use — 2.15%"], ["subsequent", "Subsequent use — 3.3%"], ["exempt", "Exempt — subject to verification"]]} onChange={(v) => set("feeStatus", v === "first" ? "first" : v === "subsequent" ? "subsequent" : "exempt")} />
          <Choice id="vc-finance-fee" label="Funding fee payment" value={input.financeFee ? "finance" : "cash"} options={[["finance", "Finance in new loan"], ["cash", "Pay at closing"]]} onChange={(v) => set("financeFee", v === "finance")} />
          <Choice id="vc-costs" label="Closing costs payment" value={input.financeCosts ? "finance" : "cash"} options={[["finance", "Finance in new loan"], ["cash", "Pay at closing"]]} onChange={(v) => set("financeCosts", v === "finance")} />
          <Choice id="vc-loan" label="Current mortgage type" value={input.currentLoan} options={[["va", "VA loan"], ["non-va", "Non-VA loan"]]} onChange={(v) => set("currentLoan", v === "va" ? "va" : "non-va")} />
          <Choice id="vc-coe" label="COE eligibility confirmed?" value={input.coe} options={[["unknown", "Not sure"], ["yes", "Yes"], ["no", "No"]]} onChange={(v) => set("coe", v === "yes" ? "yes" : v === "no" ? "no" : "unknown")} />
          <Choice id="vc-primary" label="Your primary residence?" value={input.primary} options={[["yes", "Yes"], ["no", "No"], ["unknown", "Not sure"]]} onChange={(v) => set("primary", v === "yes" ? "yes" : v === "no" ? "no" : "unknown")} />
          {input.currentLoan === "va" && <>{numeric("payments", "Consecutive monthly payments")}{numeric("days", "Days since first payment due")}</>}
        </div>
        <div className="min-w-0 border-t-2 border-gold pt-6" aria-live="polite" aria-atomic="true">
          {!valid ? <p className="text-destructive">Enter a positive home value and nonnegative amounts in every numeric field.</p> : <>
            <div className="text-sm text-muted-foreground">Illustrative maximum cash to you</div>
            <div className="mt-2 font-serif text-4xl text-gold" data-testid="va-estimated-cash">{money(r.cash)}</div>
            <dl className="mt-6 space-y-3 text-sm">
              {[["Total new loan", r.totalLoan], ["Mortgage payoff", input.payoff], [`Funding fee (${(r.feeRate * 100).toFixed(2)}%)`, r.fundingFee], ["Closing costs", input.closingCosts], ["Fees/costs paid out of pocket", r.outOfPocket]].map(([label, amount]) => <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-line pb-3"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium">{money(Number(amount))}</dd></div>)}
            </dl>
            {r.shortfall > 0 && <p className="mt-4 text-sm text-destructive">No cash available. Payoff and financed costs exceed the available loan by {money(r.shortfall)}; additional funds or a smaller payoff would be needed.</p>}
            <h3 className="mt-7 font-serif text-xl">Eligibility & review</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>{input.coe === "yes" ? "COE eligibility: reported confirmed; lender must verify." : input.coe === "no" ? "COE eligibility not met — VA financing requires eligibility." : "COE eligibility needs confirmation."}</li>
              <li>{input.primary === "yes" ? "Primary residence: reported yes." : input.primary === "no" ? "Not a primary residence — VA cash-out occupancy requirement not met." : "Primary residence occupancy needs confirmation."}</li>
              <li>{input.currentLoan === "non-va" ? "Replacing a non-VA loan: lender must determine applicable seasoning." : r.seasoningMet ? "Reported six-payment / 210-day seasoning thresholds met; dates require verification." : "Seasoning not met: at least six consecutive payments and 210 days are required for an existing VA loan."}</li>
              <li>Net Tangible Benefit: lender must review and provide the required disclosure; this estimate does not establish a financial benefit.</li>
              {input.feeStatus === "exempt" && <li>Exemption is assumed, not verified. VA compensation or qualifying spouse/other exemption status must be confirmed; a disability rating alone is insufficient.</li>}
            </ul>
            {r.blocked && <p className="mt-4 text-sm text-destructive">A reported requirement is not met. The figures above are arithmetic only, not an available loan offer.</p>}
          </>}
          <Button asChild className="mt-7 h-auto min-h-11 rounded-none whitespace-normal bg-gold text-gold-foreground"><a href="#va-review">Request Warren’s VA review <ArrowRight /></a></Button>
        </div>
      </div>
      <div className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted-foreground">
        <h3 className="font-serif text-xl text-foreground">Assumptions & limitations</h3>
        <p className="mt-3">Uses your estimated value as the appraisal and borrows to the selected 90%, 95%, or 100% LTV ceiling. Conservatively, that ceiling includes any financed funding fee and closing costs. The funding fee is calculated on the base loan before the fee is added. Default values ($500,000 home, $300,000 payoff, $5,000 costs) are examples, not a quote. Costs exclude the VA funding fee; lender credits and seller contributions are not assumed.</p>
        <p className="mt-3">Illustration only — not approval, a rate quote, or a commitment to lend. Actual cash and costs depend on the appraisal, exact payoff, lender overlays, fee exemption, credit, income, residual income, entitlement, occupancy, seasoning, and VA requirements. No monthly payment or interest-savings comparison is included. Financing fees increases your balance and reduces cash; $0 out-of-pocket is not guaranteed. Values are rounded to the nearest dollar. Entries are not saved or sent.</p>
      </div>
    </div>
  </section>;
}