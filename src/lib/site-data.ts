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
  name: string;
  description: string;
  icon: LucideIcon;
};

export const PROGRAMS: Program[] = [
  {
    name: "Conventional",
    description: "Fannie & Freddie loans with the lowest market rates.",
    icon: Home,
  },
  { name: "FHA", description: "Low down payment, flexible credit requirements.", icon: Shield },
  { name: "VA", description: "Zero down loans for veterans and active military.", icon: Flag },
  {
    name: "Bank Statement",
    description: "Qualify on deposits — perfect for self-employed.",
    icon: FileText,
  },
  {
    name: "DSCR",
    description: "Investor loans qualified on rental income only.",
    icon: TrendingUp,
  },
  { name: "Investment Loans", description: "Single-family to large portfolios.", icon: Building2 },
  { name: "0% Down", description: "True no-money-down purchase programs.", icon: Wallet },
  { name: "Fix & Flip", description: "Fast-close rehab financing for investors.", icon: Hammer },
  { name: "Bridge Loans", description: "Short-term capital between transactions.", icon: Link2 },
  {
    name: "Hotel & Commercial",
    description: "Hospitality and commercial real estate.",
    icon: Hotel,
  },
  {
    name: "Foreign National",
    description: "U.S. property financing for non-residents.",
    icon: Globe,
  },
  { name: "Asset-Based", description: "Qualify on assets, not income documentation.", icon: Coins },
  {
    name: "Low Credit Score",
    description: "Solutions for credit scores below 620.",
    icon: AlertCircle,
  },
  { name: "HELOC", description: "Tap home equity with flexible credit lines.", icon: Banknote },
];

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
export const BROKER_NAME = "Warren M. Factor";
export const SINCE_YEAR = 1996;
export const APPLY_URL = "https://blink.mortgage";
export const ZILLOW_URL = "https://www.zillow.com/lender-profile/WarrenFactor/";
