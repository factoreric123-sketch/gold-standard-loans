import { describe, it, expect } from "vitest";
import { hecmLineSplit } from "./reverse-calc";

describe("hecmLineSplit", () => {
  it("limits first-year draws to 60% of the limit when the mortgage is small", () => {
    expect(hecmLineSplit(400000, 100000)).toEqual({ firstYear: 140000, afterYearOne: 160000, total: 300000 });
  });
  it("allows payoff plus 10% when the mortgage exceeds 60%", () => {
    expect(hecmLineSplit(400000, 300000)).toEqual({ firstYear: 40000, afterYearOne: 60000, total: 100000 });
  });
});
