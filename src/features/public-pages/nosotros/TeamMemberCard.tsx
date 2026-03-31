"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { TeamMember } from "@/src/types/nosotros/team-asescon";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface Props {
  member: TeamMember;
  index: number;
}

export const TeamMemberCard = ({ member, index }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      // Eventos unificados
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className="group relative overflow-hidden rounded-[2.5rem] 
      bg-slate-900 border border-slate-800 shadow-xl"
    >
      {/* Contenedor de Imagen */}
      <div className="aspect-3/4 w-full overflow-hidden relative">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover object-center transition-all duration-700 ease-in-out",
            // Controlamos el grayscale y escala con el estado
            isHovered ? "grayscale-0 scale-105" : "grayscale scale-100",
          )}
        />

        {/* Degradado (NexaSAP Style) - Ajustado para legibilidad constante */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-80",
          )}
        />

        {/* Enlace a LinkedIn */}
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "absolute top-6 right-6 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white transition-all duration-300 z-20",
              "hover:bg-blue-600 hover:border-blue-500 hover:scale-110",
              // Aparece con el estado isHovered
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none",
            )}
          >
            <FaLinkedinIn size={14} />
          </Link>
        )}
      </div>

      {/* Detalles del Miembro */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 z-10 text-center">
        <motion.span
          animate={{ color: isHovered ? "#38bdf8" : "#94a3b8" }} // Cambia de slate-400 a sky-400
          className="inline-block mb-2 font-extrabold uppercase tracking-[0.3em] text-[10px]"
        >
          {member.role}
        </motion.span>

        <h4
          className={cn(
            "text-2xl font-extrabold text-white leading-tight tracking-tighter mb-1 italic transition-transform duration-500",
            isHovered ? "scale-105" : "scale-100",
          )}
        >
          {member.name}
        </h4>

        {member.specialty && (
          <p
            className={cn(
              "text-xs font-medium tracking-tight transition-colors duration-500",
              isHovered ? "text-slate-200" : "text-slate-400",
            )}
          >
            {member.specialty}
          </p>
        )}
      </div>
    </motion.div>
  );
};
