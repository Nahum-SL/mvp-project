// src/features/admin/servicio/components/form/ServiceForm.tsx
"use client";

import { FormProvider } from "react-hook-form";

import { ImagePicker } from "@/src/shared/components/form/ImagePicker";

// Subcomponentes del formulario
import { ServiceHeaderForm } from "./form/ServiceHeaderForm";
import { ServiceFeatures } from "./form/ServiceFeatures";
import { ServiceConfigCard } from "./form/ServiceConfigCard";

// Components Atomicos
import { FormTextArea } from "@/src/components/ui/form/FormTextArea";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormSection } from "@/src/components/ui/form/FormSection";

// Types
import type { ServicioFormInput } from "../schemas/servicio.schema";
import type { Service } from "@/src/types/servicio/servicio-types";

//Hooks
import { useServiceForm } from "../hooks/use-service-form";

interface FormProps {
  initialData?: Service;
}

export function ServiceForm({ initialData }: FormProps) {
  const {
    form,
    isPending,
    markAsManual,
    onSubmit,
    isEditing,
    previewUrl,
    handleImageChange,
    removeImage,
  } = useServiceForm({ initialData });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
      >
        {/* Columna Principal Izquierda (2/3 del layout) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Sección 1: Datos Base (Título y Slug) */}
          <ServiceHeaderForm disabled={isPending} onManualSlug={markAsManual} />

          {/* Sección 2: Textarea Atómico de Descripción */}
          <FormSection>
            <div className="space-y-3">
              <FormLabel>Descripción Completa</FormLabel>
              <FormTextArea<ServicioFormInput>
                name="description"
                placeholder="Explica detalladamente en qué consiste el servicio, metodologías aplicadas y entregables..."
                disabled={isPending}
                rows={6}
                showCounter={true}
              />
            </div>
          </FormSection>

          {/* Sección 3: Listas Dinámicas (Field Arrays) */}
          <ServiceFeatures isPending={isPending} />
        </div>

        {/* Columna Lateral Derecha / Configuración (1/3 del layout) */}
        <div className="space-y-6">
          <ImagePicker<ServicioFormInput>
            name="image"
            previewUrl={previewUrl}
            onImageChange={handleImageChange}
            onRemove={removeImage}
            disabled={isPending}
          />
          <ServiceConfigCard isPending={isPending} isEditing={isEditing} />
        </div>
      </form>
    </FormProvider>
  );
}
