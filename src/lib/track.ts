import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

type Detail = Record<string, string | number | boolean>;

async function log(page: string, event: string, detail: Detail = {}) {
  try {
    await supabase.from("tool_events").insert({
      page,
      event,
      referrer: typeof document !== "undefined" ? document.referrer.slice(0, 300) : "",
      detail,
    });
  } catch {
    // Tracking must never break the page.
  }
}

/** Logs a page_view once on mount; returns a tracker for interactions. */
export function useToolTracking(page: string) {
  const logged = useRef(false);
  useEffect(() => {
    if (logged.current) return;
    logged.current = true;
    void log(page, "page_view");
  }, [page]);
  return (event: string, detail: Detail = {}) => void log(page, event, detail);
}
