CREATE TABLE public.tool_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  page text NOT NULL,
  event text NOT NULL,
  referrer text NOT NULL DEFAULT '',
  detail jsonb NOT NULL DEFAULT '{}'::jsonb
);

GRANT INSERT ON public.tool_events TO anon, authenticated;
GRANT SELECT ON public.tool_events TO authenticated;
GRANT ALL ON public.tool_events TO service_role;

ALTER TABLE public.tool_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a tool event"
  ON public.tool_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read tool events"
  ON public.tool_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));