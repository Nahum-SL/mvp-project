// src/components/ui/layout/servicios/ServiceContactSidebar.tsx
"use client";

import { motion } from "framer-motion";
import { Phone, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  serviceTitle: string;
}

export default function ServiceContactSidebar({ serviceTitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 border border-white/5"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-extrabold uppercase tracking-tighter leading-tight">
            ¿Listo para empezar con {serviceTitle}?
          </h3>
          <p className="text-slate-400 text-xs font-bold mt-2">
            Agenda una consultoría gratuita con nuestros especialistas.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/#contacto"
            className="
            group relative w-full py-4 bg-white text-slate-950
            font-extrabold rounded-2xl overflow-hidden
            transition-all hover:scale-[1.02] active:scale-95
            flex items-center justify-center gap-3
            shadow-[0_0_20px_rgba(59,130,246,0.25)]"
          >
            {/* Capa hover */}
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

            {/* Contenido */}
            <div className="relative flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              <Calendar size={18} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">
                Agendar Cita
              </span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
          <Link 
          href="/servicio"
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all">
            <ArrowLeft size={20} className="text-blue-400" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">
              Ver Servicios
            </span>
          </Link>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-full">
            <Phone size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              Llámanos ahora
            </p>
            <p className="text-sm font-extrabold">+51 - 974 770 644</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
