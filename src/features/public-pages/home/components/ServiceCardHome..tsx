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

  const activateVisuals = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
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
      bg-slate-100 border border-slate-200"
    >
      <Link href={`/servicio/${service.slug}`}>
        {/* VIDEO Y OVERLAY */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className={cn(
              "w-full h-full object-cover transition-all duration-1000 scale-105",
              // En móvil lo dejamos con un poco de opacidad base si quieres que se note el video
              isHovered ? "scale-100 opacity-100" : "",
            )}
          >
            <source
              src={`/video/servicios/${service.slug}.webm`}
              type="video/webm"
            />
          </video>

          {/* Capa de protección de legibilidad: 
              Gradiente oscuro constante en móvil para aguantar el texto blanco */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500",
              "bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent sm:bg-transparent",
              isHovered ? "sm:bg-slate-950/40" : "",
            )}
          />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 h-full p-10 flex flex-col justify-between">
          <div className="space-y-4">
            <h3
              className={cn(
                "text-3xl font-medium tracking-tighter transition-colors duration-500",
                // Blanco en móvil por el gradiente, Negro en Desktop por el fondo claro
                "text-white sm:text-slate-900",
                isHovered ? "text-white" : "",
              )}
            >
              {service.title}
            </h3>
          </div>

          <div className="space-y-6">
            <p
              className={cn(
                "text-sm leading-relaxed max-w-70 transition-colors duration-500",
                "text-slate-200 sm:text-slate-500",
                isHovered ? "text-slate-200" : "",
              )}
            >
              {service.description}
            </p>

            <div
              className={cn(
                "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all",
                // En móvil usamos un color que resalte sobre oscuro (sky o blanco)
                "text-sky-400 sm:text-slate-900",
                isHovered ? "text-sky-400 sm:translate-x-2" : "",
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
