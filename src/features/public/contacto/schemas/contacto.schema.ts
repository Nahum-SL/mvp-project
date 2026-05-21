import z from "zod";

export const contactoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "Nombre demasiado largo"),
  email: z.email("Correo electrónico no válido").toLowerCase(),
  telefono: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{9,15}$/, "El teléfono debe tener entre 9 y 15 dígitos"),
  fechaNac: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Fecha de nacimiento inválida")
    .refine(
      (val) => new Date(val) < new Date(),
      "La fecha no puede ser futura",
    ),
  comentario: z
    .string()
    .trim()
    .max(500, "El comentario no puede exceder los 500 caracteres")
    .optional()
    .or(z.literal("")),
});

// Tipos para el formulario y uso en componentes
export type ContactoFormInput = z.input<typeof contactoSchema>;
export type ContactoFormValues = z.output<typeof contactoSchema>;
