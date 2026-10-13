import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const PACKAGE_TYPES = [
  "Purchase (buyer)",
  "Purchase (seller)",
  "Refinance",
  "HELOC / home equity",
  "Reverse mortgage",
  "Commercial loan",
  "Loan modification",
  "Other / general notary",
] as const;

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  signing_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  signing_time: z.string().regex(/^\d{2}:\d{2}$/),
  package_type: z.enum(PACKAGE_TYPES),
  location: z.string().trim().min(3).max(300),
  signers: z.number().int().min(1).max(20).optional(),
  notes: z.string().trim().max(1500).optional().default(""),
  website: z.string().max(0).optional(), // honeypot
});

export const submitNotaryBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const today = new Date().toISOString().slice(0, 10);
    if (data.signing_date < today) throw new Error("Please choose a future date.");
    const { website: _hp, ...row } = data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("notary_bookings")
      .insert({ ...row, company: row.company || null, notes: row.notes || null, signers: row.signers ?? null })
      .select("id")
      .single();
    if (error) throw new Error("Could not save your booking. Please call instead.");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "2fb7050f-5c48-468f-a1c0-2f0e073f38c5",
          subject: `Notary signing request — ${row.signing_date} ${row.signing_time} (${row.package_type})`,
          from_name: "The Discount Mortgage Store website",
          name: row.name,
          email: row.email,
          phone: row.phone,
          company: row.company,
          date: row.signing_date,
          time: row.signing_time,
          package_type: row.package_type,
          location: row.location,
          signers: row.signers ?? "",
          notes: row.notes,
        }),
      });
    } catch {
      // stored even if email relay fails
    }
    return { id: inserted.id };
  });
