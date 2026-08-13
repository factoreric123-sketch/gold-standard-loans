CREATE TABLE public.qa_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  asker_name text,
  approved boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.qa_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.qa_items TO authenticated;
GRANT ALL ON public.qa_items TO service_role;

ALTER TABLE public.qa_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved Q&A"
  ON public.qa_items FOR SELECT
  USING (approved = true);

CREATE POLICY "Admins can read all Q&A"
  ON public.qa_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage Q&A"
  ON public.qa_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_qa_items_updated_at
  BEFORE UPDATE ON public.qa_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.qa_items (question, answer, asker_name, approved, sort_order) VALUES
('What credit score do I need for an FHA loan?', 'FHA can work with scores as low as 580 with 3.5% down. Below that, we look at 10% down. But score is only one piece — payment history, debt-to-income, and reserves all matter. Send me your numbers and I''ll tell you exactly where you stand.', 'Maria, Boca Raton', true, 1),
('Can I qualify using bank statements instead of tax returns?', 'Yes. Self-employed borrowers can qualify on 12 or 24 months of personal or business bank statements — no tax returns required. Rates start at 6.75% on a 5-year ARM.', 'Danny, Fort Lauderdale', true, 2),
('I''m not a U.S. citizen. Can I still get a mortgage?', 'Absolutely. We do foreign national loans and accept all visa types, plus ITIN borrowers. You don''t need a Social Security number or U.S. credit history — we qualify you on international documentation and assets.', 'Sofia, Miami', true, 3),
('How much do I really need for a down payment?', 'Less than most people think. Conventional goes to 97% financing, FHA to 96.5%, and VA can be zero down. The bigger number to plan for is closing costs — and in many cases those can be structured into the deal.', 'Kevin, West Palm Beach', true, 4);