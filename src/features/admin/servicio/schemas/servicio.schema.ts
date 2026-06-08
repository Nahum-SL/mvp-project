// src/features/admin/servicios/schema.ts
import { z } from "zod";

// 🔥 CORRECCIÓN: Sincronizado con CreateServiceFeaturePayload (solo pide 'name')
const serviceFeatureSchema = z.object({
  name: z.string().min(3, "El nombre de la característica es muy corto"),
});

export const servicioSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio"),
  description: z.string().min(10, "La descripción debe ser más detallada"),
  icon: z.string().min(1, "Selecciona un Icono"),
  image: z
    .union([z.custom<File>((file) => file instanceof File), z.string().url()])
    .optional(),

  businessTypes: z.array(z.string()).min(1, "Selecciona al menos un tipo"),
  painPoints: z.array(z.string()).min(1, "Selecciona al menos un problema"),

  // Ahora el arreglo validará objetos con la propiedad { name: string }
  features: z
    .array(serviceFeatureSchema)
    .min(1, "Agrega al menos una característica"),

  isVisible: z.boolean().default(true),
  order: z.number().int().default(0),
});

export type ServicioFormInput = z.input<typeof servicioSchema>;
export type ServicioFormValues = z.output<typeof servicioSchema>;
