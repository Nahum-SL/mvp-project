import { Edit2, Trash2 } from "lucide-react";
import type { Contacto } from "@/src/types/contacto/contacto-type";
import { TableButton } from "@/src/components/ui/table/TableButton";

interface ContactActionsCellProps {
  contacto: Contacto;
  onEditStatus: (contacto: Contacto) => void;
  onOpenDelete: (payload: { id: string; name: string }) => void;
}

export function ContactActionsCell({
  contacto,
  onEditStatus,
  onOpenDelete,
}: ContactActionsCellProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <TableButton
        onClick={() => onEditStatus(contacto)}
        variant="EDITAR"
        title="Cambiar Estado"
      >
        <Edit2 className="w-4 h-4" />
      </TableButton>
      <TableButton  
        onClick={() => onOpenDelete({ id: contacto.id, name: contacto.name })}
        variant="ELIMINAR"
        title="Eliminar Contacto"
      >
        <Trash2 className="w-4 h-4" />
      </TableButton>
    </div>
  );
}
