import { Loader2, Save } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ServicioFormInput } from "../schema";
import { cn } from "@/src/lib/utils";

interface Props {
  register: UseFormRegister<ServicioFormInput>;
  errors: FieldErrors<ServicioFormInput>;
  isPending: boolean;
}

export const ServiceConfigCard = ({ register, errors, isPending }: Props) => (
  <aside className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 sticky top-6">
    <section className="space-y-4">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        Tipo de Empresa
      </label>
      <div className="grid grid-cols-1 gap-2">
        {["mype", "startup", "corporativo"].map((type) => (
          <label
            key={type}
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <input
              type="checkbox"
              value={type}
              {...register("businessTypes")}
              className="rounded border-slate-300 text-blue-600"
            />
            <span className="text-sm font-bold capitalize text-slate-600">
              {type}
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
        {["impuestos", "legal", "planillas", "estrategia"].map((pain) => (
          <label
            key={pain}
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <input
              type="checkbox"
              value={pain}
              {...register("painPoints")}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-bold capitalize text-slate-600">
              {pain}
            </span>
          </label>
        ))}
      </div>
    </section>
    
    <button
      type="submit"
      disabled={isPending}
      className={cn(
        `w-full py-5 rounded-4xl bg-slate-900 text-white 
      font-black uppercase tracking-widest text-xs hover:bg-blue-600 
      transition-all flex items-center justify-center gap-3`,
        isPending
          ? "bg-slate-100 text-slate-400 shadow-none"
          : "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-200 active:scale-95",
      )}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Save size={18} />
      )}
      {isPending ? "Procesando..." : "Guardar Servicio"}
    </button>
  </aside>
);
