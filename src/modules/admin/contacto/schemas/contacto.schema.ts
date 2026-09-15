import { z } from "zod";

export const contactStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "COMPLETED",
  ]),
});

export type ContactStatusInput =
  z.input<typeof contactStatusSchema>;

export type ContactStatusValues =
  z.output<typeof contactStatusSchema>;