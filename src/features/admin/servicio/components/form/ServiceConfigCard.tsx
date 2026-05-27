// src/features/admin/servicio/components/form/ServiceConfigCard.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

import { BUSINESS_TYPES, PAIN_POINTS } from "@/src/types/servicio/constants";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormAside } from "@/src/components/ui/form/FormAside";
import { FormSwitch } from "@/src/components/ui/form/FormSwitch";
import { FormInput } from "@/src/components/ui/form/FormInput";
import { FormError } from "@/src/components/ui/form/FormError";
import type { ServicioFormInput } from "../../schemas/servicio.schema";

interface Props {
  isPending: boolean;
}

export function ServiceConfigCard({ isPending }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServicioFormInput>();

  return (
    <FormAside>
      {/* Tipo de empresa */}
      <section className="space-y-4">
        <FormLabel>Tipo de Empresa</FormLabel>
        <div className="grid grid-cols-1 gap-2">
          {BUSINESS_TYPES.map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <input
                type="checkbox"
                value={type.id}
                disabled={isPending}
                {...register("businessTypes")}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-bold text-slate-600">
                {type.label}
              </span>
            </label>
          ))}
        </div>
        <FormError message={errors.businessTypes?.message} />
      </section>

      {/* Puntos de dolor */}
      <section className="space-y-4 pt-6 border-t border-slate-100">
        <FormLabel>Puntos de Dolor (Pain Points)</FormLabel>
        <div className="grid grid-cols-1 gap-2">
          {PAIN_POINTS.map((pain) => (
            <label
              key={pain.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <input
                type="checkbox"
                value={pain.id}
                disabled={isPending}
                {...register("painPoints")}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-bold text-slate-600">
                {pain.label}
              </span>
            </label>
          ))}
        </div>
        <FormError message={errors.painPoints?.message} />
      </section>

      {/* Visibilidad y Prioridad utilizando Átomos de Formulario */}
      <section className="space-y-4 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
          <FormLabel>Visible en Web</FormLabel>
          <FormSwitch<ServicioFormInput>
            name="isVisible"
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Prioridad / Orden</FormLabel>
          <FormInput<ServicioFormInput>
            name="order"
            type="number"
            disabled={isPending}
            className="font-bold text-slate-600"
          />
        </div>
      </section>

      {/* Acciones */}
      <div className="space-y-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "w-full py-5 rounded-4xl font-extrabold uppercase tracking-widest text-[10px]",
            "transition-all flex items-center justify-center gap-3",
            isPending
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
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
          href="/admin/servicio"
          className="w-full bg-white text-slate-400 font-extrabold py-4 rounded-4xl border border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={16} />
          <span>Volver al listado</span>
        </Link>
      </div>
    </FormAside>
  );
}
