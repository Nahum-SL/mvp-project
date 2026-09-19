import { z } from "zod";

// =======================
// Create
// =======================

export const intranetSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(50, "El título es demasiado largo"),

  description: z
    .string()
    .trim()
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .max(100, "La descripción es muy larga"),

  url: z
    .string()
    .trim()
    .min(1, "La URL es requerida")
    .refine(
      (value) => value.startsWith("/") || /^https?:\/\//.test(value),
      "Debe ser una ruta interna o una URL válida",
    ),

  icon: z.string().min(1, "Selecciona un ícono"),

  order: z.coerce.number().int().default(0),

  isVisible: z.coerce.boolean().default(true),
});

// =======================
// Update
// =======================

export const updateLinkSchema = intranetSchema.partial();

// =======================
// Types
// =======================

export type CreateLinkInput = z.infer<typeof intranetSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

// Tipos para los formularios y acciones
export type IntranetLinkFormInput = z.input<typeof intranetSchema>;
export type IntranetLinkValues = z.output<typeof intranetSchema>;
