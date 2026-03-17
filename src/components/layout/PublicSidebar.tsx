"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  FileText,
  Users,
  Link as LinkIcon,
  BookOpenText as Book,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

const menuItems = [
  { name: "Inicio", href: "/", icon: LayoutDashboard },
  { name: "Recursos", href: "/blog", icon: FileText },
  { name: "Servicios", href: "/servicio", icon: Layers },
  { name: "Unete", href: "/unete", icon: Users },
  { name: "Contacto", href: "/contacto", icon: Book },
  { name: "Iniciar Sesión ", href: "/login", icon: LinkIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay para móviles: oscurece el fondo al abrir el menú */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Principal */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col min-h-screen
        `}
      >
        <div className="p-8 flex items-center justify-between">

          {/* Botón cerrar solo visible en móvil */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                )}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
