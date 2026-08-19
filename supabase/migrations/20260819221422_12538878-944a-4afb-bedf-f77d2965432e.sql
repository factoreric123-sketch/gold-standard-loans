ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS citizenship_status text,
  ADD COLUMN IF NOT EXISTS has_itin text;