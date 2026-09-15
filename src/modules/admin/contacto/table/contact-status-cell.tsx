// src/features/admin/contacto/table/contact-cells/contact-status-cell.tsx
import type { ContactStatus } from "@/src/types/contacto/contacto-type";
import { STATUS_STYLES_CONTACT } from "@/src/lib/const/status-themes";

interface ContactStatusCellProps {
  status: ContactStatus;
}

export function ContactStatusCell({ status }: ContactStatusCellProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        STATUS_STYLES_CONTACT[status] ?? "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
