// src/components/ui/rhf-icon-picker.tsx
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { IconPicker } from "./icon-picker";
import { LucideIcon } from "lucide-react";

interface RHFIconPickerProps<T extends string> {
  name: string;
  icons: Record<T, LucideIcon>;
  label?: string;
  customError?: string;
}

export const RHFIconPicker = <T extends string>({
  name,
  icons,
  label,
  customError,
}: RHFIconPickerProps<T>) => {
  const { control } = useFormContext(); // Extrae el control del FormProvider superior

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <IconPicker
          value={field.value}
          onChange={field.onChange}
          icons={icons}
          label={label}
          // Si RHF tiene un error de validación (Zod), lo muestra automáticamente
          error={fieldState.error?.message || customError}
        />
      )}
    />
  );
};

// =======================
// RHFIconPicker
// =======================

// SIRVE para:

// formularios RHF

// Y ambos reutilizan:
// la misma UI visual.

// Eso EVITA:

// duplicación,
// acoplamiento,
// y componentes gigantes.


// 7. Ahora ya puedes reutilizar esto en TODO el admin

// mas adelante creare mapeos de iconos para cada feature

{/* <RHFIconPicker
    name="serviceIcon"
    icons={iconServiceMap}
/> */}

{/* <RHFIconPicker
  name="departmentIcon"
  icons={departmentIcons}
/> */}

{/* <IconPicker
  value={selected}
  onChange={setSelected}
  icons={dashboardIcons}
/> */}