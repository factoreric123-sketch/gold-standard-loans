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

export type CreditTier = {
  name: string;
  score: string;
  bullets: string[];
};

export type ProgramSection =
  | { kind: "paragraphs"; title?: string; body: string[] }
  | {
      kind: "numbered";
      title: string;
      intro?: string;
      items: Array<{ title: string; body: string }>;
    }
  | {
      kind: "cards";
      title: string;
      intro?: string;
      items: Array<{ title: string; body: string }>;
    }
  | { kind: "list"; title?: string; intro?: string; items: string[] }
  | {
      kind: "definedList";
      title?: string;
      items: Array<{ term: string; def: string }>;
    }
  | { kind: "formula"; title?: string; equation: string; example?: string; note?: string };

export type Program = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tagline: string;
  overview: string;
  highlights: string[];
  idealFor: string[];
  // Optional rich content for programs with deeper guidance.
  creditTiers?: CreditTier[];
  lowScoreOptions?: string[];
  lenderConsiderations?: string[];
  improvementTips?: string[];
  bottomLine?: string[];
  // Free-form rich sections rendered below the standard layout.
  extras?: ProgramSection[];
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
      "30-year fixed rates as low as 6.75%",
      "Up to 97% financing for qualified buyers",
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
    extras: [
      {
        kind: "paragraphs",
        body: [
          "Conventional loans remain one of the most popular and versatile mortgage options for homebuyers seeking flexibility, competitive rates, and long-term financial stability. In a dynamic housing market like Miami-Dade County, conventional home loans offer borrowers a wide range of options — from low-down-payment programs to jumbo financing for higher-priced properties.",
          "As home prices evolve and buyer needs become more diverse, conventional loans stand out for their adaptability. Whether you're a first-time buyer, a move-up buyer, an investor, or someone refinancing an existing mortgage, conventional loans provide customizable solutions that fit different financial goals.",
          "Warren Factor helps buyers in Florida understand how conventional loans work, how to qualify, and how to choose the right structure for both short-term affordability and long-term success.",
        ],
      },
      {
        kind: "paragraphs",
        title: "What is a conventional loan?",
        body: [
          "A conventional loan is a mortgage that is not insured or guaranteed by a government agency such as the VA or FHA. Instead, these loans follow guidelines set by Fannie Mae and Freddie Mac and are offered by private lenders.",
          "Because conventional loans aren't government-backed, they're often associated with:",
        ],
      },
      {
        kind: "list",
        items: [
          "Strong borrower profiles",
          "Competitive interest rates",
          "Flexible loan terms",
          "A wide range of property options",
        ],
      },
      {
        kind: "paragraphs",
        body: [
          "Conventional loans are widely used across Florida and suit both primary residences and investment properties.",
        ],
      },
      {
        kind: "paragraphs",
        title: "Why a conventional loan in Florida?",
        body: [
          "The Dade County housing market spans everything from entry-level homes to luxury properties. Conventional loans provide the flexibility needed to compete and succeed in such a diverse market.",
        ],
      },
      {
        kind: "list",
        title: "Flexible down payment options",
        intro:
          "Contrary to common belief, conventional loans don't always require 20% down. Many programs allow:",
        items: [
          "As little as 3% down for first-time homebuyers",
          "5–10% down for repeat buyers",
          "Higher down payments for better rates and lower costs",
        ],
      },
      {
        kind: "paragraphs",
        body: [
          "This flexibility makes conventional loans accessible to a broader range of buyers.",
        ],
      },
      {
        kind: "paragraphs",
        title: "Competitive interest rates",
        body: [
          "Borrowers with strong credit profiles often secure highly competitive rates with conventional loans. Over time, that can result in significant interest savings compared to other loan programs.",
        ],
      },
      {
        kind: "paragraphs",
        title: "No upfront mortgage insurance",
        body: [
          "Unlike FHA loans, conventional loans don't require upfront mortgage insurance premiums. PMI may be required with lower down payments, but it can often be removed once sufficient equity is reached.",
        ],
      },
      {
        kind: "numbered",
        title: "Types of conventional loan programs",
        intro: "Conventional loans aren't one-size-fits-all. Choose the option that fits the file:",
        items: [
          {
            title: "Conventional purchase loans",
            body: "Buy a primary residence, second home, or investment property. Ideal for buyers seeking flexible terms and competitive pricing.",
          },
          {
            title: "Conventional fixed-rate mortgages",
            body: "Predictable monthly payments with rates that stay the same for the life of the loan. Popular terms include 30-year, 20-year, and 15-year fixed — well-suited for buyers planning long-term homeownership.",
          },
          {
            title: "Conventional adjustable-rate mortgages (ARMs)",
            body: "Start with a lower introductory rate and adjust over time. Often chosen by buyers who plan to move or refinance within a few years.",
          },
          {
            title: "Jumbo conventional loans",
            body: "For properties that exceed conforming loan limits — common in certain areas of Miami-Dade County and beyond.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "Who should consider a conventional loan?",
        intro:
          "Conventional loans suit a wide range of borrowers, especially those with stable income and solid credit:",
        items: [
          {
            title: "First-time homebuyers",
            body: "With low-down-payment options and competitive rates, conventional loans are an excellent choice for first-time buyers who meet credit requirements.",
          },
          {
            title: "Move-up buyers",
            body: "Homeowners upgrading to a larger or more desirable property often use conventional loans to leverage equity and secure favorable terms.",
          },
          {
            title: "Real-estate investors",
            body: "Conventional loans allow financing for rental and investment properties — a preferred choice for investors.",
          },
          {
            title: "Buyers with strong credit",
            body: "Higher credit scores often unlock better rates and lower PMI costs, maximizing the benefits of conventional financing.",
          },
          {
            title: "Homeowners looking to refinance",
            body: "Conventional refinance loans can be used to lower rates, shorten loan terms, or remove PMI once equity requirements are met.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Requirements & eligibility",
        items: [
          {
            term: "Credit score",
            def: "Most lenders look for a minimum credit score of 620, though higher scores typically result in better rates and terms.",
          },
          {
            term: "Debt-to-income ratio (DTI)",
            def: "DTI guidelines are generally stricter than government-backed loans. However, strong credit and assets can help offset higher ratios.",
          },
          {
            term: "Down payment",
            def: "Requirements vary by loan type, property use, and borrower profile. Larger down payments can reduce PMI costs and improve loan terms.",
          },
          {
            term: "Income & employment verification",
            def: "Borrowers must demonstrate stable, verifiable income. Lenders typically review pay stubs, tax returns, and employment history.",
          },
          {
            term: "Property requirements",
            def: "Homes must meet appraisal standards and be structurally sound. Conventional loans can be used for single-family homes, condos, townhomes, and multi-unit properties (within guidelines).",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Benefits of conventional loans",
        items: [
          {
            term: "Lower long-term costs",
            def: "With no upfront mortgage insurance and the ability to remove PMI, conventional loans can become more affordable over time.",
          },
          {
            term: "More property options",
            def: "Unlike some government programs, conventional loans allow financing for a broader range of property types, including investment properties.",
          },
          {
            term: "Strong seller appeal",
            def: "In competitive markets, conventional loan offers are often viewed favorably by sellers due to fewer restrictions.",
          },
          {
            term: "Customizable loan structures",
            def: "Borrowers can choose loan terms, rates, and payment structures that align with their financial plans.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Why choose Warren Factor",
        items: [
          {
            term: "Local market expertise",
            def: "Understanding Miami-Dade County pricing trends, neighborhood dynamics, and lending practices enables accurate guidance and strong offers.",
          },
          {
            term: "Personalized loan solutions",
            def: "Each conventional loan is tailored to the borrower's goals, timeline, and financial profile.",
          },
          {
            term: "Access to competitive rates",
            def: "By working with multiple lenders, borrowers gain access to competitive pricing and flexible programs.",
          },
          {
            term: "Clear, transparent communication",
            def: "Mortgage decisions are complex. Every step — from pre-approval to closing — is explained clearly and professionally.",
          },
          {
            term: "Fast, reliable pre-approvals",
            def: "Quick and accurate pre-approvals help buyers act confidently in a competitive housing market.",
          },
        ],
      },
      {
        kind: "paragraphs",
        title: "Get started with conventional loans",
        body: [
          "Conventional loans offer flexibility, competitive rates, and long-term value for homebuyers and homeowners alike. Whether you're purchasing your first home, upgrading, investing, or refinancing, a conventional loan can be a powerful financing tool.",
          "With expert guidance from Warren Factor, borrowers can navigate the conventional loan process smoothly and make informed decisions that support long-term financial success.",
        ],
      },
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
      "30-year fixed FHA rates as low as 5.875%",
      "Up to 96.5% financing",
      "Down payments as low as 3.5%",
      "Credit scores starting around 580 considered",
      "Gift funds allowed toward the down payment",
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
    extras: [
      {
        kind: "paragraphs",
        body: [
          "VA loans remain one of the most powerful and affordable home-financing options available to eligible veterans, active-duty service members, and surviving spouses. In a competitive Florida market like Miami-Dade County, VA loans deliver unmatched benefits that make homeownership more accessible, flexible, and financially sustainable.",
          "With rising prices and demand for affordable housing, many buyers are searching for programs that reduce upfront costs while offering long-term stability — VA loans do exactly that, allowing qualified borrowers to purchase or refinance with no down payment, no PMI, and competitive rates.",
          "Warren Factor focuses on helping veterans and military families fully understand their VA loan benefits and use them strategically — whether you're buying your first home, relocating, or refinancing.",
        ],
      },
      {
        kind: "paragraphs",
        title: "What are VA loans?",
        body: [
          "A VA loan is a mortgage program backed by the U.S. Department of Veterans Affairs, designed specifically to support military service members and veterans in purchasing or refinancing a home. Unlike conventional or FHA loans, VA loans remove many of the traditional barriers to homeownership.",
          "These loans are not issued directly by the VA. Private lenders originate VA loans while the VA guarantees a portion of the loan — letting lenders offer more favorable terms with lower risk.",
        ],
      },
      {
        kind: "definedList",
        title: "Key features",
        items: [
          {
            term: "No down payment required",
            def: "Eligible buyers can purchase a home without a down payment — minimal upfront costs to get into a home.",
          },
          {
            term: "No private mortgage insurance",
            def: "Unlike many other loan types, VA loans do not require PMI — significant monthly savings.",
          },
          {
            term: "Competitive interest rates",
            def: "VA loans often come with lower rates than conventional loans, reducing the overall cost over time.",
          },
          {
            term: "Flexible credit guidelines",
            def: "More forgiving on credit history, with accessible options for buyers with less-than-perfect credit.",
          },
          {
            term: "Limited closing costs",
            def: "VA closing costs are capped — borrowers pay less at the table than on other loan types.",
          },
          {
            term: "Reusable benefit",
            def: "VA loan benefits are reusable across multiple home purchases throughout your life.",
          },
        ],
      },
      {
        kind: "paragraphs",
        title: "Why VA loans work especially well in Florida",
        body: [
          "Florida's housing market — and Dade County in particular — is diverse, dynamic, and highly competitive. From urban properties to suburban neighborhoods, buyers often face rising prices and tight inventory. VA loans provide a powerful advantage in this environment.",
        ],
      },
      {
        kind: "list",
        title: "No down payment in a high-cost market",
        intro:
          "Saving for a down payment is one of the biggest obstacles to buying in Florida. VA loans eliminate this barrier entirely — qualified buyers can purchase with zero money down. That means:",
        items: [
          "Faster homeownership — get into your home sooner with no down payment required.",
          "Save more — keep your savings for emergencies or investments.",
          "More flexibility — greater purchasing power without the burden of a down payment or PMI.",
        ],
      },
      {
        kind: "paragraphs",
        title: "No PMI = lower monthly payments",
        body: [
          "Most low-down-payment programs require private mortgage insurance, which can add hundreds of dollars to monthly payments. VA loans do not require PMI — keeping payments lower and more predictable over time.",
        ],
      },
      {
        kind: "paragraphs",
        title: "Competitive interest rates",
        body: [
          "Because VA loans are backed by the government, lenders can offer lower rates than many conventional loan options. Over the life of the loan, that can translate into tens of thousands of dollars in savings.",
        ],
      },
      {
        kind: "list",
        title: "Who is eligible",
        intro:
          "VA loan eligibility is based on military service history rather than income alone. Borrowers must meet service requirements and obtain a Certificate of Eligibility (COE). Eligible borrowers include:",
        items: [
          "Veterans who meet service requirements",
          "Active-duty service members",
          "National Guard and Reserve members (with qualifying service)",
          "Eligible surviving spouses",
        ],
      },
      {
        kind: "numbered",
        title: "Types of VA loan programs",
        intro: "VA loans are versatile and can be used for several homeownership goals:",
        items: [
          {
            title: "VA Purchase Loans",
            body: "Buy a primary residence with no down payment and no PMI — ideal for first-time buyers, relocating families, and veterans transitioning to civilian life.",
          },
          {
            title: "VA Cash-Out Refinance",
            body: "Refinance an existing mortgage and tap home equity as cash. Common uses: consolidate debt, fund home improvements, or cover education or medical expenses.",
          },
          {
            title: "VA Interest Rate Reduction Refinance (IRRRL)",
            body: 'Also called a "VA Streamline Refinance" — helps existing VA borrowers lower their rate with minimal documentation and reduced closing costs.',
          },
        ],
      },
      {
        kind: "definedList",
        title: "Requirements & qualifications",
        items: [
          {
            term: "Credit guidelines",
            def: "The VA doesn't set a strict minimum credit score, but lenders look for responsible credit behavior. Stronger profiles often see better rates and smoother approvals.",
          },
          {
            term: "Debt-to-income ratio (DTI)",
            def: "DTI guidelines are more forgiving than conventional loans, allowing many borrowers to qualify even with higher ratios — especially when residual income requirements are met.",
          },
          {
            term: "Income and employment",
            def: "Borrowers must demonstrate stable income and employment to show their ability to repay.",
          },
          {
            term: "Occupancy requirement",
            def: "VA loans are intended for primary residences only — the borrower must live in the home, making this program ideal for owner-occupied properties.",
          },
        ],
      },
      {
        kind: "paragraphs",
        title: "Working with Warren on a VA loan",
        body: [
          "Choosing the right mortgage professional is just as important as choosing the right loan program. Warren Factor brings expertise, transparency, and personalized service to every VA loan client.",
        ],
      },
      {
        kind: "definedList",
        items: [
          {
            term: "Local market knowledge",
            def: "Understanding local pricing trends, property values, and neighborhood dynamics in Miami-Dade County is critical. Local expertise leads to accurate guidance and competitive offers.",
          },
          {
            term: "Personalized VA loan strategy",
            def: "No two borrowers are the same. Every VA loan is structured around the borrower's goals, timeline, and financial situation.",
          },
          {
            term: "Clear communication and education",
            def: "VA loans come with unique benefits and rules. Warren makes sure clients understand every detail — from funding fees to rate options — before making decisions.",
          },
          {
            term: "Efficient pre-approval process",
            def: "In a competitive market like Dade County, speed matters. Fast, accurate pre-approvals help buyers stand out to sellers and real-estate agents.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Common VA loan myths",
        items: [
          {
            term: "Myth: VA loans take longer to close",
            def: "Fact — VA loans close just as quickly as other loan types when handled by an experienced professional.",
          },
          {
            term: "Myth: VA loans are a one-time benefit",
            def: "Fact — VA loan benefits can be reused multiple times.",
          },
          {
            term: "Myth: Sellers avoid VA buyers",
            def: "Fact — in strong offers, VA loans are widely accepted, especially with proper guidance and clean approvals.",
          },
        ],
      },
      {
        kind: "paragraphs",
        title: "Get started with VA loans",
        body: [
          "VA loans are one of the most valuable home-financing tools available to veterans and service members. In a market like Dade County — where affordability and smart financing matter more than ever — VA loans offer a clear advantage.",
          "With expert guidance from Warren Factor, borrowers can confidently navigate the VA loan process, maximize their benefits, and move closer to homeownership with clarity and confidence.",
        ],
      },
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
      "Rates starting at 6.75% for a 5-year ARM",
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
    extras: [
      {
        kind: "paragraphs",
        title: "Know the document that qualifies you",
        body: [
          "A bank statement loan uses 12–24 months of your statements to qualify you — so understanding what's on a statement, and how to read one, is half the battle. Here's a quick primer on the document your lender will spend real time reviewing.",
        ],
      },
      {
        kind: "definedList",
        title: "Account details",
        items: [
          {
            term: "Account holder information",
            def: "Your name and account number, confirming the statement belongs to you.",
          },
          {
            term: "Bank information",
            def: "The name and contact details of your bank, so it's clear where the account is held.",
          },
          {
            term: "Statement period",
            def: "The date range the statement covers — usually a month, but it can vary by bank or account type.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Transactions",
        items: [
          {
            term: "Deposits",
            def: "Money added to your account — salary, transfers from other accounts, or cash deposits.",
          },
          {
            term: "Withdrawals",
            def: "Money taken out — ATM withdrawals, debit-card purchases, online payments, or checks.",
          },
          {
            term: "Fees",
            def: "Charges from the bank — monthly maintenance, ATM fees, or overdraft fees.",
          },
          {
            term: "Interest",
            def: "If your account earns interest (e.g., a savings account), it's shown here.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Account balance",
        items: [
          {
            term: "Starting balance",
            def: "The balance at the beginning of the statement period.",
          },
          {
            term: "Ending balance",
            def: "The balance at the end, after all deposits, withdrawals, and fees are applied.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Why bank statements matter",
        items: [
          {
            term: "Track your spending",
            def: "See where your money is going and spot habits you might want to tighten up.",
          },
          {
            term: "Verify transactions",
            def: "Catch errors and unauthorized activity before they snowball.",
          },
          {
            term: "Monitor fees",
            def: "Service fees, ATM charges, and overdrafts add up — statements make them visible.",
          },
          {
            term: "Financial planning",
            def: "Set a budget and align your savings goals with the cash flow you actually have.",
          },
          {
            term: "Proof of financial health",
            def: "Lenders use them as proof of income, savings, and money management — essential for a bank statement loan.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "How to read a bank statement",
        items: [
          {
            title: "Check the account information",
            body: "Confirm the account holder details and statement period are correct — you're reviewing the right statement for the right account.",
          },
          {
            title: "Review the transactions",
            body: "Go through every deposit and withdrawal. If anything looks off or unauthorized, contact your bank immediately.",
          },
          {
            title: "Examine the balance",
            body: "Compare the starting and ending balances and make sure the transactions reconcile.",
          },
          {
            title: "Look for fees",
            body: "Watch for maintenance fees, ATM fees, or late charges. Anything that looks wrong is worth a clarification call.",
          },
          {
            title: "Check the interest",
            body: "If your account earns interest, confirm the amount credited during the period — it tells you how productively your savings are working.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "How to access your bank statement",
        items: [
          {
            title: "Online banking",
            body: "Most banks let you view, download, and print e-statements securely from your online portal.",
          },
          {
            title: "Mobile banking apps",
            body: "Your bank's app likely lets you view and save statements straight from your phone.",
          },
          {
            title: "Paper statements",
            body: "If you prefer paper, most banks will still mail them — though many now charge a small fee versus free e-statements.",
          },
          {
            title: "ATM receipts",
            body: "Some ATMs print mini-statements with recent activity. Handy for a quick check, but not a substitute for the full monthly statement.",
          },
        ],
      },
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
      "No income verification — investment properties only",
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
    extras: [
      {
        kind: "paragraphs",
        title: "Smart investment loans, qualified on the property",
        body: [
          "A DSCR mortgage (Debt-Service Coverage Ratio) is a specialized loan for investment properties where qualification is based on the property's rental income — not the borrower's personal income. The DSCR is the key metric lenders use to assess the property's cash flow, comparing Net Operating Income (NOI) to the total debt service (PITI plus HOA). That makes DSCR loans an excellent option for investors growing portfolios without the documentation hurdles of conventional loans.",
          "Lenders typically look for a DSCR above 1.0 — ideally around 1.2 or higher — to be confident the property generates enough income to cover the mortgage payment, including any HOA fees.",
        ],
      },
      {
        kind: "paragraphs",
        title: "1. Net Operating Income (NOI)",
        body: [
          "NOI is the income generated by the property minus operating expenses, excluding the mortgage payment.",
        ],
      },
      {
        kind: "definedList",
        items: [
          {
            term: "Rental income",
            def: "Typically estimated by an appraiser based on market rates and the property's location.",
          },
          {
            term: "Operating expenses",
            def: "Property management fees, repairs, utilities, and other costs of managing the property (excluding the mortgage payment).",
          },
        ],
      },
      {
        kind: "paragraphs",
        title: "2. Total debt service",
        body: ["Total debt service is the full monthly cost of owning the property:"],
      },
      {
        kind: "list",
        items: [
          "Principal — the amount borrowed.",
          "Interest — the cost of borrowing.",
          "Taxes — property taxes owed locally.",
          "Insurance — homeowner's or landlord's coverage.",
          "HOA fees — if applicable.",
        ],
      },
      {
        kind: "formula",
        title: "3. Finding the DSCR",
        equation: "DSCR  =  NOI  ÷  Total Debt Service",
        example: "Example: $18,000 NOI ÷ $15,000 debt service  =  1.2",
        note: "A DSCR of 1.0 means the property's income equals the debt service. Above 1.0 signals positive cash flow — the higher the ratio, the more attractive to lenders.",
      },
      {
        kind: "paragraphs",
        title: "Why DSCR works for investors",
        body: [
          "Income-independent qualification. The biggest benefit is qualifying on the property's cash flow, not personal income — ideal for self-employed investors or anyone with inconsistent or non-traditional sources of income.",
          "Investor-focused product. DSCR loans are tailored for real-estate investors — single-family, multi-family, or condo — and can be used for purchase, refinance, or cash-out.",
        ],
      },
      {
        kind: "list",
        title: "Key features",
        items: [
          "No personal income verification — qualification is based on the property's rental income.",
          "Available for refinance and cash-out to access equity in existing properties.",
          "Leverage multiple properties to grow a portfolio.",
          "Fewer documentation requirements than conventional mortgages.",
          "Easier qualification for self-employed investors.",
        ],
      },
      {
        kind: "list",
        title: "Typical requirements",
        intro: "Each lender sets its own criteria, but most DSCR programs share these:",
        items: [
          "Minimum DSCR: usually 0.75–1.0; a higher ratio (1.2+) gets better terms.",
          "Credit score: typically in the 620–660+ range; lower scores may still qualify.",
          "Down payment: usually 15%–25%, depending on the property and lender.",
          "Reserves: typically 6+ months of mortgage payments in reserves.",
        ],
      },
      {
        kind: "definedList",
        title: "Eligible property types",
        items: [
          {
            term: "Single-family homes",
            def: "Standalone homes — popular for their simplicity and stable rental demand.",
          },
          {
            term: "Multi-family properties",
            def: "Duplexes, triplexes, and small apartment buildings — multiple income streams help cover debt service.",
          },
          {
            term: "Condominiums",
            def: "Individual units in larger buildings; HOA fees and occupancy rules matter to the DSCR.",
          },
          {
            term: "Vacation rentals",
            def: "Tourist-heavy areas (e.g., beach houses, cabins, Airbnb) — strong income potential with seasonal variability.",
          },
          {
            term: "Commercial real estate",
            def: "Office, retail, and warehouses — typically longer-term leases and more predictable income streams.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "Advantages for property investors",
        items: [
          {
            title: "Leverage property income",
            body: "Use the rental income from your investment property to qualify for financing — expand your portfolio without leaning on personal income or assets.",
          },
          {
            title: "Scale without personal-income scrutiny",
            body: "Because qualification rests on the property's cash flow, investors can secure multiple DSCR loans without traditional income verification — especially helpful for the self-employed or those with irregular income.",
          },
          {
            title: "Fast, efficient process",
            body: "Less documentation usually means a faster approval than a conventional loan — so you can act quickly when an opportunity appears.",
          },
        ],
      },
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
    extras: [
      {
        kind: "paragraphs",
        body: [
          "Buying a home is a big step, but saving for a down payment is one of the hardest parts for many people. Traditional loans often require 20% down. With 0% down financing it's possible to buy a home without paying anything upfront — especially useful for first-time buyers and anyone without large savings.",
        ],
      },
      {
        kind: "paragraphs",
        title: "What is 0% down financing?",
        body: [
          "0% down financing is a loan that covers the full price of the home, so you don't put any money down at closing. It's typically available through special programs or government-backed options, making homeownership accessible to people who don't have enough savings for a down payment.",
        ],
      },
      {
        kind: "definedList",
        title: "How 0% down financing works",
        items: [
          {
            term: "Full financing",
            def: "The loan covers the entire cost of the home — buy a $250,000 home and the lender finances the full $250,000.",
          },
          {
            term: "Eligibility",
            def: "You still need to meet other requirements like stable income and acceptable credit.",
          },
          {
            term: "Repayment",
            def: "You pay back the full loan amount in monthly payments, and rates can be slightly higher because there's no down payment cushion.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "Types of 0% down financing",
        intro: "Several loan types offer 0% down, each with its own eligibility rules:",
        items: [
          {
            title: "VA loans",
            body: "For military service members, veterans, and their families — backed by the U.S. Department of Veterans Affairs and offering 0% down options.",
          },
          {
            title: "USDA loans",
            body: "Backed by the U.S. Department of Agriculture for buyers in qualifying rural and suburban areas — 0% down if you meet the income guidelines.",
          },
          {
            title: "Conventional 0% down loans",
            body: "Some lenders offer 0% down options for first-time homebuyers. Stricter credit and income requirements apply, but a strong path for those who qualify.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "Benefits",
        items: [
          {
            title: "No down payment",
            body: "The biggest benefit — homeownership without years of saving for a down payment.",
          },
          {
            title: "Faster home purchase",
            body: "No waiting to save means you can act quickly in a competitive housing market.",
          },
          {
            title: "More money for other costs",
            body: "Without a down payment, you keep cash on hand for moving costs, repairs, and other expenses.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "Drawbacks to be aware of",
        items: [
          {
            title: "Higher monthly payments",
            body: "Borrowing the full price means a larger monthly payment and more interest paid over the life of the loan.",
          },
          {
            title: "No starting equity",
            body: "With no money down, you begin with zero equity — if values dip, you could owe more than the home is worth.",
          },
          {
            title: "Possible PMI",
            body: "Some 0% down loans require private mortgage insurance, which adds to the monthly payment.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Who should consider 0% down",
        items: [
          {
            term: "First-time homebuyers",
            def: "Buying your first home without the savings for a down payment — this can be the bridge that makes it possible.",
          },
          {
            term: "Military veterans or active duty",
            def: "VA loans are available to those who've served and offer 0% down payment options.",
          },
          {
            term: "Buyers in rural areas",
            def: "If you're buying in a rural or qualifying suburban area, USDA loans can finance the full purchase with no down payment.",
          },
        ],
      },
      {
        kind: "list",
        title: "Is 0% down right for you?",
        intro: "Three honest questions to ask yourself before going this route:",
        items: [
          "Can you comfortably handle the higher monthly payment?",
          "Do you have stable income and acceptable credit?",
          "Are you prepared for the possibility of paying PMI?",
        ],
      },
      {
        kind: "paragraphs",
        body: [
          "If the answer to all three is yes, 0% down financing could be the right path. The fastest way to know what you qualify for is a quick conversation — Warren will match you to the specific 0% down program that fits your file.",
        ],
      },
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
    extras: [
      {
        kind: "paragraphs",
        body: [
          "Fix and flips are a popular investment strategy where an investor purchases a distressed property, renovates it, and sells it for a profit — earning money by increasing the property's value through improvements. It can be lucrative, but it also carries real risk. Here's a clean breakdown of what fix and flips are, how they work, and what you need to know before getting started.",
        ],
      },
      {
        kind: "paragraphs",
        title: "What are fix and flips?",
        body: [
          "A fix and flip is an investment approach where an investor buys a property that needs repairs or upgrades, renovates it, and then sells it for a higher price. The goal is to purchase at a lower cost, make improvements, and sell for a profit. The process usually involves buying homes in poor condition — often from foreclosures or auctions — and fixing them up to increase their value.",
        ],
      },
      {
        kind: "paragraphs",
        title: "How fix and flips work",
        body: [
          "First, investors find a property priced below market value due to its condition. Once a target is found, they calculate the cost of repairs and renovations to understand how much funding is needed. Securing financing is the next step — most investors will need a loan or some form of capital to buy the property and pay for renovations.",
          "After purchase, renovations begin — from cosmetic fixes like painting and flooring to more complex work like plumbing and electrical. Once finished, the property is put up for sale, aiming for a price that covers the property, the renovations, and any additional expenses — with a profit margin on top.",
        ],
      },
      {
        kind: "paragraphs",
        title: "Why fix and flips are popular",
        body: [
          "Fix and flips offer high profit potential in a relatively short period. With the right property, smart renovations, and the ability to sell quickly, an investor can earn a significant return. The process is appealing because investors have control over the renovations — decisions that directly affect the value. Unlike renting, which involves ongoing management, fix and flips let investors buy, renovate, and sell for a one-time profit.",
        ],
      },
      {
        kind: "paragraphs",
        title: "The benefits",
        body: [
          "One of the biggest benefits is profit potential. Investors who can find undervalued properties and make effective, cost-efficient renovations can often sell for far more than they spent. Fix and flips also let you stay hands-on with your project — control over the outcome. And the real-estate market often provides quick turnaround opportunities, letting investors sell within months instead of years.",
        ],
      },
      {
        kind: "paragraphs",
        title: "The risks",
        body: [
          "Fix and flips can be profitable, but they come with risk. Overspending on renovations is a big one — costs can exceed initial estimates and eat into the profit margin. Unexpected issues like mold or structural damage add to costs. Market conditions matter, too — a downturn can make the property hard to sell. Delays in renovation or the property sitting unsold for an extended period also increase costs.",
        ],
      },
      {
        kind: "paragraphs",
        title: "How to be successful",
        body: [
          "Thorough research and planning matter most. Carefully select properties with strong improvement potential — focus on desirable locations where demand is high and renovations meaningfully increase value. Set a realistic renovation budget and stick to it. Having a trusted team of contractors who can complete the work efficiently and within budget is vital. And know the local real-estate market — that's what helps you price the finished property correctly for resale.",
        ],
      },
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
    extras: [
      {
        kind: "paragraphs",
        title: "What is a bridge loan?",
        body: [
          "A bridge loan is a short-term financing option designed to help individuals and businesses bridge the gap between purchasing a new property and selling an existing one. Typically used in real-estate transactions, these loans let the borrower secure funds to close on a new property before their current one is sold.",
          'Bridge loans are temporary — generally lasting from a few months up to one year depending on the lender\'s terms. They\'re also referred to as "interim loans" or "gap financing" because they provide the cash flow to move forward with a transaction while awaiting longer-term financing or the sale of an existing property.',
        ],
      },
      {
        kind: "numbered",
        title: "How bridge loans work",
        intro:
          "Bridge loans provide short-term funds based on the equity of your current home or the property you intend to purchase — essentially bridging the financial gap between a sale and a new purchase. Here's a general breakdown:",
        items: [
          {
            title: "Loan approval",
            body: "Lenders look for enough equity in your current home and a viable plan for repayment, and may also assess creditworthiness, debt-to-income ratio, and other financial details.",
          },
          {
            title: "Loan amount",
            body: "Typically based on the equity of the home you're selling or the value of the property you're purchasing. Bridge loans can go up to about 80–90% of value.",
          },
          {
            title: "Repayment terms",
            body: "Terms are short — usually 6–12 months — and carry higher rates than traditional mortgages. Many require a lump-sum repayment or balloon payment once the original property sells or long-term financing is secured.",
          },
          {
            title: "Open vs. closed",
            body: "An open bridge loan has no specific repayment date and may be paid off early when the sale occurs. A closed bridge loan has a fixed schedule and is paid off once the current property is sold.",
          },
        ],
      },
      {
        kind: "cards",
        title: "Types of bridge loans",
        intro: "Two main types, depending on your situation:",
        items: [
          {
            title: "Closed bridge loans",
            body: "Fixed repayment schedule — ideal when you have a clear timeline for selling. Common in structured transactions and often with lower interest rates than open bridge loans.",
          },
          {
            title: "Open bridge loans",
            body: "More flexibility, no set repayment schedule. A fit when the timing of your sale is uncertain or you may need more time before repaying.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "Advantages",
        items: [
          {
            title: "Quick access to funds",
            body: "Bridge loans often process faster than traditional loans — useful when you need to act quickly on a new purchase.",
          },
          {
            title: "Flexibility in timing",
            body: "Buy a new home without the pressure of having to sell first.",
          },
          {
            title: "Don't miss the opportunity",
            body: "In competitive markets, a bridge loan makes you a more attractive buyer — your offer isn't contingent on selling your current home.",
          },
          {
            title: "Use your property equity",
            body: "Tap the equity you've already built without relying on more expensive financing.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "Risks to consider",
        items: [
          {
            title: "Higher interest rates",
            body: "Bridge loans typically carry higher rates than traditional mortgages. Even over short periods, the cost can add up.",
          },
          {
            title: "Debt risk if the sale takes longer",
            body: "If your current home doesn't sell as quickly as expected, you may end up carrying both the bridge loan and your existing mortgage.",
          },
          {
            title: "Property-value fluctuations",
            body: "Borrowing is based on equity. If the market shifts and your home sells for less than expected, you could owe more than the home is worth.",
          },
          {
            title: "Short loan term",
            body: "If you can't sell or secure long-term financing in time, you may need to extend or refinance the bridge loan — adding cost.",
          },
        ],
      },
      {
        kind: "list",
        title: "When a bridge loan makes sense",
        intro: "Bridge loans are ideal when:",
        items: [
          "You've found your dream home — a bridge loan secures the purchase without waiting for your current home to sell.",
          "You're in a competitive market — being non-contingent makes you a stronger buyer.",
          "You need flexibility — breathing room to sell at the right price without rushing the process.",
        ],
      },
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
    extras: [
      {
        kind: "paragraphs",
        title: "What are hotel loans?",
        body: [
          "A hotel loan is a type of business loan specifically intended for hotel-related investments. These loans can be used to purchase an existing hotel, build a new one, renovate or expand an existing property, or refinance a current hotel loan. Hotel loans come in various forms, with terms that cater to the unique needs of the hospitality industry.",
          "They're typically provided by traditional banks, commercial lenders, and other financial institutions. Because of the scale of hotel investments, securing this type of financing can be more complex than a standard business loan.",
        ],
      },
      {
        kind: "numbered",
        title: "Types of hotel loans",
        intro:
          "There are several types of loans available to hotel owners and investors, each suited to specific needs:",
        items: [
          {
            title: "Conventional hotel loans",
            body: "Traditional loans from banks or credit unions for hotel purchases, construction, or refinancing. Typically require a strong credit history, stable income from the hotel, and 20–30% down. Terms usually 5–25 years.",
          },
          {
            title: "SBA 7(a) loans",
            body: "Government-backed loans that help small business owners — including hospitality — purchase or renovate a hotel. Typically lower rates and longer repayment terms (up to 25 years). Loan amounts up to $5 million.",
          },
          {
            title: "Hotel bridge loans",
            body: "Short-term financing during a transition — e.g., purchasing a hotel before securing permanent financing or refinancing an existing loan. Higher rates due to the short term. Usually 6–12 months.",
          },
          {
            title: "Hotel construction loans",
            body: "Financing for new construction — labor, materials, and other build costs. Typically disbursed in stages; short-term, often refinanced or converted into a standard mortgage once the hotel is operational.",
          },
          {
            title: "Hotel renovation loans",
            body: "Designed to fund upgrades to an existing hotel — guest rooms, amenities, lobby, or new features like a pool or fitness center. Loan amounts vary by scope; terms typically 5–20 years.",
          },
          {
            title: "CMBS loans (Commercial Mortgage-Backed Securities)",
            body: "Backed by a pool of commercial properties and structured as bonds sold to investors. Typically used by larger hotels or hotel chains for purchase or refinance. Higher loan amounts; terms 5–10 years.",
          },
        ],
      },
      {
        kind: "numbered",
        title: "How to qualify",
        intro:
          "Qualifying for a hotel loan typically requires meeting certain financial and business criteria. Lenders evaluate the following:",
        items: [
          {
            title: "Credit score",
            body: "Lenders typically require a solid credit score (often 650+). A higher score improves approval odds and rates.",
          },
          {
            title: "Debt-to-income ratio",
            body: "Lenders assess your DTI to confirm you can manage repayment. The lower your debt relative to income, the stronger the file.",
          },
          {
            title: "Hotel performance & financials",
            body: "Operating income, profit margins, occupancy rates, and historical revenue. A strong track record is crucial.",
          },
          {
            title: "Down payment",
            body: "Typically 20–30% of the hotel's purchase price.",
          },
          {
            title: "Property appraisal",
            body: "An appraisal determines current market value and confirms the property has enough value to serve as collateral.",
          },
          {
            title: "Business plan",
            body: "Especially for purchases or new construction, lenders may require a solid plan outlining how you'll operate and grow the hotel — demonstrating your ability to manage the property and generate revenue.",
          },
        ],
      },
      {
        kind: "list",
        title: "Benefits of hotel loans",
        items: [
          "Access to capital — funds to purchase, build, or upgrade hotels and grow the business.",
          "Long-term financing options — manageable monthly payments and flexibility.",
          "Tax benefits — interest payments may be tax-deductible, lowering your overall tax burden.",
          "Improved cash flow — financing renovations can drive higher room rates and occupancy.",
        ],
      },
      {
        kind: "list",
        title: "Risks to consider",
        items: [
          "Interest costs — higher rates on short-term loans or less favorable terms can raise the overall cost of financing.",
          "Market conditions — hospitality is sensitive to economic and travel cycles, which affect revenue and repayment.",
          "Property depreciation — hotels can lose value over time without maintenance, affecting refinance or sale.",
        ],
      },
      {
        kind: "paragraphs",
        title: "Beyond hotels: the full commercial loan landscape",
        body: [
          "Hotel financing is one slice of a much broader commercial-loan landscape. Here's the wider picture of products available to investors and business owners.",
        ],
      },
      {
        kind: "definedList",
        title: "Commercial real-estate (CRE) loans",
        items: [
          {
            term: "Owner-occupied CRE",
            def: "The business occupies ≥51% of the property.",
          },
          {
            term: "Investment property loans",
            def: "Office, retail, multifamily, and industrial.",
          },
          {
            term: "Construction loans",
            def: "Ground-up or major rehab.",
          },
          {
            term: "Bridge loans",
            def: "Short-term (6–36 months), fast execution.",
          },
          {
            term: "Permanent / term loans",
            def: "Long-term stabilized financing.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "SBA loans",
        items: [
          {
            term: "SBA 7(a)",
            def: "Working capital, real estate, and business acquisition — government-backed with favorable terms.",
          },
          {
            term: "SBA 504",
            def: "Fixed assets and owner-occupied real estate.",
          },
          {
            term: "SBA Express",
            def: "Faster approval, smaller loan amounts.",
          },
        ],
      },
      {
        kind: "definedList",
        title: "Construction & development loans",
        items: [
          {
            term: "Ground-up construction",
            def: "Build from zero — milestone-based draws as the project advances.",
          },
          {
            term: "Renovation / value-add loans",
            def: "Capital to upgrade an existing asset and lift its income.",
          },
          {
            term: "Mezzanine financing",
            def: "Gap capital that sits between the senior loan and equity.",
          },
        ],
      },
      {
        kind: "list",
        title: "Specialty commercial loans",
        intro: "For unique property types or situations:",
        items: [
          "Hotel & hospitality loans",
          "Self-storage loans",
          "Healthcare / assisted-living loans",
          "Mixed-use property loans",
          "Franchise financing",
        ],
      },
      {
        kind: "list",
        title: "Capital market & institutional loans",
        intro: "Larger transactions and more sophisticated structures:",
        items: [
          "CMBS loans",
          "Life insurance company loans",
          "Agency loans (Fannie Mae / Freddie Mac — multifamily)",
          "Private equity / debt funds",
        ],
      },
      {
        kind: "list",
        title: "Short-term / alternative financing",
        intro: "Speed over cost, flexible underwriting:",
        items: ["Hard money loans", "Private money loans"],
      },
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
      "All types of Visas accepted · ITIN OK",
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
    creditTiers: [
      {
        name: "FHA Loan",
        score: "580+ · 3.5% down  ·  500–579 · 10% down",
        bullets: ["Most forgiving option", "Higher mortgage insurance"],
      },
      {
        name: "Conventional Loan",
        score: "620 minimum",
        bullets: ["Better rates above 660–680", "Much stricter on credit history"],
      },
      {
        name: "VA Loan (if eligible)",
        score: "No official minimum · most lenders want 580–620",
        bullets: ["No down payment", "Veterans and active-duty military"],
      },
      {
        name: "USDA Loan",
        score: "Typically 640+",
        bullets: ["Rural areas only", "No down payment"],
      },
    ],
    lowScoreOptions: [
      "FHA with 10% down",
      "Non-QM loans (bank-statement, DSCR, asset-based)",
      "Hard money or private lenders (higher rates, short term)",
      "Co-borrower or non-occupant co-signer",
    ],
    lenderConsiderations: [
      "Strong income or cash flow",
      "Reserves in the bank",
      "Recent improvement in credit (last 12 months clean)",
      "Larger down payment",
      "No recent bankruptcies or foreclosures (or enough time passed)",
    ],
    improvementTips: [
      "Pay credit cards below 30% utilization (ideally under 10%)",
      "Don't open new accounts",
      "Remove collections under $500 (some FHA lenders ignore them)",
      "Add a rapid rescore (lenders can do this)",
    ],
    bottomLine: [
      "580–620 score → FHA or Non-QM",
      "Below 580 → Private / Non-QM / bigger down payment",
      "Luxury or investment property → Non-QM or private lenders",
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
  { name: "Conventional 30yr Fixed", rate: "6.75%", note: "Up to 97% financing" },
  { name: "FHA 30yr Fixed", rate: "5.875%", note: "Up to 96.5% financing" },
  { name: "Bank Statement 5yr ARM", rate: "6.75%", note: "No tax returns" },
  { name: "Conventional 15yr Fixed", rate: "5.5%" },
];

export type Stat = { value: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 28, label: "Years Licensed" },
  { value: 32, label: "States Served" },
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
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Residential+Mortgage+broker+for+25+years&stick=H4sIAAAAAAAA_-NgU1I1qLCwSLE0TEkzT002MjCyME-xMqgwsrSwNDYyMDM0SjRJSjI1W8SqEZRanJmSmleSmZij4JtfVJKemJ6qkFSUn51apJCWX6RgZKpQmZpYVAwAUu7oSFQAAAA&hl=en#mpd=~4547561587710082376/customers/reviews";

export const ZILLOW_URL = "https://www.zillow.com/lender-profile/Warren%20M%20Factor/#reviews";
export const APPLY_URL =
  "https://www.blink.mortgage/app/signup/p/crecapitalandequitycorp/warrenfactor";

export const RATE_DRIVERS: Array<{ name: string; note: string }> = [
  { name: "Federal Funds Rate", note: "Set by the Fed — drives everything else." },
  { name: "10-Year Treasury Yield", note: "Most important for mortgage rates." },
  { name: "SOFR / Prime Rate", note: "Matters for adjustable, bridge, and commercial loans." },
  { name: "Mortgage-backed securities (MBS)", note: "What lenders really price off." },
];

export const RATE_DAILY: string[] = [
  "Check the 10-Year Treasury yield",
  "Check the average 30-yr mortgage rate",
  "Glance at today's Fed news or economic calendar",
];

export const RATE_WEEKLY: string[] = [
  "Inflation data (CPI, PCE)",
  "Jobs reports (Non-Farm Payrolls)",
  "Fed speeches / meeting summaries",
  "Bond-market movement (not stock-market hype)",
];

export const BROKER_REASONS: Array<{ title: string; body: string }> = [
  {
    title: "Access to a broad network of lenders",
    body: "Brokers maintain relationships with a wide range of wholesale lenders — national banks, credit unions, portfolio lenders, jumbo specialists, and non-QM lenders. Your file is shopped across multiple institutions simultaneously, so you benefit from true market competition.",
  },
  {
    title: "Wholesale pricing advantage",
    body: "Brokers operate in the wholesale lending market, which typically offers lower interest rates than retail banks. Retail lenders often add higher margins to cover branch overhead and marketing. Brokers, by contrast, rely on leaner operations and competition among lenders to secure lower rates and reduced closing costs.",
  },
  {
    title: "More loan programs, better fit",
    body: "No two borrowers are alike. Brokers can place loans across conventional, government-backed, jumbo, ultra-luxury, self-employed, investor, bank-statement, asset-based, and non-QM programs — so you're matched with the right structure, not forced into a one-size-fits-all.",
  },
  {
    title: "Personalized, one-on-one service",
    body: "Unlike large banks where borrowers are handed off between departments, brokers provide direct, hands-on service from application through closing — tailoring the loan to your goal (lowest payment, fastest closing, long-term wealth, etc.).",
  },
  {
    title: "Faster issue resolution",
    body: "If underwriting or appraisal issues arise, brokers can quickly redirect the loan to another lender whose guidelines better match the borrower's profile. Banks typically can't pivot once a file is submitted — leading to delays or denials.",
  },
  {
    title: "Transparent, regulated compensation",
    body: "Broker compensation is federally regulated and fully disclosed. That transparency means homeowners know exactly how the broker is paid, and removes incentives to steer borrowers into unfavorable options — often resulting in lower total borrowing costs.",
  },
  {
    title: "Competitive pressure works for you",
    body: "When multiple lenders compete for your file, they sharpen their offers — rate, terms, and credits. That competitive pressure consistently translates into a better deal at the closing table.",
  },
];

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
    title: "Warren shops your file across lenders",
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
    a: "A bank offers only its own rates. As an independent broker, Warren shops your file across multiple lenders and passes you the most competitive qualifying offer — frequently beating retail bank pricing.",
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

export const FACEBOOK_GROUP_URL = "https://www.facebook.com/TheDiscountMortgageStore/";

export const FACEBOOK_PAGE_URL = "https://www.facebook.com/TheDiscountMortgageStore/";

// Warren's personal Facebook profile.
export const FACEBOOK_PROFILE_URL = "https://www.facebook.com/warrenfactor";

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/warren-myles-factor-66258720/";

export const BOOK = {
  title: "The Life of Tony Factor",
  subtitle: "Overcoming Life's Obstacles",
  author: "Warren Factor",
  blurb:
    "A deeply personal portrait of Tony Factor — the man, the obstacles, and the lessons that shaped a family. Written by his son, 28-year mortgage veteran Warren Factor.",
  amazonUrl:
    "https://www.amazon.com/Life-Tony-Factor-Overcoming-Obstacles/dp/B0DNN979V1",
};
