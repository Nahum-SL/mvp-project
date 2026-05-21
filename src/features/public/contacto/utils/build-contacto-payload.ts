// src/features/admin/contacto/utils/build-contact-payload.ts
import type { ContactoFormValues } from "../schemas/contacto.schema";
/**
 * Ventajas:
 * 1. Sanitiza los strings (.trim()) automáticamente.
 * 2. Transforma la fecha string del formulario en un objeto Date nativo para el backend.
 * 3. Permite evolucionar fácilmente si se requiere omitir campos vacíos en modo update.
 */
export function buildContactPayload(values: ContactoFormValues) {
  return {
    name: values.name.trim(),
    email: values.email.toLowerCase().trim(),
    telefono: values.telefono.trim(),
    // Convertimos el string 'YYYY-MM-DD' a un objeto Date o string ISO
    fechaNac: values.fechaNac ? new Date(values.fechaNac) : null,
    comentario: values.comentario?.trim() || null,
  };
}

export type ContactoPayload = ReturnType<typeof buildContactPayload>;
