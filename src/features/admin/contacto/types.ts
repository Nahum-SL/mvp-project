export const ContactStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED"
} as const;

export type ContactStatus = (typeof ContactStatus)[keyof typeof ContactStatus]

export interface Contacto {
  id: string;
  name: string;
  email: string;
  telefono: string;
  fechaNac: Date;

  comentario?: string;

  status: ContactStatus;

  createdAt: string;
  updatedAt: string;
}
