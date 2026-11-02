import { createServerFn } from "@tanstack/react-start";

export type TreasuryYield = { label: string; yield: number };
export type TreasuryData = { asOf: string; rates: TreasuryYield[] } | null;

const FIELDS: [string, string][] = [
  ["3-Mo", "BC_3MONTH"],
  ["6-Mo", "BC_6MONTH"],
  ["1-Yr", "BC_1YEAR"],
  ["2-Yr", "BC_2YEAR"],
  ["5-Yr", "BC_5YEAR"],
  ["10-Yr", "BC_10YEAR"],
  ["30-Yr", "BC_30YEAR"],
];

async function fetchFeed(param: string) {
  const url = `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&${param}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const xml = await res.text();
  const entries = xml.split("<m:properties>").slice(1);
  if (!entries.length) return null;
  const last = entries[entries.length - 1];
  const date = last.match(/<d:NEW_DATE[^>]*>([^<T]+)/)?.[1];
  const rates = FIELDS.map(([label, tag]) => {
    const v = last.match(new RegExp(`<d:${tag}[^>]*>([^<]+)<`))?.[1];
    return { label, yield: v ? Number(v) : NaN };
  });
  if (!date || rates.some((r) => !Number.isFinite(r.yield))) return null;
  const asOf = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return { asOf, rates };
}

// Official U.S. Treasury daily par yield curve (updated each business day).
export const getTreasuryYields = createServerFn({ method: "GET" }).handler(
  async (): Promise<TreasuryData> => {
    try {
      const now = new Date();
      const ym = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
      return (
        (await fetchFeed(`field_tdr_date_value_month=${ym}`)) ??
        (await fetchFeed(`field_tdr_date_value=${now.getUTCFullYear()}`))
      );
    } catch {
      return null;
    }
  },
);
