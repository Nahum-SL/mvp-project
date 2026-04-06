import { Service } from "./servicio";

export interface ServiceRecommendationMeta {
  impact: number;
  effort: number;
  risk: number;
  reasons: string[];
}

export type ScoredService = Service & {
  relevanceScore: number;
  recommendationMeta: ServiceRecommendationMeta;
};