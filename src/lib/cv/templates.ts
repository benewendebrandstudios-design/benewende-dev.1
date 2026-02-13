export interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
    summary: string;
  };
  experiences: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  education: {
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
}

export type TemplateTier = "free" | "pro" | "premium";

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  tier: TemplateTier;
  layout: "single" | "sidebar-left" | "sidebar-right" | "two-column" | "header-bold";
  accentColor: string;
  previewColors: [string, string];
}

export const cvTemplates: CVTemplate[] = [
  // ── Free ──
  {
    id: "classic",
    name: "Classic",
    description: "Traditionnel, sobre et universel",
    tier: "free",
    layout: "single",
    accentColor: "#1e293b",
    previewColors: ["#334155", "#64748b"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Épuré avec accents bleus",
    tier: "free",
    layout: "single",
    accentColor: "#2563eb",
    previewColors: ["#2563eb", "#06b6d4"],
  },
  // ── Pro ──
  {
    id: "executive",
    name: "Executive",
    description: "Sidebar sombre, allure corporate",
    tier: "pro",
    layout: "sidebar-left",
    accentColor: "#0f172a",
    previewColors: ["#0f172a", "#1e293b"],
  },
  {
    id: "creative",
    name: "Créatif",
    description: "Audacieux pour profils créatifs",
    tier: "pro",
    layout: "header-bold",
    accentColor: "#7c3aed",
    previewColors: ["#7c3aed", "#ec4899"],
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense et optimisé ATS",
    tier: "pro",
    layout: "two-column",
    accentColor: "#059669",
    previewColors: ["#059669", "#10b981"],
  },
  // ── Premium ──
  {
    id: "elegant",
    name: "Élégant",
    description: "Sophistiqué, accents dorés, serif",
    tier: "premium",
    layout: "single",
    accentColor: "#92400e",
    previewColors: ["#92400e", "#d97706"],
  },
  {
    id: "tech",
    name: "Tech",
    description: "Dev-focused, barres de skills, dark header",
    tier: "premium",
    layout: "sidebar-right",
    accentColor: "#0ea5e9",
    previewColors: ["#0c4a6e", "#0ea5e9"],
  },
  {
    id: "impact",
    name: "Impact",
    description: "Header plein, typographie bold, maximal",
    tier: "premium",
    layout: "header-bold",
    accentColor: "#dc2626",
    previewColors: ["#18181b", "#dc2626"],
  },
];

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
};

export interface ChatStep {
  id: string;
  message: string;
  field: string | null;
  placeholder?: string;
  type?: "text" | "confirm" | "optional";
  tip?: string;
  skipTo?: string;
  loopTo?: string;
}

