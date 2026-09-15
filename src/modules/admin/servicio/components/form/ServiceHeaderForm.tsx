import { slugify } from "@/src/lib/utils";
import { useFormContext } from "react-hook-form";

// Componentes Atomicos
import { FormInput } from "@/src/components/ui/form/FormInput";
import { FormError } from "@/src/components/ui/form/FormError";
import { FormLabel } from "@/src/components/ui/form/FormLabel";
import { FormSection } from "@/src/components/ui/form/FormSection";

interface Props {
  disabled?: boolean;
  onManualSlug?: () => void;
}

export function ServiceHeaderForm({ disabled, onManualSlug }: Props) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <FormSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Title */}
        <div className="space-y-3">
          <FormLabel>Nombre del Servicio</FormLabel>

          <FormInput
            name="title"
            placeholder="Ej: Auditoría Financiera"
            disabled={disabled}
            className="
              w-full
              p-4
              bg-slate-50
              rounded-2xl
              border-none
              focus:ring-2
              focus:ring-blue-600
              font-bold
              text-slate-700
              transition-all
              placeholder:text-slate-300
            "
          />

          <FormError message={errors.title?.message as string} />
        </div>

        {/* Slug */}
        <div className="space-y-3">
          <FormLabel>Slug / URL Amigable</FormLabel>

          <input
            {...register("slug", {
              onChange: (e) => {
                onManualSlug?.();
                setValue("slug", slugify(e.target.value), {
                  shouldValidate: true,
                });
              },
            })}
            disabled={disabled}
            placeholder="auditoria-financiera"
            className="
              w-full
              p-4
              bg-slate-50
              rounded-2xl
              border-none
              focus:ring-2
              focus:ring-blue-600
              font-mono
              text-sm
              text-blue-600
              transition-all
            "
          />

          <FormError message={errors.slug?.message as string} />
        </div>
      </div>
    </FormSection>
  );
}
