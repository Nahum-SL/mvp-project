// src/features/admin/contacto/table/contact-row.tsx
import { Calendar } from "lucide-react";
import type { Contacto } from "@/src/types/contacto/contacto-type";
import { ContactStatusCell } from "./contact-status-cell";
import { ContactActionsCell } from "./contact-actions-cell";

interface ContactRowProps {
  contacto: Contacto;
  onEditStatus: (contacto: Contacto) => void;
  onOpenDelete: (payload: { id: string; name: string }) => void;
}

export function ContactRow({
  contacto,
  onEditStatus,
  onOpenDelete,
}: ContactRowProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-gray-800/30 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900 dark:text-gray-100">
          {contacto.name}
        </div>c
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
        <ContactStatusCell status={contacto.status} />
      </td>

      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {contacto.comentario || (
          <span className="italic text-gray-400">Sin comentario</span>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ContactActionsCell
          contacto={contacto}
          onEditStatus={onEditStatus}
          onOpenDelete={onOpenDelete}
        />
      </td>
    </tr>
  );
}
