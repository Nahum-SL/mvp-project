// src/features/public-pages/about/components/TeamMemberCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { TeamMember } from "@/src/types/nosotros/team-asescon";

interface Props {
  member: TeamMember;
  index: number;
}

export const TeamMemberCard = ({ member, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[2.5rem] 
      bg-slate-900 border border-slate-800 shadow-xl"
    >
      {/* Contenedor de Imagen con Efecto de Profundidad */}
      <div className="aspect-3/4 w-full overflow-hidden relative">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center grayscale 
          group-hover:grayscale-0 group-hover:scale-105 
          transition-all duration-700 ease-in-out"
        />

        {/* Degradado Superpuesto (NexaSAP Style) */}
        <div
          className="absolute inset-0 bg-linear-to-t 
        from-slate-950 via-slate-950/20 to-transparent opacity-90"
        />

        {/* Enlace a LinkedIn (Aparece en Hover) */}
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-6 p-3 rounded-full 
            bg-white/5 backdrop-blur-md border border-white/10 
            text-white opacity-0 group-hover:opacity-100 
            transition-all duration-300 
            hover:bg-blue-500 hover:border-blue-500 hover:scale-110"
          >
            <FaLinkedinIn size={14} />
          </Link>
        )}
      </div>

      {/* Detalles del Miembro */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 z-10 text-center">
        <span
          className="inline-block mb-2 text-sky-400 
        font-extrabold uppercase tracking-[0.3em] text-[10px]"
        >
          {member.role}
        </span>
        <h4
          className="text-2xl font-extrabold text-white leading-tight 
        tracking-tighter mb-1 italic"
        >
          {member.name}
        </h4>
        {member.specialty && (
          <p className="text-slate-400 text-xs font-medium tracking-tight">
            {member.specialty}
          </p>
        )}
      </div>
    </motion.div>
  );
};
