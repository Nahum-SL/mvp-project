// features/admin/contacto/components/ContactoDrawer.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageSquare } from "lucide-react";
import { Contacto, ContactStatus } from "@/src/types/contacto/contacto";

interface Props {
  contacto: Contacto | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ContactStatus) => void;
}

export const ContactoDrawer = ({
  contacto,
  onClose,
  onUpdateStatus,
}: Props) => {
  if (!contacto) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-120 flex justify-end">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white h-full shadow-2xl p-8 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mt-10 space-y-8">
            <header>
              <h3 className="text-3xl font-black text-slate-900 leading-tight uppercase italic">
                {contacto.name}
              </h3>
              <p className="text-blue-600 font-bold text-xs tracking-widest mt-2">
                {contacto.status}
              </p>
            </header>

            {/* Información Rápida */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <Phone size={16} className="text-slate-400 mb-2" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Teléfono
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {contacto.telefono}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <Mail size={16} className="text-slate-400 mb-2" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Email
                </p>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {contacto.email}
                </p>
              </div>
            </div>

            {/* Mensaje/Comentario */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest">
                <MessageSquare size={14} /> Mensaje del Cliente
              </div>
              <div className="p-6 bg-blue-50/50 rounded-4xl border border-blue-100/50 text-slate-700 leading-relaxed text-sm italic">
                {contacto.comentario || "Sin comentarios adicionales"}
              </div>
            </div>

            {/* Acciones de Estado */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
                Gestionar Proceso
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.values(ContactStatus).map((status) => (
                  <button
                    key={status}
                    onClick={() => onUpdateStatus(contacto.id, status)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                      contacto.status === status
                        ? "bg-slate-900 text-white shadow-xl scale-105"
                        : "bg-white border border-slate-100 text-slate-400 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
