import { Intranet } from "../data/intranet";

export const intranetLinks: Intranet[] = [

  // Blog
  {
    id: 1,
    title: "Blog Corporativo",
    description: "Gestión de artículos, noticias y actualizaciones del sector contable.",
    src: "/icons/blog.svg", // Puedes usar iconos o imágenes
    url: "/admin/blog"
  },

  // Correo
  {
    id: 2,
    title: "Correo Institucional",
    description: "Acceso directo a la plataforma de comunicación interna y externa.",
    src: "/icons/mail.svg",
    url: "https://mail.google.com" 
  },

  // Facturación
  {
    id: 3,
    title: "Sistema de Facturación",
    description: "Emisión, consulta y control de comprobantes de pago electrónicos.",
    src: "/icons/invoice.svg",
    url: "/admin/facturacion"
  },

  // Contabilidad
  {
    id: 4,
    title: "Gestión Contable",
    description: "Software especializado para el registro y auditoría de estados financieros.",
    src: "/icons/data.svg",
    url: "/admin/contabilidad"
  },

  // Administrativo
  {
    id: 5,
    title: "Panel Administrativo",
    description: "Control de usuarios, permisos y configuración general del sistema.",
    src: "/icons/settings.svg",
    url: "/admin/config"
  },

  // Portal Para Trabajadores
  {
    id: 6,
    title: "Portal de Colaboradores",
    description: "Acceso a boletas de pago, solicitudes de vacaciones y documentos internos.",
    src: "/icons/staff.svg",
    url: "/portal/trabajadores"
  },

  // Portal Para Clientes
  {
    id: 7,
    title: "Centro de Clientes",
    description: "Plataforma de autoservicio para la descarga de reportes y estados de cuenta.",
    src: "/icons/client.svg",
    url: "/portal/clientes"
  },
];