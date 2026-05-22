// src/features/admin/servicio/components/CreateServiceForm.tsx
"use client";

import { FormProvider } from "react-hook-form";
import { useServiceForm } from "../hooks/use-service-form";

// Subcomponentes del Feature Servicio
import { ServiceHeaderForm } from "./form/ServiceHeaderForm";
import { ServiceFeatures } from "./form/ServiceFeatures";
import { ServiceConfigCard } from "./form/ServiceConfigCard";

// Componentes Compartidos (Shared / Globales de Formulario)
import { RichEditor } from "@/src/shared/components/editor/RichEditor";
import { ImagePicker } from "@/src/shared/components/form/ImagePicker";
import { FormIconPicker } from "@/src/shared/components/form/FormIconPicker"; //  Nuevo componente integrado

// Esquema e Iconos
import type { ServicioFormInput } from "../schemas/servicio.schema";
import type { Service } from "@/src/types/servicio/servicio-types";
import { iconServiceMap } from "@/src/lib/icons";

interface Props {
  initialData?: Service;
}

export function CreateServiceForm({ initialData }: Props) {
  const {
    form,
    onSubmit,
    previewUrl,
    handleImageChange,
    removeImage,
    markAsManual,
    isPending,
  } = useServiceForm({ initialData });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
      >
        {/* Columna Izquierda: Contenido Principal (2 de 3 columnas) */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Nombre y Slug (URL Amigable) */}
          <ServiceHeaderForm disabled={isPending} onManualSlug={markAsManual} />

          {/* 2. Selector de Iconos Global e Inteligente */}
          <FormIconPicker<ServicioFormInput>
            name="icon" // 💡 Autocompletado e inferencia estricta desde tu Zod
            icons={iconServiceMap}
            label="Icono del Servicio"
            disabled={isPending}
          />

          {/* 3. Descripción Detallada */}
          <div className="space-y-4">
            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
              Descripción detallada del servicio
            </label>
            <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
              <RichEditor<ServicioFormInput>
                name="description"
                disabled={isPending}
                placeholder="Describe los alcances, normativas y metodologías del servicio de consultoría..."
              />
            </div>
          </div>

          {/* 4. Beneficios o Características Dinámicas (FieldArray) */}
          <ServiceFeatures isPending={isPending} />
        </div>

        {/* Columna Derecha: Configuración Lateral */}
        <div className="space-y-6">
          {/* 5. Selector de Imagen de Portada */}
          <ImagePicker<ServicioFormInput>
            name="image"
            previewUrl={previewUrl}
            onImageChange={handleImageChange}
            onRemove={removeImage}
            disabled={isPending}
          />

          {/* 6. Card de Configuración */}
          <ServiceConfigCard isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
}
