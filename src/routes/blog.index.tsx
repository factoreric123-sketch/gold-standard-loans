import { createFileRoute, Link } from "@tanstack/react-router";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { listPublishedPosts } from "@/lib/blog.functions";
import { COMPANY_NAME, SITE_URL } from "@/lib/site-data";
import { formatPostDate } from "@/lib/blog-format";

export const Route = createFileRoute("/blog/")({
  loader: () => listPublishedPosts(),
  head: () => ({
    meta: [
      { title: `Daily Mortgage Rate Blog | ${COMPANY_NAME}` },
      {
        name: "description",
        content:
          "Daily mortgage rate updates, loan program news and market notes from Warren Factor at The Discount Mortgage Store.",
      },
      { property: "og:title", content: `Daily Mortgage Rate Blog | ${COMPANY_NAME}` },
      {
        property: "og:description",
        content: "Daily mortgage rate updates and market notes from Warren Factor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts, error } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        <section className="border-b border-line bg-cream">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold">Daily Updates</p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl">The Daily Blog</h1>
            <p className="mt-4 max-w-2xl text-foreground/70">
              Rate updates, program changes and market notes — posted daily by Warren Factor.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-14">
          {error && <p className="text-sm text-foreground/60">{error}</p>}
          {!error && posts.length === 0 && (
            <p className="text-sm text-foreground/60">No posts yet — check back soon.</p>
          )}
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.id} className="py-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start">
                  {post.cover_image_url && (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="block w-full shrink-0 md:w-40"
                    >
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        width={480}
                        height={480}
                        className="aspect-square w-full object-cover border border-line"
                        loading="lazy"
                      />
                    </Link>
                  )}
                  <div className="min-w-0">
                    <time
                      dateTime={post.published_at}
                      className="text-[11px] uppercase tracking-[0.25em] text-gold"
                    >
                      {formatPostDate(post.published_at)}
                    </time>
                    <h2 className="mt-3 font-serif text-2xl md:text-3xl">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="hover:text-gold transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.summary && <p className="mt-2 text-foreground/70">{post.summary}</p>}
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gold"
                    >
                      Read post
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
