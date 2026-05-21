export const ContactStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type ContactStatus = (typeof ContactStatus)[keyof typeof ContactStatus];

export interface Contacto {
  id: string;
  name: string;
  email: string;
  telefono: string;
  fechaNac: string;
  comentario?: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

// ==================
// PAYLOAD TYPES (Contratos de Transporte)
// ==================

export interface CreateContactPayload {
  name: string;
  email: string;
  telefono: string;
  fechaNac: string;
  comentario?: string;
}

// Datos necesarios para actualizar el estado en el Admin panel
export interface UpdateContactStatusPayload {
  status: ContactStatus;
}