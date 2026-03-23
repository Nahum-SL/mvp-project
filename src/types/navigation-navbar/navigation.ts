// navigation.ts
// Opciones para el Sidebar publico
import {
  LayoutDashboard,
  FileText,
  Users,
  Link as LinkIcon,
  BookOpenText,
  Layers,
  UserPlus,
} from "lucide-react";

export const NAV_ITEMS = [
  { name: "Inicio", href: "/", icon: LayoutDashboard },
  { name: "Servicios", href: "/servicio", icon: Layers },
  { name: "Contacto", href: "/#contacto", icon: BookOpenText },
  { name: "Recursos", href: "/blog", icon: FileText },
  { name: "Nosotros", href: "/nosotros", icon: Users },
  { name: "Intranet", href: "/intranet", icon: LinkIcon },
  { name: "Únete", href: "/unete", icon: UserPlus },
];