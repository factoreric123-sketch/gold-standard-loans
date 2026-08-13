import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BROKER_NAME } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion";

type QAItem = {
  id: string;
  question: string;
  answer: string;
  asker_name: string | null;
};

export function QA() {
  const { data } = useQuery({
    queryKey: ["qa-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qa_items")
        .select("id, question, answer, asker_name")
        .eq("approved", true)
        .order("sort_order", { ascending: true })
        .limit(30);
      if (error) throw error;
      return (data ?? []) as QAItem[];
    },
  });

  const items = data ?? [];
  if (items.length === 0) return null;

  return (
    <section id="qa" className="border-t border-line bg-background">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <div className="text-[11px] uppercase tracking-widest text-gold">Q&amp;A</div>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Real questions, real answers</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
            Questions sent in by buyers, investors, and homeowners — answered personally by{" "}
            {BROKER_NAME}.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8">
          {items.map((item) => (
            <Reveal key={item.id}>
              <article className="border border-line p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-serif text-2xl leading-snug">{item.question}</h3>
                    {item.asker_name && (
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-foreground/45">
                        {item.asker_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 border-l-2 border-gold pl-5">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/75">
                    {item.answer}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-widest text-gold">
                    — {BROKER_NAME}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
