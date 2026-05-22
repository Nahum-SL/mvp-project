// features/admin/intranet/components/form/LinkHeader.tsx
import { FormSection } from "@/src/components/ui/form/FormSection";
import { FormInput } from "@/src/components/ui/form/FormInput";
import { FormTextArea } from "@/src/components/ui/form/FormTextArea";
import { FormLabel } from "@/src/components/ui/form/FormLabel";

interface Props {
  disabled?: boolean;
}

export const LinkHeader = ({ disabled }: Props) => {
  return (
    <div className="space-y-8">
      {/* Sección Título */}
      <FormSection text="Título del Enlace">
        <FormInput
          name="title"
          disabled={disabled}
          placeholder="Ej: Portal de Boletas"
        />
      </FormSection>

      {/* Sección Descripción */}
      <div className="space-y-2">
        <FormLabel className="ml-2">Descripción Breve</FormLabel>
        <FormTextArea
          name="description"
          disabled={disabled}
          rows={2}
          placeholder="¿A dónde lleva este link?"
        />
      </div>
    </div>
  );
};
