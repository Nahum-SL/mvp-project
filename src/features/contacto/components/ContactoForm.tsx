"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactoSchema, type ContactoFormValues } from "../schema";
import { sendContactoAction } from "../action";
import { useState } from "react";
// Asumo que AnimatedButton viene de tus componentes comunes
import AnimatedButton from "@/src/components/ui/buttons/AnimatedButton";

export const ContactoForm = () => {
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
  });

  const onSubmit = async (data: ContactoFormValues) => {
    setIsPending(true);
    const result = await sendContactoAction(data);
    if (result.success) {
      setStatus({ type: "success", msg: result.message });
      reset();
    } else {
      setStatus({ type: "error", msg: result.message });
    }
    setIsPending(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-gray-50 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden relative -bottom-10 z-20"
    >
      <div className="p-8 md:p-10 flex flex-col space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl text-blue-800 font-bold">
            Completa tus datos y agenda tu cita
          </h2>
        </div>

        {/* Mensajes de Status */}
        {status && (
          <div
            className={`text-sm px-4 py-3 rounded-lg border ${
              status.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {status.msg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <input
              {...register("name")}
              placeholder="Nombre Completo"
              className={`w-full rounded-lg border ${errors.name ? "border-red-400" : "border-gray-300"} px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Correo Corporativo / Email"
              className={`w-full rounded-lg border ${errors.email ? "border-red-400" : "border-gray-300"} px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("telefono")}
              maxLength={15}
              placeholder="Teléfono / WhatsApp"
              className={`w-full rounded-lg border ${errors.telefono ? "border-red-400" : "border-gray-300"} px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
            />
            {errors.telefono && (
              <p className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.telefono.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              type="date"
              {...register("fechaNac")}
              className={`w-full rounded-lg border ${errors.fechaNac ? "border-red-400" : "border-gray-300"} px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
            />
            {errors.fechaNac && (
              <p className="text-red-500 text-[10px] mt-1 ml-1">
                {errors.fechaNac.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <textarea
              {...register("comentario")}
              rows={4}
              placeholder="Déjanos saber tu opinión / Mensaje"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>

        <div className="mt-6">
          <AnimatedButton
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-700 py-3 text-white font-medium hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? "Enviando..." : "Enviar Solicitud"}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </AnimatedButton>
        </div>
      </div>
    </form>
  );
};
