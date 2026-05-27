import {
  Home,
  Shield,
  Flag,
  FileText,
  Building2,
  TrendingUp,
  Wallet,
  Hammer,
  Link2,
  Hotel,
  Globe,
  Coins,
  AlertCircle,
  Banknote,
  type LucideIcon,
} from "lucide-react";

export type Program = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tagline: string;
  overview: string;
  highlights: string[];
  idealFor: string[];
};

export const PROGRAMS: Program[] = [
  {
    slug: "conventional",
    name: "Conventional",
    description: "Fannie & Freddie loans with the lowest market rates.",
    icon: Home,
    tagline: "Fannie Mae & Freddie Mac financing at the lowest market rates.",
    overview:
      "Conventional loans are the most common path to homeownership for buyers with solid credit and steady income. Built on Fannie Mae and Freddie Mac guidelines, they offer competitive fixed and adjustable rates, flexible terms, and the ability to drop mortgage insurance once you reach 20% equity.",
    highlights: [
      "Down payments as low as 3% for qualified buyers",
      "Fixed and adjustable terms from 10 to 30 years",
      "Mortgage insurance cancels at 20% equity",
      "Primary homes, second homes, and rentals",
      "Higher loan limits than government programs in many areas",
    ],
    idealFor: [
      "Buyers with credit scores of 620+",
      "Borrowers with documented income and reserves",
      "Anyone wanting to avoid long-term mortgage insurance",
    ],
  },
  {
    slug: "fha",
    name: "FHA",
    description: "Low down payment, flexible credit requirements.",
    icon: Shield,
    tagline: "Low down payment and flexible credit — backed by the FHA.",
    overview:
      "FHA loans are government-insured mortgages designed to make homeownership accessible. With lower credit and down-payment requirements than conventional financing, they're a popular choice for first-time buyers and anyone rebuilding their credit.",
    highlights: [
      "Down payments as low as 3.5%",
      "Credit scores starting around 580 considered",
      "Gift funds allowed toward the down payment",
      "Competitive rates across credit tiers",
      "Streamlined refinance options down the road",
    ],
    idealFor: [
      "First-time homebuyers",
      "Buyers with limited savings",
      "Borrowers with lower or rebuilding credit",
    ],
  },
  {
    slug: "va",
    name: "VA",
    description: "Zero down loans for veterans and active military.",
    icon: Flag,
    tagline: "Zero-down home loans for veterans and active-duty military.",
    overview:
      "VA loans reward those who served with one of the most powerful financing benefits available — often no down payment and no monthly mortgage insurance. Guaranteed in part by the Department of Veterans Affairs, they make buying a home dramatically more affordable.",
    highlights: [
      "0% down payment for eligible borrowers",
      "No monthly private mortgage insurance, ever",
      "Competitive, often below-market rates",
      "Limited closing costs",
      "A reusable benefit for future purchases",
    ],
    idealFor: [
      "Veterans and active-duty service members",
      "Qualifying National Guard and Reserve members",
      "Eligible surviving spouses",
    ],
  },
  {
    slug: "bank-statement",
    name: "Bank Statement",
    description: "Qualify on deposits — perfect for self-employed.",
    icon: FileText,
    tagline: "Qualify on your deposits — built for the self-employed.",
    overview:
      "Bank statement loans let self-employed borrowers and business owners qualify using 12–24 months of deposits instead of tax returns. They're the answer when write-offs make your tax income look smaller than the cash flow your business actually generates.",
    highlights: [
      "Qualify with 12–24 months of bank statements",
      "No tax returns or W-2s required",
      "Personal or business accounts accepted",
      "Primary, second home, or investment property",
      "Higher loan amounts available",
    ],
    idealFor: [
      "Self-employed professionals and 1099 earners",
      "Business owners with significant write-offs",
      "Commission- and gig-based income earners",
    ],
  },
  {
    slug: "dscr",
    name: "DSCR",
    description: "Investor loans qualified on rental income only.",
    icon: TrendingUp,
    tagline: "Investor loans qualified on rental income, not your paycheck.",
    overview:
      "Debt-Service Coverage Ratio (DSCR) loans qualify based on a property's rental income rather than your personal income. Approval hinges on whether the rent covers the mortgage payment — making them a favorite for investors scaling a portfolio.",
    highlights: [
      "Qualify on property cash flow, not personal income",
      "No tax returns or employment verification",
      "Close in an LLC to protect personal assets",
      "Finance an unlimited number of properties",
      "Fast closings for competitive deals",
    ],
    idealFor: [
      "Real-estate investors growing a portfolio",
      "Buyers of long-term and short-term rentals",
      "Self-employed investors with complex taxes",
    ],
  },
  {
    slug: "investment-loans",
    name: "Investment Loans",
    description: "Single-family to large portfolios.",
    icon: Building2,
    tagline: "From a single rental to a large portfolio.",
    overview:
      "Investment property loans finance income-producing real estate of nearly every size — single-family rentals, multi-unit buildings, and entire portfolios. Flexible programs let you choose the qualification method that fits your strategy.",
    highlights: [
      "Single-family to multi-unit and portfolio loans",
      "Multiple qualification paths (DSCR, full doc, bank statement)",
      "Purchase, refinance, and cash-out options",
      "Vesting in LLCs and other entities",
      "Blanket loans across multiple properties",
    ],
    idealFor: [
      "New and experienced investors",
      "Buy-and-hold landlords",
      "Investors consolidating or expanding portfolios",
    ],
  },
  {
    slug: "zero-down",
    name: "0% Down",
    description: "True no-money-down purchase programs.",
    icon: Wallet,
    tagline: "True no-money-down purchase programs.",
    overview:
      "Several programs make it possible to buy with little to nothing out of pocket — from VA and USDA eligibility to down-payment assistance and specialty zero-down structures. We'll match you with the no-down path you actually qualify for.",
    highlights: [
      "No-down options for eligible buyers",
      "Down-payment assistance programs",
      "Pair with seller credits to cut closing costs",
      "Gift funds permitted on many programs",
      "Keep your savings intact",
    ],
    idealFor: [
      "Buyers with strong income but limited savings",
      "Eligible veterans and rural buyers",
      "First-time buyers using assistance programs",
    ],
  },
  {
    slug: "fix-and-flip",
    name: "Fix & Flip",
    description: "Fast-close rehab financing for investors.",
    icon: Hammer,
    tagline: "Fast-close rehab financing for investors.",
    overview:
      "Fix-and-flip loans provide short-term capital to purchase and renovate a property, then sell or refinance for a profit. With funding for both the purchase and the rehab budget, you can move quickly when the right opportunity appears.",
    highlights: [
      "Financing for purchase plus renovation costs",
      "Fast closings — often days, not weeks",
      "Interest-only payments during the project",
      "Underwritten to after-repair value (ARV)",
      "No prepayment penalties on most programs",
    ],
    idealFor: [
      "House flippers and rehabbers",
      "Investors buying distressed properties",
      "BRRRR-strategy investors",
    ],
  },
  {
    slug: "bridge-loans",
    name: "Bridge Loans",
    description: "Short-term capital between transactions.",
    icon: Link2,
    tagline: "Short-term capital between transactions.",
    overview:
      "Bridge loans give you the flexibility to act now and settle later — tapping the equity in a property you already own to fund your next purchase before the first one sells. A practical solution for timing gaps.",
    highlights: [
      "Buy before you sell",
      "Tap existing equity quickly",
      "Short terms with flexible exits",
      "Interest-only payment options",
      "Fast underwriting and funding",
    ],
    idealFor: [
      "Move-up buyers between homes",
      "Investors who need speed on a deal",
      "Owners awaiting a sale or refinance",
    ],
  },
  {
    slug: "hotel-commercial",
    name: "Hotel & Commercial",
    description: "Hospitality and commercial real estate.",
    icon: Hotel,
    tagline: "Hospitality and commercial real-estate financing.",
    overview:
      "Commercial loans fund income-producing and owner-occupied properties — hotels, retail, office, industrial, and mixed-use. Terms are structured around the asset's performance and your business plan, with both conventional and SBA options available.",
    highlights: [
      "Hotels, retail, office, industrial, and mixed-use",
      "Acquisition, refinance, and cash-out",
      "Owner-occupied and investment",
      "Flexible terms and amortization",
      "SBA and conventional commercial options",
    ],
    idealFor: [
      "Commercial property investors",
      "Hospitality and business owners",
      "Borrowers refinancing maturing commercial debt",
    ],
  },
  {
    slug: "foreign-national",
    name: "Foreign National",
    description: "U.S. property financing for non-residents.",
    icon: Globe,
    tagline: "U.S. property financing for non-residents.",
    overview:
      "Foreign national loans help non-U.S. citizens and non-residents purchase property in the United States — without a Social Security number or U.S. credit history. Qualify using international documentation and assets.",
    highlights: [
      "No U.S. credit history or SSN required",
      "Qualify with international bank references",
      "Primary, vacation, and investment properties",
      "Close in an LLC",
      "Competitive fixed and adjustable terms",
    ],
    idealFor: [
      "Non-resident international buyers",
      "Foreign investors in U.S. real estate",
      "Buyers of U.S. vacation homes",
    ],
  },
  {
    slug: "asset-based",
    name: "Asset-Based",
    description: "Qualify on assets, not income documentation.",
    icon: Coins,
    tagline: "Qualify on your assets, not income documentation.",
    overview:
      "Asset-based (asset-depletion) loans let you qualify using your liquid assets — savings, investments, and retirement accounts — converted into qualifying income. They're ideal for high-net-worth borrowers and retirees with strong reserves but limited documented income.",
    highlights: [
      "Qualify using liquid assets instead of income",
      "No employment verification required",
      "Great for retirees and high-net-worth borrowers",
      "Use savings, brokerage, and retirement funds",
      "Primary, second, and investment homes",
    ],
    idealFor: [
      "Retirees with substantial savings",
      "High-net-worth, low-documented-income borrowers",
      "Self-employed borrowers with strong reserves",
    ],
  },
  {
    slug: "low-credit-score",
    name: "Low Credit Score",
    description: "Solutions for credit scores below 620.",
    icon: AlertCircle,
    tagline: "Real solutions for credit scores below 620.",
    overview:
      "A lower credit score doesn't have to end your home-financing plans. Through FHA, non-QM, and specialty programs we find paths to approval for borrowers the big banks turn away — plus a clear roadmap to better terms over time.",
    highlights: [
      "Programs for scores below 620",
      "Recent credit events considered",
      "Government and non-QM options",
      "A plan to refinance to better terms later",
      "Personal guidance through underwriting",
    ],
    idealFor: [
      "Borrowers with bruised or rebuilding credit",
      "Buyers after a recent financial setback",
      "Anyone declined by a traditional bank",
    ],
  },
  {
    slug: "heloc",
    name: "HELOC",
    description: "Tap home equity with flexible credit lines.",
    icon: Banknote,
    tagline: "Tap your home equity with a flexible credit line.",
    overview:
      "A Home Equity Line of Credit lets you borrow against your home's equity as needed — for renovations, debt consolidation, or investment — paying interest only on what you draw. It's flexible access to the value you've already built.",
    highlights: [
      "Draw funds as you need them",
      "Interest only on the amount you use",
      "Renovations, consolidation, or investing",
      "Keep your existing low first-mortgage rate",
      "Primary and investment properties",
    ],
    idealFor: [
      "Homeowners with built-up equity",
      "Borrowers funding renovations or big expenses",
      "Investors leveraging equity for new deals",
    ],
  },
];

