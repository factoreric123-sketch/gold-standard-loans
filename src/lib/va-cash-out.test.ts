import { describe, expect, it } from "vitest";
import { estimateVaCashOut, type VaCashOutInput } from "./va-cash-out";

const input: VaCashOutInput = {
  homeValue: 500000, payoff: 300000, closingCosts: 5000, ltv: 100,
  feeStatus: "first", financeFee: true, financeCosts: true,
  coe: "yes", primary: "yes", currentLoan: "va", payments: 6, days: 210,
};
describe("VA cash-out illustration", () => {
  it("uses the 2.15% first-use funding fee within the 100% total cap", () => {
    const r = estimateVaCashOut(input);
    expect(r.feeRate).toBe(0.0215);
    expect(r.totalLoan).toBeCloseTo(500000, 6);
    expect(r.cash).toBeCloseTo(184476.26040137, 4);
  });
  it("uses 3.3% for subsequent use", () => {
    expect(estimateVaCashOut({ ...input, feeStatus: "subsequent" }).fundingFee).toBeCloseTo(15972.89448209, 4);
  });
  it("waives the funding fee when exemption is assumed", () => {
    const r = estimateVaCashOut({ ...input, feeStatus: "exempt" });
    expect(r.fundingFee).toBe(0);
    expect(r.cash).toBe(195000);
  });
  it.each([90, 95] as const)("honors a %s%% lender overlay", (ltv) => {
    expect(estimateVaCashOut({ ...input, ltv }).totalLoan).toBeCloseTo(500000 * ltv / 100, 6);
  });
  it("requires six payments on an existing VA loan", () => {
    expect(estimateVaCashOut({ ...input, payments: 5 }).seasoningMet).toBe(false);
    expect(estimateVaCashOut(input).seasoningMet).toBe(true);
  });
  it("requires 210 days on an existing VA loan", () => {
    expect(estimateVaCashOut({ ...input, days: 209 }).seasoningMet).toBe(false);
    expect(estimateVaCashOut(input).seasoningMet).toBe(true);
  });
  it("does not treat non-VA seasoning as verified", () => {
    expect(estimateVaCashOut({ ...input, currentLoan: "non-va", days: 0 }).needsReview).toBe(true);
  });
  it("flags a non-primary residence", () => {
    expect(estimateVaCashOut({ ...input, primary: "no" }).blocked).toBe(true);
  });
  it("flags no COE eligibility", () => {
    expect(estimateVaCashOut({ ...input, coe: "no" }).blocked).toBe(true);
  });
  it("separates fees paid at closing from available cash", () => {
    const r = estimateVaCashOut({ ...input, financeFee: false, financeCosts: false });
    expect(r.cash).toBe(200000);
    expect(r.outOfPocket).toBe(15750);
  });
  it("shows a payoff shortfall instead of negative cash", () => {
    const r = estimateVaCashOut({ ...input, payoff: 550000, feeStatus: "exempt" });
    expect(r.cash).toBe(0);
    expect(r.shortfall).toBe(55000);
  });
  it("rejects zero, negative and non-finite home values", () => {
    for (const homeValue of [0, -1, Infinity, NaN]) {
      expect(estimateVaCashOut({ ...input, homeValue }).valid).toBe(false);
    }
  });
});