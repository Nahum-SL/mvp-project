import { Loader2, Save, ArrowLeft } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ServicioFormInput } from "../schema";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { BUSINESS_TYPES, PAIN_POINTS } from "@/src/types/servicio/constants";

interface Props {
  register: UseFormRegister<ServicioFormInput>;
  errors: FieldErrors<ServicioFormInput>;
  isPending: boolean;
}

export const ServiceConfigCard = ({ register, errors, isPending }: Props) => (
  <aside className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 sticky top-6">
    {/* Tipo de empresa */}
    <section className="space-y-4">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        Tipo de Empresa
      </label>
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
      {errors.businessTypes && (
        <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">
          {errors.businessTypes.message}
        </p>
      )}
    </section>

    {/* Pain Points Section en ServiceConfigCard */}
    <section className="space-y-4 pt-6 border-t border-slate-50">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        Puntos de Dolor (Pain Points)
      </label>
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
      {errors.painPoints && (
        <p className="text-red-500 text-[10px] font-bold uppercase">
          {errors.painPoints.message}
        </p>
      )}
    </section>

    {/* Sección: Visibilidad y Orden (Importante para el Admin) */}
    <section className="space-y-4 pt-6 border-t border-slate-50">
      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          Visible en Web
        </label>
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
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Prioridad / Orden
        </label>
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
          `w-full py-5 rounded-4xl font-black uppercase tracking-widest text-[10px] 
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
        w-full bg-white text-slate-400 font-black py-4 rounded-4xl 
        border border-slate-100 hover:bg-slate-50 
        transition-all flex items-center justify-center 
        gap-3 uppercase text-[10px] tracking-widest
        "
      >
        <ArrowLeft size={16} /> Cancelar
      </Link>
    </div>
  </aside>
);
