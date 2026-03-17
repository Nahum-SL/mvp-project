// navigation.ts
import {
  LayoutDashboard,
  FileText,
  Users,
  Link as LinkIcon,
  BookOpenText,
  Layers,
} from "lucide-react";

export const NAV_ITEMS = [
  { name: "Inicio", href: "/", icon: LayoutDashboard },
  { name: "Recursos", href: "/blog", icon: FileText },
  { name: "Servicios", href: "/servicio", icon: Layers },
  { name: "Únete", href: "/unete", icon: Users },
  { name: "Contacto", href: "/#contacto", icon: BookOpenText },
  { name: "Iniciar Sesión", href: "/login", icon: LinkIcon },
];