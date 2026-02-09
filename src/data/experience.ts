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
    period: "2024 - Pr\u00E9sent",
    title: "Cr\u00E9ateur de SaaS & Freelance",
    company: "Benewende.dev",
    description:
      "D\u00E9veloppement de produits SaaS et accompagnement clients sur des projets web ambitieux.",
    achievements: [
      "D\u00E9veloppement de 5+ SaaS en production",
      "Accompagnement de 20+ clients",
      "95% de satisfaction client",
    ],
    current: true,
  },
  {
    period: "2022 - 2024",
    title: "D\u00E9veloppeur Full Stack Senior",
    company: "Tech Company",
    description:
      "Lead technique sur des projets d'envergure avec une \u00E9quipe de d\u00E9veloppeurs.",
    achievements: [
      "Architecture de plateformes \u00E0 fort trafic",
      "Lead technique \u00E9quipe de 4 d\u00E9veloppeurs",
      "R\u00E9duction temps de chargement de 60%",
    ],
  },
  {
    period: "2020 - 2022",
    title: "D\u00E9veloppeur Full Stack",
    company: "Digital Agency",
    description:
      "D\u00E9veloppement d'applications web et mobiles pour divers clients B2B.",
    achievements: [
      "Stack React / Node.js",
      "15+ projets livr\u00E9s",
      "D\u00E9veloppement de features cl\u00E9s",
    ],
  },
];
