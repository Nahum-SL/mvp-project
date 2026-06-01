// src/features/admin/blog/components/form/PostConfigCard.tsx
import type { Category } from "@/src/types/blog/category";

// Componentes Atómicos Refactorizados
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormSelect } from "@/src/components/ui/form/FormSelect";
import { FormCheckbox } from "@/src/components/ui/form/FormCheckbox";
import { FormAside } from "@/src/components/ui/form/FormAside";
import { FormActions } from "@/src/components/ui/form/FormActions";

interface Props {
  categories: Category[];
  isPending: boolean;
  isEditing?: boolean;
}
// 
export const PostConfigCard = ({ categories, isPending, isEditing }: Props) => {
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
      <FormActions submitLabel="Crear Post" isPending={isPending} isEditing={isEditing} />
    </FormAside>
  );
};