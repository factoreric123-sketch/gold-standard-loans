export type NewsItem = {
  title: string;
  link: string;
  source: string;
  publishedAt: string | null;
  summary: string;
};

// Feeds marked unfiltered show every article; the rest are keyword-filtered.
const FEEDS: { url: string; source: string; unfiltered?: boolean }[] = [
  { url: "https://www.mortgagenewsdaily.com/rss/full", source: "Mortgage News Daily", unfiltered: true },
  { url: "https://www.cnbc.com/id/20910258/device/rss/rss.html", source: "CNBC Economy", unfiltered: true },
  { url: "https://www.housingwire.com/feed/", source: "HousingWire" },
  { url: "https://feeds.content.dowjones.io/public/rss/mw_bulletins", source: "MarketWatch" },
];

const KEYWORDS = [
  "mortgage",
  "rate",
  "rates",
  "bond",
  "treasury",
  "yield",
  "fed",
  "federal reserve",
  "refinance",
  "housing",
  "home loan",
  "inflation",
  "mbs",
];

function decode(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

function parseFeed(xml: string, source: string): NewsItem[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  return blocks.map((b) => {
    const dateRaw = tag(b, "pubDate") || tag(b, "dc:date");
    const d = dateRaw ? new Date(dateRaw) : null;
    return {
      title: tag(b, "title"),
      link: tag(b, "link"),
      source,
      publishedAt: d && !isNaN(d.getTime()) ? d.toISOString() : null,
      summary: tag(b, "description").slice(0, 320),
    };
  });
}

function relevant(item: NewsItem, strict: boolean): boolean {
  if (!strict) return true;
  const hay = `${item.title} ${item.summary}`.toLowerCase();
  return KEYWORDS.some((k) => hay.includes(k));
}

export async function fetchRateNews(): Promise<{ items: NewsItem[]; error: string | null }> {
  const results = await Promise.allSettled(
    FEEDS.map(async (f) => {
      const res = await fetch(f.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; TDMSBot/1.0)" },
      });
      if (!res.ok) throw new Error(`${f.source} ${res.status}`);
      const xml = await res.text();
      const strict = f.source !== "Mortgage News Daily";
      return parseFeed(xml, f.source).filter((i) => i.title && i.link && relevant(i, strict));
    }),
  );

  const items: NewsItem[] = [];
  for (const r of results) if (r.status === "fulfilled") items.push(...r.value);

  const seen = new Set<string>();
  const deduped = items.filter((i) => {
    const key = i.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  deduped.sort((a, b) => {
    const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bt - at;
  });

  return {
    items: deduped.slice(0, 40),
    error: deduped.length ? null : "Live news is temporarily unavailable. Please check back shortly.",
  };
}
