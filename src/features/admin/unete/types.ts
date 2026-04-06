export const JobAppStatus = {
  PENDIENTE: "PENDIENTE",
  REVISADO: "REVISADO",
  RECHAZADO: "RECHAZADO"
} as const;

export type JobAppStatus = typeof JobAppStatus[keyof typeof JobAppStatus];