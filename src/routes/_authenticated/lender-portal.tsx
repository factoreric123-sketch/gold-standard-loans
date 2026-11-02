import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/lender-portal")({
  head: () => ({
    meta: [
      { title: `Lender Portal | ${COMPANY_NAME}` },
      { name: "description", content: "Review and approve vendor onboarding requests from lenders and title companies." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Lender Portal | ${COMPANY_NAME}` },
      { property: "og:description", content: "Review and approve vendor onboarding requests." },
    ],
  }),
  component: LenderPortal,
});

const STATUSES = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "signed_up", label: "Signed up" },
  { key: "declined", label: "Declined" },
] as const;
type Status = (typeof STATUSES)[number]["key"];

function LenderPortal() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<Status | "all">("all");
  const { data: rows = [], isLoading, error } = useQuery({
    queryKey: ["vendor-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendor_onboarding_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function setStatus(id: string, status: Status) {
    const { error } = await supabase
      .from("vendor_onboarding_requests")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return toast.error("Could not update — are you signed in as admin?");
    toast.success(`Marked ${STATUSES.find((s) => s.key === status)?.label}`);
    qc.invalidateQueries({ queryKey: ["vendor-requests"] });
  }

  async function saveNotes(id: string, admin_notes: string) {
    const { error } = await supabase.from("vendor_onboarding_requests").update({ admin_notes }).eq("id", id);
    if (error) toast.error("Could not save notes");
    else toast.success("Notes saved");
  }

  const counts = Object.fromEntries(STATUSES.map((s) => [s.key, rows.filter((r) => r.status === s.key).length]));
  const shown = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <Toaster />
      <header className="border-b border-line bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="font-serif text-2xl">Lender Portal</h1>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
            <Link to="/admin" className="text-foreground/60 hover:text-gold">Blog Admin</Link>
            <Link to="/live-chat" className="text-foreground/60 hover:text-gold">Live Chat</Link>
            <Link to="/notary-onboarding" className="text-foreground/60 hover:text-gold">Public form</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line mb-8">
          {STATUSES.map((s) => (
            <button
              key={s.key}
              onClick={() => setFilter(filter === s.key ? "all" : s.key)}
              className={`bg-background p-5 text-left transition-colors ${filter === s.key ? "outline outline-2 outline-gold -outline-offset-2" : "hover:bg-card"}`}
            >
              <div className="font-serif text-3xl text-gold">{counts[s.key] ?? 0}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-foreground/60">{s.label}</div>
            </button>
          ))}
        </div>

        {isLoading && <p className="text-foreground/60">Loading…</p>}
        {error && <p className="text-destructive">Couldn't load requests. Make sure you're signed in as the admin.</p>}
        {!isLoading && !error && shown.length === 0 && (
          <p className="text-foreground/60">No requests {filter === "all" ? "yet" : "with this status"}.</p>
        )}

        <div className="space-y-4">
          {shown.map((r) => (
            <article key={r.id} className="border border-line bg-background p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl">{r.company}</h2>
                  <p className="text-sm text-foreground/60">
                    {r.company_type} · {r.contact_name} ·{" "}
                    <a className="text-gold" href={`mailto:${r.email}`}>{r.email}</a> ·{" "}
                    <a className="text-gold" href={`tel:${r.phone}`}>{r.phone}</a>
                  </p>
                  <p className="mt-1 text-xs text-foreground/50">
                    Received {new Date(r.created_at).toLocaleDateString()}
                    {r.reviewed_at && ` · updated ${new Date(r.reviewed_at).toLocaleDateString()}`}
                  </p>
                </div>
                <span className="border border-gold px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                  {STATUSES.find((s) => s.key === r.status)?.label ?? r.status}
                </span>
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm md:grid-cols-3">
                {r.fee_offered && <Item term="Fee offered" def={r.fee_offered} />}
                {r.payment_terms && <Item term="Payment terms" def={r.payment_terms} />}
                {r.eo_min_coverage && <Item term="Min. E&O" def={r.eo_min_coverage} />}
                {r.references_needed != null && <Item term="References needed" def={String(r.references_needed)} />}
                {r.requested_docs.length > 0 && <Item term="Documents" def={r.requested_docs.join(", ")} />}
                {r.portal_url && (
                  <div>
                    <dt className="text-foreground/50">Portal</dt>
                    <dd><a className="text-gold break-all" href={r.portal_url} target="_blank" rel="noreferrer">{r.portal_url}</a></dd>
                  </div>
                )}
              </dl>
              {r.notes && <p className="mt-3 text-sm text-foreground/70">“{r.notes}”</p>}

              <textarea
                defaultValue={r.admin_notes ?? ""}
                onBlur={(e) => e.target.value !== (r.admin_notes ?? "") && saveNotes(r.id, e.target.value)}
                placeholder="Private notes (saved when you click away)"
                className="mt-4 w-full border border-line bg-cream p-3 text-sm"
                rows={2}
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {STATUSES.filter((s) => s.key !== r.status).map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStatus(r.id, s.key)}
                    className={`min-h-11 px-4 text-xs uppercase tracking-[0.2em] border ${s.key === "approved" ? "bg-gold text-background border-gold" : "border-line hover:border-gold"}`}
                  >
                    {s.key === "pending" ? "Back to pending" : s.key === "signed_up" ? "Mark signed up" : s.label === "Approved" ? "Approve" : "Decline"}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

function Item({ term, def }: { term: string; def: string }) {
  return (
    <div>
      <dt className="text-foreground/50">{term}</dt>
      <dd>{def}</dd>
    </div>
  );
}
