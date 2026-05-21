// src/features/admin/contacto/components/contact-status-form-view.tsx
import { Providers } from "@/src/lib/tanstack/provider";
import { useContactStatusForm } from "../hooks/use-contacto-status-form";
import { FormSelect } from "@/src/components/ui/form/FormSelect";

export function ContactStatusFormView() {
  const { form, onSubmit, isPending } = useContactStatusForm();

  return (
    <Providers {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Estado del Prospecto / Lead
          </label>

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
    </Providers>
  );
}
