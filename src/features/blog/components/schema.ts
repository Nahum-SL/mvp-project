import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(10, "Título demasiado corto"),
  excerpt: z.string().max(255, "Resumen muy largo"),
  content: z.string().min(50, "El contenido debe ser más extenso"),
  categoryId: z.coerce.number().min(1, "Selecciona una categoría"),
  image: z
    .any()
    .refine((files) => files?.length > 0, "La imagen es obligatoria"),
  published: z.boolean().default(false),
});

export type PostFormInput = z.input<typeof postSchema>;
export type PostFormValues = z.output<typeof postSchema>;
