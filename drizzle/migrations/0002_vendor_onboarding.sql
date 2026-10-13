CREATE TABLE public.vendor_onboarding_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  company text NOT NULL,
  company_type text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  fee_offered text,
  payment_terms text,
  eo_min_coverage text,
  requested_docs text[] NOT NULL DEFAULT '{}',
  references_needed int,
  portal_url text,
  notes text
);
GRANT ALL ON public.vendor_onboarding_requests TO service_role;
GRANT SELECT ON public.vendor_onboarding_requests TO authenticated;
ALTER TABLE public.vendor_onboarding_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read onboarding requests" ON public.vendor_onboarding_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));