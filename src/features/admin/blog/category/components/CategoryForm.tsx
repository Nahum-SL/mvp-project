"use client";

import { FormProvider } from "react-hook-form";
import { useCategoryForm } from "../hooks/use-category-form";
// Ui global
import { FormInput } from "@/src/components/ui/form/FormInput";

export function CategoryForm() {
  const {
    form,
    onSubmit,
    isPending,
  } = useCategoryForm();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormInput
          name="name"
          placeholder="Nombre de la categoría"
          disabled={isPending}
        />

        <button
          type="submit"
          disabled={isPending}
        >
          Crear categoría
        </button>
      </form>
    </FormProvider>
  );
}