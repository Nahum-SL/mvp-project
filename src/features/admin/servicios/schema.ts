// src/features/admin/servicios/schema.ts
import { z } from "zod";

export const servicioSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio"),
  description: z.string().min(10, "La descripción debe ser más detallada"),
  icon: z.any().optional(), // Puede ser un string (Lucide ID) o un File (Cloudinary)
  image: z.any().optional(),

  // Selector Inteligente
  businessTypes: z
    .array(z.string())
    .min(1, "Selecciona al menos un tipo de empresa"),
  painPoints: z
    .array(z.string())
    .min(1, "Selecciona al menos un punto de dolor"),

  // Características dinámicas
  features: z.array(z.string()).min(1, "Agrega al menos una característica"),

  isVisible: z.boolean().default(true),
  order: z.number().int().default(0),
});

export type ServicioFormInput = z.input<typeof servicioSchema>;
export type ServicioFormValues = z.output<typeof servicioSchema>;
