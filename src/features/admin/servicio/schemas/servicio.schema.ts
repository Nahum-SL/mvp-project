// src/features/admin/servicios/schema.ts
import { z } from "zod";

// Definimos el sub-esquema para las características dinámicas (Field Array)
const serviceFeatureSchema = z.object({
  title: z.string().min(3, "El título de la característica es muy corto"),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const servicioSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio"),
  description: z.string().min(10, "La descripción debe ser más detallada"),
  icon: z.string().min(1, "Selecciona un Icono"), // Puede ser un string (Lucide ID) o un File (Cloudinary)
  // Soporta tanto un archivo en local (File) como una URL de Cloudinary (string) para edición
  image: z
    .union([z.custom<File>((file) => file instanceof File), z.string().url()])
    .optional(), 
    
  // Arreglos de strings para los Checkboxes del ConfigCard
  businessTypes: z.array(z.string()).min(1, "Selecciona al menos un tipo"),

  painPoints: z.array(z.string()).min(1, "Selecciona al menos un problema"),

  features: z.array(serviceFeatureSchema).min(1, "Agrega al menos una característica"),

  isVisible: z.boolean().default(true),
  order: z.number().int().default(0),
});

export type ServicioFormInput = z.input<typeof servicioSchema>;
export type ServicioFormValues = z.output<typeof servicioSchema>;
