'use client';
// src/components/ui/layout/contacto/form/ContactHeader.tsx
import { motion } from "framer-motion";

export const ContactHeader = () => {
  return (
    <div className="text-center mb-10 space-y-4">

      {/* Título Principal */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-6xl lg:text-4xl font-black text-slate-900 leading-tights tracking-tighter"
      >
        ¿Listo para comenzar?
      </motion.h2>

      {/* Subtítulo / Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-slate-500 text-sm md:text-xl font-medium leading-relaxed"
      >
        Únete a las empresas que ya han transformado su gestión con el respaldo
        estratégico de{" "}
        <span className="text-slate-900 font-bold tracking-tight">ASESCON</span>
        .
      </motion.p>

      {/* Decoración Visual (Línea) */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "60px" }}
        className="h-1 bg-blue-600 mx-auto rounded-full mt-6"
      />
    </div>
  );
};
