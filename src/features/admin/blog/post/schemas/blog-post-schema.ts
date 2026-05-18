// src/features/admin/blog/schema.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  slug: z.string().min(3, "El slug es obligatorio"),
  excerpt: z
    .string()
    .min(10, "El extracto debe ser más descriptivo")
    .max(255, "El extracto no puede superar los 255 caracteres"),
  categoryId: z.coerce.number().min(1, "Selecciona una categoría"),
  published: z
    .union([z.boolean(), z.string()])
    .transform((value) => value === true || value === "true"),
  image: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Formato de imagen inválido",
    )
    .optional(),
  // El contenido y la imagen se validan aparte o como opcionales aquí
  content: z.string().min(20, "El contenido es muy corto"),
});

export type PostFormInput = z.input<typeof postSchema>;
export type PostFormValues = z.output<typeof postSchema>;
