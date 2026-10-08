import { createServerFn } from "@tanstack/react-start";

export const getRateGuidance = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const x = (d ?? {}) as Record<string, unknown>;
    const loanAmount = Math.min(Math.max(Number(x.loanAmount) || 0, 10000), 20000000);
    const scenario = ["base", "bear", "bull"].includes(String(x.scenario))
      ? (String(x.scenario) as "base" | "bear" | "bull")
      : "base";
    const goal = x.goal === "refinancing" ? "refinancing" : "buying";
    return {
      loanAmount,
      scenario,
      goal,
      timeline: String(x.timeline ?? "").slice(0, 60),
      notes: String(x.notes ?? "").slice(0, 500),
    } as const;
  })
  .handler(async ({ data }) => {
    const { generateGuidance, GuidanceError } = await import("./rate-guidance.server");
    try {
      return { ok: true as const, text: await generateGuidance(data) };
    } catch (e) {
      return {
        ok: false as const,
        error: e instanceof GuidanceError ? e.message : "Something went wrong. Please try again.",
      };
    }
  });
