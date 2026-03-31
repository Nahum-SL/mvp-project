"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, LoaderCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface InteractiveVideoBoxProps {
  title: string;
  description: string;
  videoSrc?: string;
  posterSrc: string;
  className?: string;
}

export const InteractiveVideoBox = ({
  title,
  description,
  videoSrc,
  posterSrc,
  className,
}: InteractiveVideoBoxProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Manejo de reproducción profesional
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || videoError) return;

    if (isHovered) {
      video.play().catch(() => {
        // Silenciamos el error de autoplay, común en ahorro de batería de móviles
      });
    } else {
      video.pause();
    }
  }, [isHovered, videoSrc, videoError]);

  return (
    <motion.div
      // Eventos unificados para Desktop y Móvil
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative group overflow-hidden rounded-[3.5rem] bg-slate-900 border border-slate-800 shadow-2xl aspect-4/5 md:aspect-16/10",
        className,
      )}
    >
      {/* 1. Imagen Poster (Fallback dinámico) */}
      <Image
        src={posterSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        className={cn(
          "object-cover object-center transition-all duration-700 ease-in-out",
          // La imagen se desvanece solo si el video está listo y hay interacción
          isHovered && !isVideoLoading && !videoError
            ? "opacity-0 scale-110"
            : "opacity-100 scale-100",
        )}
        priority
      />

      {/* 2. El Video (Filtro Grayscale para Look Corporativo) */}
      {videoSrc && !videoError && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setIsVideoLoading(false)}
          onError={() => {
            setIsVideoLoading(false);
            setVideoError(true);
          }}
          className={cn(
            "absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-700",
            isHovered && !isVideoLoading ? "opacity-50" : "opacity-0",
          )}
        >
          <source src={videoSrc} type="video/webm" />
        </video>
      )}

      {/* 3. Indicadores de Estado */}
      <div className="absolute top-8 right-8 z-30">
        {videoSrc && isHovered && isVideoLoading && (
          <div className="p-3 rounded-full bg-slate-950/60 backdrop-blur-md border border-sky-500/30 text-sky-400 animate-spin">
            <LoaderCircle size={20} />
          </div>
        )}
        {videoSrc && !isHovered && (
          <div className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={20} className="fill-current" />
          </div>
        )}
      </div>

      {/* 4. Contenido con Animación de Entrada */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent z-20 flex flex-col justify-end p-10 md:p-16">
        <motion.div
          animate={{
            y: isHovered ? 0 : 15,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <span className="inline-block text-sky-500 font-extrabold uppercase tracking-[0.4em] text-[10px] md:text-xs">
            Experiencia ASESCON
          </span>

          <h3
            className={cn(
              "text-3xl md:text-5xl text-white leading-tight tracking-tighter max-w-xl transition-all duration-500",
              isHovered ? "translate-x-2" : "translate-x-0",
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "text-slate-300 text-sm md:text-lg leading-relaxed max-w-2xl transition-all duration-500 delay-100",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            {description}
          </p>
        </motion.div>
      </div>

      {/* Glow Decorativo Inferior */}
      <div
        className={cn(
          "absolute -bottom-10 -left-10 w-64 h-64 bg-sky-500/20 blur-[100px] rounded-full transition-opacity duration-1000 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />
    </motion.div>
  );
};
