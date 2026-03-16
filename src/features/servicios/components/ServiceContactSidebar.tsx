// src/components/ui/layout/servicios/ServiceContactSidebar.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Calendar, ArrowRight } from "lucide-react";

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
          <h3 className="text-xl font-black uppercase tracking-tighter leading-tight">
            ¿Listo para empezar con {serviceTitle}?
          </h3>
          <p className="text-slate-400 text-xs font-bold mt-2">
            Agenda una consultoría gratuita con nuestros especialistas.
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl flex items-center justify-center gap-3 transition-all group shadow-lg shadow-blue-600/20">
            <Calendar size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Agendar Cita
            </span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all">
            <Mail size={18} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Enviar Consulta
            </span>
          </button>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-full">
            <Phone size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Llámanos ahora
            </p>
            <p className="text-sm font-black">+51 - 974 770 644</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
