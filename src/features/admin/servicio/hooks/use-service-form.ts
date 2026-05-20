// src/features/admin/servicio/hooks/use-service-form.ts
"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  servicioSchema,
  type ServicioFormInput,
  type ServicioFormValues,
} from "../schemas/servicio.schema";

import { useCreateServicio, useUpdateServicio } from "./use-service-mutation";

import { useImagePreview } from "@/src/shared/hooks/form/use-image-preview";
import { useAutoSlug } from "@/src/shared/hooks/form/use-auto-slug";

import { getServicioDefaultValues } from "../utils/get-servicio-default-values";
import { buildServicioFormData } from "../utils/build-servicio-form-data";

import type { Service } from "@/src/types/servicio/servicio";

interface Props {
  initialData?: Service;
}

export function useServiceForm({ initialData }: Props) {
  // Edit Mode
  const isEditing = !!initialData;

  // Router
  const router = useRouter();

  // Mutations
  const createMutation = useCreateServicio();
  const updateMutation = useUpdateServicio();

  // RHF
  const form = useForm<
    ServicioFormInput,
    unknown,
    ServicioFormValues
  >({
    resolver: zodResolver(servicioSchema),
    defaultValues: getServicioDefaultValues({initialData}),
  });

  // Image Preview
  const {
    previewUrl,
    handleImageChange,
    removeImage,
  } = useImagePreview({
    initialImage: initialData?.image,
  });

  // Auto Slug
  const { markAsManual } = useAutoSlug({
    control: form.control,
    setValue: form.setValue,
    fieldTitle: "title",
    fieldSlug: "slug",
    disabled: isEditing,
  });

  // Submit
  const onSubmit = async (values: ServicioFormValues) => {
    try {
      const formData = buildServicioFormData(values);

      if (isEditing && initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: formData,
        });

        toast.success("¡Servicio actualizado!");
      } else {
        await createMutation.mutateAsync(formData);

        toast.success("¡Servicio creado!");
      }

      router.push("/admin/servicio");
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
    previewUrl,
    handleImageChange,
    removeImage,
    markAsManual,

    isEditing,

    isPending:
      createMutation.isPending ||
      updateMutation.isPending,
  };
}