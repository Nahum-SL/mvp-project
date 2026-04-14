import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const uneteSchema = z.object({
  fullName: z.string().min(5, "Ingresa tu nombre completo"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),

  age: z.coerce.number().min(18, "Debes ser mayor de edad"),

  email: z.email("Email inválido"),

  phone: z.string().min(9, "Ingresa un teléfono válido"),

  experience: z.coerce.number().min(0, "Mínimo 0 años"),

  position: z.string().min(1, "Selecciona un puesto"),

  cv: z
    .any()
    .optional()
    .refine((files) => {
      if (!files) return true; // 👈 clave
      return files instanceof FileList && files.length > 0;
    }, "El CV es obligatorio")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, "Máximo 2MB")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_FILE_TYPES.includes(files[0].type);
    }, "Solo PDF"),
});

export type UneteFormInput = z.input<typeof uneteSchema>;
export type UneteFormValues = z.output<typeof uneteSchema>;

export const step1Schema = uneteSchema.pick({
  fullName: true,
  dni: true,
  age: true,
});

export const step2Schema = uneteSchema.pick({
  email: true,
  phone: true,
  experience: true,
  position: true,
});

export const step3Schema = uneteSchema.pick({
  cv: true,
});
