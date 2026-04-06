// Exportado --> src/types/about-us.ts
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
  status: string; // PENDIENTE, REVISADO, RECHAZADO

  createdAt: string;
}
