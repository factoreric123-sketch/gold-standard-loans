import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const COMPANY_TYPES = [
  "Lender",
  "Title company",
  "Escrow company",
  "Signing service",
  "Law firm",
  "Other",
] as const;

export const DOCS = [
  "Commission / notary certificate",
  "E&O insurance certificate",
  "Surety bond",
  "Professional references",
  "W-9",
  "Background check",
] as const;

const opt = (n: number) => z.string().trim().max(n).optional().default("");

const schema = z.object({
  company: z.string().trim().min(1).max(150),
  company_type: z.enum(COMPANY_TYPES),
  contact_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  fee_offered: opt(200),
  payment_terms: opt(200),
  eo_min_coverage: opt(100),
  requested_docs: z.array(z.enum(DOCS)).max(DOCS.length),
  references_needed: z.number().int().min(0).max(10).optional(),
  portal_url: z.union([z.literal(""), z.string().trim().url().max(500)]).optional().default(""),
  notes: opt(2000),
  website: z.string().max(0).optional(),
});

export const submitVendorOnboarding = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const { website: _hp, ...r } = data;
    const nul = (v: string) => v || null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("vendor_onboarding_requests")
      .insert({
        ...r,
        fee_offered: nul(r.fee_offered),
        payment_terms: nul(r.payment_terms),
        eo_min_coverage: nul(r.eo_min_coverage),
        portal_url: nul(r.portal_url),
        notes: nul(r.notes),
        references_needed: r.references_needed ?? null,
      })
      .select("id")
      .single();
    if (error) throw new Error("Could not save your request. Please call or email instead.");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "2fb7050f-5c48-468f-a1c0-2f0e073f38c5",
          subject: `Vendor onboarding request — ${r.company} (${r.company_type})`,
          from_name: "The Discount Mortgage Store website",
          name: r.contact_name,
          email: r.email,
          phone: r.phone,
          company: r.company,
          company_type: r.company_type,
          fee_offered: r.fee_offered,
          payment_terms: r.payment_terms,
          eo_minimum_coverage: r.eo_min_coverage,
          documents_requested: r.requested_docs.join(", "),
          references_needed: r.references_needed ?? "",
          onboarding_portal: r.portal_url,
          notes: r.notes,
        }),
      });
    } catch {
      // stored even if email relay fails
    }
    return { id: row.id };
  });
