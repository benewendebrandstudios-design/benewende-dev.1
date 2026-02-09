export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Amadou Diallo",
    role: "CEO",
    company: "TechStart Ouaga",
    content:
      "Excellent travail sur notre plateforme SaaS. Livraison dans les temps, code propre et communication parfaite. Je recommande vivement Benewende pour tout projet web ambitieux.",
    rating: 5,
  },
  {
    id: "2",
    name: "Fatou Traor\u00E9",
    role: "Directrice Marketing",
    company: "DigiAgence BF",
    content:
      "Le site e-commerce livr\u00E9 a d\u00E9pass\u00E9 nos attentes. Les performances sont au rendez-vous et l'exp\u00E9rience utilisateur est fluide. Un vrai professionnel.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ibrahim Sanogo",
    role: "CTO",
    company: "FinPlus Africa",
    content:
      "Benewende a transform\u00E9 notre vision en un produit fonctionnel en un temps record. Son expertise en IA et architecture cloud est impressionnante.",
    rating: 5,
  },
  {
    id: "4",
    name: "Marie Compaoré",
    role: "Fondatrice",
    company: "EduTech Sahel",
    content:
      "Gr\u00E2ce \u00E0 Benewende, notre plateforme \u00E9ducative est utilis\u00E9e par des milliers d'\u00E9tudiants. Qualit\u00E9, r\u00E9activit\u00E9 et passion pour le code.",
    rating: 5,
  },
  {
    id: "5",
    name: "Ousmane Kabor\u00E9",
    role: "Product Manager",
    company: "AgriSmart BF",
    content:
      "Un d\u00E9veloppeur qui comprend les enjeux business. Le dashboard analytics qu'il a cr\u00E9\u00E9 nous a permis d'augmenter notre productivit\u00E9 de 40%.",
    rating: 5,
  },
];
