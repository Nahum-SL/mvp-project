// src/features/public-pages/home/components/ServiceCardHome.tsx
"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceHome } from "@/src/types/servicio/servicio-home";
import { cn } from "@/src/lib/utils";

export const ServiceCardHome = ({
  service,
}: {
  service: ServiceHome;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Funciones de control mejoradas
  const activateVisuals = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {}); // Catch por si el navegador bloquea el play
  };

  const deactivateVisuals = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  return (
    <motion.div
      onMouseEnter={activateVisuals}
      onMouseLeave={deactivateVisuals}
      onTouchStart={activateVisuals}
      onTouchEnd={deactivateVisuals}
      className="group relative h-112.5 w-full overflow-hidden rounded-[2.5rem] 
      bg-slate-50 border border-slate-200"
    >
      <Link href={`/servicio/${service.slug}`}>
        {/* VIDEO DE FONDO: Ahora ocupa todo el espacio con un filtro elegante */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            className={cn(
              "w-full h-full object-cover transition-transform duration-1000 scale-105",
              isHovered ? "scale-100 opacity-100" : "",
            )}
          >
            <source
              src={`/video/servicios/${service.slug}.webm`}
              type="video/webm"
            />
          </video>
          {/* Overlay de gradiente para legibilidad (Estilo Squarespace) */}
          <div
            className={cn(
              "absolute inset-0 transition-colors duration-500",
              isHovered ? "bg-slate-950/40" : "bg-transparent",
            )}
          />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 h-full p-10 flex flex-col justify-between">
          <div className="space-y-4">
            <h3
              className={cn(
                "text-3xl font-medium tracking-tighter sm:text-white transition-colors tex-white duration-500",
                isHovered ? "text-white" : "text-black",
              )}
            >
              {service.title}
            </h3>
          </div>

          <div className="space-y-6">
            <p
              className={cn(
                "text-sm leading-relaxed max-w-70 transition-colors duration-500",
                isHovered ? "text-slate-200" : "text-slate-500",
              )}
            >
              {service.description}
            </p>

            {/* Botón Estilo "CTA Minimal" */}
            <div
              className={cn(
                "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all",
                isHovered ? "text-sky-400 translate-x-2" : "text-slate-900",
              )}
            >
              Explorar Servicio <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
