// src/features/admin/blog/schema.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio"),
  excerpt: z
    .string()
    .min(10, "El extracto debe ser más descriptivo")
    .max(255, "El extracto no puede superar los 255 caracteres"),
  image: z.instanceof(File).optional(),
  categoryId: z.coerce.number().min(1, "Selecciona una categoría"),
  published: z.preprocess((value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  }, z.boolean().default(false)),
  // El contenido y la imagen se validan aparte o como opcionales aquí
  content: z.string().min(20, "El contenido es muy corto"),
});

export type PostFormInput = z.input<typeof postSchema>;
export type PostFormValues = z.output<typeof postSchema>;
