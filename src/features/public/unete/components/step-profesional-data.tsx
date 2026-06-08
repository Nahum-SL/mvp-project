"use client";

import { FormField } from "@/src/components/ui/form/FormField";
import { FormInput } from "@/src/components/ui/form/FormInput";
import { FormSelect } from "@/src/components/ui/form/FormSelect";

import type { UneteFormInput } from "../schemas/unete-public.schema";

// Definimos las opciones fuera del componente para evitar recrear el array en cada render
const POSITION_OPTIONS = [
  { value: "Asistente Contable", label: "Asistente Contable" },
  { value: "Archivador y Digitador", label: "Archivador y Digitador" },
  { value: "Practicantes", label: "Practicantes" },
];

export function StepProfessionalData() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FormField label="Correo Electrónico">
        <FormInput<UneteFormInput> name="email" type="email" />
      </FormField>

      <FormField label="Teléfono / Celular">
        <FormInput<UneteFormInput> name="phone" />
      </FormField>

      <FormField label="Años de Experiencia">
        <FormInput<UneteFormInput> name="experience" type="number" />
      </FormField>

      <FormField label="Puesto de Interés">
        <FormSelect<UneteFormInput>
          name="position"
          placeholder="Seleccione un puesto..."
          options={POSITION_OPTIONS}
        />
      </FormField>
    </div>
  );
}
