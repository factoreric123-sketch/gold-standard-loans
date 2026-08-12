import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, summary, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(200);
  if (error) return { posts: [], error: "Unable to load posts right now." };
  return { posts: data ?? [], error: null as string | null };
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug).slice(0, 200) }))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: post } = await supabase
      .from("blog_posts")
      .select("id, title, slug, summary, content_html, published_at")
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    return { post: post ?? null };
  });
