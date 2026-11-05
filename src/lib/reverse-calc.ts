export const HECM_LIMIT = 1_249_125;

// Approximate principal-limit percentages by age (illustrative, not lender tables).
const HECM_PLF: Array<[number, number]> = [[62, 0.36], [70, 0.42], [80, 0.52], [90, 0.64], [99, 0.72]];
const HOMESAFE_PLF: Array<[number, number]> = [[55, 0.26], [62, 0.32], [70, 0.39], [80, 0.48], [90, 0.58], [99, 0.65]];

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
