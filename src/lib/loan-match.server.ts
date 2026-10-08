import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export type LoanMatchInput = {
  purpose: string;
  price: number;
  downPayment: number;
  location: string;
  occupancy: string;
  credit: string;
  income: string;
  firstTime: boolean;
  veteran: boolean;
  timeline: string;
  goals: string;
};

export type LoanMatchResult = {
  summary: string;
  programs: { slug: string; reason: string }[];
  steps: string[];
};

export const PROGRAM_SLUGS = [
  "conventional", "fha", "va", "bank-statement", "dscr", "investment-loans", "zero-down",
  "fix-and-flip", "bridge-loans", "hotel-commercial", "foreign-national", "asset-based",
  "low-credit-score", "heloc", "special-programs",
];

export class LoanMatchError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

function parse(text: string): LoanMatchResult {
  const summary: string[] = [];
  const programs: LoanMatchResult["programs"] = [];
  const steps: string[] = [];
  for (const raw of text.split(/\n+/)) {
    const line = raw.replace(/\*\*/g, "").trim();
    let m;
    if ((m = line.match(/^PROGRAM:\s*([a-z-]+)\s*\|\s*(.+)$/i))) {
      const slug = m[1].toLowerCase();
      if (PROGRAM_SLUGS.includes(slug) && !programs.some((p) => p.slug === slug))
        programs.push({ slug, reason: m[2].trim() });
    } else if ((m = line.match(/^STEP:\s*(.+)$/i))) steps.push(m[1].trim());
    else if ((m = line.match(/^SUMMARY:\s*(.+)$/i))) summary.push(m[1].trim());
  }
  return { summary: summary.join(" "), programs: programs.slice(0, 4), steps: steps.slice(0, 7) };
}

export async function generateLoanMatch(input: LoanMatchInput): Promise<LoanMatchResult> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new LoanMatchError("AI recommendations are not configured.", 401);

  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (url, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);
      const res = await fetch(url, { ...init, headers });
      runId ??= res.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
      return res;
    },
  });

  const system = `You are Warren Factor's assistant at The Discount Mortgage Store, a licensed mortgage broker based in Boca Raton, Florida.
Recommend 2-4 of the broker's loan programs that best fit a Florida homebuyer, and a personalized list of 4-6 next steps.
Allowed program slugs (use ONLY these):
conventional (conforming, 3-5% down, best with 620+ credit), fha (3.5% down, 580+ credit, flexible), va (veterans/active duty, 0% down),
bank-statement (self-employed, no tax returns), dscr (investment property qualified on rent), investment-loans, zero-down,
fix-and-flip, bridge-loans, hotel-commercial, foreign-national (non-U.S. citizens, no U.S. income verification), asset-based (qualify on assets),
low-credit-score (below 620), heloc (tap existing equity), special-programs (Florida Hometown Heroes and Florida Housing down-payment grants for first-time/eligible buyers).
Consider Florida specifics where relevant: homeowners and flood insurance costs, condo rules, Florida Housing assistance.
Current posted rates on the site (as of Oct 8, 2026): Conventional 30-yr fixed 7.25%, FHA 30-yr fixed 6.875%, Bank Statement 30-yr fixed 7.25%, Conventional 15-yr fixed 6.5%, VA 30-yr fixed 6.75%. Treasury 5-yr yield 5.055%, 10-yr yield 5.292%. If you mention a rate figure, use these numbers only and say they are today's posted estimates, not an offer.
Output EXACTLY in this plain-text format, no markdown, no other lines:
SUMMARY: <2-3 sentence personalized overview>
PROGRAM: <slug> | <one or two sentences on why it fits this buyer>
STEP: <one concrete action>
Never guarantee approval or rates; these are estimates, not a loan offer. The last STEP must invite them to get a real quote from Warren at (561) 577-1882.`;

  const prompt = `Purpose: ${input.purpose}
Target purchase price: $${input.price.toLocaleString("en-US")}
Down payment available: $${input.downPayment.toLocaleString("en-US")}
Florida location: ${input.location || "not specified"}
Occupancy: ${input.occupancy}
Estimated credit score: ${input.credit}
Income type: ${input.income}
First-time buyer: ${input.firstTime ? "yes" : "no"}
Veteran / military: ${input.veteran ? "yes" : "no"}
Timeline: ${input.timeline}
Financial goals and notes: ${input.goals || "none"}`;

  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      instructions: system,
      prompt,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    } as Parameters<typeof streamText>[0]);
    const text = await result.text;
    const parsed = parse(text);
    if (!parsed.programs.length && !parsed.steps.length)
      throw new LoanMatchError("No recommendations could be generated for this request.", 502);
    return parsed;
  } catch (e) {
    if (e instanceof LoanMatchError) throw e;
    const status = (e as { statusCode?: number }).statusCode ?? 500;
    if (status === 429) throw new LoanMatchError("Too many requests right now — please try again in a minute.", 429);
    if (status === 402 || status === 403)
      throw new LoanMatchError("AI recommendations are temporarily unavailable. Please contact Warren directly.", status);
    throw new LoanMatchError("Something went wrong generating recommendations. Please try again.", status);
  }
}
