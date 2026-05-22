import { Service } from "./servicio-types";

export interface ServiceRecommendationMeta {
  impact: number;
  effort: number;
  risk: number;
  reasons: string[];
}

export type ScoredService = Service & {
  relevanceScore: number;
  recommendationMeta: ServiceRecommendationMeta;
  priorityScore: number; // Se puede calcular a partir de las métricas o venir directamente del backend
};