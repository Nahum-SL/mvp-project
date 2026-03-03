"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import {
  categorySchema,
  CategoryFormInput,
  CategoryFormValues,
} from "../schema";
import { createCategoryAction } from "../action";
import { useState } from "react";

export function CategoryForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues, unknown, CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    setServerError(null);
    const res = await createCategoryAction(data);

    if (res.success) {
      reset();
      // Aquí podrías disparar un toast de éxito
    } else {
      setServerError(res.error || "Ocurrió un error inesperado");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
    >
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">
          Nueva Categoría
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              {...register("name")}
              placeholder="Ej. Asesoría Legal"
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.name ? "border-red-500" : "border-slate-200"
              } focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Plus size={18} />
            )}
            Guardar
          </button>
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs font-medium ml-1">
            {errors.name.message}
          </p>
        )}
        {serverError && (
          <p className="text-amber-600 text-xs font-medium ml-1 italic">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}
