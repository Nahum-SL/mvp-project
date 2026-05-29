// src/features/admin/blog/components/form/PostConfigCard.tsx
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/src/types/blog/category";
import { cn } from "@/src/lib/utils";

// Componentes Atómicos Refactorizados
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormSelect } from "@/src/components/ui/form/FormSelect";
import { FormCheckbox } from "@/src/components/ui/form/FormCheckbox";
import { FormAside } from "@/src/components/ui/form/FormAside";

interface Props {
  categories: Category[];
  isPending: boolean;
}
// 
export const PostConfigCard = ({ categories, isPending }: Props) => {
  // Transformamos las categorías al formato esperado por el FormSelect
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <FormAside>
      {/* SECCIÓN CLASIFICACIÓN (CATEGORÍAS) */}
      <section className="space-y-2">
        <FormLabel>Clasificación</FormLabel>
        <FormSelect
          name="categoryId"
          disabled={isPending}
          placeholder="Seleccionar categoría..."
          options={categoryOptions}
          className="font-bold text-slate-700 p-4 bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </section>

      {/* SECCIÓN ESTADO (CHECKBOX) */}
      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <FormCheckbox
          name="published"
          label="Publicar ahora"
          disabled={isPending}
        />
      </div>

      {/* BOTÓN DE ACCIÓN PRINCIPAL */}
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full py-5 rounded-4xl font-extrabold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl",
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
        {isPending ? "Procesando..." : "Guardar Artículo"}
      </button>

      {/* ENLACE CANCELAR */}
      <Link
        href="/admin/blog"
        className="w-full bg-white text-slate-500 font-bold py-4 rounded-3xl border border-slate-200 hover:bg-slate-50 hover:border-sky-500 hover:text-sky-500 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest text-center"
      >
        <ArrowLeft size={16} /> Cancelar
      </Link>
    </FormAside>
  );
};