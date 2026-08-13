import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RateTicker } from "@/components/site/RateTicker";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCTA } from "@/components/site/MobileCTA";
import { getPublishedPost } from "@/lib/blog.functions";
import { COMPANY_NAME } from "@/lib/site-data";
import { formatPostDate } from "@/lib/blog-format";
import { BlogCTA } from "@/components/site/BlogCTA";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { post } = await getPublishedPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const desc = post.summary ?? `Mortgage update from ${COMPANY_NAME}.`;
    return {
      meta: [
        { title: `${post.title} | ${COMPANY_NAME}` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RateTicker />
      <SiteNav />
      <main>
        <article className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <Link to="/blog" className="text-[11px] uppercase tracking-[0.25em] text-gold">
            ← All posts
          </Link>
          <time
            dateTime={post.published_at}
            className="mt-8 block text-[11px] uppercase tracking-[0.25em] text-foreground/50"
          >
            {formatPostDate(post.published_at)}
          </time>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">{post.title}</h1>
          {post.summary && <p className="mt-4 text-lg text-foreground/70">{post.summary}</p>}
          <div
            className="blog-content mt-10 border-t border-line pt-10"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
