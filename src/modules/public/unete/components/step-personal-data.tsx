"use client";

import { FormField } from "@/src/components/ui/form/FormField";
import { FormInput } from "@/src/components/ui/form/FormInput";

import type { UneteFormInput } from "../schemas/unete-public.schema";

export function StepPersonalData() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <FormField label="Nombres Completos">
          <FormInput<UneteFormInput> name="fullName" />
        </FormField>
      </div>

      <FormField label="DNI">
        <FormInput<UneteFormInput> name="dni" />
      </FormField>

      <FormField label="Edad">
        <FormInput<UneteFormInput> name="age" type="number" />
      </FormField>
    </div>
  );
}
