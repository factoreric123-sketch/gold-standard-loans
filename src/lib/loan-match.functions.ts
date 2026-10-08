import { createServerFn } from "@tanstack/react-start";

const pick = (v: unknown, opts: string[]) => (opts.includes(String(v)) ? String(v) : opts[0]);
const num = (v: unknown, max: number) => Math.min(Math.max(Number(v) || 0, 0), max);

export const PURPOSES = ["Buy a primary home", "Buy a second home", "Buy an investment property"];
export const OCCUPANCY = ["Primary residence", "Second / vacation home", "Rental / investment"];
export const CREDIT = ["740+", "700–739", "660–699", "620–659", "580–619", "Below 580", "Not sure"];
export const INCOME = ["W-2 employee", "Self-employed", "Retired / assets", "Rental income", "Foreign national / no U.S. income"];
export const TIMELINES = ["Within 30 days", "1–3 months", "3–6 months", "6–12 months", "Just exploring"];

export const getLoanMatch = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const x = (d ?? {}) as Record<string, unknown>;
    return {
      purpose: pick(x.purpose, PURPOSES),
      price: num(x.price, 50000000),
      downPayment: num(x.downPayment, 50000000),
      location: String(x.location ?? "").slice(0, 80),
      occupancy: pick(x.occupancy, OCCUPANCY),
      credit: pick(x.credit, CREDIT),
      income: pick(x.income, INCOME),
      firstTime: Boolean(x.firstTime),
      veteran: Boolean(x.veteran),
      timeline: pick(x.timeline, TIMELINES),
      goals: String(x.goals ?? "").slice(0, 600),
    };
  })
  .handler(async ({ data }) => {
    const { generateLoanMatch, LoanMatchError } = await import("./loan-match.server");
    try {
      return { ok: true as const, result: await generateLoanMatch(data) };
    } catch (e) {
      return {
        ok: false as const,
        error: e instanceof LoanMatchError ? e.message : "Something went wrong. Please try again.",
      };
    }
  });
