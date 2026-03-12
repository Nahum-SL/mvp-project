import { Control, useFieldArray, UseFormRegister, FieldErrors } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { ServicioFormInput } from "../schema";

interface Props {
  register: UseFormRegister<ServicioFormInput>;
  errors: FieldErrors<ServicioFormInput>;
  isPending: boolean;
  control: Control<ServicioFormInput>;
}

export const ServiceFeatures = ({ register, errors, isPending, control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Beneficios incluidos
        </label>
        <button
          type="button"
          onClick={() => append("")}
          disabled={isPending}
          className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3 items-center group">
            <input
              {...register(`features.${index}`)}
              disabled={isPending}
              placeholder="Ej: Asesoría técnica 24/7"
              className="flex-1 p-4 bg-slate-50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {errors.businessTypes && (
          <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">
            {errors.features?.message}
          </p>
        )}
      </div>
    </section>
  );
};
