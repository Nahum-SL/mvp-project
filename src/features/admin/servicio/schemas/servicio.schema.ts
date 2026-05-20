// src/features/admin/servicios/schema.ts
import { z } from "zod";
import { BUSINESS_TYPES, PAIN_POINTS } from "@/src/types/servicio/constants";

export const servicioSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio"),
  description: z.string().min(10, "La descripción debe ser más detallada"),
  icon: z.string().min(1, "Selecciona un Icono"), // Puede ser un string (Lucide ID) o un File (Cloudinary)
  image: z.custom<File>((file) => file instanceof File).optional(),
  // Selector Inteligente
  businessTypes: z
    .array(z.enum(BUSINESS_TYPES.map((t) => t.id) as [string, ...string[]]))
    .min(1, "Selecciona al menos un tipo"),

  painPoints: z
    .array(z.enum(PAIN_POINTS.map((p) => p.id) as [string, ...string[]]))
    .min(1, "Selecciona al menos un problema"),
  // Características dinámicas
  features: z.array(z.string()).min(1, "Agrega al menos una característica"),

  isVisible: z.boolean().default(true),
  order: z.number().int().default(0),
});

export type ServicioFormInput = z.input<typeof servicioSchema>;
export type ServicioFormValues = z.output<typeof servicioSchema>;
