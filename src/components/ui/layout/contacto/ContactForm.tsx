// src/components/ui/layout/contacto/ContactForm.tsx
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User, Mail, Phone, Loader2, Send } from "lucide-react";

import {
  contactoSchema,
  type ContactoFormValues,
  type ContactoFormInput,
} from "@/src/features/admin/contacto/schema";
import { sendContactAction } from "@/src/features/admin/contacto/action";

// Subcomponentes
import { ContactInput } from "./form/ContactInput";
import { ContactDateInput } from "./form/ContactDateInput";
import { ContactTextArea } from "./form/ContactTextArea";

export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactoFormInput, unknown, ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
  });

  const onSubmit = async (data: ContactoFormValues) => {
    startTransition(async () => {
      const result = await sendContactAction(data);
      if (result.success) {
        toast.success("¡Mensaje enviado!", {
          description: "Pronto nos comunicaremos contigo.",
        });
        reset();
      } else {
        toast.error("Error", { description: result.error });
      }
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-blue-400"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactInput
              label="Nombre Completo"
              icon={User}
              placeholder="Tus nombres"
              registration={register("name")}
              error={errors.name?.message}
            />
            <ContactInput
              label="Correo Electrónico"
              icon={Mail}
              placeholder="juan@ejemplo.com"
              type="email"
              registration={register("email")}
              error={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactInput
              label="Teléfono / WhatsApp"
              icon={Phone}
              placeholder="+51 987 654 321"
              registration={register("telefono")}
              error={errors.telefono?.message}
            />
            <ContactDateInput
              label="Fecha de Nacimiento"
              registration={register("fechaNac")}
              error={errors.fechaNac?.message}
            />
          </div>

          <ContactTextArea
            label="¿Cómo podemos ayudarte?"
            placeholder="Cuéntanos brevemente tu consulta..."
            registration={register("comentario")}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            animate={{ backgroundColor: isPending ? "#94a3b8" : "#2563eb" }}
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
            text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-blue-200 
            transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send size={18} className="-rotate-12" />
            )}
            {isPending ? "Enviando Solicitud..." : "Solicitar Asesoría"}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};
