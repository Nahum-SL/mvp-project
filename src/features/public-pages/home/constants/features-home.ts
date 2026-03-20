import { ServiceHome } from "@/src/types/servicio/servicio-home";
// Estos datos idealmente vendrían de una constante de "destacados"
export const FEATURED_HOME: ServiceHome[] = [
  {
    id: 1,
    title: "Gestión Contable Integral",
    description:
      "Mucho más que libros. Transformamos tu información financiera en reportes estratégicos para la toma de decisiones.",
    icon: "FileBarChart",
    slug: "contabilidad-integral",
  },
  {
    id: 2,
    title: "Blindaje Tributario",
    description:
      "Protección total ante auditorías de SUNAT. Maximizamos tus beneficios fiscales dentro del marco legal vigente.",
    icon: "ShieldCheck",
    slug: "asesoria-tributaria",
  },
  {
    id: 3,
    title: "Outsourcing de Planillas",
    description:
      "Cero contingencias laborales. Gestionamos tus contratos, boletas y aportes con precisión técnica absoluta.",
    icon: "Users",
    slug: "gestion-planillas",
  },
  {
    id: 4,
    title: "Defensa Legal Corporativa",
    description:
      "Soporte legal preventivo y reactivo para proteger el patrimonio y la operatividad de tu organización.",
    icon: "Gavel",
    slug: "legal-corporativo",
  },
];
