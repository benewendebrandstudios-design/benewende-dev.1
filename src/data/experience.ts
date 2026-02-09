export interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    period: "2024 - Présent",
    title: "Créateur de SaaS & Freelance",
    company: "Benewende.dev",
    description:
      "Développement de produits SaaS et accompagnement clients sur des projets web ambitieux.",
    achievements: [
      "Développement de 5+ SaaS en production",
      "Accompagnement de 20+ clients",
      "95% de satisfaction client",
    ],
    current: true,
  },
  {
    period: "2022 - 2024",
    title: "Développeur Full Stack Senior",
    company: "Tech Company",
    description:
      "Lead technique sur des projets d'envergure avec une équipe de développeurs.",
    achievements: [
      "Architecture de plateformes à fort trafic",
      "Lead technique équipe de 4 développeurs",
      "Réduction temps de chargement de 60%",
    ],
  },
  {
    period: "2020 - 2022",
    title: "Développeur Full Stack",
    company: "Digital Agency",
    description:
      "Développement d'applications web et mobiles pour divers clients B2B.",
    achievements: [
      "Stack React / Node.js",
      "15+ projets livrés",
      "Développement de features clés",
    ],
  },
];
