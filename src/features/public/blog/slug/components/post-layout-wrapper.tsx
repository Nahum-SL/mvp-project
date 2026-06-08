// src/features/public-pages/blog/containers/BlogLayoutWrapper.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftCloseIcon } from "lucide-react"; // Solo dejamos este para el estado normal
import { EyeIcon } from "@/src/features/components/blog/EyeIcon";
import { cn } from "@/src/lib/utils";

export const PostLayoutWrapper = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  const [isZenMode, setIsZenMode] = useState(false);

  return (
    <div className="container mx-auto px-6 -mt-20 relative z-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* BOTÓN ZEN FLOTANTE */}
        <button
          onClick={() => setIsZenMode(!isZenMode)}
          className={cn(
            `fixed bottom-10 right-10 lg:bottom-auto lg:top-32 lg:-right-4 z-50
            p-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 group
            flex items-center justify-center cursor-pointer`,
            isZenMode
              ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_30px_rgba(51,223,22)]"
              : "bg-slate-900/80 border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-400",
          )}
          title={isZenMode ? "Salir del modo Zen" : "Activar lectura enfocada"}
        >
          {/* Cambiamos la lógica aquí */}
          <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {isZenMode ? (
                <motion.div
                  key="eye"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                >
                  <EyeIcon isOpen={true} />
                </motion.div>
              ) : (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <PanelLeftCloseIcon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 
            bg-slate-900 border border-slate-700 rounded-lg text-[10px] font-bold 
            uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 
            pointer-events-none transition-opacity whitespace-nowrap"
          >
            {isZenMode ? "Modo Enfoque Activo" : "Modo Zen"}
          </span>
        </button>

        {/* ARTÍCULO (DINÁMICO) */}
        <motion.article
          layout
          className={cn(
            "bg-slate-900/50 border border-slate-800 p-8 md:p-14 rounded-[3.5rem] backdrop-blur-sm shadow-2xl transition-all duration-500",
            isZenMode ? "lg:col-span-12 max-w-4xl mx-auto" : "lg:col-span-8",
          )}
        >
          {children}
        </motion.article>

        {/* SIDEBAR (ANIMADO) */}
        <div
          className={cn(
            "lg:col-span-4 transition-all duration-500",
            isZenMode ? "hidden opacity-0" : "block opacity-100",
          )}
        >
          <AnimatePresence>
            {!isZenMode && (
              <motion.aside
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="sticky top-32"
              >
                {sidebar}
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
