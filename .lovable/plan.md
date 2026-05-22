# The Discount Mortgage Store — Build Plan

A modern, editorial-luxury mortgage broker site for Warren Factor. White + gold (#BA873E) only, sharp edges, Cormorant Garamond headings, DM Sans body.

## Pages & Routes

Single-page marketing site with smooth-scroll anchors between sections (Programs, Why Warren, About, Contact all live on `/`). Each is a real section on the homepage — no extra route files needed since the user wants in-page scroll nav.

- `src/routes/index.tsx` — home (all sections)
- `src/routes/__root.tsx` — keep shell, update meta (title, description, og)

## Design System (`src/styles.css`)

- Tokens: `--background` white, `--foreground` charcoal (#1a1a1a), `--gold` #BA873E, `--gold-foreground` white, `--cream` #faf7f2, `--off-white` #f5f3ee, `--charcoal` #1a1a1a, `--border` rgba gold 20%
- `--radius: 0` (zero rounded corners everywhere)
- Fonts via Google Fonts link in root head: Cormorant Garamond (400/500/600 + italic) for `font-serif`, DM Sans (400/500/700) for `font-sans` (default body)
- No gradients, no shadows. Flat 1px gold dividers.

## Components (`src/components/`)

- `RateTicker.tsx` — sticky top bar, charcoal bg, gold text, marquee animation (CSS keyframe translateX loop) with the rate string
- `SiteNav.tsx` — sticky below ticker; logo left, center anchor links (Programs, Why Warren, About, Contact), gold "Call Now" button right (tel: link)
- `Hero.tsx` — two-column. Left: eyebrow chip, H1 with italic gold "Proven", subhead, two CTAs (Apply → blink.mortgage external, phone outlined). Right: white card with rates table + 3 trust stats below
- `Programs.tsx` — section label + H2, responsive grid (1/2/3/4 cols) of 14 cards with lucide icons, separated by 1px gold lines (use border tricks, not card borders), hover bg `color-mix(in oklab, var(--gold) 6%, transparent)`
- `WhyWarren.tsx` — charcoal bg, white H2, left: 4 stat blocks (gold numerals, serif), broker-vs-bank paragraph; right: review card with 5 gold stars, italic serif pull quote, Zillow link
- `About.tsx` — off-white bg, two-col: left portrait placeholder (tall, gold/charcoal block — generate via imagegen), right name/title/bio + credential strip with left gold border
- `Contact.tsx` — cream bg, two-col: left big serif phone, email, address, NMLS; right form (react-hook-form + zod) with 14 loan-type options + "Not Sure", gold submit. On submit: toast success (no backend, since Cloud disabled).
- `SiteFooter.tsx` — charcoal, 3 cols + tagline + full NMLS disclosure + Equal Housing Lender badge (simple inline SVG/text)

## Data

`src/lib/programs.ts` — array of 14 programs (name, description, lucide icon name).
`src/lib/rates.ts` — current rates for ticker + hero card (single source).

## Form Behavior

Client-only. Zod schema validates name/phone/email/loan type/message. On submit, show sonner toast "Thanks — Warren will reach out shortly" and reset. No data persistence (Lovable Cloud disabled).

## SEO / Head

Update root `head()`: title "Florida's Lowest Mortgage Rates | The Discount Mortgage Store", description, og tags. Single H1 in Hero.

## Image

One generated portrait for About section (tall 3:4, editorial b&w-leaning with gold tone) saved to `src/assets/warren-portrait.jpg`.

## Out of Scope

- No backend / form submission to email (Cloud disabled). Form is UI-only with toast confirmation. Can be wired up later if user enables Cloud or provides an endpoint.
- No live rate API — rates are static constants the user can edit.

## Technical Notes

- Marquee: pure CSS `@keyframes` translating a duplicated text track for seamless loop.
- Smooth scroll: `html { scroll-behavior: smooth }` + nav links use `#programs`, `#why`, `#about`, `#contact` with matching `id` on sections.
- Mobile: ticker stays, nav collapses to hamburger (Sheet from shadcn), hero stacks, programs grid → 1 col, contact stacks.
- All colors via tokens — no hex in components except the generated portrait prompt.
