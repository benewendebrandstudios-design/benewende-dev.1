import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          name: "CRM SaaS Platform",
          description: "Plateforme CRM compl\u00e8te pour PME avec gestion contacts, pipeline ventes et analytics.",
          image: "/projects/crm-saas.png",
          technologies: JSON.stringify(["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind"]),
          status: "live", category: "saas",
          liveUrl: "https://example.com", githubUrl: "https://github.com/benewende",
          statsUsers: "500+", statsPerf: "99.9%", statsRoi: "3x", sortOrder: 0,
        },
        {
          name: "AI Content Generator",
          description: "Outil de g\u00e9n\u00e9ration de contenu marketing propuls\u00e9 par IA multi-mod\u00e8les.",
          image: "/projects/ai-content.png",
          technologies: JSON.stringify(["React", "Node.js", "OpenAI", "MongoDB", "Redis"]),
          status: "live", category: "ia",
          liveUrl: "https://example.com", githubUrl: "https://github.com/benewende",
          statsUsers: "1.2K", statsPerf: "98%", statsRoi: "5x", sortOrder: 1,
        },
        {
          name: "E-Commerce Platform",
          description: "Marketplace multi-vendeurs avec paiements mobile money et livraison int\u00e9gr\u00e9e.",
          image: "/projects/ecommerce.png",
          technologies: JSON.stringify(["Next.js", "Prisma", "Stripe", "AWS S3", "Tailwind"]),
          status: "live", category: "webapp",
          liveUrl: "https://example.com",
          statsUsers: "2K+", statsPerf: "97%", statsRoi: "4x", sortOrder: 2,
        },
        {
          name: "Analytics Dashboard SaaS",
          description: "Dashboard analytics temps r\u00e9el avec visualisation avanc\u00e9e et rapports automatis\u00e9s.",
          image: "/projects/analytics.png",
          technologies: JSON.stringify(["Next.js", "D3.js", "PostgreSQL", "WebSocket", "Docker"]),
          status: "in-progress", category: "saas",
          progress: 75, launchDate: "Q2 2026",
          githubUrl: "https://github.com/benewende", sortOrder: 3,
        },
        {
          name: "FinTech Mobile App",
          description: "Application mobile de gestion financi\u00e8re avec IA pr\u00e9dictive pour le march\u00e9 africain.",
          image: "/projects/fintech.png",
          technologies: JSON.stringify(["React Native", "Node.js", "PostgreSQL", "TensorFlow"]),
          status: "in-progress", category: "mobile",
          progress: 45, launchDate: "Q3 2026", sortOrder: 4,
        },
        {
          name: "CV Generator IA",
          description: "G\u00e9n\u00e9rateur de CV professionnel assist\u00e9 par IA avec templates premium et export PDF.",
          image: "/projects/cv-gen.png",
          technologies: JSON.stringify(["Next.js", "OpenRouter", "PDF-lib", "Framer Motion"]),
          status: "in-progress", category: "ia",
          progress: 90, launchDate: "Q1 2026",
          githubUrl: "https://github.com/benewende", sortOrder: 5,
        },
        {
          name: "Chatbot Builder",
          description: "Plateforme no-code pour cr\u00e9er des chatbots IA connect\u00e9s \u00e0 vos donn\u00e9es.",
          image: "/projects/chatbot.png",
          technologies: JSON.stringify(["Next.js", "LangChain", "Pinecone", "OpenAI"]),
          status: "prototype", category: "ia",
          githubUrl: "https://github.com/benewende", sortOrder: 6,
        },
        {
          name: "DevOps Monitor",
          description: "Outil de monitoring infrastructure avec alertes intelligentes et auto-scaling.",
          image: "/projects/devops.png",
          technologies: JSON.stringify(["Go", "Docker", "Prometheus", "Grafana", "WebSocket"]),
          status: "prototype", category: "prototype",
          githubUrl: "https://github.com/benewende", sortOrder: 7,
        },
      ],
    });
    console.log("  \u2713 Projects seeded");
  }

  // Seed Services
  const serviceCount = await prisma.serviceItem.count();
  if (serviceCount === 0) {
    await prisma.serviceItem.createMany({
      data: [
        {
          icon: "Rocket", title: "D\u00e9veloppement SaaS",
          description: "Cr\u00e9ation de plateformes SaaS compl\u00e8tes, de l'id\u00e9e au d\u00e9ploiement.",
          priceXOF: "1 500 000 FCFA", priceEUR: "2 500\u20ac", priceUSD: "$2,700",
          features: JSON.stringify(["Architecture scalable", "Design UI/UX premium", "Int\u00e9gration paiements", "D\u00e9ploiement & formation", "Support 3 mois inclus"]),
          sortOrder: 0,
        },
        {
          icon: "Palette", title: "Web App Sur Mesure",
          description: "Sites web et applications sur mesure, modernes et performants.",
          priceXOF: "600 000 FCFA", priceEUR: "1 000\u20ac", priceUSD: "$1,100",
          features: JSON.stringify(["Design responsive", "SEO optimis\u00e9", "Animations fluides", "CMS int\u00e9gr\u00e9", "Livraison 2-4 semaines"]),
          sortOrder: 1,
        },
        {
          icon: "Bot", title: "Solutions IA",
          description: "Int\u00e9grations IA & automatisation pour booster votre productivit\u00e9.",
          priceXOF: "Sur devis", priceEUR: "Sur devis", priceUSD: "Sur devis",
          features: JSON.stringify(["Chatbots intelligents", "Automatisation workflows", "Analyse de donn\u00e9es", "API IA sur mesure", "Formation \u00e9quipe"]),
          sortOrder: 2,
        },
        {
          icon: "FileText", title: "G\u00e9n\u00e9rateur CV Pro",
          description: "CV IA personnalis\u00e9 en 5 minutes avec templates premium.",
          priceXOF: "3 000 FCFA/CV", priceEUR: "5\u20ac/CV", priceUSD: "$5/CV",
          features: JSON.stringify(["Templates professionnels", "Optimisation ATS", "Suggestions IA", "Export PDF haute qualit\u00e9", "Multilingue FR/EN"]),
          sortOrder: 3,
        },
        {
          icon: "GraduationCap", title: "Formation & Mentorat",
          description: "Accompagnement tech personnalis\u00e9 pour juniors et seniors.",
          priceXOF: "25 000 FCFA/h", priceEUR: "40\u20ac/h", priceUSD: "$45/h",
          features: JSON.stringify(["Sessions 1-on-1", "Plan personnalis\u00e9", "Projets pratiques", "Code review", "Suivi progression"]),
          sortOrder: 4,
        },
        {
          icon: "Lightbulb", title: "Consulting Tech",
          description: "Audit technique, conseils architecture et strat\u00e9gie digitale.",
          priceXOF: "150 000 FCFA", priceEUR: "250\u20ac", priceUSD: "$270",
          features: JSON.stringify(["Audit code & archi", "Recommandations", "Roadmap technique", "Benchmark concurrence", "Rapport d\u00e9taill\u00e9"]),
          sortOrder: 5,
        },
      ],
    });
    console.log("  \u2713 Services seeded");
  }

  // Seed Skills
  const skillCount = await prisma.skillGroup.count();
  if (skillCount === 0) {
    await prisma.skillGroup.createMany({
      data: [
        { category: "Frontend", skills: JSON.stringify([{name:"React.js / Next.js",level:95,label:"Expert"},{name:"TypeScript",level:95,label:"Expert"},{name:"Tailwind CSS",level:95,label:"Expert"},{name:"Framer Motion",level:85,label:"Avanc\u00e9"},{name:"Vue.js",level:75,label:"Interm\u00e9diaire"}]), sortOrder: 0 },
        { category: "Backend", skills: JSON.stringify([{name:"Node.js / Express",level:95,label:"Expert"},{name:"PostgreSQL",level:90,label:"Expert"},{name:"Prisma ORM",level:95,label:"Expert"},{name:"MongoDB",level:80,label:"Avanc\u00e9"},{name:"REST & GraphQL APIs",level:90,label:"Expert"}]), sortOrder: 1 },
        { category: "SaaS & Architecture", skills: JSON.stringify([{name:"Next.js App Router",level:95,label:"Expert"},{name:"Stripe Integration",level:90,label:"Expert"},{name:"NextAuth.js",level:90,label:"Expert"},{name:"Vercel / Deploiement",level:95,label:"Expert"},{name:"Architecture Microservices",level:80,label:"Avanc\u00e9"}]), sortOrder: 2 },
        { category: "IA & Automation", skills: JSON.stringify([{name:"OpenAI / OpenRouter API",level:90,label:"Expert"},{name:"LangChain",level:75,label:"Avanc\u00e9"},{name:"Prompt Engineering",level:90,label:"Expert"},{name:"Automatisation Workflows",level:85,label:"Avanc\u00e9"}]), sortOrder: 3 },
        { category: "DevOps & Outils", skills: JSON.stringify([{name:"Git / GitHub",level:95,label:"Expert"},{name:"Docker",level:80,label:"Avanc\u00e9"},{name:"CI/CD Pipelines",level:80,label:"Avanc\u00e9"},{name:"AWS / GCP",level:65,label:"Interm\u00e9diaire"}]), sortOrder: 4 },
      ],
    });
    console.log("  \u2713 Skills seeded");
  }

  // Seed Testimonials
  const testimonialCount = await prisma.testimonialItem.count();
  if (testimonialCount === 0) {
    await prisma.testimonialItem.createMany({
      data: [
        { name: "Amadou Diallo", role: "CEO", company: "TechStart Ouaga", content: "Excellent travail sur notre plateforme SaaS. Livraison dans les temps, code propre et communication parfaite. Je recommande vivement Benewende pour tout projet web ambitieux.", rating: 5, sortOrder: 0 },
        { name: "Fatou Traor\u00e9", role: "Directrice Marketing", company: "DigiAgence BF", content: "Le site e-commerce livr\u00e9 a d\u00e9pass\u00e9 nos attentes. Les performances sont au rendez-vous et l'exp\u00e9rience utilisateur est fluide. Un vrai professionnel.", rating: 5, sortOrder: 1 },
        { name: "Ibrahim Sanogo", role: "CTO", company: "FinPlus Africa", content: "Benewende a transform\u00e9 notre vision en un produit fonctionnel en un temps record. Son expertise en IA et architecture cloud est impressionnante.", rating: 5, sortOrder: 2 },
        { name: "Marie Compaor\u00e9", role: "Fondatrice", company: "EduTech Sahel", content: "Gr\u00e2ce \u00e0 Benewende, notre plateforme \u00e9ducative est utilis\u00e9e par des milliers d'\u00e9tudiants. Qualit\u00e9, r\u00e9activit\u00e9 et passion pour le code.", rating: 5, sortOrder: 3 },
        { name: "Ousmane Kabor\u00e9", role: "Product Manager", company: "AgriSmart BF", content: "Un d\u00e9veloppeur qui comprend les enjeux business. Le dashboard analytics qu'il a cr\u00e9\u00e9 nous a permis d'augmenter notre productivit\u00e9 de 40%.", rating: 5, sortOrder: 4 },
      ],
    });
    console.log("  \u2713 Testimonials seeded");
  }

  // Seed Experiences
  const expCount = await prisma.experienceItem.count();
  if (expCount === 0) {
    await prisma.experienceItem.createMany({
      data: [
        { period: "2024 - Pr\u00e9sent", title: "Cr\u00e9ateur de SaaS & Freelance", company: "Benewende.dev", description: "D\u00e9veloppement de produits SaaS et accompagnement clients sur des projets web ambitieux.", achievements: JSON.stringify(["D\u00e9veloppement de 5+ SaaS en production", "Accompagnement de 20+ clients", "95% de satisfaction client"]), current: true, sortOrder: 0 },
        { period: "2022 - 2024", title: "D\u00e9veloppeur Full Stack Senior", company: "Tech Company", description: "Lead technique sur des projets d'envergure avec une \u00e9quipe de d\u00e9veloppeurs.", achievements: JSON.stringify(["Architecture de plateformes \u00e0 fort trafic", "Lead technique \u00e9quipe de 4 d\u00e9veloppeurs", "R\u00e9duction temps de chargement de 60%"]), sortOrder: 1 },
        { period: "2020 - 2022", title: "D\u00e9veloppeur Full Stack", company: "Digital Agency", description: "D\u00e9veloppement d'applications web et mobiles pour divers clients B2B.", achievements: JSON.stringify(["Stack React / Node.js", "15+ projets livr\u00e9s", "D\u00e9veloppement de features cl\u00e9s"]), sortOrder: 2 },
      ],
    });
    console.log("  \u2713 Experiences seeded");
  }

  // Seed Site Settings
  const settingCount = await prisma.siteSetting.count();
  if (settingCount === 0) {
    await prisma.siteSetting.createMany({
      data: [
        { id: "hero", value: JSON.stringify({ title: "Je cr\u00e9e", typingTexts: ["des SaaS qui r\u00e9solvent de vrais probl\u00e8mes", "des applications web performantes", "des solutions IA innovantes", "des exp\u00e9riences digitales premium"], subtitle: "D\u00e9veloppeur Full Stack & Cr\u00e9ateur de SaaS bas\u00e9 \u00e0 Ouagadougou. Je transforme vos id\u00e9es en produits digitaux performants.", available: true, availableText: "Disponible pour nouveaux projets", stats: [{value: "12+", label: "Projets livr\u00e9s"}, {value: "50K+", label: "Lignes de code"}, {value: "95%", label: "Satisfaction"}] }) },
        { id: "site", value: JSON.stringify({ name: "Benewende.dev", email: "contact@benewende.dev", phone: "+226 70 00 00 00", location: "Ouagadougou, Burkina Faso", github: "https://github.com/benewende", linkedin: "https://linkedin.com/in/benewende", twitter: "https://twitter.com/benewende" }) },
        { id: "footer", value: JSON.stringify({ copyright: "\u00a9 2026 Benewende.dev. Tous droits r\u00e9serv\u00e9s.", tagline: "D\u00e9veloppeur Full Stack & Cr\u00e9ateur de SaaS" }) },
      ],
    });
    console.log("  \u2713 Site settings seeded");
  }

  console.log("\n\u2705 Content seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
