import { describe, it, expect } from "vitest";
import { hecmLineSplit, estimateReverse } from "./reverse-calc";

describe("age benchmarks", () => {
  it("age 62 HECM uses ~37% of value", () => {
    const r = estimateReverse({ homeValue: 500000, age: 62, balance: 0 });
    expect(r.hecm.eligible && r.hecm.gross).toBe(185000);
  });
  it("HECM under 62 is ineligible; proprietary starts at 39.1%", () => {
    const r = estimateReverse({ homeValue: 500000, age: 55, balance: 0 });
    expect(r.hecm.eligible).toBe(false);
    expect(r.homesafe.eligible && r.homesafe.gross).toBe(195500);
  });
  it("age 90+ caps at ~61%", () => {
    const r = estimateReverse({ homeValue: 1000000, age: 95, balance: 0 });
    expect(r.hecm.eligible && r.hecm.gross).toBe(610000);
    expect(r.homesafe.eligible && r.homesafe.gross).toBe(611000);
  });
});

describe("hecmLineSplit", () => {
  it("limits first-year draws to 60% of the limit when the mortgage is small", () => {
    expect(hecmLineSplit(400000, 100000)).toEqual({ firstYear: 140000, afterYearOne: 160000, total: 300000 });
  });
  it("allows payoff plus 10% when the mortgage exceeds 60%", () => {
    expect(hecmLineSplit(400000, 300000)).toEqual({ firstYear: 40000, afterYearOne: 60000, total: 100000 });
  });
});