export const programBySlug = (slug: string): Program | undefined =>
  PROGRAMS.find((p) => p.slug === slug);

export const RATES = [
  { name: "30yr Fixed", rate: "5.25%" },
  { name: "15yr Fixed", rate: "4.875%" },
  { name: "5/1 ARM", rate: "5.25%" },
  { name: "FHA", rate: "5.50%" },
];

export type Stat = { value: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 28, label: "Years Licensed" },
  { value: 32, label: "States Served" },
  { value: 100, suffix: "+", label: "Lender Network" },
  { value: 5, suffix: "★", label: "Zillow Rated" },
];

export const PHONE_DISPLAY = "(561) 577-1882";
export const PHONE_TEL = "+15615771882";
export const EMAIL = "WARRENFACTOR@GMAIL.COM";
export const EMAIL_DISPLAY = "warrenfactor@gmail.com";
export const ADDRESS = "7452 Champagne Place, Boca Raton, FL 33433";
export const NMLS = "NMLS #351633";
export const COMPANY_NMLS = "CRE Capital & Equity Corp NMLS #2091271";
export const COMPANY_NAME = "The Discount Mortgage Store";
export const SITE_URL = "https://thediscountmortgagestore.com";
export const BROKER_NAME = "Warren M. Factor";
export const SINCE_YEAR = 1996;
export const ZILLOW_URL = "https://www.zillow.com/lender-profile/Warren%20M%20Factor/#reviews";

