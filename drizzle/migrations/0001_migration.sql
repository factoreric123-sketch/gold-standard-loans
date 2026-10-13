CREATE TABLE public.notary_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text NOT NULL,
  signing_date date NOT NULL,
  signing_time text NOT NULL,
  package_type text NOT NULL,
  location text NOT NULL,
  signers int,
  notes text
);
ALTER TABLE public.notary_bookings ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.notary_bookings TO service_role;
CREATE POLICY "Admins read notary bookings" ON public.notary_bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
GRANT SELECT ON public.notary_bookings TO authenticated;