// src/features/public-pages/home/constants/features-home.ts
import { ServiceHome } from "@/src/types/servicio/servicio-home";

export const FEATURED_HOME: ServiceHome[] = [
  {
    id: 1,
    title: "Gestión Contable Integral",
    description:
      "Transformamos tu información financiera en reportes estratégicos para la toma de decisiones con nuestro servicio de outsourcing especializado.",
    icon: "FileBarChart",
    slug: "outsourcing-contable", 
  },
  {
    id: 2,
    title: "Blindaje Tributario",
    description:
      "Protección total ante auditorías de SUNAT mediante auditorías preventivas y un planeamiento tributario diseñado a tu medida.",
    icon: "ShieldCheck",
    slug: "planeamiento-tributario", 
  },
  {
    id: 3,
    title: "Outsourcing de Planillas",
    description:
      "Cero contingencias laborales. Gestionamos contratos, boletas y aportes mediante nuestro servicio de outsourcing laboral.",
    icon: "Users",
    slug: "outsourcing-laboral", 
  },
  {
    id: 4,
    title: "Defensa Legal Corporativa",
    description:
      "Soporte legal preventivo y defensa técnica ante fiscalizaciones para proteger el patrimonio de tu organización.",
    icon: "Gavel",
    slug: "defensa-tributaria", 
  },
];