export type Review = {
  name: string;
  location: string;
  date: string;
  title: string;
  quote: string;
  loanType: string;
  rating: number;
};

// Verbatim reviews from Warren's verified Zillow lender profile.
export const REVIEWS: Review[] = [
  {
    name: "Debra Kovacs",
    location: "Hollywood, FL",
    date: "Jan 2024",
    title: "The best of the best!",
    quote:
      "Warren goes above and beyond to make the mortgage process as seamless as possible. Even in difficult situations, his steady guidance and patience is second to none. Look no further than Warren for the best service at the best rate.",
    loanType: "Refinance",
    rating: 5,
  },
  {
    name: "sandeepkumarus",
    location: "Pembroke Pines, FL",
    date: "Jun 2020",
    title: "Work for the people",
    quote:
      "I have known Warren for multiple years and it's always a pleasure to work with him. He goes out of the way to get you the loan that is right for you. I recommend him for all your loan needs.",
    loanType: "Purchase",
    rating: 5,
  },
  {
    name: "dkaskel",
    location: "Boca Raton, FL",
    date: "Nov 2016",
    title: "Warren Factor is Great!",
    quote:
      "I've had the pleasure of working with Warren on my own financings and on behalf of clients and family. Warren is a gem — he cares about every aspect of the closing and devotes attention to detail.",
    loanType: "Refinance",
    rating: 5,
  },
];

