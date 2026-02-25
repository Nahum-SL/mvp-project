enum ContactStatus {
  PENDING,
  CONFIRMED,
  CANCELLED,
  COMPLETED
}

export interface Contacto {
  id: number;
  name: string;
  email: string;
  telefono: string;
  fechaNac: Date;

  // Puede no haber un comentario
  comentario: string | null;

  // Estado
  status: ContactStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CreateContacto {
  name: string;
  email: string;
  telefono: string;
  fechaNac: Date;
  comentario?: string;
  status: ContactStatus;
}

export interface UpdateContacto {
  prop: CreateContacto;
}