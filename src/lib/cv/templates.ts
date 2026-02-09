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

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  previewColor: string;
}

export const cvTemplates: CVTemplate[] = [
  {
    id: "modern",
    name: "Moderne",
    description: "Design \u00E9pur\u00E9 avec accents color\u00E9s",
    isPremium: false,
    previewColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "professional",
    name: "Professionnel",
    description: "Classique et \u00E9l\u00E9gant pour les entreprises",
    isPremium: false,
    previewColor: "from-gray-700 to-gray-900",
  },
  {
    id: "creative",
    name: "Cr\u00E9atif",
    description: "Design audacieux pour les profils cr\u00E9atifs",
    isPremium: true,
    previewColor: "from-purple-500 to-pink-500",
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

export const chatSteps = [
  {
    id: "welcome",
    message:
      "Bonjour ! Je suis votre assistant CV. Je vais vous aider \u00E0 cr\u00E9er un CV professionnel en quelques minutes. Commen\u00E7ons par vos informations personnelles.",
    field: null,
  },
  {
    id: "fullName",
    message: "Quel est votre nom complet ?",
    field: "personalInfo.fullName",
    placeholder: "Ex: Amadou Diallo",
  },
  {
    id: "title",
    message: "Quel est votre titre professionnel ?",
    field: "personalInfo.title",
    placeholder: "Ex: D\u00E9veloppeur Full Stack",
  },
  {
    id: "email",
    message: "Votre adresse email professionnelle ?",
    field: "personalInfo.email",
    placeholder: "Ex: amadou@email.com",
  },
  {
    id: "phone",
    message: "Votre num\u00E9ro de t\u00E9l\u00E9phone ?",
    field: "personalInfo.phone",
    placeholder: "Ex: +226 70 00 00 00",
  },
  {
    id: "location",
    message: "Votre localisation ?",
    field: "personalInfo.location",
    placeholder: "Ex: Ouagadougou, Burkina Faso",
  },
  {
    id: "summary",
    message:
      "R\u00E9digez un court r\u00E9sum\u00E9 professionnel (3-4 lignes). Je peux vous aider \u00E0 l'am\u00E9liorer avec l'IA ensuite !",
    field: "personalInfo.summary",
    placeholder: "D\u00E9crivez bri\u00E8vement votre profil et vos objectifs...",
  },
  {
    id: "experience_ask",
    message:
      "Avez-vous des exp\u00E9riences professionnelles \u00E0 ajouter ? (oui/non)",
    field: null,
    type: "confirm",
  },
  {
    id: "skills",
    message:
      "Listez vos comp\u00E9tences principales, s\u00E9par\u00E9es par des virgules.",
    field: "skills",
    placeholder: "Ex: React, Node.js, TypeScript, PostgreSQL, Docker",
  },
  {
    id: "languages",
    message:
      "Quelles langues parlez-vous ? (format: langue - niveau, s\u00E9par\u00E9es par des virgules)",
    field: "languages",
    placeholder: "Ex: Fran\u00E7ais - Natif, Anglais - Courant, Moor\u00E9 - Natif",
  },
  {
    id: "complete",
    message:
      "Votre CV est pr\u00EAt ! Vous pouvez le pr\u00E9visualiser \u00E0 droite et le t\u00E9l\u00E9charger en PDF. Vous pouvez aussi modifier n'importe quelle section en cliquant dessus.",
    field: null,
  },
];
