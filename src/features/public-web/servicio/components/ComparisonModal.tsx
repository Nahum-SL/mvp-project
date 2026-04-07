"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import ComparisonHybrid from "./CompareHybrid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  services: ScoredService[];
}

export default function ComparisonModal({ isOpen, onClose, services }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* CONTENEDOR */}
          <div className="flex flex-1 items-center justify-center p-6">
            <motion.div
              className="w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <div>
                  <h2 className="font-semibold text-lg">
                    Comparación de servicios
                  </h2>
                  <p className="text-xs text-slate-500">
                    Analiza capacidades clave
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded"
                >
                  <X size={18} />
                </button>
              </div>

              {/* CONTENIDO */}
              <div className="overflow-y-auto p-4">
                <ComparisonHybrid services={services} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
