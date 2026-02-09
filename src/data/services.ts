import { Rocket, Palette, Bot, FileText, GraduationCap, Lightbulb } from "lucide-react";

export type Currency = "XOF" | "EUR" | "USD";

export interface PricingTier {
  name: string;
  prices: Record<Currency, string>;
  features: string[];
  popular?: boolean;
}

export interface Service {
  id: string;
  icon: typeof Rocket;
  title: string;
  description: string;
  price: Record<Currency, string>;
  features: string[];
  pricingTiers?: PricingTier[];
}

export const currencySymbols: Record<Currency, string> = {
  XOF: "FCFA",
  EUR: "\u20AC",
  USD: "$",
};

export const currencyLabels: Record<Currency, string> = {
  XOF: "FCFA (XOF)",
  EUR: "Euro (EUR)",
  USD: "Dollar (USD)",
};

export const services: Service[] = [
  {
    id: "saas-dev",
    icon: Rocket,
    title: "D\u00E9veloppement SaaS",
    description:
      "Cr\u00E9ation de plateformes SaaS compl\u00E8tes, de l'id\u00E9e au d\u00E9ploiement.",
    price: {
      XOF: "1 500 000 FCFA",
      EUR: "2 500\u20AC",
      USD: "$2,700",
    },
    features: [
      "Architecture scalable",
      "Design UI/UX premium",
      "Int\u00E9gration paiements",
      "D\u00E9ploiement & formation",
      "Support 3 mois inclus",
    ],
  },
  {
    id: "webapp-dev",
    icon: Palette,
    title: "Web App Sur Mesure",
    description:
      "Sites web et applications sur mesure, modernes et performants.",
    price: {
      XOF: "600 000 FCFA",
      EUR: "1 000\u20AC",
      USD: "$1,100",
    },
    features: [
      "Design responsive",
      "SEO optimis\u00E9",
      "Animations fluides",
      "CMS int\u00E9gr\u00E9",
      "Livraison 2-4 semaines",
    ],
  },
  {
    id: "ia-solutions",
    icon: Bot,
    title: "Solutions IA",
    description:
      "Int\u00E9grations IA & automatisation pour booster votre productivit\u00E9.",
    price: {
      XOF: "Sur devis",
      EUR: "Sur devis",
      USD: "Sur devis",
    },
    features: [
      "Chatbots intelligents",
      "Automatisation workflows",
      "Analyse de donn\u00E9es",
      "API IA sur mesure",
      "Formation \u00E9quipe",
    ],
  },
  {
    id: "cv-generator",
    icon: FileText,
    title: "G\u00E9n\u00E9rateur CV Pro",
    description:
      "CV IA personnalis\u00E9 en 5 minutes avec templates premium.",
    price: {
      XOF: "3 000 FCFA/CV",
      EUR: "5\u20AC/CV",
      USD: "$5/CV",
    },
    features: [
      "Templates professionnels",
      "Optimisation ATS",
      "Suggestions IA",
      "Export PDF haute qualit\u00E9",
      "Multilingue FR/EN",
    ],
    pricingTiers: [
      {
        name: "Gratuit",
        prices: { XOF: "0 FCFA", EUR: "0\u20AC", USD: "$0" },
        features: ["1 CV basique", "1 template", "Export PDF"],
      },
      {
        name: "Pro",
        prices: { XOF: "3 000 FCFA", EUR: "5\u20AC", USD: "$5" },
        features: [
          "Templates premium",
          "Optimisation ATS",
          "Suggestions IA",
          "Export PDF/DOCX",
        ],
        popular: true,
      },
      {
        name: "Business",
        prices: { XOF: "30 000 FCFA/mois", EUR: "50\u20AC/mois", USD: "$50/mois" },
        features: [
          "CVs illimit\u00E9s",
          "Tous les templates",
          "Support prioritaire",
          "API acc\u00E8s",
        ],
      },
    ],
  },
  {
    id: "formation",
    icon: GraduationCap,
    title: "Formation & Mentorat",
    description:
      "Accompagnement tech personnalis\u00E9 pour juniors et seniors.",
    price: {
      XOF: "25 000 FCFA/h",
      EUR: "40\u20AC/h",
      USD: "$45/h",
    },
    features: [
      "Sessions 1-on-1",
      "Plan personnalis\u00E9",
      "Projets pratiques",
      "Code review",
      "Suivi progression",
    ],
  },
  {
    id: "consulting",
    icon: Lightbulb,
    title: "Consulting Tech",
    description:
      "Audit technique, conseils architecture et strat\u00E9gie digitale.",
    price: {
      XOF: "150 000 FCFA",
      EUR: "250\u20AC",
      USD: "$270",
    },
    features: [
      "Audit code & archi",
      "Recommandations",
      "Roadmap technique",
      "Benchmark concurrence",
      "Rapport d\u00E9taill\u00E9",
    ],
  },
];
