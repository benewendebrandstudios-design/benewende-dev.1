export interface Skill {
  name: string;
  level: number;
  label: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js / Next.js", level: 95, label: "Expert" },
      { name: "TypeScript", level: 95, label: "Expert" },
      { name: "Tailwind CSS", level: 95, label: "Expert" },
      { name: "Framer Motion", level: 85, label: "Avanc\u00E9" },
      { name: "Vue.js", level: 75, label: "Interm\u00E9diaire" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js / Express", level: 95, label: "Expert" },
      { name: "PostgreSQL", level: 90, label: "Expert" },
      { name: "Prisma ORM", level: 95, label: "Expert" },
      { name: "MongoDB", level: 80, label: "Avanc\u00E9" },
      { name: "REST & GraphQL APIs", level: 90, label: "Expert" },
    ],
  },
  {
    category: "SaaS & Architecture",
    skills: [
      { name: "Next.js App Router", level: 95, label: "Expert" },
      { name: "Stripe Integration", level: 90, label: "Expert" },
      { name: "NextAuth.js", level: 90, label: "Expert" },
      { name: "Vercel / Deploiement", level: 95, label: "Expert" },
      { name: "Architecture Microservices", level: 80, label: "Avanc\u00E9" },
    ],
  },
  {
    category: "IA & Automation",
    skills: [
      { name: "OpenAI / OpenRouter API", level: 90, label: "Expert" },
      { name: "LangChain", level: 75, label: "Avanc\u00E9" },
      { name: "Prompt Engineering", level: 90, label: "Expert" },
      { name: "Automatisation Workflows", level: 85, label: "Avanc\u00E9" },
    ],
  },
  {
    category: "DevOps & Outils",
    skills: [
      { name: "Git / GitHub", level: 95, label: "Expert" },
      { name: "Docker", level: 80, label: "Avanc\u00E9" },
      { name: "CI/CD Pipelines", level: 80, label: "Avanc\u00E9" },
      { name: "AWS / GCP", level: 65, label: "Interm\u00E9diaire" },
    ],
  },
];
