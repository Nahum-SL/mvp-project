// src/types/services.ts
export interface Service {
  id: number;
  category: 'Outsourcing' | 'Asesoria' | 'Especializados';
  title: string;
  description: string;
}
