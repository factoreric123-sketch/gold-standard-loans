import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SITE_URL, COMPANY_NAME, BROKER_NAME, PHONE_TEL, EMAIL, REVIEWS } from "@/lib/site-data";
import { ChatWidget } from "@/components/site/ChatWidget";
import { HashScroll } from "@/components/site/HashScroll";


const structuredData = {
  "@context": "https://schema.org",
  "@type": "MortgageBroker",
  name: COMPANY_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  telephone: PHONE_TEL,
  email: EMAIL,
  founder: BROKER_NAME,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7452 Champagne Place",
    addressLocality: "Boca Raton",
    addressRegion: "FL",
    postalCode: "33433",
    addressCountry: "US",
  },
  areaServed: "United States (32 states)",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(REVIEWS.length),
    bestRating: "5",
  },
  review: REVIEWS.map((r) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    author: { "@type": "Person", name: r.name },
    reviewBody: r.quote,
  })),
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Discount Mortgage Store | Florida's Lowest Mortgage Rates" },
      {
        name: "description",
        content:
          "Warren M. Factor — licensed mortgage broker for 28 years across 32 states. Conventional, FHA, VA, DSCR, Bank Statement, Fix & Flip, Bridge and Commercial loans. Call (561) 577-1882.",
      },
      { name: "author", content: "The Discount Mortgage Store" },
      {
        property: "og:title",
        content: "The Discount Mortgage Store | Florida's Lowest Mortgage Rates",
      },
      {
        property: "og:description",
        content:
          "28 years licensed. 32 states. One trusted broker working to get you the lowest qualifying rate.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og.png` },
      {
        name: "twitter:title",
        content: "The Discount Mortgage Store | Florida's Lowest Mortgage Rates",
      },
      {
        name: "twitter:description",
        content:
          "28 years licensed. 32 states. One trusted broker working to get you the lowest qualifying rate.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "canonical", href: SITE_URL },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "addEventListener('load',function(){setTimeout(function(){" +
              "var vh=innerHeight;document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el){" +
              "if(el.getBoundingClientRect().top<vh)el.classList.add('is-visible');});},1500);});",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ChatWidget />
    </QueryClientProvider>
  );
}
