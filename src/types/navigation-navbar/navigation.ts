// navigation.ts
import { FileText } from "lucide-react";
import { NavItem } from "@/src/components/layout/navbar/type";

export const NAV_ITEMS: NavItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicio" },
  { name: "Contacto", href: "/#contacto" },

  {
    name: "Recursos",
    icon: FileText,
    children: [
      {
        name: "Blog",
        href: "/blog",
        description: "Artículos y contenido educativo",
      },
      {
        name: "Herramientas",
        href: "/herramientas",
        description: "Calculadoras y utilidades",
      },
    ],
  },
  { name: "Nosotros", href: "/nosotros" },
  
  { name: "Intranet", href: "/intranet", position: "right" },
  { name: "Unete", href: "/unete", position: "right" },
];
