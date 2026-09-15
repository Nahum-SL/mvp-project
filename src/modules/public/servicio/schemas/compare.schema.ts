import z from "zod";
import { serviceFiltersSchema } from "./recommendation.schema";

export const compareServicesPayloadSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1, "Selecciona al menos un servicio"),
  filters: serviceFiltersSchema,
});

export type CompareServicesPayloadInput = z.infer<
  typeof compareServicesPayloadSchema
>;
