// features/admin/intranet/components/form/LinkHeader.tsx
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IntranetLinkFormInput } from "../../schema";
import { cn } from "@/src/lib/utils";

interface Props {
  register: UseFormRegister<IntranetLinkFormInput>;
  errors: FieldErrors<IntranetLinkFormInput>;
  disabled?: boolean;
}

export const LinkHeader = ({ register, errors, disabled }: Props) => {
  return (
    <div className="space-y-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="space-y-2">
        <label className="text-xs font-extrabold uppercase tracking-widest text-blue-600 ml-2">
          Título del Enlace
        </label>
        <input
          {...register("title")}
          disabled={disabled}
          placeholder="Ej: Portal de Boletas"
          className={cn(
            "w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-lg font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none",
            errors.title && "ring-2 ring-red-500/20 bg-red-50/30",
          )}
        />
        {errors.title && (
          <p className="text-red-500 text-xs font-bold ml-2 uppercase">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 ml-2">
          Descripción Breve
        </label>
        <textarea
          {...register("description")}
          disabled={disabled}
          rows={2}
          placeholder="¿A dónde lleva este link?"
          className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-600 font-medium placeholder:text-slate-300 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-xs font-bold ml-2 uppercase">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
};
