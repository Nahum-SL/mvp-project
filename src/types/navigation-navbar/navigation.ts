// navigation.ts
// Opciones para el Sidebar publico

type NavItem =
  | {
      name: string;
      href: string;
      children?: never;
    }
  | {
      name: string;
      children: { name: string; href: string }[];
      href?: never;
    };

export const NAV_ITEMS: NavItem[] = [
  { name: "Inicio", href: "/"},
  { name: "Servicios", href: "/servicio"},
  { name: "Contacto", href: "/#contacto"},

  {
    name: "Recursos",
    children: [
      { name: "Blog", href: "/blog" },
      { name: "Herramientas", href: "/herramientas" },
    ],
  },

  { name: "Nosotros", href: "/nosotros"},
  { name: "Intranet", href: "/intranet"},
  { name: "Únete", href: "/unete"},
];