export const chatSteps: ChatStep[] = [
  { id: "welcome", message: "👋 Bonjour ! Je suis votre assistant CV intelligent. Je vais vous guider étape par étape pour créer un CV professionnel et percutant.\n\nRépondez à chaque question et voyez votre CV se construire en temps réel à droite. C'est parti !", field: null },

  // ── Informations personnelles ──
  { id: "fullName", message: "Quel est votre nom complet ?", field: "personalInfo.fullName", placeholder: "Ex: Amadou Diallo", tip: "Utilisez votre prénom et nom tels qu'ils apparaîtront sur le CV." },
  { id: "title", message: "Quel est votre titre ou poste professionnel ?", field: "personalInfo.title", placeholder: "Ex: Développeur Full Stack · Chef de Projet Digital", tip: "Soyez précis et utilisez des termes reconnus dans votre secteur." },
  { id: "email", message: "Votre adresse email professionnelle ?", field: "personalInfo.email", placeholder: "Ex: amadou.diallo@email.com" },
  { id: "phone", message: "Votre numéro de téléphone ?", field: "personalInfo.phone", placeholder: "Ex: +226 70 00 00 00" },
  { id: "location", message: "Où êtes-vous basé(e) ?", field: "personalInfo.location", placeholder: "Ex: Ouagadougou, Burkina Faso" },
  { id: "linkedin", message: "Votre profil LinkedIn ? (tapez « passer » pour ignorer)", field: "personalInfo.linkedin", placeholder: "Ex: linkedin.com/in/amadou-diallo", type: "optional" },
  { id: "github", message: "Votre profil GitHub ? (tapez « passer » pour ignorer)", field: "personalInfo.github", placeholder: "Ex: github.com/amadou-diallo", type: "optional" },
  { id: "website", message: "Votre site web ? (tapez « passer » pour ignorer)", field: "personalInfo.website", placeholder: "Ex: amadou-diallo.dev", type: "optional" },
  { id: "summary", message: "Rédigez un résumé professionnel percutant (3-5 lignes). C'est la première chose que les recruteurs lisent !", field: "personalInfo.summary", placeholder: "Décrivez votre profil, vos compétences clés et vos objectifs...", tip: "Mentionnez vos années d'expérience, spécialités et ce que vous apportez. Cliquez sur « Suggestion IA » pour générer un résumé automatiquement." },

  // ── Expériences professionnelles ──
  { id: "experience_title", message: "📋 Passons à vos expériences ! Quel était votre titre/poste ?", field: "experience.title", placeholder: "Ex: Développeur Full Stack Senior" },
  { id: "experience_company", message: "Dans quelle entreprise ?", field: "experience.company", placeholder: "Ex: Tech Solutions SARL" },
  { id: "experience_location", message: "Lieu de travail ? (tapez « passer » pour ignorer)", field: "experience.location", placeholder: "Ex: Ouagadougou, BF", type: "optional" },
  { id: "experience_period", message: "Période ? (format : début - fin)", field: "experience.period", placeholder: "Ex: Janv. 2023 - Présent", tip: "Utilisez « Présent » si c'est votre poste actuel." },
  { id: "experience_achievements", message: "Quelles sont vos réalisations et responsabilités clés ? (séparées par des virgules)", field: "experience.achievements", placeholder: "Ex: Développement d'APIs REST, Migration cloud AWS, +40% performance", tip: "Quantifiez vos résultats : +40% performance, 15 projets livrés, 10k utilisateurs..." },
  { id: "experience_more", message: "Souhaitez-vous ajouter une autre expérience ? (oui/non)", field: null, type: "confirm", loopTo: "experience_title", skipTo: "education_degree" },

  // ── Formation ──
  { id: "education_degree", message: "🎓 Passons à votre formation ! Quel est votre diplôme ?", field: "education.degree", placeholder: "Ex: Master Informatique · Licence Génie Logiciel" },
  { id: "education_school", message: "Dans quel établissement ?", field: "education.school", placeholder: "Ex: Université Joseph Ki-Zerbo" },
  { id: "education_location", message: "Lieu ? (tapez « passer » pour ignorer)", field: "education.location", placeholder: "Ex: Ouagadougou, BF", type: "optional" },
  { id: "education_period", message: "Années de formation ?", field: "education.period", placeholder: "Ex: 2019 - 2022" },
  { id: "education_more", message: "Ajouter une autre formation ? (oui/non)", field: null, type: "confirm", loopTo: "education_degree", skipTo: "skills_category" },

  // ── Compétences (par catégorie) ──
  { id: "skills_category", message: "💡 Passons aux compétences ! Quel est le nom de cette catégorie ?", field: "skills.category", placeholder: "Ex: Frontend · Backend · DevOps · Soft Skills", tip: "Organisez vos compétences par catégories pour un CV plus lisible." },
  { id: "skills_items", message: "Listez les compétences de cette catégorie (séparées par des virgules)", field: "skills.items", placeholder: "Ex: React, Next.js, TypeScript, Tailwind CSS" },
  { id: "skills_more", message: "Ajouter une autre catégorie de compétences ? (oui/non)", field: null, type: "confirm", loopTo: "skills_category", skipTo: "languages" },

  // ── Langues ──
  { id: "languages", message: "🌍 Quelles langues parlez-vous ? (format : Langue - Niveau, séparées par des virgules)", field: "languages", placeholder: "Ex: Français - Natif, Anglais - Courant, Mooré - Natif", tip: "Niveaux : Natif, Bilingue, Courant, Avancé, Intermédiaire, Débutant" },

  // ── Certifications ──
  { id: "certifications_ask", message: "🏅 Avez-vous des certifications professionnelles ? (oui/non)", field: null, type: "confirm", skipTo: "complete" },
  { id: "certification_name", message: "Nom de la certification ?", field: "certification.name", placeholder: "Ex: AWS Certified Solutions Architect" },
  { id: "certification_issuer", message: "Organisme délivrant ?", field: "certification.issuer", placeholder: "Ex: Amazon Web Services" },
  { id: "certification_date", message: "Date d'obtention ?", field: "certification.date", placeholder: "Ex: Mars 2024" },
  { id: "certification_more", message: "Ajouter une autre certification ? (oui/non)", field: null, type: "confirm", loopTo: "certification_name", skipTo: "complete" },

  // ── Terminé ──
  { id: "complete", message: "🎉 Excellent ! Votre CV est complet et prêt à impressionner !\n\nVous pouvez changer de template, ajuster les informations via l'onglet « Formulaire », et télécharger en PDF. Bonne chance dans vos candidatures !", field: null },
];
