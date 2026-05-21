// src/features/admin/contacto/utils/get-contact-default-values.ts
import { ContactoFormInput } from "../schemas/contacto.schema";
// Reemplaza esto por tu interfaz real de Lead/Contacto que viene del backend/Zustand
import type { Contacto } from "@/src/types/contacto/contacto-type";

interface Props {
  initialData?: Contacto;
}

export function getContactDefaultValues({
  initialData,
}: Props): ContactoFormInput {
  return {
    name: initialData?.name || "",
    email: initialData?.email || "",
    telefono: initialData?.telefono || "",
    // RHF en inputs de tipo "date" espera estrictamente un string en formato YYYY-MM-DD
    fechaNac: initialData?.fechaNac
      ? new Date(initialData.fechaNac).toISOString().split("T")[0]
      : "",
    comentario: initialData?.comentario || "",
  };
}
