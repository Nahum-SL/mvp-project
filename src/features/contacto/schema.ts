import { z } from "zod";

export const contactoSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .regex(/^\+?[0-9]{9,15}$/, "Ingrese un número válido (ej: 999888777)"),
  fechaNac: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Seleccione una fecha válida",
  }),
  comentario: z
    .string()
    .min(10, "El comentario debe ser más detallado (mín. 10 caracteres)")
    .optional()
    .or(z.literal("")),
});

export type ContactoFormValues = z.infer<typeof contactoSchema>;
