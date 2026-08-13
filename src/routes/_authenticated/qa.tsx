import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/qa")({
  head: () => ({
    meta: [
      { title: `Q&A Admin | ${COMPANY_NAME}` },
      { name: "description", content: "Approve and publish visitor questions and answers." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Q&A Admin | ${COMPANY_NAME}` },
      {
        property: "og:description",
        content: "Approve and publish visitor questions and answers.",
      },
    ],
  }),
  component: QAAdminPage,
});

type QARow = {
  id: string;
  question: string;
  answer: string;
  asker_name: string | null;
  approved: boolean;
  sort_order: number;
};

function QAAdminPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asker, setAsker] = useState("");
  const [saving, setSaving] = useState(false);

  const itemsQuery = useQuery({
    queryKey: ["qa-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qa_items")
        .select("id, question, answer, asker_name, approved, sort_order")
        .order("sort_order", { ascending: true })
        .limit(100);
      if (error) throw error;
      return (data ?? []) as QARow[];
    },
  });

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || saving) return;
    setSaving(true);
    const { error } = await supabase.from("qa_items").insert({
      question: question.trim(),
      answer: answer.trim(),
      asker_name: asker.trim() || null,
      approved: true,
      sort_order: (itemsQuery.data?.length ?? 0) + 1,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setQuestion("");
    setAnswer("");
    setAsker("");
    toast.success("Published to the Q&A section");
    itemsQuery.refetch();
  }

  async function toggleApproved(row: QARow) {
    const { error } = await supabase
      .from("qa_items")
      .update({ approved: !row.approved })
      .eq("id", row.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    itemsQuery.refetch();
  }

  async function remove(row: QARow) {
    const { error } = await supabase.from("qa_items").delete().eq("id", row.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted");
    itemsQuery.refetch();
  }

  const items = itemsQuery.data ?? [];

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <header className="border-b border-line bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="font-serif text-2xl">Q&amp;A</h1>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
            <Link to="/admin" className="text-foreground/60 hover:text-gold">
              Blog Admin
            </Link>
            <Link to="/live-chat" className="text-foreground/60 hover:text-gold">
              Live Chat
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <form onSubmit={handleAdd} className="space-y-3 border border-line bg-background p-6">
          <p className="text-[11px] uppercase tracking-widest text-gold">Add a question</p>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className="w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            required
          />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            rows={4}
            className="w-full resize-none border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            required
          />
          <input
            value={asker}
            onChange={(e) => setAsker(e.target.value)}
            placeholder="Asked by (optional, e.g. Maria, Boca Raton)"
            className="w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={saving}
            className="bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold-foreground disabled:opacity-60"
          >
            {saving ? "Publishing…" : "Publish"}
          </button>
        </form>

        <div className="border border-line bg-background">
          <div className="border-b border-line px-6 py-3 text-[11px] uppercase tracking-widest text-foreground/60">
            All questions ({items.length})
          </div>
          <ul>
            {items.map((row) => (
              <li key={row.id} className="border-b border-line px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{row.question}</p>
                    <p className="mt-1 text-sm text-foreground/65">{row.answer}</p>
                    {row.asker_name && (
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-foreground/40">
                        {row.asker_name}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2 text-xs uppercase tracking-[0.15em]">
                    <button
                      onClick={() => toggleApproved(row)}
                      className={row.approved ? "text-gold" : "text-foreground/50 hover:text-gold"}
                    >
                      {row.approved ? "Approved" : "Approve"}
                    </button>
                    <button
                      onClick={() => remove(row)}
                      className="text-foreground/40 hover:text-destructive"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {items.length === 0 && (
              <li className="px-6 py-8 text-sm text-foreground/50">Nothing here yet.</li>
            )}
          </ul>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
