"use client";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

// Constantes
import { BUSINESS_TYPES, PAIN_POINTS } from "@/src/types/servicio/constants";
// Components Atomicos
import { FormError } from "@/src/components/ui/form/FormError";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormAside } from "@/src/components/ui/form/FormAside";

interface Props {
  isPending: boolean;
}

export const ServiceConfigCard = ({ isPending }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormAside>
      {/* Tipo de empresa */}
      <section className="space-y-4">
        <FormLabel>
          Tipo de Empresa
        </FormLabel>
        <div className="grid grid-cols-1 gap-2">
          {BUSINESS_TYPES.map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <input
                type="checkbox"
                value={type.id}
                {...register("businessTypes")}
                className="rounded border-slate-300 text-blue-600"
              />
              <span className="text-sm font-bold capitalize text-slate-600">
                {type.id}
              </span>
            </label>
          ))}
        </div>
        <FormError message={errors.bussinesTypes?.message as string} />
      </section>

      {/* Pain Points Section en ServiceConfigCard */}
      <section className="space-y-4 pt-6 border-t border-slate-50">
        <FormLabel>
          Puntos de Dolor (Pain Points)
        </FormLabel>
        <div className="grid grid-cols-1 gap-2">
          {PAIN_POINTS.map((pain) => (
            <label
              key={pain.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl 
            cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <input
                type="checkbox"
                value={pain.id}
                {...register("painPoints")}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-bold capitalize text-slate-600">
                {pain.id}
              </span>
            </label>
          ))}
        </div>
        <FormError message={errors.painPoints?.message as string} />
      </section>

      {/* Sección: Visibilidad y Orden (Importante para el Admin) */}
      <section className="space-y-4 pt-6 border-t border-slate-50">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
          <FormLabel >
            Visible en Web
          </FormLabel>
          <input
            type="checkbox"
            {...register("isVisible")}
            className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-green-500 
          transition-all cursor-pointer relative after:content-[''] 
          after:absolute after:top-1 after:left-1 after:bg-white after:w-3 after:h-3 
          after:rounded-full after:transition-all checked:after:left-6"
          />
        </div>
        <div className="space-y-2">
          <FormLabel>
            Prioridad / Orden
          </FormLabel>
          <input
            type="number"
            {...register("order", { valueAsNumber: true })}
            className="w-full p-3 bg-slate-50 rounded-xl border-none font-bold text-slate-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Acciones */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            `w-full py-5 rounded-4xl font-extrabold uppercase tracking-widest text-[10px] 
          transition-all flex items-center justify-center gap-3`,
            isPending
              ? "bg-slate-100 text-slate-400"
              : "bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-blue-100 active:scale-95",
          )}
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {isPending ? "Guardando..." : "Guardar Servicio"}
        </button>

        <Link
          href="/admin/servicio" // Corregido el path
          className="
        w-full bg-white text-slate-400 font-extrabold py-4 rounded-4xl 
        border border-slate-100 hover:bg-slate-50 
        transition-all flex items-center justify-center 
        gap-3 uppercase text-[10px] tracking-widest
        "
        >
          <ArrowLeft size={16} />
        </Link>
      </div>
    </FormAside>
  );
};
