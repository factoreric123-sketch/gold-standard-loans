export const HECM_LIMIT = 1_249_125;

// Approximate principal-limit percentages by age (illustrative, not lender tables).
// Midpoints of Warren's age benchmark ranges: 62 ~34.5–39.5%, 70 ~42–48%, 80 ~50–56%, 90+ ~61% (cap).
const HECM_PLF: Array<[number, number]> = [[62, 0.37], [70, 0.45], [80, 0.53], [90, 0.61], [99, 0.61]];
// Proprietary: ~39.1% and up from age 55, capped at ~61.1% at 90+.
const HOMESAFE_PLF: Array<[number, number]> = [[55, 0.391], [70, 0.45], [80, 0.53], [90, 0.611], [99, 0.611]];

/** Illustrative tenure payment: level monthly amount paid until age 100 at an assumed 6.5% rate. */
export const TENURE_RATE = 0.065;
export function tenurePayment(amount: number, age: number) {
  const n = Math.max(12, (100 - age) * 12);
  const r = TENURE_RATE / 12;
  return Math.round((amount * r) / (1 - Math.pow(1 + r, -n)));
}

function interp(table: Array<[number, number]>, age: number) {
  if (age <= table[0][0]) return table[0][1];
  for (let i = 1; i < table.length; i++) {
    const [a1, p1] = table[i];
    const [a0, p0] = table[i - 1];
    if (age <= a1) return p0 + ((p1 - p0) * (age - a0)) / (a1 - a0);
  }
  return table[table.length - 1][1];
}

type Result = { eligible: true; gross: number; net: number } | { eligible: false; reason: string };

/**
 * HECM line of credit: first-year draws are limited to 60% of the principal limit,
 * or mandatory obligations (mortgage payoff) + 10% of the limit if that's higher.
 */
export function hecmLineSplit(gross: number, balance: number) {
  const firstYearCap = Math.min(gross, Math.max(0.6 * gross, balance + 0.1 * gross));
  const firstYear = Math.max(0, Math.round(firstYearCap - balance));
  const total = Math.max(0, gross - balance);
  return { firstYear, afterYearOne: Math.max(0, total - firstYear), total };
}

export function estimateReverse({ homeValue, age, balance }: { homeValue: number; age: number; balance: number }) {
  const calc = (min: number, table: Array<[number, number]>, base: number): Result => {
    if (age < min) return { eligible: false, reason: `Requires the youngest borrower to be ${min} or older.` };
    const gross = Math.round(base * interp(table, age));
    return { eligible: true, gross, net: Math.max(0, gross - balance) };
  };
  return {
    hecm: calc(62, HECM_PLF, Math.min(homeValue, HECM_LIMIT)),
    homesafe: calc(55, HOMESAFE_PLF, Math.min(homeValue, 4_000_000)),
  };
}
