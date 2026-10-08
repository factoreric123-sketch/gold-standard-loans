import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export type GuidanceInput = {
  loanAmount: number;
  scenario: "base" | "bear" | "bull";
  goal: "buying" | "refinancing";
  timeline: string;
  notes: string;
};

const RATES = { base: 7.0, bear: 8.0, bull: 5.9 };

function payment(p: number, rate: number) {
  const r = rate / 100 / 12;
  const n = 360;
  return (p * r) / (1 - Math.pow(1 + r, -n));
}

export class GuidanceError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function generateGuidance(input: GuidanceInput): Promise<string> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new GuidanceError("AI guidance is not configured.", 401);

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

  const pays = Object.fromEntries(
    Object.entries(RATES).map(([k, r]) => [k, Math.round(payment(input.loanAmount, r))]),
  );

  const system = `You are Warren Factor's assistant at The Discount Mortgage Store (NMLS-licensed broker).
Write concise, practical, personalized guidance (about 250-350 words) in plain English using short markdown-free paragraphs and simple "- " bullet lines.
Scenarios (supplied outlook, not independently verified): Base Case rates 6.7%-7.3% (modeled 7.0%), Bear Case toward 8.0%, Bull Case below 6.0% (modeled 5.9%). 30-year fixed principal & interest only.
Cover: what the visitor's preferred scenario means for them, how each of the other two paths would change their decision (timing, rate lock, float-down, buydowns, refinancing later, ARM vs fixed where relevant), and 2-3 concrete next steps. Never guarantee rates or outcomes; say these are estimates, not a loan offer. End by inviting them to get a real quote from Warren at (561) 577-1882.`;

  const prompt = `Goal: ${input.goal}
Loan amount: $${input.loanAmount.toLocaleString("en-US")}
Preferred / expected scenario: ${input.scenario}
Timeline: ${input.timeline}
Estimated monthly P&I — Base: $${pays.base}, Bear: $${pays.bear}, Bull: $${pays.bull}
Additional notes from visitor: ${input.notes || "none"}`;

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
    if (!text.trim()) throw new GuidanceError("No guidance could be generated for this request.", 502);
    return text;
  } catch (e) {
    if (e instanceof GuidanceError) throw e;
    const status = (e as { statusCode?: number }).statusCode ?? 500;
    if (status === 429) throw new GuidanceError("Too many requests right now — please try again in a minute.", 429);
    if (status === 402 || status === 403)
      throw new GuidanceError("AI guidance is temporarily unavailable. Please contact Warren directly.", status);
    throw new GuidanceError("Something went wrong generating guidance. Please try again.", status);
  }
}
