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
    description: "Design épuré avec accents colorés",
    isPremium: false,
    previewColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "professional",
    name: "Professionnel",
    description: "Classique et élégant pour les entreprises",
    isPremium: false,
    previewColor: "from-gray-700 to-gray-900",
  },
  {
    id: "creative",
    name: "Créatif",
    description: "Design audacieux pour les profils créatifs",
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
      "Bonjour ! Je suis votre assistant CV. Je vais vous aider à créer un CV professionnel en quelques minutes. Commençons par vos informations personnelles.",
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
    placeholder: "Ex: Développeur Full Stack",
  },
  {
    id: "email",
    message: "Votre adresse email professionnelle ?",
    field: "personalInfo.email",
    placeholder: "Ex: amadou@email.com",
  },
  {
    id: "phone",
    message: "Votre numéro de téléphone ?",
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
      "Rédigez un court résumé professionnel (3-4 lignes). Je peux vous aider à l'améliorer avec l'IA ensuite !",
    field: "personalInfo.summary",
    placeholder: "Décrivez brièvement votre profil et vos objectifs...",
  },
  {
    id: "experience_ask",
    message:
      "Avez-vous des expériences professionnelles à ajouter ? (oui/non)",
    field: null,
    type: "confirm",
  },
  {
    id: "experience_title",
    message:
      "Ajoutons votre expérience professionnelle. Quel est le titre de votre poste actuel ou dernier poste ?",
    field: "experiences[0].title",
    placeholder: "Ex: Développeur Full Stack",
  },
  {
    id: "experience_company",
    message:
      "Dans quelle entreprise ?",
    field: "experiences[0].company",
    placeholder: "Ex: Tech Solutions SARL",
  },
  {
    id: "experience_period",
    message:
      "Période ? (format: date début - date fin, ou 'Présent' si actuel)",
    field: "experiences[0].startDate",
    placeholder: "Ex: Jan 2023 - Présent",
  },
  {
    id: "experience_desc",
    message:
      "Décrivez brièvement vos responsabilités et réalisations clés (séparées par des virgules).",
    field: "experiences[0].achievements",
    placeholder: "Ex: Développement d'APIs REST, Migration cloud AWS, +40% performance",
  },
  {
    id: "education_degree",
    message:
      "Passons à votre formation. Quel est votre diplôme le plus récent ?",
    field: "education[0].degree",
    placeholder: "Ex: Licence Informatique",
  },
  {
    id: "education_school",
    message:
      "Dans quel établissement ?",
    field: "education[0].school",
    placeholder: "Ex: Université Joseph Ki-Zerbo",
  },
  {
    id: "education_period",
    message:
      "Années de formation ?",
    field: "education[0].startDate",
    placeholder: "Ex: 2019 - 2022",
  },
  {
    id: "skills",
    message:
      "Listez vos compétences principales, séparées par des virgules.",
    field: "skills",
    placeholder: "Ex: React, Node.js, TypeScript, PostgreSQL, Docker",
  },
  {
    id: "languages",
    message:
      "Quelles langues parlez-vous ? (format: langue - niveau, séparées par des virgules)",
    field: "languages",
    placeholder: "Ex: Français - Natif, Anglais - Courant, Mooré - Natif",
  },
  {
    id: "complete",
    message:
      "Votre CV est prêt ! Vous pouvez le prévisualiser à droite et le télécharger en PDF. Vous pouvez aussi modifier n'importe quelle section en cliquant dessus.",
    field: null,
  },
];
