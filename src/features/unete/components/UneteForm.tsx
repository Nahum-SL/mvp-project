"use client";

//
import { sendUneteAction } from "../action";

//
import { motion } from "framer-motion";
import Image from "next/image";

//
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

// Validaciones con Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { uneteSchema, type UneteFormValues } from "../schema"; // Debes crear este schema

// Icono
import { FaCloudUploadAlt } from "react-icons/fa";

interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

export const UneteSection = ({ title, subtitle, src, alt }: Props) => {
  // 1. Forzamos a useForm a usar exactamente el tipo que infiere Zod
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UneteFormValues>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: zodResolver(uneteSchema),
    // Es buena práctica inicializar valores si usas coerce
    defaultValues: {
      fullName: "",
      dni: "",
      email: "",
      phone: "",
      position: "",
    },
  });

  // Limpiar el input

  const selectedFile = watch("cv");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  // 2. Aseguramos que data use el tipo inferido
  const onSubmit: SubmitHandler<UneteFormValues> = async (data: UneteFormValues) => {
    setStatus(null);
    const result = await sendUneteAction(data);

    if (result.success) {
      setStatus({ type: "success", msg: result.message });
      reset();
      // Limpiar el input de archivo manualmente si es necesario
      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } else {
      setStatus({ type: "error", msg: result.message });
    }
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
              {" "}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Nombres Completos
                </label>
                <input
                  {...register("fullName")}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Nombres y Apellidos"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-[10px]">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  DNI
                </label>
                <input
                  {...register("dni")}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  placeholder="-- -- -- --"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Edad
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  placeholder="--"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  placeholder="Tu@correo.gmail"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Teléfono
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  placeholder="+51 --- --- ---"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Años Experiencia
                </label>
                <input
                  type="number"
                  {...register("experience")}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  placeholder="--"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Puesto de Interés
                </label>
                <select
                  {...register("position")}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none appearance-none"
                >
                  <option value="">Seleccione...</option>
                  <option value="Asistente Contable">Asistente Contable</option>
                  <option value="Archivador y Digitador">
                    Archivador y Digitador
                  </option>
                  <option value="Practicantes">Practicantes</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Adjunta tu CV (PDF)
                </label>
                <div className="relative group cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    {...register("cv")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`w-full border-2 border-dashed ${errors.cv ? "border-red-300" : "border-slate-200"} bg-white p-6 rounded-xl flex flex-col items-center justify-center group-hover:border-blue-500 transition-colors`}
                  >
                    <FaCloudUploadAlt className="text-3xl text-slate-300 group-hover:text-blue-500 mb-2" />
                    <span className="text-sm text-slate-500 font-medium">
                      {selectedFile?.[0]
                        ? selectedFile[0].name
                        : "Seleccione Archivo o arrastre aquí"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="md:col-span-2 mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              >
                Enviar Postulación
              </button>
              {/* Mensaje de error para el CV específicamente */}
              {errors.cv?.message && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.cv.message as string}
                </p>
              )}
            </form>
          </motion.div>

          {/* Columna de Imagen / Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="sticky top-24 space-y-8"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={src} alt={alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl font-bold leading-tight">
                  Buscamos mentes brillantes para construir el futuro contable.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-blue-900 font-bold mb-2 uppercase text-lg tracking-widest">
                Aviso de Privacidad
              </h4>
              <p className="text-blue-700/70 text-sm leading-relaxed">
                Tus datos serán tratados con absoluta confidencialidad para
                fines exclusivos de selección de personal según la ley vigente.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
