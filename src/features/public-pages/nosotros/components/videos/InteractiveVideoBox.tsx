// src/features/public-pages/about/components/InteractiveVideoBox.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, VolumeX, LoaderCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface InteractiveVideoBoxProps {
  title: string;
  description: string;
  videoSrc?: string; // Ruta al video (.mp4/.webm) - Opcional para placeholder
  posterSrc: string; // Imagen de respaldo (obligatoria)
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

  // Intentar reproducir/pausar el video en hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || videoError) return;

    if (isHovered) {
      // Intentar reproducir si está precargado y no hay error
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error);
        // Si falla la reproducción automática (ej: políticas del navegador), ignoramos
      });
    } else {
      video.pause();
    }
  }, [isHovered, videoSrc, videoError]);

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError(true);
    console.error(`Failed to load video: ${videoSrc}`);
  };

  return (
    <motion.div
      className={cn(
        `relative group overflow-hidden rounded-[3.5rem] 
        bg-slate-900 border border-slate-800 shadow-2xl 
        aspect-4/5 md:aspect-16/10`,
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 1. Imagen Poster/Fallback (Siempre visible por defecto) */}
      <Image
        src={posterSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "object-cover object-center transition-opacity duration-700 ease-in-out",
          videoSrc && !videoError && isHovered && !isVideoLoading
            ? "opacity-0"
            : "opacity-100",
        )}
        priority
      />

      {/* 2. El Video (Se reproduce en Hover si está disponible) */}
      {videoSrc && !videoError && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none" // Para performance, no precargar hasta hover (Yellow Leaf Style)
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          className={cn(
            "absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-700 ease-in-out",
            isHovered && !isVideoLoading ? "opacity-40" : "opacity-0",
          )}
        >
          <source src={videoSrc} type="video/webm" />
          Tu navegador no soporta videos.
        </video>
      )}

      {/* 3. Indicadores de Estado del Video (Loading / No Video) */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        {videoSrc && isHovered && isVideoLoading && (
          <div
            className="p-3 rounded-full bg-slate-950/60 backdrop-blur-sm border 
          border-slate-800 text-sky-400 animate-spin"
          >
            <LoaderCircle size={16} />
          </div>
        )}
        {videoSrc && !isHovered && (
          <div
            className="p-3 rounded-full bg-slate-950/60 backdrop-blur-sm border 
          border-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Play size={16} className="fill-slate-500" />
          </div>
        )}
        {(!videoSrc || videoError) && (
          <div
            className="p-3 rounded-full bg-slate-950/60 backdrop-blur-sm border 
          border-slate-800 text-slate-600"
          >
            <VolumeX size={16} />
          </div>
        )}
      </div>

      {/* 4. Overlay de Contenido (Texto e Interactividad) */}
      <div
        className="absolute inset-0 bg-linear-to-t from-slate-950 
      via-slate-950/40 to-transparent z-10 flex flex-col justify-end p-10 md:p-16"
      >
        <motion.div
          className="space-y-4"
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-sky-500 font-black uppercase tracking-[0.4em] text-xs">
            Experiencia ASESCON
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter italic max-w-xl">
            {title}
          </h3>
          <p
            className="text-slate-300 text-lg leading-relaxed font-medium 
          max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
          >
            {description}
          </p>
        </motion.div>
      </div>

      {/* Glow Decorativo de Hover (Look de Ingeniería) */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};