export type Step = { title: string; body: string };

export const STEPS: Step[] = [
  {
    title: "Tell us about your goal",
    body: "Share a few details by phone or through the form — purchase or refinance, the property, and a rough timeline. No paperwork marathon to get started.",
  },
  {
    title: "Warren shops 100+ lenders",
    body: "Instead of one bank's rate sheet, Warren compares your file across his lender network and brings you the lowest qualifying offer.",
  },
  {
    title: "Close with confidence",
    body: "Warren runs your file personally from first call to closing, keeping you informed and on schedule at every step.",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "How much do I need for a down payment?",
    a: "It depends on the program. Conventional loans can go as low as 3% down, FHA 3.5%, and VA or certain specialty programs allow 0% down for eligible buyers. Warren will match you to the lowest down payment you qualify for.",
  },
  {
    q: "What credit score do I need?",
    a: "Many programs start around 620, FHA can go to roughly 580, and there are specialty options for scores below 620. A lower score doesn't automatically disqualify you — there's often a path.",
  },
  {
    q: "How long does it take to close?",
    a: "Most purchase loans close in about 21–30 days, and many refinances are faster. Your timeline depends on the property, the program, and how quickly documents come together.",
  },
  {
    q: "Why use a broker instead of a bank?",
    a: "A bank offers only its own rates. As an independent broker, Warren shops 100+ lenders on every file and passes you the most competitive qualifying offer — frequently beating retail bank pricing.",
  },
  {
    q: "Are you licensed in my state?",
    a: "Warren is a licensed mortgage broker serving 32 states. Call or send a request and he'll confirm availability for your location.",
  },
  {
    q: "Does requesting a rate affect my credit?",
    a: "No. Reaching out for a quote or to ask questions does not impact your credit. A credit check only happens later, with your permission, once you decide to move forward.",
  },
];
