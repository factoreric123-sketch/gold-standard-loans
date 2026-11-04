export type VaCashOutInput = {
  homeValue: number;
  payoff: number;
  closingCosts: number;
  ltv: 90 | 95 | 100;
  feeStatus: "first" | "subsequent" | "exempt";
  financeFee: boolean;
  financeCosts: boolean;
  coe: "yes" | "no" | "unknown";
  primary: "yes" | "no" | "unknown";
  currentLoan: "va" | "non-va";
  payments: number;
  days: number;
};

export function estimateVaCashOut(input: VaCashOutInput) {
  const valid = [input.homeValue, input.payoff, input.closingCosts, input.payments, input.days]
    .every((v) => Number.isFinite(v) && v >= 0) && input.homeValue > 0;
  const feeRate = input.feeStatus === "exempt" ? 0 : input.feeStatus === "first" ? 0.0215 : 0.033;
  const cap = valid ? input.homeValue * input.ltv / 100 : 0;
  // Conservative illustration: the selected LTV cap includes all financed fees.
  const baseLoan = cap / (1 + (input.financeFee ? feeRate : 0));
  const fundingFee = baseLoan * feeRate;
  const rawCash = baseLoan - input.payoff - (input.financeCosts ? input.closingCosts : 0);
  const outOfPocket = (input.financeFee ? 0 : fundingFee) + (input.financeCosts ? 0 : input.closingCosts);
  const seasoningMet = input.currentLoan === "non-va" || (input.payments >= 6 && input.days >= 210);
  const blocked = input.coe === "no" || input.primary === "no" || !seasoningMet;
  return {
    valid, feeRate, cap, baseLoan, fundingFee,
    totalLoan: baseLoan + (input.financeFee ? fundingFee : 0),
    cash: Math.max(0, rawCash), shortfall: Math.max(0, -rawCash), outOfPocket,
    seasoningMet, blocked,
    needsReview: input.coe === "unknown" || input.primary === "unknown" || input.currentLoan === "non-va",
  };
}