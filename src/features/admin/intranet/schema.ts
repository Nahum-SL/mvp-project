import { z } from "zod";

export const intranetLinkSchema = z.object({
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
    .url()
    .refine(
      (val) => val.startsWith("/") || val.startsWith("http"),
      "Debe ser una ruta interna o un link HTTP/HTTPS",
    ),
  icon: z.string().min(1, "Selecciona un ícono"),
  order: z.coerce.number().int().default(0),
  isVisible: z
    .preprocess((val) => val === "true" || val === true, z.boolean())
    .default(true),
});

export type IntranetLinkFormInput = z.input<typeof intranetLinkSchema>;
export type IntranetLinkValues = z.output<typeof intranetLinkSchema>;
