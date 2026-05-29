// src/features/admin/servicio/components/form/ServiceForm.tsx
"use client";

import { ServiceHeaderForm } from "./form/ServiceHeaderForm";
import { ServiceFeatures } from "./form/ServiceFeatures";
import { ServiceConfigCard } from "./form/ServiceConfigCard";

import { FormTextArea } from "@/src/components/ui/form/FormTextArea";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormSection } from "@/src/components/ui/form/FormSection";

import type { ServicioFormInput } from "../schemas/servicio.schema";
import type {
  Service,
  ServiceFeature,
} from "@/src/types/servicio/servicio-types";

import { useServiceForm } from "../hooks/use-service-form";

interface FormProps {
  initialData?: Service;
  features: ServiceFeature[];
}

export function ServiceForm({ initialData }: FormProps) {
  const { form, isPending, markAsManual, onSubmit } = useServiceForm({
    initialData,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
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
      <div className="lg:col-span-1">
        <ServiceConfigCard isPending={isPending} />
      </div>
    </form>
  );
}
