// src/features/admin/servicios/components/form/ServiceHeader.tsx
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { ServicioFormInput } from "../schema";
import { slugify } from "@/src/lib/utils"; // 1. Corregida la importación

interface Props {
  register: UseFormRegister<ServicioFormInput>;
  errors: FieldErrors<ServicioFormInput>;
  setValue: UseFormSetValue<ServicioFormInput>; // 2. Agregado setValue
  disabled: boolean;
}

export const ServiceHeaderForm = ({
  register,
  errors,
  setValue,
  disabled,
}: Props) => (
  <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Título */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Nombre del Servicio
        </label>
        <input
          {...register("title")}
          disabled={disabled}
          placeholder="Ej: Auditoría Financiera"
          className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-700 transition-all placeholder:text-slate-300"
        />
        {errors.title && (
          <p className="text-red-500 text-[10px] font-bold uppercase">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Slug */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Slug / URL Amigable
        </label>
        <input
          // 3. La forma correcta de manejar el onChange con register
          {...register("slug", {
            onChange: (e) => {
              const formatted = slugify(e.target.value);
              setValue("slug", formatted);
            },
          })}
          disabled={disabled}
          placeholder="auditoria-financiera"
          className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-mono text-sm text-blue-600 transition-all"
        />
        {errors.slug && (
          <p className="text-red-500 text-[10px] font-bold uppercase">
            {errors.slug.message}
          </p>
        )}
      </div>
    </div>
  </section>
);
