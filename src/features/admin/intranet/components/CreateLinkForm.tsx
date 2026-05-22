"use client";
import { FormProvider } from "react-hook-form";
import { useIntranetForm } from "../hooks/use-intranet-form";

// Sub-componentes del formulario
import { LinkConfigCard } from "./form/LinkConfigCard";
import { LinkHeader } from "./form/LinkHeader";

// Componentes atomicos
import { IconPicker } from "@/src/components/ui/icon-picker";
import { iconMap } from "@/src/lib/icons";
import { FormActions } from "@/src/components/ui/form/FormActions";

// Esquema
import type { IntranetLink } from "@/src/types/intranet/intranet-types";

interface LinkFormProps {
  initialData?: IntranetLink;
}

export function IntranetForm({ initialData }: LinkFormProps) {
  const {
    form,
    onSubmit,
    isPending,
    isEditing,
    selectedIcon,
    handleIconChange,
  } = useIntranetForm({ initialData });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
      >
        <div className="lg:col-span-2 space-y-8">
          <LinkHeader disabled={isPending} />

          <IconPicker
            value={selectedIcon}
            onChange={handleIconChange}
            icons={iconMap}
            label="Icono del Acceso"
          />
        </div>

        <div className="space-y-6">
          <LinkConfigCard isPending={isPending} />

          <FormActions
            isPending={isPending}
            isEditing={isEditing}
            cancelHref="/admin/intranet"
          />
        </div>
      </form>
    </FormProvider>
  );
}
