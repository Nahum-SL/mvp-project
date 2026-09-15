// src/features/public/contacto/components/ContactSuccessDialog.tsx
import { Dialog } from "@/src/components/ui/dialog/Dialog";
import { CheckCircle2 } from "lucide-react";

interface ContactSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactSuccessDialog({
  isOpen,
  onClose,
}: ContactSuccessDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center p-2">
        {/* Icono de éxito */}
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center mb-5 animate-scale-in">
          <CheckCircle2 size={36} />
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight uppercase">
          ¡Solicitud Enviada!
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-3 mb-6 max-w-sm">
          Hemos recibido tu mensaje correctamente. Un especialista de{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            ASESCON
          </span>{" "}
          se pondrá en contacto contigo a la brevedad.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gray-950 hover:bg-gray-900 dark:bg-gray-100 dark:hover:bg-white text-white dark:text-gray-950 font-bold rounded-xl transition-colors uppercase text-xs tracking-widest shadow-sm"
        >
          Entendido
        </button>
      </div>
    </Dialog>
  );
}
