// src/features/public/contacto/components/ContactForm.tsx
"use client";

import { FormProvider } from "react-hook-form"; 
import { usePublicContactForm } from "../hooks/use-public-contacto-form";

// Componentes
import { ContactSuccessDialog } from "./ContactSuccesDialog";

// Componentes Atomicos
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormInput } from "@/src/components/ui/form/FormInput";
import { FormTextArea } from "@/src/components/ui/form/FormTextArea";

import { User, Mail, Phone, Calendar, MessageSquare, Send } from "lucide-react";

export function ContactForm() {
  const { form, onSubmit, isPending, isSuccessOpen, closeSuccessModal } =
    usePublicContactForm();

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-10 bg-white rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100">
        {/* Envolvemos todo en el FormProvider que alimenta a tus componentes */}
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <FormLabel>Nombre Completo</FormLabel>
                <FormInput
                  name="name"
                  placeholder="Ej. Juan Pérez"
                  icon={User}
                  disabled={isPending}
                />
              </div>

              <div className="space-y-1.5">
                <FormLabel>Correo Electrónico</FormLabel>
                <FormInput
                  name="email"
                  type="email"
                  placeholder="juan@ejemplo.com"
                  icon={Mail}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <FormLabel>Teléfono / WhatsApp</FormLabel>
                <FormInput
                  name="telefono"
                  type="tel"
                  placeholder="987654321"
                  icon={Phone}
                  disabled={isPending}
                />
              </div>

              <div className="space-y-1.5">
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormInput
                  name="fechaNac"
                  type="date"
                  icon={Calendar}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <FormLabel>¿Cómo podemos ayudarte?</FormLabel>
              <FormTextArea
                name="comentario"
                placeholder="Cuéntanos brevemente tu consulta..."
                icon={MessageSquare}
                disabled={isPending}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2.5 uppercase text-xs tracking-widest disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Send className="w-3.5 h-3.5 animate-pulse" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 -rotate-12" />
                  <span>Solicitar Asesoría</span>
                </>
              )}
            </button>
          </form>
        </FormProvider>
      </div>

      <ContactSuccessDialog
        isOpen={isSuccessOpen}
        onClose={closeSuccessModal}
      />
    </>
  );
}
