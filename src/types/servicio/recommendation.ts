// src/types/recommendation.ts
import { ScoredService } from "./scoring.types";
import type { BusinessTypeID, PainPointID } from "./constants";

export interface RecommendationParams {
  businessType?: BusinessTypeID;
  painPoint?: PainPointID;
  search?: string;
}

export interface RecommendationResult {
  bestMatch: ScoredService;
  alternatives: ScoredService[];
  insights: {
    summary: string;
    confidence: number;
    reasoning: string[];
  } | null;
}

// Consumo del endpoint => /api/public/servicio/recommendation
// Types usados

export type CompareResponses = ScoredService[];

export interface CompareServicesPayload {
  ids: number[];
  filters: {
    businessType?: BusinessTypeID;
    painPoint?: PainPointID;
    search?: string;
  };
}