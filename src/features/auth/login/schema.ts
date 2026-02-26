import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginInput1Values = z.input<typeof loginSchema>;
export type LoginFormValues = z.output<typeof loginSchema>;