import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const uneteSchema = z.object({
  fullName: z.string().min(5, "Ingresa tu nombre completo"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  // Cambiamos coerce por este patrón más amigable con RHF
  age: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val))
    .pipe(z.number().min(18, "Debes ser mayor de edad")),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Ingresa un teléfono válido"),
  experience: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val))
    .pipe(z.number().min(0, "Mínimo 0 años")),
  position: z.string().min(1, "Selecciona un puesto"),
  cv: z
    .any() // Usamos any aquí para evitar conflictos con FileList en el resolver
    .refine((files) => files?.length > 0, "El CV es obligatorio")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Máximo 5MB")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Solo PDF",
    ),
});

export type UneteFormValues = z.infer<typeof uneteSchema>;
