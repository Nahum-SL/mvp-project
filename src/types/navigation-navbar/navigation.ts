// navigation.ts
// Opciones para el Sidebar publico
import {
  FileText,
} from "lucide-react";

export const NAV_ITEMS = [
  { name: "Inicio", href: "/"},
  { name: "Servicios", href: "/servicio"},
  { name: "Contacto", href: "/#contacto"},

  {
    name: "Recursos",
    icon: FileText,
    children: [
      { name: "Blog", href: "/blog" },
      { name: "Herramientas", href: "/herramientas" },
    ],
  },

  { name: "Nosotros", href: "/nosotros"},
  { name: "Intranet", href: "/intranet"},
  { name: "Únete", href: "/unete"},
];
