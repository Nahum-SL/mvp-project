// src/components/ui/form/FormField.tsx
import { ReactNode } from "react";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormError } from "@/src/components/ui/form/FormError";
import { cn } from "@/src/lib/utils";

interface Props {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export function FormField({
  label,
  error,
  children,
  className,
  htmlFor,
}: Props) {
  return (
    <div className={cn("space-y-3", className)}>
      {label && <FormLabel htmlFor={htmlFor}>{label}</FormLabel>}
      {children}
      <FormError message={error} />
    </div>
  );
}
