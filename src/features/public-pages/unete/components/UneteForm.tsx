// features/public-pages/unete/components/UneteForm.tsx
"use client";

import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

import {
  uneteSchema,
  type UneteFormInput,
  type UneteFormValues,
} from "../schema";
import { sendUneteAction } from "../action";

import { FormField } from "./FormField";
import { FileUpload } from "./FileUpload";
import { FormImageSection } from "./FormImageSection";

interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

export const UneteForm = ({ title, subtitle, src, alt }: Props) => {
  const [isPending, startTransition] = useTransition();

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UneteFormInput, unknown, UneteFormValues>({
    resolver: zodResolver(uneteSchema),
    defaultValues: {
      fullName: "",
      dni: "",
      email: "",
      phone: "",
      position: "",
    },
  });

  const selectedFile = useWatch({ control, name: "cv" });

  const onSubmit = async (data: UneteFormValues) => {
    startTransition(async () => {
      const result = await sendUneteAction(data);
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.error); // Cambié .message por .error según tu estructura de action
      }
    });
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {title}
              </h2>
              <p className="text-slate-500 mt-2 font-light">{subtitle}</p>
            </div>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:col-span-2">
                <FormField
                  label="Nombres Completos"
                  placeholder="Nombres y Apellidos"
                  registration={register("fullName")}
                  error={errors.fullName?.message}
                />
              </div>

              <FormField
                label="DNI"
                placeholder="-- -- -- --"
                registration={register("dni")}
                error={errors.dni?.message}
              />
              <FormField
                label="Edad"
                type="number"
                placeholder="--"
                registration={register("age")}
                error={errors.age?.message}
              />
              <FormField
                label="Email"
                type="email"
                placeholder="tu@correo.com"
                registration={register("email")}
                error={errors.email?.message}
              />
              <FormField
                label="Teléfono"
                type="tel"
                placeholder="+51 ---"
                registration={register("phone")}
                error={errors.phone?.message}
              />
              <FormField
                label="Años Experiencia"
                type="number"
                placeholder="--"
                registration={register("experience")}
                error={errors.experience?.message}
              />

              <FormField
                label="Puesto de Interés"
                registration={register("position")}
                error={errors.position?.message}
                isSelect
              >
                <option value="">Seleccione...</option>
                <option value="Asistente Contable">Asistente Contable</option>
                <option value="Archivador y Digitador">
                  Archivador y Digitador
                </option>
                <option value="Practicantes">Practicantes</option>
              </FormField>

              {/* Asegura que solo pase el valor si es string (CV) */}
              <FileUpload
                label="Adjunta tu CV (PDF)"
                registration={register("cv")}
                error={
                  errors.cv?.message === "string"
                    ? errors.cv.message
                    : undefined
                }
                selectedFileName={selectedFile?.[0]?.name}
              />

              <button
                type="submit"
                disabled={isPending}
                className="md:col-span-2 mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98]"
              >
                {isPending ? "Enviando..." : "Enviar Postulación"}
              </button>
            </form>
          </motion.div>

          <FormImageSection src={src} alt={alt} />
        </div>
      </div>
    </section>
  );
};
