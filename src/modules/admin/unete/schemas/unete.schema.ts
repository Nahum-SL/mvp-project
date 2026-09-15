import { z } from "zod";

export const uneteStatusSchema = z.object({
  status: z.enum([
    "PENDIENTE",
    "REVISADO",
    "RECHAZADO",
  ]),
});

export type UneteStatusInput =
  z.input<typeof uneteStatusSchema>;

export type UneteStatusValues =
  z.output<typeof uneteStatusSchema>;