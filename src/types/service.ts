// src/types/services.ts
export interface ServiceSteps {
  id: number;
  text: string;
}

export interface Service {
  id: number;
  category: 'Outsourcing' | 'Asesoria' | 'Especializados';
  slug: string;
  title: string;
  description: string;
  text: string;
  steps: ServiceSteps[];
  src: string;
}
