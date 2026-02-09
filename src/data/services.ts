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
  EUR: "€",
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
    title: "Développement SaaS",
    description:
      "Création de plateformes SaaS complètes, de l'idée au déploiement.",
    price: {
      XOF: "1 500 000 FCFA",
      EUR: "2 500€",
      USD: "$2,700",
    },
    features: [
      "Architecture scalable",
      "Design UI/UX premium",
      "Intégration paiements",
      "Déploiement & formation",
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
      EUR: "1 000€",
      USD: "$1,100",
    },
    features: [
      "Design responsive",
      "SEO optimisé",
      "Animations fluides",
      "CMS intégré",
      "Livraison 2-4 semaines",
    ],
  },
  {
    id: "ia-solutions",
    icon: Bot,
    title: "Solutions IA",
    description:
      "Intégrations IA & automatisation pour booster votre productivité.",
    price: {
      XOF: "Sur devis",
      EUR: "Sur devis",
      USD: "Sur devis",
    },
    features: [
      "Chatbots intelligents",
      "Automatisation workflows",
      "Analyse de données",
      "API IA sur mesure",
      "Formation équipe",
    ],
  },
  {
    id: "cv-generator",
    icon: FileText,
    title: "Générateur CV Pro",
    description:
      "CV IA personnalisé en 5 minutes avec templates premium.",
    price: {
      XOF: "3 000 FCFA/CV",
      EUR: "5€/CV",
      USD: "$5/CV",
    },
    features: [
      "Templates professionnels",
      "Optimisation ATS",
      "Suggestions IA",
      "Export PDF haute qualité",
      "Multilingue FR/EN",
    ],
    pricingTiers: [
      {
        name: "Gratuit",
        prices: { XOF: "0 FCFA", EUR: "0€", USD: "$0" },
        features: ["1 CV basique", "1 template", "Export PDF"],
      },
      {
        name: "Pro",
        prices: { XOF: "3 000 FCFA", EUR: "5€", USD: "$5" },
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
        prices: { XOF: "30 000 FCFA/mois", EUR: "50€/mois", USD: "$50/mois" },
        features: [
          "CVs illimités",
          "Tous les templates",
          "Support prioritaire",
          "API accès",
        ],
      },
    ],
  },
  {
    id: "formation",
    icon: GraduationCap,
    title: "Formation & Mentorat",
    description:
      "Accompagnement tech personnalisé pour juniors et seniors.",
    price: {
      XOF: "25 000 FCFA/h",
      EUR: "40€/h",
      USD: "$45/h",
    },
    features: [
      "Sessions 1-on-1",
      "Plan personnalisé",
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
      "Audit technique, conseils architecture et stratégie digitale.",
    price: {
      XOF: "150 000 FCFA",
      EUR: "250€",
      USD: "$270",
    },
    features: [
      "Audit code & archi",
      "Recommandations",
      "Roadmap technique",
      "Benchmark concurrence",
      "Rapport détaillé",
    ],
  },
];
