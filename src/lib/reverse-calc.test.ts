import { describe, it, expect } from "vitest";
import { estimateReverse } from "./reverse-calc";

describe("reverse calculator", () => {
  it("caps HECM at the $1,249,125 FHA limit but not HomeSafe", () => {
    const r = estimateReverse({ homeValue: 2_000_000, age: 70, balance: 0 });
    expect(r.hecm.eligible && r.hecm.gross).toBe(Math.round(1_249_125 * 0.42));
    expect(r.homesafe.eligible && r.homesafe.gross).toBe(Math.round(2_000_000 * 0.39));
  });
  it("HECM needs 62+, HomeSafe from 55", () => {
    const r = estimateReverse({ homeValue: 500_000, age: 58, balance: 0 });
    expect(r.hecm.eligible).toBe(false);
    expect(r.homesafe.eligible).toBe(true);
  });
});
