CREATE TABLE public.fix_flip_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  property_city TEXT,
  property_state TEXT NOT NULL,
  purchase_price TEXT,
  rehab_budget TEXT,
  arv TEXT,
  loan_purpose TEXT NOT NULL,
  timeline TEXT NOT NULL,
  flip_experience TEXT NOT NULL,
  properties_owned TEXT,
  credit_score TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

GRANT INSERT ON public.fix_flip_applications TO anon, authenticated;
GRANT SELECT ON public.fix_flip_applications TO authenticated;
GRANT ALL ON public.fix_flip_applications TO service_role;

ALTER TABLE public.fix_flip_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a fix and flip application"
  ON public.fix_flip_applications FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins read fix and flip applications"
  ON public.fix_flip_applications FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));