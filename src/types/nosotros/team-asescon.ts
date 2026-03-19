// src/types/team.ts
export interface TeamMember {
  id: number;
  name: string;
  role: string; // Ej: "Socio Fundador", "Especialista Tributario"
  specialty?: string; // Ej: "NIIF & Costos", "Defensa Laboral"
  image: string; // Ruta de la imagen
  linkedin?: string; // Enlace opcional
}
