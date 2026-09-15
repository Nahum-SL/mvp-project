import z from "zod";
import { serviceSchema } from "./service-public.schema";

export const serviceRecommendationMetaSchema = z.object({
  impact: z.number().min(0).max(100),
  effort: z.number().min(0).max(100),
  risk: z.number().min(0).max(100),
  reasons: z.array(z.string()),
});

// Composición del servicio enriquecido (Scored) devuelto por /scored y /compare
export const scoredServiceSchema = serviceSchema.extend({
  relevanceScore: z.number(),
  recommendationMeta: serviceRecommendationMetaSchema,
  priorityScore: z.number(),
});

export type ScoredServiceResponse = z.output<typeof scoredServiceSchema>;
