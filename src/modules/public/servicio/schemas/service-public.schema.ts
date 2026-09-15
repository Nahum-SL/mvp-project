import z from "zod";
import { businessTypeSchema, painPointSchema } from "./constants.schema";

export const serviceFeatureSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  serviceId: z.number().int().positive(),
});

// ==========================================
// 3. ESQUEMAS DE ENTIDADES CORE (Response)
// ==========================================

export const serviceSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  icon: z.string().nullable().optional(),
  image: z.string().url("La URL de la imagen no es válida"),
  businessTypes: z.array(businessTypeSchema),
  painPoints: z.array(painPointSchema),
  features: z.array(serviceFeatureSchema),
  isVisible: z.boolean(),
  order: z.number().int().nonnegative(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type ServiceResponse = z.infer<typeof serviceSchema>;
