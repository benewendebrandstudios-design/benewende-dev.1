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
    name: "Fatou Traoré",
    role: "Directrice Marketing",
    company: "DigiAgence BF",
    content:
      "Le site e-commerce livré a dépassé nos attentes. Les performances sont au rendez-vous et l'expérience utilisateur est fluide. Un vrai professionnel.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ibrahim Sanogo",
    role: "CTO",
    company: "FinPlus Africa",
    content:
      "Benewende a transformé notre vision en un produit fonctionnel en un temps record. Son expertise en IA et architecture cloud est impressionnante.",
    rating: 5,
  },
  {
    id: "4",
    name: "Marie Compaoré",
    role: "Fondatrice",
    company: "EduTech Sahel",
    content:
      "Grâce à Benewende, notre plateforme éducative est utilisée par des milliers d'étudiants. Qualité, réactivité et passion pour le code.",
    rating: 5,
  },
  {
    id: "5",
    name: "Ousmane Kaboré",
    role: "Product Manager",
    company: "AgriSmart BF",
    content:
      "Un développeur qui comprend les enjeux business. Le dashboard analytics qu'il a créé nous a permis d'augmenter notre productivité de 40%.",
    rating: 5,
  },
];
