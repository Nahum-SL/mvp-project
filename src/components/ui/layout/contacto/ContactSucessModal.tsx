// src/components/ui/layout/contacto/SuccessModal.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const ContactSuccessModal = ({ 
  isOpen, 
  onClose, 
  title = "¡SOLICITUD ENVIADA!", 
  message = "Hemos recibido tu mensaje correctamente. Un especialista de ASESCON se pondrá en contacto contigo a la brevedad." 
}: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-101 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-10 
              shadow-2xl relative overflow-hidden"
            >
              {/* Botón cerrar sutil */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                {/* Icono Animado */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, delay: 0.2 }}
                  className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={40} />
                </motion.div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {title}
                </h3>

                <p className="text-slate-500 text-base leading-relaxed mb-8">
                  {message}
                </p>

                <button
                  onClick={onClose}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all uppercase text-xs tracking-[0.2em]"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};