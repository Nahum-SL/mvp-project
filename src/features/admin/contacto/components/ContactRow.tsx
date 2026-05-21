// src/features/admin/contacto/components/contact-row.tsx
import type { Contacto } from "@/src/types/contacto/contacto-type";
import { Trash2, Edit2, Calendar } from "lucide-react";

interface ContactRowProps {
  contacto: Contacto;
  onEditStatus: (contacto: Contacto) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function ContactRow({
  contacto,
  onEditStatus,
  onDelete,
  isDeleting,
}: ContactRowProps) {
  // Badge de color según el estado actual
  const statusStyles = {
    PENDING:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    CONFIRMED:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    COMPLETED:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-gray-800/30 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900 dark:text-gray-100">
          {contacto.name}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {contacto.email}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
        {contacto.telefono}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-gray-400" />
          {contacto.fechaNac
            ? new Date(contacto.fechaNac).toLocaleDateString("es-PE")
            : "—"}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[contacto.status]}`}
        >
          {contacto.status}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {contacto.comentario || (
          <span className="italic text-gray-400">Sin comentario</span>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEditStatus(contacto)}
            className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
            title="Cambiar Estado"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            disabled={isDeleting}
            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors disabled:opacity-50"
            title="Eliminar Contacto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
