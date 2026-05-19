"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  categorySchema,
  type CategoryFormInput,
  type CategoryFormValues,
} from "../schemas/blog-category-schema";

import { useCreateCategory } from "./use-blog-category-mutation";

export function useCategoryForm() {
  const mutation = useCreateCategory();

  const form = useForm<
    CategoryFormInput,
    unknown,
    CategoryFormValues
  >({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (
    values: CategoryFormValues
  ) => {
    const formData = new FormData();

    formData.append("name", values.name);

    try {
      await mutation.mutateAsync(formData);

      toast.success(
        "Categoría creada correctamente"
      );

      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error inesperado"
      );
    }
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
}