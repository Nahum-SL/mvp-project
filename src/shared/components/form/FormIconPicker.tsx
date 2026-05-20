// src/shared/components/form/FormIconPicker.tsx
"use client";

import { Controller, useFormContext, FieldValues, Path } from "react-hook-form";
import { IconPicker } from "@/src/components/ui/icon-picker"; // Tu ruta actual
import { LucideIcon } from "lucide-react";

// TFieldValues representa el esquema (Zod) y TIconKeys representa las llaves del mapa de iconos
interface FormIconPickerProps<
  TFieldValues extends FieldValues,
  TIconKeys extends string,
> {
  name: Path<TFieldValues>; // Clave exacta del formulario validada por TS (ej: "serviceIcon")
  icons: Record<TIconKeys, LucideIcon>; // Mapeo de íconos inyectado
  label?: string;
  disabled?: boolean;
}

export function FormIconPicker<
  TFieldValues extends FieldValues = FieldValues,
  TIconKeys extends string = string,
>({
  name,
  icons,
  label,
  disabled = false,
}: FormIconPickerProps<TFieldValues, TIconKeys>) {
  // Recuperamos el control del formulario del contexto global
  const { control } = useFormContext<TFieldValues>();

  return (
    <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <IconPicker
            icons={icons}
            value={field.value as TIconKeys}
            onChange={field.onChange}
            error={fieldState.error?.message}
            label={label}
          />
        )}
      />
    </div>
  );
}
