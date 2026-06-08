
// Exportado --> src/types/about-us.ts
// --- IGNORAR ---
export interface History {
  id: number;
  text: string;
  number: number;
}

export interface AboutUs {
  title: string;
  description: string;
  history: History[];
}
// -------------------


// TYPES para UNETE
export const JobAppStatus = {
  PENDIENTE: "PENDIENTE",
  REVISADO: "REVISADO",
  RECHAZADO: "RECHAZADO"
} as const;

export type JobAppStatus = typeof JobAppStatus[keyof typeof JobAppStatus];

export interface JobApplication {
  id: string;
  fullName: string;
  dni: string;
  age: number;
  email: string;
  phone: string;
  experience: number;
  position: string;

  // CVs del Postulante
  cvUrl: string;
  status: JobAppStatus; // PENDIENTE, REVISADO, RECHAZADO

  createdAt: string;
}
// =============
// PAYLOADS
// =============

// Create Job Application
export interface CreateJobAppPayload {
  fullName: string;
  dni: string;
  age: number;
  email: string;
  phone: string;
  experience: number;
  position: string;
  cvUrl: string;
}

// Update Job Application Status
export interface UpdateJobAppStatusPayload {
  status: JobAppStatus;
}

