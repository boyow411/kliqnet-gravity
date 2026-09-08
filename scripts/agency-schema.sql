ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS submission_key uuid;
CREATE UNIQUE INDEX IF NOT EXISTS contact_submission_key_unique ON contact_submissions(submission_key);
CREATE TABLE IF NOT EXISTS public_request_limits (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS portfolio_media (
  id uuid PRIMARY KEY,
  body text NOT NULL,
  mime_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS site_event_counts (
  day date NOT NULL DEFAULT current_date,
  event text NOT NULL,
  path text NOT NULL,
  count integer NOT NULL DEFAULT 1,
  PRIMARY KEY(day,event,path)
);
