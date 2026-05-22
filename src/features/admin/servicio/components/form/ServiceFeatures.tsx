import {
  useFieldArray
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
// Componentes Atomicos
import { FormError } from "@/src/components/ui/form/FormError";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormSubSection } from "@/src/components/ui/form/FormSubSection";

interface Props {
  isPending: boolean;
}

export const ServiceFeatures = ({ isPending }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <FormSubSection >
      <div className="flex justify-between items-center">
        <FormLabel>
          Beneficios incluidos
        </FormLabel>
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
        <FormError message={errors.title?.message as string} />
      </div>
    </FormSubSection>
  );
};
