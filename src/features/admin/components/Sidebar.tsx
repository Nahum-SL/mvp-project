"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Link as LinkIcon,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Gestionar Blog", href: "/admin/blog", icon: FileText },
  { name: "Candidatos", href: "/admin/unete", icon: Users },
  { name: "Intranet Links", href: "/admin/intranet", icon: LinkIcon },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="p-8">
        <h2 className="text-2xl font-black tracking-tighter italic">
          ASESCON<span className="text-blue-500 not-italic">.</span>
        </h2>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors text-sm font-medium">
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
