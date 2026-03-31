"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ServiceHome } from "@/src/types/servicio/servicio-home";

export const ServiceCardHome = ({
  service,
  index,
}: {
  service: ServiceHome;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // En móvil, el primer toque activa el hover visual
      onTouchStart={() => setIsHovered(true)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-112 w-full overflow-hidden rounded-[2.5rem] 
      bg-slate-900 border border-slate-200/10 shadow-lg"
    >
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`/${service.image}.webp`} // Asegúrate que la ruta coincida
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className={cn(
            "object-cover transition-all duration-1000 scale-105",
            isHovered
              ? "scale-100 opacity-60 grayscale-0"
              : "opacity-40 grayscale",
          )}
        />

        {/* 2. OVERLAY DE LEGIBILIDAD (Gradiente Dual) */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700 z-10",
            // Gradiente constante para asegurar que el texto blanco siempre se vea
            "bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90",
            isHovered ? "opacity-100" : "opacity-80",
          )}
        />
      </div>

      {/* 3. CONTENIDO (Z-20 para estar sobre el overlay) */}
      <div className="relative z-20 h-full p-8 md:p-10 flex flex-col justify-between">
        {/* Título: Alta Jerarquía */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight tracking-tight">
            {service.title}
          </h3>
        </div>

        {/* Descripción y Enlace: Aparecen/Suben en Hover */}
        <div className="space-y-6">
          <p
            className={cn(
              "text-sm md:text-base leading-relaxed text-slate-300 transition-all duration-500",
              "line-clamp-3 md:line-clamp-none", // Evita que textos largos rompan el diseño
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none md:block hidden",
            )}
          >
            {service.description}
          </p>

          <Link href={`/servicio/${service.slug}`} className="inline-block">
            <div
              className={cn(
                "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300",
                "text-emerald-600 group-hover:text-emerald-4s00",
                isHovered ? "translate-x-2" : "translate-x-0",
              )}
            >
              Explorar Servicio{" "}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:rotate-45"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Decoración sutil de borde en hover */}
      <div
        className={cn(
          "absolute inset-0 border-2 border-sky-500/50 rounded-[2.5rem] transition-opacity duration-500 pointer-events-none z-30",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />
    </motion.div>
  );
};
