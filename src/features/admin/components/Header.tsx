// src/features/admin/components/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, ChevronDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "../../auth/login/logout-action";

// Datos del autor (En el futuro esto vendrá de tu AuthContext o Store)
const author = {
  name: "Nahum-SL",
  role: "Administrador",
  avatar: "/admin-avatar.webp", // Asegúrate de tener esta imagen o usa un fallback
};

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-50">
      {/* Título de sección */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 bg-blue-600 rounded-full" />
        <h1 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Panel de Control <span className="text-slate-200 mx-2">/</span>{" "}
          <span className="text-slate-900">Asescon System</span>
        </h1>
      </div>

      {/* Perfil del Administrador */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 group"
        >
          {/* Avatar / Imagen */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-blue-600 overflow-hidden border-2 border-white shadow-lg shadow-blue-100">
              {/* Si no tienes imagen aún, puedes usar un icono de User */}
              <User className="w-full h-full p-2 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-xs font-black text-slate-900 leading-none mb-1 uppercase italic tracking-tight">
              {author.name}
            </p>
            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={10} />
              {author.role}
            </p>
          </div>

          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Menú Desplegable */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-4xl shadow-2xl shadow-slate-200/50 p-3 z-50"
            >
              <div className="space-y-1">
                <MenuLink
                  icon={<User size={16} />}
                  label="Mi Perfil"
                  href="/admin/profile"
                />
                <MenuLink
                  icon={<Settings size={16} />}
                  label="Configuración"
                  href="/admin/settings"
                />

                {/* Línea divisoria */}
                <div className="h-px bg-slate-50 my-2 mx-4" />

                <button
                  onClick={async () => {
                    await logoutAction();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors group"
                >
                  <LogOut
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Cerrar Sesión
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// Componente auxiliar para los links del menú
function MenuLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all group"
    >
      <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
        {icon}
      </span>
      <span className="text-[10px] font-black uppercase tracking-widest">
        {label}
      </span>
    </Link>
  );
}
