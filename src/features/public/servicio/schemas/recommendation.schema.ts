// src/features/public/servicio/schemas/recommendation.schema.ts
import { z } from "zod";
import { businessTypeSchema, painPointSchema } from "./constants.schema";
import { scoredServiceSchema } from "./scoring.schema";
// ==========================================
// 2. ESQUEMAS DE FILTROS Y PAYLOADS (Request)
// ==========================================

export const serviceFiltersSchema = z.object({
  businessType: businessTypeSchema.optional(),
  painPoint: painPointSchema.optional(),
  search: z.string().optional().default(""),
});

// Estructura para /recommendation
export const recommendationResultSchema = z.object({
  bestMatch: scoredServiceSchema.nullable(),
  alternatives: z.array(scoredServiceSchema),
  insights: z
    .object({
      summary: z.string(),
      confidence: z.number().min(0).max(1),
      reasoning: z.array(z.string()),
    })
    .nullable(),
});

// ==========================================
// 4. INFERENCIA DE TIPOS DE TS DESDE ZOD
// ==========================================

export type ServiceFiltersInput = z.infer<typeof serviceFiltersSchema>;
export type RecommendationResultResponse = z.infer<
  typeof recommendationResultSchema
>;
