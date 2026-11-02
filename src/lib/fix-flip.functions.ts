import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const LOAN_PURPOSES = [
  "Purchase + rehab",
  "Refinance existing deal",
  "Bridge (short-term)",
  "Ground-up construction",
] as const;

export const TIMELINES = [
  "Ready now — under contract",
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "Just exploring",
] as const;

export const FLIP_EXPERIENCE = [
  "First flip",
  "1–2 completed",
  "3–5 completed",
  "6+ completed",
] as const;

export const PROPERTIES_OWNED = ["None", "1", "2", "3–5", "6+"] as const;

export const CREDIT_BANDS = [
  "760+",
  "720–759",
  "680–719",
  "640–679",
  "600–639",
  "Below 600",
] as const;

const money = z.string().trim().max(20).optional().default("");

const schema = z.object({
  first_name: z.string().trim().min(1, "Required").max(80),
  last_name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  company: z.string().trim().max(150).optional().default(""),
  property_city: z.string().trim().max(80).optional().default(""),
  property_state: z.string().trim().min(2, "Required").max(40),
  purchase_price: money,
  rehab_budget: money,
  arv: money,
  loan_purpose: z.enum(LOAN_PURPOSES, { errorMap: () => ({ message: "Select one" }) }),
  timeline: z.enum(TIMELINES, { errorMap: () => ({ message: "Select one" }) }),
  flip_experience: z.enum(FLIP_EXPERIENCE, { errorMap: () => ({ message: "Select one" }) }),
  properties_owned: z.enum(PROPERTIES_OWNED, { errorMap: () => ({ message: "Select one" }) }),
  credit_score: z.enum(CREDIT_BANDS, { errorMap: () => ({ message: "Select one" }) }),
  notes: z.string().trim().max(1500).optional().default(""),
  website: z.string().max(0).optional(), // honeypot
});

export type FixFlipApplication = z.input<typeof schema>;

export const submitFixFlipApplication = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const { website: _hp, ...row } = data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("fix_flip_applications")
      .insert({
        ...row,
        company: row.company || null,
        property_city: row.property_city || null,
        purchase_price: row.purchase_price || null,
        rehab_budget: row.rehab_budget || null,
        arv: row.arv || null,
        notes: row.notes || null,
      })
      .select("id")
      .single();
    if (error) throw new Error("Could not save your application. Please call instead.");
    return { id: inserted.id };
  });
