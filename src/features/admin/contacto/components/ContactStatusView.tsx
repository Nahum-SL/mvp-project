import { FormProvider } from "react-hook-form";
import { useContactStatusForm } from "../hooks/use-contacto-status-form";
import { FormSelect } from "@/src/components/ui/form/FormSelect";
import { FormLabel } from "@/src/components/ui/form/FormLabel";

interface Status_Props {
  value: string;
  label: string;
}

export const STATUS_OPTIONS: Status_Props[] = [
  { value: "PENDING", label: "Pendiente" },
  { value: "CONFIRMED", label: "Confirmado" },
  { value: "CANCELLED", label: "Cancelado" },
  { value: "COMPLETED", label: "Completado" },
];

export function ContactStatusFormView() {
  const { form, onSubmit, isPending } = useContactStatusForm();
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <FormLabel className="block dark:text-gray-300 mb-1.5">
            Es tado del Prospecto / Lead
          </FormLabel>
          <FormSelect name="status" options={STATUS_OPTIONS} />
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? "Guardando..." : "Actualizar Estado"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
