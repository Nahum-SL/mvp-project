"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { ComparisonHybrid } from "./comparison-hybrid";
import { cn } from "@/src/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  services: ScoredService[];
  hasContext?: boolean;
}

export default function ComparisonModal({
  isOpen,
  onClose,
  services,
  hasContext,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* MODAL */}
          <motion.div
            className={cn(
              "w-full max-w-6xl bg-white flex flex-col shadow-2xl",
              "h-dvh md:h-auto md:max-h-[90vh] md:rounded-3xl",
              "rounded-t-4xl overflow-hidden",
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* HEADER */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight">
                  Comparativa de Servicios
                </h2>
                <p className="text-[11px] md:text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Asesoría ASESCON
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto flex-1 p-4 md:p-8 scroll-smooth">
              <ComparisonHybrid services={services} hasContext={hasContext} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
