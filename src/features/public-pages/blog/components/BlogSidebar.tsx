// src/features/public-pages/blog/components/BlogSidebar.tsx
"use client";

import { BlogPost } from "@/src/types/blog/blogPost";
import { SunatCalendar } from "./tools/SunatCalendar";
import { GratificationCalc } from "./tools/GratificacionCal";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { PenaltyCalc } from "./tools/PenaltyCalc";

export const BlogSidebar = ({ post }: { post: BlogPost }) => {
  const renderTool = () => {
    const categorySlug = post.category.slug.toLowerCase();

    if (
      categorySlug.includes("tributario") ||
      categorySlug.includes("auditoria")
    ) {
      return <PenaltyCalc />;
    }

    if (
      categorySlug.includes("laboral") ||
      categorySlug.includes("recursos-humanos")
    ) {
      return <GratificationCalc />;
    }
    return <SunatCalendar />;
  };

  return (
    <div className="space-y-10">
      {/* Widget de Herramienta Dinámica */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 flex items-center justify-between px-2">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            Herramienta <span className="text-sky-500">Sugerida</span>
          </h4>
          <div className="h-px flex-1 bg-slate-800 ml-4" />
        </div>
        {renderTool()}
      </motion.div>

      {/* CTA de Conversión Directa */}
      <div
        className="relative group overflow-hidden rounded-[2.5rem] 
      bg-linear-to-br from-blue-600 to-indigo-900 p-8 
      shadow-2xl shadow-blue-500/10 border border-white/5"
      >
        <div className="relative z-10">
          <h4 className="text-2xl font-black text-white leading-tight mb-4 tracking-tighter">
            ¿Dudas con tu <br /> {post.category.name}?
          </h4>
          <p className="text-blue-100 text-sm mb-8 font-medium leading-relaxed opacity-80">
            Evita contingencias legales. Conversa ahora con un especialista de
            ASESCON.
          </p>

          <div className="flex flex-col gap-3">
            {/* BOTÓN WHATSAPP CON EFECTO RELLENO (Estilo Hero) */}
            <Link
              href="https://wa.me/51974770644"
              className="group/btn relative w-full px-6 py-4 bg-white 
              text-slate-950 font-black rounded-2xl 
              overflow-hidden transition-all hover:scale-[1.02] 
              active:scale-95 flex items-center justify-center gap-3"
            >
              {/* Capa de fondo verde que sube */}
              <div
                className="absolute inset-0 bg-[#25D366] 
              translate-y-full group-hover/btn:translate-y-0 
              transition-transform duration-300"
              />

              <div
                className="relative flex items-center gap-2 
              group-hover/btn:text-white transition-colors duration-300"
              >
                <FaWhatsapp size={18} className="shrink-0" />
                <span className="uppercase tracking-widest text-[10px]">
                  WhatsApp Directo
                </span>
              </div>
            </Link>

            {/* BOTÓN SECUNDARIO */}
            <Link
              href="/#contacto"
              className="flex items-center justify-center gap-2 
              bg-white/10 text-white border border-white/10 
              py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest 
              hover:bg-white/20 transition-all"
            >
              Agendar Asesoría <FaArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
      </div>

      {/* Mini Info del Autor */}
      <div className="p-6 rounded-4xl border border-slate-900 bg-slate-950/50 backdrop-blur-md">
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-4">
          Escrito por
        </span>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/30 flex items-center justify-center text-white font-black shadow-inner">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none mb-1">
              {post.author.name}
            </p>
            <p className="text-slate-500 text-[9px] uppercase font-black tracking-tighter">
              {post.author.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
