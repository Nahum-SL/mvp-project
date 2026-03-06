// src/app/(auth)/login/page.tsx
"use client";

import { LoginForm } from "@/src/features/auth/login/components/LoginForm";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white lg:bg-slate-50">
      {/* Lado Izquierdo: Formulario con entrada animada */}
      <div className="flex items-center justify-center p-6 md:p-12 lg:p-20 relative overflow-hidden">
        {/* Decoración sutil para móvil */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 lg:hidden" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <LoginForm />
        </motion.div>
      </div>

      {/* Lado Derecho: Branding (Oculto en móvil) */}
      <div className="hidden lg:flex bg-slate-900 relative overflow-hidden items-center justify-center p-20">
        {/* Patrón de puntos decorativo */}
        <div className="absolute inset-0 opacity-20" />

        <div className="absolute inset-0 bg-linear-to-br from-blue-600/30 via-transparent to-slate-900" />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <div className="w-12 h-1 bg-blue-500 mb-8 rounded-full" />
          <blockquote className="text-4xl font-light text-white italic leading-[1.1] tracking-tight ">
            La excelencia en la gestión contable comienza con una organización
            <span className="text-blue-400 not-italic font-semibold">
              {" "}impecable.
            </span>
          </blockquote>
          <p className="mt-8 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
            Asescon Internal Systems{" "}
            <span className="text-slate-600">v2.0</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
