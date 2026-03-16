// src/components/ui/layout/servicios/ComparisonModal.tsx
"use client";

import { Service } from "@/src/types/servicio/servicio";
import { X, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ComparisonTableStripe } from "./ComparisonTableStripe";

interface Props {
  services: Service[];
  onClose: () => void;
}

export const ComparisonModal = ({ services, onClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-y-auto relative"
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-md p-8 border-b border-slate-100 z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
              Comparador Avanzado
            </h2>
            <p className="text-xs text-slate-500 font-bold">
              Analizando capacidades técnicas para tu empresa
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="p-8 md:p-12">
          {/* Aquí inyectamos la tabla de Stripe que hicimos antes */}
          <ComparisonTableStripe services={services} />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="p-8 bg-slate-50 rounded-4xl border border-slate-100 space-y-4"
              >
                <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight">
                  {svc.title}
                </h4>
                <p
                  className="text-xs text-slate-500 leading-relaxed line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: svc.description }}
                />
                <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  Elegir esta solución
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
