// src/components/ui/form/FormSwitch.tsx
"use client";

import { useFormContext, type FieldValues, type Path } from "react-hook-form";

interface Props<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  disabled?: boolean;
}
// Componente de switch para formularios, estilizado como un toggle
export function FormSwitch<TFieldValues extends FieldValues = FieldValues>({
  name,
  disabled,
}: Props<TFieldValues>) {
  const { register } = useFormContext<TFieldValues>();

  return (
    <input
      type="checkbox"
      disabled={disabled}
      {...register(name)}
      className="
        w-10 h-5 bg-slate-200 rounded-full appearance-none
        checked:bg-green-500 transition-all cursor-pointer relative
        after:content-['']
        after:absolute after:top-1 after:left-1
        after:bg-white after:w-3 after:h-3
        after:rounded-full after:transition-all
        checked:after:left-6
      "
    />
  );
}
