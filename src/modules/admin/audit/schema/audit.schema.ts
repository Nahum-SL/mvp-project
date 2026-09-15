// src/features/admin/audit/schemas/audit.schema.ts
import { z } from "zod";

export const STATUS_OPTIONS = ["SUCCESS", "FAILED", "INFO", "ERROR"] as const;

export const auditQuerySchema = z.object({
  action: z.string().optional(),
  status: z.enum(STATUS_OPTIONS).optional(),
  limit: z.string().optional().default("50"),
});

export type AuditQueryInput = z.infer<typeof auditQuerySchema>;