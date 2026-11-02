import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getTreasuryYields } from "@/lib/treasury.functions";

/**
 * Posted mortgage rates were last set by hand when the official
 * 5-year Treasury stood at this yield. Rates move up/down with the
 * 5-year from this baseline, rounded to the nearest 1/8 point.
 */
export const BASELINE_5YR = 4.71;

export function shiftRate(rate: string, delta: number): string {
  const n = parseFloat(rate);
  if (!Number.isFinite(n) || delta === 0) return rate;
  const v = Math.round((n + delta) * 1000) / 1000;
  return `${Number(v.toFixed(3))}%`;
}

export function rateDelta(fiveYear: number | undefined): number {
  if (fiveYear === undefined || !Number.isFinite(fiveYear)) return 0;
  return Math.round((fiveYear - BASELINE_5YR) * 8) / 8;
}

export function useLiveRates<T extends { rate: string }>(rates: T[]): T[] {
  const fetchYields = useServerFn(getTreasuryYields);
  const { data } = useQuery({
    queryKey: ["treasury-yields"],
    queryFn: () => fetchYields(),
    refetchInterval: 30 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });
  const five = data?.rates.find((r) => r.label === "5-Yr")?.yield;
  const d = rateDelta(five);
  return d === 0 ? rates : rates.map((r) => ({ ...r, rate: shiftRate(r.rate, d) }));
}
