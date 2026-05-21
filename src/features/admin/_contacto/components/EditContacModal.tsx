// src/features/admin/contacto/components/EditContactModal.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Phone, Mail, Loader2 } from "lucide-react";
import { contactoSchema, type ContactoFormValues, type ContactoFormInput } from "../schema";
import { ContactInput } from "@/src/features/public-web/contacto/components/form/ContactInput";
import { Contacto } from "../../../../types/contacto/contacto-type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lead: Contacto;
  onSave: (data: ContactoFormValues) => void;
  isPending: boolean;
}

export const EditContactModal = ({
  isOpen,
  onClose,
  lead,
  onSave,
  isPending,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactoFormInput, unknown, ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
    defaultValues: {
      name: lead.name,
      email: lead.email,
      telefono: lead.telefono,
      fechaNac: new Date(lead.fechaNac).toISOString().split("T")[0],
      comentario: lead.comentario || "",
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-extrabold uppercase text-slate-900">
                Editar Lead
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSave)} className="space-y-4">
              <ContactInput
                label="Nombre"
                icon={User}
                registration={register("name")}
                error={errors.name?.message}
                placeholder=""
              />
              <ContactInput
                label="Email"
                icon={Mail}
                registration={register("email")}
                error={errors.email?.message}
                placeholder=""
              />
              <ContactInput
                label="Teléfono"
                icon={Phone}
                registration={register("telefono")}
                error={errors.telefono?.message}
                placeholder=""
              />

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-6 bg-blue-600 py-4 rounded-2xl text-white font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-100"
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                Guardar Cambios
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
