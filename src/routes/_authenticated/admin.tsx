import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatPostDate, slugify } from "@/lib/blog-format";
import { COMPANY_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: `Blog Admin | ${COMPANY_NAME}` },
      { name: "description", content: "Publish and manage daily blog posts." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Blog Admin | ${COMPANY_NAME}` },
      { property: "og:description", content: "Publish and manage daily blog posts." },
    ],
  }),
  component: AdminPage,
});

function todayLocalDate() {
  const now = new Date();
  const off = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - off).toISOString().slice(0, 10);
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [html, setHtml] = useState("");
  const [date, setDate] = useState(todayLocalDate());
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (active) setIsAdmin(Boolean(data));
    })();
    return () => {
      active = false;
    };
  }, []);

  const postsQuery = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, summary, content_html, published, published_at")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setHtml("");
    setDate(todayLocalDate());
    setPublished(true);
  }

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const finalSlug = (slug.trim() ? slugify(slug) : slugify(title)) || `post-${Date.now()}`;
    const payload = {
      title: title.trim(),
      slug: finalSlug,
      summary: summary.trim() || null,
      content_html: html,
      published,
      published_at: new Date(`${date}T12:00:00`).toISOString(),
    };

    const { error } = editingId
      ? await supabase.from("blog_posts").update(payload).eq("id", editingId)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editingId ? "Post updated" : "Post published");
    resetForm();
    postsQuery.refetch();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Post deleted");
    if (editingId === id) resetForm();
    postsQuery.refetch();
  }

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <header className="border-b border-line bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="font-serif text-2xl">Blog Admin</h1>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
            <Link to="/live-chat" className="text-foreground/60 hover:text-gold">
              Live Chat
            </Link>
            <Link to="/blog" className="text-foreground/60 hover:text-gold">
              View blog
            </Link>
            <button onClick={handleSignOut} className="text-foreground/60 hover:text-gold">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {isAdmin === false && (
          <div className="mb-8 border border-gold bg-background p-5 text-sm">
            This account doesn't have admin access yet. Ask for admin access to be granted, then
            reload.
          </div>
        )}

        <form onSubmit={onSubmit} className="border border-line bg-background p-6 md:p-8">
          <h2 className="font-serif text-xl">{editingId ? "Edit post" : "New post"}</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Title">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="URL slug (optional)">
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={slugify(title) || "auto-generated-from-title"}
                className={inputCls}
              />
            </Field>
            <Field label="Summary (optional)">
              <input
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="HTML content">
              <textarea
                required
                rows={14}
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<h2>Today's rates</h2><p>...</p>"
                className={`${inputCls} font-mono text-xs`}
              />
            </Field>
          </div>

          <label className="mt-5 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Published (visible on the site)
          </label>

          {html.trim() && (
            <div className="mt-6 border border-line p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">Preview</p>
              <div
                className="blog-content mt-4"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold-foreground disabled:opacity-60"
            >
              {saving ? "Saving…" : editingId ? "Save changes" : "Publish post"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-line px-6 py-3 text-xs uppercase tracking-[0.2em]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="mt-12">
          <h2 className="font-serif text-xl">All posts</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {(postsQuery.data ?? []).map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                    {formatPostDate(p.published_at)} {p.published ? "" : "· Draft"}
                  </p>
                  <p className="mt-1 font-serif text-lg">{p.title}</p>
                </div>
                <div className="flex gap-4 text-xs uppercase tracking-[0.2em]">
                  <button
                    onClick={() => {
                      setEditingId(p.id);
                      setTitle(p.title);
                      setSlug(p.slug);
                      setSummary(p.summary ?? "");
                      setHtml(p.content_html);
                      setPublished(p.published);
                      setDate(new Date(p.published_at).toISOString().slice(0, 10));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-foreground/60 hover:text-gold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-foreground/60 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {postsQuery.data?.length === 0 && (
              <li className="py-6 text-sm text-foreground/60">No posts yet.</li>
            )}
          </ul>
        </section>
      </main>
      <Toaster />
    </div>
  );
}

const inputCls =
  "mt-2 w-full border border-line bg-background px-4 py-3 text-sm outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/60">{label}</span>
      {children}
    </label>
  );
}
