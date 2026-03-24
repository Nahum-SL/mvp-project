// src/features/public-pages/home/components/ServiceCardHome.tsx
"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { iconMap } from "@/src/lib/icons";
import { ServiceHome } from "@/src/types/servicio/servicio-home";
import { cn } from "@/src/lib/utils";

// Paleta estratégica por ID o Slug
const COLOR_THEMES: Record<string, string> = {
  "contabilidad-integral": "border-blue-600 text-blue-600 bg-blue-50",
  "asesoria-tributaria": "border-emerald-500 text-emerald-600 bg-emerald-50",
  "gestion-planillas": "border-yellow-500 text-yellow-600 bg-yellow-50",
  "legal-corporativo": "border-slate-800 text-slate-800 bg-slate-100",
};

export const ServiceCardHome = ({
  service,
  index,
}: {
  service: ServiceHome;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const IconComponent = iconMap[service.icon];
  const theme =
    COLOR_THEMES[service.slug] || "border-slate-200 text-slate-600 bg-slate-50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => {
        setIsHovered(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        videoRef.current?.pause();
      }}
      className="group relative h-112"
    >
      <Link href={`/servicio/${service.slug}?from=servicios_populares`}>
        <div
          className={`h-full p-8 rounded-[2.5rem] bg-white border-b-8 ${theme.split(" ")[0]} 
          shadow-2xl shadow-slate-200/50 hover:shadow-blue-900/10 transition-all duration-500 
          overflow-hidden relative flex flex-col justify-between border-2`}
        >
          {/* VIDEO BACKGROUND (Solo visible en hover) */}
          <div
            className={cn(
              "absolute inset-0 z-0 transition-opacity duration-700",
              isHovered ? "opacity-30" : "opacity-0",
            )}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-125"
            >
              <source
                src={`/video/servicios/${service.slug}.webm`}
                type="video/webm"
              />
            </video>
            {/* Overlay para mantener legibilidad */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10">
            <div
              className={`w-14 h-14 rounded-2xl ${theme.split(" ")[2]} 
              flex items-center justify-center 
              ${theme.split(" ")[1]} group-hover:scale-110 
              transition-transform duration-500`}
            >
              {IconComponent && <IconComponent size={28} strokeWidth={2.5} />}
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter leading-[1.1]">
              {service.title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              {service.description}
            </p>

            <div
              className={`flex items-center gap-2 
                text-[10px] font-black uppercase tracking-[0.2em] 
              ${theme.split(" ")[1]} 
              pt-4 transition-all translate-y-2 
              opacity-0 group-hover:translate-y-0 
              group-hover:opacity-100 group-hover:text-sky-600`}
            >
              Consultar ahora <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
