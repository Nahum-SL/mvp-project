// src/features/public-pages/about/components/ValueCard.tsx
"use client";
import { motion } from "framer-motion";
import { ValuesAsescon } from "@/src/types/nosotros/value-asescon";
import { iconMap } from "@/src/lib/icons";

interface Props {
  value: ValuesAsescon;
}

export const ValueCard = ({ value }: Props) => {
  // Renombramos a Mayúscula para que React lo trate como componente
  const IconComponent = iconMap[value.icon];

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 overflow-hidden backdrop-blur-sm"
    >
      {/* Efecto de luz ambiental */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 
        ${value.bg} blur-[50px] rounded-full opacity-0 
        group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Contenedor del Icono */}
      <div
        className={`w-14 h-14 ${value.bg} rounded-2xl 
        flex items-center justify-center mb-6 border border-white/5 relative z-10`}
      >
        {/* Renderizamos el componente si existe */}
        {IconComponent && (
          <IconComponent className={`${value.color} w-7 h-7`} />
        )}
      </div>

      <h3
        className="text-2xl font-bold text-white tracking-tighter 
      mb-4 relative z-10"
      >
        {value.title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed font-medium relative z-10">
        {value.description}
      </p>

      {/* Línea decorativa */}
      <div
        className={`absolute bottom-0 left-0 h-1  ${value.line}
        w-0 group-hover:w-full transition-all duration-500`}
      />
    </motion.div>
  );
};
