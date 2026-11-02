ALTER TABLE public.vendor_onboarding_requests
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS admin_notes text;
ALTER TABLE public.vendor_onboarding_requests
  ADD CONSTRAINT vendor_onboarding_status_check CHECK (status IN ('pending','approved','signed_up','declined'));
GRANT SELECT, UPDATE ON public.vendor_onboarding_requests TO authenticated;
GRANT ALL ON public.vendor_onboarding_requests TO service_role;
CREATE POLICY "Admins update onboarding requests" ON public.vendor_onboarding_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));